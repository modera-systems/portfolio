import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Wrench, 
  ArrowRight, 
  Users, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Smartphone, 
  WifiOff, 
  Building2, 
  FolderKanban, 
  RefreshCw, 
  HelpCircle,
  Clock,
  UserCheck,
  Check,
  Send,
  Sparkles,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

type PersonaId = 'submitter' | 'operations' | 'field' | 'management';

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  zone: 'Entry' | 'Operations' | 'Field' | 'Central' | 'Lifecycle';
  description: string;
  primaryActor: string;
  keyArtifact: string;
  relevantPersonas: PersonaId[];
  operationalRole: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'recommend-site',
    stepNumber: '01',
    title: 'Recommend Site',
    subtitle: 'Submission Entry Point',
    zone: 'Entry',
    description: 'Potential charger location enters the workflow through a simple submission experience such as a web-based entry point or lightweight form.',
    primaryActor: 'Site Submitter / Partner',
    keyArtifact: 'Site Submission',
    relevantPersonas: ['submitter'],
    operationalRole: 'Captures initial site recommendation for operational review.'
  },
  {
    id: 'collect-info',
    stepNumber: '02',
    title: 'Collect Site Information',
    subtitle: 'Intake / Self-Survey',
    zone: 'Entry',
    description: 'Remote or self-service intake gathers customer and site details needed for initial review via web form or QR-based entry.',
    primaryActor: 'Site Submitter',
    keyArtifact: 'Intake / Survey Information',
    relevantPersonas: ['submitter', 'operations'],
    operationalRole: 'Gathers initial site information remotely before downstream field activity is scheduled.'
  },
  {
    id: 'qualify-review',
    stepNumber: '03',
    title: 'Qualify & Review',
    subtitle: 'Operational Review',
    zone: 'Operations',
    description: 'Submitted information moves into operational review to evaluate readiness before downstream field activity.',
    primaryActor: 'Operations Team',
    keyArtifact: 'Review Status & Notes',
    relevantPersonas: ['operations', 'management'],
    operationalRole: 'Reviews incoming site submissions and coordinates next steps.'
  },
  {
    id: 'field-survey',
    stepNumber: '04',
    title: 'Field Survey',
    subtitle: 'On-Site Evaluation',
    zone: 'Field',
    description: 'Field teams use the platform\'s field capability to review the location, complete survey forms, capture photos, and record notes with offline synchronization.',
    primaryActor: 'Field Team / Surveyor',
    keyArtifact: 'Survey Information & Photos',
    relevantPersonas: ['field'],
    operationalRole: 'Captures on-site survey information, forms, and photos even when mobile connectivity is unavailable.'
  },
  {
    id: 'installation-workflow',
    stepNumber: '05',
    title: 'Installation Workflow',
    subtitle: 'Planning & Assignment',
    zone: 'Operations',
    description: 'Approved work progresses into installation planning and assignment, ensuring installers have access to relevant project information with customizable permissions.',
    primaryActor: 'Operations Team',
    keyArtifact: 'Installation Information & Assignment',
    relevantPersonas: ['operations', 'field'],
    operationalRole: 'Coordinates installation planning and assigns work to field installers.'
  },
  {
    id: 'field-execution',
    stepNumber: '06',
    title: 'Field Execution',
    subtitle: 'Installation Activity',
    zone: 'Field',
    description: 'Assigned field users perform installation activity and record relevant project updates, photos, and notes through the field experience.',
    primaryActor: 'Field Team / Installer',
    keyArtifact: 'Installation Updates & Photos',
    relevantPersonas: ['field'],
    operationalRole: 'Enables field installers to access project details and submit status updates directly from the job site.'
  },
  {
    id: 'platform-update',
    stepNumber: '07',
    title: 'Central Platform Update',
    subtitle: 'Operational Visibility',
    zone: 'Central',
    description: 'Field activity and updates are reflected back in the central operating workflow, supporting visibility into project progress and milestones.',
    primaryActor: 'Field Operations Platform',
    keyArtifact: 'Project Update & Status',
    relevantPersonas: ['operations', 'management'],
    operationalRole: 'Maintains visibility into project status and progress as distributed work occurs.'
  },
  {
    id: 'maintenance-lifecycle',
    stepNumber: '08',
    title: 'Ongoing Maintenance / Lifecycle',
    subtitle: 'Follow-Up & Maintenance',
    zone: 'Lifecycle',
    description: 'The platform supports continued maintenance and lifecycle activity after installation, maintaining continuity across follow-up work.',
    primaryActor: 'Operations & Field Teams',
    keyArtifact: 'Maintenance Activity & Notes',
    relevantPersonas: ['field', 'operations', 'management'],
    operationalRole: 'Supports ongoing maintenance records and follow-up activities across the asset lifecycle.'
  }
];

