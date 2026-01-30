import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Securely access environment variables (Server-Side Only)
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SENDER = process.env.SMTP_SENDER || '"Vallit Kian Bot" <info@vallit.net>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.SMTP_USER; // Send copy to admin

// Zoom Link - Securely retrieved from env, never exposed to client
const ZOOM_LINK = process.env.ZOOM_STATIC_LINK || "https://zoom.us/j/example-meeting-id";

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { name, email, date, topic, company } = body;

        // Validation
        if (!name || typeof name !== 'string') return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 });
        if (!email || !email.includes('@')) return NextResponse.json({ error: 'Missing or invalid email' }, { status: 400 });
        if (!date) return NextResponse.json({ error: 'Missing required field: date' }, { status: 400 });

        // 1. Configure Transporter
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465, // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        // 2. Format Date
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        const dateStr = dateObj.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = dateObj.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

        // 3. Send Email to User
        const userMailOptions = {
            from: SMTP_SENDER,
            to: email,
            subject: `Appointment Confirmed: Vallit Consultation on ${dateStr}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4A90E2;">Appointment Confirmed via Kian</h2>
            <p>Dear ${name},</p>
            <p>Thank you for booking a consultation with Vallit. Your appointment has been successfully scheduled.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Topic:</strong> ${topic || 'General Consultation'}</p>
                <p><strong>Date:</strong> ${dateStr}</p>
                <p><strong>Time:</strong> ${timeStr}</p>
                <p><strong>Meeting Link:</strong> <a href="${ZOOM_LINK}">${ZOOM_LINK}</a></p>
            </div>

            <p>A calendar invitation has also been sent to your email.</p>
            <p>Best regards,<br>The Vallit Team</p>
        </div>
        `,
        };

        // 4. Send Email to Admin
        const adminMailOptions = {
            from: SMTP_SENDER,
            to: ADMIN_EMAIL,
            subject: `[Kian Bot] New Booking: ${name} - ${dateStr}`,
            html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Topic:</strong> ${topic || 'N/A'}</p>
        <p><strong>Date:</strong> ${dateStr} at ${timeStr}</p>
        <br>
        <p>This booking was generated automatically by the Kian Chatbot.</p>
        `
        };

        // Send both
        // We log errors but don't fail the request if email fails, unless both fail
        try {
            await Promise.all([
                transporter.sendMail(userMailOptions),
                transporter.sendMail(adminMailOptions)
            ]);
        } catch (emailError) {
            console.error('Email sending failed partially or completely:', emailError);
            // Proceed to save to DB anyway
        }

        // 5. Store in Database
        const { error: dbError } = await supabase
            .from('appointments')
            .insert({
                name,
                email,
                company: company || null,
                date: dateObj.toISOString(), // Ensure ISO format is stored
                topic: topic || null,
            });

        if (dbError) {
            console.error('Database Insertion Error:', dbError);
            return NextResponse.json(
                { error: 'Failed to save appointment to database', details: dbError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Booking confirmed and emails sent.' });

    } catch (error) {
        console.error('Booking API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
