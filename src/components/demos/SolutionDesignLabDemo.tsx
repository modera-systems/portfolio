import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  MapPin, 
  Wrench, 
  FolderKanban, 
  Building2, 
  WifiOff, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Clock, 
  Compass, 
  FileText, 
  CheckCircle2, 
  Users, 
  HelpCircle,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

export type PersonaId = 'all' | 'submitter' | 'operations' | 'field' | 'management';

interface RequirementItem {
  id: string;
  number: string;
  title: string;
  category: string;
  customerQuote: string;
  customerNeed: string;
  platformCapability: string;
  verifiedCapabilityTag: string;
  solutionDecision: string;
  relevantStages: string[];
  relevantPersonas: ('submitter' | 'operations' | 'field' | 'management')[];
}

interface WorkflowStageItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  zone: 'Entry' | 'Operations' | 'Field' | 'Central' | 'Lifecycle';
  primaryActor: string;
  description: string;
}

const WORKFLOW_STAGES: WorkflowStageItem[] = [
  {
    id: 'recommend-site',
    number: '01',
    title: 'Recommend Site',
    subtitle: 'Submission Entry Point',
    zone: 'Entry',
    primaryActor: 'Site Submitter / Partner',
    description: 'Potential charger location enters the workflow through a simple submission experience such as a web-based entry point or lightweight form.'
  },
  {
    id: 'collect-info',
    number: '02',
    title: 'Collect Site Information',
    subtitle: 'Intake / Self-Survey',
    zone: 'Entry',
    primaryActor: 'Site Submitter',
    description: 'Remote or self-service intake gathers customer and site details needed for initial review via web form or QR-based entry.'
  },
  {
    id: 'qualify-review',
    number: '03',
    title: 'Qualify & Review',
    subtitle: 'Operational Review',
    zone: 'Operations',
    primaryActor: 'Operations Team',
    description: 'Submitted information moves into operational review to evaluate readiness before downstream field activity is scheduled.'
  },
  {
    id: 'field-survey',
    number: '04',
    title: 'Field Survey',
    subtitle: 'On-Site Evaluation',
    zone: 'Field',
    primaryActor: 'Field Team / Surveyor',
    description: 'Field teams use the platform\'s field tooling to review the location, complete survey forms, capture photos, and record notes with offline synchronization.'
  },
  {
    id: 'installation-workflow',
    number: '05',
    title: 'Installation Workflow',
    subtitle: 'Planning & Assignment',
    zone: 'Operations',
    primaryActor: 'Operations Team',
    description: 'Approved work progresses into installation planning and assignment, ensuring installers have access to relevant project information with customizable permissions.'
  },
  {
    id: 'field-execution',
    number: '06',
    title: 'Field Execution',
    subtitle: 'Installation Activity',
    zone: 'Field',
    primaryActor: 'Field Team / Installer',
    description: 'Assigned field users perform installation activity and record relevant project updates, photos, and notes through the field experience.'
  },
  {
    id: 'platform-update',
    number: '07',
    title: 'Central Platform Update',
    subtitle: 'Operational Visibility',
    zone: 'Central',
    primaryActor: 'Field Operations Platform',
    description: 'Field activity and updates are reflected back in the central operating workflow, supporting visibility into project progress and milestones.'
  },
  {
    id: 'maintenance-lifecycle',
    number: '08',
    title: 'Ongoing Maintenance / Lifecycle',
    subtitle: 'Follow-Up & Maintenance',
    zone: 'Lifecycle',
    primaryActor: 'Operations & Field Teams',
    description: 'The platform supports continued maintenance and lifecycle activity after installation, maintaining continuity across follow-up work.'
  }
];

