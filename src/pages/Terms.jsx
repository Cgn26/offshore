import React from 'react';
import { COMPANY_INFO } from '../mockData';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-3 border-b border-neutral-200 pb-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-500">
          Last updated: February 2025 &bull; Governing Law: England &amp; Wales
        </p>
      </div>

      <div className="space-y-8 text-neutral-700 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">1. Agreement to Terms</h2>
          <p>
            By accessing or browsing the website of GreensLeaf Limited (&ldquo;GreensLeaf&rdquo;), you acknowledge and agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">2. Consulting Engagements &amp; Statements of Work (SOW)</h2>
          <p>
            Information, case study metrics, and architectural patterns presented on this website are for general informational purposes. All professional engineering engagements, managed IT services, and AI chatbot implementations are governed exclusively by formal Statements of Work (SOW) and Master Services Agreements (MSA) executed directly between GreensLeaf and the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">3. Intellectual Property Rights</h2>
          <p>
            All website materials, visual design assets, logos, and technical blueprints published on this site are the property of GreensLeaf Limited. Client intellectual property produced during contracted engineering engagements is assigned as defined within the relevant Statement of Work.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-neutral-950">4. Governing Jurisdiction</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of England and Wales. You irrevocably submit to the exclusive jurisdiction of the English courts.
          </p>
          <p className="pt-2">
            For legal inquiries, contact <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-700 font-medium underline">{COMPANY_INFO.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
