export const COMPANY_INFO = {
  name: 'GreensLeaf',
  fullName: 'GreensLeaf IT Agency Ltd',
  tagline: 'Enterprise IT Engineering & Intelligent AI Systems',
  phone: '02034884882',
  phoneDisplay: '020 3488 4882',
  phoneIntl: '+442034884882',
  email: 'connect@greensleaf.uk',
  address: '30 St Mary Axe, City of London, London EC3A 8EP, United Kingdom',
  operatingHours: 'Monday – Friday, 08:30 – 18:00 GMT (24/7 Incident Escalation)',
};

export const CORE_METRICS = [
  { value: '99.99%', label: 'SLA Uptime Delivered', desc: 'Enterprise cloud resilience' },
  { value: '160+', label: 'UK Enterprise Projects', desc: 'Delivered on-time, fixed-budget' },
  { value: '<15 min', label: 'Critical Response Time', desc: 'Direct UK senior engineers' },
  { value: '£14M+', label: 'Client OpEx Saved', desc: 'Via automation & modern cloud' },
];

export const SERVICES = [
  {
    id: 'ai-chatbot',
    slug: 'ai-chatbot',
    badge: 'Featured Flagship',
    title: 'AI Chatbot & Agentic Systems',
    shortDesc: 'Production-grade enterprise chatbots with RAG, autonomous agent workflows, and UK GDPR-compliant data isolation.',
    description: 'Empower your enterprise with autonomous AI agents and conversational intelligence. We engineer bespoke Retrieval-Augmented Generation (RAG) pipelines and LLM systems trained exclusively on your private company knowledge bases, deploying seamlessly across Web, Microsoft Teams, Slack, and WhatsApp.',
    icon: 'Bot',
    highlights: [
      'Multi-Model Agnostic (Claude 3.5, GPT-4o, Gemini 1.5 Pro, Llama 3)',
      'Enterprise Knowledge Base RAG with Hybrid Vector Search',
      'Zero-Data Retention & Sovereign UK Data Residency',
      'Omnichannel Integration (Web, CRM, WhatsApp, Teams, Slack)',
    ],
    deliverables: ['Custom AI Architecture Blueprint', 'Vector DB & Hybrid Indexing Pipeline', 'Guardrails & Hallucination Defense Suite', 'Automated Fallback to Human Tier-2 Agents'],
    techStack: ['Python', 'LangChain', 'LlamaIndex', 'Pinecone', 'FastAPI', 'React', 'Ollama'],
    isFeatured: true,
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Bespoke Software & Web Platforms',
    shortDesc: 'Modern cloud-native web applications, scalable APIs, and mission-critical enterprise portals engineered for high conversion.',
    description: 'We develop bespoke web applications and distributed architectures engineered with Apple-grade user experience and bulletproof backend reliability. From high-throughput FinTech dashboards to complex multi-tenant SaaS platforms.',
    icon: 'Code2',
    highlights: [
      'Sub-second page speeds & optimized conversion funnels',
      'Microservices & Event-Driven Distributed Architectures',
      'Automated CI/CD deployment pipelines with zero downtime',
      'Rigorous end-to-end testing with 90%+ code coverage',
    ],
    deliverables: ['Full-Stack Production Application', 'Interactive UI Design System', 'OpenAPI/Swagger Documentation', 'Automated Deployment Scripts'],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    shortDesc: 'Architecting resilient, multi-region cloud infrastructures on AWS, Azure, and Google Cloud with strict cost governance.',
    description: 'Transform legacy on-prem systems into elastic, auto-scaling cloud foundations. We eliminate cloud waste, enforce Infrastructure-as-Code (Terraform), and implement continuous deployment with bank-grade security protocols.',
    icon: 'Cloud',
    highlights: [
      'AWS & Azure Well-Architected Framework compliance',
      'Kubernetes orchestration & serverless containerization',
      'Average 35% reduction in monthly cloud infrastructure spend',
      'Automated disaster recovery with RPO < 5 mins, RTO < 15 mins',
    ],
    deliverables: ['Terraform IaC Repositories', 'Multi-Region Failover Architecture', 'Real-Time Datadog/Grafana Monitoring', 'FinOps Cost Audit Report'],
    techStack: ['AWS', 'Microsoft Azure', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Datadog'],
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity & UK Compliance',
    shortDesc: 'End-to-end vulnerability assessments, Cyber Essentials Plus alignment, and proactive 24/7 threat monitoring.',
    description: 'Safeguard your corporate intellectual property and client data against sophisticated cyber threats. We deliver comprehensive penetration testing, Zero-Trust network segmentation, and turnkey readiness for ISO 27001 and Cyber Essentials certifications.',
    icon: 'ShieldCheck',
    highlights: [
      'Cyber Essentials & Cyber Essentials Plus accreditation support',
      'ISO/IEC 27001 gap analysis and remediation engineering',
      'UK GDPR & Data Protection Act 2018 compliance validation',
      'Proactive SIEM/SOC threat detection & automated quarantine',
    ],
    deliverables: ['Penetration Test & Risk Audit Report', 'Zero Trust Implementation Blueprint', 'Incident Response Playbook', 'Employee Phishing Simulation Suite'],
    techStack: ['Wazuh', 'CrowdStrike', 'Cloudflare Zero Trust', 'Tenable Nessus', 'Splunk'],
  },
  {
    id: 'managed-it',
    slug: 'managed-it',
    title: 'Managed IT Services & 24/7 UK Support',
    shortDesc: 'Direct access to senior UK IT engineers with guaranteed <15 minute response times and zero outsourcing.',
    description: 'Eliminate internal IT headaches with proactive managed infrastructure support. From workstation fleet management and Microsoft 365 / Entra ID administration to emergency system recovery, our London-based team acts as your dedicated IT department.',
    icon: 'Headphones',
    highlights: [
      'Guaranteed 15-minute SLA on mission-critical incidents',
      'Zero offshore tier-1 desks — you speak directly to senior engineers',
      'Automated patch management and vulnerability remediation',
      'Hardware lifecycle management and secure remote onboarding',
    ],
    deliverables: ['Dedicated Client Slack/Teams Portal', 'Monthly Infrastructure Health Scorecards', '24/7 Emergency Telephone Hotline', 'Asset & License Management Portal'],
    techStack: ['Microsoft 365', 'Entra ID', 'Jamf Pro', 'NinjaOne', 'SentinelOne'],
  },
  {
    id: 'data-engineering',
    slug: 'data-engineering',
    title: 'Data Engineering & Analytics',
    shortDesc: 'Unifying fragmented corporate data into high-performance warehouses, real-time pipelines, and executive dashboards.',
    description: 'Convert scattered operational databases into unified business intelligence. We construct modern data stacks that feed real-time analytics dashboards and train internal machine learning models with absolute data integrity.',
    icon: 'BarChart3',
    highlights: [
      'Modern Data Stack (Snowflake, dbt, BigQuery, ClickHouse)',
      'Real-time streaming pipelines with Apache Kafka',
      'Self-service executive dashboards in Power BI and Looker',
      'Robust data governance, lineage, and audit trails',
    ],
    deliverables: ['Centralized Cloud Data Warehouse', 'Automated dbt Data Modeling Pipelines', 'Executive KPI Power BI Dashboards', 'Data Dictionary & Governance Docs'],
    techStack: ['Snowflake', 'dbt', 'BigQuery', 'Apache Kafka', 'Power BI', 'Python', 'DuckDB'],
  },
];

export const INDUSTRIES = [
  {
    id: 'fintech',
    title: 'FinTech & Wealth Management',
    desc: 'High-frequency transactional integrity, FCA regulatory compliance, and bank-grade data encryption.',
    caseStudy: {
      client: 'Mayfair Asset Partners',
      problem: 'Legacy portfolio valuation engine took 4.5 hours every morning, delaying market decisions.',
      solution: 'Re-architected pipeline to Rust & AWS Lambda event-driven microservices with Redis caching.',
      results: ['Valuation runtime dropped from 4.5 hours to 3.2 minutes', '100% FCA compliance audit pass', 'Zero downtime over 24 months'],
    },
  },
  {
    id: 'healthcare',
    title: 'Healthcare & MedTech',
    desc: 'HIPAA & NHS Data Security and Protection (DSP) Toolkit compliance, clinical workflow automation, and secure patient data.',
    caseStudy: {
      client: 'Apex Diagnostics UK',
      problem: 'Clinicians overwhelmed by manual patient intake and repetitive triage inquiries.',
      solution: 'Built an NHS-aligned private AI triage chatbot with zero patient data retention and instant EHR dispatch.',
      results: ['Reduced front-desk phone congestion by 68%', 'Average patient intake time cut by 12 mins', 'Full NHS DSP Toolkit certification'],
    },
  },
  {
    id: 'ecommerce',
    title: 'High-Volume E-Commerce',
    desc: 'Sub-second checkout performance, automated inventory sync, and intelligent conversational shopping assistants.',
    caseStudy: {
      client: 'Vanguard Retail Group',
      problem: 'Black Friday traffic spikes caused 14-second checkout delays and high cart abandonment.',
      solution: 'Implemented edge caching on Cloudflare Workers, micro-frontend architecture, and automated container autoscaling.',
      results: ['Under 350ms checkout latency under 25,000 peak RPS', 'Cart conversion improved by 22.4%', '£1.4M additional revenue in Q4'],
    },
  },
  {
    id: 'legal',
    title: 'Legal & Corporate Services',
    desc: 'Air-gapped document search, automated legal clause extraction, and strict client confidentiality safeguards.',
    caseStudy: {
      client: 'Chambers & Sterling LLP',
      problem: 'Associates spent 18+ hours per week manually reviewing commercial leases and NDAs.',
      solution: 'Engineered a private on-premise RAG system running localized Llama 3 models with citation verification.',
      results: ['Document review time slashed by 74%', '100% air-gapped on-premise security', 'Saved 1,200 billable hours per quarter'],
    },
  },
];

export const TESTIMONIALS = [
  {
    quote: "GreensLeaf completely transformed our IT infrastructure. Their AI Chatbot system reduced our customer support response times from 4 hours to instantaneous answers, while maintaining strict UK GDPR compliance.",
    author: "Alistair Finch",
    title: "Chief Technology Officer",
    company: "Mayfair Asset Partners",
    location: "London, UK",
  },
  {
    quote: "Unlike previous consultancies that handed off work to offshore juniors, GreensLeaf assigned senior UK engineers who understood our business on day one. Our cloud bill is down 38% and uptime is flawless.",
    author: "Elena Rostova",
    title: "VP of Engineering",
    company: "Apex Diagnostics UK",
    location: "Cambridge, UK",
  },
  {
    quote: "Their team built a custom high-throughput platform for our Black Friday surge. 0 downtime, sub-second responses, and incredible communication throughout. You won't find a better IT partner in the UK.",
    author: "Marcus Thorne",
    title: "Head of Digital Operations",
    company: "Vanguard Retail Group",
    location: "Manchester, UK",
  },
];

export const BLOG_POSTS = [
  {
    id: 'ai-adoption-uk-smes-2025',
    title: 'The 2025 UK SME Guide to Enterprise AI Chatbot Adoption',
    summary: 'How forward-thinking British companies are implementing private RAG pipelines to cut operational costs without compromising client data sovereignty.',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    date: '10 Feb 2025',
    author: 'GreensLeaf Research Team',
    content: `
### The New Reality of Enterprise AI in the UK

In 2025, artificial intelligence has transitioned from experimental curiosity to table-stakes operational infrastructure. For UK small and medium enterprises (SMEs), the question is no longer whether to adopt AI, but how to do so while strictly adhering to UK GDPR and the Data Protection Act 2018.

### Why Off-the-Shelf Public AI Falls Short

Standard public AI tools carry significant enterprise vulnerabilities:
1. **Data Leakage Risk:** Inadvertently submitting confidential client data, financial disclosures, or proprietary source code to external training sets.
2. **Hallucination in Critical Workflows:** Generative models guessing plausible-sounding yet incorrect statutory regulations or contract terms.
3. **Lack of Internal Context:** Generic models cannot see your SharePoint documents, Jira tickets, or private PostgreSQL databases.

### The GreensLeaf Approach: Sovereign RAG Architecture

At GreensLeaf, we architect **Retrieval-Augmented Generation (RAG)** pipelines that keep company data strictly within your private UK cloud perimeter. By indexing your documents into hybrid vector databases (such as Pinecone or Qdrant) with metadata-filtered search, the model only generates responses directly cited from verified corporate source files.

### Key Milestones for Successful Deployment
- **Audit Knowledge Silos:** Clean and deduplicate internal documentation.
- **Implement Strict RBAC:** Role-based access control ensures an AI cannot disclose executive compensation data to junior employees.
- **Continuous Evaluation:** Automated synthetic testing of query accuracy and hallucination defense.

Talk to our AI engineering team today at **02034884882** or email **connect@greensleaf.uk** to schedule an enterprise architecture assessment.
    `,
  },
  {
    id: 'cybersecurity-essentials-cloud-compliance',
    title: 'Strengthening UK GDPR & Cyber Essentials Plus in Cloud Environments',
    summary: 'A pragmatic blueprint for achieving Cyber Essentials Plus accreditation while managing multi-cloud AWS and Azure deployments.',
    category: 'Cybersecurity & Compliance',
    readTime: '8 min read',
    date: '28 Jan 2025',
    author: 'Security & DevOps Practice',
    content: `
### The UK Cyber Threat Landscape

With ransomware attacks increasingly targeting mid-market UK firms, achieving Cyber Essentials Plus has shifted from an optional badge to an explicit prerequisite for public sector tenders and institutional client contracts.

### Core Pillars of Modern Cloud Hardening

1. **Boundary Firewalls & Internet Gateways:** Restrict direct SSH/RDP exposure. All administrative access must pass through Cloudflare Zero Trust or AWS Systems Manager Session Manager with MFA.
2. **Patch Management & Vulnerability Cadence:** Automate OS patching across Linux and Windows instances with SLAs under 14 days for high-severity CVEs.
3. **Malware Protection & Endpoint Detection:** Deploy SentinelOne or CrowdStrike across all endpoints with central telemetry.
4. **Access Control & Least Privilege:** Enforce Entra ID conditional access policies, FIDO2 hardware tokens, and just-in-time privilege escalation.

### How GreensLeaf Accelerates Certification

Our security practice conducts comprehensive gap analysis, automated vulnerability scanning, and remediation engineering. We guarantee your infrastructure meets National Cyber Security Centre (NCSC) standards on the very first audit attempt.
    `,
  },
  {
    id: 'migrating-legacy-monoliths-to-microservices',
    title: 'Migrating Legacy On-Premises Monoliths to Modern Event-Driven Cloud',
    summary: 'A step-by-step case study on decoupling brittle legacy systems into resilient, auto-scaling microservices with zero client downtime.',
    category: 'Cloud Engineering',
    readTime: '5 min read',
    date: '14 Jan 2025',
    author: 'Cloud Architecture Team',
    content: `
### The Cost of Stagnation

Legacy on-premise servers and monolithic codebases create invisible drags on business agility. Deployments require weekend outages, scaling means ordering expensive server racks months in advance, and a single bug can bring down the entire company.

### The Strangler Fig Pattern in Action

Rather than attempting a risky "big bang" rewrite, GreensLeaf advocates the **Strangler Fig Pattern**. We incrementally replace specific business capabilities with independent cloud-native microservices:
1. Place an intelligent API gateway in front of the monolith.
2. Route new features to modern serverless or containerized services.
3. Progressively migrate high-value legacy modules (e.g., authentication, checkout, reporting).
4. Decommission the old server once all traffic is rerouted.

The result is instantaneous performance improvements, guaranteed business continuity, and immediate reductions in server operational expenditure.
    `,
  },
];

export const FAQS = [
  {
    q: 'Why should we choose GreensLeaf over large consultancies or offshore agencies?',
    a: 'Large consultancies bill enormous retainers and delegate your work to junior staff, while offshore agencies suffer from communication friction, timezone delays, and dubious data privacy. GreensLeaf pairs you directly with senior UK-based engineers who take personal ownership of your code, SLAs, and security.',
  },
  {
    q: 'How does your AI Chatbot Development service handle data privacy and UK GDPR?',
    a: 'We operate under strict zero-data retention policies. Your proprietary documents and customer interactions are never used to train foundational AI models. Everything is deployed within isolated, sovereign UK/EU VPCs with end-to-end AES-256 encryption.',
  },
  {
    q: 'How quickly can your team begin an engagement?',
    a: 'Following our initial technical discovery call (02034884882 / connect@greensleaf.uk), we can typically present a scoped Statement of Work (SOW) within 48 hours and mobilize an agile engineering pod within 5 to 7 business days.',
  },
  {
    q: 'Do you offer fixed-price projects or flexible monthly retainers?',
    a: 'Both. For well-defined scopes (such as an AI Chatbot MVP, cloud migration, or website rebuild), we provide transparent fixed-price milestones with zero surprise costs. For ongoing support and iterative development, we offer agile monthly engineering pods with guaranteed SLAs.',
  },
  {
    q: 'What happens when we submit a contact inquiry on this website?',
    a: 'Your inquiry is securely logged in our UK database, and an automated notification is sent to connect@greensleaf.uk. A senior GreensLeaf consultant will review your specifications and contact you via phone or email within 1 business day.',
  },
];
