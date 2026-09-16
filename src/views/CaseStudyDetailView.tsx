import React, { useState } from 'react';
import { PageId } from '../types';
import { caseStudiesData } from '../data/caseStudies';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Compass, 
  FileText, 
  Zap, 
  Database,
  Search,
  Code
} from 'lucide-react';
import { CaseStudyFourInteractiveSection } from '../components/demos/CaseStudyFourInteractiveSection';
import { CaseStudyThreeInteractiveSection } from '../components/demos/CaseStudyThreeInteractiveSection';
import { CaseStudyTwoInteractiveSection } from '../components/demos/CaseStudyTwoInteractiveSection';
import { CaseStudyOneInteractiveSection } from '../components/demos/CaseStudyOneInteractiveSection';

interface CaseStudyDetailViewProps {
  caseStudyId: string;
  onNavigate: (page: PageId, caseStudyId?: string) => void;
}

export const CaseStudyDetailView: React.FC<CaseStudyDetailViewProps> = ({ caseStudyId, onNavigate }) => {
  const caseStudy = caseStudiesData.find(c => c.id === caseStudyId) || caseStudiesData[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'distinction' | 'skills'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Top Navigation Bar: Back to All Case Studies */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('case-studies')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#ea580c] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all Case Studies</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-500">
          <span>Case Study {caseStudy.number} of 04</span>
        </div>
      </div>

      {/* Case Study Header / Hero */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            {caseStudy.category}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {caseStudy.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 text-xs">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">Engagement Context</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{caseStudy.clientContext}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
              {caseStudy.id === '02-quickbooks-automation' ? 'My Role' : 'Role'}
            </span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{caseStudy.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">Scope Level</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">
              {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                ? 'Pre-Sales Solution Design'
                : 'Discovery & Workflow'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">Data Treatment</span>
            <span className="font-semibold text-emerald-700 mt-0.5 block">
              Anonymized Demo Data
            </span>
          </div>
        </div>

        {/* Standardized Portfolio Disclosure Banner */}
        {caseStudy.syntheticDisclaimer && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              {caseStudy.syntheticDisclaimer}
            </div>
          </div>
        )}

        {/* Dedicated Interactive Build Link for Case Study 01 */}
        {(caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design') && (
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  DEDICATED INTERACTIVE BUILD • BUILD 01
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Solution Design Lab: Pre-Sales Requirement → Capability Mapping
              </h4>
              <p className="text-xs text-slate-600">
                Explore how customer operational needs connect to verified platform features and illuminate the proposed flow.
              </p>
            </div>
            <button
              onClick={() => onNavigate('builds', 'build-01-solution-design-lab')}
              className="px-4 py-2 rounded-full bg-slate-950 hover:bg-[#ea580c] text-white text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Launch Solution Design Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Tabs: Overview, Workflow Stages, Role Distinction, Demonstrated Skills */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-sm font-medium">
          {[
            { 
              id: 'overview', 
              label: caseStudy.id === '04-modera-kind-companion' 
                ? '1. Discovery & Business Model' 
                : '1. Discovery & Challenge' 
            },
            { 
              id: 'workflow', 
              label: (caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design')
                ? '2. Proposed Solution'
                : caseStudy.id === '04-modera-kind-companion'
                ? '2. System Design'
                : '2. Solution Workflow'
            },
            { 
              id: 'distinction', 
              label: (caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design')
                ? '3. What I Solutioned vs. Platform'
                : caseStudy.id === '02-quickbooks-automation' 
                ? '3. What I Designed & Built' 
                : caseStudy.id === '04-modera-kind-companion'
                ? '3. What I Designed & Built'
                : '3. What I Did vs. Platform' 
            },
            { 
              id: 'skills', 
              label: (caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design')
                ? '4. What This Demonstrates'
                : caseStudy.id === '04-modera-kind-companion'
                ? '4. Iteration & Demonstration'
                : '4. Proven Skills & Outcome' 
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-medium relative transition-colors ${
                activeTab === tab.id
                  ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ea580c]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab 1: Discovery & Challenge / Business Model */}
      {activeTab === 'overview' && (
        <div className="space-y-8 max-w-4xl">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="font-display text-xl font-bold text-slate-950">
              {caseStudy.id === '04-modera-kind-companion' 
                ? 'The Core Operational Problem: Disconnected Small Business Workflows'
                : 'The Core Operational Problem'}
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
            <h3 className="font-display text-xl font-bold text-slate-950">
              {caseStudy.id === '04-modera-kind-companion'
                ? 'Discovery: Framing the Operating System Around How the Business Works'
                : 'Discovery Questions I Investigated'}
            </h3>
            <div className="space-y-3 pt-2">
              {caseStudy.discovery.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono-tech text-[10px] shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Case Study 04: Visual Editorial Progression */}
          {caseStudy.id === '04-modera-kind-companion' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
                  EDITORIAL FLOW
                </span>
                <h3 className="font-display text-xl font-bold text-slate-950">
                  From Customer Journey to Operating Workflow
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  The discovery work unified customer acquisition and ongoing operations into a continuous operational lifecycle.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { num: '01', title: 'Discover', layer: 'Customer' },
                  { num: '02', title: 'Explore Services', layer: 'Customer' },
                  { num: '03', title: 'Request Care', layer: 'Customer' },
                  { num: '04', title: 'Household Context', layer: 'Operations' },
                  { num: '05', title: 'Schedule / Operate', layer: 'Operations' },
                  { num: '06', title: 'Deliver Service', layer: 'Operations' },
                  { num: '07', title: 'Client Relationship', layer: 'Operations' },
                  { num: '08', title: 'Business Visibility', layer: 'Operations' }
                ].map((st, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                      st.layer === 'Customer'
                        ? 'bg-blue-50/60 border-blue-200/80 text-blue-950'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] font-bold text-slate-500">{st.num}</span>
                      <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded ${
                        st.layer === 'Customer' ? 'bg-blue-200/70 text-blue-900' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {st.layer}
                      </span>
                    </div>
                    <strong className="block text-xs font-bold leading-tight">{st.title}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="font-display text-xl font-bold text-slate-950">
              Proposed Solution & High-Level Approach
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Solution Workflow Stages / System Design */}
      {activeTab === 'workflow' && (
        <div className="space-y-10 max-w-5xl">
          {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design' ? (
            <div className="space-y-10">
              <CaseStudyOneInteractiveSection />
            </div>
          ) : caseStudy.id === '02-quickbooks-automation' ? (
            <div className="space-y-10">
              <CaseStudyTwoInteractiveSection />
            </div>
          ) : caseStudy.id === '03-connected-customer-portal' ? (
            <div className="space-y-10">
              <CaseStudyThreeInteractiveSection />
            </div>
          ) : caseStudy.id === '04-modera-kind-companion' ? (
            <div className="space-y-10">
              <CaseStudyFourInteractiveSection />
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  End-to-End Workflow Architecture
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Step-by-step progression mapping operational hand-offs between systems and human stakeholders.
                </p>
              </div>

              <div className="space-y-3">
                {caseStudy.workflowSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-mono-tech text-xs font-bold shrink-0">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-950 text-sm sm:text-base">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {step.actor && (
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono-tech text-[11px] font-semibold border border-slate-200 shrink-0">
                        {step.actor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Role Distinction / What I Designed & Built */}
      {activeTab === 'distinction' && (
        <div className="space-y-8 max-w-4xl">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-slate-950">
              {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                ? 'WHAT I SOLUTIONED versus WHAT THE PLATFORM ALREADY PROVIDED'
                : caseStudy.id === '02-quickbooks-automation' 
                ? 'Role Scope & System Boundary Clarity' 
                : caseStudy.id === '04-modera-kind-companion'
                ? 'What I Designed & Built: 5 Functional Areas'
                : 'Role Scope & System Boundary Clarity'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                ? 'Honest, transparent separation of what I individually solutioned in pre-sales discovery versus the native platform features already provided.'
                : caseStudy.id === '02-quickbooks-automation'
                ? 'Clear distinction between what I designed and built versus the existing platform and service capabilities.'
                : caseStudy.id === '04-modera-kind-companion'
                ? 'Comprehensive breakdown of the product surface, operational workflows, and technical implementation.'
                : 'Honest, transparent separation of what I individually solutioned versus the platform features already provided.'}
            </p>
          </div>

          {/* Case Study 04: 5 Functional Areas */}
          {caseStudy.id === '04-modera-kind-companion' ? (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Area 1: Customer Experience */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <h4 className="font-display font-bold text-slate-950 text-base">
                      1. Customer Experience
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Public-facing web experience connecting brand, service catalog, business values, trust signals, customer reviews, how-it-works process, and the initial service request journey.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Service showcase & transparent pricing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Trust, credential & review presentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Step-by-step how-it-works guidance</span>
                    </li>
                  </ul>
                </div>

                {/* Area 2: Service Workflow */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    <h4 className="font-display font-bold text-slate-950 text-base">
                      2. Service Workflow
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Structured care request form and the connection between customer-submitted information and downstream operational views.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Multi-pet intake & medical emergency capture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Household entry instructions & lockbox codes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Automatic conversion to triage ticket</span>
                    </li>
                  </ul>
                </div>

                {/* Area 3: Role-Based Operations */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                    <h4 className="font-display font-bold text-slate-950 text-base">
                      3. Role-Based Operations
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tailored operational interfaces ensuring clients, sitters, managers, ownership, and platform admins see only what they need.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                      <span>Client self-service portal & booking status</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                      <span>Sitter visit dossier & feeding schedules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                      <span>Manager dispatch queue & conflict alerts</span>
                    </li>
                  </ul>
                </div>

                {/* Area 4: Business Management */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <h4 className="font-display font-bold text-slate-950 text-base">
                      4. Business Management
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Operational interfaces including scheduling/calendar concepts, household detail, service pricing management, booking views, and business dashboards.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Interactive scheduling & service calendar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Service pricing & add-on rate configuration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Deterministic analytics derived from bookings</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Area 5: Platform Controls */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <h4 className="font-display font-bold text-slate-950 text-base">
                    5. Platform Controls & Administration
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Role-based permissions, staff access controls, persona testing harness for role validation, and operational audit functionality recording administrative actions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <strong className="block text-slate-900">Role Permissions</strong>
                    <span className="text-[11px] text-slate-500">Scoped data partitioning per user</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <strong className="block text-slate-900">Staff Access</strong>
                    <span className="text-[11px] text-slate-500">Caregiver onboarding & credentialing</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <strong className="block text-slate-900">Audit Functionality</strong>
                    <span className="text-[11px] text-slate-500">Traceable logs for rate changes</span>
                  </div>
                </div>
              </div>

              {/* Technical Implementation Breakdown */}
              <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                    TECHNICAL IMPLEMENTATION
                  </span>
                  <h4 className="font-display text-base font-bold text-white">
                    Frontend Architecture & Engineering Foundation
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Built on React, TypeScript, and Vite. Rather than relying on third-party SaaS point solutions, the platform is implemented as a cohesive component-based web application with strict type safety across booking models, user roles, and dispatch state.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-white block">Architecture & GenAI Context:</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Generative AI was utilized as a development accelerator during code implementation, but the deployed application itself runs on deterministic React components, TypeScript typing, and direct booking calculation logic rather than relying on runtime LLMs for core operations.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What I Solutioned / Designed */}
              <div className="p-6 rounded-3xl bg-orange-50/40 border border-orange-200/80 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                  <h4 className="font-display font-bold text-slate-950 text-base">
                    {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                      ? 'What I Solutioned'
                      : caseStudy.id === '02-quickbooks-automation' 
                      ? 'What I Designed & Built' 
                      : 'What I Solutioned & Proposed'}
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                  {caseStudy.platformContext?.proposedByMonique?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  )) || (
                    <p className="text-slate-600">Full workflow design, integration schema, and implementation architecture.</p>
                  )}
                </div>
              </div>

              {/* What the Platform Provided */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <h4 className="font-display font-bold text-slate-950 text-base">
                    {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                      ? 'What the Platform Already Provided'
                      : caseStudy.id === '02-quickbooks-automation'
                      ? 'What the Platforms Provided'
                      : 'Platform Underlying Capabilities'}
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {caseStudy.platformContext?.platformProvided?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </div>
                  )) || (
                    <p className="text-slate-500">Core database, multi-tenant authentication, and host runtime environment.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Proven Skills & Outcome / Iteration & Demonstration */}
      {activeTab === 'skills' && (
        <div className="space-y-8 max-w-4xl">
          {caseStudy.id === '04-modera-kind-companion' ? (
            <div className="space-y-8">
              
              {/* 1. Iterative Development Process */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                    ITERATIVE DEVELOPMENT PROCESS
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    Discover → Build → Review → Identify Friction → Refine
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  The system was refined through ongoing collaborative review with the business owner, iteratively evaluating usability, information hierarchy, the calendar and scheduling experience, operational visibility, role-specific needs, and administrative usability.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">Usability</strong>
                    <span className="text-[11px] text-slate-500">Intake form friction reduction</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">Schedule Clarity</strong>
                    <span className="text-[11px] text-slate-500">Calendar time window slotting</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">Role Privacy</strong>
                    <span className="text-[11px] text-slate-500">Sitter vs client data partitioning</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">Owner Feedback</strong>
                    <span className="text-[11px] text-slate-500">Direct operator validation</span>
                  </div>
                </div>
              </div>

              {/* 2. What This Project Demonstrates */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 font-bold">
                    CAPABILITY SUMMARY
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    What This Project Demonstrates
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {caseStudy.demonstratedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. The Modera Connection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                    THE MODERA CONNECTION
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    From One Client System to a Repeatable Operating Model
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Working directly with The Kind Companion informed how Modera Systems conceptualizes client delivery: not as building isolated marketing websites, but as establishing an operating layer that connects client discovery to daily execution.
                </p>
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-center gap-4 text-xs font-mono-tech py-4">
                  <span className="font-bold text-emerald-400">CLIENT SYSTEM (The Kind Companion)</span>
                  <span className="text-[#ea580c]">↕</span>
                  <span className="font-bold text-white">MODERA OPERATING LAYER</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">1. Operational Discovery</strong>
                    <span className="text-[11px] text-slate-500">Uncovering customer journey, scheduling, and role requirements</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900">2. Repeatable System Architecture</strong>
                    <span className="text-[11px] text-slate-500">Designing the operating workflow and building the software</span>
                  </div>
                </div>
              </div>

              {/* 4. What the System Enables */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-3">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  WHAT THE SYSTEM ENABLES
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                  {caseStudy.outcome}
                </p>
              </div>

            </div>
          ) : caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design' ? (
            <>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  Solutions Engineering Highlights
                </h3>
                <div className="space-y-2.5">
                  {caseStudy.technicalHighlights.map((tech, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  Demonstrated Solutions Engineering Skills
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {caseStudy.demonstratedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-3">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  WHAT THE SOLUTION DESIGN ENABLED
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                  {caseStudy.outcome}
                </p>
              </div>
            </>
          ) : caseStudy.id === '02-quickbooks-automation' ? (
            <>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  Technical Capabilities Demonstrated
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {caseStudy.demonstratedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-3">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  WHAT THE WORKFLOW ENABLED
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                  {caseStudy.outcome}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  Technical Highlights
                </h3>
                <div className="space-y-2.5">
                  {caseStudy.technicalHighlights.map((tech, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h3 className="font-display text-xl font-bold text-slate-950">
                  Demonstrated Solutions Engineering Skills
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {caseStudy.demonstratedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-3">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                  VERIFIED BUSINESS & OPERATIONAL OUTCOME
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                  {caseStudy.outcome}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom Cross-Navigation */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('case-studies')}
          className="text-xs font-semibold text-slate-700 hover:text-[#ea580c] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Case Studies</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('architecture')}
            className="px-4 py-2 rounded-full border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-semibold"
          >
            Inspect System Architectures
          </button>
          <button
            onClick={() => {
              if (caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design') {
                onNavigate('builds', 'build-01-solution-design-lab');
              } else if (caseStudy.id === '02-quickbooks-automation') {
                onNavigate('builds', 'build-02-quickbooks-simulator');
              } else if (caseStudy.id === '03-connected-customer-portal') {
                onNavigate('builds', 'build-03-customer-portal-flow');
              } else if (caseStudy.id === '04-modera-kind-companion') {
                onNavigate('builds', 'build-04-operations-workflow');
              } else {
                onNavigate('builds');
              }
            }}
            className="px-4 py-2 rounded-full bg-slate-950 hover:bg-[#ea580c] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>
              {caseStudy.id === '01-field-service-workflow' || caseStudy.id === '01-voltpost-solution-design'
                ? 'Launch Solution Design Lab'
                : 'Launch Interactive Simulator'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
