import { CourseModule } from '../types';

export const ACADEMY_COURSES: CourseModule[] = [
  {
    id: 'course-rostr-v2',
    title: 'ROSTR v2 Architecture & Multi-Agent Swarm Mastery',
    duration: '2.5 hours',
    level: 'Mastery',
    description: 'Master the 5 core pillars of ROSTR: PAL intent compiler, NPAO task prioritization, RAG DAL 3-tier research, and ContextEngine zero-infra session memory.',
    lessonsCount: 4,
    badgeName: 'Certified ROSTR Multi-Agent Architect',
    lessons: [
      {
        id: 'les-1',
        title: 'Module 1: PAL 5-Stage Intent Compilation Pipeline',
        duration: '35 mins',
        completed: true,
        content: `### The Prompting Bottleneck & PAL Compilation
Traditional single-prompt LLM agents suffer from ambiguity and ungrounded assumptions.
PAL transforms natural language intent into typed runtime manifests through 5 deterministic stages:
1. **Intent Extraction:** Parsing imperative verbs, domain signals, and computing an ambiguity score.
2. **Context Injection:** Sourcing active project state, prior decisions, and ContextEngine blockers.
3. **Semantic Enhancement:** Expanding vague verbs into structured checklists with measurable success criteria.
4. **Runtime Compilation:** Emitting declarative YAML manifests with strict tool and memory policies.
5. **Deterministic Routing:** Allocating work to the smallest capable specialist agent.`
      },
      {
        id: 'les-2',
        title: 'Module 2: RAG DAL 3-Tier Source Credibility Architecture',
        duration: '40 mins',
        completed: false,
        content: `### The 3-Tier Credibility Hierarchy
Standard single-pass RAG treats all web sources equally, causing hallucinations and outdated information.
RAG DAL stratifies sources into 3 rigorous tiers:
- **Tier 1 (1.0 weight):** Primary & Authoritative (IETF RFCs, Academic papers, .gov registries, Official SDK documentation).
- **Tier 2 (0.75 weight):** Verified Editorial (TechCrunch, Gartner, Reuters, WSJ, Peer-reviewed articles with DOI).
- **Tier 3 (0.40 weight):** Community & UGC (LinkedIn, Reddit, Hacker News, G2 reviews).
Autonomous multi-pass loops check convergence criteria before generating reports.`
      },
      {
        id: 'les-3',
        title: 'Module 3: NPAO 4D Motivation & 5D Lifecycle Task Allocation',
        duration: '35 mins',
        completed: false,
        content: `### Human-Aligned Task Prioritization
Rather than a naive P0-P4 queue, NPAO organizes work motivationally:
1. **N (Necessity):** Hard blockers that stop downstream execution (e.g. Broken DNS, authentication failure).
2. **A (Anxiety):** Cognitive friction and session amnesia that degrade team trust.
3. **P (Priority):** Mission-critical revenue operations and core product builds.
4. **O (Opportunity):** Growth, optimization, and future experiments.
Composite Priority Formula:
\`Priority = (Phase_Urgency * 0.35) + (Dependency_Impact * 0.30) + (Business_Impact * 0.25) + (Resource_Efficiency * 0.10)\``
      },
      {
        id: 'les-4',
        title: 'Module 4: ContextEngine Zero-Infrastructure Session Memory',
        duration: '40 mins',
        completed: false,
        content: `### Eliminating Session Amnesia Without Vector DB Overhead
ContextEngine stores session memory in human-readable, append-only flat files (\`.context/CONTEXT.md\` and \`sessions/*.json\`).
Operating Modes:
- **CACHE:** Capture session state, accomplishments, decisions, failures, and next steps.
- **RETRIEVE:** Load prior session context to eliminate operator re-briefing time.
- **REPORT:** Compile stakeholder progress summaries.
- **QUERY:** Answer natural language questions on historical decisions.`
      }
    ],
    quizQuestions: [
      {
        question: 'What is the correct sequence of the 5D Lifecycle in ROSTR v2?',
        options: [
          'Design -> Build -> Ship -> Test -> Review',
          'PreD -> Design -> Development -> Deployment -> Debugging',
          'Intake -> Planning -> Coding -> QA -> Done',
          'Idea -> Wireframe -> Prototype -> Production -> Scale'
        ],
        correctIndex: 1
      },
      {
        question: 'What credibility weight does RAG DAL assign to Tier 1 Authoritative sources?',
        options: ['0.50', '0.75', '1.00', '1.25'],
        correctIndex: 2
      },
      {
        question: 'What is the default execution order of NPAO categories?',
        options: [
          'Priority -> Necessity -> Opportunity -> Anxiety',
          'Necessity -> Anxiety -> Priority -> Opportunity',
          'Opportunity -> Priority -> Necessity -> Anxiety',
          'Anxiety -> Priority -> Opportunity -> Necessity'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'course-n8n-outbound',
    title: 'Autonomous Outbound Engineering with n8n & Clay',
    duration: '3.0 hours',
    level: 'Intermediate',
    description: 'Build end-to-end 5-Pillar outbound pipelines: trigger ingest, CRM dedupe shield, Clay waterfall enrichment, and sequencer enrollment.',
    lessonsCount: 3,
    badgeName: 'Certified GTM Automation Engineer',
    lessons: [
      {
        id: 'n8n-1',
        title: 'The 5-Pillar Outbound Architecture Blueprint',
        duration: '45 mins',
        completed: true,
        content: 'Deep dive into trigger detection, CRM dedupe logic, and sequencer webhook dispatching.'
      },
      {
        id: 'n8n-2',
        title: 'Clay Waterfall Tables & Technographic Scraping',
        duration: '50 mins',
        completed: false,
        content: 'Configuring multi-provider email waterfalls (Apollo -> Hunter -> Findymail) with 94%+ deliverability.'
      },
      {
        id: 'n8n-3',
        title: 'Error Handling, Rate Limiting, & Webhook Security in n8n',
        duration: '45 mins',
        completed: false,
        content: 'Production safety protocols: token auth, exponential backoff, and Slack alerting.'
      }
    ],
    quizQuestions: [
      {
        question: 'Why is a CRM Shield & Dedupe node required in Pillar 2 before enrichment?',
        options: [
          'To save API costs and prevent emailing active clients or deals in progress',
          'To format phone numbers into international format',
          'To generate Claude 3.5 Sonnet prompts',
          'To change DNS records'
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'course-meddicc-bible',
    title: 'Modern Sales Bible & MEDDICC Qualification Mastery',
    duration: '2.0 hours',
    level: 'Beginner',
    description: 'Learn how to construct a comprehensive Sales Bible: daily touchpoint SLAs, MEDDICC qualification criteria, and objection handling.',
    lessonsCount: 3,
    badgeName: 'Certified Enterprise Sales Enablement Specialist',
    lessons: [
      {
        id: 'med-1',
        title: 'MEDDICC Demystified: Metrics to Competition',
        duration: '40 mins',
        completed: false,
        content: 'How to structure discovery questions for Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, and Competition.'
      },
      {
        id: 'med-2',
        title: 'Direct-Response Cold Email Cadences & The 5-Step Formula',
        duration: '40 mins',
        completed: false,
        content: 'Intro -> Value -> Social Proof -> Objection Buster -> Soft Breakup email architecture.'
      },
      {
        id: 'med-3',
        title: 'The 27-Second Call Opener & Live Objection Busting',
        duration: '40 mins',
        completed: false,
        content: 'Tactical phone frameworks that convert cold calls into confirmed calendar invites.'
      }
    ],
    quizQuestions: [
      {
        question: 'What is the optimal reading grade level for B2B cold email copy?',
        options: ['Grade 12-14 (Academic)', 'Grade 9-10 (High School)', 'Grade 5-6 (Elementary & Plain Text)', 'Grade 1-2'],
        correctIndex: 2
      }
    ]
  }
];
