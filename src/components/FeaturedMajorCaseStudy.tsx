import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Lock, 
  Workflow, 
  Server, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';

interface FeaturedMajorCaseStudyProps {
  caseStudy: CaseStudy;
  onSelect: (id: string) => void;
}

export const FeaturedMajorCaseStudy: React.FC<FeaturedMajorCaseStudyProps> = ({
  caseStudy,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'payload' | 'decision'>('flow');
  const [simulatedState, setSimulatedState] = useState<'pending' | 'verified'>('verified');

  return (
    <div 
      id="featured-major-case-study"
      className="w-full rounded-3xl bg-[#090d16] text-white border border-slate-800/90 shadow-2xl overflow-hidden relative"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Editorial Eyebrow & Role Meta Strip */}
      <div className="px-6 sm:px-10 py-4 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono-tech text-xs font-bold text-[#ea580c]">
            {caseStudy.number} / FLAGSHIP CASE STUDY
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-medium">
            {caseStudy.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono-tech text-slate-400">
          <span>ROLE: <strong className="text-slate-200">{caseStudy.role}</strong></span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-emerald-400 font-semibold">9-Part Technical Spec Available</span>
        </div>
      </div>

      {/* Main Editorial Content Spread (12-col grid) */}
      <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Narrative, Problem, Core Decision & Metrics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-3">
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              {caseStudy.title}
            </h3>
            
            <p className="text-[#ea580c] font-medium text-base sm:text-lg leading-relaxed">
              {caseStudy.oneLiner}
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Enterprise customer deployment was tracked across fragmented spreadsheets and unversioned technical questionnaires. When critical technical prerequisites stalled (firewall whitelisting, SSO metadata exchange, ERP token issuance), account owners discovered the blockers weeks late.
          </p>

          {/* Key Architecture & Workflow Focus Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-mono-tech text-base sm:text-lg font-bold text-white">Finite State</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">Deployment Machine</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-mono-tech text-base sm:text-lg font-bold text-emerald-400">Prerequisite</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">Sequential Gating</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-mono-tech text-base sm:text-lg font-bold text-white">Event-Driven</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">Webhook Notifications</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-mono-tech text-base sm:text-lg font-bold text-[#ea580c]">Ephemeral</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">Credential Isolation</div>
            </div>
          </div>

          {/* Core Architectural Decision Highlight */}
          <div className="p-4 rounded-xl bg-slate-900/60 border-l-4 border-[#ea580c] border-y border-r border-slate-800/80 space-y-1">
            <div className="text-xs font-mono-tech text-[#ea580c] font-bold">
              CRITICAL ARCHITECTURAL DECISION:
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Adopted an event-driven <strong>finite state machine</strong> over generic CRUD status dropdowns. Prevented implementation consultants from accidentally marking a client as &ldquo;Live&rdquo; when upstream security audits or data sync prerequisites were still pending.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelect(caseStudy.id)}
              id="btn-view-flagship-spec"
              className="px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-950/50 group"
            >
              <span>Explore Complete 9-Part Technical Specification</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline">
              Includes Data Schema, HLD & Webhook Contracts
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive State Engine & Payload Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#ea580c]" />
              <span className="font-mono-tech text-xs font-bold text-slate-200">
                STATE MACHINE GATED TOPOLOGY
              </span>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono-tech">
              <button
                onClick={() => setActiveTab('flow')}
                className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'flow' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                Gating
              </button>
              <button
                onClick={() => setActiveTab('payload')}
                className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'payload' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                Payload
              </button>
            </div>
          </div>

          {/* Interactive Gating States */}
          {activeTab === 'flow' ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Phase 01: Identity & SSO SAML Handshake
                  </span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-300">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300/80 font-mono-tech">
                  Certificate Status: Active • Handshake: Verified
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#ea580c]/10 border border-[#ea580c]/60 text-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
                    Phase 02: ERP Connector Endpoint Provisioning
                  </span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-[#ea580c]/30 text-[#ea580c]">
                    IN PROGRESS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Listening for outbound authorization handshake on <code className="text-[#ea580c] font-mono-tech">/v1/auth/erp/callback</code>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 space-y-1 opacity-80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium flex items-center gap-1.5 text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Phase 03: SCIM Directory Synchronization
                  </span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    LOCKED
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Strictly gated: Cannot execute until ERP Connector validates schema
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
                <span>Webhook Event Contract:</span>
                <span className="text-[#ea580c]">milestone.completed</span>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono-tech text-[10px] text-slate-300 overflow-x-auto leading-relaxed max-h-48">
{`{
  "event": "milestone.completed",
  "eventId": "evt_9981a2f4",
  "deployment": {
    "tenantId": "org_alpha_logistics",
    "phase": "IDENTITY_CONFIGURED",
    "milestone": "sso_saml_handshake",
    "status": "VERIFIED",
    "prerequisitesSatisfied": true,
    "unblockedSteps": [
      "erp_connector_provisioning",
      "user_scim_sync"
    ]
  }
}`}
              </pre>
            </div>
          )}

          {/* Footer of the right box */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
            <span>Built with:</span>
            <div className="flex items-center gap-2 text-slate-300">
              <span>TypeScript</span>
              <span>•</span>
              <span>Relational Store</span>
              <span>•</span>
              <span>REST / Webhooks</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
