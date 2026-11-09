/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConceptItem } from '../types/curriculum';

export const INITIAL_CONCEPTS: ConceptItem[] = [
  {
    id: 'concept-llm',
    name: 'LLM (Large Language Model / 대형 언어 모델)',
    sessions: [1, 3, 6],
    primarySession: 1,
    explanation: '방대한 양의 텍스트 데이터를 학습하여 인간의 언어를 처리하고, 질문에 대한 답변이나 새로운 텍스트를 생성할 수 있는 인공지능 모델입니다. 언어의 구조와 문맥적 관계를 파악하여 질의응답, 번역, 요약, 글쓰기 및 코드 작성을 수행합니다.',
    example: 'ChatGPT, Google Gemini, Claude, HyperCLOVA X 등이 대표적인 상용 LLM 서비스입니다.',
    linkedUnitIds: ['unit-1-1', 'unit-1-2']
  },
  {
    id: 'concept-token-prediction',
    name: '토큰 (Token) & 다음 요소 예측',
    sessions: [1],
    primarySession: 1,
    explanation: 'LLM의 텍스트 처리 기본 단위를 토큰(Token)이라고 합니다. LLM은 단어 전체를 한꺼번에 다루기보다 토큰 단위로 쪼개어, 앞서 주어진 문맥을 바탕으로 다음에 올 가장 확률이 높은 언어 요소를 반복적으로 예측하여 문장을 완성합니다.',
    example: '"대한민국의 수도는 ____"이라는 문맥이 주어졌을 때, 다음에 올 토큰으로 \'서울\'(가상 확률 90%), \'부산\'(7%), \'인천\'(3%) 등을 예측해 가장 적합한 토큰을 선택합니다.',
    linkedUnitIds: ['unit-1-1']
  },
  {
    id: 'concept-transformer',
    name: '트랜스포머 (Transformer)',
    sessions: [1],
    primarySession: 1,
    explanation: '현대의 많은 LLM이 채택하고 있는 인공신경망 아키텍처로, 문장 내 요소들(토큰들) 간의 상호 관계와 문맥적 중요도를 어텐션(Attention) 메커니즘을 통해 효과적으로 계산하는 핵심 딥러닝 기술입니다.',
    example: '긴 문장에서 대명사가 가리키는 대상이나 멀리 떨어진 수식어의 관계를 놓치지 않고 문맥을 종합 파악할 수 있게 해줍니다.',
    linkedUnitIds: ['unit-1-1']
  },
  {
    id: 'concept-hallucination',
    name: '환각 (Hallucination) & 편향 (Bias)',
    sessions: [1, 6],
    primarySession: 1,
    explanation: '환각(Hallucination)은 AI가 사실이 아닌 내용을 그럴듯하게 거짓으로 생성해내는 현상입니다. 편향(Bias)은 학습 데이터에 포함된 왜곡이나 치우침이 답변에 반영되는 한계이며, 최신 정보 부재와 함께 LLM의 답변을 사람이 반드시 검증해야 하는 주된 이유입니다.',
    example: '존재하지 않는 가상의 논문 제목이나 가짜 연구자 이름을 마치 실존하는 것처럼 출처로 제시하는 사례가 대표적 환각입니다.',
    linkedUnitIds: ['unit-1-2', 'unit-6-4']
  },
  {
    id: 'concept-vibe-coding',
    name: '바이브 코딩 (Vibe Coding)',
    sessions: [1, 2, 3, 4, 6],
    primarySession: 1,
    explanation: '사용자가 복잡한 프로그래밍 코드를 직접 작성하는 대신, 일상에서 쓰는 자연어로 원하는 프로그램의 기능과 화면을 설명하면 생성형 AI가 코드를 작성하고 수정해 주는 소프트웨어 개발 방식입니다. "어떻게 코딩할까"보다 "무엇을 만들고 어떻게 검증할까"에 집중합니다.',
    example: '"의공학 전공생을 위한 프로젝트 소개 사이트를 만들어줘. 첫 화면에 논문 제목과 연구 요약을 카드 형태로 배치해줘"라고 자연어로 요청하여 웹 서비스를 완성하는 실습 방식입니다.',
    linkedUnitIds: ['unit-1-3', 'unit-2-2', 'unit-3-2', 'unit-6-3']
  },
  {
    id: 'concept-prompt',
    name: '프롬프트 (Prompt) & 6대 작성 조건',
    sessions: [2, 6],
    primarySession: 2,
    explanation: '생성형 AI가 특정 작업을 수행하거나 원하는 결과를 생성하도록 사용자가 입력하는 질문, 명령 또는 요청문입니다. 좋은 결과를 얻기 위해서는 ① 명확한 작업 지시, ② 배경 및 맥락, ③ 대상 및 수준, ④ 출력 형식, ⑤ 조건 및 제약, ⑥ 근거 및 출처의 6가지 조건을 갖추어야 합니다.',
    example: '"엔트로피가 뭐야?" 대신 "열역학 입문 강의 수강생 수준으로 일상 사례와 제2법칙을 연결해 500자 이내 표 형태로 정리해 줘"라고 작성하는 것이 좋은 프롬프트의 전형입니다.',
    linkedUnitIds: ['unit-2-1', 'unit-2-2']
  },
  {
    id: 'concept-iterative-dev',
    name: '반복적 개발 방식 (Iterative Development)',
    sessions: [2, 6, 7],
    primarySession: 2,
    explanation: '처음부터 방대한 모든 요구사항을 한꺼번에 입력하기보다, 핵심 기능을 먼저 구현한 다음 실행 결과를 눈으로 확인하면서 기능을 점진적으로 추가하고 오류를 수정해 나가는 개발 전략입니다.',
    example: '먼저 메인 타이틀과 프로젝트 목록 뼈대만 생성해 확인하고, 그 다음 버튼 색상과 카드 호버 애니메이션을 추가하며 단계별로 살을 붙여가는 과정입니다.',
    linkedUnitIds: ['unit-2-2', 'unit-6-4', 'unit-7-2']
  },
  {
    id: 'concept-markdown',
    name: '마크다운 (Markdown)',
    sessions: [2, 6],
    primarySession: 2,
    explanation: '복잡한 편집기 없이도 # (제목), * (강조), - (목록) 등 간단한 기호와 문법으로 텍스트의 구조와 서식을 표현할 수 있는 경량 마크업 언어(.md)입니다. 요구사항 문서를 마크다운으로 정리해 AI에 전달하면 개발 목표의 누락과 불일치를 줄일 수 있습니다.',
    example: '# 포트폴리오 기획서 \\n ## 주요 기능 \\n - 프로젝트 카드 목록 \\n - 상세 모달 창',
    linkedUnitIds: ['unit-2-3', 'unit-6-1']
  },
  {
    id: 'concept-layout-structure',
    name: '웹사이트 레이아웃 구성 요소',
    sessions: [3, 6],
    primarySession: 3,
    explanation: '웹페이지를 구성하는 핵심 골격 단위들입니다. 상단에서 로고와 메뉴를 담당하는 헤더(Header) 및 내비게이션(Navigation), 시선을 사로잡는 히어로(Hero Section), 본문 핵심 정보를 담는 메인 콘텐츠(Main Content) 및 사이드바(Sidebar), 하단 이용약관과 저작권을 표시하는 푸터(Footer)로 이루어집니다.',
    example: '상단 네비게이션 메뉴를 누르면 메인 콘텐츠의 "프로젝트 섹션"으로 스크롤 이동하고, 하단 푸터에는 개인 이메일과 저작권 표시를 배치합니다.',
    linkedUnitIds: ['unit-3-1', 'unit-6-1']
  },
  {
    id: 'concept-frontend-backend',
    name: '프론트엔드 (Frontend) vs 백엔드 (Backend)',
    sessions: [3, 4],
    primarySession: 3,
    explanation: '프론트엔드는 사용자가 웹사이트에서 직접 눈으로 보고 버튼을 클릭하며 상호작용하는 영역(화면 디자인, 레이아웃, 인터랙션)입니다. 백엔드는 보이지 않는 곳에서 데이터 저장·관리, 사용자 인증, 서버 연산 등을 처리합니다. 입문 바이브코딩은 보안 위험을 줄이고 빠른 피드백을 위해 프론트엔드에 집중합니다.',
    example: '화면에 보이는 예쁜 카드와 클릭 애니메이션은 프론트엔드 영역이고, 로그인 비밀번호 암호화 저장이나 결제 시스템 승인은 백엔드 영역입니다.',
    linkedUnitIds: ['unit-3-2', 'unit-4-4']
  },
  {
    id: 'concept-web-trio',
    name: '웹 3대 기술 (HTML / CSS / JavaScript)',
    sessions: [3, 5, 7],
    primarySession: 3,
    explanation: '웹사이트를 제작하는 세 가지 기본 기둥입니다. 건축에 비유하면 HTML은 건물의 뼈대와 공간 구조(제목, 버튼, 문단), CSS는 벽지와 페인트 인테리어(색상, 글꼴, 레이아웃 스타일), JavaScript는 조명 스위치와 자동문(클릭 반응, 동적 동작)을 담당합니다.',
    example: '<button> 태그로 뼈대를 만들고(HTML), bg-blue-600으로 파란색을 칠하고(CSS), onClick 이벤트로 창을 띄우는 것(JS)이 결합되어 완성됩니다.',
    linkedUnitIds: ['unit-3-3']
  },
  {
    id: 'concept-api',
    name: 'API (Application Programming Interface)',
    sessions: [4],
    primarySession: 4,
    explanation: '서로 다른 소프트웨어나 시스템이 정해진 규칙에 따라 데이터를 주고받거나 기능을 사용할 수 있도록 연결해 주는 표준화된 인터페이스(창구)입니다. 다른 서비스의 기능을 처음부터 직접 만들지 않고도 내 프로그램에 연동할 수 있게 해줍니다.',
    example: '기상청 기상 관측 설비를 직접 만들지 않아도, 날씨 API에 "오늘 서울의 기온을 알려줘"라고 요청(Request)하여 응답(Response)받아 화면에 표시할 수 있습니다.',
    linkedUnitIds: ['unit-4-2']
  },
  {
    id: 'concept-api-key',
    name: 'API 키 (API Key) & 보안 관리',
    sessions: [4, 5, 7],
    primarySession: 4,
    explanation: '외부 API를 이용하기 위해 발급받는 고유한 비밀 인증 정보로, 서비스 이용 권한 확인 및 사용량 과금에 활용됩니다. 비밀번호와 같으므로 공개 웹 프론트엔드 코드나 GitHub 공개 저장소에 절대로 노출해서는 안 되며, 서버 환경 변수(.env)에 보관해야 합니다.',
    example: 'Gemini API 키나 결제 API 키가 노출되면 제3자가 무단으로 호출해 막대한 요금 폭탄이 발생하거나 데이터가 탈취될 수 있습니다.',
    linkedUnitIds: ['unit-4-3', 'unit-7-4']
  },
  {
    id: 'concept-server-db',
    name: '서버 (Server) & 데이터베이스 (Database)',
    sessions: [4],
    primarySession: 4,
    explanation: '서버는 사용자의 요청을 받아 비즈니스 로직을 처리하고 결과를 반환하는 컴퓨터 시스템이며, 데이터베이스는 서비스에 필요한 계정 정보, 게시글, 학습 기록 등을 체계적이고 영구적으로 저장·조회·수정하는 시스템입니다.',
    example: '클라이언트(브라우저)에서 HTTP 요청을 보내면 웹 서버가 연산하고, 데이터베이스에서 사용자 데이터를 조회하여 JSON 형태로 응답해 줍니다.',
    linkedUnitIds: ['unit-4-4']
  },
  {
    id: 'concept-deployment',
    name: '배포 (Deployment)',
    sessions: [5, 7],
    primarySession: 5,
    explanation: '내 컴퓨터 로컬 폴더(file:///...)에만 머물러 있어 타인이 접속할 수 없던 웹사이트 파일을 호스팅 서버에 올려, 인터넷 공개 주소(URL)를 통해 전 세계 누구나 웹 브라우저로 접속할 수 있도록 제공하는 전 과정입니다.',
    example: '내 컴퓨터의 C:\\project\\index.html을 Vercel에 올려 https://my-first-site.vercel.app 이라는 공식 인터넷 주소로 누구나 열어보게 하는 일입니다.',
    linkedUnitIds: ['unit-5-1', 'unit-5-4', 'unit-7-5']
  },
  {
    id: 'concept-github-git',
    name: 'GitHub & Git (저장소와 커밋)',
    sessions: [5, 7],
    primarySession: 5,
    explanation: 'Git은 소스 코드의 변경 이력을 타임머신처럼 기록하는 버전 관리 시스템이며, GitHub는 이 프로젝트 파일들과 커밋(Commit, 변경 상태 기록 단위) 기록을 클라우드 원격 저장소(Repository)에 안전하게 보관하고 협업하는 플랫폼입니다.',
    example: '파일 수정 후 "제목과 소개 문구 수정"이라는 짧은 커밋 메시지를 남기면 변경 내역이 영구 보존되고 배포 도구로 자동 전달됩니다.',
    linkedUnitIds: ['unit-5-2', 'unit-5-4', 'unit-7-5']
  },
  {
    id: 'concept-vercel',
    name: 'Vercel (자동 배포 플랫폼)',
    sessions: [5, 7],
    primarySession: 5,
    explanation: 'GitHub 저장소와 연동되어 소스 코드가 커밋될 때마다 자동으로 빌드하고 인터넷 상용 Production 도메인을 발급해 주는 클라우드 정적 웹 호스팅 서비스입니다. 별도의 웹 서버 구축 없이 수 초 만에 배포가 완료됩니다.',
    example: 'GitHub main 브랜치에 코드가 푸시되면 Vercel이 즉시 새 배포를 시작하여 수 초 내에 최신 사이트가 인터넷에 라이브 반영됩니다.',
    linkedUnitIds: ['unit-5-2', 'unit-5-5', 'unit-7-5']
  },
  {
    id: 'concept-cli',
    name: 'CLI (Command Line Interface) & 터미널',
    sessions: [5],
    primarySession: 5,
    explanation: '마우스로 아이콘을 클릭하는 그래픽 환경(GUI)과 달리, 터미널 창에 키보드로 글자 명령어를 직접 입력하여 운영체제나 개발 도구를 제어하는 인터페이스입니다. 반복 작업을 정해진 순서로 자동화하고 AI 도구의 동작 상태를 정확히 제어할 때 사용됩니다.',
    example: 'Git 저장소의 현재 파일 변경 상태를 확인할 때 터미널 창에 `git status`라고 글자로 명령어를 입력하는 방식입니다.',
    linkedUnitIds: ['unit-5-3']
  },
  {
    id: 'concept-design-system',
    name: '디자인 시스템 (Design System) & 수치 규칙',
    sessions: [6, 7],
    primarySession: 6,
    explanation: '사이트 전체에서 일관된 사용자 경험을 주기 위해 함께 사용하는 체계적인 디자인 규칙입니다. 막연하게 "예쁘게" 요청하는 대신 배경(#F7F8FA), 본문(#17212B), 강조(#2855D9)의 색상 역할과 폰트 크기, 버튼 높이(48px), 모서리 반경(8px/16px), 여백 스케일(8·16·24·48·80px)을 명확한 수치로 정의합니다.',
    example: '모든 프로젝트 카드의 테두리 둥글림을 16px로 통일하고, 주요 버튼은 높이 48px와 모서리 8px, 청록색(#0F766E)으로 일관되게 규정합니다.',
    linkedUnitIds: ['unit-6-2', 'unit-7-2']
  },
  {
    id: 'concept-micro-interaction',
    name: '마이크로 인터랙션 (Micro-interaction) & 호버 효과',
    sessions: [7],
    primarySession: 7,
    explanation: '사용자가 버튼이나 카드 위에 마우스를 올리거나(Hover) 탭했을 때 즉각적이고 부드러운 피드백을 주는 미세 인터랙션입니다. 클릭 가능한 요소임을 직관적으로 알려주며 사이트의 완성도를 크게 끌어올립니다.',
    example: '프로젝트 카드 위에 마우스를 올렸을 때 카드가 부드럽게 위로 4px 떠오르며 옅은 그림자가 생기고 약 180ms 동안 부드럽게 전환(transition)되는 효과입니다.',
    linkedUnitIds: ['unit-7-2']
  },
  {
    id: 'concept-responsive-web',
    name: '반응형 웹 디자인 (Responsive Web) & 브레이크포인트',
    sessions: [3, 7],
    primarySession: 7,
    explanation: '화면 폭에 따라 레이아웃과 글자 크기가 유연하게 조정되어 데스크톱(1440px), 태블릿(768px), 스마트폰(390px, 360px) 등 어떤 기기에서도 글자 잘림이나 가로 넘침(Horizontal Overflow) 없이 최적으로 읽을 수 있도록 만드는 기법입니다.',
    example: '큰 화면에서는 소개 글(왼쪽)과 이미지(오른쪽)를 2열 나란히 배치하고, 모바일에서는 한 열로 세로 배치하며 헤더 메뉴 겹침을 방지합니다.',
    linkedUnitIds: ['unit-7-3']
  },
  {
    id: 'concept-vite-build',
    name: 'Vite 빌드 & dist 번들',
    sessions: [7],
    primarySession: 7,
    explanation: 'React나 TypeScript로 작성된 수많은 소스 파일(`src`)을 웹 브라우저가 빠르고 가볍게 실행할 수 있도록 압축·변환하여 최종 배포 폴더(`dist`)로 묶어내는 프로덕션 번들링 과정(`npm run build`)입니다. 수 기가바이트에 달하는 `node_modules`와 비밀 키(`.env`)는 제외하고 업로드합니다.',
    example: 'Vite가 모듈들을 한데 모아 최적화된 JS와 CSS로 번들링하고, Vercel은 이 dist 결과물을 받아 전 세계 CDN에 배포합니다.',
    linkedUnitIds: ['unit-7-4', 'unit-7-5']
  }
];
