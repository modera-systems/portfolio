import React from 'react';

interface EditorialPortraitProps {
  className?: string;
}

export const EditorialPortrait: React.FC<EditorialPortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-end select-none ${className}`}>
      
      {/* Terracotta / Sunset Orange Arched Backdrop */}
      <div className="relative w-[280px] sm:w-[330px] lg:w-[360px] h-[370px] sm:h-[430px] lg:h-[470px] flex items-end justify-center">
        
        {/* Geometric Arch: rounded-t-full with warm gradient */}
        <div 
          className="absolute inset-x-0 bottom-0 top-0 rounded-t-[160px] sm:rounded-t-[180px] bg-gradient-to-b from-[#F36B39] via-[#EA580C] to-[#C2410C] shadow-lg overflow-hidden"
          style={{
            clipPath: 'ellipse(100% 100% at 50% 100%)'
          }}
        >
          {/* Subtle warm glow texture inside arch */}
          <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/10 opacity-70" />
        </div>

        {/* Secondary editorial geometric outline ring */}
        <div 
          className="absolute -inset-2 rounded-t-[170px] sm:rounded-t-[190px] border border-[#ea580c]/20 -z-10 pointer-events-none"
        />

        {/* Portrait Image Layer (Editorial Illustration Treatment) */}
        <div className="relative z-10 w-full h-full flex items-end justify-center overflow-hidden rounded-t-[160px] sm:rounded-t-[180px]">
          {/* Refined vector illustration of an architect/technologist at desk */}
          <div className="relative w-full h-full flex flex-col items-center justify-end">
            <svg
              viewBox="0 0 360 480"
              className="w-full h-auto max-h-[96%] drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Desk / Laptop silhouette at bottom */}
              <path
                d="M40 450 L320 450 L300 480 L60 480 Z"
                fill="#0f172a"
                opacity="0.9"
              />
              <rect x="130" y="390" width="100" height="60" rx="6" fill="#e2e8f0" opacity="0.95" />
              <path d="M110 450 L250 450 L240 455 L120 455 Z" fill="#94a3b8" />
              
              {/* Coffee mug */}
              <rect x="65" y="415" width="26" height="35" rx="4" fill="#f8fafc" />
              <path d="M65 425 C55 425 55 440 65 440" stroke="#f8fafc" strokeWidth="3" fill="none" />

              {/* Torso / Knit Sweater */}
              <path
                d="M100 480 C100 370 120 310 180 300 C240 310 260 370 260 480 Z"
                fill="#1e293b"
              />
              
              {/* Collar */}
              <path
                d="M155 305 C170 325 190 325 205 305 Z"
                fill="#fed7aa"
              />

              {/* Arm / Hand resting on chin pose */}
              <path
                d="M230 440 C230 390 220 340 195 305 C190 300 180 300 175 305 C160 330 200 410 205 450 Z"
                fill="#1e293b"
              />
              {/* Forearm & Hand */}
              <path
                d="M185 305 C185 285 205 285 205 305 Z"
                fill="#fed7aa"
              />

              {/* Neck */}
              <path d="M168 280 L192 280 L190 310 L170 310 Z" fill="#fdba74" />

              {/* Face & Jawline */}
              <path
                d="M160 210 C155 260 170 285 185 285 C200 285 215 260 210 210 C210 180 160 180 160 210 Z"
                fill="#fed7aa"
              />

              {/* Soft facial features (Warm and confident) */}
              {/* Smile */}
              <path d="M176 252 Q185 258 194 252" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Eyes */}
              <path d="M168 230 Q174 227 178 230" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M190 230 Q194 227 200 230" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              
              {/* Elegant flowing dark brown hair with messy top bun (matches the reference mock) */}
              <path
                d="M150 215 C145 160 170 140 210 145 C235 150 230 190 225 240 C220 280 225 350 235 380 C210 380 205 340 205 300 C155 300 145 270 150 215 Z"
                fill="#291e18"
              />
              {/* Top bun */}
              <circle cx="195" cy="135" r="28" fill="#291e18" />
              <path d="M175 140 C170 120 220 115 215 140 Z" fill="#382923" />
              {/* Stray artistic curls */}
              <path d="M150 220 Q142 250 148 275" stroke="#291e18" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M225 230 Q235 270 228 310" stroke="#291e18" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* OVERLAID CARD ON BOTTOM RIGHT (From reference image: "• Better Systems Brighter People." with curved arrow) */}
        <div className="absolute -bottom-4 -right-6 sm:-right-10 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-md flex items-center gap-2 max-w-[210px] group hover:shadow-lg transition-shadow">
          <span className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
          <div className="flex flex-col">
            <span className="font-handwriting text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              Better Systems Brighter People.
            </span>
          </div>

          {/* Curved Hand-Drawn SVG Arrow pointing to card */}
          <div className="absolute -top-7 -left-5 text-slate-800 pointer-events-none">
            <svg width="42" height="32" viewBox="0 0 42 32" fill="none">
              <path
                d="M5 6 Q18 2 28 14 Q32 19 36 24"
                stroke="#0f172a"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M31 23 L36 24 L36 18"
                stroke="#0f172a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
};
