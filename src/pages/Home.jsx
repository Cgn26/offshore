import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, Bot, Code2, Cloud, ShieldCheck, Headphones, 
  BarChart3, CheckCircle2, ChevronDown, ChevronRight, Mail, 
  Sparkles, Zap, Award, Lock, Server, Users2, Building2
} from 'lucide-react';
import { COMPANY_INFO, CORE_METRICS, SERVICES, INDUSTRIES, TESTIMONIALS, FAQS, CLIENT_LOGOS } from '../mockData';

export default function Home({ onOpenLogoModal }) {
  const [openFaq, setOpenFaq] = useState(0);

  const iconMap = {
    Bot: Bot,
    Code2: Code2,
    Cloud: Cloud,
    ShieldCheck: ShieldCheck,
    Headphones: Headphones,
    BarChart3: BarChart3,
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-neutral-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Main Bold Headline with Animate.css Entrance */}
            <h1 className="animate__animated animate__fadeInDown text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 leading-[1.08]">
              High-Reliability <br className="hidden sm:inline" />
              <span className="text-neutral-950">Cloud Platforms &amp; </span>
              <span className="text-emerald-700">Private AI</span>
            </h1>

            {/* Subtitle */}
            <p className="animate__animated animate__fadeInUp text-base sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              GreensLeaf designs, deploys, and maintains cloud infrastructure and private conversational AI for UK businesses. Direct access to named senior UK engineers, fixed-scope proposals, and strict sovereign data governance.
            </p>

            {/* Dual CTAs with Hover.css Effects */}
            <div className="animate__animated animate__fadeInUp flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="hover-button-scale w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neutral-950 text-white font-bold text-sm sm:text-base hover:bg-neutral-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Book Technical Consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
              
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover-button-scale w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-neutral-900 font-semibold text-sm sm:text-base hover:bg-neutral-50 border border-neutral-300 shadow-2xs transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Email {COMPANY_INFO.email}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-4 sm:gap-x-8 text-xs font-semibold text-neutral-700">
              <div className="hover-lift flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Cyber Essentials Plus Ready</span>
              </div>
              <div className="hover-lift flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>UK GDPR &amp; DPA 2018 Compliant</span>
              </div>
              <div className="hover-lift flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ISO 27001 Aligned Controls</span>
              </div>
              <div className="hover-lift flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <Server className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>London Sovereign VPCs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE SECTORS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-neutral-500">
            Specialist Practice Focus Across UK Regulated Sectors
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
            {CLIENT_LOGOS.map((c, idx) => (
              <div key={idx} className="hover-lift p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/70 hover:border-emerald-400/80 transition-all cursor-default">
                <div className="font-heading font-bold text-xs text-neutral-900">{c.name}</div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{c.sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CORE_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="hover-lift bg-white p-5 sm:p-6 lg:p-8 rounded-2xl border border-neutral-200/90 text-center space-y-1 relative group hover:border-emerald-300 transition-all shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-neutral-950 group-hover:text-emerald-700 transition-colors">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-neutral-900">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-500">
                {metric.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Zap className="w-4 h-4" />
              <span>Full-Stack Enterprise Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
              Engineered for resilience, <br />
              built for <span className="text-emerald-700">enterprise uptime.</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-emerald-700 transition-colors group"
          >
            <span>View all 6 service specialisms</span>
            <ChevronRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid with Hover.css Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;
            const isAi = service.id === 'ai-chatbot';

            return (
              <div
                key={service.id}
                className={`hover-lift bg-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border transition-all ${
                  isAi 
                    ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-sm ring-1 ring-emerald-500/10 hover:border-emerald-500' 
                    : 'border-neutral-200/90 hover:border-neutral-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* AI Spotlight Badge */}
                {isAi && (
                  <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Flagship AI</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    isAi 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-neutral-100 text-neutral-900 border-neutral-200'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700">
                    {service.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <Link
                    to={isAi ? '/services/ai-chatbot' : `/services#${service.id}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-neutral-800 group-hover:text-emerald-700 transition-colors"
                  >
                    <span>{isAi ? 'Explore AI Architecture & Demo' : 'Detailed Technical Specs'}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white p-8 sm:p-12 lg:p-14 border border-emerald-200/90 text-neutral-900 overflow-hidden shadow-xs bg-gradient-to-br from-emerald-50/40 via-white to-white">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5 text-emerald-700" />
                <span>Private Enterprise RAG Systems</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                Private AI assistants engineered for <br className="hidden sm:inline" />
                <span className="text-emerald-700">internal UK operations.</span>
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed max-w-xl">
                Trained on your private documentation and technical manuals with zero external data sharing. We engineer retrieval-augmented systems for staff policy lookup, automated Tier-1 support triage, and document synthesis under strict UK GDPR compliance.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/services/ai-chatbot"
                  className="hover-button-scale px-6 py-3 rounded-xl bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-sm group"
                >
                  <span>Explore AI Architecture &amp; Demo</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact?service=AI+Chatbot+Development"
                  className="hover-button-scale px-6 py-3 rounded-xl bg-white text-neutral-800 hover:text-neutral-950 border border-neutral-300 font-semibold text-sm transition-all shadow-2xs"
                >
                  Request Technical Feasibility Review
                </Link>
              </div>
            </div>

            {/* Visual Simulator Preview */}
            <div className="lg:col-span-5">
              <div className="hover-lift rounded-2xl bg-neutral-50 border border-neutral-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 beacon-pulse" />
                    <span className="text-xs font-bold text-neutral-950 font-mono">GreensLeaf Assistant</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">London VPC &bull; Sub-100ms</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white text-neutral-700 border border-neutral-200/80 shadow-2xs">
                    <strong className="text-neutral-400 block text-[10px] uppercase mb-1 font-mono">Staff Query:</strong>
                    "Can we verify policy section 4.2 eligibility without sending customer PII to external APIs?"
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/70 text-neutral-800 border border-emerald-200/80">
                    <strong className="text-emerald-800 block text-[10px] uppercase mb-1 font-mono">GreensLeaf Private Engine:</strong>
                    "Yes. Embeddings and document chunks remain within your UK VPC. Analysis produces verified section citations with zero external retention, aligned with DPA 2018 and FCA requirements."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES & PROVEN CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span>Client Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Tailored for regulated UK sectors
          </h2>
          <p className="text-base text-neutral-600">
            We understand the statutory, compliance, and latency requirements of British enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="hover-lift bg-white p-8 rounded-2xl border border-neutral-200/90 space-y-6 hover:border-emerald-300/80 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                  Sector Specialization
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-950">
                  {ind.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {ind.desc}
                </p>
              </div>

              {/* Case Study Card */}
              <div className="p-5 rounded-xl bg-neutral-50/90 border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 font-mono">Case Study: {ind.caseStudy.client}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase font-mono">Verified ROI</span>
                </div>
                <p className="text-xs text-neutral-600">
                  <strong className="text-neutral-800">Challenge: </strong>{ind.caseStudy.problem}
                </p>
                <div className="space-y-1.5 pt-1">
                  {ind.caseStudy.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY GREENSLEAF - 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            The GreensLeaf Standard
          </h2>
          <p className="text-sm text-neutral-600">
            Why leading UK organizations trust us with their core technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 group hover:border-emerald-300/80 transition-all">
            <span className="text-2xl font-bold font-mono text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700 transition-transform duration-200 inline-block">01</span>
            <h4 className="text-base font-heading font-bold text-neutral-950">Direct Senior Engineers</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No account managers or offshore tier-1 desks. You communicate directly with the senior engineers designing your architecture.
            </p>
          </div>

          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 group hover:border-emerald-300/80 transition-all">
            <span className="text-2xl font-bold font-mono text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700 transition-transform duration-200 inline-block">02</span>
            <h4 className="text-base font-heading font-bold text-neutral-950">Sovereign UK Data</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Full adherence to UK GDPR and the Data Protection Act 2018. All compute and storage remain inside British jurisdictions.
            </p>
          </div>

          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 group hover:border-emerald-300/80 transition-all">
            <span className="text-2xl font-bold font-mono text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700 transition-transform duration-200 inline-block">03</span>
            <h4 className="text-base font-heading font-bold text-neutral-950">Fixed-Price Clarity</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transparent, milestone-based Statements of Work (SOW). No runaway hourly billing or surprise infrastructure fees.
            </p>
          </div>

          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 group hover:border-emerald-300/80 transition-all">
            <span className="text-2xl font-bold font-mono text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700 transition-transform duration-200 inline-block">04</span>
            <h4 className="text-base font-heading font-bold text-neutral-950">Zero Technical Debt</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We engineer maintainable, fully-documented TypeScript, Python, and IaC repositories that your team can own indefinitely.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">Client Endorsements</span>
          <h2 className="text-3xl font-extrabold text-neutral-950">Trusted by UK Technology Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="hover-lift bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-6 hover:border-neutral-300 transition-all">
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="border-t border-neutral-100 pt-4">
                <div className="text-sm font-heading font-bold text-neutral-950">{t.author}</div>
                <div className="text-xs text-emerald-700 font-semibold">{t.title} &bull; {t.company}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Clarity</span>
          <h2 className="text-3xl font-extrabold text-neutral-950">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-neutral-950 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-100/80 text-neutral-950 p-8 sm:p-14 text-center border border-neutral-200/90 space-y-6 relative overflow-hidden shadow-xs">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
              Ready to review your <br />
              <span className="text-emerald-700">cloud or AI infrastructure?</span>
            </h2>
            <p className="text-base text-neutral-600">
              Speak directly with a senior UK solution architect. No sales intermediaries — just clear technical roadmaps, fixed-scope proposals, and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Technical Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-semibold text-sm hover:bg-neutral-50 hover-button-scale transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Email {COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
