/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { PptxParserService } from '../services/pptxParser';
import { ParsedSlide, StudyUnit } from '../types/curriculum';
import {
  FileUp,
  X,
  Upload,
  AlertCircle,
  CheckCircle2,
  FileText,
  CheckSquare,
  Square,
  HelpCircle
} from 'lucide-react';

interface PptxImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportUnits: (newUnits: StudyUnit[]) => void;
  existingSessionsCount: number;
}

export const PptxImportModal: React.FC<PptxImportModalProps> = ({
  isOpen,
  onClose,
  onImportUnits,
  existingSessionsCount,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedSlides, setParsedSlides] = useState<ParsedSlide[]>([]);
  const [selectedSlideIndices, setSelectedSlideIndices] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [targetSessionNumber, setTargetSessionNumber] = useState<number>(existingSessionsCount + 1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const slides = await PptxParserService.parsePptx(selectedFile);
      setParsedSlides(slides);

      // Select all slides by default
      const initialSelection: Record<number, boolean> = {};
      slides.forEach((_, idx) => {
        initialSelection[idx] = true;
      });
      setSelectedSlideIndices(initialSelection);
    } catch (err: unknown) {
      console.error('PPTX parse error:', err);
      const msg = err instanceof Error ? err.message : 'PPTX 파일을 읽는 중 알 수 없는 오류가 발생했습니다.';
      setErrorMessage(msg);
      setParsedSlides([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSlide = (index: number) => {
    setSelectedSlideIndices(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelectAll = (select: boolean) => {
    const updated: Record<number, boolean> = {};
    parsedSlides.forEach((_, idx) => {
      updated[idx] = select;
    });
    setSelectedSlideIndices(updated);
  };

  const handleConfirmImport = () => {
    const chosen = parsedSlides.filter((_, idx) => selectedSlideIndices[idx]);
    if (chosen.length === 0) {
      alert('학습 내용에 추가할 슬라이드를 하나 이상 선택해 주세요.');
      return;
    }

    const newUnits: StudyUnit[] = chosen.map((slide, i) => {
      const unitId = `unit-custom-${Date.now()}-${i + 1}`;
      return {
        id: unitId,
        sessionNumber: targetSessionNumber,
        sessionTitle: `${targetSessionNumber}차시: 사용자 추가 PPT 자료 (${file?.name || 'PPTX'})`,
        unitNumber: i + 1,
        title: slide.title || `슬라이드 ${slide.slideNumber}`,
        pdfPages: `PPTX 슬라이드 ${slide.slideNumber}번`,
        pdfPageNumbers: [slide.slideNumber],
        learningGoal: `${file?.name} 슬라이드 ${slide.slideNumber}번 텍스트 내용 학습 및 복습`,
        coreConcepts: [slide.title || '추가 개념'],
        easyExplanation: slide.body
          ? slide.body
          : '슬라이드에서 추출된 본문 텍스트입니다. "학습 내용 직접 편집" 버튼을 눌러 설명을 자유롭게 덧붙여 보세요.',
        concreteExample: {
          fromMaterial: slide.rawText || '슬라이드 원문 텍스트가 추출되었습니다.',
          comprehensionAid: '[이해를 돕는 예시] 이 슬라이드와 관련된 전공 개념이나 실습 내용을 직접 편집하여 나만의 복습 노트를 완성해 보세요.',
        },
        relatedConceptIds: [],
        isUserAdded: true,
        sourceFileName: file?.name,
        sourceSlideIndex: slide.slideNumber,
        originalContent: {
          title: slide.title || `슬라이드 ${slide.slideNumber}`,
          learningGoal: `${file?.name} 슬라이드 ${slide.slideNumber}번 텍스트 내용 학습`,
          coreConcepts: [slide.title || '추가 개념'],
          easyExplanation: slide.body || slide.rawText,
          concreteExample: {
            fromMaterial: slide.rawText,
            comprehensionAid: '[이해를 돕는 예시] 직접 편집 가능한 초기 상태입니다.',
          },
        },
      };
    });

    onImportUnits(newUnits);
    onClose();
  };

  const selectedCount = Object.values(selectedSlideIndices).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                새로운 PPTX 강의자료 추가
              </h2>
              <p className="text-xs text-slate-500">
                .pptx 파일의 실제 텍스트를 슬라이드별로 추출하여 학습 내용에 추가합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* File Picker Zone */}
          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#2855D9] rounded-xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-blue-50/20 transition-colors"
            >
              <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="font-semibold text-slate-700 text-sm">
                클릭하여 .pptx 파일을 선택하세요
              </p>
              <p className="text-xs text-slate-400 mt-1">
                브라우저 내부에서 슬라이드 순서대로 텍스트를 직접 추출합니다.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pptx,.ppt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {file.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    크기: {(file.size / 1024).toFixed(1)} KB · 총 {parsedSlides.length}개 슬라이드 추출 완료
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setParsedSlides([]);
                  setErrorMessage(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1"
              >
                다른 파일 선택
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-12 text-center text-slate-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855D9] mb-3"></div>
              <p className="text-sm font-medium">PPTX 슬라이드 텍스트 추출 중...</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong className="block font-bold mb-1">파일을 읽지 못했습니다</strong>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Guidance Notice (Mandatory from prompt) */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>안내:</strong> 이미지 속 글자나 복잡한 수식·도표처럼 텍스트로 추출하지 못한 부분은 파워포인트 원본 확인이 필요합니다.
              <br />
              현재 과정은 <strong>슬라이드 실제 원문 텍스트 추출</strong>이며, AI가 임의로 내용을 요약하거나 지어내지 않습니다. 추가 후 제목과 설명을 직접 편집할 수 있습니다.
            </div>
          </div>

          {/* Slides Preview List */}
          {parsedSlides.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    추가할 슬라이드 선택 ({selectedCount}/{parsedSlides.length})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => handleSelectAll(true)}
                    className="text-[#2855D9] hover:underline"
                  >
                    전체 선택
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => handleSelectAll(false)}
                    className="text-slate-500 hover:underline"
                  >
                    전체 해제
                  </button>
                </div>
              </div>

              {/* Target Session Assignment */}
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  추가할 차시 번호:
                </span>
                <select
                  value={targetSessionNumber}
                  onChange={e => setTargetSessionNumber(Number(e.target.value))}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-medium text-slate-800 focus:outline-hidden"
                >
                  {[...Array(existingSessionsCount + 3)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}차시 {i + 1 > existingSessionsCount ? '(신규 차시)' : '(기존 차시에 추가)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slide items list */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {parsedSlides.map((slide, idx) => {
                  const isChecked = !!selectedSlideIndices[idx];
                  return (
                    <div
                      key={slide.slideNumber}
                      onClick={() => toggleSlide(idx)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-blue-300 bg-blue-50/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="mt-0.5 text-slate-600 hover:text-slate-900"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#2855D9]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              슬라이드 {slide.slideNumber}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {slide.title}
                            </h4>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-3 whitespace-pre-line leading-relaxed bg-white/70 p-2 rounded border border-slate-100">
                            {slide.body || slide.rawText || '(추출된 본문 텍스트 없음 - 제목만 포함됨)'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
          >
            취소
          </button>

          <button
            onClick={handleConfirmImport}
            disabled={parsedSlides.length === 0 || selectedCount === 0}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#2855D9] hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            선택한 {selectedCount}개 슬라이드 학습 내용에 추가
          </button>
        </div>

      </div>
    </div>
  );
};
