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
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#08090d]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
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
                      ? 'text-white bg-neutral-800/60 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/30'
                  }`
                }
              >
                {link.name}
                {link.isBadge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AI
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Direct UK Phone & Book CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Direct Phone Dial */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-neutral-800/40"
              title={`Direct Telephone: ${COMPANY_INFO.phoneDisplay}`}
            >
              <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-all duration-200 shadow-sm active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-lg text-emerald-400 bg-neutral-900 border border-neutral-800"
              aria-label="Call GreensLeaf"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#090a0f] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-neutral-800 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.isBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Flagship AI
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-neutral-950 font-semibold text-sm"
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
