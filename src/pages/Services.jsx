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
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>UK Engineering Practices</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Comprehensive <br />
          <span className="text-emerald-400">Enterprise IT Services</span>
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          From custom AI agents to multi-region cloud infrastructures, GreensLeaf delivers battle-tested technology with senior UK engineers and guaranteed uptime SLAs.
        </p>
      </div>

      {/* Services List Detailed */}
      <div className="space-y-16">
        {SERVICES.map((srv, idx) => {
          const Icon = iconMap[srv.icon] || Code2;
          const isAi = srv.id === 'ai-chatbot';

          return (
            <div
              key={srv.id}
              id={srv.id}
              className={`rounded-3xl glass-panel p-8 sm:p-12 border relative overflow-hidden transition-all ${
                isAi 
                  ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-neutral-900 to-neutral-950 shadow-[0_0_50px_rgba(34,197,94,0.06)]' 
                  : 'border-neutral-800'
              }`}
            >
              {isAi && (
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship AI Service</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                      isAi 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-neutral-800 text-white border-neutral-700'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-500">SERVICE // 0{idx + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-neutral-300 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Core Technical Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {srv.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
                        className="px-6 py-3 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400 transition-colors inline-flex items-center gap-2"
                      >
                        <span>Deep Dive AI Chatbot Architecture</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link
                        to={`/contact?service=${encodeURIComponent(srv.title)}`}
                        className="px-6 py-3 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Call Senior Engineer
                    </a>
                  </div>
                </div>

                {/* Right Specs Card */}
                <div className="lg:col-span-5 space-y-6 bg-neutral-950/70 border border-neutral-800/80 p-6 rounded-2xl">
                  {/* Deliverables */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Standard Deliverables</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {srv.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="space-y-3 border-t border-neutral-800/80 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Production Tech Stack</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
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