const REQUIREMENTS: RequirementItem[] = [
  {
    id: 'site-intake',
    number: '01',
    title: 'Site Intake',
    category: 'Intake & Remote Capture',
    customerQuote: 'We need a simple way for potential charger locations to enter the process.',
    customerNeed: 'Enable property partners, municipal site hosts, and prospective location owners to recommend candidate charger locations without requiring internal system access or complex onboarding.',
    platformCapability: 'Web form / QR-based intake concept that captures structured location details and connects them into the operational review workflow.',
    verifiedCapabilityTag: 'Web form / QR-based intake concept',
    solutionDecision: 'Propose using the platform\'s native web form and QR-based intake entry points rather than requiring external users to log into an internal management portal or emailing disconnected spreadsheets.',
    relevantStages: ['recommend-site', 'collect-info'],
    relevantPersonas: ['submitter', 'operations']
  },
  {
    id: 'field-work',
    number: '02',
    title: 'Field Work',
    category: 'On-Site Execution',
    customerQuote: 'Our field teams need relevant project information while performing surveys and installation work.',
    customerNeed: 'Surveyors and installation crews working on site need direct access to job-specific forms, location photos, equipment specs, and prior survey notes without carrying paper binders.',
    platformCapability: 'Field tooling for surveys, installations, and maintenance with structured forms, photo uploads, field notes, and status updates.',
    verifiedCapabilityTag: 'Field tooling for surveys, installations, and maintenance',
    solutionDecision: 'Leverage the platform\'s existing field tooling for both initial survey evaluations and downstream installation execution, ensuring photos, notes, and form submissions attach directly to the central site record.',
    relevantStages: ['field-survey', 'field-execution'],
    relevantPersonas: ['field']
  },
  {
    id: 'connectivity',
    number: '03',
    title: 'Connectivity',
    category: 'Offline Capability',
    customerQuote: 'Field work may happen where connectivity is limited.',
    customerNeed: 'Charger deployments frequently take place in parking garages, underground basements, highway corridors, or rural sites where cellular reception is intermittent or completely absent.',
    platformCapability: 'Offline field capability with local data persistence and automatic synchronization after connectivity returns.',
    verifiedCapabilityTag: 'Offline field capability with synchronization',
    solutionDecision: 'Use the existing offline-capable field experience as part of the survey, installation, and maintenance workflow rather than proposing a separate field application or falling back to paper forms.',
    relevantStages: ['field-survey', 'field-execution'],
    relevantPersonas: ['field']
  },
  {
    id: 'visibility',
    number: '04',
    title: 'Visibility',
    category: 'Central Tracking',
    customerQuote: 'Central teams need to understand how distributed work is progressing.',
    customerNeed: 'Central operations and program teams coordinating distributed site evaluations require real-time visibility into workflow progress and milestone completions.',
    platformCapability: 'Workflow tracking / project updates reflecting real-time state changes and status progression across distributed sites.',
    verifiedCapabilityTag: 'Workflow tracking / project updates',
    solutionDecision: 'Connect on-site field submissions directly back to central project updates, allowing operations and program teams to track workflow progress in real time without chasing updates over email.',
    relevantStages: ['qualify-review', 'platform-update', 'maintenance-lifecycle'],
    relevantPersonas: ['operations', 'management']
  },
  {
    id: 'access',
    number: '05',
    title: 'Access',
    category: 'Role Boundaries',
    customerQuote: 'Different users need access to the information relevant to their role.',
    customerNeed: 'Multiple external contractors, internal operations coordinators, third-party partner teams, and program stakeholders require clear information partitioning and permission boundaries.',
    platformCapability: 'Customizable access / permissions scoping data views, form access, and editing privileges based on assigned user roles.',
    verifiedCapabilityTag: 'Customizable access / permissions',
    solutionDecision: 'Establish distinct permission tiers using native role-based controls: external submitters see only their submissions; field contractors see only assigned work; central operations manage operational review and assignment; leadership reviews workflow progress and milestones.',
    relevantStages: ['recommend-site', 'qualify-review', 'installation-workflow', 'platform-update'],
    relevantPersonas: ['submitter', 'operations', 'field', 'management']
  },
  {
    id: 'lifecycle',
    number: '06',
    title: 'Lifecycle',
    category: 'Post-Install Continuity',
    customerQuote: 'The operating process needs to continue beyond installation.',
    customerNeed: 'EV charger operations extend far beyond initial installation: site hosts require ongoing preventative maintenance, follow-up inspections, and field service visits across ongoing lifecycle activity.',
    platformCapability: 'Ongoing maintenance / lifecycle activity tracking preserving project records and supporting follow-up service visits.',
    verifiedCapabilityTag: 'Ongoing maintenance / lifecycle activity',
    solutionDecision: 'Transition completed installation projects directly into permanent records within the same platform, ensuring historical survey photos and project notes remain immediately accessible for ongoing maintenance.',
    relevantStages: ['platform-update', 'maintenance-lifecycle'],
    relevantPersonas: ['operations', 'field', 'management']
  }
];

