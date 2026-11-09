/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types/quiz';

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // ================= 1. 1차시 객관식 =================
  {
    id: 'quiz-q1',
    questionNumber: 1,
    type: 'multiple-choice',
    sessionNumber: 1,
    linkedUnitId: 'unit-1-1',
    linkedConceptId: 'concept-token-prediction',
    pdfCitation: '1차시 · PDF 3~5쪽',
    question: 'LLM(대형 언어 모델)이 텍스트를 생성할 때 사용하는 가장 대표적인 작동 원리는 무엇인가요?',
    options: [
      { id: 'A', text: '인터넷 검색 엔진을 실시간으로 크롤링하여 가장 많이 복사된 문장을 그대로 출력한다.' },
      { id: 'B', text: '앞서 주어진 문맥을 바탕으로 다음에 올 언어 요소(토큰)를 확률적으로 예측한다.' },
      { id: 'C', text: '문법 규칙 사전(Lexicon)과 정해진 IF-THEN 규칙을 순차 실행해 문장을 조립한다.' },
      { id: 'D', text: '데이터베이스에 미리 저장된 정답 문장 템플릿의 빈칸을 채워 넣는다.' }
    ],
    correctAnswerId: 'B',
    explanation: 'LLM은 방대한 텍스트 데이터를 학습한 후, 주어진 문맥을 분석하여 다음에 올 가장 확률이 높은 언어 요소(토큰, Token)를 한 글자/단어씩 반복적으로 예측하여 문장을 완성합니다(PDF 1차시 3~5쪽).',
    distractorExplanations: {
      A: '검색 엔진의 웹 크롤러나 스크래퍼 동작과 혼동한 오답입니다. LLM은 기존 글을 그대로 긁어오는 것이 아니라 확률적 모델을 통해 텍스트를 직접 생성합니다.',
      C: '초기 규칙 기반(Rule-based) 자연어 처리 기법과 혼동한 오답입니다. 현대 LLM은 문법 규칙을 사전에 수동 코딩하지 않고 딥러닝 트랜스포머 아키텍처를 기반으로 학습합니다.',
      D: '과거의 정적 템플릿 기반 챗봇 방식과 혼동한 오답입니다. LLM은 고정된 템플릿 없이 문맥에 따라 가변적인 언어 요소를 생성합니다.'
    },
    sourceSnapshot: {
      unitTitle: 'LLM(대형 언어 모델)의 개념과 다음 토큰 예측 원리',
      learningGoal: '대형 언어 모델(LLM)의 기본 정의를 이해하고, 문맥을 바탕으로 다음 토큰을 확률적으로 예측하는 텍스트 생성 방식과 트랜스포머(Transformer) 기술의 역할을 파악한다.'
    }
  },

  // ================= 2. 1차시 OX =================
  {
    id: 'quiz-q2',
    questionNumber: 2,
    type: 'ox',
    sessionNumber: 1,
    linkedUnitId: 'unit-1-2',
    linkedConceptId: 'concept-hallucination',
    pdfCitation: '1차시 · PDF 9쪽',
    question: 'LLM은 수많은 데이터를 학습했으므로, 복잡한 전공 수식이나 학술 논문 인용에 대해 생성한 모든 답변은 언제나 정확한 사실이며 인간의 추가 검증이 불필요하다.',
    correctAnswerId: 'X',
    correctedStatement: 'LLM은 사실이 아닌 내용을 그럴듯하게 지어내는 환각(Hallucination), 학습 데이터 편향, 최신성 한계가 존재하므로 중요한 의사결정이나 학술적 활용 전에는 반드시 사람이 원본을 교차 검증해야 합니다.',
    explanation: 'LLM은 매우 그럴듯한 문장을 생성하지만, 사실이 아닌 내용을 진짜처럼 지어내는 환각(Hallucination) 현상이나 데이터 편향이 발생할 수 있습니다. 따라서 중요한 학술·전공 과제나 보고서 작성 시에는 반드시 원본 문헌을 교차 검증해야 합니다(PDF 1차시 9쪽).',
    sourceSnapshot: {
      unitTitle: '대학생을 위한 LLM 서비스 활용과 3대 한계점 (환각·편향·최신성)',
      learningGoal: '전공 학업 및 연구에서 LLM(ChatGPT, Gemini, Claude, SciSpace, LINER)을 활용하는 대표적 사례를 알고, LLM이 가진 3대 한계점(환각, 편향, 최신성)을 인식하여 비판적으로 검증하는 태도를 갖춘다.'
    }
  },

  // ================= 3. 2차시 객관식 =================
  {
    id: 'quiz-q3',
    questionNumber: 3,
    type: 'multiple-choice',
    sessionNumber: 2,
    linkedUnitId: 'unit-2-1',
    linkedConceptId: 'concept-prompt',
    pdfCitation: '2차시 · PDF 21쪽',
    question: '2차시에서 제시된 \'좋은 프롬프트를 만들기 위한 6가지 조건\'과 그 예시의 연결로 가장 적절하지 않은 것은 무엇인가요?',
    options: [
      { id: 'A', text: '명확한 작업 지시 — "엔트로피의 개념을 설명해 줘."' },
      { id: 'B', text: '대상 및 수준 설정 — "이공계 비전공자 수준으로 설명해 줘."' },
      { id: 'C', text: '출력 형식 지정 — "정의, 특징, 사례를 표로 정리해 줘."' },
      { id: 'D', text: '배경 및 맥락 제공 — "정부기관 및 학술논문을 참고해 줘."' }
    ],
    correctAnswerId: 'D',
    explanation: '"정부기관 및 학술논문을 참고해 줘"는 ⑥ \'근거 및 출처 명시\' 조건의 예시입니다. ② \'배경 및 맥락 제공\'의 올바른 예시는 "열역학 입문 강의를 수강하고 있어"입니다(PDF 2차시 21쪽).',
    distractorExplanations: {
      A: '① \'명확한 작업 지시\'의 올바른 예시입니다. 수행할 작업을 구체적으로 제시하고 있습니다.',
      B: '③ \'대상 및 수준 설정\'의 올바른 예시입니다. 답변을 읽을 사람의 눈높이와 이해 수준을 지정하고 있습니다.',
      C: '④ \'출력 형식 지정\'의 올바른 예시입니다. 답변의 구조를 표(Table) 형태로 요청하고 있습니다.'
    },
    sourceSnapshot: {
      unitTitle: '효과적인 프롬프트 작성의 6가지 핵심 조건',
      learningGoal: '생성형 AI가 고품질의 결과물을 산출하도록 유도하는 프롬프트의 6가지 핵심 조건(명확한 지시, 배경/맥락, 대상/수준, 출력형식, 조건/제약, 근거/출처)을 학습하고 실습에 적용한다.'
    }
  },

  // ================= 4. 2차시 OX =================
  {
    id: 'quiz-q4',
    questionNumber: 4,
    type: 'ox',
    sessionNumber: 2,
    linkedUnitId: 'unit-2-2',
    linkedConceptId: 'concept-iterative-dev',
    pdfCitation: '2차시 · PDF 23쪽',
    question: '바이브 코딩에서는 처음부터 모든 요구사항을 한꺼번에 완벽히 입력하기보다는, 핵심 기능을 먼저 구현한 다음 실행 결과를 확인하면서 기능을 추가하고 오류를 수정하는 반복적인 개발 방식이 효과적이다.',
    correctAnswerId: 'O',
    explanation: '바이브 코딩에서는 방대한 요구사항을 한 번에 입력하면 AI가 혼동을 겪거나 코드가 꼬이기 쉽습니다. 핵심 뼈대를 먼저 구축하고 단계별로 살을 붙여 나가는 반복적(Iterative) 개발 방식이 매우 중요합니다(PDF 2차시 23쪽).',
    sourceSnapshot: {
      unitTitle: '바이브 코딩을 위한 프롬프트의 특징과 점진적·반복적 개발 방식',
      learningGoal: '일반적인 질의응답 프롬프트와 바이브 코딩 프롬프트의 차이를 알고, 핵심 기능부터 점진적으로 구현하고 개선하는 반복적 개발 방식을 이해한다.'
    }
  },

  // ================= 5. 3차시 객관식 =================
  {
    id: 'quiz-q5',
    questionNumber: 5,
    type: 'multiple-choice',
    sessionNumber: 3,
    linkedUnitId: 'unit-3-3',
    linkedConceptId: 'concept-web-trio',
    pdfCitation: '3차시 · PDF 34~37쪽',
    question: '웹 프론트엔드를 구성하는 3대 기술(HTML, CSS, JavaScript)을 \'건축물\'에 비유한 설명으로 가장 올바르게 짝지어진 것은 무엇인가요?',
    options: [
      { id: 'A', text: 'HTML = 건물의 뼈대와 공간 구조 / CSS = 벽지와 외관 인테리어 / JavaScript = 조명 스위치와 엘리베이터' },
      { id: 'B', text: 'HTML = 조명 스위치와 자동문 / CSS = 건물의 뼈대 / JavaScript = 벽지와 페인트' },
      { id: 'C', text: 'HTML = 벽지와 페인트 / CSS = 데이터베이스 금고 / JavaScript = 철골 뼈대' },
      { id: 'D', text: 'HTML = 서버 통신 케이블 / CSS = 사용자 입력 검증기 / JavaScript = 외벽 콘크리트' }
    ],
    correctAnswerId: 'A',
    explanation: 'HTML은 웹의 기본 구조와 뼈대를 만들고, CSS는 색상과 레이아웃 등 외관을 꾸미며, JavaScript는 버튼 클릭과 애니메이션 등 실제로 작동하는 동적 기능을 구현합니다(PDF 3차시 35~37쪽).',
    distractorExplanations: {
      B: 'JavaScript와 HTML의 역할이 뒤바뀐 오답입니다. 조명 스위치(동적 동작)는 JS이고 철골 뼈대는 HTML입니다.',
      C: 'CSS와 데이터베이스 개념을 잘못 결합하고 구조(HTML)와 디자인(CSS)을 혼동한 오답입니다.',
      D: '백엔드/인프라 네트워크 개념을 프론트엔드 3대 기술의 기본 역할과 혼동한 오답입니다.'
    },
    sourceSnapshot: {
      unitTitle: '웹 3대 기술(HTML, CSS, JS)과 건축 비유, React/TypeScript',
      learningGoal: '웹 프론트엔드를 구성하는 HTML, CSS, JavaScript의 고유 역할과 건축 비유를 이해하고, React와 TypeScript 등 기초 지식이 AI 코딩 효율에 미치는 영향을 파악한다.'
    }
  },

  // ================= 6. 3차시 객관식 =================
  {
    id: 'quiz-q6',
    questionNumber: 6,
    type: 'multiple-choice',
    sessionNumber: 3,
    linkedUnitId: 'unit-3-2',
    linkedConceptId: 'concept-frontend-backend',
    pdfCitation: '3차시 · PDF 32쪽',
    question: '다음 중 사용자가 웹사이트에 접속했을 때 직접 눈으로 보고 누르며 상호작용하는 \'프론트엔드(Frontend)\' 영역의 역할에 해당하는 것은 무엇인가요?',
    options: [
      { id: 'A', text: '사용자의 비밀번호를 데이터베이스에 안전하게 암호화하여 영구 저장하기' },
      { id: 'B', text: '화면 상단 메뉴 바의 내비게이션 링크와 버튼 호버 시 색상 전환 효과 구현' },
      { id: 'C', text: '결제 시스템 승인을 위해 금융사 내부 서버와 비공개 통신 세션 유지하기' },
      { id: 'D', text: '서버 컴퓨터의 리눅스(Linux) 운영체제 백그라운드 프로세스 관리' }
    ],
    correctAnswerId: 'B',
    explanation: '화면 구성, 시각적 디자인, 버튼, 메뉴, 사용자 인터랙션은 사용자와 직접 마주하는 프론트엔드의 고유 역할입니다(PDF 3차시 32쪽). A, C, D는 모두 사용자 눈에 보이지 않는 백엔드 및 서버 인프라 영역입니다.',
    distractorExplanations: {
      A: '데이터베이스 및 백엔드 인증/보안 시스템의 고유 역할입니다.',
      C: '외부 결제 게이트웨이 및 금융 통신을 처리하는 백엔드 서버의 고유 역할입니다.',
      D: '웹 서버 호스팅 인프라 및 시스템 엔지니어링의 역할입니다.'
    },
    sourceSnapshot: {
      unitTitle: '프론트엔드와 백엔드의 역할 구분과 바이브 코딩 실습의 범위',
      learningGoal: '프론트엔드와 백엔드의 상호 역할을 이해하고, 입문 바이브 코딩에서 왜 프론트엔드 개발에 집중하는지 그 이유를 설명할 수 있다.'
    }
  },

  // ================= 7. 4차시 객관식 =================
  {
    id: 'quiz-q7',
    questionNumber: 7,
    type: 'multiple-choice',
    sessionNumber: 4,
    linkedUnitId: 'unit-4-3',
    linkedConceptId: 'concept-api-key',
    pdfCitation: '4차시 · PDF 46~47쪽',
    question: '바이브 코딩으로 외부 AI 서비스나 유료 API를 연동할 때, API 키(API Key)를 안전하게 관리하는 보안 수칙으로 가장 올바른 것은 무엇인가요?',
    options: [
      { id: 'A', text: '웹사이트의 프론트엔드 JavaScript 소스 코드 파일 안에 API 키를 평문으로 직접 적어둔다.' },
      { id: 'B', text: '팀원들이 함께 볼 수 있도록 GitHub 공개(Public) 저장소의 README 파일에 올려 공유한다.' },
      { id: 'C', text: 'API 키는 비밀번호와 같으므로 서버 환경 변수(.env)나 보안 저장소에 보관하고 공개 저장을 금지한다.' },
      { id: 'D', text: 'API 키는 한 번 사용하면 만료되는 일회용 번호이므로 외부에 유출되어도 과금 위험이 전혀 없다.' }
    ],
    correctAnswerId: 'C',
    explanation: 'API 키는 외부 서비스 이용 권한과 과금을 식별하는 고유한 인증 정보이므로, 프론트엔드 코드나 GitHub 같은 공개 저장소에 올리면 제3자가 무단 사용하여 막대한 요금이 발생할 수 있습니다. 반드시 서버 환경 변수(.env)나 보안 저장소에 보관해야 합니다(PDF 4차시 46~47쪽).',
    distractorExplanations: {
      A: '브라우저の開発자 도구(F12)로 누구나 소스코드를 열어볼 수 있으므로 키가 즉시 유출되는 가장 위험한 행위입니다.',
      B: '공개 저장소에 올리면 자동화된 크롤러 봇에 의해 몇 초 만에 API 키가 털릴 수 있습니다.',
      D: '대부분의 API 키는 영구 발급 토큰이며 사용량에 따라 실제 신용카드로 청구되므로 엄청난 금전 피해가 생길 수 있습니다.'
    },
    sourceSnapshot: {
      unitTitle: 'API 키와 보안 관리 (유출 위험과 환경 변수)',
      learningGoal: 'API 키의 인증 및 과금 관리 역할을 파악하고, 프론트엔드 코드나 GitHub 공개 저장소에 키를 노출했을 때의 위험과 환경 변수를 통한 안전한 보관법을 숙지한다.'
    }
  },

  // ================= 8. 4차시 OX =================
  {
    id: 'quiz-q8',
    questionNumber: 8,
    type: 'ox',
    sessionNumber: 4,
    linkedUnitId: 'unit-4-2',
    linkedConceptId: 'concept-api',
    pdfCitation: '4차시 · PDF 43쪽',
    question: 'API(Application Programming Interface)는 서로 다른 소프트웨어나 시스템이 정해진 규칙에 따라 데이터를 주고받거나 기능을 사용할 수 있도록 연결해 주는 인터페이스이다.',
    correctAnswerId: 'O',
    explanation: 'API를 활용하면 날씨 관측소나 지도 데이터베이스를 직접 구축하지 않고도, 외부 서비스의 기상 데이터나 지도 기능을 내 웹사이트로 요청(Request)하고 응답(Response)받아 손쉽게 연동할 수 있습니다(PDF 4차시 43쪽).',
    sourceSnapshot: {
      unitTitle: 'API(Application Programming Interface)의 개념과 외부 연동',
      learningGoal: 'API의 개념과 동작 원리(요청과 응답)를 이해하고, 외부 서비스의 기상 데이터, 지도, 번역, AI 기능을 내 웹사이트로 가져오는 연동 방식을 학습한다.'
    }
  },

  // ================= 9. 5차시 객관식 =================
  {
    id: 'quiz-q9',
    questionNumber: 9,
    type: 'multiple-choice',
    sessionNumber: 5,
    linkedUnitId: 'unit-5-4',
    linkedConceptId: 'concept-deployment',
    pdfCitation: '5차시 · PDF 58쪽',
    question: '5차시 강의자료에서 안내한 단일 HTML 파일 웹 배포 실습의 \'4단계 순서\'로 올바른 것은 무엇인가요?',
    options: [
      { id: 'A', text: '1 파일 확인 → 2 GitHub에 저장 (업로드 및 커밋) → 3 Vercel로 배포 (저장소 연결 및 도메인 확인) → 4 업데이트 확인 (수정 커밋 후 자동 재배포)' },
      { id: 'B', text: '1 Vercel 배포 → 2 파일 확인 → 3 GitHub 저장 → 4 index.html 로컬 실행' },
      { id: 'C', text: '1 CLI 터미널 포맷 → 2 도메인 구매 → 3 GitHub 업로드 → 4 FTP 전송' },
      { id: 'D', text: '1 Vercel 회원가입 → 2 로컬 file:// 주소 공유 → 3 index.html 삭제 → 4 자동 복구' }
    ],
    correctAnswerId: 'A',
    explanation: '5차시 배포 실습 순서는: ① 로컬 index.html 파일 확인 → ② GitHub에 새 저장소 생성 후 파일 업로드 및 커밋 → ③ Vercel에서 저장소 Import 후 배포 및 도메인 확인 → ④ HTML 문구 수정 커밋 후 자동 재배포 확인 순으로 진행됩니다(PDF 5차시 58쪽).',
    distractorExplanations: {
      B: '소스 코드를 확인하고 GitHub에 저장하기도 전에 Vercel 배포를 진행할 수 없습니다.',
      C: '유료 도메인 구매나 FTP 전송은 이번 실습 과정이 아니며 현대적인 CI/CD 배포 흐름과 맞지 않습니다.',
      D: '로컬 file:// 주소는 타인에게 공유할 수 없으며 파일을 삭제하면 배포가 불가능합니다.'
    },
    sourceSnapshot: {
      unitTitle: 'HTML 한 파일 배포 순서와 Vercel 핵심 설정',
      learningGoal: 'GitHub 저장소 생성부터 index.html 업로드, Vercel 프로젝트 연동 및 Other 프리셋 설정까지 4단계 배포 과정을 완벽히 수행한다.'
    }
  },

  // ================= 10. 5차시 OX =================
  {
    id: 'quiz-q10',
    questionNumber: 10,
    type: 'ox',
    sessionNumber: 5,
    linkedUnitId: 'unit-5-1',
    linkedConceptId: 'concept-deployment',
    pdfCitation: '5차시 · PDF 55쪽',
    question: '내 컴퓨터 웹 브라우저에서 연 주소인 `file:///.../index.html`을 복사하여 다른 사람에게 보내주면, 상대방도 인터넷을 통해 내 웹사이트를 정상적으로 열람할 수 있다.',
    correctAnswerId: 'X',
    correctedStatement: '`file:///` 주소는 내 개인 컴퓨터 하드디스크의 파일을 직접 연 것이므로 다른 사람에게 경로만 보내면 열 수 없으며, 타인이 접속하려면 Vercel 같은 클라우드 호스팅 서비스에 웹 배포(`https://...`)해야 합니다.',
    explanation: '`file:///`로 시작하는 경로는 내 컴퓨터 로컬 환경에 저장된 파일의 위치일 뿐 인터넷 공개 주소가 아닙니다. 다른 사람이 접속하려면 Vercel이나 GitHub Pages 같은 웹 배포 서비스를 통해 공개 인터넷 주소(`https://...`)를 생성해야 합니다(PDF 5차시 55쪽).',
    sourceSnapshot: {
      unitTitle: '내 컴퓨터의 파일(file://)과 인터넷 배포 사이트(https://)의 차이',
      learningGoal: '내 컴퓨터 로컬 파일 경로와 인터넷에 배포된 공개 주소의 결정적 차이를 이해하고, 배포(Deployment)의 의미를 설명할 수 있다.'
    }
  },

  // ================= 11. 6차시 객관식 =================
  {
    id: 'quiz-q11',
    questionNumber: 11,
    type: 'multiple-choice',
    sessionNumber: 6,
    linkedUnitId: 'unit-6-2',
    linkedConceptId: 'concept-design-system',
    pdfCitation: '6차시 · PDF 88~91쪽',
    question: '6차시 강의자료에서 "예쁘게 만들어 줘"라는 막연한 요청 대신 디자인 시스템 규칙으로 명시한 구체적인 수치로 올바른 것은 무엇인가요?',
    options: [
      { id: 'A', text: '배경 #17212B, 본문 #F7F8FA, 버튼 높이 20px, 카드 모서리 0px' },
      { id: 'B', text: '밝은 배경 #F7F8FA, 짙은 본문 #17212B, 파란 강조색 #2855D9, 버튼 높이 48px 이상 및 모서리 8px' },
      { id: 'C', text: '배경 투명, 본문 무지개색 그라데이션, 버튼 높이 100px, 폰트 Comic Sans' },
      { id: 'D', text: '배경 네온 그린, 본문 검정, 모든 여백 120px 고정, 카드 모서리 완전 원형' }
    ],
    correctAnswerId: 'B',
    explanation: '6차시 디자인 시스템 규칙에 따르면 배경은 밝은 `#F7F8FA`, 본문은 짙은 `#17212B`, 강조색은 `#2855D9`이며, 버튼 높이는 48px 이상, 모서리(border-radius)는 8px, 프로젝트 카드는 모서리 16px, 간격은 8·16·24·48·80px 단계를 사용하도록 규정되어 있습니다(PDF 6차시 89~91쪽).',
    distractorExplanations: {
      A: '배경색과 본문색의 수치가 반대로 뒤바뀌어 있으며, 버튼 높이 규격(48px 이상)에도 맞지 않습니다.',
      C: '강의자료의 수치 규칙과 무관하며 가독성을 해치는 임의의 값입니다.',
      D: '자료에 명시된 8·16·24·48·80px 간격 단계 및 표준 배색 규칙과 전혀 다릅니다.'
    },
    sourceSnapshot: {
      unitTitle: '디자인 시스템의 개념과 "예쁘게"를 구체적 수치 규칙으로 바꾸기',
      learningGoal: '사이트 전체의 통일성을 지켜주는 디자인 시스템의 의미를 이해하고, 막연한 표현 대신 색상·폰트·크기·여백의 명확한 수치 규칙을 적용한다.'
    }
  },

  // ================= 12. 7차시 객관식 =================
  {
    id: 'quiz-q12',
    questionNumber: 12,
    type: 'multiple-choice',
    sessionNumber: 7,
    linkedUnitId: 'unit-7-4',
    linkedConceptId: 'concept-vite-build',
    pdfCitation: '7차시 · PDF 137쪽',
    question: '7차시 Vite 기반 모던 웹 프로젝트를 GitHub에 업로드할 때, 절대 업로드하지 않고 제외해야 할 항목들의 조합으로 가장 올바른 것은 무엇인가요?',
    options: [
      { id: 'A', text: '`src` 폴더, `index.html`, `package.json`' },
      { id: 'B', text: '`public/images` 폴더, `package-lock.json` 잠금 파일' },
      { id: 'C', text: '`node_modules` (의존성 패키지 폴더), `dist` (빌드 결과물), 실제 비밀 키가 담긴 `.env` 파일' },
      { id: 'D', text: '`App.tsx`, `main.tsx`, `vite.config.ts`' },
    ],
    correctAnswerId: 'C',
    explanation: '수만 개의 파일이 포함된 `node_modules`, 빌드 산출물인 `dist`, 실제 비밀 API 키가 들어 있는 `.env` 파일은 용량이 방대하거나 보안상 치명적이므로 저장소에 올리지 않고 제외해야 합니다(PDF 7차시 137쪽). A, B, D는 프로젝트의 원본 코드를 구성하는 필수 업로드 파일입니다.',
    distractorExplanations: {
      A: '`src`, `index.html`, `package.json`은 프로젝트 소스 코드의 핵심이므로 반드시 업로드해야 합니다.',
      B: '정적 이미지 자산(`public`)과 패키지 버전 일관성을 보장하는 잠금 파일(`package-lock.json`)은 필수 업로드 대상입니다.',
      D: '컴포넌트 및 빌드 환경 설정 파일로 저장소에 반드시 포함되어야 하는 핵심 소스입니다.'
    },
    sourceSnapshot: {
      unitTitle: '모던 웹 프로젝트 파일 구조와 업로드/제외 대상 관리',
      learningGoal: 'Vite 프로젝트의 디렉토리 구조(package.json, src, public, dist)를 파악하고, 저장소 업로드 대상과 절대 업로드해서는 안 되는 제외 대상을 구분한다.'
    }
  }
];
