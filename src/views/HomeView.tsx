import React from 'react';
import { PageId } from '../types';
import { ArrowRight } from 'lucide-react';
import { EditorialPortrait } from '../components/EditorialPortrait';
import { FeaturedWorkSection } from '../components/FeaturedWorkSection';
import { MyApproachSection } from '../components/MyApproachSection';
import { CtaBanner } from '../components/CtaBanner';

interface HomeViewProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
  onOpenContact: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 sm:space-y-28">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (EDITORIAL PERSONAL BRAND & POSITIONING) */}
      {/* ========================================================================= */}
      <section className="pt-2 sm:pt-6" id="hero-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Large Display Typography & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eyebrow in Spaced Small Caps */}
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-slate-600 font-bold">
              SOLUTIONS ENGINEERING • INTEGRATIONS • AUTOMATION • AI
            </div>

            {/* Giant Editorial Heading: Build / Connect / Simplify (with orange loop around Simplify) */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.04]">
              Build <br />
              Connect <br />
              <span className="relative inline-block mt-1">
                Simplify
                {/* Hand-Drawn Warm Orange Loop / Oval SVG */}
                <svg
                  className="absolute -inset-x-5 -inset-y-2.5 w-[calc(100%+40px)] h-[calc(100%+20px)] pointer-events-none text-[#ea580c]"
                  viewBox="0 0 280 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="140"
                    cy="40"
                    rx="132"
                    ry="34"
                    stroke="#ea580c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="900"
                    transform="rotate(-2 140 40)"
                  />
                </svg>
              </span>
            </h1>

            {/* Core Mission Positioning */}
            <div className="space-y-3 pt-1 max-w-lg">
              <p className="font-bold text-slate-950 text-base sm:text-lg leading-snug">
                I turn messy business problems into technical systems that actually work.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                I sit at the intersection of business needs and technical execution — designing integrations, automations, and scalable workflows that make complex operations simpler.
              </p>
            </div>

            {/* Action Buttons: Explore My Work & About Me */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('case-studies')}
                id="hero-explore-work-btn"
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:shadow transition-all flex items-center gap-2 group"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                id="hero-about-btn"
                className="px-6 py-3 rounded-full bg-transparent hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold tracking-tight transition-all"
              >
                About Me
              </button>
            </div>

            {/* Handwritten Casual Script Note Underneath */}
            <div className="pt-2 pl-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-slate-800 font-bold -rotate-3 inline-block select-none">
                Systems people progress.
              </span>
            </div>

          </div>

          {/* CENTER COLUMN: Editorial Arched Portrait Element */}
          <div className="lg:col-span-4 flex justify-center order-first lg:order-none py-4 sm:py-0">
            <EditorialPortrait />
          </div>

          {/* RIGHT COLUMN: Curious Builder & 6 Implementation Steps */}
          <div className="lg:col-span-3 space-y-6 lg:pl-4">
            
            {/* Handwritten Script Title */}
            <div className="space-y-1">
              <span className="font-handwriting text-3xl sm:text-4xl text-slate-900 font-bold block leading-tight select-none">
                Curious <br />
                Builder <br />
                Problem Solver
              </span>
              {/* Subtle hand-drawn underline */}
              <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
                <path d="M2 5 Q60 1 118 5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Sub-label */}
            <div className="space-y-3 pt-2">
              <div className="font-bold text-slate-950 text-xs sm:text-sm">
                From idea <br />to implementation.
              </div>

              {/* Numbered Steps: 01 to 06 */}
              <div className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-800 pt-1">
                {[
                  { num: '01', label: 'Discover' },
                  { num: '02', label: 'Design' },
                  { num: '03', label: 'Integrate' },
                  { num: '04', label: 'Automate' },
                  { num: '05', label: 'Validate' },
                  { num: '06', label: 'Scale' },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-slate-400 font-bold w-5">
                      {step.num}
                    </span>
                    <span className="text-slate-800 font-medium">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED WORK (LARGE MOCKUPS & VISUAL ENGAGEMENTS) */}
      {/* ========================================================================= */}
      <FeaturedWorkSection onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. MY APPROACH (INTERSECTION OF PEOPLE & TECHNOLOGY) */}
      {/* ========================================================================= */}
      <MyApproachSection />

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION BANNER (LET'S BUILD SOMETHING GREAT TOGETHER) */}
      {/* ========================================================================= */}
      <CtaBanner onOpenContact={onOpenContact} />

    </div>
  );
};
