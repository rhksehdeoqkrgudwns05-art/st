/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RelatedConcept {
  id: string;
  name: string;
  shortDesc: string;
}

export interface StudyUnit {
  id: string; // Unique permanent ID (e.g., 'unit-1-1', 'unit-2-1')
  sessionNumber: number; // 1 to 7 (or 8+ for user added)
  sessionTitle: string; // e.g., '1차시: 대화하며 코딩하는, 바이브코딩 첫걸음'
  unitNumber: number; // 1, 2, 3...
  title: string;
  pdfPages: string; // e.g., '1차시 · PDF 2~5쪽'
  pdfPageNumbers: number[]; // [2, 3, 4, 5]
  
  learningGoal: string; // 학습 목표
  coreConcepts: string[]; // 핵심 개념 키워드
  easyExplanation: string; // 쉬운 설명
  concreteExample: {
    fromMaterial: string; // 자료 원문 기반 예시
    comprehensionAid: string; // 이해를 돕는 예시
  };
  relatedConceptIds: string[]; // references ConceptItem ids
  
  // Edit & versioning tracking
  originalContent?: {
    title: string;
    learningGoal: string;
    coreConcepts: string[];
    easyExplanation: string;
    concreteExample: {
      fromMaterial: string;
      comprehensionAid: string;
    };
  };
  isUserEdited?: boolean;
  lastEditedAt?: string;
  isUserAdded?: boolean; // If added via PPTX
  sourceFileName?: string; // PPTX source if applicable
  sourceSlideIndex?: number;
}

export interface ConceptItem {
  id: string; // e.g., 'concept-llm', 'concept-vibe-coding'
  name: string;
  sessions: number[]; // which sessions it appears in, e.g. [1, 3, 6]
  primarySession: number;
  explanation: string;
  example: string;
  linkedUnitIds: string[]; // units covering this concept
  
  // Original tracking for concept editing
  originalExplanation?: string;
  originalExample?: string;
  isUserEdited?: boolean;
  lastEditedAt?: string;
}

export interface SessionMeta {
  sessionNumber: number;
  title: string;
  pdfPageRange: string;
  unitCount: number;
}

export interface ParsedSlide {
  slideNumber: number;
  title: string;
  body: string;
  rawText: string;
}
