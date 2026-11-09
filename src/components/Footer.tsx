/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Database, RotateCcw, ShieldCheck, BookOpen } from 'lucide-react';

interface FooterProps {
  onResetAllData: () => void;
  unitsCount: number;
  conceptsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onResetAllData,
  unitsCount,
  conceptsCount,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: App Identity & Description */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-slate-900 text-sm">
                나의 전공 공부 도우미
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                1~7차시 강의자료(통합본 146쪽) 기반 복습 도구
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              대학생 전공 학습자를 위한 개념 정리, 예시 대조 및 PPTX 추가 실습 웹사이트
            </p>
          </div>

          {/* Center: Storage Guarantee Banner */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 font-medium">
            <Database className="w-4 h-4 text-[#2855D9]" />
            <span>
              학습 데이터는 <strong>이 브라우저에 저장됩니다</strong> (로컬 스토리지)
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              단원 {unitsCount}개 · 개념 {conceptsCount}개
            </span>
            <button
              onClick={() => {
                if (
                  confirm(
                    '학습 내용과 개념 카드 데이터를 초기 원본 상태로 복원하시겠습니까? 사용자가 추가하거나 수정한 내용이 초기화됩니다.'
                  )
                ) {
                  onResetAllData();
                }
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors"
              title="초기 데이터로 전체 초기화"
            >
              <RotateCcw className="w-3 h-3" />
              <span>전체 초기화</span>
            </button>
          </div>

        </div>

        {/* Bottom Citation Line */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          근거 자료: 「1-7차시_강의자료_통합.pdf」 (1차시 1~17p, 2차시 18~28p, 3차시 29~40p, 4차시 41~51p, 5차시 52~80p, 6차시 81~110p, 7차시 111~146p)
        </div>
      </div>
    </footer>
  );
};
