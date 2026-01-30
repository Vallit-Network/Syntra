
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reuse env vars (Same as appointment booking)
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SENDER = process.env.SMTP_SENDER || '"Vallit Website" <info@vallit.net>';
const ADMIN_EMAIL = process.env.SMTP_USER;

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { name, company, email, teamSize, interest, message } = body;

        if (!name || !company || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Store in Database
        const { error: dbError } = await supabase
            .from('contact_entries')
            .insert({
                name,
                company,
                email,
                team_size: teamSize || null,
                interest: interest || null,
                message: message || null
            });

        if (dbError) {
            console.error('Contact DB Error:', dbError);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        // 2. Send Emails
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        // Admin Email
        const adminMail = {
            from: SMTP_SENDER,
            to: ADMIN_EMAIL,
            replyTo: email,
            subject: `[New Lead] Contact Form: ${name} from ${company}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Team Size:</strong> ${teamSize || 'N/A'}</p>
                <p><strong>Interest:</strong> ${interest || 'N/A'}</p>
                <br>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f5f5f5; padding: 10px; border-left: 4px solid #4A90E2;">
                    ${message ? message.replace(/\n/g, '<br>') : 'No message'}
                </blockquote>
            `
        };

        // User Confirmation Email
        const userMail = {
            from: SMTP_SENDER,
            to: email,
            subject: `We've received your message - Vallit`,
            html: `
                <p>Hi ${name},</p>
                <p>Thanks for reaching out to Vallit! We've received your inquiry and will get back to you shortly.</p>
                <br>
                <p>Best,<br>The Vallit Team</p>
            `
        };

        await Promise.all([
            transporter.sendMail(adminMail),
            transporter.sendMail(userMail).catch(e => console.error("Failed user confirmation", e))
        ]);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
