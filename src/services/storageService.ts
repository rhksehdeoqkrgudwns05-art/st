/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyUnit, ConceptItem } from '../types/curriculum';
import { QuizAttemptState } from '../types/quiz';
import { INITIAL_STUDY_UNITS } from '../data/initialCurriculum';
import { INITIAL_CONCEPTS } from '../data/initialConcepts';

const UNITS_STORAGE_KEY = 'major_study_helper_units_v1';
const CONCEPTS_STORAGE_KEY = 'major_study_helper_concepts_v1';
const QUIZ_ATTEMPT_STORAGE_KEY = 'major_study_helper_quiz_attempt_v1';

export class StorageService {
  /**
   * Load all units from localStorage. If none exist, populate with initial units.
   */
  static getUnits(): StudyUnit[] {
    try {
      const data = localStorage.getItem(UNITS_STORAGE_KEY);
      if (!data) {
        this.saveUnits(INITIAL_STUDY_UNITS);
        return INITIAL_STUDY_UNITS;
      }
      return JSON.parse(data) as StudyUnit[];
    } catch (err) {
      console.error('Failed to load study units from localStorage:', err);
      return INITIAL_STUDY_UNITS;
    }
  }

  /**
   * Save study units to localStorage.
   */
  static saveUnits(units: StudyUnit[]): boolean {
    try {
      localStorage.setItem(UNITS_STORAGE_KEY, JSON.stringify(units));
      return true;
    } catch (err) {
      console.error('Failed to save study units to localStorage:', err);
      return false;
    }
  }

  /**
   * Load all concepts from localStorage. If none exist, populate with initial concepts.
   */
  static getConcepts(): ConceptItem[] {
    try {
      const data = localStorage.getItem(CONCEPTS_STORAGE_KEY);
      if (!data) {
        this.saveConcepts(INITIAL_CONCEPTS);
        return INITIAL_CONCEPTS;
      }
      return JSON.parse(data) as ConceptItem[];
    } catch (err) {
      console.error('Failed to load concepts from localStorage:', err);
      return INITIAL_CONCEPTS;
    }
  }

  /**
   * Save concepts to localStorage.
   */
  static saveConcepts(concepts: ConceptItem[]): boolean {
    try {
      localStorage.setItem(CONCEPTS_STORAGE_KEY, JSON.stringify(concepts));
      return true;
    } catch (err) {
      console.error('Failed to save concepts to localStorage:', err);
      return false;
    }
  }

  /**
   * Update a specific study unit. Preserves original content if not already saved.
   */
  static updateUnit(
    unitId: string,
    updates: {
      title: string;
      learningGoal: string;
      coreConcepts: string[];
      easyExplanation: string;
      fromMaterial: string;
      comprehensionAid: string;
    }
  ): { success: boolean; updatedUnit?: StudyUnit } {
    const units = this.getUnits();
    const index = units.findIndex(u => u.id === unitId);
    if (index === -1) return { success: false };

    const target = units[index];

    // Store original if first time editing
    const originalContent = target.originalContent || {
      title: target.title,
      learningGoal: target.learningGoal,
      coreConcepts: [...target.coreConcepts],
      easyExplanation: target.easyExplanation,
      concreteExample: { ...target.concreteExample }
    };

    const updatedUnit: StudyUnit = {
      ...target,
      title: updates.title.trim(),
      learningGoal: updates.learningGoal.trim(),
      coreConcepts: updates.coreConcepts,
      easyExplanation: updates.easyExplanation.trim(),
      concreteExample: {
        fromMaterial: updates.fromMaterial.trim(),
        comprehensionAid: updates.comprehensionAid.trim()
      },
      originalContent,
      isUserEdited: true,
      lastEditedAt: new Date().toISOString()
    };

    units[index] = updatedUnit;
    const saved = this.saveUnits(units);
    return { success: saved, updatedUnit };
  }

