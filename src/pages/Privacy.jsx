import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-3 border-b border-neutral-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Statutory Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
          Privacy Policy (UK GDPR)
        </h1>
        <p className="text-xs text-neutral-500">
          Last updated: February 2025 &bull; In accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
        </p>
      </div>

      <div className="space-y-8 text-neutral-700 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">1. Data Controller Information</h2>
          <p>
            GreensLeaf Limited (&ldquo;GreensLeaf&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is the data controller responsible for personal data collected through this website and our IT engineering operations.
          </p>
          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-1 shadow-2xs">
            <div><strong>Company:</strong> GreensLeaf Limited (Registered in England &amp; Wales)</div>
            <div><strong>Registered Address:</strong> {COMPANY_INFO.address}</div>
            <div><strong>Data Privacy Contact:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-700 underline font-medium">{COMPANY_INFO.email}</a></div>
            <div><strong>Telephone:</strong> {COMPANY_INFO.phoneDisplay}</div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">2. What Data We Collect</h2>
          <p>We only collect personal information that is strictly necessary for professional engineering engagements:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-600">
            <li><strong>Inquiry &amp; Contact Information:</strong> Full name, corporate email address, direct phone number, company name, organization size, and project scope details provided in our inquiry form.</li>
            <li><strong>Candidate Applications:</strong> Full name, email, phone, CV notes, experience level, and portfolio links submitted through our Careers page.</li>
            <li><strong>Newsletter Subscriptions:</strong> Corporate email address for tech intelligence bulletins.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized server logs, IP addresses, browser types, and access timestamps for cyber threat defense and DDoS mitigation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">3. Lawful Basis for Processing (UK GDPR Article 6)</h2>
          <p>We process your data strictly under the following lawful bases:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-600">
            <li><strong>Contractual &amp; Pre-Contractual Steps:</strong> Reviewing project specifications, executing technical feasibility assessments, and drafting Statements of Work (SOWs).</li>
            <li><strong>Legitimate Interests:</strong> Securing our networks against unauthorized penetration, maintaining accurate business records, and improving service delivery.</li>
            <li><strong>Consent:</strong> Sending tech intelligence newsletters where explicit opt-in has been registered.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">4. Zero-Data Retention for AI Training</h2>
          <p className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <strong>Important AI Policy:</strong> Any documents, source code, data dictionaries, or architectural schemas shared with GreensLeaf for AI Chatbot Development or cloud audits are NEVER used to train third-party foundational models (e.g., OpenAI, Anthropic, Google). All enterprise AI pipelines utilize zero-data retention APIs and sovereign UK VPC endpoints.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">5. Your Statutory Rights</h2>
          <p>Under the UK Data Protection Act 2018, you maintain the following rights:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-600">
            <li>The right to access personal data we hold about you.</li>
            <li>The right to rectification of inaccurate information.</li>
            <li>The right to erasure (&ldquo;Right to be Forgotten&rdquo;).</li>
            <li>The right to restrict or object to processing.</li>
            <li>The right to lodge a complaint with the UK Information Commissioner&rsquo;s Office (ICO).</li>
          </ul>
          <p className="pt-1">
            To exercise any of these rights, contact our Data Protection Team at <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-700 font-semibold">{COMPANY_INFO.email}</a> or call <span className="text-neutral-950 font-bold">{COMPANY_INFO.phoneDisplay}</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
