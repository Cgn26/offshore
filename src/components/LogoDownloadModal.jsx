import React, { useState } from 'react';
import { Download, X, Check, FileImage, Sparkles, Copy } from 'lucide-react';
import Logo from './Logo';

export default function LogoDownloadModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySvg = async () => {
    try {
      const res = await fetch('/logo.svg');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy SVG', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl glass-panel p-6 sm:p-8 border border-neutral-700/80 shadow-2xl space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logo-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Brand Asset</span>
          </div>
          <h3 id="logo-modal-title" className="text-xl sm:text-2xl font-heading font-bold text-white">
            Download GreensLeaf Logo
          </h3>
          <p className="text-sm text-neutral-400">
            Export the official monochrome &amp; emerald logo as high-res PNG or scalable vector SVG.
          </p>
        </div>

        {/* Live Logo Preview Box */}
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-neutral-950/80 border border-neutral-800/80 relative overflow-hidden group">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Logo size="large" showSubtitle={true} />
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mt-2">
              Apple-Style Minimalist Lockup
            </span>
          </div>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* PNG Download Button */}
          <a
            href="/logo.png"
            download="greensleaf-logo.png"
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 shadow-lg active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG (512px)</span>
          </a>

          {/* SVG Download Button */}
          <a
            href="/logo.svg"
            download="greensleaf-logo.svg"
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-neutral-800 text-white font-semibold text-sm hover:bg-neutral-700 border border-neutral-700 transition-all duration-200 active:scale-95"
          >
            <FileImage className="w-4 h-4" />
            <span>Download Vector SVG</span>
          </a>
        </div>

        {/* Copy SVG Action & Metadata */}
        <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/80 pt-4">
          <span>Format: 32-bit RGBA &bull; Transparent ready</span>
          <button
            onClick={handleCopySvg}
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SVG to Clipboard!' : 'Copy Raw SVG Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
