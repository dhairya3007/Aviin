import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getSubscriberEmailHtml, getAdminEmailHtml } from '../../server/emailTemplates.js';

const findLogo = () => {
  const candidates = [
    path.resolve('public/6.png'),
    path.resolve(process.cwd(), 'public/6.png'),
    path.resolve(process.cwd(), 'dist/6.png'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
};

const matchedLogoPath = findLogo();
const getLogoAttachments = () => {
  if (matchedLogoPath) {
    return [
      {
        filename: false, // Prevents Gmail from displaying a download attachment chip
        path: matchedLogoPath,
        cid: 'aviin-logo-header',
        contentDisposition: 'inline',
      },
    ];
  }
  return [];
};

const DEFAULT_LOGO_URL = process.env.LOGO_URL || (
  matchedLogoPath
    ? 'cid:aviin-logo-header'
    : (process.env.URL ? `${process.env.URL}/6.png` : 'https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/6.png')
);

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const email = data.email ? data.email.trim() : '';
    const phone = data.phone ? data.phone.trim() : '';

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
      };
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER || 'dhairyapatel3007@gmail.com';
    const rawPass = process.env.SMTP_PASS || 'qammmufmjiuffbvj';
    const pass = rawPass.replace(/\s+/g, '');
    const fromName = process.env.FROM_NAME || 'Aviin Family';
    const fromEmail = process.env.FROM_EMAIL || user;
    const adminEmail = process.env.ADMIN_EMAIL || 'dhairya3020@gmail.com';

    // In serverless / AWS Lambda (Netlify), port 587 STARTTLS is frequently throttled or blocked.
    // 'service: gmail' uses port 465 SSL directly which connects instantly without STARTTLS delays.
    const transporter = (host.includes('gmail') || user.includes('@gmail.com'))
      ? nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      })
      : nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

    const cleanPhone = phone && String(phone).trim() && String(phone).trim() !== 'null' && String(phone).trim() !== 'undefined'
      ? String(phone).trim()
      : null;

    // Parallel asynchronous email dispatch
    await Promise.all([
      // 1. Subscriber Email
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Welcome to Aviin Family',
        attachments: getLogoAttachments(),
        html: getSubscriberEmailHtml({ email, phone: cleanPhone, logoUrl: DEFAULT_LOGO_URL }),
      }),

      // 2. Admin Email
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: adminEmail,
        subject: `[Aviin Alert] New Member: ${email}`,
        attachments: getLogoAttachments(),
        html: getAdminEmailHtml({ email, phone: cleanPhone, timestamp: new Date().toUTCString(), logoUrl: DEFAULT_LOGO_URL }),
      }).catch(err => console.warn('Admin notification notice:', err.message)),
    ]);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Welcome to the Aviin Family.',
      }),
    };
  } catch (err) {
    console.error('Netlify subscribe error:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Unable to send confirmation email. Please check your credentials.',
      }),
    };
  }
}