interface PersonaMeta {
  id: PersonaId;
  title: string;
  roleSubtitle: string;
  badgeColor: string;
  icon: React.ElementType;
  focus: string[];
  need: string;
  touchpoints: string;
  toolsUsed: string;
  handoffRole: string;
}

const PERSONAS: PersonaMeta[] = [
  {
    id: 'submitter',
    title: 'Site Submitter / Partner',
    roleSubtitle: 'Customer / Property Partner / Submitter',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    icon: MapPin,
    focus: ['Site recommendation', 'Intake / self-survey'],
    need: 'Needs a simple, lightweight way to recommend candidate charger locations and submit initial site information.',
    touchpoints: 'Steps 01 & 02 (Recommend Site, Collect Site Information)',
    toolsUsed: 'Web-based entry point or lightweight form for site recommendation and self-survey.',
    handoffRole: 'Submits initial location details and intake information to the operations review queue.'
  },
  {
    id: 'operations',
    title: 'Operations Team',
    roleSubtitle: 'Operational Review / Dispatcher / Coordinator',
    badgeColor: 'bg-orange-50 text-[#ea580c] border-orange-200',
    icon: FolderKanban,
    focus: ['Review', 'Project visibility', 'Assignment / coordination', 'Workflow progress'],
    need: 'Needs centralized visibility into submitted sites, review progress, work assignment, and field updates.',
    touchpoints: 'Steps 02, 03, 05, 07, 08 (Intake Review, Qualify & Review, Assignment, Central Updates, Lifecycle)',
    toolsUsed: 'Central operating platform, review workflows, work assignment, and customizable permissions.',
    handoffRole: 'Reviews incoming site submissions, coordinates field work, and tracks project progress.'
  },
  {
    id: 'field',
    title: 'Field Team / Installer',
    roleSubtitle: 'Surveyor / Installer / Field Technician',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Wrench,
    focus: ['Survey', 'Installation', 'Maintenance', 'Project info & forms', 'Photos, notes & updates', 'Offline capability'],
    need: 'Needs access to relevant project information, forms, photos, notes, and updates, with offline capability on-site.',
    touchpoints: 'Steps 04, 05, 06, 08 (Field Survey, Installation Workflow, Field Execution, Maintenance)',
    toolsUsed: 'Field tooling with forms, photo capture, notes, status updates, and offline synchronization.',
    handoffRole: 'Performs survey and installation activities and submits field updates back to the central platform.'
  },
  {
    id: 'management',
    title: 'Program Team / Management',
    roleSubtitle: 'Program Lead / Operational Leadership',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    icon: Building2,
    focus: ['Visibility across distributed work', 'Project progress', 'Milestones', 'Lifecycle activity'],
    need: 'Needs visibility into project status, milestones, and ongoing lifecycle activity across distributed locations.',
    touchpoints: 'Steps 03, 07, 08 (Review Oversight, Central Platform Visibility, Lifecycle Tracking)',
    toolsUsed: 'Workflow tracking, milestone status views, and ongoing lifecycle visibility.',
    handoffRole: 'Monitors overall project progression, milestone completion, and ongoing operating activity.'
  }
];

