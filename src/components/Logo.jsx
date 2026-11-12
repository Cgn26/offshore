import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <Link 
      to="/" 
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 ${className}`}
      aria-label="GreensLeaf Home"
    >
      {/* Sleek Modern Emblem Badge */}
      <div 
        className={`relative flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-105 ${
          isLarge ? 'w-11 h-11 rounded-2xl' : isSmall ? 'w-8 h-8 rounded-lg' : 'w-9 h-9'
        }`}
      >
        {/* Subtle Leaf Monogram (G + Leaf Stem) */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={isLarge ? 'w-6 h-6' : isSmall ? 'w-4 h-4' : 'w-5 h-5'}
        >
          {/* Main Ring (G shape) */}
          <path 
            d="M20 9C13.9 9 9 13.9 9 20C9 26.1 13.9 31 20 31C26.1 31 30.5 26.5 30.5 20.5H20" 
            stroke="url(#glGradLight)" 
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
          {/* Accent dot */}
          <circle cx="20" cy="14" r="1.5" fill="#86efac" />
          
          <defs>
            <linearGradient id="glGradLight" x1="9" y1="9" x2="31" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4ade80" />
              <stop offset="1" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name (Without Tagline as requested) */}
      <span 
        className={`font-heading font-extrabold tracking-tight text-neutral-950 flex items-center leading-none ${
          isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl'
        }`}
      >
        Greens<span className="text-emerald-600 font-semibold">Leaf</span>
      </span>
    </Link>
  );
}
