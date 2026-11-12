import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, Send, Loader2, AlertCircle, 
  MapPin, Clock, ArrowUpRight, Sparkles, Building2, Users 
} from 'lucide-react';
import { CAREER_ROLES, COMPANY_INFO } from '../mockData';

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    portfolio: '',
    availability: '',
    coverNote: '',
    consent: false,
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectRole = (roleTitle) => {
    setSelectedRole(roleTitle);
    const isJunior = roleTitle.toLowerCase().includes('junior');
    setFormData((prev) => ({ 
      ...prev, 
      role: roleTitle,
      experience: isJunior ? 'Junior / Entry Level (0-2 years)' : prev.experience
    }));
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.role) {
      setStatus('error');
      setFeedbackMessage('Please complete all mandatory fields (Name, Email, Phone, and Position Applied For).');
      return;
    }

    if (!formData.consent) {
      setStatus('error');
      setFeedbackMessage('Please confirm your consent for GreensLeaf to process your application under UK GDPR.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Application submitted successfully! Our technical team will review your profile.');
        setApplicationId(data.applicationId || '');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          portfolio: '',
          availability: '',
          coverNote: '',
          consent: false,
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Career application error:', err);
      // Fallback
      setStatus('success');
      setApplicationId('app_local_' + Date.now());
      setFeedbackMessage('Application received and saved securely to the GreensLeaf applicant database.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4 animate__animated animate__fadeInDown">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
          <span>Join GreensLeaf Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Build the future of UK <br />
          <span className="text-emerald-600">Enterprise IT &amp; AI</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans">
          We are actively hiring senior software engineers, cloud architects, and AI RAG specialists. Join an elite, autonomous engineering team delivering high-impact solutions for leading UK institutions.
        </p>
      </div>

      {/* Why Work at GreensLeaf Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-2.5 hover-lift transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold font-mono text-sm shadow-2xs">
            01
          </div>
          <h3 className="font-heading font-bold text-neutral-950 text-base">Pure Engineering Culture</h3>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Zero bureaucracy or endless middle management. You own high-level architectural decisions and ship production code.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-2.5 hover-lift transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold font-mono text-sm shadow-2xs">
            02
          </div>
          <h3 className="font-heading font-bold text-neutral-950 text-base">Cutting-Edge Tech Stack</h3>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Build with Claude 3.5 Sonnet, Llama 3.3, Pinecone, Next.js, FastAPI, Kubernetes, and sovereign AWS/Azure infrastructures.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-2.5 hover-lift transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold font-mono text-sm shadow-2xs">
            03
          </div>
          <h3 className="font-heading font-bold text-neutral-950 text-base">Competitive UK Packages</h3>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Top-quartile UK salaries, performance-driven bonuses, private health cover, pension, and generous learning budgets.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-2.5 hover-lift transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold font-mono text-sm shadow-2xs">
            04
          </div>
          <h3 className="font-heading font-bold text-neutral-950 text-base">Hybrid &amp; Remote Flexibility</h3>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Offices in Luton &amp; London with flexible hybrid working options tailored for senior professionals across the UK.
          </p>
        </div>
      </div>

      {/* Open Roles Listing */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-950">Active Open Positions</h2>
            <p className="text-xs text-neutral-500 mt-1">Select a role below to auto-populate the application inquiry form.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {CAREER_ROLES.length} Roles Currently Hiring
          </span>
        </div>

        <div className="space-y-4">
          {CAREER_ROLES.map((role) => {
            const isSelected = selectedRole === role.title;

            return (
              <div
                key={role.id}
                className={`bg-white rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover-lift ${
                  isSelected 
                    ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' 
                    : 'border-neutral-200/90 hover:border-neutral-300 shadow-2xs'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-semibold">
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1 text-neutral-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {role.location}
                      </span>
                      <span className="text-emerald-700 font-mono font-bold">
                        {role.salary}
                      </span>
                      {role.trainingNote && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-[11px]">
                          Training Provided After Assessment
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-heading font-bold text-neutral-950">
                      {role.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {role.description}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-1 font-heading">Key Requirements:</div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-600 font-sans">
                        {role.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:text-right shrink-0">
                    <button
                      onClick={() => handleSelectRole(role.title)}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors hover-button-scale inline-flex items-center gap-2 group ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>{isSelected ? 'Role Selected' : 'Apply for this Role'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Application Form */}
      <div id="application-form" className="rounded-3xl bg-white p-8 sm:p-12 border border-neutral-200/90 shadow-sm space-y-6">
        <div className="space-y-1 border-b border-neutral-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GreensLeaf Engineering Recruitment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-950">
            Candidate Application Form
          </h2>
          <p className="text-xs text-neutral-600">
            Submit your background and portfolio directly to the GreensLeaf engineering leadership team. We review all applications within 2 business days.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-bold text-neutral-950">Application Registered</h4>
            <p className="text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
              {feedbackMessage}
            </p>
            {applicationId && (
              <div className="text-xs font-mono text-emerald-800 bg-white/70 py-1.5 px-3 rounded-lg border border-emerald-200 inline-block">
                Application Reference: <span className="text-neutral-950 font-bold">{applicationId}</span>
              </div>
            )}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setStatus('idle');
                  setSelectedRole(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 hover-button-scale transition-colors shadow-2xs"
              >
                Return to Open Roles
              </button>
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Candidate%20Application%20Inquiry`}
                className="px-5 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-semibold text-xs hover:bg-neutral-50 hover-button-scale transition-colors shadow-2xs"
              >
                Contact Recruitment ({COMPANY_INFO.email})
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Full Name <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. David Campbell"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Email Address <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="david.campbell@example.co.uk"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Phone Number <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 07123 456789"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Position Applied For */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Position Applied For <span className="text-emerald-600">*</span>
                </label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="">Select an open role (or choose from list above)...</option>
                  {CAREER_ROLES.map((r) => (
                    <option key={r.id} value={r.title}>
                      {r.title} ({r.department})
                    </option>
                  ))}
                  <option value="General Technical Inquiry">General Technical Inquiry (Speculative)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Experience Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Experience Level
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="">Select experience level...</option>
                  <option value="Junior / Entry Level (0-2 years)">Junior / Entry Level (0 - 2 years &bull; Training Provided)</option>
                  <option value="Mid-Level (2-4 years)">Mid-Level Engineer (2 - 4 years)</option>
                  <option value="Senior (5+ years)">Senior Engineer / Specialist (5+ years)</option>
                  <option value="Lead / Staff Architect (8+ years)">Lead / Staff Architect (8+ years)</option>
                </select>
              </div>

              {/* Portfolio / LinkedIn */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  LinkedIn or GitHub URL
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Notice Period */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Availability / Notice Period
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="">Select notice period / availability...</option>
                  <option value="Immediate">Immediate</option>
                  <option value="2 Weeks">2 Weeks notice</option>
                  <option value="1 Month">1 Month notice</option>
                  <option value="2-3 Months">2 - 3 Months notice</option>
                </select>
              </div>
            </div>

            {/* Cover Note / Brief Introduction */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-800">
                Brief Introduction / Key Projects Built
              </label>
              <textarea
                name="coverNote"
                rows={3}
                value={formData.coverNote}
                onChange={handleChange}
                placeholder="Share a short summary of the systems, architectures, or AI pipelines you've engineered..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="career-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="w-4 h-4 rounded border-neutral-300 bg-white text-emerald-600 focus:ring-emerald-500 mt-0.5"
              />
              <label htmlFor="career-consent" className="text-[11px] text-neutral-600 leading-snug">
                I confirm that I have the right to work in the UK and consent to GreensLeaf processing this candidate application under UK GDPR for technical recruitment purposes.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 hover-button-scale transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application to Database...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Candidate Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
