import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');

// Ensure data folder and storage files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(NEWSLETTER_FILE)) {
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([], null, 2));
}

// Helpers for reading/writing persistent store
const readJson = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

app.use(cors());
app.use(express.json());

// Resend Email Client Initialization
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
let resendClient = null;
if (RESEND_API_KEY && RESEND_API_KEY.startsWith('re_')) {
  try {
    resendClient = new Resend(RESEND_API_KEY);
    console.log('✓ [EMAIL] Resend client initialized.');
  } catch (e) {
    console.warn('! [EMAIL] Failed to initialize Resend client:', e.message);
  }
} else {
  console.log('✓ [DATABASE] Lead storage active. Inquiries are safely captured.');
  console.log('ℹ [EMAIL] Email dispatch paused. Leads can be viewed at http://localhost:3000/admin/inquiries');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GreensLeaf Core API',
    emailConfigured: Boolean(resendClient),
    storage: 'Active (JSON Database)'
  });
});

// POST /api/inquiry - Capture form inquiries
app.post('/api/inquiry', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      companySize,
      industry,
      subject,
      message,
      consent,
    } = req.body;

    // Strict validation
    if (!fullName || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, email, and message are mandatory.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.',
      });
    }

    const newInquiry = {
      id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'N/A',
      companyName: companyName ? companyName.trim() : 'N/A',
      companySize: companySize || '1-10',
      industry: industry || 'Technology',
      subject: subject || 'General Inquiry',
      message: message.trim(),
      consent: Boolean(consent),
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    // Save to Database
    const inquiries = readJson(INQUIRIES_FILE);
    inquiries.unshift(newInquiry);
    writeJson(INQUIRIES_FILE, inquiries);

    console.log(`[INQUIRY SAVED] ${newInquiry.id} from ${newInquiry.fullName} (${newInquiry.email})`);

    // Dispatch Email Notification via Resend (Target: connect@greensleaf.uk)
    let emailStatus = 'skipped_no_api_key';
    if (resendClient) {
      try {
        const emailResponse = await resendClient.emails.send({
          from: 'GreensLeaf Leads <onboarding@resend.dev>',
          to: ['connect@greensleaf.uk'],
          replyTo: newInquiry.email,
          subject: `[GreensLeaf Lead] New Inquiry: ${newInquiry.subject} from ${newInquiry.fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
              <h2 style="color: #09090b; border-bottom: 2px solid #22c55e; padding-bottom: 8px;">New GreensLeaf Inquiry Received</h2>
              <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; font-weight: bold; width: 140px; color: #52525b;">Client Name:</td><td style="padding: 8px;">${newInquiry.fullName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #52525b;">Email:</td><td style="padding: 8px;"><a href="mailto:${newInquiry.email}">${newInquiry.email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #52525b;">Phone:</td><td style="padding: 8px;">${newInquiry.phone}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #52525b;">Company:</td><td style="padding: 8px;">${newInquiry.companyName} (${newInquiry.companySize})</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #52525b;">Industry:</td><td style="padding: 8px;">${newInquiry.industry}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #52525b;">Subject:</td><td style="padding: 8px;">${newInquiry.subject}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background: #f4f4f5; border-radius: 6px;">
                <strong style="color: #09090b;">Message:</strong>
                <p style="margin-top: 8px; white-space: pre-wrap; color: #27272a;">${newInquiry.message}</p>
              </div>
              <p style="margin-top: 25px; font-size: 12px; color: #a1a1aa; text-align: center;">GreensLeaf IT Agency • 02034884882 • connect@greensleaf.uk</p>
            </div>
          `,
        });
        emailStatus = 'sent';
        console.log('[EMAIL NOTIFICATION SENT]', emailResponse);
      } catch (err) {
        emailStatus = 'failed: ' + err.message;
        console.warn('[EMAIL NOTIFICATION FAILED] Safe fallback: Data preserved in database. Error:', err.message);
      }
    } else {
      console.log('[SIMULATED EMAIL] Set RESEND_API_KEY in .env to dispatch live emails to connect@greensleaf.uk.');
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. A GreensLeaf senior engineer will review your inquiry and reply within 1 business day.',
      inquiryId: newInquiry.id,
      emailStatus: emailStatus,
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return res.status(500).json({
      error: 'An unexpected internal error occurred while saving your inquiry. Please try again or call us at 02034884882.',
    });
  }
});

// GET /api/inquiry - Admin listing of all inquiries
app.get('/api/inquiry', (req, res) => {
  const inquiries = readJson(INQUIRIES_FILE);
  res.json({
    total: inquiries.length,
    inquiries,
  });
});

// POST /api/newsletter - Capture newsletter subscriptions
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscribers = readJson(NEWSLETTER_FILE);

    const exists = subscribers.some((sub) => sub.email === normalizedEmail);
    if (exists) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to GreensLeaf tech intelligence.',
      });
    }

    const newSub = {
      id: 'sub_' + Date.now(),
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
    };

    subscribers.unshift(newSub);
    writeJson(NEWSLETTER_FILE, subscribers);

    console.log(`[NEWSLETTER SUBSCRIBER] Added ${normalizedEmail}`);

    return res.status(201).json({
      success: true,
      message: 'Subscription confirmed! Welcome to GreensLeaf enterprise insights.',
    });
  } catch (err) {
    console.error('Error adding newsletter subscription:', err);
    return res.status(500).json({ error: 'Failed to process newsletter subscription.' });
  }
});

// GET /api/newsletter - Admin listing of subscribers
app.get('/api/newsletter', (req, res) => {
  const subscribers = readJson(NEWSLETTER_FILE);
  res.json({
    total: subscribers.length,
    subscribers,
  });
});

export { app };

if (process.env.NODE_ENV !== 'test' && !process.env.NO_LISTEN) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ [BACKEND API] Ready on http://localhost:${PORT}`);
  });
}

