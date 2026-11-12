import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowUpRight, Phone } from 'lucide-react';
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
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
            {post.category}
          </span>
          <span className="text-neutral-300">&bull;</span>
          <span className="text-neutral-500">{post.readTime}</span>
          <span className="text-neutral-300">&bull;</span>
          <span className="text-neutral-500">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-neutral-600 leading-relaxed">
          {post.summary}
        </p>

        <div className="text-xs text-neutral-500 pt-2">
          By <strong className="text-neutral-900">{post.author}</strong> &bull; GreensLeaf Engineering Practice
        </div>
      </div>

      {/* Article Body */}
      <div className="text-neutral-700 space-y-6 text-sm sm:text-base leading-relaxed">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={idx} className="space-y-2 list-disc list-inside text-neutral-700">
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
      <div className="rounded-3xl bg-neutral-50 p-8 border border-neutral-200 space-y-4 mt-12">
        <h3 className="text-xl font-bold text-neutral-950">Need advice on implementing this in your architecture?</h3>
        <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
          Contact GreensLeaf for a confidential, NDA-backed technical assessment. Our senior engineers in London &amp; Luton can review your requirements and provide clear implementation milestones.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="px-5 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 hover:text-neutral-950 font-semibold text-xs transition-colors inline-flex items-center gap-2 shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
