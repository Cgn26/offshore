import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import LogoDownloadModal from './components/LogoDownloadModal';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import AIChatbotService from './pages/AIChatbotService';
import Industries from './pages/Industries';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminInquiries from './pages/AdminInquiries';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

export default function App() {
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Fix for Issue 4: Global Scroll Restoration on Route Change */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-[#fbfbfd] text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
        {/* Navigation */}
        <Navbar onOpenLogoModal={() => setLogoModalOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenLogoModal={() => setLogoModalOpen(true)} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-chatbot" element={<AIChatbotService />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About onOpenLogoModal={() => setLogoModalOpen(true)} />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer onOpenLogoModal={() => setLogoModalOpen(true)} />

        {/* UK GDPR Cookie Notice */}
        <CookieBanner />

        {/* Issue 1: Downloadable PNG/SVG Logo Modal */}
        <LogoDownloadModal
          isOpen={logoModalOpen}
          onClose={() => setLogoModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
