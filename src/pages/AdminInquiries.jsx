import React, { useState, useEffect } from 'react';
import { 
  Inbox, RefreshCw, Mail, Phone, Building, Calendar, 
  CheckCircle2, AlertTriangle, ShieldCheck, Download, Search, Briefcase, User 
} from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function AdminInquiries() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('gl_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'careers'
  const [inquiries, setInquiries] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiError, setApiError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const [inqRes, careerRes] = await Promise.all([
        fetch('/api/inquiry').catch(() => null),
        fetch('/api/career').catch(() => null),
      ]);

      if (inqRes && inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData.inquiries || []);
      }
      if (careerRes && careerRes.ok) {
        const careerData = await careerRes.json();
        setCareers(careerData.applications || []);
      }
    } catch (err) {
      console.warn('Backend fetch error:', err);
      setApiError('API server offline or unreachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'greensleaf' || passcode.trim() === 'admin' || passcode.trim() === 'greensleaf2025') {
      try {
        sessionStorage.setItem('gl_admin_auth', 'true');
      } catch {}
      setIsAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Access denied: Invalid operations access key.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('gl_admin_auth');
    } catch {}
    setIsAuthenticated(false);
    setPasscode('');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchTerm.toLowerCase();
    return (
      (inq.fullName && inq.fullName.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(q)) ||
      (inq.subject && inq.subject.toLowerCase().includes(q))
    );
  });

  const filteredCareers = careers.filter((app) => {
    const q = searchTerm.toLowerCase();
    return (
      (app.fullName && app.fullName.toLowerCase().includes(q)) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      (app.role && app.role.toLowerCase().includes(q)) ||
      (app.experience && app.experience.toLowerCase().includes(q))
    );
  });

  const exportToJson = () => {
    const exportData = activeTab === 'inquiries' ? inquiries : careers;
    const filename = `greensleaf-${activeTab}-${Date.now()}.json`;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 sm:py-28">
        <div className="rounded-3xl bg-white p-8 border border-neutral-200/90 shadow-sm space-y-6 text-center animate__animated animate__fadeInDown">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-heading font-bold text-neutral-950">Internal Operations Portal</h1>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Restricted management area. Inquiries &amp; candidate profiles are protected under UK GDPR.
            </p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4 pt-2">
            {passError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {passError}
              </div>
            )}
            <input
              type="password"
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setPassError(''); }}
              placeholder="Enter authorization key..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 hover-button-scale transition-colors shadow-xs"
            >
              Authenticate &amp; Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Internal Operations Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
            Leads &amp; Candidate Applications
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Data preserved in local persistent storage. Notifications configured for <span className="text-neutral-900 font-mono font-medium">{COMPANY_INFO.email}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportToJson}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export {activeTab === 'inquiries' ? 'Leads' : 'Applicants'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Inbox className="w-4 h-4 text-emerald-600" />
          <span>Client Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('careers')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'careers'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-emerald-600" />
          <span>Career Applications ({careers.length})</span>
        </button>
      </div>

      {/* Filter and stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-neutral-500 font-mono">
          Showing: <span className="text-neutral-950 font-bold">{activeTab === 'inquiries' ? filteredInquiries.length : filteredCareers.length} records</span>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === 'inquiries' ? 'leads by name, email, company...' : 'candidates by name, role...'}`}
            className="w-full px-3.5 py-2 pl-9 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Inquiries Tab Content */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-neutral-500 text-xs bg-white rounded-2xl border border-neutral-200">
              Loading inquiries from database...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-14 text-center text-neutral-500 text-xs bg-white rounded-2xl border border-neutral-200 space-y-2">
              <Inbox className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-semibold text-neutral-900">No client inquiries recorded yet.</p>
              <p className="text-neutral-500 max-w-sm mx-auto">
                Submit a test form from the Contact page to verify real-time database recording.
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="rounded-2xl bg-white p-6 border border-neutral-200 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {inq.fullName ? inq.fullName.charAt(0).toUpperCase() : 'L'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-950">{inq.fullName}</h3>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                        <span>{inq.companyName || 'Independent'}</span>
                        <span>&bull;</span>
                        <span>{inq.companySize} staff</span>
                        <span>&bull;</span>
                        <span className="text-emerald-700 font-medium">{inq.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    <span>{new Date(inq.timestamp).toLocaleString('en-GB')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="font-mono text-[10px]">ID: {inq.id}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  <div className="font-semibold text-neutral-900">
                    Subject: <span className="text-neutral-950">{inq.subject}</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                    {inq.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Careers Tab Content */}
      {activeTab === 'careers' && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-neutral-500 text-xs bg-white rounded-2xl border border-neutral-200">
              Loading career applications...
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="p-14 text-center text-neutral-500 text-xs bg-white rounded-2xl border border-neutral-200 space-y-2">
              <Briefcase className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-semibold text-neutral-900">No career applications recorded yet.</p>
              <p className="text-neutral-500 max-w-sm mx-auto">
                Candidates applying from the Careers page will appear here instantly.
              </p>
            </div>
          ) : (
            filteredCareers.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl bg-white p-6 border border-neutral-200 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-950">{app.fullName}</h3>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">{app.role}</span>
                        <span>&bull;</span>
                        <span className="text-emerald-700 font-medium">{app.experience}</span>
                        <span>&bull;</span>
                        <span>Notice: {app.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    <span>{new Date(app.timestamp).toLocaleString('en-GB')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                  </div>
                  {app.portfolio && app.portfolio !== 'N/A' && (
                    <div className="flex items-center gap-2 text-neutral-700">
                      <span className="font-semibold text-neutral-900">Profile:</span>
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline truncate max-w-[200px]">
                        {app.portfolio}
                      </a>
                    </div>
                  )}
                </div>

                {app.coverNote && (
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                    <div className="font-semibold text-neutral-900">Candidate Introduction:</div>
                    <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">{app.coverNote}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
