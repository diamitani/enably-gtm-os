import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Share2, 
  RefreshCw, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building,
  Target,
  Send,
  Plus
} from 'lucide-react';
import { INITIAL_LEADS, generateLeadOutreachSequence } from '../lib/crm-store';
import { LeadRecord } from '../types';

interface CrmViewProps {
  onDirectToStudio: (prompt: string) => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ onDirectToStudio }) => {
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(INITIAL_LEADS[0]);
  const [isEnriching, setIsEnriching] = useState<boolean>(false);
  const [filterTier, setFilterTier] = useState<string>('All');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'All' || l.icpTier.includes(filterTier);
    return matchesSearch && matchesTier;
  });

  const handleEnrichLead = (leadId: string) => {
    setIsEnriching(true);
    setTimeout(() => {
      setLeads(prev => prev.map(l => {
        if (l.id === leadId) {
          return {
            ...l,
            enrichmentStatus: 'verified',
            icpScore: Math.min(100, l.icpScore + 5),
            signals: [...l.signals, 'Clay waterfall phone & work email verified']
          };
        }
        return l;
      }));
      setIsEnriching(false);
    }, 1200);
  };

  const handleGenerateCadence = (lead: LeadRecord) => {
    const sequence = generateLeadOutreachSequence(lead);
    const prompt = `Direct SDR Copilot to execute outbound cadence for ${lead.fullName} (${lead.title} at ${lead.company}):
- Email 1 Subject: ${sequence[0].subject}
- Email 1 Body: ${sequence[0].body}
- LinkedIn Touch: ${sequence[1].body}`;
    onDirectToStudio(prompt);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-paper-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-1">
            <Users className="h-4 w-4" />
            <span>Lead Studio & Account Intelligence CRM</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink">
            Target Accounts & Prospect Directory
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Automated waterfall enrichment, ICP scoring, account briefs, and 1-click sequence dispatching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEnrichLead(leads[0].id)}
            disabled={isEnriching}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-ink hover:bg-accent/90 transition-colors shadow-glow-accent"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isEnriching ? 'animate-spin' : ''}`} />
            <span>{isEnriching ? 'Enriching...' : 'Run Clay Waterfall Batch'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, companies, domains..."
            className="w-full rounded-xl border border-paper-300 bg-paper-50 pl-10 pr-4 py-2 text-xs text-ink placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'ICP-1', 'ICP-2', 'ICP-3'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterTier === tier
                  ? 'bg-accent text-white font-bold'
                  : 'bg-paper-50 text-ink-muted hover:text-ink border border-paper-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Leads Table (Left) + Selected Account Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Leads Table */}
        <div className="lg:col-span-7 rounded-2xl border border-paper-200 bg-paper-50/60 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-paper-200 text-xs font-semibold text-ink-muted">
            <span>Contact & Company</span>
            <span>ICP Score</span>
          </div>

          <div className="space-y-2.5">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-cyan bg-paper-50 shadow-glow-accent'
                      : 'border-paper-200/80 bg-white/60 hover:border-paper-300 hover:bg-paper-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink">{lead.fullName}</span>
                        <span className="rounded bg-paper-100 px-1.5 py-0.5 text-[10px] font-mono text-accent">
                          {lead.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-ink-muted mt-1">
                        <Building className="h-3 w-3" />
                        <span>{lead.company}</span>
                        <span>•</span>
                        <span>{lead.companySize}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-brand-emerald/30 px-2.5 py-1 text-xs font-mono font-bold text-emerald-600">
                        <Target className="h-3 w-3" />
                        <span>{lead.icpScore}/100</span>
                      </div>
                      <div className="text-[10px] text-ink-faint font-mono mt-1">
                        {lead.enrichmentStatus.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-paper-200/80">
                    {lead.signals.slice(0, 2).map((sig, i) => (
                      <span key={i} className="rounded bg-paper-50 px-2 py-0.5 text-[10px] font-mono text-ink-soft border border-paper-200">
                        ⚡ {sig}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Account Intelligence Dossier */}
        <div className="lg:col-span-5 rounded-2xl border border-paper-200 bg-paper-50/80 p-6 shadow-card space-y-5">
          {selectedLead ? (
            <>
              <div className="flex items-start justify-between pb-4 border-b border-paper-200">
                <div>
                  <h3 className="text-lg font-bold text-ink">{selectedLead.fullName}</h3>
                  <p className="text-xs text-accent font-mono">{selectedLead.title} @ {selectedLead.company}</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">{selectedLead.location} • {selectedLead.industry}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedLead.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-paper-100 p-2 text-ink-soft hover:text-ink">
                    <Share2 className="h-4 w-4" />
                  </a>
                  <a href={`mailto:${selectedLead.email}`} className="rounded-lg bg-paper-100 p-2 text-ink-soft hover:text-ink">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Account Brief */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  AI Account Intelligence Brief
                </span>
                <div className="rounded-xl border border-paper-200 bg-white p-3.5 text-xs text-ink leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedLead.generatedAccountBrief}
                </div>
              </div>

              {/* Buying Signals */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Verified Trigger Signals
                </span>
                <div className="space-y-1.5">
                  {selectedLead.signals.map((sig, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-accent bg-white p-2 rounded-lg border border-paper-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Click Outbound Sequence Dispatcher */}
              <div className="pt-4 border-t border-paper-200 space-y-3">
                <button
                  onClick={() => handleGenerateCadence(selectedLead)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue py-3 text-xs font-bold text-ink hover:opacity-95 shadow-glow-accent transition-all"
                >
                  <Send className="h-4 w-4 fill-obsidian-950" />
                  <span>Execute Sequence in Studio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-ink-faint text-xs">
              Select a lead from the directory to inspect account intelligence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
