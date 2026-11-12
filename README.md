# GreensLeaf — UK Enterprise IT & AI Agency MVP

A premium, high-conversion MVP website and full-stack API engineered for **GreensLeaf**, a premier UK IT Agency specializing in AI Chatbots, Cloud Architecture, and Managed IT Services.

Built with **Apple-style minimalism**, high-contrast neutral theme with emerald accents, and strict adherence to **UK GDPR** and **Data Protection Act 2018**.

---

## 🚀 Key Features & Resolved Items

| Feature / Issue | Status | Description |
|---|---|---|
| **Issue 1: Downloadable PNG Logo** | ✅ Resolved | Generated high-resolution 512x512 PNG (`public/logo.png`) and vector SVG (`public/logo.svg`). Includes interactive **Download Brand Kit Modal** in the UI. |
| **Issue 2: Resend Email Integration** | ✅ Resolved & Resilient | Form submissions save to database with zero loss. If `RESEND_API_KEY` is missing, graceful fallback logs the inquiry without breaking user forms. Notifications routed to `connect@greensleaf.uk`. |
| **Issue 3: Backend Automated Testing** | ✅ Resolved | Comprehensive automated test suite (`server/test_api.js`) covering 14 assertions across `/api/health`, `/api/inquiry`, and `/api/newsletter`. 100% pass rate. |
| **Issue 4: Global Scroll Restoration** | ✅ Resolved | Global `<ScrollToTop />` component inside `BrowserRouter` forces window scroll to `(0, 0)` on every route navigation. |
| **Floating CTA Call Button** | ✅ Resolved | Floating button in bottom right linking directly to `tel:02034884882` with hover tooltip and pulse indicator. |
| **AI Chatbot Flagship Service** | ✅ Complete | Dedicated `/services/ai-chatbot` page with interactive live conversational simulator, RAG architecture blueprint, and UK VPC privacy specs. |
| **Admin Inquiries Dashboard** | ✅ Complete | Accessible at `/admin/inquiries` to inspect all captured leads, verify email dispatch status, and export leads to JSON. |

---

## 📁 Project Architecture

```
greensleaf-website/
├── public/
│   ├── logo.svg            # Scalable vector logo
│   └── logo.png            # 512x512 high-res PNG logo (Issue 1)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation with 020 3488 4882 quick dial
│   │   ├── Footer.jsx          # Apple-style footer with legal & contact info
│   │   ├── Logo.jsx            # Text-based minimal emblem lockup
│   │   ├── FloatingCallButton.jsx # Floating CTA (02034884882)
│   │   ├── ScrollToTop.jsx     # Route change scroll-to-top handler (Issue 4)
│   │   ├── CookieBanner.jsx    # UK GDPR cookie consent
│   │   ├── NewsletterSignup.jsx# Enterprise intelligence subscriber form
│   │   └── LogoDownloadModal.jsx # PNG / SVG one-click download modal
│   ├── pages/
│   │   ├── Home.jsx            # Hero, metrics, services, industries, testimonials, FAQ
│   │   ├── Services.jsx        # Detailed 6-service breakdown & specs
│   │   ├── AIChatbotService.jsx# Dedicated AI Chatbot & RAG page + live simulator
│   │   ├── Industries.jsx      # Regulated UK sectors & verified case studies
│   │   ├── About.jsx           # London office, ethos, UK engineering team
│   │   ├── Blog.jsx & BlogPost.jsx # Thought leadership articles
│   │   ├── Contact.jsx         # Full form submitting to /api/inquiry
│   │   ├── AdminInquiries.jsx  # Real-time captured leads dashboard
│   │   ├── Privacy.jsx         # UK GDPR & Data Protection Act 2018 policy
│   │   ├── Terms.jsx           # Terms of service
│   │   └── Cookies.jsx         # Cookie policy & reset controls
│   ├── mockData.js         # Comprehensive UK agency dataset
│   ├── App.jsx             # React router configuration
│   └── main.jsx
├── server/
│   ├── index.js            # Express API with Resend email notification
│   ├── test_api.js         # 14-point automated test suite (Issue 3)
│   └── data/               # Persistent JSON storage for inquiries & newsletter
├── scripts/
│   └── generate-logo-png.js# Pure Node.js high-res PNG generator
├── .env                    # Environment variables (RESEND_API_KEY, PORT)
├── package.json
└── vite.config.js
```

---

## 🛠️ How to Run

### 1. Start Both Frontend & Backend Concurrently
```bash
npm start
# OR:
# Terminal 1: npm run server  (API on http://localhost:5000)
# Terminal 2: npm run dev     (Frontend on http://localhost:3000)
```

### 2. Configure Email Notifications (Resend)
In `.env`:
```ini
PORT=5000
RESEND_API_KEY=re_your_valid_key_here
NOTIFICATION_EMAIL=connect@greensleaf.uk
CONTACT_PHONE=02034884882
```
*Note: Even without a key, all inquiries are 100% safely captured in the database and visible in `/admin/inquiries`.*

### 3. Run Backend Automated Test Suite
```bash
npm run test:api
```

### 4. Re-generate PNG Logo
```bash
npm run gen:logo
```
