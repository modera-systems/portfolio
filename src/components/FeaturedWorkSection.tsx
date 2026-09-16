import React, { useState } from 'react';
import { PageId } from '../types';
import { caseStudiesData } from '../data/caseStudies';
import { 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  Cloud, 
  Sparkles, 
  Check, 
  Search, 
  CheckCircle2, 
  Layers, 
  Users, 
  Settings, 
  FolderKanban, 
  BarChart2,
  Calendar,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  MapPin,
  FileCheck,
  Workflow
} from 'lucide-react';

interface FeaturedWorkSectionProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({ onNavigate }) => {
  return (
    <section className="space-y-8" id="featured-work-section">
      
      {/* Section Header: ◉ FEATURED WORK | View all case studies → */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.14em] text-xs font-bold text-slate-800">
            FEATURED WORK
          </span>
        </div>

        <button
          onClick={() => onNavigate('case-studies')}
          className="text-xs font-semibold text-slate-900 hover:text-[#ea580c] flex items-center gap-1 transition-colors group"
        >
          <span>View all case studies</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 1. MAJOR FLAGSHIP HERO CARD: Case Study 01 (Designing a Distributed Field-Service Workflow) */}
      <div 
        onClick={() => onNavigate('case-study-detail', '01-field-service-workflow')}
        className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-6 sm:p-8 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-serif-editorial text-5xl sm:text-6xl text-slate-300 font-bold block leading-none select-none">
                01
              </span>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
                PRE-SALES SOLUTIONING • FIELD SERVICE WORKFLOW
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight group-hover:text-[#ea580c] transition-colors">
                Designing a Distributed Field-Service Workflow
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Pre-sales solution design for an EV infrastructure company: Translating distributed charger deployment and maintenance requirements into a structured workflow on an existing Field Operations Platform.
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Pre-Sales Solutioning', 'Technical Discovery', 'Field Service Workflow', 'Persona Mapping', 'Field Operations Platform'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full text-xs font-medium bg-slate-100/90 text-slate-700 border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Nav Arrows */}
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('case-study-detail', '04-modera-kind-companion');
                }}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 bg-white flex items-center justify-center text-slate-600 hover:text-slate-950 transition-colors shadow-2xs"
                title="Previous Case Study"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('case-study-detail', '02-quickbooks-automation');
                }}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-400 bg-white flex items-center justify-center text-slate-600 hover:text-slate-950 transition-colors shadow-2xs"
                title="Next Case Study"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-semibold text-[#ea580c] pl-2 flex items-center gap-1 group-hover:underline">
                Explore Case Study →
              </span>
            </div>
          </div>

          {/* Right Column: Visual Solution Map Frame (Proposed Deployment Workflow) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              
              {/* Window Header */}
              <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono-tech">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">EV Infrastructure Co. × Field Operations Platform • Solution Design</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">Solution Blueprint</span>
              </div>

              {/* Solution Flow Visual Representation */}
              <div className="p-5 bg-gradient-to-b from-[#fbfcfd] to-white space-y-4 text-xs">
                
                {/* 3 Step Visual Sequence */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Step 1: Intake & Review */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold text-[11px]">
                        01
                      </span>
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">Site Intake & Review</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Location submissions and self-surveys enter the operational queue for initial review and qualification before field work.
                    </p>
                  </div>

                  {/* Step 2: Field Survey & Activity */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-[11px]">
                        02
                      </span>
                      <FileCheck className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">Field Survey & Activity</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Field teams use the platform's field capabilities to complete surveys, capture photos, and record notes with offline synchronization.
                    </p>
                  </div>

                  {/* Step 3: Central Visibility & Lifecycle */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">
                        03
                      </span>
                      <Workflow className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">Central Visibility & Lifecycle</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Field updates synchronize with the central platform, maintaining visibility across installation and ongoing maintenance.
                    </p>
                  </div>

                </div>

                {/* Clear distinction banner */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-[11px] text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold">Role Scope:</strong> Pre-sales technical discovery and workflow solution design translating distributed deployment requirements onto the Field Operations Platform.
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. THREE-COLUMN CARDS ROW: 02, 03, 04 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 02: Automating Finance Operations */}
        <div
          onClick={() => onNavigate('case-study-detail', '02-quickbooks-automation')}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all space-y-6"
        >
          <div className="space-y-3">
            <span className="font-serif-editorial text-4xl text-slate-300 font-bold block leading-none select-none">
              02
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
              INTEGRATIONS / AUTOMATION
            </span>
            <h4 className="font-display text-xl font-bold text-slate-950 tracking-tight group-hover:text-[#ea580c] transition-colors">
              Automating Finance Operations
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Connecting a Field Operations Platform to QuickBooks through n8n with status-triggered webhooks, data transformation, and conditional customer lookup.
            </p>
          </div>

          {/* Graphic Visual: Node Diagram (Webhook -> n8n Engine -> QuickBooks) */}
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-slate-100 flex items-center justify-center py-6 relative">
            <div className="flex items-center gap-3 relative z-10">
              
              {/* Node 1: Field Operations Platform */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-[9px] font-mono-tech mt-1 text-slate-600 font-semibold max-w-[70px] leading-tight">Field Ops</span>
              </div>

              {/* Connecting line */}
              <div className="w-5 h-0.5 bg-slate-300 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ea580c]"></div>
              </div>

              {/* Node 2: n8n Engine */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-md">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono-tech mt-1 text-slate-600 font-semibold leading-tight">n8n Engine</span>
              </div>

              {/* Connecting line */}
              <div className="w-5 h-0.5 bg-slate-300 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>

              {/* Node 3: QuickBooks */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] font-mono-tech mt-1 text-slate-600 font-semibold leading-tight">QuickBooks</span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#ea580c] transition-colors">
              Explore Case Study
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center text-slate-700 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 03: Connected Customer Project Experience */}
        <div
          onClick={() => onNavigate('case-study-detail', '03-connected-customer-portal')}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all space-y-6"
        >
          <div className="space-y-3">
            <span className="font-serif-editorial text-4xl text-slate-300 font-bold block leading-none select-none">
              03
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
              CUSTOMER EXPERIENCE • PROTOTYPING
            </span>
            <h4 className="font-display text-xl font-bold text-slate-950 tracking-tight group-hover:text-[#ea580c] transition-colors">
              Connected Customer Project Experience
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Full-stack connected customer experience connecting Field Operations Platform data with real-time customer and installer messaging.
            </p>
          </div>

          {/* Graphic Visual: Customer Tracking & Real-Time Messaging Card Mockup */}
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-slate-100 flex flex-col justify-center space-y-2.5 py-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Connected Project Tracker</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-100 text-emerald-800 font-semibold">
                Socket.IO Live
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
                <span className="text-slate-600">Access:</span>
                <span className="font-mono-tech font-semibold">alex@example.com (Token Auth)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
                <span className="text-slate-600">Installer Crew:</span>
                <span className="font-semibold text-slate-900">Installation Team (Jordan M.)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1.5 text-[10px] font-medium">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Field Ops REST Query → Customer Milestone & Chat</span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#ea580c] transition-colors">
              Explore Case Study
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center text-slate-700 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 04: Modera × The Kind Companion */}
        <div
          onClick={() => onNavigate('case-study-detail', '04-modera-kind-companion')}
          className="cursor-pointer group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all space-y-6"
        >
          <div className="space-y-3">
            <span className="font-serif-editorial text-4xl text-slate-300 font-bold block leading-none select-none">
              04
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-bold block">
              PRODUCT STRATEGY / APPLICATION BUILD
            </span>
            <h4 className="font-display text-xl font-bold text-slate-950 tracking-tight group-hover:text-[#ea580c] transition-colors">
              From Discovery to Operating System
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Modera Systems × The Kind Companion: Taking a small-business service operation from discovery to workflow design, software architecture, and iterative build.
            </p>
          </div>

          {/* Graphic Visual: Split Consulting & Client Operating Systems */}
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-slate-100 flex flex-col justify-center space-y-2 py-4">
            <div className="p-2 rounded-lg bg-slate-950 text-white flex items-center justify-between text-[11px]">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                Modera Control Center
              </span>
              <span className="text-[9px] font-mono-tech text-slate-400">Consulting Side</span>
            </div>

            <div className="text-center text-[10px] font-mono-tech text-slate-400">
              ↓ Powers & Implements
            </div>

            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-900 flex items-center justify-between text-[11px] shadow-2xs">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                The Kind Companion
              </span>
              <span className="text-[9px] font-mono-tech text-emerald-700">Client Operations</span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#ea580c] transition-colors">
              Explore Case Study
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center text-slate-700 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
