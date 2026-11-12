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
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>GreensLeaf Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Engineering Insights &amp; <br />
          <span className="text-emerald-400">UK Technology Analysis</span>
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          Deep-dives on artificial intelligence adoption, cloud infrastructure resilience, and statutory cybersecurity compliance for British technology leaders.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
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
            className="w-full px-3.5 py-2 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-3xl glass-panel p-7 border border-neutral-800 flex flex-col justify-between space-y-6 hover:border-neutral-700 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-heading font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-neutral-400 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="border-t border-neutral-800/80 pt-4 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">{post.date}</span>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
