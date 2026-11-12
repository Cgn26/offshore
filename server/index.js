import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'greensleaf-data') : path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');

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
if (!fs.existsSync(CAREERS_FILE)) {
  fs.writeFileSync(CAREERS_FILE, JSON.stringify([], null, 2));
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
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`Write warning for ${filePath}:`, err.message);
  }
};

// ===================================================
// Neon Postgres Integration (Auto-detects POSTGRES_URL)
// ===================================================
const DB_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
let sql = null;

if (DB_URL) {
  try {
    sql = neon(DB_URL);
    console.log('✓ [POSTGRES] Connected to Neon Postgres database.');
  } catch (err) {
    console.warn('! [POSTGRES] Connection notice, falling back to local store:', err.message);
  }
}

const initPostgres = async () => {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(64) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(64),
        company_name VARCHAR(255),
        company_size VARCHAR(64),
        industry VARCHAR(128),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        consent BOOLEAN DEFAULT TRUE,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(32) DEFAULT 'new'
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS careers (
        id VARCHAR(64) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(64),
        role VARCHAR(255) NOT NULL,
        experience VARCHAR(128),
        portfolio TEXT,
        availability VARCHAR(128),
        cover_note TEXT,
        consent BOOLEAN DEFAULT TRUE,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(32) DEFAULT 'under_review'
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log('✓ [POSTGRES] Schemas initialized successfully.');
  } catch (err) {
    console.warn('! [POSTGRES] Initialization notice:', err.message);
  }
};

initPostgres();

app.use(cors());
app.use(express.json());

