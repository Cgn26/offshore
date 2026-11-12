import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Sparkles, Shield, Cpu, Zap, ArrowUpRight, CheckCircle2, 
  Terminal, Lock, MessageSquare, Send, RefreshCw, Layers, Database 
} from 'lucide-react';
import { COMPANY_INFO } from '../mockData';

export default function AIChatbotService() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm the GreensLeaf AI Enterprise Demo Agent. Ask me about our private RAG pipelines, UK GDPR compliance, multi-channel deployment, or architecture blueprints.",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "How does your RAG system prevent hallucinations?",
    "Can you deploy inside our private AWS London VPC?",
    "Does our proprietary data ever train external models?",
    "Can the chatbot integrate with Microsoft Teams & Slack?",
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "GreensLeaf engineers custom RAG architectures tailored to your enterprise data. We enforce strict chunking, hybrid BM25 + dense vector search, and sovereign UK deployment.";

      const lower = query.toLowerCase();
      if (lower.includes('hallucination') || lower.includes('accuracy')) {
        reply = "We eliminate hallucinations using strict metadata filtering, thresholded cosine similarity, and synthetic guardrail verification. If a source document does not contain the answer with >85% confidence, the model gracefully falls back to a verified human escalation queue.";
      } else if (lower.includes('vpc') || lower.includes('aws') || lower.includes('azure') || lower.includes('private')) {
        reply = "Absolutely. We routinely deploy isolated containerized clusters within AWS London (eu-west-2) or Azure UK South. All traffic is TLS 1.3 encrypted with KMS customer-managed keys, ensuring zero foreign data transfer.";
      } else if (lower.includes('train') || lower.includes('data') || lower.includes('gdpr') || lower.includes('privacy')) {
        reply = "Never. Under our enterprise SLAs and zero-data retention agreements with model providers, your proprietary data, prompts, and embeddings are strictly excluded from foundational training. Everything remains 100% compliant with the UK Data Protection Act 2018.";
      } else if (lower.includes('teams') || lower.includes('slack') || lower.includes('whatsapp') || lower.includes('integrate')) {
        reply = "Yes! Our middleware connects simultaneously to your web application, Microsoft Teams, Slack workspaces, and WhatsApp Business API through a single unified agent engine with granular role-based permissions.";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-white p-8 sm:p-14 border border-emerald-300 shadow-sm overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dedicated Flagship Practice</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Enterprise AI Chatbots &amp; <br />
            <span className="text-emerald-700">Autonomous Agentic Systems</span>
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed">
            Replace brittle rule-based bots with autonomous conversational intelligence. We build custom RAG (Retrieval-Augmented Generation) agents trained exclusively on your internal databases, with zero-data leakage and 100% UK data sovereignty.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/contact?service=AI+Chatbot+Development"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 shadow-sm active:scale-95"
            >
              <span>Schedule AI Feasibility Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-6 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-semibold text-sm hover:bg-neutral-50 transition-colors shadow-2xs"
            >
              Call 020 3488 4882
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Live Simulator */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Interactive Testbed
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-950">Experience the Agent In Action</h2>
          <p className="text-xs text-neutral-500">
            Test the simulated GreensLeaf conversational intelligence engine below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-lg">
          {/* Chat Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-950 font-mono truncate max-w-[180px] sm:max-w-none">GreensLeaf Enterprise AI Agent</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>London Sovereign VPC &bull; Active</span>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                setMessages([
                  {
                    role: 'assistant',
                    content: "Demo reset. Feel free to ask about our security, multi-channel agents, or RAG models.",
                  },
                ])
              }
              className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-md"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 sm:p-6 h-80 overflow-y-auto space-y-4 text-xs bg-neutral-50/40">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 sm:gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3 sm:p-3.5 leading-relaxed text-xs ${
                    m.role === 'user'
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-white border border-neutral-200 text-neutral-800 shadow-2xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <Bot className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>GreensLeaf AI is synthesizing response...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 sm:px-6 py-2.5 border-t border-neutral-200 bg-neutral-50 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-neutral-500 shrink-0 hidden sm:inline">Try asking:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 shrink-0 transition-colors shadow-2xs whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 border-t border-neutral-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your question or architecture requirement..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Architecture Deep Dive */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Technical Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-950">The GreensLeaf AI Architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4 group hover:border-emerald-400/90 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">Hybrid Vector Pipeline</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We combine BM25 exact keyword matching with dense neural embeddings (Pinecone, Qdrant) and cross-encoder re-ranking to guarantee sub-millisecond document retrieval with pin-point citation accuracy.
            </p>
            <ul className="text-xs text-neutral-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Chunking optimized for tables &amp; PDFs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dynamic metadata access filters</span>
              </li>
            </ul>
          </div>

          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4 group hover:border-emerald-400/90 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">Zero-Data Retention &amp; GDPR</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Zero telemetry leaks. Everything runs inside customer-owned VPCs in London with customer-managed encryption keys (KMS). No customer data is ever retained for model training.
            </p>
            <ul className="text-xs text-neutral-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Full UK DPA 2018 adherence</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Automated PII redaction filters</span>
              </li>
            </ul>
          </div>

          <div className="hover-lift bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4 group hover:border-emerald-400/90 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">Omnichannel Orchestration</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Deploy your AI agent across every corporate touchpoint: embedded React web widget, Microsoft Teams bot, internal Slack channels, or verified WhatsApp Business API.
            </p>
            <ul className="text-xs text-neutral-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unified session state &amp; memory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Graceful human handover routing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
