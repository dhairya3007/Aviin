import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { getSubscriberEmailHtml, getAdminEmailHtml } from './emailTemplates.js';
import { AVIIN_LOGO_BASE64 } from './logoBase64.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory subscriber list for quick reference during dev/session
const subscribersStore = [];

/**
 * Helper to build nodemailer transporter based on environment variables
 */
async function createMailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  // If user provided valid SMTP settings
  if (host && user && pass && !user.includes('your-email')) {
    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      }),
      isTestAccount: false,
    };
  }

  // Fallback: Create ethereal test account for instantaneous out-of-the-box testing
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return {
      transporter: testTransporter,
      isTestAccount: true,
      testUser: testAccount.user,
    };
  } catch (err) {
    console.warn('Could not create Ethereal test account, using simulation mode:', err.message);
    return {
      transporter: null,
      isTestAccount: true,
    };
  }
}

/**
 * Health check & status endpoint
 */
app.get('/api/health', (req, res) => {
  const hasSmtpConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    !process.env.SMTP_USER.includes('your-email')
  );

  res.json({
    status: 'ok',
    brand: 'Aviin Pure Luxury Clothing',
    smtpConfigured: hasSmtpConfigured,
    subscribersCount: subscribersStore.length,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Subscribe API endpoint — Dual Email Dispatch (Subscriber + Admin)
 */
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, phone, name, preference } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter an authentic, valid email address.' });
    }

    const timestamp = new Date().toUTCString();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Store in session record
    const subscriberData = {
      email: cleanEmail,
      phone: phone ? phone.trim() : null,
      name: name ? name.trim() : null,
      preference: preference || 'Inaugural Haute Couture & Sartorial Collection',
      timestamp,
      clientIp,
    };
    subscribersStore.push(subscriberData);

    const fromName = process.env.FROM_NAME || 'Aviin Family';
    const fromEmail = process.env.FROM_EMAIL || 'concierge@aviin.com';
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@aviin.com';

    const subscriberHtml = getSubscriberEmailHtml(subscriberData);
    const adminHtml = getAdminEmailHtml(subscriberData);

    const { transporter, isTestAccount } = await createMailTransporter();

    let subscriberPreviewUrl = null;
    let adminPreviewUrl = null;

    const logoAttachment = {
      filename: 'aviin-logo.png',
      content: Buffer.from(AVIIN_LOGO_BASE64, 'base64'),
      cid: 'aviinlogo',
    };

    if (transporter) {
      if (isTestAccount) {
        // Test account generates preview links
        const subscriberInfo = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: cleanEmail,
          subject: 'Welcome to Aviin Family',
          html: subscriberHtml,
          attachments: [logoAttachment],
        });
        const adminInfo = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: adminEmail,
          subject: `[Aviin Alert] New Member: ${cleanEmail}`,
          html: adminHtml,
        });
        subscriberPreviewUrl = nodemailer.getTestMessageUrl(subscriberInfo);
        adminPreviewUrl = nodemailer.getTestMessageUrl(adminInfo);
      } else {
        // Asynchronous non-blocking parallel dispatch for real SMTP
        Promise.all([
          transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: cleanEmail,
            subject: 'Welcome to Aviin Family',
            html: subscriberHtml,
            attachments: [logoAttachment],
          }),
          transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: adminEmail,
            subject: `[Aviin Alert] New Member: ${cleanEmail}`,
            html: adminHtml,
          }),
        ]).then(() => {
          console.log(`[Aviin SMTP] Dual emails successfully dispatched to ${cleanEmail} and ${adminEmail}`);
        }).catch(err => {
          console.error('[Aviin SMTP Async Error]:', err.message);
        });
      }
    } else {
      console.log(`[Aviin Simulated] Emails recorded for ${cleanEmail} and ${adminEmail}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Welcome to the Aviin Family.',
      subscriber: {
        email: cleanEmail,
        phone: subscriberData.phone,
        name: subscriberData.name,
        preference: subscriberData.preference,
      },
      isTestAccount,
      previewUrls: subscriberPreviewUrl ? {
        subscriberEmail: subscriberPreviewUrl,
        adminEmail: adminPreviewUrl,
      } : null,
    });
  } catch (error) {
    console.error('Error in /api/subscribe:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your invitation. Please try again.',
      details: error.message,
    });
  }
});

/**
 * Preview endpoint: Inspect raw email templates directly
 */
app.get('/api/preview-template', (req, res) => {
  const type = req.query.type || 'subscriber';
  const mockData = {
    email: req.query.email || 'client@aviin.com',
    name: req.query.name || 'Valued Member',
    preference: req.query.preference || 'Inaugural Collection',
    timestamp: new Date().toUTCString(),
    clientIp: req.ip,
  };

  if (type === 'admin') {
    res.send(getAdminEmailHtml(mockData));
  } else {
    res.send(getSubscriberEmailHtml(mockData));
  }
});

app.listen(PORT, () => {
  console.log(`✨ Aviin Family Server running on http://localhost:${PORT}`);
});

