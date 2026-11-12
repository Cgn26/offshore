export const COMPANY_INFO = {
  name: 'GreensLeaf',
  fullName: 'GreensLeaf Limited',
  tagline: 'Enterprise IT Engineering & Intelligent AI Systems',
  phone: '02034884882',
  phoneDisplay: '020 3488 4882',
  phoneIntl: '+442034884882',
  email: 'connect@greensleaf.uk',
  address: 'Victory House, Chobham Street, Luton, Bedfordshire, England, LU1 3BS',
  operatingHours: 'Monday – Friday, 08:30 – 18:00 GMT (24/7 Incident Escalation)',
};

export const CORE_METRICS = [
  { value: '<15 min', label: 'Critical Incident SLA', desc: 'Direct escalation to named senior UK engineers' },
  { value: '100%', label: 'UK Sovereign Data', desc: 'Strict London & Cardiff VPC deployment under DPA 2018' },
  { value: 'Fixed SOW', label: 'Milestone Delivery', desc: 'Agreed deliverables and transparent pricing, zero scope creep' },
  { value: 'Zero Offshore', label: 'UK-Based Team', desc: 'The architects scoping your project build your project' },
];

export const CLIENT_LOGOS = [
  { name: 'Financial Services & Wealth', sector: 'FCA-aligned infrastructure & secure data pipelines' },
  { name: 'HealthTech & MedTech', sector: 'NHS DSPT & Caldicott Guardian compliant systems' },
  { name: 'B2B Logistics & Supply Chain', sector: 'High-throughput APIs & real-time inventory sync' },
  { name: 'Legal & Corporate Advisory', sector: 'Encrypted document management & secure client portals' },
  { name: 'Specialist Insurance', sector: 'Policy administration portals & automated claims triage' },
  { name: 'Public Sector & Higher Ed', sector: 'Cyber Essentials Plus certified cloud environments' },
];

