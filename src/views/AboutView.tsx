import React from 'react';
import { PageId } from '../types';
import { 
  GraduationCap, 
  Award, 
  Check, 
  Layers, 
  Workflow, 
  Compass
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* 1. Header & Personal Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
            </span>
            <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
              ABOUT MONIQUE VARGAS • PROFESSIONAL PROFILE
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Connecting business problems to <br />
            <span className="relative inline-block text-slate-950">
              systems that actually work.
            </span>
          </h1>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              I&apos;m Monique Vargas, a technical solutions professional working across solution design, integrations, implementation, automation, and AI.
            </p>
            <p>
              My background sits between operations, customers, and technology. I&apos;ve worked across logistics and WMS environments, technical pre-sales, enterprise SaaS implementations, ERP integrations, workflow automation, and independent systems consulting. I&apos;m strongest when I can understand how a business actually operates, translate that into technical requirements, and connect the right systems, workflows, and people to make it work.
            </p>
          </div>
        </div>

        {/* Core Profile Summary Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
            CORE PROFILE
          </span>
          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-mono-tech uppercase tracking-wider">Primary Focus</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                Solutions Engineering &amp; Technical Implementation
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono-tech uppercase tracking-wider">Domain Experience</span>
              <span className="font-semibold text-slate-800 block mt-0.5">
                Enterprise SaaS • ERP/WMS • Field Operations • Logistics
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono-tech uppercase tracking-wider">Specializations</span>
              <span className="font-semibold text-slate-800 block mt-0.5">
                Pre-Sales Discovery • Integrations • Workflow Automation • AI • Systems Design
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Career Experience Rebuild (Chronological Order: Modera -> Continuum -> JumpTech -> Flexe) */}
      <div className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
            CAREER EXPERIENCE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            Professional Experience &amp; Milestones
          </h2>
          <p className="text-slate-600 text-sm">
            A track record of technical discovery, customer-facing delivery, workflow automation, and operational systems.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Experience 01: Modera Systems */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase tracking-wider block">01</span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                  Modera Systems
                </h3>
                <span className="text-xs font-semibold text-[#ea580c]">Founder &amp; Solution Designer</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                2026–Present
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Independent systems consulting and workflow development for service-based businesses. Conduct operational discovery, map business processes, prototype and build connected operating experiences spanning customer intake, scheduling, role-based workflows, automation, reporting, and internal operations.
            </p>
          </div>

          {/* Experience 02: Continuum AI */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase tracking-wider block">02</span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                  Continuum AI
                </h3>
                <span className="text-xs font-semibold text-[#ea580c]">Implementation Manager</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                2026–Present
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Lead technical SaaS implementations across ERP and distribution environments, translating customer workflows and business requirements into system configuration and integration requirements. Coordinate between customers and technical teams through discovery, solutioning, workflow troubleshooting, UAT, vendor setup, and production readiness.
            </p>
          </div>

          {/* Experience 03: JumpTech */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase tracking-wider block">03</span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                  JumpTech
                </h3>
                <span className="text-xs font-semibold text-[#ea580c]">Solutions Engineer / Technical Implementation</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                2022–2026
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Partnered with enterprise sales on technical discovery, solution design, customer demonstrations, and workflow mapping for a field operations platform. Led post-sale technical implementation and built integration and automation workflows connecting operational systems with external platforms including QuickBooks.
            </p>
          </div>

          {/* Experience 04: Flexe */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase tracking-wider block">04</span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                  Flexe
                </h3>
                <span className="text-xs font-semibold text-[#ea580c]">Logistics Analyst</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                2019–2022
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Worked directly with warehouse management systems, fulfillment operations, logistics data, and operational reporting. Investigated inventory and fulfillment discrepancies, mapped warehouse workflows, and partnered across operations and technical teams to resolve system and process issues.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Skills & Working Competencies (Three Columns) */}
      <div className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold block">
            TECHNICAL CAPABILITIES
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            Skills &amp; Working Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          {/* Column 1: Solutions Engineering */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <Compass className="w-4 h-4 text-[#ea580c]" />
              <span className="text-sm">Solutions Engineering</span>
            </div>
            <ul className="space-y-2.5 text-slate-650">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Technical Pre-Sales &amp; Discovery</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Requirements Translation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Solution Design &amp; Workflow Mapping</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Customer Demos &amp; Presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Fit-Gap Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Cross-Functional Alignment</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Integrations, Automation & AI */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <Workflow className="w-4 h-4 text-[#ea580c]" />
              <span className="text-sm">Integrations, Automation &amp; AI</span>
            </div>
            <ul className="space-y-2.5 text-slate-650">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>REST APIs &amp; Webhooks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>n8n / Workflow Automation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>AI Workflows &amp; Prompting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>JSON &amp; Data Transformation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>System-to-System Mapping</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Third-Party Platform Integrations</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Implementation & Operational Systems */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span className="text-sm">Implementation &amp; Operational Systems</span>
            </div>
            <ul className="space-y-2.5 text-slate-650">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Enterprise SaaS Implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>ERP &amp; WMS Environments</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Field Operations Workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Process Mapping &amp; Optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>UAT &amp; Workflow Troubleshooting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                <span>Customer Enablement &amp; Change Management</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. How I Work Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
            OPERATING PRINCIPLES
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            How I Work
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[#ea580c] font-bold text-xs">01</span>
              <strong className="text-white text-sm block">Understand the Workflow First</strong>
            </div>
            <p className="leading-relaxed">
              Before proposing technology, understand what people actually do, where information moves, and where the process breaks.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[#ea580c] font-bold text-xs">02</span>
              <strong className="text-white text-sm block">Connect Before Rebuilding</strong>
            </div>
            <p className="leading-relaxed">
              Use existing platform capabilities and integrations where they solve the problem. Build something new when there&apos;s a real gap.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[#ea580c] font-bold text-xs">03</span>
              <strong className="text-white text-sm block">Close the Loop</strong>
            </div>
            <p className="leading-relaxed">
              A workflow isn&apos;t finished when an API call succeeds. The right people need to know what happened and what happens next.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Education & Credentials */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
            BACKGROUND
          </span>
          <h3 className="font-display text-xl font-bold text-slate-950">
            Education &amp; Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
            <GraduationCap className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-950 font-bold text-sm">Texas Tech University</strong>
              <span className="text-slate-600 text-xs block">Bachelor of Science</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
            <Award className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-950 font-bold text-sm">City Colleges of Chicago</strong>
              <span className="text-slate-600 text-xs block">Software Engineering Certificate — 2026</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
            <Award className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-950 font-bold text-sm">Coding Temple</strong>
              <span className="text-slate-600 text-xs block">Full Stack Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Actions */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('case-studies')}
          className="text-xs font-semibold text-slate-700 hover:text-[#ea580c] flex items-center gap-1.5 transition-colors"
        >
          <span>View Primary Case Studies →</span>
        </button>

        <button
          onClick={() => onNavigate('builds')}
          className="px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
        >
          Explore Interactive Builds
        </button>
      </div>

    </div>
  );
};
