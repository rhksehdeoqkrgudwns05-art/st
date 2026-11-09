/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuestionType = 'multiple-choice' | 'ox';

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface QuizQuestion {
  id: string; // e.g. 'quiz-q1'
  questionNumber: number; // 1 to 12
  type: QuestionType;
  sessionNumber: number;
  linkedUnitId: string;
  linkedConceptId?: string;
  pdfCitation: string;
  
  question: string;
  options?: QuizOption[]; // For multiple-choice (length 4)
  correctAnswerId: string; // 'A' | 'B' | 'C' | 'D' for multiple-choice, 'O' | 'X' for OX
  correctedStatement?: string; // Corrected sentence when OX answer is 'X'
  
  explanation: string; // Detailed reason why the correct answer is right
  distractorExplanations?: Record<string, string>; // Explanation for each incorrect choice
  
  // Snapshot of curriculum basis to detect user edits in unit
  sourceSnapshot: {
    unitTitle: string;
    learningGoal: string;
  };
}

export interface QuizAttemptState {
  attemptId: string;
  startedAt: string;
  completedAt?: string;
  
  // Selected answers: questionId -> optionId ('A'|'B'|'C'|'D' or 'O'|'X')
  userAnswers: Record<string, string>;
  
  // Confirmed questions in this attempt
  confirmedQuestions: Record<string, boolean>;
  
  // Current active question index in quiz view (0 to N-1)
  currentQuestionIndex: number;
  
  // Whether the attempt has finished and is viewing results
  isFinished: boolean;
}

export interface QuestionValidationResult {
  question: QuizQuestion;
  isValid: boolean;
  reason?: string;
}
