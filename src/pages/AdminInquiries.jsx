import React, { useState, useEffect } from 'react';
import { 
  Inbox, RefreshCw, Mail, Phone, Building, Calendar, 
  CheckCircle2, AlertTriangle, ShieldCheck, Download, Search 
} from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiError, setApiError] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch('/api/inquiry');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      } else {
        setApiError('Unable to connect to backend database.');
      }
    } catch (err) {
      console.warn('Backend fetch error:', err);
      setApiError('API server offline or unreachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchTerm.toLowerCase();
    return (
      (inq.fullName && inq.fullName.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(q)) ||
      (inq.subject && inq.subject.toLowerCase().includes(q))
    );
  });

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `greensleaf-inquiries-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Lead Captures Database</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Client Inquiries &amp; Lead Management
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            All contact submissions captured in MongoDB / JSON storage. Form submissions forward to <span className="text-white font-mono">{COMPANY_INFO.email}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportToJson}
            disabled={inquiries.length === 0}
            className="px-3.5 py-2 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Leads</span>
          </button>
        </div>
      </div>

      {/* Filter and stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-neutral-400 font-mono">
          Total Captured: <span className="text-emerald-400 font-bold">{inquiries.length} inquiries</span>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, company..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="p-12 text-center text-neutral-500 text-xs glass-panel rounded-2xl">
          Loading inquiries from database...
        </div>
      ) : apiError ? (
        <div className="p-8 text-center text-neutral-400 text-xs glass-panel rounded-2xl border-rose-500/30">
          <AlertTriangle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
          <p className="font-semibold text-rose-300">{apiError}</p>
          <p className="mt-1">Make sure the backend server is running (<code className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200">npm run server</code>).</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="p-16 text-center text-neutral-400 text-xs glass-panel rounded-2xl border-neutral-800 space-y-2">
          <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
          <p className="text-sm font-semibold text-white">No inquiries recorded yet.</p>
          <p className="text-neutral-500 max-w-sm mx-auto">
            Submit a test form from the Contact page to see real-time database capture and lead recording.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl glass-panel p-6 border border-neutral-800 space-y-4 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {inq.fullName ? inq.fullName.charAt(0).toUpperCase() : 'L'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{inq.fullName}</h3>
                    <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                      <span>{inq.companyName || 'Independent'}</span>
                      <span>&bull;</span>
                      <span className="text-neutral-500">{inq.companySize} staff</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">{inq.industry}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  <span>{new Date(inq.timestamp).toLocaleString('en-GB')}</span>
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="font-mono text-[10px] text-neutral-500">ID: {inq.id}</span>
                </div>
              </div>

              {/* Message Box */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-1">
                <div className="font-semibold text-neutral-300">
                  Subject: <span className="text-white">{inq.subject}</span>
                </div>
                <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap">
                  {inq.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
