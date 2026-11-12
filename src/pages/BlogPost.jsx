import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight, Phone } from 'lucide-react';
import { BLOG_POSTS, COMPANY_INFO } from '../mockData';

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            {post.category}
          </span>
          <span className="text-neutral-500">&bull;</span>
          <span className="text-neutral-400">{post.readTime}</span>
          <span className="text-neutral-500">&bull;</span>
          <span className="text-neutral-400">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-neutral-300 leading-relaxed">
          {post.summary}
        </p>

        <div className="text-xs text-neutral-500 pt-2">
          By <strong className="text-neutral-300">{post.author}</strong> &bull; GreensLeaf Engineering Practice
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-neutral-300 space-y-6 text-sm sm:text-base leading-relaxed">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-heading font-bold text-white pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={idx} className="space-y-2 list-disc list-inside text-neutral-300">
                {items.map((it, iIdx) => (
                  <li key={iIdx}>
                    {it.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Author & Consultation Box */}
      <div className="rounded-3xl glass-panel p-8 border border-neutral-800 space-y-4 mt-12 bg-neutral-950/70">
        <h3 className="text-xl font-bold text-white">Need advice on implementing this in your architecture?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
          Contact GreensLeaf for a confidential, NDA-backed technical assessment. Our senior engineers in London can review your requirements and provide clear implementation milestones.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
