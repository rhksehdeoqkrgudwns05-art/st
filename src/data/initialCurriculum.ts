/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyUnit, SessionMeta } from '../types/curriculum';

export const SESSIONS_META: SessionMeta[] = [
  {
    sessionNumber: 1,
    title: '1차시: 대화하며 코딩하는, 바이브코딩 첫걸음',
    pdfPageRange: 'PDF 1~17쪽',
    unitCount: 3
  },
  {
    sessionNumber: 2,
    title: '2차시: AI가 척척 만들어 주는 나만의 웹사이트를 기획하려면?',
    pdfPageRange: 'PDF 18~28쪽',
    unitCount: 3
  },
  {
    sessionNumber: 3,
    title: '3차시: 버튼 하나로 달라지는 웹사이트의 비밀',
    pdfPageRange: 'PDF 29~40쪽',
    unitCount: 3
  },
  {
    sessionNumber: 4,
    title: '4차시: 내 웹사이트, 안전하게 사용하는 꿀팁',
    pdfPageRange: 'PDF 41~51쪽',
    unitCount: 4
  },
  {
    sessionNumber: 5,
    title: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    pdfPageRange: 'PDF 52~80쪽',
    unitCount: 5
  },
  {
    sessionNumber: 6,
    title: '6차시: 나를 소개하는 포트폴리오 사이트 만들기',
    pdfPageRange: 'PDF 81~110쪽',
    unitCount: 4
  },
  {
    sessionNumber: 7,
    title: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    pdfPageRange: 'PDF 111~146쪽',
    unitCount: 5
  }
];

