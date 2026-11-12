import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '../mockData';

export default function Navbar({ onOpenLogoModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'AI Chatbot', path: '/services/ai-chatbot', isBadge: true },
    { name: 'Industries', path: '/industries' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers', isNew: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo (No tagline as requested) */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-neutral-950 bg-neutral-100 font-semibold shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70'
                  }`
                }
              >
                {link.name}
                {link.isBadge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    AI
                  </span>
                )}
                {link.isNew && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                    Hiring
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Direct UK Phone & Book CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Direct Phone Dial */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-emerald-700 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100"
              title={`Direct Telephone: ${COMPANY_INFO.phoneDisplay}`}
            >
              <span className="p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-lg text-emerald-700 bg-emerald-50 border border-emerald-200"
              aria-label="Call GreensLeaf"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-neutral-950 bg-neutral-100 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.isBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Flagship AI
                  </span>
                )}
                {link.isNew && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                    Hiring
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-neutral-900 text-white font-semibold text-sm"
            >
              <span>Book Technical Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
