import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, Bot, Code2, Cloud, ShieldCheck, Headphones, 
  BarChart3, CheckCircle2, ChevronDown, ChevronRight, Phone, 
  Sparkles, Zap, Award, Lock, Server
} from 'lucide-react';
import { COMPANY_INFO, CORE_METRICS, SERVICES, INDUSTRIES, TESTIMONIALS, FAQS } from '../mockData';

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
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-neutral-800/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-neutral-700/60 shadow-lg glow-pill">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">
                UK Enterprise IT Agency &bull; London HQ
              </span>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-xs text-emerald-400 font-medium">
                Direct UK Engineers
              </span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Mission-Critical <br className="hidden sm:inline" />
              <span className="text-gradient">IT Engineering &amp; </span>
              <span className="text-emerald-400">Intelligent AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              GreensLeaf designs, deploys, and manages high-performance cloud platforms and autonomous AI chatbots for UK enterprises. Strict data sovereignty, guaranteed SLAs, zero offshore handoffs.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-neutral-950 font-bold text-base hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Book Technical Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-white font-semibold text-base hover:bg-neutral-800/70 border border-neutral-700/80 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cyber Essentials Plus Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>UK GDPR &amp; DPA 2018 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>ISO 27001 Aligned Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>London Sovereign VPCs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CORE_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-neutral-800/80 text-center space-y-1 relative group hover:border-neutral-700 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-400">
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
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>Full-Stack Enterprise Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered for resilience, <br />
              scaled for <span className="text-gradient">maximum conversion.</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <span>View all 6 service specialisms</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;
            const isAi = service.id === 'ai-chatbot';

            return (
              <div
                key={service.id}
                className={`glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group ${
                  isAi ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-neutral-900/60 shadow-[0_0_40px_rgba(34,197,94,0.08)]' : ''
                }`}
              >
                {/* AI Spotlight Badge */}
                {isAi && (
                  <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Flagship AI Service</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isAi 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : 'bg-neutral-800/80 text-white border-neutral-700/80'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-neutral-800/60 text-xs text-neutral-300">
                    {service.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/60">
                  <Link
                    to={isAi ? '/services/ai-chatbot' : `/services#${service.id}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors"
                  >
                    <span>{isAi ? 'Explore AI Architecture' : 'Detailed Technical Specs'}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 lg:p-16 border border-emerald-500/30 overflow-hidden bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5" />
                <span>Private Enterprise RAG Systems</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Empower your workforce with <br className="hidden sm:inline" />
                <span className="text-emerald-400">custom AI agents.</span>
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed max-w-xl">
                Trained on your private documentation with zero-data leakage. We engineer bespoke AI chatbots capable of answering complex Tier-1 IT requests, client queries, and document synthesis under strict UK GDPR compliance.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/services/ai-chatbot"
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Explore AI Chatbot Solutions</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-700 font-semibold text-sm transition-all"
                >
                  Request a Custom Demo
                </Link>
              </div>
            </div>

            {/* Visual Simulator Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-neutral-950/90 border border-neutral-800 p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white font-mono">GreensLeaf Assistant v2.5</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">UK VPC &bull; 42ms Latency</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900/80 text-neutral-300 border border-neutral-800">
                    <strong className="text-neutral-400 block text-[10px] uppercase mb-1">User Query:</strong>
                    "Can we automate our client onboarding KYC verification while keeping all documents inside UK borders?"
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 text-neutral-200 border border-emerald-500/20">
                    <strong className="text-emerald-400 block text-[10px] uppercase mb-1">GreensLeaf AI Engine:</strong>
                    "Yes. We configure localized Llama 3 or Claude via private London VPC endpoints. Document analysis occurs with zero external retention, producing verified audit trails aligned with FCA and DPA 2018 guidelines."
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
                  <span>99.4% Citation Accuracy</span>
                  <span className="text-emerald-400 font-medium">Ready for deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES & PROVEN CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <span>Client Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tailored for regulated UK sectors
          </h2>
          <p className="text-base text-neutral-400">
            We understand the unique statutory, compliance, and latency requirements of British enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="glass-panel p-8 rounded-2xl border-neutral-800/80 space-y-6 hover:border-neutral-700 transition-all"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Sector Specialization
                </span>
                <h3 className="text-2xl font-heading font-bold text-white">
                  {ind.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {ind.desc}
                </p>
              </div>

              {/* Case Study Card */}
              <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Case Study: {ind.caseStudy.client}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Verified ROI</span>
                </div>
                <p className="text-xs text-neutral-400">
                  <strong className="text-neutral-300">Challenge: </strong>{ind.caseStudy.problem}
                </p>
                <div className="space-y-1.5 pt-1">
                  {ind.caseStudy.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY GREENSLEAF - APPLE MINIMALISM 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The GreensLeaf Standard
          </h2>
          <p className="text-sm text-neutral-400">
            Why leading UK organizations trust us with their core technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-neutral-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">01</span>
            <h4 className="text-base font-heading font-bold text-white">Direct Senior Engineers</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No account managers or offshore tier-1 desks. You communicate directly with the senior engineers designing your architecture.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-neutral-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">02</span>
            <h4 className="text-base font-heading font-bold text-white">Sovereign UK Data</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Full adherence to UK GDPR and the Data Protection Act 2018. All compute and storage remain inside British jurisdictions.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-neutral-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">03</span>
            <h4 className="text-base font-heading font-bold text-white">Fixed-Price Clarity</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Transparent, milestone-based Statements of Work (SOW). No runaway hourly billing or surprise infrastructure fees.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-neutral-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">04</span>
            <h4 className="text-base font-heading font-bold text-white">Zero Technical Debt</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We engineer maintainable, fully-documented TypeScript, Python, and IaC repositories that your team can own indefinitely.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Endorsements</span>
          <h2 className="text-3xl font-extrabold text-white">Trusted by UK Technology Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border-neutral-800 flex flex-col justify-between space-y-6">
              <p className="text-sm text-neutral-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="border-t border-neutral-800/80 pt-4">
                <div className="text-sm font-heading font-bold text-white">{t.author}</div>
                <div className="text-xs text-emerald-400 font-medium">{t.title} &bull; {t.company}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Clarity</span>
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl border-neutral-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
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
        <div className="rounded-3xl glass-panel p-8 sm:p-14 text-center border-neutral-700/80 space-y-6 relative overflow-hidden bg-gradient-to-b from-neutral-900 to-[#08090d]">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to modernize your <br />
              <span className="text-emerald-400">enterprise IT infrastructure?</span>
            </h2>
            <p className="text-base text-neutral-400">
              Speak directly with a senior UK solution architect. No sales fluff — just clear technical roadmaps, fixed-scope proposals, and guaranteed delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Technical Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
