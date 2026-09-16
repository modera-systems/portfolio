import React, { useState } from 'react';
import { PageId } from '../../types';
import { ImplementationWorkspaceDemo } from './ImplementationWorkspaceDemo';
import { TECHNICAL_ARTIFACT_JSON } from './caseStudy01Data';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Layers,
  Workflow,
  Code2,
  FileText,
  HelpCircle,
  Lightbulb,
  Shield,
  Clock,
  ArrowUpRight,
  GitBranch,
  Database,
  Users,
  Terminal,
  Activity,
  ChevronDown,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';

interface ImplementationOpsDeepDiveProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
}

export const ImplementationOpsDeepDive: React.FC<ImplementationOpsDeepDiveProps> = ({
  onNavigate
}) => {
  // Interactive Phase Explorer in Operating Model
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(3); // Default to Integration

  // Interactive Artifact Inspector
  const [highlightedField, setHighlightedField] = useState<string>('status');

  const LIFECYCLE_PHASES = [
    {
      id: 'discovery',
      name: '01. Discovery',
      deliverables: 'Technical Questionnaire, Architecture Map, Data Inventory',
      prerequisites: 'Customer technical stakeholders identified; initial kickoff completed.',
      validationCriteria: 'Security compliance review approved; data dictionary signed off.',
      dependencies: ['Customer IT contact confirmed', 'System of record credentials verified'],
      owner: 'Solutions Consultant & Customer Technical Lead'
    },
    {
      id: 'design',
      name: '02. Solution Design',
      deliverables: 'Canonical Data Schema, Endpoint Specifications, Auth Strategy',
      prerequisites: 'Business rules documented; edge case exceptions cataloged.',
      validationCriteria: 'API contract ratified; token lifecycle & rate limits approved.',
      dependencies: ['Discovery sign-off', 'Security posture audit'],
      owner: 'Solutions Architect & Customer Tech Team'
    },
    {
      id: 'config',
      name: '03. Configuration',
      deliverables: 'Tenant Staging Instance, Role Permissions, Catalog Seed',
      prerequisites: 'Staging environment provisioned with sanitized synthetic data.',
      validationCriteria: 'All user roles tested against access control policies.',
      dependencies: ['Solution Design approved', 'Sandbox tenant active'],
      owner: 'Technical Implementation Engineer'
    },
    {
      id: 'integration',
      name: '04. Integration',
      deliverables: 'Mutual TLS Handshake, Inbound Webhooks, ERP Connector',
      prerequisites: 'Static IP whitelisting on customer perimeter firewall.',
      validationCriteria: '12 of 12 synthetic transaction cycles completed without 5xx errors.',
      dependencies: ['Firewall whitelist', 'OAuth credentials', 'Webhook ingress gateway'],
      owner: 'Technical Implementation Engineer & Customer IT Admin'
    },
    {
      id: 'uat',
      name: '05. Validation / UAT',
      deliverables: 'Execution of 6 Core Scenarios, Defect Remediation Log',
      prerequisites: 'Integration test harness passing in customer sandbox.',
      validationCriteria: 'Zero unresolved Severity-1 or Severity-2 defects.',
      dependencies: ['Integration gate verified', 'Tester training completed'],
      owner: 'Customer Business Testers & Implementation Manager'
    },
    {
      id: 'readiness',
      name: '06. Launch Readiness',
      deliverables: 'Production Cutover Runbook, Rollback Plan, Go-Live Checklist',
      prerequisites: '100% of blocking dependencies passed; Executive sponsor sign-off.',
      validationCriteria: 'Rollback protocol rehearsed; on-call support rotation scheduled.',
      dependencies: ['UAT sign-off', 'Production secrets injected'],
      owner: 'Joint Steering Committee (IM & Customer VP)'
    },
    {
      id: 'golive',
      name: '07. Go-Live',
      deliverables: 'DNS Cutover, Live Order Ingestion, Production Audit Log',
      prerequisites: 'Pre-launch smoke test passing; production maintenance window open.',
      validationCriteria: 'First 100 live transactions reconciled without discrepancy.',
      dependencies: ['Launch readiness certification', 'Maintenance window active'],
      owner: 'Technical Team & Operations Command'
    },
    {
      id: 'stabilization',
      name: '08. Stabilization',
      deliverables: '14-Day Reconciliation Report, Performance Baseline, Bug Fixes',
      prerequisites: 'Production traffic running smoothly under real-world load.',
      validationCriteria: 'Zero critical regressions during two full business cycles.',
      dependencies: ['Go-Live complete', 'Monitoring alerts configured'],
      owner: 'Technical Implementation Engineer'
    },
    {
      id: 'handoff',
      name: '09. Handoff',
      deliverables: 'Customer Architecture Dossier, Support Escalation Matrix',
      prerequisites: 'Stabilization period complete; open minor issues documented.',
      validationCriteria: 'Customer Success & Support team sign-off on operational runbook.',
      dependencies: ['Stabilization sign-off', 'Runbook delivered'],
      owner: 'Implementation Manager to Support Lead'
    }
  ];

  const sections = [
    { id: 'sec-01', num: '01', title: 'The Problem' },
    { id: 'sec-02', num: '02', title: 'Discovery' },
    { id: 'sec-03', num: '03', title: 'Operating Model' },
    { id: 'sec-04', num: '04', title: 'System Architecture' },
    { id: 'sec-05', num: '05', title: 'Product Experience' },
    { id: 'sec-06', num: '06', title: 'Technical Logic' },
    { id: 'sec-07', num: '07', title: 'Design Decisions' },
    { id: 'sec-08', num: '08', title: 'Outcome' },
    { id: 'sec-09', num: '09', title: 'Next Iteration' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="case-study-01-container">
      
      {/* Top Breadcrumb & Portfolio Notice */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('case-studies')}
            className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-slate-600 hover:text-[#ea580c] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Case Studies</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-mono-tech text-slate-500">
            <span>Case Study 01 of 04</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-900 font-semibold">Technical Implementation</span>
          </div>
        </div>

        {/* Credibility & Synthetic Framing Notice */}
        <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-mono-tech font-bold text-slate-900 text-[11px] block">
              ORIGINAL SYNTHETIC DEMONSTRATION NOTICE
            </span>
            This case study represents an original portfolio system informed by professional experience working in technical customer implementations. It does not recreate any proprietary employer platform, tool, or confidential customer record. All organizations, schemas, endpoints, and workflows are entirely synthetic.
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#ea580c]">
            01
          </span>
          <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold uppercase tracking-wider">
            Technical Implementation & Systems Design
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Implementation Operations Platform
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-3xl">
          Designing a unified workspace for complex technical implementations.
        </p>

        {/* Structured Metadata Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block">ROLE</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">Solution Designer / Technical Implementation</span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block">FOCUS</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">Workflow Design & Data Modeling</span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block">CONTEXT</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">Synthetic Portfolio Specification</span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block">EXECUTION</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Interactive Prototyping
            </span>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            DEMONSTRATED CAPABILITIES:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              'Technical Implementation',
              'Requirements Discovery',
              'Workflow Design',
              'Systems Thinking',
              'Data Modeling',
              'Technical Coordination',
              'UAT',
              'Integration Visibility',
              'Operational UX',
              'Prototyping'
            ].map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-mono-tech px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Quick Jump Section Bar */}
      <nav className="sticky top-20 z-30 p-2 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-300 text-[11px] font-mono-tech overflow-x-auto flex items-center gap-2 shadow-lg">
        <span className="text-[#ea580c] font-bold px-2">SECTIONS:</span>
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white whitespace-nowrap transition-colors"
          >
            {sec.num}. {sec.title}
          </a>
        ))}
      </nav>

      {/* ========================================================================= */}
      {/* 01 — THE PROBLEM */}
      {/* ========================================================================= */}
      <section id="sec-01" className="space-y-8 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 01
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            The Problem: Distributed Implementation State
          </h2>
        </div>

        {/* Editorial Highlight Quote */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800 shadow-md">
          <span className="text-xs font-mono-tech text-[#ea580c] uppercase tracking-wider font-semibold block">
            THE CORE THESIS
          </span>
          <blockquote className="font-display text-xl sm:text-2xl font-extrabold text-slate-100 leading-snug tracking-tight">
            “Implementation status isn’t a date. It’s the combined state of dependencies, decisions, testing, ownership, and technical readiness.”
          </blockquote>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed pt-2">
            In enterprise deployments, a project often appears green because a milestone deadline hasn't elapsed, even when an unresolved firewall rule or unverified token exchange means downstream configuration cannot execute.
          </p>
        </div>

        <div className="text-slate-700 text-base leading-relaxed space-y-4">
          <p>
            Consider a technical implementation organization managing dozens of simultaneous customer deployments. Each deployment connects customer stakeholders, implementation managers, technical engineers, third-party software vendors, and legacy infrastructure.
          </p>
          <p>
            The fundamental friction is not generic task tracking. The friction is that critical implementation signals are scattered across disconnected channels: email threads, meeting notes, ticketing backlogs, technical questionnaires, sandbox environments, and spreadsheet checklists.
          </p>
        </div>

        {/* What teams struggle to answer vs. The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-3">
            <h4 className="font-semibold text-rose-950 text-xs font-mono-tech uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>The Symptoms of Signal Fragmentation</span>
            </h4>
            <ul className="space-y-2 text-xs text-rose-900 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>False confidence:</strong> A project timeline says 80% complete, but an unresolved ERP token blocker halts all testing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Ambiguous handoffs:</strong> Downstream engineers start work before upstream security prerequisites are actually certified.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Missing ownership:</strong> When an issue arises, teams burn days figuring out whether internal engineering or the customer IT admin owns the next step.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Isolated UAT:</strong> User acceptance testing is tracked in a separate sheet with no mechanical link to launch readiness gates.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <h4 className="font-semibold text-slate-900 text-xs font-mono-tech uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
              <span>Questions the Operating Model Must Answer</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              {[
                'What is actually happening right now across this account?',
                'Which technical dependency is actively blocking downstream progress?',
                'Who owns the immediate next action: customer or internal team?',
                'What architectural decision changed since last week?',
                'Is this deployment technically ready for production cutover?'
              ].map((q, qIdx) => (
                <div key={qIdx} className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#ea580c]/10 text-[#ea580c] font-mono-tech text-[10px] font-bold flex items-center justify-center shrink-0">
                    {qIdx + 1}
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — DISCOVERY */}
      {/* ========================================================================= */}
      <section id="sec-02" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 02
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            Discovery: Interrogating Implementation Realities
          </h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          Before designing interface layouts or database schemas, I performed a rigorous discovery process. Rather than treating customer onboarding as a uniform project plan, I analyzed the distinct information needs of each stakeholder persona and mapped how technical truth gets obscured.
        </p>

        {/* Stakeholder Lenses: Visual matrix instead of identical cards */}
        <div className="space-y-3">
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-900 block">
            STAKEHOLDER LENSES: DISTINCT INFORMATION SURFACES
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                role: 'Implementation Manager',
                question: 'What is blocked today and who owns the next action?',
                need: 'Cross-account health, unblocked next steps, customer escalation signals, timeline predictability.',
                badge: 'Workflow Driver'
              },
              {
                role: 'Technical Implementer',
                question: 'Which credential, endpoint, or schema is blocking sandbox validation?',
                need: 'Diagnostic logs, API endpoint health, parameter requirements, data mapping rules.',
                badge: 'System Specialist'
              },
              {
                role: 'Executive / CS Leadership',
                question: 'Which customer go-lives are at genuine technical risk vs. date risk?',
                need: 'Portfolio-level risk distribution, systemic bottleneck trends, resource allocation visibility.',
                badge: 'Governance'
              },
              {
                role: 'Customer IT Stakeholder',
                question: 'What specific artifact or firewall rule does my team owe next?',
                need: 'Guarded intake portal, clear technical specs, validation confirmations, no internal jargon.',
                badge: 'External Partner'
              }
            ].map((lens, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase">
                      {lens.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-sm">{lens.role}</h4>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100 text-xs italic text-slate-700">
                    “{lens.question}”
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <strong className="text-slate-900 block text-[10px] uppercase font-mono-tech">Primary Signal:</strong>
                  {lens.need}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annotated Discovery Notes & System Decision Tree */}
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono-tech text-[#ea580c] font-bold uppercase tracking-wider">
              DISCOVERY SYNTHESIS: ARCHITECTURAL PRINCIPLES
            </span>
            <span className="text-[10px] font-mono-tech text-slate-400">
              System Modeling Decisions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-mono-tech font-bold text-emerald-400 block text-[11px]">
                01. DATES DO NOT EQUAL READINESS
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                A project plan might schedule "UAT Sign-off" for Oct 15, but if the perimeter firewall rule fails on Oct 14, the team cannot test. Dependencies must mechanically gate stage progression.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-mono-tech font-bold text-amber-400 block text-[11px]">
                02. CASCADING INVALIDATION
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                When an upstream dependency status mutates (e.g. an API credential rotates or becomes blocked), the system must immediately flag all dependent downstream steps as invalidated.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-mono-tech font-bold text-purple-400 block text-[11px]">
                03. CONTEXT MUST SURVIVE HANDOFFS
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                When an implementation transitions from Solutions Engineering to Support, the architectural rationale, logged risks, and ratified customer decisions must live in the record, not in Slack notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — OPERATING MODEL */}
      {/* ========================================================================= */}
      <section id="sec-03" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 03
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            The Operating Model: Beyond Flat Checklists
          </h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          The core innovation of the platform is replacing flat, unlinked milestone checklists with a <strong>structured implementation entity tree</strong>. In this model, milestones do not exist in isolation; they are composites of dependencies, owners, risks, validation criteria, and customer decisions.
        </p>

        {/* Tree Notation Callout */}
        <div className="p-5 rounded-xl bg-slate-950 text-slate-200 font-mono-tech text-xs border border-slate-800 space-y-2">
          <div className="text-[#ea580c] font-bold text-[10px] uppercase">
            ENTITY HIERARCHICAL MODEL
          </div>
          <pre className="text-slate-300 leading-relaxed overflow-x-auto text-[11px]">
{`IMPLEMENTATION (Customer Deployment Entity)
  └── Phase (Discovery → Design → Config → Integration → UAT → Readiness → Go-Live)
        ├── Milestones (Target Deliverables & Gates)
        ├── Dependencies (Upstream Technical & Procedural Prerequisites)
        ├── Ownership (Primary Implementer vs. Customer IT Admin)
        ├── Risks (Severity, Impact Analysis, Mitigation Strategy)
        ├── Decisions (Ratified Architectural Choices & Implications)
        ├── Technical Work (Endpoint Configurations, Schemas, Code)
        └── Validation (Executable UAT Assertions & Zero-Defect Policies)`}
          </pre>
        </div>

        {/* Interactive Phase Lifecycle Explorer */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech font-bold uppercase text-slate-900">
              CONFIGURABLE IMPLEMENTATION LIFECYCLE (CLICK PHASE TO INSPECT)
            </span>
            <span className="text-[10px] font-mono-tech text-slate-500">
              Standardized 9-Stage Demonstration Model
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 text-[11px] font-mono-tech">
            {LIFECYCLE_PHASES.map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseIndex(idx)}
                className={`p-2 rounded-lg text-center transition-all border ${
                  selectedPhaseIndex === idx
                    ? 'bg-[#ea580c] text-white font-bold border-[#ea580c] shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-75">Phase 0{idx + 1}</span>
                <span className="truncate block font-semibold">{phase.name.split('. ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Dive Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono-tech text-[#ea580c] font-bold uppercase">
                  ACTIVE PHASE SPECIFICATION
                </span>
                <h4 className="font-display font-bold text-lg text-slate-950">
                  {LIFECYCLE_PHASES[selectedPhaseIndex].name}
                </h4>
              </div>
              <div className="text-xs font-mono-tech text-slate-500">
                Primary Owner: <strong className="text-slate-800">{LIFECYCLE_PHASES[selectedPhaseIndex].owner}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-[10px] uppercase font-mono-tech text-slate-400">
                  KEY DELIVERABLES & ARTIFACTS:
                </span>
                <p className="text-slate-800 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {LIFECYCLE_PHASES[selectedPhaseIndex].deliverables}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-[10px] uppercase font-mono-tech text-slate-400">
                  UPSTREAM PREREQUISITES:
                </span>
                <p className="text-slate-800 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {LIFECYCLE_PHASES[selectedPhaseIndex].prerequisites}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <span className="font-mono-tech font-bold uppercase text-[10px] text-emerald-800 block">
                GATE ADVANCEMENT CRITERIA:
              </span>
              <p className="text-emerald-950 leading-relaxed font-medium">
                {LIFECYCLE_PHASES[selectedPhaseIndex].validationCriteria}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — SYSTEM ARCHITECTURE */}
      {/* ========================================================================= */}
      <section id="sec-04" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
              SECTION 04
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
              System Architecture: Event-Driven Operational State
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-slate-500 hidden sm:inline-block">
            Reference Architecture — Synthetic Demonstration
          </span>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          The platform decouples data entry from state evaluation. Rather than permitting direct, arbitrary edits to overall project health, information flows through an API gateway into a centralized business rules engine that recalculates dependency chains, risk exposure, and readiness.
        </p>

        {/* Visual Architecture Diagram (Editorial + Technical) */}
        <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono-tech text-[#ea580c] font-bold uppercase tracking-wider block">
                CONCEPTUAL REFERENCE ARCHITECTURE
              </span>
              <span className="text-sm font-bold text-white">
                Implementation State Orchestration Engine
              </span>
            </div>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Synthetic Design
            </span>
          </div>

          {/* Diagram Flow Layers */}
          <div className="space-y-4 text-xs font-mono-tech">
            
            {/* Layer 1: Ingress / Users */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                01. ACTORS & INGRESS SURFACES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="text-white font-bold mb-0.5">Implementation Teams</div>
                  <div className="text-[10px] text-slate-400">Status mutations, risk logging, manual overrides</div>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="text-white font-bold mb-0.5">Customer IT Portal</div>
                  <div className="text-[10px] text-slate-400">SAML metadata upload, credential validation, UAT</div>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="text-white font-bold mb-0.5">External Webhooks & CI</div>
                  <div className="text-[10px] text-slate-400">Automated handshake telemetry, endpoint probes</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-600">
              <span>↓ REST Mutations, Webhook Payloads & Diagnostic Probes ↓</span>
            </div>

            {/* Layer 2: API Gateway & Auth */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                02. API GATEWAY & SCHEMA ENFORCEMENT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Auth & Role Gate</span>
                  <span className="text-slate-400 text-[10px]">Validates JWT, enforces customer tenant isolation</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Payload Validator</span>
                  <span className="text-slate-400 text-[10px]">Strict JSON schema validation on configuration objects</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-600">
              <span>↓ Validated Mutations ↓</span>
            </div>

            {/* Layer 3: State Machine & Business Logic Engine */}
            <div className="p-4 rounded-xl bg-slate-900 border-2 border-[#ea580c] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ea580c] uppercase font-bold block">
                  03. CORE IMPLEMENTATION ENGINE & STATE EVALUATOR
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ea580c]/20 text-[#ea580c] font-bold">
                  State Machine Core
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-white font-bold block">Dependency Graph</span>
                  <span className="text-slate-400 text-[10px]">Calculates prerequisite cascades & locks</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-white font-bold block">UAT Assertion Engine</span>
                  <span className="text-slate-400 text-[10px]">Blocks launch cutover if critical test fails</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-white font-bold block">Health Rule Evaluator</span>
                  <span className="text-slate-400 text-[10px]">Assigns explainable status (BLOCKED vs AT RISK)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-600">
              <span>↓ Committed Events & State Updates ↓</span>
            </div>

            {/* Layer 4: Storage & Outbound Integrations */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                04. OPERATIONAL DATA STORE & OUTBOUND DISPATCH
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-white font-bold mb-0.5">Relational Operational Store</div>
                  <div className="text-[10px] text-slate-400">ACID guarantees, immutable activity audit stream, version history</div>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-white font-bold mb-0.5">Outbound Event Dispatcher</div>
                  <div className="text-[10px] text-slate-400">Signed webhooks to CRM, Slack alerts, and customer project systems</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — PRODUCT EXPERIENCE (INTERACTIVE SANDBOX) */}
      {/* ========================================================================= */}
      <section id="sec-05" className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
              SECTION 05
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
              Product Experience: The Interactive Workspace
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-slate-500 hidden sm:inline-block">
            Working Prototype Simulation
          </span>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          The interface translates complex dependency relationships into a high-density, easily scannable operational workspace. Explore the five synthetic customer accounts below, toggle dependency statuses in <strong>Northstar Distribution</strong>, and observe how downstream gates, UAT assertions, and explainable health rules respond.
        </p>

        {/* Embedded Complete Interactive Application Component */}
        <div className="pt-2">
          <ImplementationWorkspaceDemo />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — TECHNICAL LOGIC & ARTIFACT */}
      {/* ========================================================================= */}
      <section id="sec-06" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 06
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            Technical Logic: Connecting Data, Logic, and UX
          </h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          A great user experience in technical tools is not just styling; it is a direct projection of a disciplined data schema. Rather than treating task completion as a binary boolean, the platform models dependencies as first-class relational entities with explicit upstream constraints, ownership types, and failure diagnostics.
        </p>

        {/* Concrete Technical Artifact: Structured JSON Example */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech font-bold uppercase text-slate-900 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#ea580c]" />
              TECHNICAL ARTIFACT: SYNTHETIC DEPENDENCY ENTITY SCHEMA
            </span>
            <span className="text-[10px] font-mono-tech text-slate-500">
              Model Representation (JSON)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* JSON Code Viewer (7 cols) */}
            <div className="lg:col-span-7 p-4 rounded-xl bg-slate-950 text-slate-200 font-mono-tech text-[11px] border border-slate-800 shadow-md overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 mb-2 border-b border-slate-800">
                <span>dependency_entity.json</span>
                <span className="text-emerald-400">Schema v2.4</span>
              </div>
              <pre className="text-slate-300 leading-relaxed">
                {TECHNICAL_ARTIFACT_JSON}
              </pre>
            </div>

            {/* Architectural Tie-in Explanation (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <span className="font-mono-tech font-bold text-[10px] uppercase text-[#ea580c] block">
                  DATA → LOGIC → USER EXPERIENCE
                </span>
                <h5 className="font-bold text-sm text-slate-900">
                  How This JSON Directly Drives the Interface:
                </h5>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-mono-tech font-bold text-slate-900 block text-[11px]">
                      1. "blocks": ["uat_scenario_04", ...]
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      The UI disables the "Run Test" action for UAT Scenario 04 and renders the dashed warning badge indicating an upstream blocker.
                    </p>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-mono-tech font-bold text-slate-900 block text-[11px]">
                      2. "status": "BLOCKED"
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Triggers the red pulsed "BLOCKED" badge in the implementation directory and activates the explainable rationale banner.
                    </p>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-mono-tech font-bold text-slate-900 block text-[11px]">
                      3. "ownership.primaryOwner"
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Automatically sorts the next action into the "Customer IT Action" bin, preventing internal engineers from waiting in ambiguity.
                    </p>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-mono-tech font-bold text-slate-900 block text-[11px]">
                      4. "diagnostics.probeResult"
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Provides instant curl-style network context (TCP SYN drop on port 443) so engineers don't have to SSH into a staging box to triage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — DESIGN DECISIONS */}
      {/* ========================================================================= */}
      <section id="sec-07" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 07
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            Design Decisions & System Tradeoffs
          </h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          Operational tooling requires conscious rejection of aesthetic vanity in favor of diagnostic utility, trust, and predictability. Here are five core system design decisions made during this initiative:
        </p>

        <div className="space-y-4">
          {[
            {
              title: 'Explainable Status Rules Over Arbitrary Health Scores',
              chosen: 'Rules-based deterministic state machine (BLOCKED, NEEDS ATTENTION, AT RISK, ON TRACK, LIVE) where every status can be inspected to reveal the exact matching boolean rule.',
              discarded: 'Black-box "AI Health Scores" (e.g. 74/100). Arbitrary scores destroy trust; when an account owner is told an account is at risk, they need the exact blocking condition, not a floating-point score.',
              tag: 'Trust & Explainability'
            },
            {
              title: 'First-Class Dependency Graph Over Flat Task Checklists',
              chosen: 'Modeling prerequisite relationships as a directed acyclic graph (DAG) where upstream blockers automatically suspend downstream execution and inform launch gates.',
              discarded: 'Standard to-do checklists where users check off items out of sequence, allowing teams to falsely believe they are ready for cutover.',
              tag: 'Systems Architecture'
            },
            {
              title: 'Progressive Disclosure Over Information Dumping',
              chosen: 'A dual-pane layout: a scannable implementation directory on the left answering "What needs attention?", expanding into deep-dive technical drawers on demand.',
              discarded: 'Overwhelming single-page dashboards that display every API parameter, raw log, and meeting note at once, creating cognitive fatigue.',
              tag: 'Operational UX'
            },
            {
              title: 'Activity Stream as Structured Events Over Chat Logs',
              chosen: 'Recording every status mutation, UAT test execution, risk entry, and customer decision as a typed, timestamped event with an actor role and diagnostic payload.',
              discarded: 'Relying on informal Slack or chat channels where critical architectural changes and customer sign-offs get buried in conversational noise.',
              tag: 'Data Integrity'
            },
            {
              title: 'Decoupling Technical Readiness from Project Calendar Dates',
              chosen: 'Evaluating readiness independently of elapsed project timeline days. A project 90% through its calendar schedule is still 0% ready if an authentication handshake fails.',
              discarded: 'Timeline-based progress bars that auto-increment based purely on the calendar date.',
              tag: 'Risk Management'
            }
          ].map((d, dIdx) => (
            <div key={dIdx} className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-[#ea580c] font-mono-tech text-xs font-bold flex items-center justify-center">
                    0{dIdx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {d.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold self-start sm:self-auto">
                  {d.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                  <span className="font-mono-tech font-bold uppercase block text-[10px] text-emerald-800 mb-1">
                    WHY THIS WAS CHOSEN:
                  </span>
                  {d.chosen}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                  <span className="font-mono-tech font-bold uppercase block text-[10px] text-slate-500 mb-1">
                    ALTERNATIVE DISCARDED:
                  </span>
                  {d.discarded}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — OUTCOME */}
      {/* ========================================================================= */}
      <section id="sec-08" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
              SECTION 08
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
              Demonstrated Outcome
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-slate-500 hidden sm:inline-block">
            Qualitative System Capabilities
          </span>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          As an original synthetic portfolio demonstration, this project evaluates the architectural and workflow mechanics of technical implementation management. The resulting model creates a single operational view connecting implementation progress, technical dependencies, ownership, validation, risk, decisions, and activity.
        </p>

        {/* Qualitative Capabilities Matrix */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h4 className="font-semibold text-slate-900 text-xs font-mono-tech uppercase tracking-wider">
            Verified Operational Capabilities Unlocked
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {[
              'Eliminated dependency blindness by explicitly tying downstream configuration tasks to prerequisite security and networking approvals.',
              'Established clear ownership partition between Customer IT actions and Internal Technical Implementation actions.',
              'Embedded live UAT assertions directly into production launch gates, enforcing a zero-defect cutover policy.',
              'Preserved architectural decision history and risk mitigation logs across team transitions and handoffs.',
              'Replaced opaque, arbitrary project status updates with deterministic, explainable boolean health rules.',
              'Enabled rapid triage by surfacing technical diagnostics (ports, endpoints, probe timeouts) directly alongside workflow milestones.'
            ].map((cap, cIdx) => (
              <div key={cIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{cap}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-mono-tech text-slate-400 pt-2 border-t border-slate-200">
            Note: In accordance with portfolio credibility standards, qualitative operational outcomes describe system capabilities rather than unsubstantiated commercial ROI metrics.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — NEXT ITERATION */}
      {/* ========================================================================= */}
      <section id="sec-09" className="space-y-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded bg-[#ea580c]/10">
            SECTION 09
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            Next Iteration: Future Technical Capabilities
          </h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          A successful operating system evolves as organizational scale increases. These forward-looking concepts demonstrate the next architectural iterations for the platform:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Automated Webhook Heartbeats',
              description: 'Ingesting live connection health probes directly from customer staging environments to auto-resolve dependency gates without manual sign-off.',
              tag: 'Automation'
            },
            {
              title: 'Customer-Facing Co-Pilot Portal',
              description: 'A lightweight, branded client workspace providing client IT teams self-serve certificate uploading, IP validation, and live handshake diagnostics.',
              tag: 'External UX'
            },
            {
              title: 'Vertical Implementation Templates',
              description: 'Pre-configured dependency graphs and UAT test suites tailored by industry vertical (e.g. Wholesale Logistics vs. Healthcare vs. Financial Services).',
              tag: 'Scalability'
            },
            {
              title: 'Automated Support Handoff Dossier',
              description: 'Compiling all ratified decisions, custom endpoint parameters, and UAT history into an automated operational runbook for post-launch Tier-2 support.',
              tag: 'Knowledge Transfer'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[#ea580c]">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-[10px] font-mono-tech font-bold uppercase bg-[#ea580c]/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="text-[10px] font-mono-tech text-slate-400 pt-2 border-t border-slate-100 block">
                Roadmap Iteration #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Prev / Next Navigation Footer */}
      <div className="pt-12 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={() => onNavigate('case-studies')}
          className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-[#ea580c] text-left transition-all group"
        >
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Case Studies Directory
          </span>
          <span className="font-bold text-slate-900 text-sm group-hover:text-[#ea580c] transition-colors block">
            View All 4 Technical Case Studies
          </span>
        </button>

        <button
          onClick={() => onNavigate('case-study-detail', '02-api-integration-workflow')}
          className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-[#ea580c] text-right transition-all group"
        >
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase flex items-center justify-end gap-1 mb-1">
            Next Case Study
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-bold text-slate-900 text-sm group-hover:text-[#ea580c] transition-colors block">
            02 — Resilient Webhook & API Ingestion
          </span>
        </button>
      </div>

    </div>
  );
};
