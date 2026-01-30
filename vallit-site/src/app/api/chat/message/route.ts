
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { message, session_id } = body;

        if (!message || !session_id) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Ensure Session Exists to avoid Foreign Key errors
        const { error: sessionError } = await supabase
            .from('chat_sessions')
            .upsert(
                {
                    session_id,
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'session_id' }
            );

        if (sessionError) {
            console.error('Session Upsert Error:', sessionError);
            // Proceeding might fail if FK exists, but we'll try.
        }

        const RATE_LIMIT_WINDOW_MINUTES = 1;
        const RATE_LIMIT_MAX_REQUESTS = 5;
        const SPAM_TIME_THRESHOLD_MS = 1000; // 1 second between messages

        // --- SECURITY & RATE LIMITING ---

        // 1. Fetch recent messages for this session
        const oneMinuteAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

        const { data: recentMessages, error: fetchError } = await supabase
            .from('chat_messages')
            .select('content, created_at, role')
            .eq('session_id', session_id)
            .eq('role', 'user') // Only count user messages
            .gte('created_at', oneMinuteAgo)
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error('Security Check Error:', fetchError);
            // Fail open or closed? Closed is safer for costs.
            return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 });
        }

        // 2. Rate Limiting Check
        if (recentMessages && recentMessages.length >= RATE_LIMIT_MAX_REQUESTS) {
            return NextResponse.json(
                {
                    status: 'error',
                    response: "You're sending messages too quickly. Please wait a moment."
                },
                { status: 429 }
            );
        }

        // 3. Spam Detection (Deduplication & Speed)
        if (recentMessages && recentMessages.length > 0) {
            const lastMessage = recentMessages[0];
            const lastTime = new Date(lastMessage.created_at).getTime();
            const now = Date.now();

            // Check for identical repeated content
            if (lastMessage.content === message.trim()) {
                return NextResponse.json(
                    {
                        status: 'error',
                        response: "Please don't repeat the same message."
                    },
                    { status: 429 } // Too Many Requests
                );
            }

            // Check for inhuman speed (less than 1s)
            if (now - lastTime < SPAM_TIME_THRESHOLD_MS) {
                return NextResponse.json(
                    {
                        status: 'error',
                        response: "Whoa, slow down a bit!"
                    },
                    { status: 429 }
                );
            }
        }

        // --- LOG LOGIC (User Message) ---
        // We log the user message here to ensure the rate limit counter increases for the NEXT request
        await supabase.from('chat_messages').insert({
            session_id,
            role: 'user',
            content: message,
            metadata: { ip_check: 'pass' } // Placeholder for real IP check if we had headers
        });


        // --- OPENAI CALL ---

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost effective
            messages: [
                { role: "system", content: "You are Kian, a helpful AI assistant for Vallit. You are professional, concise, and friendly." },
                { role: "user", content: message }
            ],
            store: true,
        });

        const reply = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

        // --- LOG LOGIC (Assistant Response) ---
        await supabase.from('chat_messages').insert({
            session_id,
            role: 'assistant',
            content: reply,
        });

        return NextResponse.json({ status: 'success', response: reply });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