const PERSONA_DETAILS: Record<string, { title: string; roleSubtitle: string; icon: React.ElementType; focus: string; description: string }> = {
  all: {
    title: 'All Stakeholders',
    roleSubtitle: 'Full Pre-Sales Scope',
    icon: Users,
    focus: 'Cross-functional alignment',
    description: 'Viewing the holistic pre-sales solution across submitters, operations coordinators, field installers, and program leadership.'
  },
  submitter: {
    title: 'Site Submitter / Partner',
    roleSubtitle: 'Property Partner / Location Host',
    icon: MapPin,
    focus: 'Site intake & self-survey',
    description: 'Needs a lightweight, accessible web or QR-based entry point to submit candidate sites without training or platform logins.'
  },
  operations: {
    title: 'Operations Team',
    roleSubtitle: 'Operational Review / Coordination',
    icon: FolderKanban,
    focus: 'Operational review & coordination',
    description: 'Highlights operational review, assignment/coordination, project updates, workflow progress, and central visibility.'
  },
  field: {
    title: 'Field Team / Installer',
    roleSubtitle: 'Surveyor / Installer',
    icon: Wrench,
    focus: 'Field activity & offline capability',
    description: "Highlights survey, installation, and maintenance work using relevant project information, forms, photos, notes, and updates, including the platform's offline field capability."
  },
  management: {
    title: 'Program Team / Management',
    roleSubtitle: 'Program Lead / Operational Leadership',
    icon: Building2,
    focus: 'Milestone visibility & lifecycle',
    description: 'Highlights visibility into distributed project activity, workflow progress, milestones, and ongoing lifecycle activity.'
  }
};