  /**
   * Revert a unit back to its original PDF content
   */
  static revertUnit(unitId: string): { success: boolean; revertedUnit?: StudyUnit } {
    const units = this.getUnits();
    const index = units.findIndex(u => u.id === unitId);
    if (index === -1) return { success: false };

    const target = units[index];
    if (!target.originalContent) {
      // Find from initial curriculum if available
      const initial = INITIAL_STUDY_UNITS.find(u => u.id === unitId);
      if (initial) {
        units[index] = { ...initial, isUserEdited: false };
        const saved = this.saveUnits(units);
        return { success: saved, revertedUnit: units[index] };
      }
      return { success: false };
    }

    const revertedUnit: StudyUnit = {
      ...target,
      title: target.originalContent.title,
      learningGoal: target.originalContent.learningGoal,
      coreConcepts: [...target.originalContent.coreConcepts],
      easyExplanation: target.originalContent.easyExplanation,
      concreteExample: { ...target.originalContent.concreteExample },
      isUserEdited: false,
      lastEditedAt: undefined
    };

    units[index] = revertedUnit;
    const saved = this.saveUnits(units);
    return { success: saved, revertedUnit };
  }

  /**
   * Update a concept's explanation and example.
   */
  static updateConcept(
    conceptId: string,
    updates: { explanation: string; example: string }
  ): { success: boolean; updatedConcept?: ConceptItem } {
    const concepts = this.getConcepts();
    const index = concepts.findIndex(c => c.id === conceptId);
    if (index === -1) return { success: false };

    const target = concepts[index];
    const originalExplanation = target.originalExplanation ?? target.explanation;
    const originalExample = target.originalExample ?? target.example;

    const updatedConcept: ConceptItem = {
      ...target,
      explanation: updates.explanation.trim(),
      example: updates.example.trim(),
      originalExplanation,
      originalExample,
      isUserEdited: true,
      lastEditedAt: new Date().toISOString()
    };

    concepts[index] = updatedConcept;
    const saved = this.saveConcepts(concepts);
    return { success: saved, updatedConcept };
  }

  /**
   * Revert a concept back to its original definition
   */
  static revertConcept(conceptId: string): { success: boolean; revertedConcept?: ConceptItem } {
    const concepts = this.getConcepts();
    const index = concepts.findIndex(c => c.id === conceptId);
    if (index === -1) return { success: false };

    const target = concepts[index];
    const initial = INITIAL_CONCEPTS.find(c => c.id === conceptId);

    const revertedConcept: ConceptItem = {
      ...target,
      explanation: initial ? initial.explanation : (target.originalExplanation || target.explanation),
      example: initial ? initial.example : (target.originalExample || target.example),
      isUserEdited: false,
      lastEditedAt: undefined
    };

    concepts[index] = revertedConcept;
    const saved = this.saveConcepts(concepts);
    return { success: saved, revertedConcept };
  }

  /**
   * Add new units imported from PPTX slides
   */
  static addImportedUnits(newUnits: StudyUnit[]): boolean {
    const units = this.getUnits();
    const combined = [...units, ...newUnits];
    return this.saveUnits(combined);
  }

  /**
   * Load quiz attempt state from localStorage
   */
  static getQuizAttempt(): QuizAttemptState | null {
    try {
      const data = localStorage.getItem(QUIZ_ATTEMPT_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as QuizAttemptState;
    } catch (err) {
      console.error('Failed to load quiz attempt from localStorage:', err);
      return null;
    }
  }

  /**
   * Save quiz attempt state to localStorage
   */
  static saveQuizAttempt(attempt: QuizAttemptState): boolean {
    try {
      localStorage.setItem(QUIZ_ATTEMPT_STORAGE_KEY, JSON.stringify(attempt));
      return true;
    } catch (err) {
      console.error('Failed to save quiz attempt to localStorage:', err);
      return false;
    }
  }

  /**
   * Clear quiz attempt state (for retrying quiz)
   */
  static clearQuizAttempt(): void {
    try {
      localStorage.removeItem(QUIZ_ATTEMPT_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear quiz attempt:', err);
    }
  }

  /**
   * Reset all data back to factory defaults
   */
  static resetToDefault(): void {
    localStorage.removeItem(UNITS_STORAGE_KEY);
    localStorage.removeItem(CONCEPTS_STORAGE_KEY);
    localStorage.removeItem(QUIZ_ATTEMPT_STORAGE_KEY);
  }
}
