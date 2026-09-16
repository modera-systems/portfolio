import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  FileCheck,
  Search,
  Database
} from 'lucide-react';

interface SystemStage {
  id: string;
  stepNumber: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  systemRole: string;
  mandate: string;
  coreCompetencies: { name: string; tag: string; detail: string }[];
  deliverables: string[];
  protocolOrTooling: string[];
}

const SYSTEMS_LIFECYCLE: SystemStage[] = [
  {
    id: 'discovery',
    stepNumber: '01',
    title: 'Discovery & Diagnostics',
    shortTitle: 'Discovery',
    icon: Compass,
    systemRole: 'Operational Friction Discovery',
    mandate: 'Uncovering the real human and technical bottlenecks behind business complaints before committing to a tool or writing a single automation.',
    coreCompetencies: [
      { name: 'Technical Discovery', tag: 'Discovery', detail: 'Interviewing field workers, ops leads, and managers to map how work actually moves.' },
      { name: 'Requirements Translation', tag: 'Analysis', detail: 'Translating ambiguous client wishlists into concrete workflow criteria and data fields.' },
      { name: 'Process & System Audits', tag: 'Diagnostics', detail: 'Auditing existing spreadsheets, paper forms, and disparate SaaS tools to find manual re-entry points.' },
      { name: 'Stakeholder Alignment', tag: 'Consulting', detail: 'Aligning business decision-makers, sales leads, and technical contributors on realistic scope.' }
    ],
    deliverables: [
      'Operational Problem Statement & Stage Requirements',
      'System Audit & Integration Touchpoint Map',
      'Technical Discovery Matrix'
    ],
    protocolOrTooling: ['Stakeholder Interviews', 'Process Mapping', 'Field Audits', 'Operational Diagnostics']
  },
  {
    id: 'architecture',
    stepNumber: '02',
    title: 'Workflow & Solution Design',
    shortTitle: 'Solution Design',
    icon: Layers,
    systemRole: 'End-to-End System Blueprints',
    mandate: 'Formulating understandable solution topologies, hand-off protocols, and clear boundaries between client responsibilities and platform capabilities.',
    coreCompetencies: [
      { name: 'Solution Architecture Blueprints', tag: 'Design', detail: 'Authoring clear visual workflow diagrams and stage-by-stage operational hand-offs.' },
      { name: 'Operational Journey Mapping', tag: 'UX / Workflow', detail: 'Connecting customer-facing intake, business triage, scheduling, and service execution.' },
      { name: 'Data Model Schema Design', tag: 'Data', detail: 'Defining structured JSON schemas and relational entities that mirror real-world operational objects.' },
      { name: 'Boundary Definition', tag: 'Scope Clarity', detail: 'Clearly delineating custom integration logic from platform-native features.' }
    ],
    deliverables: [
      'High-Level Solution Architecture Diagrams',
      'Lifecycle Stage Maps (Intake → Triage → Dispatch → Billing)',
      'Data Schema Specifications'
    ],
    protocolOrTooling: ['Workflow Diagrams', 'Journey Maps', 'JSON Schema', 'State Flow Blueprints']
  },
  {
    id: 'integrations',
    stepNumber: '03',
    title: 'Integrations & Automation',
    shortTitle: 'Integrations',
    icon: Workflow,
    systemRole: 'Inter-System Event Pipelines',
    mandate: 'Connecting fragmented operational tools through dependable event-driven webhooks, REST APIs, and automated data transformations.',
    coreCompetencies: [
      { name: 'n8n Workflow Automation', tag: 'Automation', detail: 'Engineering multi-step automated workflows with conditional branching and data cleaning.' },
      { name: 'Event-Driven Webhooks', tag: 'Pipelines', detail: 'Triggering asynchronous downstream actions the exact moment an operational milestone occurs.' },
      { name: 'Data Transformation & Cleaning', tag: 'Data Hygiene', detail: 'Normalizing messy field inputs, casing, addresses, and line-item arrays into clean API payloads.' },
      { name: 'REST & OAuth Authentication', tag: 'APIs', detail: 'Securing API handshakes and token exchanges with platforms like QuickBooks and SaaS systems.' }
    ],
    deliverables: [
      'Tested Event-Driven Webhook Pipelines',
      'Data Normalization Middleware in n8n',
      'Automated Invoicing & Notification Flows'
    ],
    protocolOrTooling: ['n8n', 'Webhooks', 'REST APIs', 'OAuth 2.0', 'JavaScript Data Transforms']
  },
  {
    id: 'prototyping',
    stepNumber: '04',
    title: 'Prototyping & Customer Experience',
    shortTitle: 'Prototyping',
    icon: Zap,
    systemRole: 'Interactive Proof of Concept',
    mandate: 'Building functional, customer-facing prototypes and lightweight portals to validate system ideas with real users before full-scale rollouts.',
    coreCompetencies: [
      { name: 'Interactive UI Prototyping', tag: 'Frontend', detail: 'Constructing clean, responsive user interfaces that consume real API and webhook data.' },
      { name: 'Access Token Security Flows', tag: 'Access Models', detail: 'Designing low-friction, time-bound magic links for consumers without requiring passwords.' },
      { name: 'Sensitive Data Scrubbing', tag: 'Data Privacy', detail: 'Filtering out proprietary vendor costs and internal notes before rendering customer views.' },
      { name: 'Customer Experience Design', tag: 'CX', detail: 'Turning internal operations milestones into transparent, reassuring status trackers.' }
    ],
    deliverables: [
      'Functional Webhook-Driven Customer Portals',
      'Time-Bound Session Token Gateways',
      'Interactive Operational Dashboards'
    ],
    protocolOrTooling: ['React / TypeScript', 'Tailwind CSS', 'API Intermediaries', 'Token Generators']
  },
  {
    id: 'delivery',
    stepNumber: '05',
    title: 'Implementation & Client Enablement',
    shortTitle: 'Delivery & Enablement',
    icon: Rocket,
    systemRole: 'Operational Handover & Training',
    mandate: 'Guiding clients, partners, and internal operators through deployment, acceptance verification, and long-term autonomy.',
    coreCompetencies: [
      { name: 'User Acceptance Testing (UAT)', tag: 'Verification', detail: 'Designing end-to-end acceptance dry-runs with test data to verify business accuracy.' },
      { name: 'Client & Operator Training', tag: 'Enablement', detail: 'Teaching non-technical business owners and staff how to navigate and manage new systems.' },
      { name: 'Operational Runbooks', tag: 'Documentation', detail: 'Writing straightforward, jargon-free guides documenting system steps and edge-case resolution.' },
      { name: 'Feedback & Iteration Loops', tag: 'Lifecycle', detail: 'Tracking operational metrics post-launch to identify further workflow optimizations.' }
    ],
    deliverables: [
      'Client Operational Runbooks & Video Walkthroughs',
      'UAT Verification Checklists',
      'Post-Launch Business Visibility Dashboards'
    ],
    protocolOrTooling: ['UAT Testing', 'Client Guides', 'Runbooks', 'Live Verification Walkthroughs']
  }
];