export const SolutionDesignLabDemo: React.FC = () => {
  const [selectedReqId, setSelectedReqId] = useState<string>('site-intake');
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('all');
  const [inspectedStageId, setInspectedStageId] = useState<string | null>(null);

  const activeRequirement = REQUIREMENTS.find(r => r.id === selectedReqId) || REQUIREMENTS[0];
  const activePersonaMeta = PERSONA_DETAILS[selectedPersona];

  // Requirements filtered or highlighted by persona
  const filteredRequirements = REQUIREMENTS.filter(req => {
    if (selectedPersona === 'all') return true;
    return req.relevantPersonas.includes(selectedPersona as any);
  });

  return (
    <div className="space-y-8">
      
      {/* 1. SCENARIO CONTEXT HEADER */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
              FICTIONAL SCENARIO BASED ON AN ANONYMIZED PRE-SALES ENGAGEMENT
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
              Customer Challenge: Coordinating Distributed EV Charger Deployments
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech font-bold bg-slate-100 text-slate-700 border border-slate-200 shrink-0 self-start sm:self-auto">
            Interactive Solution Workbench
          </span>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-4xl">
          An EV infrastructure company needs a more connected way to coordinate distributed charger-site activity from initial site submissions through field work, installation, and ongoing lifecycle activity. Rather than proposing a massive custom software build, a Solutions Engineer identifies existing platform capabilities and designs how they integrate into a unified operating workflow.
        </p>

        {/* Operational Needs Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="font-mono-tech text-slate-400 font-bold uppercase text-[10px] mr-1">Operational Needs:</span>
          {[
            'Lightweight site intake',
            'Remote information collection',
            'Operational review',
            'Distributed field activity',
            'Installation workflow',
            'Central visibility',
            'Ongoing maintenance / lifecycle activity'
          ].map((need, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-medium">
              {need}
            </span>
          ))}
        </div>

        {/* Standardized Portfolio Disclosure */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Portfolio Reconstruction — Fictional scenario based on an anonymized pre-sales engagement. The underlying platform capabilities existed; my role was translating customer requirements into a proposed operating workflow.
          </p>
        </div>
      </div>

      {/* 2. PERSONA LENS SECONDARY CONTROL */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-[#ea580c]" />
          <div>
            <span className="font-mono-tech text-[10px] text-slate-500 uppercase tracking-widest font-bold block">
              SECONDARY CONTROL
            </span>
            <span className="text-xs font-bold text-slate-900">
              View Solution Through Persona Lens:
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Personas' },
            { id: 'submitter', label: 'Site Submitter' },
            { id: 'operations', label: 'Operations Team' },
            { id: 'field', label: 'Field Team' },
            { id: 'management', label: 'Program Team' }
          ].map((p) => {
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPersona(p.id as PersonaId);
                  // If current requirement is not in this persona, select the first matching one
                  if (p.id !== 'all') {
                    const firstMatch = REQUIREMENTS.find(r => r.relevantPersonas.includes(p.id as any));
                    if (firstMatch && !activeRequirement.relevantPersonas.includes(p.id as any)) {
                      setSelectedReqId(firstMatch.id);
                    }
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE SOLUTION WORKBENCH (3-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: CUSTOMER REQUIREMENTS (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                STEP 1 & 2 • DISCOVERY
              </span>
              <h4 className="font-display text-base font-bold text-slate-950">
                Customer Requirements
              </h4>
            </div>
            <span className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
              {filteredRequirements.length} of 6 Needs
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Select an operational requirement to observe how it maps to an existing capability and illuminates the proposed flow.
          </p>

          <div className="space-y-2.5">
            {REQUIREMENTS.map((req) => {
              const isSelected = req.id === activeRequirement.id;
              const matchesPersona = selectedPersona === 'all' || req.relevantPersonas.includes(selectedPersona as any);

              return (
                <button
                  key={req.id}
                  onClick={() => {
                    setSelectedReqId(req.id);
                    setInspectedStageId(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs space-y-2 relative ${
                    isSelected
                      ? 'bg-white border-[#ea580c] shadow-sm ring-1 ring-[#ea580c]/20'
                      : matchesPersona
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      : 'bg-slate-50/60 border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono-tech text-[10px] font-bold ${
                        isSelected ? 'bg-[#ea580c] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {req.number}
                      </span>
                      <strong className={`font-bold ${isSelected ? 'text-[#ea580c]' : 'text-slate-900'}`}>
                        {req.title}
                      </strong>
                    </div>
                    <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-tight">
                      {req.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 italic border-l-2 border-slate-200 pl-2 leading-relaxed">
                    &ldquo;{req.customerQuote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono-tech">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Mapped to Capability
                    </span>
                    <span className="text-slate-400">
                      {req.relevantStages.length} flow stages
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: PROPOSED OPERATIONAL FLOW (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#ea580c] font-bold block">
                PROPOSED OPERATIONAL FLOW
              </span>
              <h4 className="font-display text-base font-bold text-slate-950">
                Solution Blueprint
              </h4>
            </div>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-orange-100 text-orange-900 font-semibold">
              Live Stage Illumination
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Stages activated by <strong className="text-slate-800">{activeRequirement.title}</strong> are highlighted below.
          </p>

          <div className="space-y-2 relative">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const isActivatedByReq = activeRequirement.relevantStages.includes(stage.id);
              const isInspected = inspectedStageId === stage.id;
              
              // Check if relevant to persona
              const stageReqs = REQUIREMENTS.filter(r => r.relevantStages.includes(stage.id));
              const isRelevantToPersona = selectedPersona === 'all' || stageReqs.some(r => r.relevantPersonas.includes(selectedPersona as any));

              return (
                <div
                  key={stage.id}
                  onClick={() => setInspectedStageId(isInspected ? null : stage.id)}
                  className={`p-3 rounded-2xl border transition-all text-xs space-y-1.5 cursor-pointer ${
                    isInspected
                      ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-200 shadow-xs'
                      : isActivatedByReq
                      ? 'bg-white border-[#ea580c] shadow-xs'
                      : isRelevantToPersona
                      ? 'bg-white border-slate-200/90 hover:border-slate-300'
                      : 'bg-slate-50/60 border-slate-200/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full font-mono-tech text-[10px] font-bold flex items-center justify-center ${
                        isActivatedByReq
                          ? 'bg-[#ea580c] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {stage.number}
                      </span>
                      <strong className={`text-xs font-bold ${isActivatedByReq ? 'text-slate-950' : 'text-slate-800'}`}>
                        {stage.title}
                      </strong>
                    </div>

                    {isActivatedByReq ? (
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-orange-100 text-orange-900 font-bold">
                        ACTIVATED
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {stage.zone}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    {stage.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-400 pt-0.5">
                    <span>Actor: {stage.primaryActor}</span>
                    {stageReqs.length > 0 && (
                      <span className="text-slate-500">{stageReqs.length} reqs linked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CAPABILITY MAPPING & SOLUTION DECISION (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-0.5">
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-700 font-bold block">
              STEP 3 & 4 • PRE-SALES MAPPING
            </span>
            <h4 className="font-display text-base font-bold text-slate-950">
              Capability & Solution Decision
            </h4>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The core SE tradecraft: connecting customer friction to existing platform features and designing the workflow fit.
          </p>

          {/* Card: Customer Need */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="font-mono-tech uppercase text-[10px] font-bold text-slate-500">
                1. Customer Need
              </span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed">
              {activeRequirement.customerNeed}
            </p>
          </div>

          {/* Card: Existing Platform Capability */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono-tech uppercase text-[10px] font-bold text-emerald-800">
                  2. What Already Existed
                </span>
              </div>
              <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                Platform Capability
              </span>
            </div>
            <strong className="block text-slate-950 font-bold leading-snug">
              {activeRequirement.verifiedCapabilityTag}
            </strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeRequirement.platformCapability}
            </p>
          </div>

          {/* Card: How I Would Use It (Solution Decision) */}
          <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/90 shadow-2xs space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                <span className="font-mono-tech uppercase text-[10px] font-bold text-orange-950">
                  3. Solution Decision
                </span>
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#ea580c] text-white font-bold">
                SE Workflow Design
              </span>
            </div>

            <p className="text-slate-900 font-medium leading-relaxed">
              {activeRequirement.solutionDecision}
            </p>

            <div className="pt-2 border-t border-orange-200/60 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Why this matters:</span>
              <p className="leading-relaxed">
                Solutions Engineering is not promising to build custom software for every friction point. It is identifying existing product capabilities and articulating how they fulfill the client&apos;s operational workflow.
              </p>
            </div>
          </div>

          {/* Persona Lens Context Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-orange-400 font-bold">
                PERSONA PERSPECTIVE: {activePersonaMeta.title}
              </span>
              <activePersonaMeta.icon className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activePersonaMeta.description}
            </p>
          </div>

        </div>

      </div>

      {/* 4. FINAL VIEW: SOLUTION SUMMARY (What the Solutions Engineer Contributes) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
              SOLUTION DESIGN LAB • ENGAGEMENT RECAP
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Pre-Sales Solution Summary
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-slate-400">
            Pre-Sales Discovery → Capability Mapping
          </span>
        </div>

        {/* 3 Metric Summary Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wide block">
              Customer Needs Identified
            </span>
            <span className="font-display text-2xl font-bold text-white">6</span>
            <p className="text-[11px] text-slate-400">
              Extracted from technical discovery interviews
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wide block">
              Platform Capabilities Mapped
            </span>
            <span className="font-display text-2xl font-bold text-emerald-400">6</span>
            <p className="text-[11px] text-slate-400">
              Directly supported by existing platform features
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wide block">
              Proposed Workflow
            </span>
            <span className="font-mono-tech text-xs font-bold text-orange-400 block pt-1">
              Intake → Review → Field Activity → Install → Central Visibility → Lifecycle
            </span>
            <p className="text-[11px] text-slate-400">
              8 unified deployment stages
            </p>
          </div>
        </div>

        {/* What the Solutions Engineer Contributes */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block">
            WHAT THE SOLUTIONS ENGINEER CONTRIBUTES:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { title: 'Discovery', desc: 'Uncovering operational friction' },
              { title: 'Requirements Translation', desc: 'Framing needs into tech specs' },
              { title: 'Capability Mapping', desc: 'Reusing existing platform features' },
              { title: 'Workflow Design', desc: 'End-to-end lifecycle flow' },
              { title: 'Persona Thinking', desc: 'Role boundaries & permissions' },
              { title: 'Technical Storytelling', desc: 'Coherent customer solution' }
            ].map((contrib, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <strong className="font-bold text-white leading-tight">{contrib.title}</strong>
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {contrib.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Educational Note */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white font-semibold">The Takeaway:</strong> Good solutioning starts by understanding the customer&apos;s operating problem, identifying what the platform already supports, and designing the simplest viable path through the gaps.
          </p>
        </div>
      </div>

    </div>
  );
};
