import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '../mockData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop streamlined links (Home is accessible via Logo)
  const desktopNavLinks = [
    { name: 'Services', path: '/services' },
    { name: 'AI Chatbots', path: '/services/ai-chatbot' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/careers' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  // Complete mobile navigation list
  const mobileNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'AI Chatbots & RAG', path: '/services/ai-chatbot' },
    { name: 'Industries & Case Studies', path: '/industries' },
    { name: 'Careers', path: '/careers' },
    { name: 'About GreensLeaf', path: '/about' },
    { name: 'Engineering Blog', path: '/blog' },
    { name: 'Contact & Scoping', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/90 bg-white/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Logo />

          {/* Compact Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {desktopNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors nav-link-hover ${
                    isActive
                      ? 'text-neutral-950 bg-neutral-100 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50/80'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Direct UK Phone & Compact CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hover-button-scale flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-emerald-700 transition-colors"
              title={`Direct Line: ${COMPANY_INFO.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            <Link
              to="/contact"
              className="hover-button-scale inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-2xs group"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Tablet & Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-lg text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              aria-label="Call GreensLeaf"
              title="Call GreensLeaf"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors border border-neutral-200"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="space-y-1">
            {mobileNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-neutral-950 bg-neutral-100 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