export const SERVICES = [
  {
    id: 'ai-chatbot',
    slug: 'ai-chatbot',
    badge: 'Core Specialism',
    title: 'AI Chatbots & Autonomous Agent Systems',
    shortDesc: 'Production-ready private retrieval systems (RAG) for internal staff lookup and automated Tier-1 support under strict UK data residency.',
    description: 'We build private conversational AI systems trained on your company manuals, policy repositories, and technical databases. Your data never leaves your chosen UK VPC, prompts are never used to train external models, and ambiguous queries gracefully route to your human team.',
    icon: 'Bot',
    highlights: [
      'Multi-model options (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, or self-hosted Llama 3.3)',
      'Accurate RAG search combining exact BM25 keyword matching with dense vector embeddings',
      'Zero external data retention; hosted in UK AWS or Azure data centres (London / Cardiff)',
      'Multi-channel deployment to Web, Microsoft Teams, Slack, or WhatsApp Business API',
    ],
    deliverables: ['Custom AI Architecture Blueprint', 'Vector DB & Hybrid Indexing Pipeline', 'Guardrails & Hallucination Defense Suite', 'Automated Fallback to Human Tier-2 Agents'],
    techStack: ['Python', 'LangChain', 'LlamaIndex', 'Pinecone', 'FastAPI', 'React', 'Ollama'],
    isFeatured: true,
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Bespoke Software & Web Platforms',
    shortDesc: 'Reliable cloud web applications, robust APIs, and operational portals built with clean code and zero technical debt.',
    description: 'We build modern web software for UK businesses that have outgrown off-the-shelf SaaS. From operational dashboards and booking platforms to complex client portals, we deliver clear, well-tested code that your team can maintain.',
    icon: 'Code2',
    highlights: [
      'Fast page load times with accessible, responsive user interfaces',
      'Modular REST & GraphQL APIs with comprehensive OpenAPI documentation',
      'Automated testing suites covering core workflows and edge cases',
      'Clean handovers with full source code ownership and architectural documentation',
    ],
    deliverables: ['Full-Stack Production Application', 'Interactive UI Design System', 'OpenAPI/Swagger Documentation', 'Automated Deployment Scripts'],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    shortDesc: 'Stable, well-governed infrastructure on AWS and Microsoft Azure with automated deployments and predictable monthly hosting costs.',
    description: 'We help teams migrate, stabilize, and monitor their cloud infrastructure. We configure reproducible environments with Terraform, set up zero-downtime deployment pipelines, and remove unnecessary cloud expenses.',
    icon: 'Cloud',
    highlights: [
      'AWS and Azure Well-Architected Framework reviews',
      'Infrastructure as Code (Terraform) for version-controlled server configuration',
      'Audited cloud cost governance to prevent runaway infrastructure bills',
      'Documented backup, failover, and disaster recovery procedures',
    ],
    deliverables: ['Terraform IaC Repositories', 'Multi-Region Failover Architecture', 'Real-Time Datadog/Grafana Monitoring', 'FinOps Cost Audit Report'],
    techStack: ['AWS', 'Microsoft Azure', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Datadog'],
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity & UK Compliance',
    shortDesc: 'Practical vulnerability reviews, Cyber Essentials Plus alignment, and proactive security monitoring for UK businesses.',
    description: 'We help UK organisations meet strict regulatory expectations without drowning in security paperwork. From vulnerability assessments and access reviews to audit readiness for Cyber Essentials and ISO 27001.',
    icon: 'ShieldCheck',
    highlights: [
      'Cyber Essentials & Cyber Essentials Plus readiness audits',
      'UK GDPR and Data Protection Act 2018 technical security verification',
      'Penetration testing and automated vulnerability scanning',
      'Practical incident response playbooks for technical and operational staff',
    ],
    deliverables: ['Penetration Test & Risk Audit Report', 'Zero Trust Implementation Blueprint', 'Incident Response Playbook', 'Employee Phishing Simulation Suite'],
    techStack: ['Wazuh', 'CrowdStrike', 'Cloudflare Zero Trust', 'Tenable Nessus', 'Splunk'],
  },
  {
    id: 'managed-it',
    slug: 'managed-it',
    title: 'Managed IT Services & 24/7 UK Support',
    shortDesc: 'Direct access to senior UK IT engineers with guaranteed <15 minute response times and zero outsourcing.',
    description: 'Eliminate internal IT headaches with proactive managed infrastructure support. From workstation fleet management and Microsoft 365 / Entra ID administration to emergency system recovery, our UK-based team acts as your dedicated IT department.',
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
    title: 'Financial Services & Wealth Management',
    desc: 'Transaction integrity, FCA regulatory alignment, and UK-hosted encrypted data pipelines.',
    caseStudy: {
      client: 'Boutique London Asset Manager',
      problem: 'Daily portfolio valuation calculations took over 4 hours, delaying pre-market risk assessments.',
      solution: 'Re-engineered computation pipeline into modular event-driven microservices with Redis caching and automated reporting.',
      results: ['Calculation runtime reduced from 4 hours to under 4 minutes', 'Full audit trail alignment for FCA reporting', 'Consistent reliability without data discrepancies'],
    },
  },
  {
    id: 'healthcare',
    title: 'HealthTech & Clinical Services',
    desc: 'NHS Data Security & Protection Toolkit (DSPT) alignment, clinical intake workflows, and patient data confidentiality.',
    caseStudy: {
      client: 'Specialist Diagnostic Laboratory Supplier',
      problem: 'Clinical staff spent hours handling routine inquiries regarding test status and intake documentation.',
      solution: 'Configured a private, sovereign retrieval system for clinical documentation with strict access controls and human triage routing.',
      results: ['Routine administrative query volume reduced by over 60%', 'Clinicians access protocol answers in seconds', 'Zero patient data retained or shared externally'],
    },
  },
  {
    id: 'ecommerce',
    title: 'High-Throughput Commerce & Logistics',
    desc: 'Sub-second page speeds, reliable inventory synchronization, and resilient container infrastructure.',
    caseStudy: {
      client: 'Multi-Channel UK Distributor',
      problem: 'Promotional traffic surges caused database lockups and inventory discrepancies between warehouse and web.',
      solution: 'Implemented edge caching, asynchronous queue-based checkout processing, and auto-scaling container clusters on AWS.',
      results: ['Sub-350ms checkout latency during high-traffic peaks', 'Automated stock reconciliation across 4 warehouses', 'Zero unplanned downtime during seasonal peaks'],
    },
  },
  {
    id: 'legal',
    title: 'Legal & Corporate Advisory',
    desc: 'Private document search, contract clause lookup, and client confidentiality safeguards under UK GDPR.',
    caseStudy: {
      client: 'Regional Commercial Law Firm',
      problem: 'Fee earners spent excessive non-billable hours manually searching legacy precedent files and commercial lease clauses.',
      solution: 'Deployed a private, air-gapped document retrieval tool running inside customer VPC with strict citation verification.',
      results: ['Precedent search time reduced from hours to minutes', 'Every answer links directly to verified source clause', 'Complete client confidentiality with zero cloud data training'],
    },
  },
];

export const CAREER_ROLES = [
  {
    id: 'senior-fullstack',
    title: 'Senior Full-Stack Engineer (React & Python/Node)',
    department: 'Software Engineering',
    location: 'Luton / London / Hybrid (UK)',
    type: 'Full-Time &bull; Permanent',
    salary: '£75,000 - £95,000 + Equity & Pension',
    description: 'Lead the architecture and delivery of high-conversion enterprise web applications and API platforms for our Tier-1 UK clients.',
    requirements: [
      '5+ years professional experience with React, TypeScript, and Python (FastAPI) or Node.js',
      'Strong background in relational databases (PostgreSQL) and caching (Redis)',
      'Experience building mission-critical architectures with automated CI/CD pipelines',
      'UK right to work required',
    ],
  },
  {
    id: 'ai-rag-architect',
    title: 'Enterprise AI & RAG Systems Architect',
    department: 'Artificial Intelligence',
    location: 'London / Hybrid (UK)',
    type: 'Full-Time &bull; Permanent',
    salary: '£85,000 - £110,000 + Bonus',
    description: 'Architect private, sovereign Retrieval-Augmented Generation (RAG) pipelines and multi-agent systems for regulated British institutions.',
    requirements: [
      'Proven track record implementing production vector databases (Pinecone, Qdrant) and hybrid retrieval',
      'Deep expertise in LangChain, LlamaIndex, embeddings, and prompt guardrails',
      'Familiarity with UK GDPR and data sovereignty architectures in AWS/Azure',
    ],
  },
  {
    id: 'cloud-devops-lead',
    title: 'Cloud DevOps & Infrastructure Lead',
    department: 'Cloud & Infrastructure',
    location: 'Remote (UK-based)',
    type: 'Full-Time &bull; Permanent',
    salary: '£75,000 - £95,000 + Training Budget',
    description: 'Design and manage automated Kubernetes, Terraform, and multi-cloud architectures across AWS and Microsoft Azure.',
    requirements: [
      'Expertise in Terraform (IaC), Docker, and Kubernetes (EKS/AKS)',
      'Experience implementing Zero-Trust network topologies and SIEM monitoring',
      'AWS or Azure Solutions Architect Professional accreditation preferred',
    ],
  },
  {
    id: 'it-support-engineer',
    title: 'Tier-2/3 Managed IT Support Engineer',
    department: 'Managed Services',
    location: 'Luton HQ / Hybrid',
    type: 'Full-Time &bull; Permanent',
    salary: '£42,000 - £55,000 + On-Call Allowance',
    description: 'Provide high-touch technical escalation support for our corporate clients across Microsoft 365, Entra ID, networks, and hardware fleets.',
    requirements: [
      '3+ years in managed IT service delivery with proven SLA track record',
      'Advanced knowledge of Microsoft 365, Intune, Jamf, and Cisco/Ubiquiti networking',
      'Excellent verbal and written communication with senior executives',
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "GreensLeaf delivered our private retrieval assistant on schedule and inside our London AWS VPC. What set them apart was technical honesty: they clearly explained what AI could and could not do reliably before writing a line of code.",
    author: "Head of Infrastructure & Security",
    title: "Client Engagement (Under NDA)",
    company: "UK Regulated Wealth Manager",
    location: "City of London",
  },
  {
    quote: "Unlike agencies that send senior partners to pitch and offshore juniors to build, GreensLeaf's senior engineers directly handled our infrastructure audit. They eliminated redundant services and reduced our monthly cloud bill by 32%.",
    author: "VP of Engineering",
    title: "Client Engagement (Under NDA)",
    company: "Specialist HealthTech Supplier",
    location: "Cambridge & London",
  },
  {
    quote: "They helped us architect an asynchronous queue system ahead of our peak retail season. We handled four times our usual order volume without a single server interruption or database bottleneck.",
    author: "Director of Digital Operations",
    title: "Client Engagement (Under NDA)",
    company: "UK Retail & Distribution Group",
    location: "Manchester",
  },
  {
    quote: "The document search system they built runs entirely on our isolated servers. Our team can query twenty years of technical precedents and immediately verify citations against original files.",
    author: "Senior Commercial Partner",
    title: "Client Engagement (Under NDA)",
    company: "Regional Commercial Legal Practice",
    location: "Bedfordshire & London",
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
