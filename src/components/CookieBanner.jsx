import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('greensleaf_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('greensleaf_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('greensleaf_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-neutral-200/90 shadow-xl relative space-y-3">
        <button
          onClick={handleDecline}
          className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-neutral-700 transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1 pr-4">
            <h4 className="text-sm font-heading font-semibold text-neutral-900">
              UK GDPR &amp; Privacy Compliance
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We use strictly necessary technical cookies to enhance navigation, analyze site performance, and ensure enterprise-grade security under the UK Data Protection Act 2018.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-medium text-xs transition-colors"
          >
            Essential Only
          </button>
          <Link
            to="/cookies"
            className="text-xs text-neutral-500 hover:text-emerald-700 underline underline-offset-4 ml-auto"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