export const CaseStudyOneInteractiveSection: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('field');
  const [selectedStepId, setSelectedStepId] = useState<string>('field-survey');

  const activePersonaMeta = PERSONAS.find(p => p.id === selectedPersona)!;
  const activeStep = WORKFLOW_STEPS.find(s => s.id === selectedStepId) || WORKFLOW_STEPS[3];

  return (
    <div className="space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. BLUEPRINT HEADER & CONCEPTUAL NOTICE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                SOLUTION BLUEPRINT • PROPOSED OPERATIONAL FLOW
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mt-1">
              End-to-End Distributed Deployment Lifecycle
            </h3>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Conceptual Pre-Sales Blueprint
          </span>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
          This solution blueprint connects site intake through central operations review, field activity, installation, central platform visibility, and ongoing lifecycle activity. It represents the proposed operational flow presented to the prospective customer to demonstrate how their distributed field workflow could connect through the platform.
        </p>

        {/* 5 Functional Zones Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[11px] font-mono-tech">
          <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-blue-900">
            <span className="block text-[9px] uppercase font-bold opacity-70">Zone 1</span>
            <span className="font-semibold">Site Intake</span>
          </div>
          <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/60 text-orange-950">
            <span className="block text-[9px] uppercase font-bold opacity-70">Zone 2</span>
            <span className="font-semibold">Review / Qualification</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-950">
            <span className="block text-[9px] uppercase font-bold opacity-70">Zone 3</span>
            <span className="font-semibold">Field Activity</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/60 text-purple-950">
            <span className="block text-[9px] uppercase font-bold opacity-70">Zone 4</span>
            <span className="font-semibold">Central Visibility</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 col-span-2 sm:col-span-1">
            <span className="block text-[9px] uppercase font-bold opacity-70">Zone 5</span>
            <span className="font-semibold">Ongoing Lifecycle</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EXPLORE THE SOLUTION — INTERACTIVE PERSONA EXPLORER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white shadow-md space-y-6">
        
        {/* Explorer Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                EXPLORE THE SOLUTION
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold text-white">
              Persona Workflow Filter
            </h4>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md">
            <span className="italic text-slate-200 block font-serif-editorial text-sm">
              &quot;The same operating workflow looks different depending on who&apos;s interacting with it.&quot;
            </span>
            <span className="text-[10px] font-mono-tech text-slate-400 mt-1 block">
              Select a persona to highlight their active touchpoints across the deployment blueprint.
            </span>
          </div>
        </div>

        {/* Persona Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PERSONAS.map(p => {
            const Icon = p.icon;
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={`p-3.5 rounded-2xl text-left transition-all flex flex-col gap-2 ${
                  isSelected 
                    ? 'bg-white text-slate-950 shadow-lg ring-2 ring-[#ea580c]' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-orange-100 text-[#ea580c]' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono-tech font-bold text-[#ea580c] px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200">
                      Active Filter
                    </span>
                  )}
                </div>

                <div>
                  <strong className="block text-xs sm:text-sm font-bold leading-tight">
                    {p.title}
                  </strong>
                  <span className={`text-[10px] leading-tight block mt-0.5 ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>
                    {p.roleSubtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Deep-Dive Card */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <activePersonaMeta.icon className="w-4 h-4 text-[#ea580c]" />
              <strong className="text-white text-sm">
                Perspective: {activePersonaMeta.title}
              </strong>
            </div>
            <span className="text-[11px] font-mono-tech text-slate-400">
              Active Touchpoints: <span className="text-[#ea580c] font-semibold">{activePersonaMeta.touchpoints}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
            <div className="space-y-1">
              <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">
                CORE OPERATIONAL NEED
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activePersonaMeta.need}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">
                TOOLS & INTERFACES USED
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activePersonaMeta.toolsUsed}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold block">
                HAND-OFF ROLE IN WORKFLOW
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activePersonaMeta.handoffRole}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. VISUAL WORKFLOW BLUEPRINT (HIGHLIGHTED BY PERSONA) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-display text-lg font-bold text-slate-950">
              Proposed Operational Progression (8 Stages)
            </h4>
            <span className="text-xs text-slate-500">
              Steps highlighted in orange are directly touched by <strong className="text-slate-900">{activePersonaMeta.title}</strong>. Click any stage to inspect detailed inputs and outputs.
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
            <span className="text-slate-600">Active Touchpoint</span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 ml-2"></span>
            <span className="text-slate-400">Other Stakeholders</span>
          </div>
        </div>

        {/* 8-Step Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isRelevant = step.relevantPersonas.includes(selectedPersona);
            const isSelected = selectedStepId === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepId(step.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 text-xs ${
                  isSelected
                    ? 'bg-orange-50/60 border-2 border-[#ea580c] shadow-sm'
                    : isRelevant
                    ? 'bg-white border-slate-300 hover:border-slate-400 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Step Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono-tech text-[11px] font-bold ${
                      isRelevant
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step.stepNumber}
                    </span>

                    <span className={`text-[9px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded-full ${
                      step.zone === 'Entry' ? 'bg-blue-100 text-blue-800' :
                      step.zone === 'Operations' ? 'bg-orange-100 text-[#ea580c]' :
                      step.zone === 'Field' ? 'bg-emerald-100 text-emerald-800' :
                      step.zone === 'Central' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {step.zone}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 text-sm leading-tight">
                      {step.title}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer Details */}
                <div className="pt-2 border-t border-slate-200/70 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono-tech">Actor:</span>
                    <strong className="text-slate-700 truncate max-w-[140px]">{step.primaryActor}</strong>
                  </div>
                  {isRelevant && (
                    <div className="flex items-center gap-1 text-[#ea580c] font-semibold pt-0.5">
                      <Check className="w-3 h-3 shrink-0" />
                      <span>Touched by {activePersonaMeta.title}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SELECTED STAGE INSPECTION DRAWER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-mono-tech text-sm font-bold shrink-0">
              {activeStep.stepNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400">
                  STAGE SPECIFICATION
                </span>
                <span className="text-[10px] font-mono-tech uppercase px-2 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                  Zone: {activeStep.zone}
                </span>
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                {activeStep.title} — {activeStep.subtitle}
              </h4>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono-tech">
            Click any of the 8 stages above to inspect
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
              OPERATIONAL PURPOSE
            </span>
            <p className="text-slate-700 text-xs leading-relaxed">
              {activeStep.operationalRole}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
              KEY PROJECT INFORMATION
            </span>
            <div className="flex items-center gap-2 text-slate-900 font-medium text-xs">
              <FileText className="w-4 h-4 text-[#ea580c] shrink-0" />
              <span>{activeStep.keyArtifact}</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Project information, forms, photos, or updates associated with this stage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
              STAKEHOLDERS INVOLVED
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {activeStep.relevantPersonas.map(pId => {
                const p = PERSONAS.find(x => x.id === pId);
                return (
                  <span
                    key={pId}
                    className="px-2.5 py-1 rounded-full bg-white text-slate-800 border border-slate-200 text-[11px] font-semibold"
                  >
                    {p?.title}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FOUR CRITICAL HANDOFF POINTS IN THE DISTRIBUTED WORKFLOW */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500 font-bold">
            CROSS-ORGANIZATIONAL COORDINATION
          </span>
          <h4 className="font-display text-lg font-bold text-slate-950">
            Four Critical Operational Handoffs
          </h4>
          <p className="text-slate-600 text-xs sm:text-sm">
            How work moves between people involved in intake, review, field execution, and ongoing maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950">1. Site Intake → Operations Review</span>
              <span className="text-[10px] font-mono-tech text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                Intake Review
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Potential charger locations submitted through the intake experience move into the operational review queue, enabling coordinators to review project details before scheduling downstream field work.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950">2. Operations Review → Field Work</span>
              <span className="text-[10px] font-mono-tech text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 font-semibold">
                Field Assignment
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Reviewed and qualified projects move into field scheduling and assignment, ensuring field teams receive relevant project information, forms, and notes with appropriate permissions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950">3. Field Activity → Central Platform Visibility</span>
              <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Status Synchronization
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              On-site survey and installation updates, photos, and notes synchronize back to the central platform, providing visibility into project milestones and progress even after working offline.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950">4. Installation → Ongoing Lifecycle Activity</span>
              <span className="text-[10px] font-mono-tech text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                Lifecycle Continuity
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Following installation completion, the project record remains available to support ongoing maintenance and follow-up activities across the asset lifecycle.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