export const ToolkitSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('integrations');
  const activeStage = SYSTEMS_LIFECYCLE.find(s => s.id === activeStageId) || SYSTEMS_LIFECYCLE[2];

  return (
    <section className="space-y-8" id="systems-lifecycle-section">
      
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            SYSTEMS & SOLUTIONS LIFECYCLE
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          How I Take Solutions From Discovery to Delivery
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          My disciplined, five-stage methodology for translating complex operational friction into working, integrated software.
        </p>
      </div>

      {/* Stage Tab Strip */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-200 pb-4">
        {SYSTEMS_LIFECYCLE.map((stage) => {
          const isSelected = stage.id === activeStageId;
          const IconComponent = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-[#ea580c]' : 'text-slate-400'}`} />
              <span className="font-mono-tech text-[10px] text-orange-400 font-bold">{stage.stepNumber}</span>
              <span>{stage.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
              STAGE {activeStage.stepNumber} • {activeStage.systemRole}
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
              {activeStage.title}
            </h4>
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-tech font-bold bg-slate-100 text-slate-800 self-start sm:self-auto">
            Practical Working Competency
          </span>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-3xl">
          {activeStage.mandate}
        </p>

        {/* Competencies Grid */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block">
            CORE COMPETENCIES & TECHNIQUES IN THIS STAGE
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeStage.coreCompetencies.map((comp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold">{comp.name}</strong>
                  <span className="text-[9px] font-mono-tech bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-semibold">
                    {comp.tag}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{comp.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Tooling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
              PRIMARY DELIVERABLES:
            </span>
            <div className="space-y-1.5 text-slate-700">
              {activeStage.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-bold block">
              REPRESENTATIVE TOOLS & ARTIFACTS:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {activeStage.protocolOrTooling.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200/60">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
