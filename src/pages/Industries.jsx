import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight, Building2, Stethoscope, ShoppingCart, Scale } from 'lucide-react';
import { INDUSTRIES, COMPANY_INFO } from '../mockData';

export default function Industries() {
  const iconList = [Building2, Stethoscope, ShoppingCart, Scale];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <span>Regulated UK Sectors</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Industries &amp; Proven <br />
          <span className="text-emerald-700">Enterprise Case Studies</span>
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
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
              className="rounded-3xl bg-white p-8 sm:p-12 border border-neutral-200 shadow-xs space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-emerald-700">
                    <SectorIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-700 uppercase font-semibold">Sector 0{idx + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-950">
                      {ind.title}
                    </h2>
                  </div>
                </div>
                <Link
                  to={`/contact?industry=${encodeURIComponent(ind.title)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
                >
                  <span>Inquire for {ind.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                </Link>
              </div>

              <p className="text-base text-neutral-600 leading-relaxed max-w-3xl">
                {ind.desc}
              </p>

              {/* Case Study Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-50/70 p-6 sm:p-8 rounded-2xl border border-neutral-200">
                <div className="lg:col-span-5 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Client Engagement</span>
                    <h3 className="text-xl font-bold text-neutral-950">{ind.caseStudy.client}</h3>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wide">The Challenge</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {ind.caseStudy.problem}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-neutral-200 lg:pl-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">The GreensLeaf Solution</h4>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      {ind.caseStudy.solution}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Verified Business Impact</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ind.caseStudy.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-neutral-200 text-xs text-emerald-800 font-medium shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
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
    </div>
  );
}
