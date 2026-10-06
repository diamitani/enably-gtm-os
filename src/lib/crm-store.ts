import { LeadRecord } from '../types';

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'lead-101',
    fullName: 'Sarah Chen',
    title: 'Head of Growth',
    company: 'HyperScale AI',
    domain: 'hyperscale.ai',
    industry: 'Enterprise AI & SaaS',
    companySize: '45 employees ($8M ARR)',
    location: 'San Francisco, CA',
    email: 'sarah.chen@hyperscale.ai',
    linkedinUrl: 'https://linkedin.com/in/sarahchen-gtm',
    icpScore: 94,
    icpTier: 'ICP-1 (SaaS Startup)',
    enrichmentStatus: 'verified',
    pipelineStatus: 'new',
    signals: ['Series A Raised ($12M)', 'Hiring 4 SDRs', 'Installed HubSpot 14 days ago'],
    generatedAccountBrief: `**Company Profile:** HyperScale AI builds real-time vector inference infrastructure for generative AI apps.
**Buying Trigger:** Raised $12M Series A, scaling outbound team from 1 to 5 reps.
**Primary Pain:** Inconsistent pipeline generation; relying on founder referrals while board demands $3M new ARR.
**Recommended Outreach:** 3-step Pain-Agitate-Solve email sequence focusing on automated prospecting pipelines without hiring RevOps.`,
    activeSequenceStep: 1,
    lastContacted: 'Today'
  },
  {
    id: 'lead-102',
    fullName: 'Marcus Vance',
    title: 'CRO / VP Sales',
    company: 'Apex Cloud Advisory',
    domain: 'apexcloud.io',
    industry: 'IT & Cloud Services',
    companySize: '180 employees ($28M Rev)',
    location: 'Austin, TX',
    email: 'm.vance@apexcloud.io',
    linkedinUrl: 'https://linkedin.com/in/marcusvance-sales',
    icpScore: 89,
    icpTier: 'ICP-2 (Mid-Market Services)',
    enrichmentStatus: 'verified',
    pipelineStatus: 'outreached',
    signals: ['Lumpy quarterly revenue', 'Outreach.io tech stack detected', 'LinkedIn keynote speaker'],
    generatedAccountBrief: `**Company Profile:** Apex Cloud Advisory delivers specialized AWS & Azure migrations for regional healthcare providers.
**Buying Trigger:** Lumpy quarterly sales and rep underperformance.
**Primary Pain:** Reps spending 60% of their time on manual research and list building instead of talking to prospects.
**Recommended Outreach:** LinkedIn InMail + Cold Email highlighting automated Clay waterfall research.`,
    activeSequenceStep: 2,
    lastContacted: 'Yesterday'
  },
  {
    id: 'lead-103',
    fullName: 'Elena Rostova',
    title: 'VP Global RevOps',
    company: 'FinSphere Global',
    domain: 'finsphere.com',
    industry: 'Fintech & Payments',
    companySize: '850 employees ($110M ARR)',
    location: 'New York, NY',
    email: 'elena.rostova@finsphere.com',
    linkedinUrl: 'https://linkedin.com/in/elenarostova-revops',
    icpScore: 92,
    icpTier: 'ICP-3 (Enterprise Scaleup)',
    enrichmentStatus: 'verified',
    pipelineStatus: 'demo_booked',
    signals: ['Expanding to EMEA/APAC', 'Salesforce Enterprise + Gong', 'SOC2 Type II compliance required'],
    generatedAccountBrief: `**Company Profile:** FinSphere Global provides cross-border treasury infrastructure for multi-currency marketplaces.
**Buying Trigger:** Global expansion with multi-regional SDR teams needing centralized governance.
**Primary Pain:** Fragmented outbound tooling causing compliance risks and unmonitored domain reputation.
**Recommended Outreach:** Enterprise ROSTR v2 Multi-Agent deployment with host-approved gating and private BYOK gateway.`,
    activeSequenceStep: 4,
    lastContacted: '2 days ago'
  },
  {
    id: 'lead-104',
    fullName: 'David Thorne',
    title: 'Co-Founder & CEO',
    company: 'Lumen Logistics Tech',
    domain: 'lumenlogistics.co',
    industry: 'Supply Chain SaaS',
    companySize: '22 employees ($2.2M ARR)',
    location: 'Chicago, IL',
    email: 'david@lumenlogistics.co',
    linkedinUrl: 'https://linkedin.com/in/davidthorne-ceo',
    icpScore: 86,
    icpTier: 'ICP-1 (SaaS Startup)',
    enrichmentStatus: 'enriched',
    pipelineStatus: 'replied',
    signals: ['Recently added Smartlead', 'Hiring first Head of Sales', 'Active on LinkedIn'],
    generatedAccountBrief: `**Company Profile:** Lumen provides predictive ETA tracking for freight forwarders.
**Buying Trigger:** Founder looking to step back from founder-led sales into a scalable SDR engine.
**Primary Pain:** Needs complete Sales Bible, qualification SOPs, and email copy ready in under 7 days.
**Recommended Outreach:** 6th Agent Essentials package walkthrough with instant Sales Bible export.`,
    activeSequenceStep: 2,
    lastContacted: '3 days ago'
  }
];

export const generateLeadOutreachSequence = (lead: LeadRecord) => {
  return [
    {
      step: 1,
      channel: 'Email',
      day: 'Day 1',
      subject: `${lead.company} + predictable outbound pipeline`,
      body: `Hi ${lead.fullName.split(' ')[0]},

Noticed ${lead.company}'s recent growth in ${lead.industry} and ${lead.signals[0]?.toLowerCase() || 'rapid expansion'}.

Most revenue leaders at your stage tell us their team spends 60%+ of their week on manual prospect research and list cleaning instead of actual sales conversations.

We built 6th Agent to run autonomous 5-pillar outbound workflows—combining trigger detection, waterfall enrichment, and personalized messaging without needing a full-time RevOps hire.

Open to a brief 10-minute walkthrough this Thursday to see how companies like ${lead.company} are scaling qualified pipeline?`,
      cta: '10-minute exploratory walkthrough'
    },
    {
      step: 2,
      channel: 'LinkedIn Connection & Note',
      day: 'Day 3',
      subject: 'Connection Request',
      body: `Hi ${lead.fullName.split(' ')[0]} - noticed your focus on ${lead.industry} growth at ${lead.company}. Would love to connect and share some benchmark data on outbound conversion rates we compiled recently.`,
      cta: 'Connect on LinkedIn'
    },
    {
      step: 3,
      channel: 'Email',
      day: 'Day 6',
      subject: `quick idea for ${lead.company}'s outbound motion`,
      body: `Hi ${lead.fullName.split(' ')[0]},

Following up with a quick data point: teams using our automated Clay + n8n pipeline saw their verified email rate jump to 94% while cutting lead research time by 5x.

We put together a custom account brief for ${lead.company} mapping your top 3 buying triggers.

Would you be against me sending over the 1-page overview?`,
      cta: 'Permission to send 1-page overview'
    }
  ];
};
