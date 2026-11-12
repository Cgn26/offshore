import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function FloatingCallButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      aria-label="Contact GreensLeaf by phone"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Tooltip Badge */}
      <div 
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-neutral-200/90 shadow-xl transition-all duration-300 pointer-events-none ${
          isHovered 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-medium text-neutral-600">
          UK Direct Line:
        </span>
        <span className="text-xs font-bold text-neutral-950 tracking-wide">
          {COMPANY_INFO.phoneDisplay}
        </span>
      </div>

      {/* Main Floating Trigger Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:bg-emerald-600 hover:border-emerald-500 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label={`Call GreensLeaf at ${COMPANY_INFO.phoneDisplay}`}
        title={`Call GreensLeaf UK (${COMPANY_INFO.phoneDisplay})`}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12 text-emerald-400 group-hover:text-white" />
        
        {/* Status indicator dot */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full" />
      </a>
    </aside>
  );
}
