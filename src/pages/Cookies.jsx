import React from 'react';
import { COMPANY_INFO } from '../mockData';

export default function Cookies() {
  const resetConsent = () => {
    localStorage.removeItem('greensleaf_cookie_consent');
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-3 border-b border-neutral-200 pb-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-neutral-500">
          Last updated: February 2025 &bull; In compliance with the Privacy and Electronic Communications Regulations (PECR).
        </p>
      </div>

      <div className="space-y-8 text-neutral-700 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device to ensure basic site functionality, record user navigation preferences, and collect anonymous telemetry on how our enterprise platform is used.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">2. Cookies We Utilize</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1 shadow-2xs">
              <h4 className="text-xs font-bold text-neutral-950 uppercase">Strictly Necessary Technical Cookies (Always Active)</h4>
              <p className="text-xs text-neutral-600">Essential for page navigation, CSRF token security, and recording your cookie preferences (<code className="text-emerald-800 bg-neutral-100 px-1 py-0.5 rounded">greensleaf_cookie_consent</code>).</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1 shadow-2xs">
              <h4 className="text-xs font-bold text-neutral-950 uppercase">Performance &amp; Telemetry Cookies</h4>
              <p className="text-xs text-neutral-600">Anonymized latency and error reporting used to optimize cloud infrastructure and page rendering times.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">3. Managing Your Preferences</h2>
          <p>
            You can modify your cookie settings at any time or reset your stored preferences using the button below:
          </p>
          <div className="pt-2">
            <button
              onClick={resetConsent}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors shadow-2xs"
            >
              Reset Cookie Preferences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
