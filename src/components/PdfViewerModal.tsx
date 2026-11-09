/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, ChevronRight, FileText } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  if (!isOpen) return null;

  const pdfUrl = `/assets/aistudio/1-7___________21b8337b.pdf#page=${currentPage}`;

  const sessionPageJumps = [
    { session: 1, title: '1차시: 바이브코딩 첫걸음, LLM 개념·원리', page: 1, range: '1~17쪽' },
    { session: 2, title: '2차시: 웹사이트 기획, 좋은 프롬프트, 마크다운', page: 18, range: '18~28쪽' },
    { session: 3, title: '3차시: 웹사이트 구성요소, 프론트엔드, HTML/CSS/JS', page: 29, range: '29~40쪽' },
    { session: 4, title: '4차시: 웹 보안, API 개념, API키 보안, 서버/DB', page: 41, range: '41~51쪽' },
    { session: 5, title: '5차시: 로컬 vs 배포, GitHub & Vercel, CLI', page: 52, range: '52~80쪽' },
    { session: 6, title: '6차시: 포트폴리오 기획, 디자인 시스템, AI Studio Build', page: 81, range: '81~110쪽' },
    { session: 7, title: '7차시: 이미지 생성, UI 요소 수정, 반응형, Vite 배포', page: 111, range: '111~146쪽' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                1-7차시 강의자료 원본 PDF (통합본 146쪽)
              </h2>
              <p className="text-xs text-slate-500">
                실제 강의 슬라이드 원본 대조 확인용
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/assets/aistudio/1-7___________21b8337b.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
              title="새 탭에서 원본 PDF 전체 열기"
            >
              <span>새 창에서 열기</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Session Jump Buttons */}
        <div className="px-3 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">
            차시별 바로가기:
          </span>
          {sessionPageJumps.map(j => (
            <button
              key={j.session}
              onClick={() => setCurrentPage(j.page)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium ${
                currentPage >= j.page && currentPage < (sessionPageJumps[j.session]?.page || 147)
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {j.session}차시 ({j.range})
            </button>
          ))}
        </div>

        {/* PDF iframe / Object Container */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden">
          <iframe
            src={pdfUrl}
            title="통합 강의자료 PDF 뷰어"
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>통합본 실제 PDF 페이지 기준: 1차시(1~17p), 2차시(18~28p), 3차시(29~40p), 4차시(41~51p), 5차시(52~80p), 6차시(81~110p), 7차시(111~146p)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
