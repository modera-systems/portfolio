import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface CtaBannerProps {
  onOpenContact: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenContact }) => {
  return (
    <div 
      className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-900 shadow-xl"
      id="cta-banner"
    >
      {/* Subtle architectural contour lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        
        <div className="space-y-2 max-w-xl">
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Let&apos;s build something great together.
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
            Open to solutions engineering, architecture, and technical consulting opportunities.
          </p>
        </div>

        <button
          onClick={onOpenContact}
          id="cta-banner-connect-btn"
          className="self-start sm:self-auto px-7 py-3.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all group shrink-0"
        >
          <span>Let&apos;s Connect</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </div>
  );
};
