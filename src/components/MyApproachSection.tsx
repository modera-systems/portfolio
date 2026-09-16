import React from 'react';
import { Users, Box, Settings, BarChart3 } from 'lucide-react';

export const MyApproachSection: React.FC = () => {
  return (
    <section className="space-y-8" id="my-approach-section">
      
      {/* Section Tag */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
        </span>
        <span className="font-mono-tech uppercase tracking-[0.14em] text-xs font-bold text-slate-800">
          MY APPROACH
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Big Bold Typography with Hand-Drawn Wavy Underline */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Solutions at the <br />
            intersection of <br />
            <span className="relative inline-block">
              people and technology.
              {/* Hand-Drawn Brush / Wavy Underline SVG in Warm Orange */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 sm:h-4 text-[#ea580c]"
                viewBox="0 0 320 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 10 C60 14 120 4 180 9 C240 14 280 6 317 11"
                  stroke="#ea580c"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Right Column: Narrative + 4 Pillars + Graphic Sunburst */}
        <div className="lg:col-span-6 space-y-8 relative">
          
          {/* Subtle Orange Graphic Ray Bursts (as shown in reference image) */}
          <div className="absolute -top-6 right-2 text-[#ea580c] pointer-events-none hidden sm:block">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 6 L24 0" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M37 11 L41 7" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M42 24 L48 24" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl">
            I combine technical depth with business context to design practical, scalable solutions. My work is grounded in discovery, collaboration, and a focus on real-world impact.
          </p>

          {/* 4 Pillars Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            
            {/* Pillar 1: Understand People */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block leading-tight">
                Understand <br />People
              </span>
            </div>

            {/* Pillar 2: Design Solutions */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block leading-tight">
                Design <br />Solutions
              </span>
            </div>

            {/* Pillar 3: Build & Implement */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block leading-tight">
                Build & <br />Implement
              </span>
            </div>

            {/* Pillar 4: Drive Better Outcomes */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block leading-tight">
                Drive <br />Better Outcomes
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
