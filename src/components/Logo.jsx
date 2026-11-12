import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', showSubtitle = true, className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <Link 
      to="/" 
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
      aria-label="GreensLeaf Home"
    >
      {/* Sleek Modern Emblem Badge */}
      <div 
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/80 shadow-inner overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-neutral-700 ${
          isLarge ? 'w-12 h-12 rounded-2xl' : isSmall ? 'w-8 h-8 rounded-lg' : 'w-10 h-10'
        }`}
      >
        {/* Subtle Green Ambient Glow */}
        <div className="absolute inset-0 bg-emerald-500/10 blur-[8px] pointer-events-none" />

        {/* Minimalist Geometric Monogram: G + Leaf Stem */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={isLarge ? 'w-7 h-7' : isSmall ? 'w-5 h-5' : 'w-6 h-6'}
        >
          {/* Main Ring (G shape) */}
          <path 
            d="M20 9C13.9 9 9 13.9 9 20C9 26.1 13.9 31 20 31C26.1 31 30.5 26.5 30.5 20.5H20" 
            stroke="url(#glGrad)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner Leaf Stem */}
          <path 
            d="M15 25L25 15" 
            stroke="#4ade80" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            opacity="0.9"
          />
          {/* Subtle Dot Accent */}
          <circle cx="20" cy="14" r="1.5" fill="#86efac" />
          
          <defs>
            <linearGradient id="glGrad" x1="9" y1="9" x2="31" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4ade80" />
              <stop offset="1" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span 
          className={`font-heading font-extrabold tracking-tight text-white flex items-center leading-none ${
            isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl'
          }`}
        >
          Greens<span className="text-emerald-400 font-semibold">Leaf</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mt-0.5">
            UK IT &amp; AI AGENCY
          </span>
        )}
      </div>
    </Link>
  );
}
