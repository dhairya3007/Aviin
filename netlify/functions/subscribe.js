import nodemailer from 'nodemailer';

const DEFAULT_LOGO_URL = 'https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/logo.png';

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

    const subscriberWhatsappRow = cleanPhone
      ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">WhatsApp Updates</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #15803d;">${cleanPhone}</span></td>
        </tr>`
      : '';

    const adminWhatsappRow = cleanPhone
      ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">WhatsApp Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #15803d;">${cleanPhone}</span></td>
        </tr>`
      : '';

    // Parallel asynchronous email dispatch
    await Promise.all([
      // 1. Subscriber Email
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Welcome to Aviin Family',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Welcome to Aviin Family</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 36px 16px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
            <center>
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5dfd3; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
                
                <!-- Aviin Header Part (#fcfbf9 luxury canvas) -->
                <tr>
                  <td style="padding: 30px 24px 22px; background-color: #fcfbf9; border-bottom: 1px solid #f0ece1; text-align: center;">
                    <img src="${DEFAULT_LOGO_URL}" alt="AVIIN" width="165" style="display: block; margin: 0 auto; width: 165px; max-width: 165px; height: auto;" />
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 28px 30px 28px;">
                    <p style="margin: 0 0 24px; font-size: 14.5px; line-height: 1.65; color: #5a5568; text-align: center;">
                      Thank you for subscribing. You are now part of the Aviin Family and will receive our priority collection announcements.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">Registered Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #1f1b2e;">${email}</span></td>
                      </tr>
                      ${subscriberWhatsappRow}
                      <tr>
                        <td style="padding: 12px 0; color: #767285;">Status</td>
                        <td style="padding: 12px 0; font-weight: 600; color: #15803d;">Confirmed</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 14px 28px; background-color: #faf9f6; border-top: 1px solid #f0ece1; font-size: 11px; color: #8e899b; text-align: center;">
                    © ${new Date().getFullYear()} Aviin Family. All rights reserved.
                  </td>
                </tr>

              </table>
            </center>
          </body>
          </html>
        `,
      }),

      // 2. Admin Email
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: adminEmail,
        subject: `[Aviin Alert] New Member: ${email}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>New Aviin Family Member</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 36px 16px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
            <center>
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5dfd3; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
                
                <!-- Aviin Header Part (#fcfbf9 luxury canvas) -->
                <tr>
                  <td style="padding: 30px 24px 22px; background-color: #fcfbf9; border-bottom: 1px solid #f0ece1; text-align: center;">
                    <img src="${DEFAULT_LOGO_URL}" alt="AVIIN" width="165" style="display: block; margin: 0 auto; width: 165px; max-width: 165px; height: auto;" />
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 28px 30px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">Subscriber Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><a href="mailto:${email}" style="color: #1f1b2e; text-decoration: underline;">${email}</a></td>
                      </tr>
                      ${adminWhatsappRow}
                      <tr>
                        <td style="padding: 12px 0; color: #767285;">Date &amp; Time</td>
                        <td style="padding: 12px 0; font-size: 13px; color: #666;">${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 28px; background-color: #faf9f6; border-top: 1px solid #f0ece1; font-size: 11px; color: #8e899b; text-align: center;">
                    Automated notification from Aviin Family Launch System.
                  </td>
                </tr>
              </table>
            </center>
          </body>
          </html>
        `,
      }).catch(err => console.warn('Admin notification notice:', err.message)),
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Welcome to the Aviin Family.',
        subscriber: { email, phone },
      }),
    };
  } catch (err) {
    console.error('Email dispatch error:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: err.message || 'Unable to send email',
      }),
    };
  }
}
