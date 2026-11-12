import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Code2, Cloud, ShieldCheck, Headphones, BarChart3, 
  CheckCircle2, ArrowUpRight, Cpu, Layers, Terminal, Sparkles 
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../mockData';

export default function Services() {
  const iconMap = {
    Bot: Bot,
    Code2: Code2,
    Cloud: Cloud,
    ShieldCheck: ShieldCheck,
    Headphones: Headphones,
    BarChart3: BarChart3,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4 animate__animated animate__fadeInDown">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span>UK Engineering Practices</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Comprehensive <br />
          <span className="text-emerald-700">Enterprise IT Services</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans">
          From custom autonomous AI agents to multi-region cloud infrastructures, GreensLeaf delivers battle-tested technology with senior UK engineers and guaranteed uptime SLAs.
        </p>
      </div>

      {/* Services List Detailed */}
      <div className="space-y-12">
        {SERVICES.map((srv, idx) => {
          const Icon = iconMap[srv.icon] || Code2;
          const isAi = srv.id === 'ai-chatbot';

          return (
            <div
              key={srv.id}
              id={srv.id}
              className={`rounded-3xl bg-white p-8 sm:p-12 border relative overflow-hidden transition-all duration-300 hover-lift ${
                isAi 
                  ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/40 via-white to-white shadow-sm ring-1 ring-emerald-500/20' 
                  : 'border-neutral-200/90 shadow-xs'
              }`}
            >
              {isAi && (
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>Flagship AI Service</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xs transition-transform duration-300 group-hover:scale-105 ${
                      isAi 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : 'bg-neutral-100 text-neutral-900 border-neutral-200'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-emerald-700 font-semibold tracking-wider">PRACTICE // 0{idx + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-950">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-neutral-600 leading-relaxed font-sans">
                    {srv.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Core Technical Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {srv.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {isAi ? (
                      <Link
                        to="/services/ai-chatbot"
                        className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 hover-button-scale inline-flex items-center gap-2 shadow-xs group"
                      >
                        <span>Deep Dive AI Chatbot Architecture</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link
                        to={`/contact?service=${encodeURIComponent(srv.title)}`}
                        className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 hover-button-scale inline-flex items-center gap-2 shadow-xs group"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    )}
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="px-5 py-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 hover:text-neutral-950 hover:bg-neutral-200 hover-button-scale text-xs font-semibold transition-colors"
                    >
                      Call Senior Engineer
                    </a>
                  </div>
                </div>

                {/* Right Specs Card */}
                <div className="lg:col-span-5 space-y-6 bg-neutral-50/80 border border-neutral-200 p-6 rounded-2xl shadow-2xs">
                  {/* Deliverables */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 font-heading">
                      <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Standard Deliverables</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-sans">
                      {srv.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="space-y-3 border-t border-neutral-200 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 font-heading">
                      <Cpu className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Production Tech Stack</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-[11px] font-mono text-neutral-800 shadow-2xs hover-tag cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