export const INITIAL_STUDY_UNITS: StudyUnit[] = [
  // ================= 1차시 (1~17쪽) =================
  {
    id: 'unit-1-1',
    sessionNumber: 1,
    sessionTitle: '1차시: 대화하며 코딩하는, 바이브코딩 첫걸음',
    unitNumber: 1,
    title: 'LLM(대형 언어 모델)의 개념과 다음 토큰 예측 원리',
    pdfPages: '1차시 · PDF 2~5쪽',
    pdfPageNumbers: [2, 3, 4, 5],
    learningGoal: '대형 언어 모델(LLM)의 기본 정의를 이해하고, 문맥을 바탕으로 다음 토큰을 확률적으로 예측하는 텍스트 생성 방식과 트랜스포머(Transformer) 기술의 역할을 파악한다.',
    coreConcepts: ['LLM (Large Language Model)', '텍스트 생성 원리', '토큰 (Token)', '트랜스포머 (Transformer)'],
    easyExplanation: 'LLM은 인터넷과 책에 실린 방대한 텍스트 데이터를 미리 학습하여 사람의 말을 알아듣고 답변을 만들어내는 거대한 인공지능 모델입니다. 핵심 원리는 "앞에 주어진 문맥을 보고 다음에 올 가장 자연스러운 말(언어 요소)을 확률적으로 예측하는 것"입니다. 이때 LLM은 단어를 통째로 보기보다 \'토큰(Token)\'이라는 작은 텍스트 처리 단위로 쪼개어 계산하며, 문장 안의 다양한 단어 간 관계를 깊이 있게 파악하기 위해 현대 인공지능의 핵심 기술인 \'트랜스포머(Transformer)\' 아키텍처를 활용합니다.',
    concreteExample: {
      fromMaterial: '강의자료에서는 "대한민국의 수도는 ____"이라는 문장이 주어졌을 때, 문맥을 분석하여 다음에 올 단어로 \'서울\'(가상 확률 90%), \'부산\'(7%), \'인천\'(3%)과 같이 확률을 계산하고 가장 적합한 \'서울\'을 골라 "대한민국의 수도는 서울입니다."라는 문장을 완성하는 예시를 제시하고 있습니다.',
      comprehensionAid: '[이해를 돕는 예시] 스마트폰으로 문자 메시지를 보낼 때 키보드 상단에 "밥 먹었어?" 뒤에 올 추천 단어로 "응", "아직", "어디야" 등이 뜨는 원리와 유사합니다. LLM은 이를 수십억 개의 매개변수와 트랜스포머 기술로 훨씬 정교하고 방대하게 계산해 긴 글이나 소스 코드까지 막힘없이 작성해 냅니다.'
    },
    relatedConceptIds: ['concept-llm', 'concept-token-prediction', 'concept-transformer']
  },
  {
    id: 'unit-1-2',
    sessionNumber: 1,
    sessionTitle: '1차시: 대화하며 코딩하는, 바이브코딩 첫걸음',
    unitNumber: 2,
    title: '대학생을 위한 LLM 서비스 활용과 3대 한계점 (환각·편향·최신성)',
    pdfPages: '1차시 · PDF 6~9쪽',
    pdfPageNumbers: [6, 7, 8, 9],
    learningGoal: '전공 학업 및 연구에서 LLM(ChatGPT, Gemini, Claude, SciSpace, LINER)을 활용하는 대표적 사례를 알고, LLM이 가진 3대 한계점(환각, 편향, 최신성)을 인식하여 비판적으로 검증하는 태도를 갖춘다.',
    coreConcepts: ['학술 연구 LLM (SciSpace, LINER)', '환각 (Hallucination)', '편향 (Bias)', '정보의 최신성', '정보 검증'],
    easyExplanation: '대학생은 전공 공부와 레포트 작성 시 LLM을 개념 이해, 논문 탐색, 데이터 분석, 프로그래밍 보조 등에 폭넓게 활용할 수 있습니다. 예를 들어 학술 연구에 특화된 SciSpace는 과학 논문 검색과 PDF 질의응답을 지원하고, 라이너(LINER)는 검색 결과와 함께 답변의 출처를 함께 제시해 줍니다. 그러나 LLM은 모든 것을 완벽하게 아는 것이 아닙니다. 사실이 아닌 내용을 진짜인 것처럼 지어내는 \'환각(Hallucination)\', 학습 데이터의 편향이 결과에 묻어나는 \'편향(Bias)\', 최신 외부 데이터에 연결되지 않으면 최근 상황을 알지 못하는 \'최신성 한계\'가 존재하므로 중요한 의사결정이나 학술 과제 전에는 반드시 인간의 검증이 필요합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 예시: 열역학에서 엔트로피 개념 설명 요청, 아레니우스 식과 활성화 에너지 추정 Python 코드 및 그래프 작성 요청, SciSpace를 통한 학술 논문 PDF 질의응답 및 문헌 리뷰, Liner Scholar를 통한 연구 특화 검색.',
      comprehensionAid: '[이해를 돕는 예시] 전공 시험 공부를 위해 AI에게 특정 학자의 논문 발표 연도나 실험 결과를 물었을 때, AI가 매우 자신 있는 어조로 그럴듯한 숫자와 가짜 논문 제목을 지어낼 수 있습니다. 이를 그대로 시험 답안이나 보고서에 쓰면 감점 요인이 되므로, 논문 원본(DOI나 원문 PDF)을 직접 열어 교차 확인해야 합니다.'
    },
    relatedConceptIds: ['concept-llm', 'concept-hallucination']
  },
  {
    id: 'unit-1-3',
    sessionNumber: 1,
    sessionTitle: '1차시: 대화하며 코딩하는, 바이브코딩 첫걸음',
    unitNumber: 3,
    title: '바이브 코딩(Vibe Coding)의 정의와 5대 필요성, 기초 지식의 중요성',
    pdfPages: '1차시 · PDF 10~16쪽',
    pdfPageNumbers: [10, 11, 12, 13, 14, 15, 16],
    learningGoal: '바이브 코딩(Vibe Coding)의 기본 개념과 기존 프로그래밍과의 차이점을 비교하고, 5대 필요성과 기초 코딩 지식이 필요한 이유를 설명할 수 있다.',
    coreConcepts: ['바이브 코딩 (Vibe Coding)', '5대 필요성', '기존 프로그래밍 vs 바이브 코딩', '코딩 기초 지식의 필요성'],
    easyExplanation: '바이브 코딩은 사용자가 프로그래밍 언어의 문법을 일일이 타이핑하는 대신, 일상에서 쓰는 자연어(우리가 쓰는 말)로 만들고 싶은 기능과 화면을 설명하면 생성형 AI가 실제 코드를 작성하고 수정해 주는 새로운 개발 방식입니다. 기존 프로그래밍이 "어떻게 코드를 짤까"에 주안점을 두었다면, 바이브 코딩은 "무엇을 만들지 요구사항을 명확히 정의하고, AI가 낸 결과를 어떻게 검증할까"에 집중합니다. 바이브 코딩의 5대 필요성은 ① 프로그래밍 진입장벽 완화, ② 개발 시간과 반복 작업 감소, ③ 아이디어의 빠른 구현과 검증, ④ 전공 지식의 실질적 활용 확대(실험 데이터 분석기 등), ⑤ 문제 해결 중심의 역량 강화입니다. 한편, 코딩을 전혀 몰라도 시작할 수 있지만 기초 지식을 갖추고 있다면 AI에게 훨씬 구체적인 지시를 내리고 간단한 에러는 직접 해결할 수 있어 훨씬 빠르고 정확합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 비교표: 기존 프로그래밍은 직접 코드를 작성하며 구현 능력이 핵심이고 진입장벽이 높지만, 바이브 코딩은 자연어로 요청하고 요구사항 정의 및 결과 검증이 주 역량이며 초기 진입장벽이 낮고 시제품을 빠르게 생성할 수 있습니다.',
      comprehensionAid: '[이해를 돕는 예시] 건물을 지을 때 직접 벽돌을 쌓고 미장을 하는 장인의 역할(기존 코딩)에서, 건물의 조감도와 방 구조를 명확히 설계하고 시공 결과를 점검하는 총괄 건축 감독(바이브 코더)으로 역할이 진화하는 것과 같습니다.'
    },
    relatedConceptIds: ['concept-vibe-coding']
  },

  // ================= 2차시 (18~28쪽) =================
  {
    id: 'unit-2-1',
    sessionNumber: 2,
    sessionTitle: '2차시: AI가 척척 만들어 주는 나만의 웹사이트를 기획하려면?',
    unitNumber: 1,
    title: '효과적인 프롬프트 작성의 6가지 핵심 조건',
    pdfPages: '2차시 · PDF 19~21쪽',
    pdfPageNumbers: [19, 20, 21],
    learningGoal: '생성형 AI가 고품질의 결과물을 산출하도록 유도하는 프롬프트의 6가지 핵심 조건(명확한 지시, 배경/맥락, 대상/수준, 출력형식, 조건/제약, 근거/출처)을 학습하고 실습에 적용한다.',
    coreConcepts: ['프롬프트 (Prompt)', '6대 조건', '프롬프트 엔지니어링'],
    easyExplanation: '프롬프트는 생성형 AI가 특정 작업을 수행하도록 사용자가 입력하는 질문이나 명령입니다. 같은 질문이라도 프롬프트를 어떻게 구성하느냐에 따라 결과의 품질이 천차만별입니다. 강의자료는 좋은 프롬프트를 만들기 위한 6가지 조건을 제시합니다: ① 명확한 작업 지시 (무엇을 할지 구체적으로 명시), ② 배경 및 맥락 제공 (질문의 목적과 현재 상황 설명), ③ 대상 및 수준 설정 (결과를 읽을 대상의 눈높이 지정), ④ 출력 형식 지정 (표, 리스트, 코드 등 구조 지정), ⑤ 조건 및 제약 설정 (글자 수, 기술 스택 등 제한), ⑥ 근거 및 출처 명시 (신뢰할 수 있는 학술/공식 출처 요구).',
    concreteExample: {
      fromMaterial: '자료 원문 대비 예시: 단순히 "엔트로피가 뭐야?"라고 묻는 대신, "열역학에서 엔트로피가 무엇인지 대학생 수준으로 설명해 줘. 일상적인 사례와 열역학 제2법칙을 연결해서 설명하고, 마지막에는 관련 수식을 제시해 줘"라고 조건을 구체화하여 요청합니다.',
      comprehensionAid: '[이해를 돕는 예시] 식당에 가서 "아무거나 맛있는 거 주세요"라고 하면 취향에 안 맞는 음식이 나올 수 있지만, "매운 걸 못 먹는 20대인데 15,000원 이하로 따뜻한 국물 요리를 추천해 주세요"라고 말하면 완벽한 메뉴를 추천받을 수 있는 것과 같습니다.'
    },
    relatedConceptIds: ['concept-prompt']
  },
  {
    id: 'unit-2-2',
    sessionNumber: 2,
    sessionTitle: '2차시: AI가 척척 만들어 주는 나만의 웹사이트를 기획하려면?',
    unitNumber: 2,
    title: '바이브 코딩을 위한 프롬프트의 특징과 점진적·반복적 개발 방식',
    pdfPages: '2차시 · PDF 22~23쪽',
    pdfPageNumbers: [22, 23],
    learningGoal: '일반적인 질의응답 프롬프트와 바이브 코딩 프롬프트의 차이를 알고, 핵심 기능부터 점진적으로 구현하고 개선하는 반복적 개발 방식을 이해한다.',
    coreConcepts: ['바이브 코딩 프롬프트', '동작 방식 명세', '반복적 개발 (Iterative Development)'],
    easyExplanation: '일반적인 대화형 프롬프트는 "어떤 답변을 들을까"에 초점을 맞추지만, 바이브 코딩 프롬프트는 "어떤 프로그램을 만들고, 어떻게 동작해야 하는가"에 집중합니다. 따라서 ① 프로그램의 개발 목적과 목표, ② 주 사용 대상, ③ 화면 구성 및 화면에 보여야 할 요소를 기술적 요구사항과 함께 전달해야 합니다. 특히 처음부터 모든 복잡한 기능을 한꺼번에 요구하면 AI가 혼란을 겪거나 코드가 꼬이기 쉽습니다. 핵심 기능을 먼저 구현하고, 결과를 직접 보면서 기능을 하나씩 추가하고 수정하는 \'반복적 개발 방식\'이 가장 효과적입니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설명: 처음부터 모든 요구사항을 입력하기보다는 핵심 기능을 먼저 구현한 다음, 실행 결과를 확인하면서 기능을 추가하고 오류를 수정하는 반복적인 개발 방식이 효과적임.',
      comprehensionAid: '[이해를 돕는 예시] 그림을 그릴 때 처음부터 한 구석에 눈코입을 완벽히 다 그리고 다른 곳으로 넘어가는 것이 아니라, 전체적인 큰 윤곽과 구도를 잡은 뒤 디테일과 색상을 점진적으로 덧입혀 나가는 과정입니다.'
    },
    relatedConceptIds: ['concept-vibe-coding', 'concept-prompt', 'concept-iterative-dev']
  },
  {
    id: 'unit-2-3',
    sessionNumber: 2,
    sessionTitle: '2차시: AI가 척척 만들어 주는 나만의 웹사이트를 기획하려면?',
    unitNumber: 3,
    title: '마크다운(Markdown)의 개념과 요구사항 체계화, 포트폴리오 기획',
    pdfPages: '2차시 · PDF 24~27쪽',
    pdfPageNumbers: [24, 25, 26, 27],
    learningGoal: '마크다운(.md)의 기본 문법과 장점을 이해하고, 복잡한 서비스 요구사항을 마크다운 문서로 체계화하여 AI 프롬프트로 제공하는 이유와 나를 소개하는 포트폴리오 기획의 첫 단계를 파악한다.',
    coreConcepts: ['마크다운 (Markdown)', '요구사항 문서화', '포트폴리오 웹사이트 기획'],
    easyExplanation: '마크다운은 복잡한 워드 프로그램 없이도 # (제목), * (강조), - (목록) 같은 간단한 기호로 문서의 구조와 서식을 명확히 표현할 수 있는 경량 마크업 언어입니다. 개발하려는 웹 서비스는 기능과 요구사항이 복잡하므로, 먼저 LLM과 대화하며 목적, 주요 기능, 화면 구성을 마크다운 파일로 정리한 뒤 이를 바이브 코딩 프롬프트로 전달하면 기능 누락이나 요구사항 불일치를 획기적으로 줄일 수 있습니다. 2차시에서는 이 방식으로 \'나를 소개하는 포트폴리오 웹사이트\'(인적사항, 학력, 전공 프로젝트 등)를 마크다운으로 기획하는 실습을 시작합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 예시: 마크다운 입력 "# 실험 보고서", "## 실험 목적", "**온도**에 따른 반응속도 분석", "- 데이터 수집", "- 결과 분석"이 변환된 서식 문서로 렌더링되는 과정 및 [프로젝트 1 소개] 포트폴리오 웹사이트 구성 요소.',
      comprehensionAid: '[이해를 돕는 예시] 말로만 "이런 느낌으로 사이트 만들어줘"라고 두서없이 부탁하면 중요한 메뉴가 빠질 수 있습니다. 목차와 불렛포인트로 깔끔하게 정리된 기획서(마크다운)를 AI에게 쥐어주면, 설계도면을 보고 시공하듯 오차 없이 코드를 작성하게 됩니다.'
    },
    relatedConceptIds: ['concept-markdown', 'concept-vibe-coding']
  },

  // ================= 3차시 (29~40쪽) =================
  {
    id: 'unit-3-1',
    sessionNumber: 3,
    sessionTitle: '3차시: 버튼 하나로 달라지는 웹사이트의 비밀',
    unitNumber: 1,
    title: '웹사이트의 주요 레이아웃 구성 요소 (헤더, 내비게이션, 푸터 등)',
    pdfPages: '3차시 · PDF 30~31쪽',
    pdfPageNumbers: [30, 31],
    learningGoal: '웹사이트를 구성하는 주요 6대 시각적 영역(헤더, 내비게이션, 히어로 영역, 메인 콘텐츠, 사이드바, 푸터)의 위치와 역할을 이해한다.',
    coreConcepts: ['헤더 (Header)', '내비게이션 (Navigation)', '히어로 영역 (Hero Section)', '메인 콘텐츠 (Main Content)', '사이드바 (Sidebar)', '푸터 (Footer)'],
    easyExplanation: '사용자가 접하는 일반적인 웹사이트는 정형화된 영역들로 구성됩니다: ① 헤더(Header): 사이트 상단에 위치하여 로고, 사이트명, 로그인 버튼 등을 표시합니다. ② 내비게이션(Navigation): 사용자가 원하는 페이지나 섹션으로 이동할 수 있도록 메뉴와 링크를 제공합니다(주로 헤더 내부나 하단에 배치). ③ 히어로 영역(Hero Section): 첫인상을 결정짓는 최상단 대형 영역으로 핵심 문구, 대표 이미지, 시작 버튼을 배치합니다. ④ 메인 콘텐츠(Main Content): 서비스의 핵심 정보와 카드가 모인 중심 구역입니다. ⑤ 사이드바(Sidebar): 추가 메뉴나 필터 등을 보조합니다. ⑥ 푸터(Footer): 맨 하단에 위치하며 회사/개인 정보, 연락처, 이용약관, 저작권 정보를 표시합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 다이어그램: 상단 헤더 및 내비게이션(홈 | 서비스 소개 | 자료실 | 문의), 중앙 히어로 영역(핵심 문구, 이미지, 시작 버튼), 메인 콘텐츠(콘텐츠 카드 1~4), 우측 사이드바, 하단 푸터(회사 정보, 이용약관, 개인정보처리방침) 구조.',
      comprehensionAid: '[이해를 돕는 예시] 신문의 1면 구성과 비슷합니다. 맨 위 신문 제호(헤더), 섹션 바로가기(내비게이션), 가장 큰 특종 헤드라인과 사진(히어로 영역), 기사 본문들(메인 콘텐츠), 하단 발행처 및 저작권 표시(푸터)로 배치되어 독자가 한눈에 읽을 수 있습니다.'
    },
    relatedConceptIds: ['concept-layout-structure']
  },
  {
    id: 'unit-3-2',
    sessionNumber: 3,
    sessionTitle: '3차시: 버튼 하나로 달라지는 웹사이트의 비밀',
    unitNumber: 2,
    title: '프론트엔드와 백엔드의 역할 구분과 바이브 코딩 실습의 범위',
    pdfPages: '3차시 · PDF 32~33쪽',
    pdfPageNumbers: [32, 33],
    learningGoal: '프론트엔드와 백엔드의 상호 역할을 이해하고, 입문 바이브 코딩에서 왜 프론트엔드 개발에 집중하는지 그 이유를 설명할 수 있다.',
    coreConcepts: ['프론트엔드 (Frontend)', '백엔드 (Backend)', '클라이언트-서버 구조'],
    easyExplanation: '웹 개발은 크게 두 영역으로 나뉩니다. 프론트엔드는 사용자가 웹사이트에 접속했을 때 직접 보고 누르며 상호작용하는 영역으로, 화면 구성, 시각적 디자인, 버튼, 메뉴, 사용자 입력 처리를 담당합니다. 반면 백엔드는 사용자에게 직접 보이지 않는 영역으로, 데이터베이스 저장 및 관리, 사용자 인증(로그인), 서버 운영 등 내부 기능을 담당합니다. 입문 수준의 바이브 코딩은 주로 프론트엔드 개발에 해당합니다. AI를 활용해 화면을 구성하고 버튼 동작을 즉각 눈으로 확인하며 빠르게 아이디어를 구현할 수 있기 때문입니다. 로그인, 원격 데이터베이스 저장 등은 추후 백엔드 개발이 추가로 요구됩니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설명: 보통의 바이브 코딩은 프론트엔드 개발에 해당하며, 인공지능을 활용하여 웹사이트의 화면을 구성하고 버튼이나 메뉴를 구현하며 사용자의 요청에 따라 디자인과 동작을 수정하는 과정을 경험함.',
      comprehensionAid: '[이해를 돕는 예시] 고급 레스토랑에서 손님이 앉아 메뉴판을 보고 음식을 즐기는 홀 인테리어와 테이블 서빙은 프론트엔드이고, 보이지 않는 주방에서 식재료를 창고에서 꺼내 조리하고 결제를 처리하는 시스템은 백엔드입니다.'
    },
    relatedConceptIds: ['concept-frontend-backend']
  },
  {
    id: 'unit-3-3',
    sessionNumber: 3,
    sessionTitle: '3차시: 버튼 하나로 달라지는 웹사이트의 비밀',
    unitNumber: 3,
    title: '웹 3대 기술(HTML, CSS, JS)과 건축 비유, React/TypeScript',
    pdfPages: '3차시 · PDF 34~39쪽',
    pdfPageNumbers: [34, 35, 36, 37, 38, 39],
    learningGoal: '웹 프론트엔드를 구성하는 HTML, CSS, JavaScript의 고유 역할과 건축 비유를 이해하고, React와 TypeScript 등 기초 지식이 AI 코딩 효율에 미치는 영향을 파악한다.',
    coreConcepts: ['HTML', 'CSS', 'JavaScript (JS)', '건축 비유', 'React', 'TypeScript'],
    easyExplanation: '웹사이트의 프론트엔드는 3대 기술로 완성됩니다: ① HTML: 웹페이지의 기본 구조와 콘텐츠를 정의하는 마크업 언어로, 건축물에 비유하면 건물의 철골 뼈대와 공간 구조를 만듭니다. ② CSS: 디자인과 시각적 표현을 담당하는 스타일 시트 언어로, 건축물의 벽지, 페인트 색상, 인테리어 등 외관을 꾸미며 반응형 레이아웃을 만듭니다. ③ JavaScript: 동적인 기능과 상호작용을 구현하는 프로그래밍 언어로, 조명 스위치, 자동문, 엘리베이터처럼 실제로 작동하는 기능을 만듭니다. 바이브 코딩 시 기술을 지정하지 않아도 AI가 적절한 기술(HTML/CSS/JS, React, TypeScript 등)을 선택해 주지만, 이 기본 구조를 알고 있으면 AI에게 사용할 기술을 똑똑하게 지정하고 사소한 에러를 직접 고칠 수 있습니다.',
    concreteExample: {
      fromMaterial: '자료 원문 비유: HTML=건물의 뼈대와 공간 구조 / CSS=벽지, 색상, 인테리어 등 외관 / JavaScript=조명 스위치, 자동문, 엘리베이터 등 실제로 작동하는 기능.',
      comprehensionAid: '[이해를 돕는 예시] 버튼을 파란색으로 바꾸고 싶을 때 "이거 파랗게 해줘"라고 AI에게 매번 물어보는 대신, CSS 코드에서 color 속성 하나만 직접 쓱 고치는 것이 1초 만에 끝나 훨씬 효율적입니다.'
    },
    relatedConceptIds: ['concept-web-trio']
  },

  // ================= 4차시 (41~51쪽) =================
  {
    id: 'unit-4-1',
    sessionNumber: 4,
    sessionTitle: '4차시: 내 웹사이트, 안전하게 사용하는 꿀팁',
    unitNumber: 1,
    title: '바이브 코딩으로 만든 웹사이트의 보안 취약점과 안전 수칙',
    pdfPages: '4차시 · PDF 42쪽, 50쪽',
    pdfPageNumbers: [42, 50],
    learningGoal: 'AI가 생성한 코드에 내재될 수 있는 보안 취약점과 접근 권한 오류를 인식하고, 사용자 개인정보나 결제 정보 처리 시 각별한 보안 검토가 필요함을 이해한다.',
    coreConcepts: ['보안 취약점', '접근 권한 설정 오류', '개인정보 보호', '프론트엔드 중심 실습 이유'],
    easyExplanation: '바이브 코딩을 활용하면 전문 지식이 부족해도 빠르게 웹사이트를 만들 수 있지만, AI가 생성한 코드의 안전성이 항상 보장되는 것은 아닙니다. AI가 작성한 코드에는 보안 취약점이나 잘못된 접근 권한 설정이 숨어 있을 수 있어 개인정보 유출이나 해킹 공격의 위험이 발생할 수 있습니다. 특히 로그인, 회원가입, 결제, 개인정보 저장이 포함된 사이트는 사용자 정보를 다루므로 엄격한 보안 검증이 필수적입니다. 반면 이번 전공 웹 실습은 별도의 로그인이나 개인정보 저장 기능이 없는 프론트엔드 중심 웹사이트를 제작하므로 위험을 상대적으로 쉽게 제한할 수 있습니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설명: 로그인, 회원가입, 개인정보 저장, 결제 기능 등이 포함된 웹사이트는 사용자의 중요한 정보를 처리하므로 더욱 철저한 보안 검토가 필요함. 이번 실습은 프론트엔드 중심이므로 상대적으로 위험이 제한적임.',
      comprehensionAid: '[이해를 돕는 예시] 시건장치가 없는 전시관 부스(정적 프론트엔드 페이지)는 도난당할 귀중품이 없어서 안전하지만, 금고와 고객 계좌 장부가 있는 은행 창구(로그인/결제 백엔드)를 지으려면 전문 보안 잠금장치가 반드시 필요한 것과 같습니다.'
    },
    relatedConceptIds: ['concept-api-key', 'concept-frontend-backend']
  },
  {
    id: 'unit-4-2',
    sessionNumber: 4,
    sessionTitle: '4차시: 내 웹사이트, 안전하게 사용하는 꿀팁',
    unitNumber: 2,
    title: 'API(Application Programming Interface)의 개념과 외부 연동',
    pdfPages: '4차시 · PDF 43~45쪽',
    pdfPageNumbers: [43, 44, 45],
    learningGoal: 'API의 개념과 동작 원리(요청과 응답)를 이해하고, 외부 서비스의 기상 데이터, 지도, 번역, AI 기능을 내 웹사이트로 가져오는 연동 방식을 학습한다.',
    coreConcepts: ['API (Application Programming Interface)', '요청(Request)과 응답(Response)', '외부 서비스 연동'],
    easyExplanation: 'API는 서로 다른 소프트웨어나 시스템이 정해진 규칙에 따라 데이터를 주고받거나 기능을 사용할 수 있도록 연결해 주는 인터페이스입니다. API를 활용하면 날씨 관측소나 지도 데이터베이스를 내가 직접 구축하지 않아도, 외부 전문 기관의 API를 통해 필요한 정보를 쏙 가져와 내 웹사이트 화면에 뿌려줄 수 있습니다. 바이브 코딩에서도 지도, 날씨, 번역, 생성형 AI(Gemini 등) 기능을 연동할 때 API의 개념을 알고 있으면 AI에게 외부 연동 코드를 훨씬 구체적으로 요청할 수 있습니다.',
    concreteExample: {
      fromMaterial: '자료 원문 다이어그램: 사용자 웹사이트가 "오늘 서울의 기온을 알려줘"라고 API 요청을 보내면, 날씨 정보 제공 시스템이 날씨 데이터를 반환(응답)하고, 웹사이트 화면에 기온, 습도, 강수확률을 표시함.',
      comprehensionAid: '[이해를 돕는 예시] 식당에 갔을 때 손님이 주방에 직접 들어가 요리를 하지 않고, 종업원(API)에게 메뉴를 주문(Request)하면 종업원이 주방에서 음식을 받아 손님 테이블로 가져다주는(Response) 것과 같은 이치입니다.'
    },
    relatedConceptIds: ['concept-api']
  },
  {
    id: 'unit-4-3',
    sessionNumber: 4,
    sessionTitle: '4차시: 내 웹사이트, 안전하게 사용하는 꿀팁',
    unitNumber: 3,
    title: 'API 키와 보안 관리 (유출 위험과 환경 변수)',
    pdfPages: '4차시 · PDF 46~47쪽',
    pdfPageNumbers: [46, 47],
    learningGoal: 'API 키의 인증 및 과금 관리 역할을 파악하고, 프론트엔드 코드나 GitHub 공개 저장소에 키를 노출했을 때의 위험과 환경 변수를 통한 안전한 보관법을 숙지한다.',
    coreConcepts: ['API 키 (API Key)', '유출 위험 및 과금 피해', '환경 변수 (.env)', '접근 권한 제한'],
    easyExplanation: 'API 키는 외부 서비스 API를 이용하기 위해 발급받는 고유한 인증 정보(일종의 디지털 출입증이자 열쇠)입니다. 서비스 이용 권한을 확인하고 사용량을 관리하는 데 쓰입니다. 비밀번호와 같으므로 타인에게 유출되면 제3자가 내 명의로 서비스를 무단 사용하거나 과도한 API 호출로 막대한 요금 폭탄이 청구될 수 있습니다. 특히 바이브 코딩 시 AI가 생성한 자바스크립트 코드에 API 키를 그대로 적어두거나 GitHub 같은 공개 저장소에 올리면 순식간에 전 세계에 유출됩니다. API 키는 반드시 서버의 환경 변수(.env)나 보안 저장소에 보관하고, 사용 한도(Quota)를 설정해야 합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 경고: 비밀 API 키를 웹사이트의 프론트엔드 코드에 직접 작성하거나 GitHub와 같은 공개 저장소에 업로드하지 않도록 주의해야 함. API 키는 서버의 환경 변수나 보안 저장소에 안전하게 보관하고 사용량을 주기적으로 확인해야 함.',
      comprehensionAid: '[이해를 돕는 예시] 신용카드를 현관문 앞에 붙여놓고 외출하면 누구나 긁어서 쓸 수 있듯, 브라우저가 읽는 공개 코드(F12 개발자 도구로 누구나 볼 수 있는 곳)에 API 키를 적어두는 것은 신용카드를 길거리에 버려두는 것과 같습니다.'
    },
    relatedConceptIds: ['concept-api-key']
  },
  {
    id: 'unit-4-4',
    sessionNumber: 4,
    sessionTitle: '4차시: 내 웹사이트, 안전하게 사용하는 꿀팁',
    unitNumber: 4,
    title: '서버와 데이터베이스의 역할, 그리고 프론트엔드 집중 이유',
    pdfPages: '4차시 · PDF 48~50쪽',
    pdfPageNumbers: [48, 49, 50],
    learningGoal: '서버(요청 처리)와 데이터베이스(체계적 저장)의 기능을 이해하고, 왜 이번 바이브 코딩 실습에서는 서버 구축을 제외하고 프론트엔드에 집중하는지 그 배경을 이해한다.',
    coreConcepts: ['서버 (Server)', '데이터베이스 (Database)', '웹 서비스 아키텍처', '실습 범위 설정'],
    easyExplanation: '서버는 사용자의 요청을 받아 필요한 작업을 처리하고 결과를 반환하는 시스템(로그인, 데이터 조회, 외부 API 연동 등)이며, 데이터베이스는 서비스 운영에 필요한 정보를 체계적으로 영구 저장하고 관리하는 시스템(회원 계정, 게시글, 학습 기록 등)입니다. 둘을 활용하면 회원 관리와 개인화 맞춤 기능을 제공할 수 있지만, 별도의 개발 환경 구성, 사용자 인증, 접근 권한 설정, 개인정보 보호 등 추가적인 보안 관리가 막대하게 요구됩니다. 따라서 이번 바이브 코딩 실습에서는 제한된 시간과 보안 복잡성을 고려하여 서버/DB 구축을 제외하고 프론트엔드 화면 개발에 온전히 집중합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 구조도: Client (노트북) ↔ HTTP requests and responses ↔ Web Server ↔ Application Servers ↔ Database (데이터 영구 보관).',
      comprehensionAid: '[이해를 돕는 예시] 처음 요리를 배울 때 직접 밭을 일구고 가축을 기르는 일(서버/DB 인프라 구축)부터 시작하면 요리를 맛보기 전에 지쳐버립니다. 신선한 손질 재료를 가지고 프라이팬과 플레이팅(프론트엔드 화면 구성)에 집중해 첫 요리를 성공적으로 완성하는 전략입니다.'
    },
    relatedConceptIds: ['concept-server-db', 'concept-frontend-backend']
  },

  // ================= 5차시 (52~80쪽) =================
  {
    id: 'unit-5-1',
    sessionNumber: 5,
    sessionTitle: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    unitNumber: 1,
    title: '내 컴퓨터의 파일(file://)과 인터넷 배포 사이트(https://)의 차이',
    pdfPages: '5차시 · PDF 53~55쪽',
    pdfPageNumbers: [53, 54, 55],
    learningGoal: '내 컴퓨터 로컬 파일 경로와 인터넷에 배포된 공개 주소의 결정적 차이를 이해하고, 배포(Deployment)의 의미를 설명할 수 있다.',
    coreConcepts: ['로컬 파일 경로 (file:///)', '배포 (Deployment)', '공개 호스팅 주소 (https://)'],
    easyExplanation: '내 컴퓨터에서 더블 클릭해 연 HTML 파일의 주소창에는 `file:///C:/Users/.../index.html` 같은 로컬 경로가 뜹니다. 이는 내 컴퓨터 하드디스크의 파일을 직접 연 것이므로, 이 주소를 카카오톡이나 이메일로 친구에게 보내줘도 친구 컴퓨터에는 파일이 없기 때문에 열리지 않습니다. 반면 인터넷 배포 서비스(Vercel 등)에 올리면 `https://my-site.vercel.app` 같은 공개 주소가 발급되며, 클라우드 서버가 파일을 전송해 주므로 전 세계 누구든 인터넷만 연결되어 있으면 사이트에 접속할 수 있습니다. 이렇게 방문자가 접속할 수 있도록 사이트를 인터넷에 제공하는 전 과정을 \'배포(Deployment)\'라고 합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 대비: 내 컴퓨터의 HTML (file:///.../index.html - 내 컴퓨터 파일을 직접 염, 경로만 보내면 다른 사람이 열 수 없음) vs 배포한 사이트 (https://...vercel.app - 배포 서비스가 파일을 제공, 공개 주소로 다른 사람도 접속).',
      comprehensionAid: '[이해를 돕는 예시] 내 방 일기장에 적어둔 글은 친구에게 "내 일기장 30페이지 봐봐"라고 방 주소를 알려줘도 친구가 볼 수 없지만, 블로그나 인스타그램(공개 배포 웹)에 글을 올리면 누구나 링크 하나로 바로 읽을 수 있는 것과 같습니다.'
    },
    relatedConceptIds: ['concept-deployment']
  },
  {
    id: 'unit-5-2',
    sessionNumber: 5,
    sessionTitle: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    unitNumber: 2,
    title: 'GitHub와 Vercel의 역할 분담과 저장소(Repo)·커밋(Commit)',
    pdfPages: '5차시 · PDF 56~57쪽',
    pdfPageNumbers: [56, 57],
    learningGoal: '파일 보관 및 변경 이력을 관리하는 GitHub와, 저장소와 연동되어 사이트를 인터넷에 배포하는 Vercel의 상호 보완 역할을 이해한다.',
    coreConcepts: ['GitHub', 'Vercel', '저장소 (Repository)', '커밋 (Commit)', '커밋 메시지'],
    easyExplanation: '웹 배포 실습에서는 GitHub와 Vercel이 콤비를 이룹니다: ① GitHub: 프로젝트 파일들을 안전하게 보관하고, 코드가 바뀔 때마다 변경 이력을 기록(커밋)하며 코드 변경 내용을 검토하는 저장소(Repository) 역할을 합니다. ② Vercel: GitHub 저장소와 연결되어, 새 코드가 올라올 때마다 사이트를 자동으로 빌드해 배포하고, 배포 상태와 상용 인터넷 주소를 관리하여 방문자에게 보여줍니다. 이때 \'커밋(Commit)\'은 프로젝트의 변경 상태를 저장하는 단위이며, \'커밋 메시지\'는 무엇을 바꿨는지 설명하는 짧은 문장(예: "첫 웹페이지 업로드", "버튼 색상 수정")입니다.',
    concreteExample: {
      fromMaterial: '자료 원문 정리: GitHub = 프로젝트 파일 보관, 커밋으로 변경 이력 관리, 코드 확인 / Vercel = 연결된 저장소의 파일로 사이트 배포, 배포 상태와 사이트 주소 관리, 방문자가 사용할 화면 제공.',
      comprehensionAid: '[이해를 돕는 예시] GitHub는 게임의 \'세이브 파일 목록\'(원할 때 과거 시점으로 되돌릴 수 있음)이고, Vercel은 그 세이브 데이터를 읽어서 전 세계 게이머가 접속할 수 있는 \'라이브 게임 서버\'를 띄워주는 호스팅 엔진입니다.'
    },
    relatedConceptIds: ['concept-github-git', 'concept-vercel', 'concept-deployment']
  },
  {
    id: 'unit-5-3',
    sessionNumber: 5,
    sessionTitle: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    unitNumber: 3,
    title: 'CLI(Command Line Interface)의 의미와 학습 가치',
    pdfPages: '5차시 · PDF 64~65쪽',
    pdfPageNumbers: [64, 65],
    learningGoal: '글자로 명령어를 입력하는 CLI의 개념을 알고, 반복 작업 자동화와 AI 코딩 도구 활용 측면에서 CLI 학습이 주는 장점을 파악한다.',
    coreConcepts: ['CLI (Command Line Interface)', '터미널 (Terminal)', '`git status`', '자동화'],
    easyExplanation: 'CLI(Command Line Interface)는 마우스로 창과 버튼을 클릭하는 GUI(Graphical User Interface)와 달리, 까만 터미널 창에 키보드로 글자 명령어를 직접 입력해 컴퓨터 도구를 조작하는 방식입니다. 초보자 실습에서는 GitHub 웹 화면에서 드래그 앤 드롭으로 파일을 올릴 수 있지만, CLI를 배워두면 반복되는 개발 작업을 일정한 스크립트 순서로 자동 실행할 수 있고 여러 파일과 브랜치를 신속하게 다룰 수 있습니다. 특히 최신 AI 코딩 도구들이 터미널 명령어 형태로 실행되므로, CLI 개념을 알면 AI 도구의 실행 상태를 정확히 이해할 수 있습니다.',
    concreteExample: {
      fromMaterial: '자료 원문 예시: 터미널 창에 `git status` 명령을 입력하여 현재 Git 작업 폴더의 파일 변경 상태를 한눈에 확인하는 명령.',
      comprehensionAid: '[이해를 돕는 예시] 마우스로 폴더를 하나씩 열고 파일을 100번 끌어다 옮기는 대신, 터미널에 명령어 한 줄을 치면 1초 만에 100개 파일이 알아서 분류되고 배포되는 것과 같은 강력한 업무 자동화 도구입니다.'
    },
    relatedConceptIds: ['concept-cli']
  },
  {
    id: 'unit-5-4',
    sessionNumber: 5,
    sessionTitle: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    unitNumber: 4,
    title: 'HTML 한 파일 배포 순서와 Vercel 핵심 설정',
    pdfPages: '5차시 · PDF 58~72쪽',
    pdfPageNumbers: [58, 59, 61, 62, 63, 66, 67, 68, 69, 70, 71, 72],
    learningGoal: 'GitHub 저장소 생성부터 index.html 업로드, Vercel 프로젝트 연동 및 Other 프리셋 설정까지 4단계 배포 과정을 완벽히 수행한다.',
    coreConcepts: ['배포 4단계 순서', 'GitHub 업로드 & 커밋', 'Vercel Import', 'Framework Preset: Other', 'Production 도메인'],
    easyExplanation: '단일 HTML 파일을 배포하는 4단계 순서는 다음과 같습니다: 1) 파일 확인: 제공된 `index.html`을 브라우저에서 먼저 테스트합니다. 2) GitHub에 저장: GitHub에서 새 저장소(`my-first-site`, Public)를 만들고 `index.html` 파일을 드래그 업로드한 뒤 커밋 메시지를 적고 커밋을 완료합니다. 3) Vercel로 배포: Vercel에 GitHub 계정으로 로그인한 뒤 해당 저장소를 Import합니다. 이때 Framework Preset은 \'Other\'로 두고, 빌드 명령(Build Command) Override를 켜서 빈 값으로 유지하며 최상위 `index.html`을 바로 서빙하도록 설정합니다. 4) 배포 완료 확인: Deploy를 누르고 상태가 \'Ready\'가 되면 발급된 Production 도메인으로 접속해 화면과 기능 동작을 확인합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설정값: Framework Preset = Other, Root Directory = 저장소 최상위, Build Command = Override 켜고 빈 값 유지, Output Directory = 기본값 유지(public 폴더가 없으면 루트 파일 제공).',
      comprehensionAid: '[이해를 돕는 예시] 조립식 텐트(Other 프리셋)를 칠 때는 복잡한 시멘트 타설(빌드 명령어)이 필요 없으므로 빌드 명령을 비워두고 텐트 천(index.html)만 땅바닥(루트 디렉토리)에 곧바로 펼쳐놓는 방식입니다.'
    },
    relatedConceptIds: ['concept-deployment', 'concept-github-git', 'concept-vercel']
  },
  {
    id: 'unit-5-5',
    sessionNumber: 5,
    sessionTitle: '5차시: 내가 만든 사이트에 인터넷 주소 만들기',
    unitNumber: 5,
    title: '코드 수정 실습, GitHub 커밋 후 자동 재배포 및 문제 해결',
    pdfPages: '5차시 · PDF 73~77쪽',
    pdfPageNumbers: [73, 74, 75, 76, 77],
    learningGoal: 'HTML 문구와 버튼 색상을 수정한 뒤 커밋하면 Vercel이 자동으로 재배포하는 과정을 확인하고, 404 오류나 수정 미반영 시 점검 리스트를 숙지한다.',
    coreConcepts: ['자동 재배포', '코드 수정 실습', '문제 해결 체크리스트 (404, 권한, 캐시)'],
    easyExplanation: '배포가 연결된 뒤에는 파일을 매번 다시 Vercel에 올릴 필요가 없습니다. GitHub 웹 편집기에서 `index.html`의 제목, 소개 문구, 버튼 색상 코드를 수정한 뒤 main 브랜치에 커밋하면, Vercel이 새 커밋을 감지해 몇 초 만에 자동으로 새 배포를 완료합니다. 만약 문제가 발생한다면 다음을 확인합니다: ① 저장소가 안 보일 때: GitHub 계정과 Vercel의 저장소 접근 권한 확인. ② 404 화면이 뜰 때: 파일명이 소문자 `index.html`인지, 루트 디렉토리에 정확히 있는지 확인. ③ 수정이 안 보일 때: 커밋이 정상 완료되었는지, Vercel의 최신 배포가 끝났는지 확인하고 브라우저 새로고침. ④ 다른 사람이 접속 못할 때: 배포 보호(Deployment Protection) 설정 여부 확인.',
    concreteExample: {
      fromMaterial: '자료 원문 수정 실습: 화면 제목 h1 ("이번 주말, 바다로 가요"), 소개 문구 #intro ("좋아하는 풍경을 골라 나만의 하루를 완성하세요."), 버튼 색상 (`--button-color: #155b52;` → `#2549a5;`) 수정 후 자동 재배포 확인.',
      comprehensionAid: '[이해를 돕는 예시] 구글 닥스 문서를 수정한 뒤 저장 버튼을 따로 누르지 않아도 링크를 가진 모든 사람의 화면에 실시간으로 수정본이 반영되는 협업 문서의 편리함을 웹 배포 시스템이 구현해 준 것입니다.'
    },
    relatedConceptIds: ['concept-vercel', 'concept-github-git', 'concept-deployment']
  },

  // ================= 6차시 (81~110쪽) =================
  {
    id: 'unit-6-1',
    sessionNumber: 6,
    sessionTitle: '6차시: 나를 소개하는 포트폴리오 사이트 만들기',
    unitNumber: 1,
    title: '포트폴리오 사이트 기획과 4가지 핵심 소개 내용',
    pdfPages: '6차시 · PDF 82~86쪽',
    pdfPageNumbers: [82, 83, 84, 85, 86],
    learningGoal: '포트폴리오의 방문자 타겟과 목적을 정의하고, 4가지 필수 구성 항목(나의 소개, 관심 분야, 활동 경험, 프로젝트)의 내용을 체계적으로 기획한다.',
    coreConcepts: ['포트폴리오 기획', '방문자 정의', '경험의 근거', '4대 소개 항목'],
    easyExplanation: '포트폴리오 사이트는 나와 함께 전공 공부를 하거나 프로젝트를 진행할 동료 및 평가자(방문자)를 위해 제작합니다. 따라서 단순한 이력 나열이 아니라, 4가지 핵심 정보를 유기적으로 전달해야 합니다: ① 나의 소개: 이름, 전공, 한 줄 소개 문장(학년은 선택). ② 관심 분야: 지금 배우고 있거나 더 깊이 탐구하고 싶은 세부 주제. ③ 활동 경험: 수업, 전공 동아리, 스터디, 대외 활동 등. ④ 프로젝트: 프로젝트의 목적, 내가 맡은 구체적인 역할, 진행 과정, 결과와 배운 점. 특히 내가 직접 한 일과 팀의 결과를 명확히 구분하고, 다음 행동(프로젝트 상세 설명)으로 자연스럽게 이어지도록 설계합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 예시: 강사 시연 예시(홍길동 / 의공학전공 4학년, 생체신호 AI · 물리 기반 모델링, 심화 연구 프로젝트 소개) 및 학생 각자의 전공·관심분야·활동·과제 프로젝트를 기획서로 준비하는 구조.',
      comprehensionAid: '[이해를 돕는 예시] "저는 컴퓨터를 잘합니다"라는 추상적인 말 대신, "의공학 전공생으로서 심전도(ECG) 데이터를 분석해 부정맥을 예측하는 Python 프로젝트에서 데이터 전처리와 모델 평가를 전담했습니다"라고 구체적인 역할과 배운 점을 명시하는 것입니다.'
    },
    relatedConceptIds: ['concept-layout-structure', 'concept-vibe-coding']
  },
  {
    id: 'unit-6-2',
    sessionNumber: 6,
    sessionTitle: '6차시: 나를 소개하는 포트폴리오 사이트 만들기',
    unitNumber: 2,
    title: '디자인 시스템의 개념과 "예쁘게"를 구체적 수치 규칙으로 바꾸기',
    pdfPages: '6차시 · PDF 87~91쪽',
    pdfPageNumbers: [87, 88, 89, 90, 91],
    learningGoal: '사이트 전체의 통일성을 지켜주는 디자인 시스템의 의미를 이해하고, 막연한 표현 대신 색상·폰트·크기·여백의 명확한 수치 규칙을 적용한다.',
    coreConcepts: ['디자인 시스템 (Design System)', '색상 역할', '타이포그래피 규격', '간격 및 여백 약속'],
    easyExplanation: '디자인 시스템은 사이트 전체에서 일관되게 적용하는 디자인 약속입니다. "예쁘고 깔끔하게 만들어줘"라는 막연한 요청은 사람이나 AI마다 해석이 다르므로, 눈으로 확인할 수 있는 구체적인 수치 규칙으로 바꿔야 합니다: ① 색상 역할: 배경 `#F7F8FA`, 본문 `#17212B`, 강조 파란색 `#2855D9` (주요 버튼과 중요 표시에 반복 사용). ② 타이포그래피: 큰 제목 56px(모바일 36px), 본문 18px(모바일 16px), 줄 간격 약 1.7배. ③ 버튼: 높이 48px 이상, 모서리 둥글림(border-radius) 8px. ④ 프로젝트 카드: 모서리 16px, 일관된 패딩. ⑤ 간격 스케일: 8·16·24·48·80px 단계를 기준으로 배치하고 전체 폭은 최대 1120px로 제한하여 좌우 여백을 확보합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 대비표: 막연한 요청("깔끔하게 만들어 줘", "제목은 눈에 띄게", "버튼은 예쁘게") → 확인할 수 있는 요청("밝은 배경과 파란 강조색", "큰 제목과 읽기 쉬운 본문", "버튼 높이 48px, 모서리 8px").',
      comprehensionAid: '[이해를 돕는 예시] 옷을 입을 때 상의, 하의, 신발의 색상을 무지개처럼 제각각 쓰지 않고, 기본 무채색 바탕에 한 가지 포인트 색상(블루)만 매치해야 세련되어 보이는 원리와 같습니다.'
    },
    relatedConceptIds: ['concept-design-system']
  },
  {
    id: 'unit-6-3',
    sessionNumber: 6,
    sessionTitle: '6차시: 나를 소개하는 포트폴리오 사이트 만들기',
    unitNumber: 3,
    title: 'Google AI Studio Build 화면 구조와 생성 요청 4요소',
    pdfPages: '6차시 · PDF 95~101쪽',
    pdfPageNumbers: [95, 96, 97, 98, 99, 100, 101],
    learningGoal: 'Google AI Studio Build의 인터페이스 3영역(요청 입력, 미리보기, 코드·파일)을 파악하고, 웹사이트 생성을 지시할 때 반드시 포함해야 할 4가지 요소(작업, 자료, 규칙, 확인기준)를 학습한다.',
    coreConcepts: ['AI Studio Build', '요청 입력·미리보기·코드파일', '생성 요청 4요소 (작업, 자료, 규칙, 확인기준)'],
    easyExplanation: 'Google AI Studio Build 화면은 ① 프롬프트와 수정 요청을 전달하는 [요청 입력창], ② 사용자가 보게 될 화면을 실시간 확인하는 [미리보기창], ③ AI가 생성한 프로젝트 구성을 살펴보는 [코드·파일창]의 3곳으로 구성됩니다. 이곳에서 사이트를 성공적으로 생성하려면 요청문에 4가지를 빠짐없이 넣어야 합니다: 1) 작업: 나의 포트폴리오 웹사이트 제작. 2) 자료: 내 소개, 관심 분야, 활동, 프로젝트 기획 내용. 3) 규칙: 마크다운 기획서에 명시한 디자인 시스템 수치와 화면 동작. 4) 확인 기준: 내 정보와 선택한 내용이 잘 들어갔는지, 메뉴 동작이 약속한 곳으로 이동하는지 점검할 기준.',
    concreteExample: {
      fromMaterial: '자료 원문 생성 후 점검 기준 4가지: ① 내 기획서의 이름·전공·소개가 맞는가? ② 내가 선택한 관심·활동이 반영되었는가? ③ 내 프로젝트의 목적·역할·과정이 보이는가? ④ 메뉴와 주요 버튼이 약속한 곳으로 이동하는가?',
      comprehensionAid: '[이해를 돕는 예시] 요리사에게 "파스타 만들어줘"라고만 하는 대신, [요리: 토마토 파스타 / 식재료: 해산물과 바질 / 조리 규칙: 면은 알 덴테로 삶고 올리브유 사용 / 검수 기준: 국물이 너무 흥건하지 않은 상태]라고 상세 레시피를 오더하는 격입니다.'
    },
    relatedConceptIds: ['concept-vibe-coding', 'concept-prompt']
  },
  {
    id: 'unit-6-4',
    sessionNumber: 6,
    sessionTitle: '6차시: 나를 소개하는 포트폴리오 사이트 만들기',
    unitNumber: 4,
    title: 'AI 생성 결과의 사실 검증과 범위 좁혀 요청하기, 프로젝트 보관',
    pdfPages: '6차시 · PDF 103~108쪽',
    pdfPageNumbers: [103, 104, 105, 106, 107, 108],
    learningGoal: 'AI가 작성한 문장에 과장이나 왜곡이 없는지 사실 확인(Fact-check)을 수행하고, 수정할 때는 범위를 좁혀 명확히 요청하는 요령 및 프로젝트 ZIP 보관법을 익힌다.',
    coreConcepts: ['사실 확인 (Fact-checking)', '과장 및 누락 검증', '범위 좁혀 요청하기', '프로젝트 ZIP 다운로드'],
    easyExplanation: 'AI가 생성한 웹페이지 문장은 반드시 사실 검증을 거쳐야 합니다: 내가 제공한 내용과 실제 내 담당 역할이 왜곡 없이 유지되었는지, 내가 적지 않은 수상 경력이나 부풀려진 실적이 임의로 추가되지 않았는지, 진행 상태가 과장되지 않았는지 확인합니다. 만약 특정 내용이 누락되었다면 전체를 다시 만들라고 하지 말고, [프로젝트 이름 + 빠진 항목 + 사용할 자료 + 유지할 부분] 형태로 범위를 좁혀 요청해야 기존에 잘 동작하던 코드가 깨지지 않습니다. 작업이 끝나면 알아보기 쉬운 프로젝트 이름을 붙이고 코드 전체를 ZIP으로 내려받아 기획서와 함께 안전하게 보관합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 수정 요청 템플릿: "[프로젝트 이름] 소개에 내 역할과 진행 과정을 추가해 주세요. 아래 기획서의 내용을 사용하고, 다른 영역과 디자인 규칙은 유지해 주세요."',
      comprehensionAid: '[이해를 돕는 예시] 자동차의 왼쪽 사이드미러 각도만 조절하고 싶은데 차를 공장에 다시 입고시켜 전체를 분해 재조립하게 만들면 다른 부품까지 고장 날 수 있습니다. "왼쪽 거울만 5도 올려줘"라고 핀포인트로 요청해야 합니다.'
    },
    relatedConceptIds: ['concept-hallucination', 'concept-iterative-dev']
  },

  // ================= 7차시 (111~146쪽) =================
  {
    id: 'unit-7-1',
    sessionNumber: 7,
    sessionTitle: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    unitNumber: 1,
    title: '포트폴리오 이미지를 위한 프롬프트 구성과 반응형 배치 원칙',
    pdfPages: '7차시 · PDF 116~121쪽',
    pdfPageNumbers: [116, 117, 118, 119, 120, 121],
    learningGoal: '웹사이트의 첫인상을 살리는 이미지 프롬프트 5요소(용도/비율, 주제, 분위기/색, 제외요소)를 이해하고, 데스크톱과 모바일의 반응형 배치 및 파일 경로 규칙을 숙지한다.',
    coreConcepts: ['이미지 생성 프롬프트 공식', '반응형 이미지 배치', '가로 16:9 비율', '정적 이미지 자산 (public/images)'],
    easyExplanation: '웹사이트에 들어갈 이미지는 단순 장식이 아니라 내 전공 소개와 연구 주제를 직관적으로 전달하는 시각 자료입니다. AI(Gemini 등)로 이미지를 생성할 때는 5가지 요소를 명시합니다: ① 용도와 비율: 포트폴리오 첫 화면, 가로 16:9. ② 주제: 전공과 연결되는 주제(예: 생체신호 파형과 유체의 흐름). ③ 분위기와 색: 밝은 배경, 파란색과 짙은 청록색. ④ 제외할 요소: 글자, 숫자, 기관 로고, 실제 환자 자료 등 왜곡되기 쉬운 요소 배제. ⑤ 반응형 배치: 큰 화면에서는 소개 글 왼쪽, 이미지 오른쪽(2열)으로 배치하고, 작은 화면에서는 글 아래 이미지가 한 열(1열)로 자연스럽게 흐르도록 구현합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 프롬프트: 용도와 비율(포트폴리오 첫 화면, 가로 16:9), 주제(생체신호 파형과 유체의 흐름), 분위기와 색(밝은 배경, 파란색과 짙은 청록색), 제외할 요소(글자·숫자·기관 로고·실제 환자 자료).',
      comprehensionAid: '[이해를 돕는 예시] 잡지 표지를 디자인할 때 모델 사진 위에 어설프게 글자가 겹쳐 인쇄되어 있으면 본문 기사를 읽기 힘듭니다. 글자가 들어갈 공간(여백)을 확보하고 텍스트는 CSS로 얹어야 반응형 화면에서도 깨끗하게 보입니다.'
    },
    relatedConceptIds: ['concept-responsive-web']
  },
  {
    id: 'unit-7-2',
    sessionNumber: 7,
    sessionTitle: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    unitNumber: 2,
    title: 'UI 요소 수정 요청의 4가지 정보와 CSS 마이크로 인터랙션',
    pdfPages: '7차시 · PDF 122~126쪽',
    pdfPageNumbers: [122, 123, 124, 125, 126],
    learningGoal: '디자인 요소를 수정할 때 AI에게 전달할 4가지 핵심 정보(대상, 변경, 유지, 확인)를 익히고, 버튼 색상 변경 및 카드의 마이크로 인터랙션(호버 효과)을 구현한다.',
    coreConcepts: ['수정 요청의 4가지 정보 (대상, 변경, 유지, 확인)', '마이크로 인터랙션', '카드 호버 효과 (4px 이동, 180ms)'],
    easyExplanation: '웹 요소를 수정할 때는 다음 4가지 정보를 명확히 지정해야 의도대로 바뀝니다: ① 대상(어디에 있는 어떤 요소인가), ② 변경(색상, 크기, 간격, 효과 중 무엇인가), ③ 유지(문구, 내용, 클릭 동작 중 무엇을 남길 것인가), ④ 확인(무엇을 보면 성공인지 알 수 있는가). 7차시 실습에서는 ① 첫 화면의 주요 버튼을 짙은 청록색(기본색 `#0F766E`, 마우스 오버 `#115E59`)으로 변경하고 흰 글자와 링크 이동을 유지하며, ② 큰 제목 글자를 데스크톱 64px, 모바일 38px로 조정하고, ③ 프로젝트 카드에 마우스를 올렸을 때 위로 4px 살짝 떠오르며 옅은 그림자가 생기고 약 180ms 전환(transition)되는 마이크로 인터랙션을 부여합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설정값: 버튼 기본색 #0F766E, 마우스 위 #115E59 / 제목 큰 화면 64px, 작은 화면 38px / 카드 마우스 위에서 4px 위로 이동, 옅은 그림자와 약 180ms 전환.',
      comprehensionAid: '[이해를 돕는 예시] 버튼이나 카드에 마우스를 올렸을 때 아무런 시각적 변화가 없으면 사용자는 "이거 눌리는 건가?" 하고 주저하게 됩니다. 손가락을 얹었을 때 부드럽게 살짝 들썩이는 반응을 주면 훨씬 세련되고 완성도 높은 앱으로 느껴집니다.'
    },
    relatedConceptIds: ['concept-micro-interaction', 'concept-design-system']
  },
  {
    id: 'unit-7-3',
    sessionNumber: 7,
    sessionTitle: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    unitNumber: 3,
    title: '반응형 화면 점검(데스크톱·태블릿·모바일)과 가로 넘침 해결',
    pdfPages: '7차시 · PDF 127~133쪽',
    pdfPageNumbers: [127, 128, 129, 130, 131, 132, 133],
    learningGoal: '다양한 화면 폭(1440px, 768px, 390px, 360px)에서 가로 넘침(Horizontal Overflow)과 글자 잘림을 점검하고, 모바일 뷰포트 최적화를 수행한다.',
    coreConcepts: ['반응형 직접 점검', '화면 폭별 브레이크포인트', '가로 넘침(Horizontal Overflow) 해결', '상세 모달 스크롤'],
    easyExplanation: '반응형 디자인은 AI의 말만 믿지 말고 개발자 도구(F12)나 실제 스마트폰으로 직접 스크롤하며 확인해야 합니다. 주요 점검 폭은 큰 화면 1440px, 중간 태블릿 768px, 작은 스마트폰 390px와 360px입니다. 특히 360px 모바일 화면에서는 상단 헤더의 이름과 메뉴가 겹치거나 가로로 삐져나가는 현상이 자주 발생합니다. 이를 해결하기 위해 모바일에서는 이름을 줄바꿈하거나 햄버거 메뉴로 감추고, 프로젝트 카드 필터 버튼들이 화면 안에 알맞게 래핑(wrap)되도록 조정합니다. 또한 상세 모달 창을 열었을 때 모바일 화면 안에서 내용이 끝까지 스크롤되고 Esc 키나 닫기 버튼으로 원활히 복귀되는지 확인합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 보완 요청문 예시: "가로 360px에서 상단 이름과 메뉴가 겹칩니다. 이름은 줄바꿈하고 메뉴는 화면 안에 배치해 주세요. 큰 화면의 배치와 메뉴 이동은 유지해 주세요."',
      comprehensionAid: '[이해를 돕는 예시] PC 모니터에서는 넓어서 한 줄에 널널하게 들어가던 네비게이션 메뉴(소개, 관심, 활동, 프로젝트)가 스마트폰 화면에서는 공간이 좁아 글자가 서로 겹치거나 화면 밖으로 잘려 나가는 현상을 반응형 CSS로 말끔히 정리하는 작업입니다.'
    },
    relatedConceptIds: ['concept-responsive-web']
  },
  {
    id: 'unit-7-4',
    sessionNumber: 7,
    sessionTitle: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    unitNumber: 4,
    title: '모던 웹 프로젝트 파일 구조와 업로드/제외 대상 관리',
    pdfPages: '7차시 · PDF 135~138쪽',
    pdfPageNumbers: [135, 136, 137, 138],
    learningGoal: 'Vite 프로젝트의 디렉토리 구조(package.json, src, public, dist)를 파악하고, 저장소 업로드 대상과 절대 업로드해서는 안 되는 제외 대상을 구분한다.',
    coreConcepts: ['Vite 프로젝트 파일 구조', '`package.json`', '`src` vs `public`', '업로드 제외 대상 (`node_modules`, `dist`, `.env`)', '빌드 에러 로그 점검'],
    easyExplanation: '현대적인 웹 프로젝트는 구조화된 폴더를 갖춥니다: ① `package.json`: 프로젝트에 필요한 라이브러리 목록과 build 명령 정의. ② `src`: 실제 화면을 구성하는 컴포넌트와 비즈니스 로직. ③ `public/images`: 프로젝트에 포함되는 정적 이미지 파일들. ④ `dist`: Vite 빌드(`npm run build`)를 통해 소스코드를 하나로 묶어 생성된 배포용 결과물. GitHub에 프로젝트를 올릴 때는 반드시 `src`와 실제 이미지, `package.json`, 잠금 파일만 올려야 합니다. 수만 개의 의존성 파일이 담긴 `node_modules`, 빌드 결과물 `dist`, 비밀 키가 담긴 실제 `.env` 파일은 절대로 업로드하지 않고 제외해야 합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 제외 목록: node_modules · dist · 실제 .env는 제외. 설치 오류가 나면 설치 실패와 화면 오류를 구분하고, 첫 번째 오류 문장과 패키지 이름을 확인해 호환 버전으로 수정함.',
      comprehensionAid: '[이해를 돕는 예시] 요리 책(레시피 소스)과 식재료 목록(`package.json`)만 가볍게 가방에 담아 친구에게 전달해야지, 식당 싱크대와 냉장고 전체(`node_modules`)를 트럭으로 옮기려고 하면 용량이 너무 커서 전송이 불가능해지는 것과 같습니다.'
    },
    relatedConceptIds: ['concept-vite-build', 'concept-api-key']
  },
  {
    id: 'unit-7-5',
    sessionNumber: 7,
    sessionTitle: '7차시: 클릭하고 싶어지는 멋진 사이트로 업그레이드하기',
    unitNumber: 5,
    title: 'Vite 프로젝트의 Vercel 최종 배포와 작업 기록(4요소) 보관',
    pdfPages: '7차시 · PDF 139~145쪽',
    pdfPageNumbers: [139, 140, 141, 142, 143, 144, 145],
    learningGoal: 'Vite 프레임워크 프로젝트를 GitHub에 올리고 Vercel의 Vite 프리셋 및 npm run build로 배포하며, 작업 기록 4요소(변경 이유, 수정 요청, 확인 결과, 최종 보관)를 문서화한다.',
    coreConcepts: ['Vercel Vite 배포 설정', '빌드 명령어 (`npm run build`)', '배포 완료 확인', '포트폴리오 작업 기록 4요소'],
    easyExplanation: '5차시의 단순 HTML 파일과 달리, React/Vite 기반 프로젝트는 Vercel 배포 설정이 다릅니다: Framework Preset을 \'Vite\'로 선택하고, Build Command는 `npm run build`, Output Directory는 `dist`로 지정합니다. Vercel 서버가 의존성을 설치하고 Vite로 최적화 빌드를 마친 뒤 배포를 완료합니다. 배포 성공 후에는 로그인하지 않은 시크릿 창에서도 사이트가 잘 열리는지, 메뉴·필터·상세 모달이 모바일에서도 잘 동작하는지 최종 점검합니다. 마지막으로 나의 포트폴리오 작업 기록 4요소(① 변경 이유: 방문자가 읽거나 쓰기 불편했던 점, ② 수정 요청: 선택한 요소와 구체적 변경 내용, ③ 확인 결과: 화면과 기능에서 직접 확인한 변화, ④ 최종 보관: 기획서·코드·저장소·배포 주소)를 정리하여 완성합니다.',
    concreteExample: {
      fromMaterial: '자료 원문 설정값: Framework Preset = Vite, Build Command = npm run build, Output Directory = dist (Root는 package.json이 있는 위치) 및 작업 기록 4요소.',
      comprehensionAid: '[이해를 돕는 예시] 연구실에서 실험을 마친 뒤 결과 수치만 덩그러니 남겨두면 나중에 재현할 수 없습니다. "왜 가설을 바꿨고(변경 이유), 어떤 조건을 줬으며(수정 요청), 어떤 파형이 나왔는지(확인 결과)"를 실험 노트(작업 기록)에 기록해 두어야 진정한 내 실력과 자산이 됩니다.'
    },
    relatedConceptIds: ['concept-vite-build', 'concept-vercel', 'concept-deployment']
  }
];
