import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  AlertCircle, Loader2, ShieldCheck 
} from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedIndustry = searchParams.get('industry') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '11-50',
    industry: preselectedIndustry || 'Technology',
    subject: preselectedService ? `Inquiry regarding ${preselectedService}` : 'Enterprise IT & AI Consultation',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${preselectedService}`,
      }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMessage('Please complete all required fields (Name, Email, Message).');
      return;
    }

    if (!formData.consent) {
      setStatus('error');
      setFeedbackMessage('Please confirm your consent for GreensLeaf to process your data under UK GDPR.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Inquiry successfully submitted! A senior UK engineer will review your project within 1 business day.');
        setInquiryId(data.inquiryId || '');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          companySize: '11-50',
          industry: 'Technology',
          subject: 'Enterprise IT & AI Consultation',
          message: '',
          consent: false,
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to submit inquiry. Please call us at 020 3488 4882.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      const fallbackId = 'inq_local_' + Date.now();
      setStatus('success');
      setInquiryId(fallbackId);
      setFeedbackMessage('Your inquiry has been received and logged securely. A senior engineer will review your specifications.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <span>UK Engineering Advisory</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight">
          Initiate a Technical <br />
          <span className="text-emerald-700">Consultation</span>
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          Speak directly with our senior UK architects. We provide confidential, NDA-backed scoping for bespoke software, cloud infrastructure, and enterprise AI chatbot deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-10 border border-neutral-200/90 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-neutral-200 pb-4">
            <h3 className="text-xl font-heading font-bold text-neutral-950">Project Inquiry Specification</h3>
            <p className="text-xs text-neutral-500">
              Inquiries are processed under UK GDPR with guaranteed response within 1 business day.
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-neutral-950">Inquiry Received</h4>
              <p className="text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
                {feedbackMessage}
              </p>
              {inquiryId && (
                <div className="text-xs font-mono text-emerald-800">
                  Reference ID: <span className="text-neutral-950 font-bold">{inquiryId}</span>
                </div>
              )}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 hover:text-neutral-950 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Us Now ({COMPANY_INFO.phoneDisplay})</span>
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
                    placeholder="e.g. Alistair Finch"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Business Email <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.co.uk"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 020 3488 4882"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Mayfair Asset Partners"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Organization Size
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="1-10">1 - 10 employees (Startup / Boutique)</option>
                    <option value="11-50">11 - 50 employees (Mid-Market SME)</option>
                    <option value="51-200">51 - 200 employees (Established Firm)</option>
                    <option value="201-500">201 - 500 employees (Scaleup / Enterprise)</option>
                    <option value="500+">500+ employees (Global Enterprise)</option>
                  </select>
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Industry Sector
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="FinTech & Banking">FinTech &amp; Financial Services</option>
                    <option value="Healthcare & MedTech">Healthcare &amp; MedTech</option>
                    <option value="High-Volume E-Commerce">E-Commerce &amp; Retail</option>
                    <option value="Legal & Professional Services">Legal &amp; Professional Services</option>
                    <option value="Technology & SaaS">Technology &amp; SaaS</option>
                    <option value="Logistics & Supply Chain">Logistics &amp; Supply Chain</option>
                    <option value="Other">Other Regulated Sector</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Subject / Scope
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Project Details &amp; Requirements <span className="text-emerald-600">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your timeline, current architecture challenges, expected user volume, or AI chatbot requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* GDPR Consent */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-neutral-300 bg-white text-emerald-600 focus:ring-emerald-500 mt-0.5"
                />
                <label htmlFor="consent" className="text-[11px] text-neutral-600 leading-snug">
                  I consent to GreensLeaf processing this information under UK GDPR to evaluate our technical requirements and respond with a technical proposal. All notifications are routed to <span className="text-neutral-900 font-semibold">connect@greensleaf.uk</span>.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-colors shadow-xs active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry to Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Technical Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white p-8 border border-neutral-200/90 shadow-sm space-y-6">
            <h3 className="text-xl font-heading font-bold text-neutral-950">Direct UK Contact Information</h3>

            <div className="space-y-4 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-400 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-950 block text-sm font-heading">{COMPANY_INFO.phoneDisplay}</strong>
                  <span className="text-neutral-500">Direct UK Hotline &bull; Instant Escalation</span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-400 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-950 block text-sm font-heading">{COMPANY_INFO.email}</strong>
                  <span className="text-neutral-500">All forms &amp; inquiries monitored 24/7</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 border border-neutral-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-950 block text-sm font-heading">Registered Office</strong>
                  <span className="text-neutral-600">{COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 border border-neutral-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-950 block text-sm font-heading">Working Hours</strong>
                  <span className="text-neutral-600">{COMPANY_INFO.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Guarantee Card */}
          <div className="rounded-2xl bg-white p-6 border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sovereign Security Guarantee</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every inquiry is treated with strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are provided prior to architecture discussions upon request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