// ===================================================
// Resend Email Client Initialization
// ===================================================
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDER_EMAIL = process.env.RESEND_FROM || 'GreensLeaf Leads <notifications@greensleaf.uk>';
const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || 'connect@greensleaf.uk';
let resendClient = null;
if (RESEND_API_KEY && RESEND_API_KEY.startsWith('re_')) {
  try {
    resendClient = new Resend(RESEND_API_KEY);
    console.log('✓ [EMAIL] Resend client initialized with key.');
  } catch (e) {
    console.warn('! [EMAIL] Failed to initialize Resend client:', e.message);
  }
} else {
  console.log('ℹ [EMAIL] Set RESEND_API_KEY in .env to dispatch live notifications.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GreensLeaf Core API',
    emailConfigured: Boolean(resendClient),
    storage: sql ? 'Active (Neon Postgres)' : 'Active (File Store /tmp)'
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

    // Save to Database (Postgres if available, else JSON)
    let savedToPostgres = false;
    if (sql) {
      try {
        await sql`
          INSERT INTO inquiries (id, full_name, email, phone, company_name, company_size, industry, subject, message, consent, timestamp, status)
          VALUES (${newInquiry.id}, ${newInquiry.fullName}, ${newInquiry.email}, ${newInquiry.phone}, ${newInquiry.companyName}, ${newInquiry.companySize}, ${newInquiry.industry}, ${newInquiry.subject}, ${newInquiry.message}, ${newInquiry.consent}, ${newInquiry.timestamp}, ${newInquiry.status})
        `;
        savedToPostgres = true;
        console.log(`✓ [POSTGRES] Saved inquiry ${newInquiry.id}`);
      } catch (dbErr) {
        console.warn('! [POSTGRES] Failed to write to DB, falling back to JSON:', dbErr.message);
      }
    }

    if (!savedToPostgres) {
      const inquiries = readJson(INQUIRIES_FILE);
      inquiries.unshift(newInquiry);
      writeJson(INQUIRIES_FILE, inquiries);
      console.log(`✓ [JSON STORE] Saved inquiry ${newInquiry.id}`);
    }

    // Dispatch Email Notification via Resend (Target: connect@greensleaf.uk)
    let emailStatus = 'skipped_no_api_key';
    if (resendClient) {
      try {
        const emailResponse = await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [TARGET_EMAIL],
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
              <p style="margin-top: 25px; font-size: 12px; color: #a1a1aa; text-align: center;">GreensLeaf Limited • Enterprise IT &amp; AI Systems • connect@greensleaf.uk</p>
            </div>
          `,
        });
        emailStatus = 'sent';
        console.log('[EMAIL NOTIFICATION SENT]', emailResponse);
      } catch (err) {
        emailStatus = 'failed: ' + err.message;
        console.warn('[EMAIL NOTIFICATION NOTICE] Resend returned:', err.message);
      }
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
      error: 'An unexpected internal error occurred while saving your inquiry. Please try again or email us at connect@greensleaf.uk.',
    });
  }
});

// GET /api/inquiry - Admin listing of all inquiries
app.get('/api/inquiry', async (req, res) => {
  if (sql) {
    try {
      const rows = await sql`SELECT * FROM inquiries ORDER BY timestamp DESC`;
      const formatted = rows.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        email: r.email,
        phone: r.phone,
        companyName: r.company_name,
        companySize: r.company_size,
        industry: r.industry,
        subject: r.subject,
        message: r.message,
        consent: r.consent,
        timestamp: r.timestamp,
        status: r.status,
      }));
      return res.json({ total: formatted.length, inquiries: formatted });
    } catch (err) {
      console.warn('[POSTGRES] Fallback to JSON:', err.message);
    }
  }
  const inquiries = readJson(INQUIRIES_FILE);
  res.json({
    total: inquiries.length,
    inquiries,
  });
});

// POST /api/newsletter - Capture newsletter subscriptions
app.post('/api/newsletter', async (req, res) => {
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
    const newSub = {
      id: 'sub_' + Date.now(),
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
    };

    if (sql) {
      try {
        await sql`
          INSERT INTO newsletter (id, email, timestamp)
          VALUES (${newSub.id}, ${newSub.email}, ${newSub.timestamp})
          ON CONFLICT (email) DO NOTHING
        `;
      } catch (err) {
        console.warn('[POSTGRES] Newsletter error:', err.message);
      }
    }

    const subscribers = readJson(NEWSLETTER_FILE);
    const exists = subscribers.some((sub) => sub.email === normalizedEmail);
    if (!exists) {
      subscribers.unshift(newSub);
      writeJson(NEWSLETTER_FILE, subscribers);
    }

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
app.get('/api/newsletter', async (req, res) => {
  if (sql) {
    try {
      const rows = await sql`SELECT * FROM newsletter ORDER BY timestamp DESC`;
      return res.json({ total: rows.length, subscribers: rows });
    } catch (err) {
      console.warn('[POSTGRES] Newsletter fetch fallback:', err.message);
    }
  }
  const subscribers = readJson(NEWSLETTER_FILE);
  res.json({
    total: subscribers.length,
    subscribers,
  });
});

// POST /api/career - Submit a career application
app.post('/api/career', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      role,
      experience,
      portfolio,
      availability,
      coverNote,
      consent,
    } = req.body;

    if (!fullName || !email || !role) {
      return res.status(400).json({
        error: 'Full Name, Email, and Position are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.',
      });
    }

    const newApplication = {
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'N/A',
      role: role.trim(),
      experience: experience || 'Mid-Level',
      portfolio: portfolio ? portfolio.trim() : 'N/A',
      availability: availability || 'Immediate / 1 Month',
      coverNote: coverNote ? coverNote.trim() : '',
      consent: Boolean(consent),
      timestamp: new Date().toISOString(),
      status: 'under_review',
    };

    let savedToPostgres = false;
    if (sql) {
      try {
        await sql`
          INSERT INTO careers (id, full_name, email, phone, role, experience, portfolio, availability, cover_note, consent, timestamp, status)
          VALUES (${newApplication.id}, ${newApplication.fullName}, ${newApplication.email}, ${newApplication.phone}, ${newApplication.role}, ${newApplication.experience}, ${newApplication.portfolio}, ${newApplication.availability}, ${newApplication.coverNote}, ${newApplication.consent}, ${newApplication.timestamp}, ${newApplication.status})
        `;
        savedToPostgres = true;
        console.log(`✓ [POSTGRES] Saved career application ${newApplication.id}`);
      } catch (err) {
        console.warn('! [POSTGRES] Failed saving career application, using JSON fallback:', err.message);
      }
    }

    if (!savedToPostgres) {
      const careers = readJson(CAREERS_FILE);
      careers.unshift(newApplication);
      writeJson(CAREERS_FILE, careers);
      console.log(`✓ [JSON STORE] Saved career application ${newApplication.id}`);
    }

    // Resend notification if configured
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [TARGET_EMAIL],
          replyTo: newApplication.email,
          subject: `[GreensLeaf Career Application] ${newApplication.role}: ${newApplication.fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
              <h2 style="color: #09090b; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">New Job Application Received</h2>
              <p><strong>Candidate:</strong> ${newApplication.fullName}</p>
              <p><strong>Email:</strong> ${newApplication.email}</p>
              <p><strong>Phone:</strong> ${newApplication.phone}</p>
              <p><strong>Position:</strong> ${newApplication.role}</p>
              <p><strong>Experience:</strong> ${newApplication.experience}</p>
              <p><strong>Portfolio / Profile:</strong> ${newApplication.portfolio}</p>
              <p><strong>Availability:</strong> ${newApplication.availability}</p>
              <div style="margin-top: 15px; padding: 12px; background: #f4f4f5; border-radius: 6px;">
                <strong>Candidate Note:</strong>
                <p style="white-space: pre-wrap; margin-top: 5px;">${newApplication.coverNote}</p>
              </div>
            </div>
          `,
        });
      } catch (e) {
        console.warn('[EMAIL NOTIFICATION NOTICE] Resend returned:', e.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your application! Our technical hiring team will review your profile and contact you.',
      applicationId: newApplication.id,
    });
  } catch (err) {
    console.error('Error saving career application:', err);
    return res.status(500).json({ error: 'Failed to submit application. Please try again or email connect@greensleaf.uk' });
  }
});

// GET /api/career - Admin listing of applications
app.get('/api/career', async (req, res) => {
  if (sql) {
    try {
      const rows = await sql`SELECT * FROM careers ORDER BY timestamp DESC`;
      const formatted = rows.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        email: r.email,
        phone: r.phone,
        role: r.role,
        experience: r.experience,
        portfolio: r.portfolio,
        availability: r.availability,
        coverNote: r.cover_note,
        consent: r.consent,
        timestamp: r.timestamp,
        status: r.status,
      }));
      return res.json({ total: formatted.length, applications: formatted });
    } catch (err) {
      console.warn('[POSTGRES] Career fetch fallback:', err.message);
    }
  }
  const careers = readJson(CAREERS_FILE);
  res.json({
    total: careers.length,
    applications: careers,
  });
});

export { app };

if (process.env.NODE_ENV !== 'test' && !process.env.NO_LISTEN) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ [BACKEND API] Ready on http://localhost:${PORT}`);
  });
}
