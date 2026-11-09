/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, BookOpen, Layers, FileUp, FileText, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: 'study' | 'concepts' | 'quiz';
  setCurrentTab: (tab: 'study' | 'concepts' | 'quiz') => void;
  onOpenSearch: () => void;
  onOpenPptxModal: () => void;
  onOpenPdfModal: () => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenPptxModal,
  onOpenPdfModal,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 md:gap-8">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="목차 토글"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('study');
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2855D9] flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                助
              </div>
              <span className="text-lg font-bold tracking-tight text-[#17212B] whitespace-nowrap">
                나의 전공 공부 도우미
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Single line, text with subtle hover) */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
            <button
              onClick={() => setCurrentTab('study')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors ${
                currentTab === 'study'
                  ? 'text-[#2855D9] font-semibold border-b-2 border-[#2855D9]'
                  : 'hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              학습 본문
            </button>

            <button
              onClick={() => setCurrentTab('concepts')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors ${
                currentTab === 'concepts'
                  ? 'text-[#2855D9] font-semibold border-b-2 border-[#2855D9]'
                  : 'hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              <Layers className="w-4 h-4" />
              핵심 개념 카드
            </button>

            <button
              onClick={() => setCurrentTab('quiz')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors ${
                currentTab === 'quiz'
                  ? 'text-[#2855D9] font-semibold border-b-2 border-[#2855D9]'
                  : 'hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2855D9] inline-flex items-center justify-center text-[11px] font-bold">
                Q
              </span>
              퀴즈 챌린지
            </button>

            <button
              onClick={onOpenPptxModal}
              className="flex items-center gap-1.5 py-1 text-slate-600 hover:text-slate-900 whitespace-nowrap transition-colors border-b-2 border-transparent"
            >
              <FileUp className="w-4 h-4 text-emerald-600" />
              PPT 자료 추가
            </button>

            <button
              onClick={onOpenPdfModal}
              className="flex items-center gap-1.5 py-1 text-slate-600 hover:text-slate-900 whitespace-nowrap transition-colors border-b-2 border-transparent"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              원본 PDF 교재
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Search button) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
              title="학습 내용 및 개념 검색 (단축키: /)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">학습 내용 검색</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-slate-400 bg-white rounded border border-slate-300">
                /
              </kbd>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Secondary Tab Bar (Horizontal scroll to prevent wrapping) */}
      <div className="md:hidden flex items-center justify-start gap-1 overflow-x-auto border-t border-slate-200 bg-slate-50/95 px-3 py-1.5 text-xs no-scrollbar">
        <button
          onClick={() => setCurrentTab('study')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium shrink-0 whitespace-nowrap ${
            currentTab === 'study' ? 'text-[#2855D9] bg-blue-50 font-semibold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          학습 본문
        </button>
        <button
          onClick={() => setCurrentTab('concepts')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium shrink-0 whitespace-nowrap ${
            currentTab === 'concepts' ? 'text-[#2855D9] bg-blue-50 font-semibold' : 'text-slate-600'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          개념 카드
        </button>
        <button
          onClick={() => setCurrentTab('quiz')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium shrink-0 whitespace-nowrap ${
            currentTab === 'quiz' ? 'text-[#2855D9] bg-blue-50 font-semibold' : 'text-slate-600'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-[#2855D9] inline-flex items-center justify-center text-[10px] font-bold">
            Q
          </span>
          퀴즈 챌린지
        </button>
        <button
          onClick={onOpenPptxModal}
          className="flex items-center gap-1 py-1 px-2.5 rounded-md text-slate-600 font-medium shrink-0 whitespace-nowrap"
        >
          <FileUp className="w-3.5 h-3.5 text-emerald-600" />
          PPT 추가
        </button>
        <button
          onClick={onOpenPdfModal}
          className="flex items-center gap-1 py-1 px-2.5 rounded-md text-slate-600 font-medium shrink-0 whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5 text-rose-600" />
          원문 PDF
        </button>
      </div>
    </header>
  );
};
