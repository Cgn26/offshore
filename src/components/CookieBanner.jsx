import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('greensleaf_cookie_consent');
    if (!consent) {
      // Delay showing banner slightly for smoother UX
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
      className="fixed bottom-6 left-6 right-6 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="glass-panel p-5 rounded-2xl border border-neutral-700/80 shadow-2xl relative space-y-3">
        <button
          onClick={handleDecline}
          className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1 pr-4">
            <h4 className="text-sm font-heading font-semibold text-white">
              UK GDPR &amp; Privacy Compliance
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We use strictly necessary technical cookies to enhance navigation, analyze site performance, and ensure enterprise-grade security under the UK Data Protection Act 2018.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-lg bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 font-medium text-xs transition-colors"
          >
            Essential Only
          </button>
          <Link
            to="/cookies"
            className="text-xs text-neutral-400 hover:text-emerald-400 underline underline-offset-4 ml-auto"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
