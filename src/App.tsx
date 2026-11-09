/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { StudyUnit, ConceptItem } from './types/curriculum';
import { SESSIONS_META } from './data/initialCurriculum';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UnitViewer } from './components/UnitViewer';
import { ConceptCardsView } from './components/ConceptCardsView';
import { QuizChallengeView } from './components/QuizChallengeView';
import { INITIAL_QUIZ_QUESTIONS } from './data/initialQuizQuestions';
import { SearchModal } from './components/SearchModal';
import { PptxImportModal } from './components/PptxImportModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [units, setUnits] = useState<StudyUnit[]>([]);
  const [concepts, setConcepts] = useState<ConceptItem[]>([]);
  const [activeUnitId, setActiveUnitId] = useState<string>('unit-1-1');
  const [currentTab, setCurrentTab] = useState<'study' | 'concepts' | 'quiz'>('study');

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPptxModalOpen, setIsPptxModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfInitialPage, setPdfInitialPage] = useState<number>(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Concept focused navigation
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);

  // User notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Load initial data from localStorage on mount
  useEffect(() => {
    const loadedUnits = StorageService.getUnits();
    const loadedConcepts = StorageService.getConcepts();
    setUnits(loadedUnits);
    setConcepts(loadedConcepts);

    if (loadedUnits.length > 0 && !activeUnitId) {
      setActiveUnitId(loadedUnits[0].id);
    }
  }, []);

  // Global keyboard shortcut '/' to search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isSearchOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isSearchOpen]);

  // Update a study unit
  const handleUpdateUnit = (
    unitId: string,
    updates: {
      title: string;
      learningGoal: string;
      coreConcepts: string[];
      easyExplanation: string;
      fromMaterial: string;
      comprehensionAid: string;
    }
  ) => {
    const result = StorageService.updateUnit(unitId, updates);
    if (result.success && result.updatedUnit) {
      setUnits(prev => prev.map(u => (u.id === unitId ? result.updatedUnit! : u)));
      showToast('학습 내용이 저장되어 본문과 검색 결과에 즉시 반영되었습니다.');
    } else {
      showToast('저장 중 문제가 발생했습니다. 브라우저 저장 공간을 확인해 주세요.', 'info');
    }
  };

  // Revert a study unit to original
  const handleRevertUnit = (unitId: string) => {
    const result = StorageService.revertUnit(unitId);
    if (result.success && result.revertedUnit) {
      setUnits(prev => prev.map(u => (u.id === unitId ? result.revertedUnit! : u)));
      showToast('초기 원본 학습 내용으로 복원되었습니다.');
    }
  };

  // Update a concept item
  const handleUpdateConcept = (
    conceptId: string,
    updates: { explanation: string; example: string }
  ) => {
    const result = StorageService.updateConcept(conceptId, updates);
    if (result.success && result.updatedConcept) {
      setConcepts(prev => prev.map(c => (c.id === conceptId ? result.updatedConcept! : c)));
      showToast('개념 설명이 저장되어 카드 및 본문 관련 개념에 동기화되었습니다.');
    }
  };

  // Revert a concept item
  const handleRevertConcept = (conceptId: string) => {
    const result = StorageService.revertConcept(conceptId);
    if (result.success && result.revertedConcept) {
      setConcepts(prev => prev.map(c => (c.id === conceptId ? result.revertedConcept! : c)));
      showToast('초기 원본 개념 설명으로 복원되었습니다.');
    }
  };

  // Add imported units from PPTX
  const handleImportUnits = (newUnits: StudyUnit[]) => {
    const success = StorageService.addImportedUnits(newUnits);
    if (success) {
      setUnits(prev => [...prev, ...newUnits]);
      setActiveUnitId(newUnits[0].id);
      setCurrentTab('study');
      showToast(`${newUnits.length}개의 슬라이드가 학습 내용에 성공적으로 추가되었습니다!`);
    } else {
      showToast('자료 추가 중 저장 오류가 발생했습니다.', 'info');
    }
  };

  // Factory reset back to initial curriculum
  const handleResetAllData = () => {
    StorageService.resetToDefault();
    const freshUnits = StorageService.getUnits();
    const freshConcepts = StorageService.getConcepts();
    setUnits(freshUnits);
    setConcepts(freshConcepts);
    setActiveUnitId(freshUnits[0].id);
    setCurrentTab('study');
    showToast('전체 학습 데이터가 초기 원본 상태로 복원되었습니다.');
  };

  // Jump from unit to concept card
  const handleNavigateToConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setCurrentTab('concepts');
    setTimeout(() => {
      const el = document.getElementById(`concept-${conceptId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Jump from concept card or search to unit
  const handleNavigateToUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    setCurrentTab('study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open PDF at specific page
  const handleOpenPdfAtPage = (pageNumber: number) => {
    setPdfInitialPage(pageNumber);
    setIsPdfModalOpen(true);
  };

  const currentActiveUnit = units.find(u => u.id === activeUnitId) || units[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#17212B]" id="top">
      {/* 1. Header (Top Bar Contract) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPptxModal={() => setIsPptxModalOpen(true)}
        onOpenPdfModal={() => {
          setPdfInitialPage(currentActiveUnit?.pdfPageNumbers?.[0] || 1);
          setIsPdfModalOpen(true);
        }}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* 2. Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* If in Study Tab: Show Sidebar + Central UnitViewer */}
        {currentTab === 'study' ? (
          <>
            <Sidebar
              sessions={SESSIONS_META}
              units={units}
              activeUnitId={activeUnitId}
              onSelectUnit={handleNavigateToUnit}
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

            <main className="flex-1 min-w-0 pb-16">
              {currentActiveUnit ? (
                <UnitViewer
                  unit={currentActiveUnit}
                  concepts={concepts}
                  allUnits={units}
                  onSelectUnit={handleNavigateToUnit}
                  onUpdateUnit={handleUpdateUnit}
                  onRevertUnit={handleRevertUnit}
                  onNavigateToConcept={handleNavigateToConcept}
                  onOpenPdfAtPage={handleOpenPdfAtPage}
                />
              ) : (
                <div className="p-12 text-center text-slate-500">
                  학습 단원을 불러오는 중입니다...
                </div>
              )}
            </main>
          </>
        ) : currentTab === 'concepts' ? (
          /* Concept Cards Tab */
          <main className="flex-1 min-w-0 pb-16">
            <ConceptCardsView
              concepts={concepts}
              units={units}
              onNavigateToUnit={handleNavigateToUnit}
              onUpdateConcept={handleUpdateConcept}
              onRevertConcept={handleRevertConcept}
              selectedConceptId={selectedConceptId}
            />
          </main>
        ) : (
          /* Quiz Challenge Tab */
          <main className="flex-1 min-w-0 pb-16">
            <QuizChallengeView
              questions={INITIAL_QUIZ_QUESTIONS}
              units={units}
              concepts={concepts}
              onNavigateToUnit={handleNavigateToUnit}
              onNavigateToConcept={handleNavigateToConcept}
            />
          </main>
        )}
      </div>

      {/* 3. Footer */}
      <Footer
        onResetAllData={handleResetAllData}
        unitsCount={units.length}
        conceptsCount={concepts.length}
      />

      {/* 4. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        units={units}
        concepts={concepts}
        onSelectUnit={handleNavigateToUnit}
        onSelectConcept={handleNavigateToConcept}
      />

      {/* 5. PPTX Import Modal */}
      <PptxImportModal
        isOpen={isPptxModalOpen}
        onClose={() => setIsPptxModalOpen(false)}
        onImportUnits={handleImportUnits}
        existingSessionsCount={Math.max(...units.map(u => u.sessionNumber), 7)}
      />

      {/* 6. Original PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        initialPage={pdfInitialPage}
      />

      {/* 7. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-lg shadow-xl animate-bounce-subtle">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
