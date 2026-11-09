/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudyUnit, ConceptItem } from '../types/curriculum';
import {
  Edit3,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  KeyRound,
  FileText,
  Lightbulb,
  ExternalLink,
  History,
  AlertCircle
} from 'lucide-react';

interface UnitViewerProps {
  unit: StudyUnit;
  concepts: ConceptItem[];
  allUnits: StudyUnit[];
  onSelectUnit: (unitId: string) => void;
  onUpdateUnit: (
    unitId: string,
    updates: {
      title: string;
      learningGoal: string;
      coreConcepts: string[];
      easyExplanation: string;
      fromMaterial: string;
      comprehensionAid: string;
    }
  ) => void;
  onRevertUnit: (unitId: string) => void;
  onNavigateToConcept: (conceptId: string) => void;
  onOpenPdfAtPage: (pageNumber: number) => void;
}

export const UnitViewer: React.FC<UnitViewerProps> = ({
  unit,
  concepts,
  allUnits,
  onSelectUnit,
  onUpdateUnit,
  onRevertUnit,
  onNavigateToConcept,
  onOpenPdfAtPage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOriginalModal, setShowOriginalModal] = useState(false);

  // Edit form states
  const [editTitle, setEditTitle] = useState(unit.title);
  const [editLearningGoal, setEditLearningGoal] = useState(unit.learningGoal);
  const [editCoreConcepts, setEditCoreConcepts] = useState(unit.coreConcepts.join(', '));
  const [editEasyExplanation, setEditEasyExplanation] = useState(unit.easyExplanation);
  const [editFromMaterial, setEditFromMaterial] = useState(unit.concreteExample.fromMaterial);
  const [editComprehensionAid, setEditComprehensionAid] = useState(unit.concreteExample.comprehensionAid);

  // When unit prop changes, sync local form
  React.useEffect(() => {
    setEditTitle(unit.title);
    setEditLearningGoal(unit.learningGoal);
    setEditCoreConcepts(unit.coreConcepts.join(', '));
    setEditEasyExplanation(unit.easyExplanation);
    setEditFromMaterial(unit.concreteExample.fromMaterial);
    setEditComprehensionAid(unit.concreteExample.comprehensionAid);
    setIsEditing(false);
  }, [unit]);

  const handleStartEdit = () => {
    setEditTitle(unit.title);
    setEditLearningGoal(unit.learningGoal);
    setEditCoreConcepts(unit.coreConcepts.join(', '));
    setEditEasyExplanation(unit.easyExplanation);
    setEditFromMaterial(unit.concreteExample.fromMaterial);
    setEditComprehensionAid(unit.concreteExample.comprehensionAid);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const conceptArray = editCoreConcepts
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    onUpdateUnit(unit.id, {
      title: editTitle,
      learningGoal: editLearningGoal,
      coreConcepts: conceptArray.length > 0 ? conceptArray : unit.coreConcepts,
      easyExplanation: editEasyExplanation,
      fromMaterial: editFromMaterial,
      comprehensionAid: editComprehensionAid,
    });
    setIsEditing(false);
  };

  // Find previous and next units for navigation
  const currentIndex = allUnits.findIndex(u => u.id === unit.id);
  const prevUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : null;
  const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null;

  // Resolve related concepts
  const resolvedConcepts = unit.relatedConceptIds
    .map(id => concepts.find(c => c.id === id))
    .filter((c): c is ConceptItem => !!c);

  const firstPageNum = unit.pdfPageNumbers && unit.pdfPageNumbers.length > 0 ? unit.pdfPageNumbers[0] : 1;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="font-semibold text-[#2855D9] bg-blue-50 px-2.5 py-1 rounded">
            {unit.sessionTitle.split(':')[0]}
          </span>
          <span className="text-slate-400">·</span>
          <button
            onClick={() => onOpenPdfAtPage(firstPageNum)}
            className="flex items-center gap-1 font-medium text-slate-600 hover:text-[#2855D9] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
            title="원본 PDF에서 해당 페이지 열기"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>근거: {unit.pdfPages}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {unit.isUserEdited && (
            <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
              사용자 수정본 {unit.lastEditedAt && `(${new Date(unit.lastEditedAt).toLocaleDateString('ko-KR')})`}
            </span>
          )}

          {unit.isUserAdded && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
              추가된 PPTX 자료
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {unit.isUserEdited && (
            <>
              <button
                onClick={() => setShowOriginalModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                원문과 비교
              </button>
              <button
                onClick={() => {
                  if (confirm('수정한 내용을 취소하고 원본 학습 내용으로 되돌리시겠습니까?')) {
                    onRevertUnit(unit.id);
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-md transition-colors"
                title="원본 내용으로 복원"
              >
                <RotateCcw className="w-3 h-3" />
                초기 복원
              </button>
            </>
          )}

          {!isEditing ? (
            <button
              onClick={handleStartEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2855D9] hover:bg-blue-700 rounded-md transition-colors shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              학습 내용 직접 편집
            </button>
          ) : (
            <span className="text-xs text-blue-700 font-medium bg-blue-50 px-2 py-1 rounded">
              편집 중...
            </span>
          )}
        </div>
      </div>

      {/* Main Content or Edit Form */}
      {!isEditing ? (
        <div className="space-y-8">
          {/* Unit Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
              {unit.title}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {unit.sessionTitle}
            </p>
          </div>

          {/* 1. 학습 목표 */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2855D9] mb-3">
              <Target className="w-4 h-4" />
              <span>1. 학습 목표</span>
            </div>
            <p className="text-slate-800 text-base leading-relaxed pl-1 font-medium">
              {unit.learningGoal}
            </p>
          </section>

          {/* 2. 핵심 개념 */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>2. 핵심 개념</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {unit.coreConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-medium transition-colors"
                >
                  {concept}
                </span>
              ))}
            </div>
          </section>

          {/* 3. 쉬운 설명 */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4 text-[#2855D9]" />
              <span>3. 쉬운 설명 (개념과 원리 이해)</span>
            </div>
            <div className="prose prose-slate max-w-none text-slate-800 text-[16.5px] leading-relaxed whitespace-pre-line space-y-4">
              {unit.easyExplanation}
            </div>
          </section>

          {/* 4. 구체적인 예시 (자료 원문 & 이해를 돕는 예시) */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>4. 구체적인 예시</span>
            </div>

            {/* A. 자료 원문 기반 예시 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                강의자료 수록 예시 (원자료 기반)
              </div>
              <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                {unit.concreteExample.fromMaterial}
              </p>
            </div>

            {/* B. 이해를 돕는 예시 */}
            <div className="bg-blue-50/50 border border-blue-200/60 rounded-lg p-4">
              <div className="text-xs font-bold text-[#2855D9] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2855D9]"></span>
                이해를 돕는 예시 (대학생 눈높이 비유)
              </div>
              <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                {unit.concreteExample.comprehensionAid}
              </p>
            </div>
          </section>

          {/* 5. 관련 개념 */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-slate-900">
                5. 관련 개념 및 개념 카드 바로가기
              </div>
              <span className="text-xs text-slate-400">
                카드를 누르면 개념 정의로 이동합니다
              </span>
            </div>

            {resolvedConcepts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resolvedConcepts.map(c => (
                  <div
                    key={c.id}
                    onClick={() => onNavigateToConcept(c.id)}
                    className="p-3 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-lg cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2855D9]">
                        {c.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2855D9] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {c.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                이 단원에 직접 매핑된 별도 개념 카드가 없습니다.
              </p>
            )}
          </section>
        </div>
      ) : (
        /* Edit Form */
        <form onSubmit={handleSaveEdit} className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                학습 내용 직접 편집
              </h2>
              <p className="text-xs text-slate-500">
                수정 후 저장하면 본문과 검색 결과에 즉시 반영됩니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#2855D9] hover:bg-blue-700 rounded-md transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                저장하기
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              단원 제목
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
            />
          </div>

          {/* Learning Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              1. 학습 목표
            </label>
            <textarea
              rows={2}
              value={editLearningGoal}
              onChange={e => setEditLearningGoal(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
            />
          </div>

          {/* Core Concepts */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              2. 핵심 개념 키워드 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={editCoreConcepts}
              onChange={e => setEditCoreConcepts(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
              placeholder="예: LLM, 토큰, 트랜스포머"
            />
          </div>

          {/* Easy Explanation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              3. 쉬운 설명 (대학생 눈높이 설명)
            </label>
            <textarea
              rows={6}
              value={editEasyExplanation}
              onChange={e => setEditEasyExplanation(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9] leading-relaxed"
            />
          </div>

          {/* Concrete Examples */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              4. 구체적인 예시 구성
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                자료 원문 수록 예시
              </label>
              <textarea
                rows={3}
                value={editFromMaterial}
                onChange={e => setEditFromMaterial(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                이해를 돕는 예시 (비유 및 추가 상황)
              </label>
              <textarea
                rows={3}
                value={editComprehensionAid}
                onChange={e => setEditComprehensionAid(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2855D9]"
              />
            </div>
          </div>

          {/* Footer Save & Cancel */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#2855D9] hover:bg-blue-700 rounded-md transition-colors shadow-xs"
            >
              수정 내용 저장
            </button>
          </div>
        </form>
      )}

      {/* Prev / Next Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-200">
        {prevUnit ? (
          <button
            onClick={() => onSelectUnit(prevUnit.id)}
            className="flex items-center gap-2 text-left p-3 rounded-lg hover:bg-slate-100 transition-colors group max-w-[45%]"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-700 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                이전 주제
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-[#2855D9]">
                {prevUnit.title}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextUnit ? (
          <button
            onClick={() => onSelectUnit(nextUnit.id)}
            className="flex items-center justify-end gap-2 text-right p-3 rounded-lg hover:bg-slate-100 transition-colors group max-w-[45%]"
          >
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                다음 주제
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-[#2855D9]">
                {nextUnit.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 shrink-0" />
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Original Comparison Modal */}
      {showOriginalModal && unit.originalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-600" />
                  PDF 원본 내용 vs 현재 수정 내용 비교
                </h3>
                <p className="text-xs text-slate-500">
                  {unit.pdfPages}
                </p>
              </div>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Original */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-600 block border-b border-slate-200 pb-1">
                    초기 원본 설명 (PDF 기반)
                  </span>
                  <div>
                    <strong className="text-xs text-slate-500 block">단원 제목</strong>
                    <p className="font-semibold text-slate-800">{unit.originalContent.title}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-slate-500 block">학습 목표</strong>
                    <p className="text-slate-700">{unit.originalContent.learningGoal}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-slate-500 block">쉬운 설명</strong>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line text-xs">
                      {unit.originalContent.easyExplanation}
                    </p>
                  </div>
                </div>

                {/* Right: Current Edited */}
                <div className="p-4 bg-blue-50/40 rounded-lg border border-blue-200 space-y-3">
                  <span className="text-xs font-bold text-[#2855D9] block border-b border-blue-200 pb-1">
                    사용자 현재 수정본
                  </span>
                  <div>
                    <strong className="text-xs text-blue-600 block">단원 제목</strong>
                    <p className="font-semibold text-slate-800">{unit.title}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-blue-600 block">학습 목표</strong>
                    <p className="text-slate-700">{unit.learningGoal}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-blue-600 block">쉬운 설명</strong>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line text-xs">
                      {unit.easyExplanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm('원래 내용으로 복원하시겠습니까? 현재 수정한 내용이 지워집니다.')) {
                    onRevertUnit(unit.id);
                    setShowOriginalModal(false);
                  }
                }}
                className="px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 border border-rose-300 rounded-md transition-colors"
              >
                원래 내용으로 복원하기
              </button>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
