import React, { useState } from 'react';
import { PageId, CaseStudyCategory } from '../types';
import { caseStudiesData } from '../data/caseStudies';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  MapPin, 
  Zap, 
  FileCheck, 
  Workflow, 
  Database, 
  ShieldCheck, 
  Compass, 
  FolderKanban, 
  Search,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CaseStudiesViewProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Pre-Sales Solutioning / Solutions Engineering',
    'Integrations / Automation',
    'Customer Experience / Integration / Prototype',
    'End-to-End Solution Design'
  ];

  const filteredStudies = selectedCategory === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(cs => cs.category === selectedCategory);

  const voltpost = caseStudiesData.find(c => c.id === '01-field-service-workflow') || caseStudiesData.find(c => c.id === '01-voltpost-solution-design')!;
  const quickbooks = caseStudiesData.find(c => c.id === '02-quickbooks-automation')!;
  const portal = caseStudiesData.find(c => c.id === '03-connected-customer-portal')!;
  const modera = caseStudiesData.find(c => c.id === '04-modera-kind-companion')!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Page Header: Editorial & Clarifying */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            CASE STUDIES • REAL WORKFLOWS & PROPOSED DESIGNS
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          How I solve real <br />
          <span className="relative inline-block text-slate-950">
            operational & technical problems.
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          These projects showcase how I translate customer operational friction into technical architectures, production integrations, customer-facing prototypes, and end-to-end digital systems.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY 01: VOLTPOST (FLAGSHIP EDITORIAL FEATURE AREA) */}
      {/* ========================================================================= */}
      {(selectedCategory === 'All' || selectedCategory === voltpost.category) && (
        <div 
          onClick={() => onNavigate('case-study-detail', voltpost.id)}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-6 sm:p-10 space-y-8"
        >
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-serif-editorial text-4xl sm:text-5xl text-[#ea580c] font-bold leading-none">
                  01
                </span>
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
                    {voltpost.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-[#ea580c] transition-colors">
                    {voltpost.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                {voltpost.role}
              </span>
              <div className="w-9 h-9 rounded-full bg-slate-950 text-white group-hover:bg-[#ea580c] flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Three-Part Answer Grid: What was the problem? What did Monique do? What skills does this prove? */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT WAS THE PROBLEM?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Deploying distributed EV chargers involved coordination friction across site intake, surveys, contractor assignments, and tracking without a unified workflow.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#ea580c] font-bold block">
                WHAT DID MONIQUE DO?
              </span>
              <p className="text-slate-800 leading-relaxed">
                Led pre-sales technical discovery and designed an operational deployment workflow mapping distributed field requirements onto an existing Field Operations Platform.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT TECHNICAL SKILLS DOES THIS PROVE?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Technical pre-sales discovery, operational lifecycle mapping, persona workflow design, requirements translation, and platform capability alignment.
              </p>
            </div>

          </div>

          {/* Annotated Visual Workflow Representation */}
          <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  PROPOSED OPERATIONAL WORKFLOW BLUEPRINT
                </span>
                <h4 className="font-display text-lg font-bold text-white">
                  Distributed EV Deployment Lifecycle on Field Operations Platform
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-tech bg-slate-800 text-slate-300 border border-slate-700">
                Pre-Sales Discovery & Solution Architecture
              </span>
            </div>

            {/* Step Interactive Horizontal / Wrapped Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-xs">
              {[
                { step: '01', title: 'Recommend Site', desc: 'Location intake' },
                { step: '02', title: 'Site Info', desc: 'Self-survey photos' },
                { step: '03', title: 'Qualify', desc: 'Feasibility review' },
                { step: '04', title: 'Field Survey', desc: 'Mobile on-site audit' },
                { step: '05', title: 'Install Scope', desc: 'Contractor dispatch' },
                { step: '06', title: 'Field Execution', desc: 'Hardware mounting' },
                { step: '07', title: 'Platform Sync', desc: 'Live status sync' },
                { step: '08', title: 'Maintenance', desc: 'Ongoing lifecycle' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] text-[#ea580c] font-bold">{item.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <strong className="text-white text-[11px] block leading-tight truncate">{item.title}</strong>
                  <span className="text-[10px] text-slate-400 block leading-tight truncate">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Crucial distinction note */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span><strong>Design Scope Note:</strong> Clearly distinguishes what Monique proposed (operational workflow stages, persona lanes, qualification criteria) versus core platform primitives.</span>
              <span className="text-[#ea580c] font-semibold flex items-center gap-1 shrink-0 ml-3">
                Read Detailed Case Study →
              </span>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY 02: QUICKBOOKS AUTOMATION (NODE-BASED WORKFLOW VISUALIZATION) */}
      {/* ========================================================================= */}
      {(selectedCategory === 'All' || selectedCategory === quickbooks.category) && (
        <div 
          onClick={() => onNavigate('case-study-detail', quickbooks.id)}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-6 sm:p-10 space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-slate-300 font-bold leading-none">
                02
              </span>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
                  {quickbooks.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-[#ea580c] transition-colors">
                  {quickbooks.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                {quickbooks.role}
              </span>
              <div className="w-9 h-9 rounded-full bg-slate-950 text-white group-hover:bg-[#ea580c] flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Three-Part Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT WAS THE PROBLEM?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Project and customer data from the Field Operations Platform had to be manually re-entered into QuickBooks, creating repetitive admin work and risks of duplicate customer records.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#ea580c] font-bold block">
                WHAT DID MONIQUE DO?
              </span>
              <p className="text-slate-800 leading-relaxed">
                Engineered an n8n integration triggered on project status, normalizing schemas, matching customers deterministically by email, branching for new accounts, creating invoices, and returning outcomes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT TECHNICAL SKILLS DOES THIS PROVE?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Workflow Automation, REST API Integration, Webhooks, OAuth, JSON / Data Transformation, Conditional Logic, System Integration, n8n, QuickBooks Integration, and End-to-End Testing.
              </p>
            </div>
          </div>

          {/* Visual Node-Based Workflow Representation */}
          <div className="p-6 rounded-2xl bg-[#fafbfc] border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                INTEGRATION PIPELINE TOPOLOGY
              </span>
              <span className="text-emerald-700 font-mono-tech text-[11px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Status-Triggered & OAuth Connected
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 text-white text-xs">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Field Ops Status Webhook</span>
              </div>

              <span className="text-slate-400 font-mono-tech text-xs">→</span>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-orange-100 text-orange-950 text-xs font-semibold border border-orange-200">
                <Layers className="w-4 h-4 text-[#ea580c]" />
                <span>Transform Data</span>
              </div>

              <span className="text-slate-400 font-mono-tech text-xs">→</span>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Search QBO by Email</span>
              </div>

              <span className="text-slate-400 font-mono-tech text-xs">→</span>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
                <span>Branch: Customer Exists?</span>
              </div>

              <span className="text-slate-400 font-mono-tech text-xs">→</span>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-xs">
                <Database className="w-4 h-4 text-white" />
                <span>Create Invoice & Return Result</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY 03: CONNECTED CUSTOMER PORTAL (PORTAL UI + WORKFLOW CONNECTION) */}
      {/* ========================================================================= */}
      {(selectedCategory === 'All' || selectedCategory === portal.category) && (
        <div 
          onClick={() => onNavigate('case-study-detail', portal.id)}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-6 sm:p-10 space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-slate-300 font-bold leading-none">
                03
              </span>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
                  {portal.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-[#ea580c] transition-colors">
                  {portal.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                {portal.role}
              </span>
              <div className="w-9 h-9 rounded-full bg-slate-950 text-white group-hover:bg-[#ea580c] flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Three-Part Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT WAS THE PROBLEM?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Customers needed a clearer way to access project information and communicate around active projects without relying on disconnected manual communication.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#ea580c] font-bold block">
                WHAT DID MONIQUE DO?
              </span>
              <p className="text-slate-800 leading-relaxed">
                Designed & built a full-stack prototype (React/Express/Socket.IO) combining project-data self-service with human-support routing to installers, reflecting all exchanges to project notes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT TECHNICAL SKILLS DOES THIS PROVE?
              </span>
              <p className="text-slate-700 leading-relaxed">
                Human-in-the-loop workflow design, dual-path message routing, project activity logging, REST queries via n8n, token access, and bilingual UX.
              </p>
            </div>
          </div>

          {/* Split Visual: Customer UI + Backend Webhook Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-xs">Customer Self-Service + Human Support</span>
                <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  Bilingual • Real-Time
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Path A (Project Data):</span>
                  <span className="font-bold text-slate-900">Grounded Status & Schedule Retrieval</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Path B (Human Support):</span>
                  <span className="font-bold text-slate-900">Escalated to Installer / Office Team</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Project History:</span>
                  <span className="font-mono-tech text-emerald-600 font-semibold">Reflected in Internal Activity Notes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 shadow-2xs space-y-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
                DUAL-PATH COMMUNICATION ARCHITECTURE
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automation handles grounded project information retrieval while humans handle judgment, approvals, and rescheduling. Messages from the customer experience are reflected directly into the project&apos;s operational activity record.
              </p>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono-tech text-emerald-400">
                ✓ Project Data Lookup ↔ Human Support Routing ↔ Operational Project History
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDY 04: MODERA × THE KIND COMPANION (CONSULTING TO CLIENT SYSTEM) */}
      {/* ========================================================================= */}
      {(selectedCategory === 'All' || selectedCategory === modera.category) && (
        <div 
          onClick={() => onNavigate('case-study-detail', modera.id)}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-6 sm:p-10 space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-slate-300 font-bold leading-none">
                04
              </span>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
                  {modera.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-[#ea580c] transition-colors">
                  {modera.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                {modera.role}
              </span>
              <div className="w-9 h-9 rounded-full bg-slate-950 text-white group-hover:bg-[#ea580c] flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Three-Part Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT WAS THE PROBLEM?
              </span>
              <p className="text-slate-700 leading-relaxed">
                A local pet care practice was overwhelmed by manual paper forms, text message booking requests, and zero real-time operational revenue clarity.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#ea580c] font-bold block">
                WHAT DID MONIQUE DO?
              </span>
              <p className="text-slate-800 leading-relaxed">
                Designed and delivered a connected digital operating system spanning public intake, booking triage, caregiver dispatch, and owner analytics.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-slate-500 font-bold block">
                WHAT TECHNICAL SKILLS DOES THIS PROVE?
              </span>
              <p className="text-slate-700 leading-relaxed">
                End-to-end system design, SMB operational discovery, consulting framework execution, and realistic state-driven UI prototyping.
              </p>
            </div>
          </div>

          {/* Split View: Modera Control Center (Consulting) vs Kind Companion (Client OS) */}
          <div className="p-6 rounded-2xl bg-[#fafafa] border border-slate-200/80 space-y-4">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-slate-500 font-bold block">
              DUAL-SYSTEM ARCHITECTURE & LIFECYCLE MAPPING
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                    Modera Control Center
                  </strong>
                  <span className="text-[9px] font-mono-tech text-slate-400">Consulting Lifecycle</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Discovery → Opportunity → Stage Requirements → Client 360 → Environment Configuration → Implementation Hand-Off.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    The Kind Companion
                  </strong>
                  <span className="text-[9px] font-mono-tech text-emerald-700">Client Operating System</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Public Intake → Triage Queue → Confirmed Booking → Schedule Dispatch → Care Logs → Owner Metrics.
                </p>
              </div>

            </div>

            <div className="text-[11px] font-mono-tech text-slate-500 flex items-center justify-between pt-1">
              <span>Explicitly separates implemented workflows from prototyped dispatch & future billing automation.</span>
              <span className="text-[#ea580c] font-semibold">Explore Deep Dive →</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
