/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { QuizQuestion, QuizAttemptState, QuestionValidationResult } from '../types/quiz';
import { StudyUnit, ConceptItem } from '../types/curriculum';
import { StorageService } from '../services/storageService';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  Award,
  ChevronRight,
  Filter,
  Check,
  X,
  ExternalLink,
  Info
} from 'lucide-react';

interface QuizChallengeViewProps {
  questions: QuizQuestion[];
  units: StudyUnit[];
  concepts: ConceptItem[];
  onNavigateToUnit: (unitId: string) => void;
  onNavigateToConcept: (conceptId: string) => void;
}

export const QuizChallengeView: React.FC<QuizChallengeViewProps> = ({
  questions,
  units,
  concepts,
  onNavigateToUnit,
  onNavigateToConcept,
}) => {
  // Validate questions against current units to detect if any unit changed
  const validatedQuestions: QuestionValidationResult[] = useMemo(() => {
    return questions.map(q => {
      const unit = units.find(u => u.id === q.linkedUnitId);
      if (!unit) {
        return {
          question: q,
          isValid: false,
          reason: '출제 근거가 되는 학습 단원을 찾을 수 없습니다.',
        };
      }

      // If user modified the title or learning goal significantly
      if (unit.isUserEdited) {
        const titleChanged = unit.title.trim() !== q.sourceSnapshot.unitTitle.trim();
        const goalChanged = unit.learningGoal.trim() !== q.sourceSnapshot.learningGoal.trim();
        if (titleChanged || goalChanged) {
          return {
            question: q,
            isValid: false,
            reason: `출제 근거 단원(「${unit.title}」)의 학습 내용이 직접 편집되어 검토가 필요합니다.`,
          };
        }
      }

      return {
        question: q,
        isValid: true,
      };
    });
  }, [questions, units]);

  const activeQuestions = useMemo(() => {
    return validatedQuestions.filter(v => v.isValid).map(v => v.question);
  }, [validatedQuestions]);

  const excludedQuestions = useMemo(() => {
    return validatedQuestions.filter(v => !v.isValid);
  }, [validatedQuestions]);

  // Quiz Attempt state
  const [attempt, setAttempt] = useState<QuizAttemptState | null>(() => {
    return StorageService.getQuizAttempt();
  });

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    const saved = StorageService.getQuizAttempt();
    return !!saved;
  });

  // Filter for results review
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');

  // Detect mid-quiz invalidation
  const isMidQuizInvalidated = useMemo(() => {
    if (!attempt) return false;
    // Check if any answered question has now become excluded
    return excludedQuestions.some(ex => !!attempt.userAnswers[ex.question.id]);
  }, [attempt, excludedQuestions]);

  // Save attempt to localStorage on every state change
  useEffect(() => {
    if (attempt) {
      StorageService.saveQuizAttempt(attempt);
    }
  }, [attempt]);

  // Start new attempt
  const handleStartQuiz = () => {
    const newAttempt: QuizAttemptState = {
      attemptId: `attempt-${Date.now()}`,
      startedAt: new Date().toISOString(),
      userAnswers: {},
      confirmedQuestions: {},
      currentQuestionIndex: 0,
      isFinished: false,
    };
    setAttempt(newAttempt);
    setHasStarted(true);
    StorageService.saveQuizAttempt(newAttempt);
  };

  // Reset attempt (다시 풀기)
  const handleResetQuiz = () => {
    StorageService.clearQuizAttempt();
    setAttempt(null);
    setHasStarted(false);
    setReviewFilter('all');
  };

  // Select an option
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (!attempt) return;
    // Disallow changing if already confirmed
    if (attempt.confirmedQuestions[questionId]) return;

    setAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: optionId,
        },
      };
    });
  };

  // Confirm and grade current question
  const handleConfirmAnswer = (questionId: string) => {
    if (!attempt) return;
    const currentAnswer = attempt.userAnswers[questionId];
    if (currentAnswer === undefined || currentAnswer === null) return;

    setAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        confirmedQuestions: {
          ...prev.confirmedQuestions,
          [questionId]: true,
        },
      };
    });
  };

  // Navigation between questions
  const handleGoNext = () => {
    if (!attempt) return;
    if (attempt.currentQuestionIndex < activeQuestions.length - 1) {
      setAttempt(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        };
      });
    }
  };

  const handleGoPrev = () => {
    if (!attempt) return;
    if (attempt.currentQuestionIndex > 0) {
      setAttempt(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      });
    }
  };

  // Finish quiz and view results
  const handleFinishQuiz = () => {
    if (!attempt) return;
    setAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isFinished: true,
        completedAt: new Date().toISOString(),
      };
    });
  };

  // Calculate score statistics
  const scoreStats = useMemo(() => {
    if (!attempt) return { correctCount: 0, incorrectCount: 0, total: 0, score: 0 };
    const total = activeQuestions.length;
    let correctCount = 0;

    for (const q of activeQuestions) {
      if (attempt.confirmedQuestions[q.id]) {
        if (attempt.userAnswers[q.id] === q.correctAnswerId) {
          correctCount++;
        }
      }
    }

    const incorrectCount = total - correctCount;
    // Score rounded to 1 decimal place: (correct / total) * 100
    const rawScore = total > 0 ? (correctCount / total) * 100 : 0;
    const score = Math.round(rawScore * 10) / 10;

    return {
      correctCount,
      incorrectCount,
      total,
      score,
    };
  }, [attempt, activeQuestions]);

  // Current question in view
  const currentQIndex = attempt?.currentQuestionIndex ?? 0;
  const currentQ = activeQuestions[currentQIndex];
  const isCurrentConfirmed = currentQ ? !!attempt?.confirmedQuestions[currentQ.id] : false;
  const currentAnswer = currentQ ? attempt?.userAnswers[currentQ.id] : undefined;
  const allQuestionsConfirmed = activeQuestions.every(q => !!attempt?.confirmedQuestions[q.id]);

  // ================= VIEW 1: START SCREEN =================
  if (!hasStarted || !attempt) {
    const mcCount = activeQuestions.filter(q => q.type === 'multiple-choice').length;
    const oxCount = activeQuestions.filter(q => q.type === 'ox').length;

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-blue-50 text-[#2855D9] rounded-2xl mx-auto flex items-center justify-center shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              전공 복습 퀴즈 챌린지
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              1~7차시 강의자료의 핵심 개념을 엄밀한 4지선다 객관식 및 OX 퀴즈로 복습하고 나의 이해도를 점검합니다.
            </p>
          </div>

          {/* Quiz Details Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-500 block">출제 범위</span>
              <strong className="text-base font-bold text-slate-900 mt-1 block">1~7차시 전 단원</strong>
              <span className="text-[11px] text-slate-400">PDF 통합본 146쪽 연계</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-500 block">총 문항 수</span>
              <strong className="text-base font-bold text-[#2855D9] mt-1 block">
                {activeQuestions.length}문항
              </strong>
              <span className="text-[11px] text-slate-500">
                객관식 {mcCount}개 · OX {oxCount}개
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-500 block">채점 기준</span>
              <strong className="text-base font-bold text-slate-900 mt-1 block">100점 만점</strong>
              <span className="text-[11px] text-slate-400">문항당 균등 배점</span>
            </div>
          </div>

          {/* Excluded Questions Notice (If user modified matching units) */}
          {excludedQuestions.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>출제 기준 검토 필요 안내 ({excludedQuestions.length}문항 제외됨)</span>
              </div>
              <p className="leading-relaxed text-amber-800">
                사용자가 직접 수정한 학습 단원과 근거 기준이 달라진 {excludedQuestions.length}개 문항은 공정한 채점을 위해 이번 퀴즈 출제 목록에서 제외되었습니다. 실제 출제 가능한 {activeQuestions.length}문항을 기준으로 100점 만점 점수가 계산됩니다.
              </p>
            </div>
          )}

          {/* Rules & Guidelines */}
          <div className="border-t border-slate-100 pt-6 space-y-3 text-xs sm:text-sm text-slate-600">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-500" />
              진행 및 채점 규칙
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 pl-1">
              <li>한 화면에 한 문제씩 출제되며, 답을 선택한 후 <strong>[정답 확인]</strong>을 눌러 채점합니다.</li>
              <li>정답을 확인하기 전에는 선택을 언제든 자유롭게 바꿀 수 있습니다.</li>
              <li>정답 확인 시 정답 여부, 상세 해설, 오답 선택지별 오류 분석이 함께 제공됩니다.</li>
              <li>확인된 답안과 진행 상태는 브라우저를 새로고침해도 안전하게 유지됩니다.</li>
            </ul>
          </div>

          {/* Start CTA */}
          <div className="pt-2 text-center">
            {activeQuestions.length > 0 ? (
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2855D9] hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mx-auto"
              >
                <span>퀴즈 시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium">
                출제 가능한 문항이 없습니다. 학습 단원 원본 내용을 복원한 후 다시 시도해 주세요.
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // ================= VIEW 2: MID-QUIZ INVALIDATION WARNING =================
  if (isMidQuizInvalidated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 inline-block">
          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold">풀이 도중 학습 내용이 수정되었습니다</h2>
          <p className="text-xs sm:text-sm text-amber-800 mt-2 max-w-md mx-auto leading-relaxed">
            퀴즈를 풀던 도중 출제 근거가 되는 단원의 본문이 수정되었습니다. 변경 전 기준의 점수를 확정하지 않고 공정한 채점을 위해 퀴즈를 다시 시작해 주세요.
          </p>
          <div className="mt-5">
            <button
              onClick={handleResetQuiz}
              className="px-5 py-2.5 bg-[#2855D9] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              퀴즈 새로 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW 3: RESULTS SCREEN =================
  if (attempt.isFinished) {
    const { correctCount, incorrectCount, total, score } = scoreStats;

    // Filter review questions
    const reviewQuestions = activeQuestions.filter(q => {
      if (reviewFilter === 'incorrect') {
        return attempt.userAnswers[q.id] !== q.correctAnswerId;
      }
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Score Card Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 text-[#2855D9]">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              최종 퀴즈 채점 결과
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {score}
              <span className="text-xl sm:text-2xl font-bold text-slate-400 ml-1">/ 100점</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
              <span className="text-xs text-emerald-700 font-semibold block">정답</span>
              <strong className="text-xl font-bold text-emerald-800">{correctCount}개</strong>
            </div>

            <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl">
              <span className="text-xs text-rose-700 font-semibold block">오답</span>
              <strong className="text-xl font-bold text-rose-800">{incorrectCount}개</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-semibold block">실제 출제</span>
              <strong className="text-xl font-bold text-slate-800">{total}문항</strong>
            </div>
          </div>

          {/* Formula calculation note */}
          <p className="text-xs text-slate-400 font-mono">
            환산 산식: ({correctCount} ÷ {total}) × 100 = {score}점 (소수점 첫째 자리 반올림)
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>퀴즈 다시 풀기</span>
            </button>
          </div>
        </div>

        {/* Question Review Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                문항별 답안 및 해설 복습
              </h2>
              <p className="text-xs text-slate-500">
                각 문제의 선택 답안과 정답, 오답 분석을 확인하고 관련 학습 본문으로 이동할 수 있습니다.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체 문항 ({total})
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  reviewFilter === 'incorrect'
                    ? 'bg-white text-rose-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                틀린 문제만 ({incorrectCount})
              </button>
            </div>
          </div>

          {/* Review List */}
          {reviewQuestions.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <span>틀린 문제가 없습니다! 모든 문제를 정확히 맞혔습니다.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewQuestions.map(q => {
                const userAns = attempt.userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswerId;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border p-5 shadow-xs space-y-4 transition-colors ${
                      isCorrect ? 'border-slate-200' : 'border-rose-200 bg-rose-50/10'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500">
                          문항 {q.questionNumber}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="font-medium text-[#2855D9] bg-blue-50 px-2 py-0.5 rounded">
                          {q.type === 'multiple-choice' ? '4지선다 객관식' : 'OX 퀴즈'}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">{q.pdfCitation}</span>
                      </div>

                      {/* Judgement label (both color & text) */}
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2.5 py-0.5 rounded text-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>정답 (1점 획득)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 font-bold px-2.5 py-0.5 rounded text-xs">
                          <X className="w-3.5 h-3.5" />
                          <span>오답 (0점)</span>
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>

                    {/* Answer summary */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-wrap items-center gap-4">
                      <div>
                        <span className="text-slate-500">내가 고른 답: </span>
                        <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                          {userAns || '(미선택)'}
                          {q.type === 'multiple-choice' && userAns && (
                            <span className="font-normal text-slate-600 ml-1">
                              ({q.options?.find(o => o.id === userAns)?.text.slice(0, 30)}...)
                            </span>
                          )}
                        </strong>
                      </div>

                      <div>
                        <span className="text-slate-500">실제 정답: </span>
                        <strong className="text-[#2855D9]">
                          {q.correctAnswerId}
                          {q.type === 'multiple-choice' && (
                            <span className="font-normal text-slate-600 ml-1">
                              ({q.options?.find(o => o.id === q.correctAnswerId)?.text.slice(0, 30)}...)
                            </span>
                          )}
                        </strong>
                      </div>
                    </div>

                    {/* Corrected Statement for OX 'X' */}
                    {q.type === 'ox' && q.correctAnswerId === 'X' && q.correctedStatement && (
                      <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs">
                        <strong className="text-blue-900 block mb-0.5">올바르게 고친 문장:</strong>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {q.correctedStatement}
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="space-y-2 text-xs leading-relaxed">
                      <div>
                        <strong className="text-slate-700 block mb-0.5">핵심 해설:</strong>
                        <p className="text-slate-700 bg-white p-3 rounded border border-slate-200">
                          {q.explanation}
                        </p>
                      </div>

                      {/* Distractor Explanations if user was wrong in multiple choice */}
                      {q.type === 'multiple-choice' && !isCorrect && userAns && q.distractorExplanations?.[userAns] && (
                        <div className="p-3 bg-rose-50/50 border border-rose-200 rounded text-rose-900">
                          <strong className="block mb-0.5">선택한 오답({userAns}) 분석:</strong>
                          <p>{q.distractorExplanations[userAns]}</p>
                        </div>
                      )}
                    </div>

                    {/* Link to study content */}
                    <div className="pt-1 flex items-center justify-end">
                      <button
                        onClick={() => onNavigateToUnit(q.linkedUnitId)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#2855D9] hover:underline"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>관련 학습 내용 읽기</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    );
  }

  // ================= VIEW 4: ACTIVE QUESTION SCREEN =================
  if (!currentQ) {
    return (
      <div className="p-12 text-center text-slate-500">
        문제를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      
      {/* Question Progress Header */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-[#2855D9]">
            문항 {currentQIndex + 1} / {activeQuestions.length}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-600 font-medium">
            {currentQ.type === 'multiple-choice' ? '4지선다 객관식' : 'OX 퀴즈'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500">{currentQ.pdfCitation}</span>
        </div>

        {/* Jump navigation dots */}
        <div className="flex items-center gap-1">
          {activeQuestions.map((q, idx) => {
            const isConfirmed = !!attempt.confirmedQuestions[q.id];
            const isCurrent = idx === currentQIndex;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setAttempt(prev => {
                    if (!prev) return null;
                    return { ...prev, currentQuestionIndex: idx };
                  });
                }}
                className={`w-6 h-6 rounded text-[11px] font-mono flex items-center justify-center transition-colors ${
                  isCurrent
                    ? 'bg-[#2855D9] text-white font-bold'
                    : isConfirmed
                    ? 'bg-slate-200 text-slate-700 font-medium'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={`문항 ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Question Text */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Q{currentQ.questionNumber}.
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options Selection */}
        {currentQ.type === 'multiple-choice' && currentQ.options ? (
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = currentAnswer === opt.id;
              const isConfirmed = isCurrentConfirmed;
              const isCorrectOpt = opt.id === currentQ.correctAnswerId;

              // Border and bg classes based on confirmation
              let cardClass = 'border-slate-200 bg-white hover:border-slate-300';
              if (!isConfirmed) {
                if (isSelected) {
                  cardClass = 'border-[#2855D9] bg-blue-50/40 ring-2 ring-blue-100 font-medium';
                }
              } else {
                if (isCorrectOpt) {
                  cardClass = 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-200';
                } else if (isSelected && !isCorrectOpt) {
                  cardClass = 'border-rose-400 bg-rose-50/50 ring-1 ring-rose-200';
                } else {
                  cardClass = 'border-slate-200 opacity-60 bg-slate-50/50';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  disabled={isConfirmed}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${cardClass} ${
                    isConfirmed ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  {/* Badge */}
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-colors ${
                      isConfirmed && isCorrectOpt
                        ? 'bg-emerald-600 text-white'
                        : isConfirmed && isSelected && !isCorrectOpt
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-[#2855D9] text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="text-sm leading-relaxed text-slate-800">
                      {opt.text}
                    </span>
                  </div>

                  {/* Status Indicator text badge */}
                  {isConfirmed && isCorrectOpt && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      정답
                    </span>
                  )}
                  {isConfirmed && isSelected && !isCorrectOpt && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      내 오답
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* OX Buttons */
          <div className="grid grid-cols-2 gap-4">
            {(['O', 'X'] as const).map(choice => {
              const isSelected = currentAnswer === choice;
              const isConfirmed = isCurrentConfirmed;
              const isCorrectChoice = choice === currentQ.correctAnswerId;

              let btnClass = 'border-slate-200 bg-white hover:border-slate-300';
              if (!isConfirmed) {
                if (isSelected) {
                  btnClass = 'border-[#2855D9] bg-blue-50/50 ring-2 ring-blue-100';
                }
              } else {
                if (isCorrectChoice) {
                  btnClass = 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-200';
                } else if (isSelected && !isCorrectChoice) {
                  btnClass = 'border-rose-400 bg-rose-50/60 ring-1 ring-rose-200';
                } else {
                  btnClass = 'border-slate-200 opacity-60 bg-slate-50/50';
                }
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleSelectOption(currentQ.id, choice)}
                  disabled={isConfirmed}
                  className={`p-6 rounded-xl border text-center transition-all ${btnClass} ${
                    isConfirmed ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div
                    className={`text-4xl font-black mb-1 ${
                      isConfirmed && isCorrectChoice
                        ? 'text-emerald-700'
                        : isConfirmed && isSelected && !isCorrectChoice
                        ? 'text-rose-700'
                        : isSelected
                        ? 'text-[#2855D9]'
                        : 'text-slate-700'
                    }`}
                  >
                    {choice}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {choice === 'O' ? '참 (그렇다)' : '거짓 (아니다)'}
                  </span>

                  {isConfirmed && isCorrectChoice && (
                    <div className="mt-2 text-xs font-bold text-emerald-700">
                      [정답]
                    </div>
                  )}
                  {isConfirmed && isSelected && !isCorrectChoice && (
                    <div className="mt-2 text-xs font-bold text-rose-700">
                      [내가 고른 오답]
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Check Answer Button (Before confirmation) */}
        {!isCurrentConfirmed ? (
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              {currentAnswer !== undefined && currentAnswer !== null
                ? '정답 확인을 누르면 채점 결과와 해설이 열립니다.'
                : '답을 선택해 주세요.'}
            </span>

            <button
              onClick={() => handleConfirmAnswer(currentQ.id)}
              disabled={currentAnswer === undefined || currentAnswer === null}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#2855D9] hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs"
            >
              정답 확인
            </button>
          </div>
        ) : (
          /* Explanation Block (After confirmation) */
          <div className="pt-4 border-t border-slate-200 space-y-4 animate-fadeIn">
            {/* Judgement Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                currentAnswer === currentQ.correctAnswerId
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              {currentAnswer === currentQ.correctAnswerId ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm">
                <div className="font-bold mb-0.5">
                  {currentAnswer === currentQ.correctAnswerId
                    ? '정답입니다! (+1점)'
                    : `오답입니다. (정답: ${currentQ.correctAnswerId})`}
                </div>
                <div className="text-xs opacity-90">
                  {currentAnswer === currentQ.correctAnswerId
                    ? '해당 개념의 핵심 원리를 정확히 파악하셨습니다.'
                    : '아래 핵심 해설과 오답 분석을 확인하여 개념을 복습해 보세요.'}
                </div>
              </div>
            </div>

            {/* OX Correction */}
            {currentQ.type === 'ox' && currentQ.correctAnswerId === 'X' && currentQ.correctedStatement && (
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs sm:text-sm">
                <strong className="text-blue-900 block mb-1">올바르게 고친 문장:</strong>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {currentQ.correctedStatement}
                </p>
              </div>
            )}

            {/* Detailed Explanation */}
            <div className="space-y-2 text-xs sm:text-sm">
              <strong className="text-slate-800 block">핵심 해설:</strong>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentQ.explanation}
              </p>
            </div>

            {/* Distractor explanations if user made mistake */}
            {currentQ.type === 'multiple-choice' &&
              currentAnswer &&
              currentAnswer !== currentQ.correctAnswerId &&
              currentQ.distractorExplanations?.[currentAnswer] && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong className="block mb-1 font-bold">내가 고른 보기({currentAnswer})는 왜 오답일까요?</strong>
                  <p className="leading-relaxed">{currentQ.distractorExplanations[currentAnswer]}</p>
                </div>
              )}

            {/* Link to study content */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">출제 근거: {currentQ.pdfCitation}</span>
              <button
                onClick={() => onNavigateToUnit(currentQ.linkedUnitId)}
                className="flex items-center gap-1 font-semibold text-[#2855D9] hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>관련 학습 내용 읽기</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Prev / Next & Results Footer Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handleGoPrev}
          disabled={currentQIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>이전 문제</span>
        </button>

        {currentQIndex < activeQuestions.length - 1 ? (
          <button
            onClick={handleGoNext}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <span>다음 문제</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinishQuiz}
            disabled={!allQuestionsConfirmed}
            className="flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs"
          >
            <Award className="w-4 h-4" />
            <span>최종 결과 보기</span>
          </button>
        )}
      </div>

    </div>
  );
};
