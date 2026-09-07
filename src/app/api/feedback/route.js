import nodemailer from 'nodemailer';
import { sendToGoogleSheets } from '../../../lib/googleSheetsClient';
import { protectSubmissionRequest } from '../../../lib/security/protectSubmission';

export const dynamic = 'force-dynamic';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export const POST = async (request) => {
  try {
    const protection = await protectSubmissionRequest(request, 'feedback');
    if (!protection.ok) return protection.response;

    const message = String(protection.body.message || '').trim();
    const rating = Number(protection.body.rating);

    if (!message || message.length > 2000) {
      return Response.json(
        {
          success: false,
          message: 'Feedback must be between 1 and 2000 characters.',
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return Response.json(
        {
          success: false,
          message: 'Please select a valid rating.',
        },
        { status: 400 }
      );
    }

    const submittedAt = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'long',
    }).format(new Date());

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Eazy Visas Feedback" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Website Feedback - ${rating}/5`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">New Website Feedback</h1>
          </div>
          <div style="padding: 20px;">
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
      text: `New website feedback\nRating: ${rating}/5\nSubmitted at: ${submittedAt}\n\n${message}`,
    });

    await sendToGoogleSheets(
      {
        rating,
        message,
        submittedAt,
        source: 'feedback',
        formType: 'feedback form',
        pageName: 'website feedback',
      },
      'feedback form'
    );

    return Response.json({
      success: true,
      message: 'Your feedback has been submitted.',
    });
  } catch (error) {
    console.error('Feedback submission error:', error?.message);
    return Response.json(
      {
        success: false,
        message: 'Unable to submit feedback. Please try again later.',
      },
      { status: 500 }
    );
  }
};
