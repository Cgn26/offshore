import React, { useState } from 'react';
import { Phone, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function FloatingCallButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      aria-label="Contact GreensLeaf by phone"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Tooltip Badge */}
      <div 
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel shadow-2xl transition-all duration-300 pointer-events-none ${
          isHovered 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-medium text-neutral-300">
          UK Direct Hotline:
        </span>
        <span className="text-xs font-bold text-white tracking-wide">
          {COMPANY_INFO.phoneDisplay}
        </span>
      </div>

      {/* Main Floating Trigger Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 border border-emerald-500/40 text-emerald-400 shadow-[0_8px_30px_rgb(0,0,0,0.6)] hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 glow-pill focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        aria-label={`Call GreensLeaf at ${COMPANY_INFO.phoneDisplay}`}
        title={`Call GreensLeaf UK (${COMPANY_INFO.phoneDisplay})`}
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />

        <Phone className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Status indicator dot */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
      </a>
    </aside>
  );
}
