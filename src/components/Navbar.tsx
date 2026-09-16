import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, caseStudyId?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContact
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'builds', label: 'Builds' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Personal Brand / Identity: MV Monogram & Name */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-serif-editorial text-xl font-bold tracking-tighter shadow-sm group-hover:bg-[#ea580c] transition-colors duration-200">
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

        {/* Desktop Navigation: Clean Underline Bar */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav-menu">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (currentPage === 'case-study-detail' && item.id === 'case-studies');
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`py-2 text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-slate-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-950'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions: Pill "Let's Connect" Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenContact}
            id="nav-connect-cta"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-tight shadow-sm hover:shadow transition-all group"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="nav-mobile-toggle"
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (currentPage === 'case-study-detail' && item.id === 'case-studies');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
