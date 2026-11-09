/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { StudyUnit, ConceptItem } from '../types/curriculum';
import { Search, X, BookOpen, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: StudyUnit[];
  concepts: ConceptItem[];
  onSelectUnit: (unitId: string) => void;
  onSelectConcept: (conceptId: string) => void;
}

interface SearchResult {
  type: 'unit' | 'concept';
  id: string;
  title: string;
  sessionText: string;
  snippet: string;
  matchTarget: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  units,
  concepts,
  onSelectUnit,
  onSelectConcept,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      // Shortcut '/' to open search when not typing in an input/textarea
      if (
        e.key === '/' &&
        !isOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        // Trigger handled via parent or header
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Perform search
  const results: SearchResult[] = [];

  if (trimmed) {
    // 1. Search in StudyUnits (Title, LearningGoal, EasyExplanation, ConcreteExamples, CoreConcepts)
    for (const unit of units) {
      const titleLower = unit.title.toLowerCase();
      const goalLower = unit.learningGoal.toLowerCase();
      const expLower = unit.easyExplanation.toLowerCase();
      const matLower = unit.concreteExample.fromMaterial.toLowerCase();
      const aidLower = unit.concreteExample.comprehensionAid.toLowerCase();
      const conceptsStr = unit.coreConcepts.join(' ').toLowerCase();

      let matchedSnippet = '';
      let matchTarget = '';

      if (titleLower.includes(trimmed)) {
        matchTarget = '단원 제목';
        matchedSnippet = unit.title;
      } else if (conceptsStr.includes(trimmed)) {
        matchTarget = '핵심 개념';
        matchedSnippet = unit.coreConcepts.join(', ');
      } else if (goalLower.includes(trimmed)) {
        matchTarget = '학습 목표';
        matchedSnippet = extractSentenceSnippet(unit.learningGoal, trimmed);
      } else if (expLower.includes(trimmed)) {
        matchTarget = '쉬운 설명';
        matchedSnippet = extractSentenceSnippet(unit.easyExplanation, trimmed);
      } else if (matLower.includes(trimmed)) {
        matchTarget = '자료 예시';
        matchedSnippet = extractSentenceSnippet(unit.concreteExample.fromMaterial, trimmed);
      } else if (aidLower.includes(trimmed)) {
        matchTarget = '이해 돕는 예시';
        matchedSnippet = extractSentenceSnippet(unit.concreteExample.comprehensionAid, trimmed);
      }

      if (matchedSnippet) {
        results.push({
          type: 'unit',
          id: unit.id,
          title: unit.title,
          sessionText: `${unit.sessionNumber}차시 · ${unit.pdfPages}`,
          snippet: matchedSnippet,
          matchTarget,
        });
      }
    }

    // 2. Search in ConceptItems
    for (const concept of concepts) {
      const nameLower = concept.name.toLowerCase();
      const expLower = concept.explanation.toLowerCase();
      const exLower = concept.example.toLowerCase();

      let matchedSnippet = '';
      let matchTarget = '';

      if (nameLower.includes(trimmed)) {
        matchTarget = '개념 표제어';
        matchedSnippet = concept.name;
      } else if (expLower.includes(trimmed)) {
        matchTarget = '개념 설명';
        matchedSnippet = extractSentenceSnippet(concept.explanation, trimmed);
      } else if (exLower.includes(trimmed)) {
        matchTarget = '개념 예시';
        matchedSnippet = extractSentenceSnippet(concept.example, trimmed);
      }

      if (matchedSnippet) {
        results.push({
          type: 'concept',
          id: concept.id,
          title: `[개념] ${concept.name}`,
          sessionText: `${concept.sessions.map(s => `${s}차시`).join(', ')}`,
          snippet: matchedSnippet,
          matchTarget,
        });
      }
    }
  }

  // Helper to extract a friendly sentence snippet containing the match
  function extractSentenceSnippet(text: string, keyword: string): string {
    const sentences = text.split(/(?<=[.?!])\s+/);
    const found = sentences.find(s => s.toLowerCase().includes(keyword));
    if (found) {
      return found.trim();
    }
    // Fallback: substring around match
    const idx = text.toLowerCase().indexOf(keyword);
    if (idx === -1) return text.slice(0, 100);
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + keyword.length + 60);
    return (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');
  }

  // Highlight helper
  const renderHighlighted = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="학습 내용 검색 (예: LLM, 프롬프트, API 키, Vercel, 마크다운...)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
              title="검색어 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-mono text-slate-400 bg-white rounded border border-slate-200">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!trimmed ? (
            <div className="py-12 text-center text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="text-sm font-medium text-slate-600">
                정리된 학습 내용에서 키워드를 검색하세요
              </p>
              <p className="text-xs text-slate-400 mt-1">
                사이트에 저장된 1~7차시 학습 제목, 본문, 개념어 및 설명 안에서 검색됩니다.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                <span className="text-xs text-slate-400">추천 검색어:</span>
                {['환각', '프롬프트 6대 조건', 'API 키', 'Vercel 배포', '디자인 시스템', 'Vite'].map(kw => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2 px-1 flex items-center justify-between">
                <span>검색 결과 {results.length}건</span>
                <span>클릭하여 바로 이동</span>
              </div>
              <div className="space-y-2">
                {results.map((item, idx) => (
                  <div
                    key={`${item.type}-${item.id}-${idx}`}
                    onClick={() => {
                      if (item.type === 'unit') {
                        onSelectUnit(item.id);
                      } else {
                        onSelectConcept(item.id);
                      }
                      onClose();
                    }}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.type === 'unit' ? (
                          <BookOpen className="w-3.5 h-3.5 text-[#2855D9] shrink-0" />
                        ) : (
                          <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-slate-500">
                          {item.sessionText}
                        </span>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                          {item.matchTarget}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2855D9] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2855D9] mb-1">
                      {renderHighlighted(item.title, query)}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50/80 p-2 rounded border border-slate-100">
                      {renderHighlighted(item.snippet, query)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                정리된 학습 내용에서 찾지 못했습니다
              </p>
              <p className="text-xs text-slate-400 mt-1">
                검색어를 확인하거나 다른 단어로 검색해 보세요.
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-3 text-xs text-[#2855D9] hover:underline font-medium"
              >
                검색어 지우고 전체 내용 보기
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
          <span>인터넷 검색이나 외부 답변 생성이 아닌 사이트 내부 학습 데이터 검색입니다.</span>
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
