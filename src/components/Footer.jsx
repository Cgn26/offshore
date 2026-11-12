import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import NewsletterSignup from './NewsletterSignup';
import { COMPANY_INFO } from '../mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="large" />
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              GreensLeaf is a premier UK IT Agency engineering bespoke AI Chatbots, Cloud Architectures, and high-conversion software platforms for institutions demanding security and precision.
            </p>

            {/* Direct Contact Pills */}
            <div className="space-y-2 pt-2 text-xs">
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-2.5 text-neutral-800 hover:text-emerald-700 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-neutral-950">{COMPANY_INFO.phoneDisplay}</span>
                <span className="text-neutral-500">(Direct UK Line)</span>
              </a>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-2.5 text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-neutral-600">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
              IT Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/ai-chatbot" className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1">
                  AI Chatbots &amp; RAG
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neutral-950 transition-colors">
                  Custom Software Eng
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neutral-950 transition-colors">
                  Cloud DevOps &amp; AWS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neutral-950 transition-colors">
                  Cybersecurity &amp; GDPR
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neutral-950 transition-colors">
                  24/7 Managed IT Support
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neutral-950 transition-colors">
                  Data Pipelines &amp; BI
                </Link>
              </li>
            </ul>
          </div>

          {/* Agency & Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
              Agency &amp; Careers
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/careers" className="text-neutral-900 font-semibold hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5">
                  Careers at GreensLeaf
                  <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1 rounded font-bold">HIRING</span>
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-neutral-950 transition-colors">
                  FinTech &amp; Banking
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-neutral-950 transition-colors">
                  Healthcare &amp; MedTech
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-neutral-950 transition-colors">
                  E-Commerce &amp; Retail
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-neutral-950 transition-colors">
                  About GreensLeaf
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-neutral-950 transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/admin/inquiries" className="text-neutral-400 hover:text-neutral-700 transition-colors text-xs">
                  Inquiries Portal (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
              Tech Intelligence
            </h4>
            <p className="text-xs text-neutral-600">
              Receive quarterly briefs on UK AI regulations, cloud cost optimization, and enterprise architecture.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>&copy; {currentYear} GreensLeaf Limited. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-neutral-600">Registered in England &amp; Wales</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-neutral-800 transition-colors">
              Privacy Policy (UK GDPR)
            </Link>
            <Link to="/terms" className="hover:text-neutral-800 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-neutral-800 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
