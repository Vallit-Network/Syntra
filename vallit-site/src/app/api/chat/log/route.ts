
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { session_id, role, content, user_email, metadata } = body;

        if (!session_id || !role || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Ensure Session Exists
        // We use upsert for simplicity to handle parallel requests race conditions 
        // (though simple insert on conflict do nothing is better if we only care about existence)
        const { error: sessionError } = await supabase
            .from('chat_sessions')
            .upsert(
                {
                    session_id,
                    user_email: user_email || null, // Optional update if we identify user later
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'session_id' }
            );

        if (sessionError) {
            console.error('Session Error:', sessionError);
            // Don't block logging if session creation fails in some weird edge case, but it usually shouldn't.
        }

        // 2. Insert Message
        const { error: msgError } = await supabase
            .from('chat_messages')
            .insert({
                session_id,
                role,
                content,
                metadata: metadata || {}
            });

        if (msgError) {
            console.error('Message Error:', msgError);
            return NextResponse.json({ error: msgError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Chat Log Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
