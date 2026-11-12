import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Download, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import Logo from './Logo';
import NewsletterSignup from './NewsletterSignup';
import { COMPANY_INFO } from '../mockData';

export default function Footer({ onOpenLogoModal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80 bg-[#06070a] text-neutral-400 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="large" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              GreensLeaf is a premier UK IT Agency engineering bespoke AI Chatbots, Cloud Architectures, and high-conversion software platforms for institutions demanding security and precision.
            </p>

            {/* Direct Contact Pills */}
            <div className="space-y-2 pt-2 text-xs">
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">{COMPANY_INFO.phoneDisplay}</span>
                <span className="text-neutral-500">(Direct UK Line)</span>
              </a>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>

            {/* Brand Kit / PNG Download Trigger */}
            <div className="pt-2">
              <button
                onClick={onOpenLogoModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download GreensLeaf Logo (PNG / SVG)</span>
              </button>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              IT Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/ai-chatbot" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
                  AI Chatbots &amp; RAG
                  <span className="text-[10px] bg-emerald-500/20 px-1 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Custom Software Eng
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Cloud DevOps &amp; AWS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Cybersecurity &amp; GDPR
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  24/7 Managed IT Support
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Data Pipelines &amp; BI
                </Link>
              </li>
            </ul>
          </div>

          {/* Agency & Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Agency &amp; Sectors
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  FinTech &amp; Banking
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Healthcare &amp; MedTech
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  E-Commerce &amp; Retail
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Legal &amp; Professional
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About GreensLeaf
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/admin/inquiries" className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs">
                  Inquiries Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Tech Intelligence
            </h4>
            <p className="text-xs text-neutral-400">
              Receive quarterly briefs on UK AI regulations, cloud cost optimization, and enterprise architecture.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} GreensLeaf IT Agency Ltd. All rights reserved.</span>
            <span>&bull;</span>
            <span className="text-neutral-400">Registered in England &amp; Wales</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy (UK GDPR)
            </Link>
            <Link to="/terms" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-neutral-300 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
