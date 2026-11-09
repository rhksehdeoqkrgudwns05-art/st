/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ConceptItem, StudyUnit } from '../types/curriculum';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Edit3,
  Check,
  X,
  RotateCcw,
  Sparkles,
  ExternalLink,
  History
} from 'lucide-react';

interface ConceptCardsViewProps {
  concepts: ConceptItem[];
  units: StudyUnit[];
  onNavigateToUnit: (unitId: string) => void;
  onUpdateConcept: (conceptId: string, updates: { explanation: string; example: string }) => void;
  onRevertConcept: (conceptId: string) => void;
  selectedConceptId?: string | null;
}

export const ConceptCardsView: React.FC<ConceptCardsViewProps> = ({
  concepts,
  units,
  onNavigateToUnit,
  onUpdateConcept,
  onRevertConcept,
  selectedConceptId,
}) => {
  const [selectedSessionFilter, setSelectedSessionFilter] = useState<number | 'all'>('all');
  const [expandedConceptIds, setExpandedConceptIds] = useState<Record<string, boolean>>(() => {
    // If a concept was passed as selected, expand it initially
    if (selectedConceptId) {
      return { [selectedConceptId]: true };
    }
    return {};
  });

  // Concept Edit Modal state
  const [editingConcept, setEditingConcept] = useState<ConceptItem | null>(null);
  const [editExplanation, setEditExplanation] = useState('');
  const [editExample, setEditExample] = useState('');

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedConceptIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleStartEdit = (concept: ConceptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingConcept(concept);
    setEditExplanation(concept.explanation);
    setEditExample(concept.example);
  };

  const handleSaveConceptEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConcept) return;
    onUpdateConcept(editingConcept.id, {
      explanation: editExplanation,
      example: editExample
    });
    setEditingConcept(null);
  };

  // Filter concepts by selected session
  const filteredConcepts = concepts.filter(c => {
    if (selectedSessionFilter === 'all') return true;
    return c.sessions.includes(selectedSessionFilter);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header & Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Layers className="w-7 h-7 text-[#2855D9]" />
              전공 핵심 개념 카드
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              1~7차시 강의자료의 핵심 개념을 엄선하여 체계적으로 정리했습니다. 중복 개념은 차시별로 연결되어 있습니다.
            </p>
          </div>

          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
            전체 {concepts.length}개 핵심 개념 중 {filteredConcepts.length}개 표시
          </span>
        </div>

        {/* Session Filter Tabs (Functional interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
          <button
            onClick={() => setSelectedSessionFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedSessionFilter === 'all'
                ? 'bg-[#2855D9] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            전체 차시 ({concepts.length})
          </button>

          {[1, 2, 3, 4, 5, 6, 7].map(num => {
            const count = concepts.filter(c => c.sessions.includes(num)).length;
            const isSelected = selectedSessionFilter === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedSessionFilter(num)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2855D9] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {num}차시 ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredConcepts.map(concept => {
          const isExpanded = !!expandedConceptIds[concept.id];
          const isTargeted = selectedConceptId === concept.id;

          // Find primary linked unit for "관련 내용 읽기"
          const targetUnitId = concept.linkedUnitIds[0];
          const targetUnit = units.find(u => u.id === targetUnitId);

          return (
            <div
              key={concept.id}
              id={`concept-${concept.id}`}
              className={`bg-white rounded-xl border transition-all duration-200 shadow-xs flex flex-col justify-between ${
                isTargeted
                  ? 'border-[#2855D9] ring-2 ring-blue-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header (Concept name + related sessions metadata) */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {concept.name}
                  </h3>
                  
                  {concept.isUserEdited && (
                    <span className="shrink-0 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] px-1.5 py-0.5 rounded font-medium">
                      개념 수정됨
                    </span>
                  )}
                </div>

                {/* Related Sessions: unboxed typography */}
                <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 mb-3">
                  <span className="font-medium text-slate-700">관련 차시:</span>
                  {concept.sessions.map((s, idx) => (
                    <React.Fragment key={s}>
                      <span className="font-semibold text-[#2855D9]">{s}차시</span>
                      {idx < concept.sessions.length - 1 && <span className="text-slate-300">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Expanded Explanation & Example */}
                {isExpanded ? (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-sm animate-fadeIn">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        쉬운 개념 설명
                      </h4>
                      <p className="text-slate-800 leading-relaxed whitespace-pre-line text-[15px]">
                        {concept.explanation}
                      </p>
                    </div>

                    {concept.example && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                        <h4 className="text-xs font-bold text-[#2855D9] uppercase tracking-wider mb-1">
                          구체적인 예시
                        </h4>
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {concept.example}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {concept.explanation}
                  </p>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2 text-xs">
                {/* Toggle Accordion Button */}
                <button
                  onClick={() => toggleExpand(concept.id)}
                  className="flex items-center gap-1 font-semibold text-[#2855D9] hover:text-blue-800 transition-colors py-1 px-2 rounded-md hover:bg-blue-50"
                >
                  {isExpanded ? (
                    <>
                      <span>설명 접기</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>설명 보기</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {/* Edit Concept Button */}
                  <button
                    onClick={(e) => handleStartEdit(concept, e)}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 py-1 px-2 rounded hover:bg-slate-200 transition-colors"
                    title="개념 설명 직접 편집"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>편집</span>
                  </button>

                  {/* Read Relevant Section Button */}
                  {targetUnit && (
                    <button
                      onClick={() => onNavigateToUnit(targetUnit.id)}
                      className="flex items-center gap-1 font-medium text-white bg-slate-900 hover:bg-slate-800 py-1.5 px-3 rounded-md transition-colors"
                      title={`${targetUnit.sessionTitle.split(':')[0]} 학습 본문으로 이동`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>관련 내용 읽기</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Concept Edit Modal */}
      {editingConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <form
            onSubmit={handleSaveConceptEdit}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  개념 설명 직접 수정
                </h3>
                <p className="text-xs text-slate-500">
                  {editingConcept.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingConcept(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  개념 설명
                </label>
                <textarea
                  rows={4}
                  value={editExplanation}
                  onChange={e => setEditExplanation(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  구체적인 예시
                </label>
                <textarea
                  rows={3}
                  value={editExample}
                  onChange={e => setEditExample(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
                />
              </div>

              {editingConcept.isUserEdited && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('초기 원본 개념 설명으로 되돌리시겠습니까?')) {
                        onRevertConcept(editingConcept.id);
                        setEditingConcept(null);
                      }
                    }}
                    className="flex items-center gap-1 text-xs text-rose-600 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    초기 원본 설명으로 복원
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingConcept(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2855D9] hover:bg-blue-700 rounded-md transition-colors shadow-xs"
              >
                저장하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
