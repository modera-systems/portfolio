import React from 'react';
import { PageId } from '../types';
import { Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'builds', label: 'Builds' },
    { id: 'about', label: 'About' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Left: Brand Monogram & Name */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-serif-editorial text-xl font-bold tracking-tighter shadow-sm group-hover:bg-[#ea580c] transition-colors">
              MV
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-950 text-base tracking-tight leading-tight group-hover:text-[#ea580c] transition-colors">
                Monique Vargas
              </span>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 font-semibold">
                SOLUTIONS ENGINEER
              </span>
            </div>
          </div>

          {/* Center: Navigation Links & Social Icons */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-slate-950 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 text-slate-600">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors"
                title="Send an Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Signature Handwritten Note */}
          <div className="text-right">
            <span className="font-handwriting text-2xl sm:text-3xl text-slate-800 font-bold tracking-wide block select-none">
              Same problems. Better systems.
            </span>
          </div>

        </div>

        {/* Bottom subtle copyright / disclaimer */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-slate-400 gap-2">
          <span>© {new Date().getFullYear()} Monique Vargas. All portfolio systems and demonstrations are original.</span>
          <span>Designed with care • Built for technical clarity</span>
        </div>
      </div>
    </footer>
  );
};
