
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reuse env vars
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SENDER = process.env.SMTP_SENDER || '"Vallit Support" <contact@vallit.net>';
const ADMIN_EMAIL = process.env.SMTP_USER;

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { email, type } = body;

        if (!email || !type || !['ACCESS', 'DELETE'].includes(type)) {
            return NextResponse.json(
                { error: 'Invalid request parameters' },
                { status: 400 }
            );
        }

        // 1. Record Request in Database
        const { data: requestRecord, error: dbError } = await supabase
            .from('data_requests')
            .insert({
                email,
                request_type: type,
                status: 'PENDING'
            })
            .select()
            .single();

        if (dbError) {
            console.error('Data Request DB Error:', dbError);
            return NextResponse.json({ error: 'Failed to record request' }, { status: 500 });
        }

        // 2. Notify Admin via Email
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        const adminMailOptions = {
            from: SMTP_SENDER,
            to: ADMIN_EMAIL,
            subject: `[GDPR Request] ${type} Request from ${email}`,
            html: `
                <h2>New Data Request</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Request ID:</strong> ${requestRecord.request_id}</p>
                <p>Please review the database and process this request manually or via the admin dashboard.</p>
            `,
        };

        // 3. Notify User (Confirmation)
        const userMailOptions = {
            from: SMTP_SENDER,
            to: email,
            subject: `We Received Your Data Request (${type})`,
            html: `
                <p>Dear User,</p>
                <p>We have received your request to <strong>${type === 'ACCESS' ? 'access' : 'delete'}</strong> your personal data associated with this email address.</p>
                <p>Reference ID: ${requestRecord.request_id}</p>
                <p>We will process your request within 30 days as required by GDPR regulations and notify you once completed.</p>
                <p>Best regards,<br>The Vallit Team</p>
            `,
        };

        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions).catch(e => console.error("Failed to send user confirmation", e))
        ]);

        return NextResponse.json({ success: true, message: 'Request submitted successfully' });

    } catch (error) {
        console.error('Data Request API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
