/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudyUnit, SessionMeta } from '../types/curriculum';
import { ChevronDown, ChevronRight, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';

interface SidebarProps {
  sessions: SessionMeta[];
  units: StudyUnit[];
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  units,
  activeUnitId,
  onSelectUnit,
  isMobileOpen,
  onCloseMobile,
}) => {
  // Find which session contains activeUnitId
  const currentUnit = units.find(u => u.id === activeUnitId);
  const activeSessionNum = currentUnit ? currentUnit.sessionNumber : 1;

  // Track expanded sessions (expand active by default)
  const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({
    [activeSessionNum]: true,
    1: true,
  });

  const toggleSession = (sessionNum: number) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionNum]: !prev[sessionNum]
    }));
  };

  // Group units by session number
  const unitsBySession = units.reduce<Record<number, StudyUnit[]>>((acc, unit) => {
    if (!acc[unit.sessionNumber]) {
      acc[unit.sessionNumber] = [];
    }
    acc[unit.sessionNumber].push(unit);
    return acc;
  }, {});

  // Collect any extra user added sessions (e.g. 8+)
  const allSessionNums = Array.from(new Set(units.map(u => u.sessionNumber))).sort((a, b) => a - b);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            학습 목차 (1~7차시)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            총 {units.length}개 핵심 학습 단원
          </p>
        </div>
        <span className="text-xs text-[#2855D9] bg-blue-50 px-2 py-0.5 rounded font-medium">
          PDF 146쪽 연계
        </span>
      </div>

      {/* Sessions & Units Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {allSessionNums.map(sessionNum => {
          const sessionMeta = sessions.find(s => s.sessionNumber === sessionNum);
          const sessionUnits = unitsBySession[sessionNum] || [];
          const isExpanded = !!expandedSessions[sessionNum];
          const hasActiveUnit = sessionUnits.some(u => u.id === activeUnitId);

          const title = sessionMeta
            ? sessionMeta.title
            : `${sessionNum}차시: 사용자 추가 자료`;

          const pageRange = sessionMeta
            ? sessionMeta.pdfPageRange
            : '사용자 PPTX 슬라이드';

          return (
            <div
              key={sessionNum}
              className={`rounded-lg border transition-colors ${
                hasActiveUnit ? 'border-blue-200 bg-blue-50/20' : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              {/* Session Accordion Trigger */}
              <button
                onClick={() => toggleSession(sessionNum)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-100/70 transition-colors rounded-lg"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {sessionNum}차시
                    </div>
                    <div className="text-xs text-slate-600 truncate font-medium">
                      {title.split(': ')[1] || title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {pageRange} · {sessionUnits.length}개 주제
                    </div>
                  </div>
                </div>
              </button>

              {/* Units List */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1">
                  {sessionUnits.map(unit => {
                    const isActive = unit.id === activeUnitId;
                    return (
                      <button
                        key={unit.id}
                        onClick={() => {
                          onSelectUnit(unit.id);
                          onCloseMobile();
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all flex items-start gap-2 ${
                          isActive
                            ? 'bg-[#2855D9] text-white font-medium shadow-sm'
                            : 'text-slate-700 hover:bg-white hover:text-slate-900'
                        }`}
                      >
                        <span className={`mt-0.5 shrink-0 ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                          {isActive ? (
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <span className="w-3.5 h-3.5 inline-flex items-center justify-center font-mono text-[10px]">
                              {unit.unitNumber}
                            </span>
                          )}
                        </span>
                        
                        <div className="min-w-0 flex-1">
                          <div className="leading-snug line-clamp-2">
                            {unit.title}
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                            <span className={isActive ? 'text-blue-100' : 'text-slate-400'}>
                              {unit.pdfPages}
                            </span>
                            
                            {unit.isUserEdited && (
                              <span className={`px-1 py-0.2 rounded font-medium ${
                                isActive ? 'bg-blue-800 text-white' : 'bg-amber-100 text-amber-800'
                              }`}>
                                수정됨
                              </span>
                            )}
                            
                            {unit.isUserAdded && (
                              <span className={`px-1 py-0.2 rounded font-medium ${
                                isActive ? 'bg-blue-800 text-white' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                PPTX
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Storage & Auto-save Status Notice */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="leading-tight">
          수정·추가된 내용은 <strong className="text-slate-700">이 브라우저에 자동 저장</strong>됩니다.
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky, fixed width) */}
      <aside className="hidden lg:block w-80 shrink-0 h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
