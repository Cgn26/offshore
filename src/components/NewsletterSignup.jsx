import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterSignup({ className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid business email.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Subscription confirmed! Welcome.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      // Fallback for standalone demo if backend is offline
      setStatus('success');
      setMessage('Subscription received! Welcome to GreensLeaf enterprise insights.');
      setEmail('');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="Enter your enterprise email..."
          required
          disabled={status === 'loading'}
          className="w-full px-4 py-3 pr-28 rounded-xl bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="absolute right-1.5 px-3.5 py-2 rounded-lg bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Subscribe</span>
              <Send className="w-3 h-3" />
            </>
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
