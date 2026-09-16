/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

// Page Views
import { HomeView } from './views/HomeView';
import { CaseStudiesView } from './views/CaseStudiesView';
import { CaseStudyDetailView } from './views/CaseStudyDetailView';
import { ArchitectureView } from './views/ArchitectureView';
import { BuildsView } from './views/BuildsView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>('01-field-service-workflow');
  const [selectedBuildId, setSelectedBuildId] = useState<string>('build-01-solution-design-lab');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Scroll to top on navigation
  const handleNavigate = (page: PageId, id?: string) => {
    if (page === 'case-study-detail' && id) {
      setSelectedCaseStudyId(id);
    }
    if (page === 'builds' && id) {
      setSelectedBuildId(id);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Support browser popstate / back button if possible or listen to hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'case-studies' || hash === 'architecture' || hash === 'builds' || hash === 'about') {
        setCurrentPage(hash as PageId);
      } else if (hash.startsWith('case-study/')) {
        const csId = hash.replace('case-study/', '');
        setSelectedCaseStudyId(csId);
        setCurrentPage('case-study-detail');
      } else if (hash.startsWith('build/')) {
        const bId = hash.replace('build/', '');
        setSelectedBuildId(bId);
        setCurrentPage('builds');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-slate-900 font-sans selection:bg-[#ea580c]/20 selection:text-[#ea580c]">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === 'case-studies' && (
          <CaseStudiesView
            onSelectCaseStudy={(id) => handleNavigate('case-study-detail', id)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'case-study-detail' && (
          <CaseStudyDetailView
            caseStudyId={selectedCaseStudyId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'architecture' && (
          <ArchitectureView
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'builds' && (
          <BuildsView
            onNavigate={handleNavigate}
            initialBuildId={selectedBuildId}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
