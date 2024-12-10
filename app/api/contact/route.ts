// app/api/contact/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, receiptNumber, message } = await request.json();

      if (!name || !email || !phone || !receiptNumber || !message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, phone, receiptNumber, or message.',
      }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS,  
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'kurosen930@gmail.com', 
      subject: 'PROOFLY New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Receipt Number: ${receiptNumber}

        Message:
        ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, response: info.response });

  } catch (error) {
    console.error('Error sending email: ', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send email.',
    }, { status: 500 });
  }
}
