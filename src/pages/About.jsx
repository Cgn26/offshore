import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users2, ShieldCheck, Award, ArrowUpRight, 
  MapPin, Phone, Mail, Clock, CheckCircle2 
} from 'lucide-react';
import { COMPANY_INFO, CORE_METRICS } from '../mockData';

export default function About({ onOpenLogoModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <span>The GreensLeaf Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Engineering clarity in an era of <br />
          <span className="text-emerald-700">enterprise complexity.</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          GreensLeaf was founded to provide UK enterprises with an authentic alternative to bloated legacy consultancies and fragmented offshore agencies.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-950">
            Our Mission &amp; Engineering Ethos
          </h2>
          <p>
            For too long, British companies seeking sophisticated IT modernization faced a frustrating dilemma: hire tier-1 global consultancies who charge astronomical day rates only to hand off delivery to untested offshore trainees, or rely on fragmented freelancers lacking enterprise governance.
          </p>
          <p>
            GreensLeaf was established to redefine enterprise technology delivery. We operate as an elite engineering studio composed entirely of senior UK-based software architects, cloud infrastructure specialists, and AI researchers.
          </p>
          <p>
            When you engage GreensLeaf, the architects who scope your statement of work are the same senior engineers who write your code, audit your security parameters, and deploy your production clusters.
          </p>

          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">Our 4 Core Operating Commitments:</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-neutral-950">Direct Access to Senior Engineers:</strong> Zero account manager bottlenecks. Immediate technical alignment.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-neutral-950">Strict UK Data Sovereignty:</strong> Complete compliance with the UK Data Protection Act 2018 and GDPR.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-neutral-950">Transparent Milestone SOWs:</strong> Fixed-price accountability with clear acceptance criteria.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-neutral-950">Zero Technical Debt:</strong> We leave you with clean, modular, fully-documented code your internal team can proudly maintain.</span>
              </div>
            </div>
          </div>
        </div>

        {/* UK Registered Office Card */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-neutral-200 pb-4">
            <span className="text-xs font-mono text-emerald-700 uppercase tracking-widest font-semibold">Headquarters</span>
            <h3 className="text-xl font-bold text-neutral-950">UK Office &amp; Operations</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block text-xs">Registered Address:</strong>
                <span className="text-neutral-600">{COMPANY_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block text-xs">Direct Telephone:</strong>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-emerald-700 font-bold hover:underline">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block text-xs">Inquiry Email:</strong>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-neutral-700 hover:text-neutral-950">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block text-xs">Standard Business Hours:</strong>
                <span className="text-neutral-600">{COMPANY_INFO.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Banner */}
      <div className="rounded-2xl bg-white p-8 border border-neutral-200 shadow-2xs text-center space-y-4">
        <h3 className="text-xl font-bold text-neutral-950">UK Accreditations &amp; Technical Standards</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-800 pt-2">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            Cyber Essentials Plus Ready
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            ISO 27001 Aligned Controls
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            AWS Select Tier Partner
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            Microsoft Solutions Partner
          </div>
        </div>
      </div>
    </div>
  );
}
