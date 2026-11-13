import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'greensleaf-data') : path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');

// Ensure data folder and storage files exist (wrapped for serverless safety)
try {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(INQUIRIES_FILE)) fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
  if (!fs.existsSync(NEWSLETTER_FILE)) fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([], null, 2));
  if (!fs.existsSync(CAREERS_FILE)) fs.writeFileSync(CAREERS_FILE, JSON.stringify([], null, 2));
} catch (fsErr) {
  console.warn('[STORAGE] File store init warning (non-fatal):', fsErr.message);
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
const DB_URL = process.env.POSTGRES_URL 
  || process.env.DATABASE_URL 
  || process.env.Postgres_url 
  || process.env.postgres_url 
  || process.env.Database_url 
  || process.env.database_url 
  || '';
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
        dob VARCHAR(32),
        address TEXT,
        postcode VARCHAR(32),
        rtw_status VARCHAR(64),
        rtw_share_code VARCHAR(64),
        education_level VARCHAR(128),
        education_field VARCHAR(128),
        institution VARCHAR(255),
        graduation_year VARCHAR(32),
        uk_experience TEXT,
        role VARCHAR(255) NOT NULL,
        experience VARCHAR(128),
        portfolio TEXT,
        availability VARCHAR(128),
        cover_note TEXT,
        declarations TEXT,
        consent BOOLEAN DEFAULT TRUE,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(32) DEFAULT 'under_review'
      );
    `;
    try {
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS dob VARCHAR(32);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS address TEXT;`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS postcode VARCHAR(32);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS rtw_status VARCHAR(64);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS rtw_share_code VARCHAR(64);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS education_level VARCHAR(128);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS education_field VARCHAR(128);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS institution VARCHAR(255);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS graduation_year VARCHAR(32);`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS uk_experience TEXT;`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS declarations TEXT;`;
      await sql`ALTER TABLE careers ADD COLUMN IF NOT EXISTS nationality VARCHAR(128);`;
    } catch (migErr) {
      console.log('ℹ [POSTGRES] Career columns migration note:', migErr.message);
    }
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

initPostgres().catch((err) => console.warn('! [POSTGRES] Init rejection:', err.message));

app.use(cors());
app.use(express.json());

// ===================================================
// Resend Email Client Initialization
// ===================================================
const RESEND_API_KEY = process.env.RESEND_API_KEY 
  || process.env.Resend_api_key 
  || process.env.resend_api_key 
  || '';
const SENDER_EMAIL = process.env.RESEND_FROM 
  || process.env.Resend_from 
  || process.env.resend_from 
  || 'GreensLeaf Leads <notifications@greensleaf.uk>';
const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL 
  || process.env.Notification_email 
  || process.env.notification_email 
  || 'connect@greensleaf.uk';
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
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GreensLeaf Core API',
    emailConfigured: Boolean(resendClient),
    resendKeyFound: Boolean(RESEND_API_KEY),
    resendKeyPrefix: RESEND_API_KEY ? RESEND_API_KEY.substring(0, 5) + '...' : 'none',
    senderEmail: SENDER_EMAIL,
    targetEmail: TARGET_EMAIL,
    storage: sql ? 'Active (Neon Postgres)' : 'Active (File Store /tmp)'
  });
});

// POST /api/inquiry - Capture form inquiries
app.post(['/api/inquiry', '/inquiry'], async (req, res) => {
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

    // ── Email 1: Internal alert to GreensLeaf team ──
    // ── Email 2: Confirmation to the person who submitted ──
    let emailStatus = 'skipped_no_api_key';
    if (resendClient) {
      const internalInquiryHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
        <!-- Header -->
        <tr><td style="background:#09090b;padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="display:inline-block;background:#059669;color:#ffffff;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:4px;">New Lead</span>
                <h1 style="margin:10px 0 0;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.3px;">New Business Inquiry</h1>
                <p style="margin:4px 0 0;color:#a1a1aa;font-size:12px;">GreensLeaf Limited &bull; Internal CRM Notification</p>
              </td>
              <td align="right" style="vertical-align:top;">
                <span style="font-size:28px;">📩</span>
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Lead Summary Bar -->
        <tr><td style="background:#f0fdf4;border-bottom:1px solid #bbf7d0;padding:16px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:13px;color:#065f46;"><strong>${newInquiry.fullName}</strong> &bull; ${newInquiry.companyName} &bull; ${newInquiry.industry}</td>
              <td align="right" style="font-size:11px;color:#059669;font-weight:700;">Ref: ${newInquiry.id}</td>
            </tr>
          </table>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <!-- Contact Details -->
          <h2 style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#71717a;border-bottom:1px solid #f4f4f5;padding-bottom:8px;">Contact Information</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Full Name</span>
                <span style="font-size:14px;font-weight:600;color:#09090b;">${newInquiry.fullName}</span>
              </td>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Email Address</span>
                <a href="mailto:${newInquiry.email}" style="font-size:14px;font-weight:600;color:#059669;text-decoration:none;">${newInquiry.email}</a>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Phone</span>
                <a href="tel:${newInquiry.phone}" style="font-size:14px;font-weight:600;color:#09090b;text-decoration:none;">${newInquiry.phone}</a>
              </td>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Company</span>
                <span style="font-size:14px;font-weight:600;color:#09090b;">${newInquiry.companyName} &bull; ${newInquiry.companySize} employees</span>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Industry</span>
                <span style="font-size:14px;font-weight:600;color:#09090b;">${newInquiry.industry}</span>
              </td>
              <td width="50%" style="padding:6px 0;vertical-align:top;">
                <span style="font-size:11px;color:#a1a1aa;display:block;">Subject</span>
                <span style="font-size:14px;font-weight:600;color:#09090b;">${newInquiry.subject}</span>
              </td>
            </tr>
          </table>
          <!-- Message -->
          <h2 style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#71717a;border-bottom:1px solid #f4f4f5;padding-bottom:8px;">Client Message</h2>
          <div style="background:#f9f9f9;border-left:3px solid #059669;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;color:#27272a;line-height:1.6;white-space:pre-wrap;margin-bottom:24px;">${newInquiry.message}</div>
          <!-- Action Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <a href="mailto:${newInquiry.email}?subject=Re: ${encodeURIComponent(newInquiry.subject)}" style="display:inline-block;background:#09090b;color:#ffffff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.2px;">Reply to ${newInquiry.fullName} &rarr;</a>
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f9f9f9;border-top:1px solid #e4e4e7;padding:16px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px;color:#a1a1aa;">Received: ${new Date(newInquiry.timestamp).toUTCString()}</td>
              <td align="right" style="font-size:11px;color:#a1a1aa;">GreensLeaf Limited &bull; connect@greensleaf.uk</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      const confirmationInquiryHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
        <!-- Header -->
        <tr><td style="background:#09090b;padding:36px 32px;text-align:center;">
          <div style="display:inline-block;width:48px;height:48px;background:#059669;border-radius:12px;line-height:48px;font-size:22px;margin-bottom:16px;">✓</div>
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">Inquiry Received</h1>
          <p style="margin:8px 0 0;color:#a1a1aa;font-size:13px;">We'll be in touch within 1 business day</p>
        </td></tr>
        <!-- Greeting -->
        <tr><td style="padding:32px 32px 0;">
          <p style="margin:0;font-size:15px;color:#27272a;line-height:1.6;">Dear <strong style="color:#09090b;">${newInquiry.fullName}</strong>,</p>
          <p style="margin:12px 0 0;font-size:14px;color:#52525b;line-height:1.7;">Thank you for reaching out to <strong>GreensLeaf Limited</strong>. Your inquiry has been received and logged securely. A senior member of our team will review your message and respond within <strong>1 business day</strong>.</p>
        </td></tr>
        <!-- Summary Card -->
        <tr><td style="padding:24px 32px;">
          <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:10px;padding:20px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#71717a;">Your Inquiry Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:5px 0;font-size:13px;color:#71717a;width:120px;">Reference</td>
                <td style="padding:5px 0;font-size:13px;font-weight:600;color:#09090b;font-family:monospace;">${newInquiry.id}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-size:13px;color:#71717a;">Subject</td>
                <td style="padding:5px 0;font-size:13px;font-weight:600;color:#09090b;">${newInquiry.subject}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-size:13px;color:#71717a;">Company</td>
                <td style="padding:5px 0;font-size:13px;font-weight:600;color:#09090b;">${newInquiry.companyName}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-size:13px;color:#71717a;">Submitted</td>
                <td style="padding:5px 0;font-size:13px;font-weight:600;color:#09090b;">${new Date(newInquiry.timestamp).toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</td>
              </tr>
            </table>
          </div>
        </td></tr>
        <!-- What Happens Next -->
        <tr><td style="padding:0 32px 24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#71717a;">What Happens Next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;padding:0 12px 12px 0;width:28px;">
                <div style="width:24px;height:24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#059669;">1</div>
              </td>
              <td style="padding-bottom:12px;font-size:13px;color:#52525b;line-height:1.5;"><strong style="color:#09090b;">Expert Review</strong><br>Our technical team will assess your requirements and identify the best solution approach.</td>
            </tr>
            <tr>
              <td style="vertical-align:top;padding:0 12px 12px 0;">
                <div style="width:24px;height:24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#059669;">2</div>
              </td>
              <td style="padding-bottom:12px;font-size:13px;color:#52525b;line-height:1.5;"><strong style="color:#09090b;">Direct Response</strong><br>A senior engineer will reply to this email address within 1 business day with tailored recommendations.</td>
            </tr>
            <tr>
              <td style="vertical-align:top;padding:0 12px 0 0;">
                <div style="width:24px;height:24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#059669;">3</div>
              </td>
              <td style="font-size:13px;color:#52525b;line-height:1.5;"><strong style="color:#09090b;">Scoping Call</strong><br>We'll schedule a no-obligation discovery call to discuss your project in detail.</td>
            </tr>
          </table>
        </td></tr>
        <!-- Contact -->
        <tr><td style="padding:0 32px 32px;">
          <div style="background:#09090b;border-radius:10px;padding:20px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;color:#a1a1aa;">Need an urgent response?</p>
            <a href="mailto:connect@greensleaf.uk" style="font-size:15px;font-weight:700;color:#34d399;text-decoration:none;">connect@greensleaf.uk</a>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f9f9f9;border-top:1px solid #e4e4e7;padding:16px 32px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#a1a1aa;">GreensLeaf Limited &bull; Registered in England &amp; Wales &bull; <a href="https://greensleaf.uk" style="color:#059669;text-decoration:none;">greensleaf.uk</a></p>
          <p style="margin:6px 0 0;font-size:10px;color:#d4d4d8;">This email was sent because you submitted an inquiry via our website. Please do not reply to this automated message.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      try {
        // Internal alert to team
        await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [TARGET_EMAIL],
          replyTo: newInquiry.email,
          subject: `[New Lead] ${newInquiry.subject} — ${newInquiry.fullName} (${newInquiry.companyName})`,
          html: internalInquiryHtml,
        });
        // Confirmation to submitter
        await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [newInquiry.email],
          replyTo: TARGET_EMAIL,
          subject: `Inquiry Received — GreensLeaf Limited (Ref: ${newInquiry.id})`,
          html: confirmationInquiryHtml,
        });
        emailStatus = 'sent';
        console.log(`✓ [EMAIL] Inquiry emails dispatched for ${newInquiry.id}`);
      } catch (err) {
        emailStatus = 'failed: ' + err.message;
        console.warn('[EMAIL] Resend error:', err.message);
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
app.get(['/api/inquiry', '/inquiry'], async (req, res) => {
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
app.post(['/api/newsletter', '/newsletter'], async (req, res) => {
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
app.get(['/api/newsletter', '/newsletter'], async (req, res) => {
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

// POST /api/career - Submit a candidate application & digital resume
app.post(['/api/career', '/career'], async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dob,
      addressLine1,
      city,
      postcode,
      nationality,
      rtwStatus,
      rtwShareCode,
      educationLevel,
      educationField,
      institution,
      graduationYear,
      ukExperiences,
      noUkExperience,
      role,
      experience,
      portfolio,
      availability,
      coverNote,
      confirmRtw,
      confirmAccuracy,
      consentGdpr,
      consent,
    } = req.body;

    if (!fullName || !email || !role) {
      return res.status(400).json({
        error: 'Full Legal Name, Email, and Position Applied For are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.',
      });
    }

    const fullAddress = [addressLine1, city].filter(Boolean).join(', ') || 'N/A';
    const cleanPostcode = (postcode || '').trim().toUpperCase() || 'N/A';
    const cleanUkExperience = Array.isArray(ukExperiences) ? ukExperiences : [];
    const declarationsObj = {
      confirmRtw: Boolean(confirmRtw),
      confirmAccuracy: Boolean(confirmAccuracy),
      consentGdpr: Boolean(consentGdpr || consent),
    };

    const newApplication = {
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'N/A',
      dob: dob ? dob.trim() : 'N/A',
      address: fullAddress,
      postcode: cleanPostcode,
      rtwStatus: rtwStatus || 'N/A',
      rtwShareCode: (rtwShareCode || '').trim().toUpperCase() || 'N/A',
      nationality: nationality ? nationality.trim() : 'N/A',
      educationLevel: educationLevel || 'N/A',
      educationField: educationField ? educationField.trim() : 'N/A',
      institution: institution ? institution.trim() : 'N/A',
      graduationYear: graduationYear ? graduationYear.trim() : 'N/A',
      ukExperience: JSON.stringify(cleanUkExperience),
      role: role.trim(),
      experience: experience || 'Entry Level / Junior',
      portfolio: portfolio ? portfolio.trim() : 'N/A',
      availability: availability || 'Immediate / 1 Month',
      coverNote: coverNote ? coverNote.trim() : '',
      declarations: JSON.stringify(declarationsObj),
      consent: Boolean(consentGdpr || consent),
      timestamp: new Date().toISOString(),
      status: 'under_review',
    };

    let savedToPostgres = false;
    if (sql) {
      try {
        await sql`
          INSERT INTO careers (
            id, full_name, email, phone, dob, address, postcode,
            nationality, rtw_status, rtw_share_code, education_level, education_field, institution, graduation_year,
            uk_experience, role, experience, portfolio, availability, cover_note, declarations, consent, timestamp, status
          )
          VALUES (
            ${newApplication.id}, ${newApplication.fullName}, ${newApplication.email}, ${newApplication.phone}, ${newApplication.dob}, ${newApplication.address}, ${newApplication.postcode},
            ${newApplication.nationality}, ${newApplication.rtwStatus}, ${newApplication.rtwShareCode}, ${newApplication.educationLevel}, ${newApplication.educationField}, ${newApplication.institution}, ${newApplication.graduationYear},
            ${newApplication.ukExperience}, ${newApplication.role}, ${newApplication.experience}, ${newApplication.portfolio}, ${newApplication.availability}, ${newApplication.coverNote}, ${newApplication.declarations}, ${newApplication.consent}, ${newApplication.timestamp}, ${newApplication.status}
          )
        `;
        savedToPostgres = true;
        console.log(`✓ [POSTGRES] Saved candidate application dossier ${newApplication.id}`);
      } catch (err) {
        console.warn('! [POSTGRES] Failed saving career application to DB, falling back to JSON:', err.message);
      }
    }

    if (!savedToPostgres) {
      const careers = readJson(CAREERS_FILE);
      careers.unshift(newApplication);
      writeJson(CAREERS_FILE, careers);
      console.log(`✓ [JSON STORE] Saved career application ${newApplication.id}`);
    }

    // Resend notification email formatted as an Executive Candidate Application Dossier
    if (resendClient) {
      try {
        const expRows = cleanUkExperience.length > 0
          ? cleanUkExperience.map((exp, i) => `
              <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
                <div style="font-weight: bold; color: #09090b;">${i + 1}. ${exp.role || 'Role'} at ${exp.company || 'Employer'}</div>
                <div style="font-size: 12px; color: #71717a; margin-top: 2px;">Dates: ${exp.startDate || 'N/A'} - ${exp.currentlyWorking ? 'Present (Currently Employed)' : (exp.endDate || 'N/A')}</div>
                ${exp.summary ? `<div style="font-size: 13px; color: #27272a; margin-top: 6px; white-space: pre-wrap;">${exp.summary}</div>` : ''}
              </div>
            `).join('')
          : '<p style="color: #71717a; font-style: italic;">No commercial UK employment in last 12 months (Entry-Level / Graduate Candidate).</p>';

        await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [TARGET_EMAIL],
          replyTo: newApplication.email,
          subject: `[GreensLeaf Candidate Dossier] ${newApplication.role}: ${newApplication.fullName} (Ref: ${newApplication.id})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background: #ffffff; color: #09090b;">
              <div style="border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #059669;">GreensLeaf Limited • Candidate Application Dossier</span>
                <h1 style="font-size: 22px; font-weight: 800; margin: 6px 0 0 0; color: #09090b;">${newApplication.fullName}</h1>
                <p style="font-size: 13px; color: #71717a; margin: 4px 0 0 0;">Applied for: <strong style="color: #059669;">${newApplication.role}</strong> • Notice: ${newApplication.availability}</p>
              </div>

              <!-- Personal Details -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">1. Personal & Contact Information</h3>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 16px;">
                <tr><td style="padding: 6px 0; color: #71717a; width: 160px;">Date of Birth:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.dob}</td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">Email Address:</td><td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${newApplication.email}">${newApplication.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">Telephone:</td><td style="padding: 6px 0; font-weight: 600;"><a href="tel:${newApplication.phone}">${newApplication.phone}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">UK Residential Address:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.address}, ${newApplication.postcode}</td></tr>
              </table>

              <!-- Right to Work Verification -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">2. UK Right to Work (RTW) Verification</h3>
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                <div style="font-size: 13px; margin-bottom: 4px;"><strong>Immigration / RTW Status:</strong> ${newApplication.rtwStatus}</div>
                <div style="font-size: 13px;"><strong>Home Office RTW Share Code:</strong> <span style="font-family: monospace; font-weight: bold; background: #ffffff; padding: 3px 8px; border-radius: 4px; border: 1px solid #86efac; color: #047857;">${newApplication.rtwShareCode}</span></div>
              </div>

              <!-- Education -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">3. Academic Qualifications</h3>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 16px;">
                <tr><td style="padding: 6px 0; color: #71717a; width: 160px;">Highest Level Degree:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.educationLevel}</td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">Field of Study:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.educationField}</td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">Institution / University:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.institution}</td></tr>
                <tr><td style="padding: 6px 0; color: #71717a;">Graduation Year:</td><td style="padding: 6px 0; font-weight: 600;">${newApplication.graduationYear}</td></tr>
              </table>

              <!-- UK Experience -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">4. UK Employment History (Past 12 Months)</h3>
              <div style="margin-bottom: 16px;">${expRows}</div>

              <!-- Technical Portfolio & Note -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">5. Technical Profile & Summary</h3>
              <div style="font-size: 13px; margin-bottom: 8px;"><strong>Portfolio / GitHub / LinkedIn:</strong> <a href="${newApplication.portfolio}" target="_blank">${newApplication.portfolio}</a></div>
              ${newApplication.coverNote ? `
                <div style="background: #f4f4f5; border-radius: 8px; padding: 12px; font-size: 13px; color: #27272a; white-space: pre-wrap; margin-bottom: 16px;">
                  <strong>Candidate Statement:</strong><br/>
                  ${newApplication.coverNote}
                </div>
              ` : ''}

              <!-- Declarations -->
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; margin-top: 16px;">6. Statutory Declarations</h3>
              <div style="font-size: 12px; color: #047857; margin-top: 6px;">
                ✓ Right to Work Home Office verification check authorized<br/>
                ✓ Statement of accuracy & pre-employment background checks confirmed<br/>
                ✓ UK GDPR and Data Protection Act 2018 consent recorded
              </div>

              <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e4e4e7; font-size: 11px; color: #a1a1aa; text-align: center;">
                Application ID: ${newApplication.id} • Received ${new Date(newApplication.timestamp).toUTCString()} • GreensLeaf Limited Recruitment
              </div>
            </div>
          `,
        });
        console.log(`✓ [EMAIL] Candidate dossier dispatched to team for ${newApplication.id}`);

        // ── Candidate Confirmation Email ──────────────────────────────────────
        const submissionDate = new Date(newApplication.timestamp).toLocaleDateString('en-GB', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        });
        const candidateConfirmHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
          <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                  <!-- Header -->
                  <tr><td style="background:#09090b;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:3px;color:#059669;text-transform:uppercase;margin-bottom:12px;">GreensLeaf Limited</div>
                    <div style="font-size:26px;font-weight:800;color:#ffffff;margin-bottom:6px;">Application Received</div>
                    <div style="font-size:14px;color:#a1a1aa;">We have received your application and will be in touch shortly.</div>
                  </td></tr>

                  <!-- Ref Banner -->
                  <tr><td style="background:#059669;padding:12px 40px;text-align:center;">
                    <span style="font-size:12px;font-weight:700;color:#ffffff;letter-spacing:1px;">Reference: ${newApplication.id}</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span style="font-size:12px;color:#d1fae5;">${submissionDate}</span>
                  </td></tr>

                  <!-- Body -->
                  <tr><td style="background:#ffffff;padding:36px 40px;">

                    <p style="font-size:16px;color:#09090b;margin:0 0 20px;">Dear <strong>${newApplication.fullName}</strong>,</p>
                    <p style="font-size:14px;color:#3f3f46;line-height:1.7;margin:0 0 24px;">
                      Thank you for submitting your application to <strong>GreensLeaf Limited</strong>. We are pleased to confirm that your application has been successfully received and is currently under review by our technical recruitment panel.
                    </p>

                    <!-- Application Summary Box -->
                    <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#059669;margin-bottom:14px;">Application Summary</div>
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;">
                        <tr>
                          <td style="padding:7px 0;color:#71717a;width:160px;border-bottom:1px solid #f4f4f5;">Position Applied For</td>
                          <td style="padding:7px 0;font-weight:600;color:#09090b;border-bottom:1px solid #f4f4f5;">${newApplication.role}</td>
                        </tr>
                        <tr>
                          <td style="padding:7px 0;color:#71717a;border-bottom:1px solid #f4f4f5;">Applicant Name</td>
                          <td style="padding:7px 0;font-weight:600;color:#09090b;border-bottom:1px solid #f4f4f5;">${newApplication.fullName}</td>
                        </tr>
                        <tr>
                          <td style="padding:7px 0;color:#71717a;border-bottom:1px solid #f4f4f5;">Email Address</td>
                          <td style="padding:7px 0;font-weight:600;color:#09090b;border-bottom:1px solid #f4f4f5;">${newApplication.email}</td>
                        </tr>
                        <tr>
                          <td style="padding:7px 0;color:#71717a;border-bottom:1px solid #f4f4f5;">Date Submitted</td>
                          <td style="padding:7px 0;font-weight:600;color:#09090b;border-bottom:1px solid #f4f4f5;">${submissionDate}</td>
                        </tr>
                        <tr>
                          <td style="padding:7px 0;color:#71717a;">Application Reference</td>
                          <td style="padding:7px 0;font-family:monospace;font-weight:700;color:#059669;">${newApplication.id}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- What Happens Next -->
                    <div style="margin-bottom:28px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#09090b;margin-bottom:16px;">What Happens Next</div>

                      <!-- Step 1 -->
                      <div style="margin-bottom:16px;">
                        <table cellpadding="0" cellspacing="0" width="100%"><tr>
                          <td style="vertical-align:top;width:36px;padding-right:12px;">
                            <div style="width:28px;height:28px;background:#059669;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#ffffff;">1</div>
                          </td>
                          <td style="vertical-align:top;">
                            <div style="font-size:14px;font-weight:600;color:#09090b;margin-bottom:3px;">Recruitment Panel</div>
                            <div style="font-size:13px;color:#71717a;line-height:1.6;">Our recruitment team reviews your profile, verifies your Right to Work status, and checks all submitted documentation.</div>
                          </td>
                        </tr></table>
                      </div>

                      <!-- Step 2 -->
                      <div style="margin-bottom:16px;">
                        <table cellpadding="0" cellspacing="0" width="100%"><tr>
                          <td style="vertical-align:top;width:36px;padding-right:12px;">
                            <div style="width:28px;height:28px;background:#059669;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#ffffff;">2</div>
                          </td>
                          <td style="vertical-align:top;">
                            <div style="font-size:14px;font-weight:600;color:#09090b;margin-bottom:3px;">Technical Panel Review</div>
                            <div style="font-size:13px;color:#71717a;line-height:1.6;">Our engineering leadership panel evaluates your qualifications, domain expertise, and technical alignment with the role.</div>
                          </td>
                        </tr></table>
                      </div>

                      <!-- Step 3 -->
                      <div style="margin-bottom:16px;">
                        <table cellpadding="0" cellspacing="0" width="100%"><tr>
                          <td style="vertical-align:top;width:36px;padding-right:12px;">
                            <div style="width:28px;height:28px;background:#059669;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#ffffff;">3</div>
                          </td>
                          <td style="vertical-align:top;">
                            <div style="font-size:14px;font-weight:600;color:#09090b;margin-bottom:3px;">Technical Assessment</div>
                            <div style="font-size:13px;color:#71717a;line-height:1.6;">Shortlisted candidates are invited to complete a technical assessment tailored to the position. Full instructions are provided at that stage.</div>
                          </td>
                        </tr></table>
                      </div>
                    </div>

                    <!-- Contact -->
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
                      <div style="font-size:13px;color:#065f46;line-height:1.7;">
                        If you have any questions regarding your application, please do not hesitate to contact us at
                        <a href="mailto:connect@greensleaf.uk" style="color:#059669;font-weight:600;text-decoration:none;">connect@greensleaf.uk</a>
                        quoting your reference number <strong>${newApplication.id}</strong>.
                      </div>
                    </div>

                    <p style="font-size:14px;color:#3f3f46;line-height:1.7;margin:0 0 8px;">
                      We appreciate the time you have taken to apply and wish you the best of luck with your application.
                    </p>
                    <p style="font-size:14px;color:#3f3f46;margin:0 0 24px;">
                      Kind regards,<br/>
                      <strong style="color:#09090b;">GreensLeaf Recruitment Team</strong><br/>
                      <span style="color:#71717a;font-size:13px;">GreensLeaf Limited &bull; <a href="https://greensleaf.uk" style="color:#059669;text-decoration:none;">greensleaf.uk</a></span>
                    </p>

                  </td></tr>

                  <!-- GDPR Footer -->
                  <tr><td style="background:#09090b;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
                    <p style="font-size:11px;color:#71717a;margin:0;line-height:1.7;">
                      Your personal data is processed in accordance with the <strong style="color:#a1a1aa;">UK General Data Protection Regulation (UK GDPR)</strong> and the Data Protection Act 2018.
                      Data is held securely and used solely for the purpose of assessing your suitability for the applied role.
                      You may request deletion of your data at any time by contacting <a href="mailto:connect@greensleaf.uk" style="color:#059669;text-decoration:none;">connect@greensleaf.uk</a>.
                      <br/><br/>
                      &copy; ${new Date().getFullYear()} GreensLeaf Limited. All rights reserved. Registered in England &amp; Wales.
                    </p>
                  </td></tr>

                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `;

        await resendClient.emails.send({
          from: SENDER_EMAIL,
          to: [newApplication.email],
          replyTo: TARGET_EMAIL,
          subject: `Application Received — GreensLeaf Limited (Ref: ${newApplication.id})`,
          html: candidateConfirmHtml,
        });
        console.log(`✓ [EMAIL] Candidate confirmation dispatched to ${newApplication.email} for ${newApplication.id}`);

      } catch (e) {
        console.warn('! [EMAIL NOTIFICATION NOTICE] Resend returned:', e.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Your job application and candidate credentials have been recorded with GreensLeaf Limited technical recruitment.',
      applicationId: newApplication.id,
    });
  } catch (err) {
    console.error('Error saving career application:', err);
    return res.status(500).json({ error: 'Failed to process application. Please try again or email connect@greensleaf.uk' });
  }
});

// GET /api/career - Admin listing of applications
app.get(['/api/career', '/career'], async (req, res) => {
  if (sql) {
    try {
      const rows = await sql`SELECT * FROM careers ORDER BY timestamp DESC`;
      const formatted = rows.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        email: r.email,
        phone: r.phone,
        dob: r.dob,
        address: r.address,
        postcode: r.postcode,
        rtwStatus: r.rtw_status,
        rtwShareCode: r.rtw_share_code,
        educationLevel: r.education_level,
        educationField: r.education_field,
        institution: r.institution,
        graduationYear: r.graduation_year,
        ukExperience: r.uk_experience,
        role: r.role,
        experience: r.experience,
        portfolio: r.portfolio,
        availability: r.availability,
        coverNote: r.cover_note,
        declarations: r.declarations,
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

if (!IS_VERCEL && process.env.NODE_ENV !== 'test' && !process.env.NO_LISTEN) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ [BACKEND API] Ready on http://localhost:${PORT}`);
  });
}
