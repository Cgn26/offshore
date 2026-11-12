import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight, Building2, Stethoscope, ShoppingCart, Scale, ShieldAlert } from 'lucide-react';
import { INDUSTRIES, COMPANY_INFO } from '../mockData';

export default function Industries() {
  const iconList = [Building2, Stethoscope, ShoppingCart, Scale];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <span>Regulated UK Sectors</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Industries &amp; Proven <br />
          <span className="text-emerald-400">Enterprise Case Studies</span>
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          High-assurance software engineering designed specifically to address strict regulatory compliance, low-latency transaction demands, and data sovereignty in the UK.
        </p>
      </div>

      {/* Grid of Industries and Deep Case Studies */}
      <div className="space-y-12">
        {INDUSTRIES.map((ind, idx) => {
          const SectorIcon = iconList[idx % iconList.length];

          return (
            <div
              key={ind.id}
              className="rounded-3xl glass-panel p-8 sm:p-12 border border-neutral-800 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-emerald-400">
                    <SectorIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase">Sector 0{idx + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                      {ind.title}
                    </h2>
                  </div>
                </div>
                <Link
                  to={`/contact?industry=${encodeURIComponent(ind.title)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                >
                  <span>Inquire for {ind.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>

              <p className="text-base text-neutral-300 leading-relaxed max-w-3xl">
                {ind.desc}
              </p>

              {/* Case Study Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950/80 p-6 sm:p-8 rounded-2xl border border-neutral-800/80">
                <div className="lg:col-span-5 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Client Engagement</span>
                    <h3 className="text-xl font-bold text-white">{ind.caseStudy.client}</h3>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">The Challenge</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {ind.caseStudy.problem}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-neutral-800/80 lg:pl-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">The GreensLeaf Solution</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {ind.caseStudy.solution}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Verified Business Impact</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ind.caseStudy.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-xs text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Call to Action */}
      <div className="text-center rounded-2xl glass-panel p-10 border border-neutral-800 space-y-4">
        <h3 className="text-2xl font-bold text-white">Have custom compliance or latency parameters?</h3>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Our senior UK solution architects can audit your existing architecture and supply a verified remediation or modernization roadmap.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            <span>Request Sector Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
