import React from 'react';
import { ShieldCheck, Lock, Mail, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-3 border-b border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Statutory Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy (UK GDPR)
        </h1>
        <p className="text-xs text-neutral-400">
          Last updated: February 2025 &bull; In accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
        </p>
      </div>

      <div className="space-y-8 text-neutral-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">1. Data Controller Information</h2>
          <p>
            GreensLeaf IT Agency Ltd (&ldquo;GreensLeaf&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is the data controller responsible for the personal data collected through this website and our IT consulting operations.
          </p>
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-1">
            <div><strong>Company:</strong> GreensLeaf IT Agency Ltd (Registered in England &amp; Wales)</div>
            <div><strong>Registered Address:</strong> {COMPANY_INFO.address}</div>
            <div><strong>Data Privacy Officer Contact:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-400 underline">{COMPANY_INFO.email}</a></div>
            <div><strong>Telephone:</strong> {COMPANY_INFO.phoneDisplay}</div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">2. What Data We Collect</h2>
          <p>We only collect personal information that is strictly necessary for business and technical engagements:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-400">
            <li><strong>Inquiry &amp; Contact Information:</strong> Full name, corporate email address, direct phone number, company name, organization size, and project scope details provided in our inquiry form.</li>
            <li><strong>Newsletter Subscriptions:</strong> Corporate email address for tech intelligence bulletins.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized server logs, IP addresses, browser types, and access timestamps for cyber threat defense and DDoS mitigation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">3. Lawful Basis for Processing (UK GDPR Article 6)</h2>
          <p>We process your data strictly under the following lawful bases:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-400">
            <li><strong>Contractual &amp; Pre-Contractual Steps:</strong> Reviewing your project specifications, executing technical feasibility assessments, and drafting Statements of Work (SOWs).</li>
            <li><strong>Legitimate Interests:</strong> Securing our networks against unauthorized penetration, maintaining accurate business records, and improving service delivery.</li>
            <li><strong>Consent:</strong> Sending tech intelligence newsletters where explicit opt-in has been registered.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">4. Zero-Data Retention for AI Training</h2>
          <p className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
            <strong>Important AI Policy:</strong> Any documents, source code, data dictionaries, or architectural schemas shared with GreensLeaf for AI Chatbot Development or cloud audits are NEVER used to train third-party foundational models (e.g., OpenAI, Anthropic, Google). All enterprise AI pipelines utilize zero-data retention APIs and sovereign UK VPC endpoints.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">5. Your Statutory Rights</h2>
          <p>Under the UK Data Protection Act 2018, you maintain the following rights:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-400">
            <li>The right to access personal data we hold about you.</li>
            <li>The right to rectification of inaccurate information.</li>
            <li>The right to erasure (&ldquo;Right to be Forgotten&rdquo;).</li>
            <li>The right to restrict or object to processing.</li>
            <li>The right to lodge a complaint with the UK Information Commissioner&rsquo;s Office (ICO).</li>
          </ul>
          <p className="pt-1">
            To exercise any of these rights, contact our Data Protection Team at <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-400 font-semibold">{COMPANY_INFO.email}</a> or call <span className="text-white">{COMPANY_INFO.phoneDisplay}</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
