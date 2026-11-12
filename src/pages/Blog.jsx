import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../mockData';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Artificial Intelligence', 'Cybersecurity & Compliance', 'Cloud Engineering'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4 animate__animated animate__fadeInDown">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>GreensLeaf Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Engineering Insights &amp; <br />
          <span className="text-emerald-700">UK Technology Analysis</span>
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed font-sans">
          Deep-dives on artificial intelligence adoption, cloud infrastructure resilience, and statutory cybersecurity compliance for British technology leaders.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover-button-scale ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 shadow-2xs font-sans"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-3xl bg-white p-7 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-6 hover-lift transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold shadow-2xs">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-heading font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {post.summary}
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">{post.date}</span>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-950 group-hover:text-emerald-700 transition-colors group/link"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
