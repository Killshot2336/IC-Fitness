import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.log('Contact form submission (Resend not configured):', { name, email, subject, message });
      return NextResponse.json({ success: true, demo: true });
    }

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: 'IC Fitness <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL ?? SITE.email,
      replyTo: email,
      subject: subject ? `[IC Fitness] ${subject}` : `[IC Fitness] Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
