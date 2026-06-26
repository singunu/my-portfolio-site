export interface Project {
  title: string;
  titleKo: string;
  period: string;
  duration: string;
  description: string;
  image: string;
  teamSize: string;
  team: string[];
  role: string[];
  skills: { name: string; color: string }[];
  link: string;
  subTasks?: string[]; // TTA처럼 세부 과제 목록이 있는 경우
  category?: string;  // 프로젝트 카테고리 (예: "알체라", "SSAFY")
}

export const projects: Project[] = [
  {
    title: "Liveness AI Data",
    titleKo: "얼굴 위조 판별 AI 학습 데이터 구축",
    period: "2026.05.27 ~ 2026.07.15",
    duration: "약 2개월",
    description: "알체라의 Liveness(얼굴 위조 판별 AI) 모델 학습 데이터를 구축하는 AI flywheel 프로젝트 총괄. LIVE(실제 얼굴)와 FAKE(Print·Replay·3D Attack) 데이터를 다국적 피험자를 대상으로 수집했습니다. 스튜디오 3종 환경(백색·주황색·저조도) 구성, 촬영 시나리오·메타데이터 체계 설계, 계약·보수 지급 프로세스까지 전 과정을 운영했습니다.",
    image: "/images/alchera_logo.jpg",
    teamSize: "PM·총괄",
    team: ["수퍼바이저 3명", "오퍼레이터 12명", "다국적 촬영 피험자 500명"],
    role: [
      "데이터 취득 파이프라인 총괄",
      "스튜디오 환경 구성 및 장비 조달",
      "다국적 피험자 모집·관리",
      "촬영 시나리오·메타데이터 설계"
    ],
    skills: [
      { name: "Project Management", color: "bg-indigo-600" },
      { name: "Data Collection", color: "bg-teal-600" },
      { name: "Studio Operations", color: "bg-rose-600" }
    ],
    link: "#",
    category: "알체라"
  },
  {
    title: "FireScout AI Data",
    titleKo: "화재 탐지 AI 학습 데이터 구축",
    period: "2026.05.27 ~ 2026.07.15",
    duration: "약 2개월",
    description: "알체라의 FireScout(CCTV 기반 화재·연기 자동 탐지 AI) 모델 재학습용 데이터를 구축하는 AI flywheel 프로젝트 총괄. Normal Negative·Hard Negative·Positive(화재 LV1~5) 영상 4,550편 구조를 설계하고, Python 자동화 스크립트(001~007번) 개발로 데이터 추출·라벨링·JSON 생성 파이프라인을 구축했습니다. 라벨링 클래스 재설계를 통해 시간당 작업량을 23장→100장으로 4.33배 향상시켰습니다.",
    image: "/images/alchera_logo.jpg",
    teamSize: "PM·총괄",
    team: ["수퍼바이저 3명", "오퍼레이터 1명", "라벨링 작업자 3명"],
    role: [
      "데이터 수집·가공 파이프라인 총괄",
      "라벨링 클래스 재설계",
      "Python 자동화 스크립트 개발",
      "현장 데이터 수집 운영 (3개 현장)"
    ],
    skills: [
      { name: "Python", color: "bg-blue-600" },
      { name: "Project Management", color: "bg-indigo-600" },
      { name: "Data Pipeline", color: "bg-purple-600" }
    ],
    link: "#",
    category: "알체라"
  },
  {
    title: "SKT K-Omnidoc",
    titleKo: "SKT 문서이해향 Telco 멀티모달 DB 구축",
    period: "2026.01.19 ~ 2026.06.05",
    duration: "약 5개월",
    description: "SKT AI 연구를 위한 문서이해 특화 멀티모달 데이터베이스 구축 프로젝트. 20,000장 문서에 대해 DLA → OCR → Table/Chart/Equation HTML → 최종 JSON 통합까지 7단계 파이프라인 전체를 설계·총괄했습니다. Upstage OCR/Document Parsing API, MathPix 등 외부 API를 연동하고 스크립트 15종 이상을 개발해 재현 가능한 파이프라인을 확립했습니다.",
    image: "/images/SK텔레콤-로고.png",
    teamSize: "PM·총괄",
    team: ["프리랜서 작업자 55명", "오퍼레이터 13명"],
    role: [
      "전체 데이터 파이프라인 PM·총괄",
      "Python 자동화 스크립트 15종+ 개발",
      "23개 클래스 라벨링 기준 수립",
      "작업자 관리 및 고객사 커뮤니케이션"
    ],
    skills: [
      { name: "Python", color: "bg-blue-600" },
      { name: "Project Management", color: "bg-indigo-600" },
      { name: "Data Pipeline", color: "bg-purple-600" },
      { name: "API Integration", color: "bg-teal-600" }
    ],
    link: "#",
    category: "알체라"
  },
  {
    title: "TTA AI Quality Inspection",
    titleKo: "초거대AI 학습용 데이터 의미적 정확성 검사",
    period: "2025.10 ~ 2026.01",
    duration: "약 4개월",
    description: "NIA(한국지능정보사회진흥원) 주관, TTA(한국정보통신기술협회) 담당 프로젝트. 8개 과제의 AI 학습 데이터에 대한 의미적 정확성 검사 관리를 담당했습니다. IoU 기반 검사 기준을 직접 개발하고, Python 자동화 도구를 구축해 검사 일정 준수율 100%를 달성했습니다. 인건비 100만원 절감, 처리시간 90% 단축(22시간→1~2시간)의 성과를 거뒀습니다.",
    image: "/images/NIA_logo.jpg",
    teamSize: "검사 관리",
    team: ["NIA (발주처)", "TTA (관리기관)", "수행사 다수", "검사 전문가·프리랜서"],
    role: [
      "검사 프로세스 설계 및 운영",
      "IoU 기반 정량적 검사 기준 개발",
      "Python 자동화 도구 개발",
      "검사 전문가·프리랜서 모집 및 관리",
      "TTA·NIA·수행사 커뮤니케이션"
    ],
    skills: [
      { name: "Python", color: "bg-blue-600" },
      { name: "QA/QC", color: "bg-amber-600" },
      { name: "Data Inspection", color: "bg-emerald-600" }
    ],
    link: "#",
    category: "알체라",
    subTasks: [
      "신재생 에너지 발전 설비 결함 진단 멀티모달 데이터",
      "분자 독성 추론 데이터",
      "문서 이해 기반 시각 요소 생성 데이터",
      "한국 전통 민화 제작 데이터",
      "K-스톡 콘텐츠 데이터",
      "이상 판별을 위한 금융거래 정보 및 사용자 패턴 합성 데이터",
      "금융 분야 고객 상담 데이터",
      "단계적 사고 기반 물류 로봇 파지 교시 데이터"
    ]
  },
  {
    title: "LG Document Layout",
    titleKo: "AI 문서 레이아웃 데이터 라벨링",
    period: "2025.05.26 ~ 2025.10.13",
    duration: "약 5개월",
    description: "LG AI Research의 문서 레이아웃 분석 모델 학습을 위한 대규모 데이터 라벨링 프로젝트입니다. 9명의 오퍼레이터와 100명의 프리랜서를 관리하며 13만 건 문서, 148만 개 객체에 대한 품질 관리를 수행했습니다. 커뮤니케이션 전략 혁신으로 추가 비용 없이 197.5% 생산성 향상을 달성하고, 리워드 프로그램으로 ROI 4.2배를 기록했습니다.",
    image: "/images/lgresearch.jpg",
    teamSize: "PM",
    team: ["오퍼레이터 9명", "프리랜서 100명"],
    role: [
      "인력 채용 및 교육",
      "품질 관리 체계 구축",
      "생산성 전략 수립",
      "고객사 커뮤니케이션"
    ],
    skills: [
      { name: "Project Management", color: "bg-indigo-600" },
      { name: "Data Labeling", color: "bg-emerald-600" },
      { name: "QA/QC", color: "bg-amber-600" }
    ],
    link: "https://verbose-hoodie-b9b.notion.site/LG-AI-Document-Layout-Analysis-2ba9a44503048086a20bff60b83f0368?source=copy_link",
    category: "알체라"
  },
  {
    title: "RichBeats",
    titleKo: "금융 솔루션 웹 사이트",
    period: "2024.05.16 ~ 2024.05.23",
    duration: "1주",
    description: "사용자는 다양한 은행의 예·적금 상품을 비교하고 추천받을 수 있으며, 양방향 실시간 환율 계산 기능을 통해 환율 정보를 확인할 수 있습니다. 금융 소통 게시판을 통해 회원 간 정보를 공유하며, 카카오맵 기반 지도 서비스로 은행 지점을 간편하게 검색할 수 있습니다.",
    image: "/images/richbeats.png",
    teamSize: "2인 프로젝트",
    team: ["풀스택 개발자 2명"],
    role: [
      "메인페이지",
      "예적금 API 연동",
      "맞춤 상품 추천 기능",
      "환율 계산기 구현"
    ],
    skills: [
      { name: "Vue.js", color: "bg-emerald-600" },
      { name: "Django", color: "bg-green-700" }
    ],
    link: "https://verbose-hoodie-b9b.notion.site/RichBeats-1509a4450304813c9283db28124e8ad1?pvs=4",
    category: "SSAFY"
  },
  {
    title: "Sixtale",
    titleKo: "TRPG를 온라인 상에서 즐길 수 있는 플랫폼",
    period: "2024.07.02 ~ 2024.08.16",
    duration: "7주",
    description: "실시간 채팅, 3D 주사위 굴리기, 맵 변경 및 그리드 시스템, 직업별 스킬 사용, NPC 관리 등의 기능을 제공합니다. AI 기반 캐릭터 이미지 생성, 룰북 제공, AI 챗봇을 통한 룰 설명으로 편리한 환경을 지원하며, 방 시스템과 캘린더 기능으로 게임의 원활한 진행을 보조합니다.",
    image: "/images/sixtale.png",
    teamSize: "6인 프로젝트",
    team: ["프론트엔드 3명", "백엔드 3명"],
    role: [
      "주사위 및 캘린더 기능 개발",
      "로비 시스템 구현",
      "UI/UX 디자인",
      "AI 기반 캐릭터 프로필 생성"
    ],
    skills: [
      { name: "Vue.js", color: "bg-emerald-600" },
      { name: "JavaScript", color: "bg-yellow-600" }
    ],
    link: "https://verbose-hoodie-b9b.notion.site/Sixtale-1509a445030481089a3bd2c5ddad0494?pvs=4",
    category: "SSAFY"
  },
  {
    title: "미정(味精)",
    titleKo: "식재료 가격 예측 및 레시피 추천 서비스",
    period: "2024.08.19 ~ 2024.10.11",
    duration: "8주",
    description: "식재료 가격 분석과 레시피 추천을 결합한 지능형 요리 플랫폼입니다. LSTM 기반 시계열 분석으로 식재료 가격을 예측하고, 사용자의 장바구니 데이터를 기반으로 연관 식재료와 레시피를 추천합니다. 대규모 식재료 데이터를 분산 처리하여 실시간으로 분석하며, 직관적인 데이터 시각화와 요리 보조 기능을 제공합니다.",
    image: "/images/mijung.png",
    teamSize: "6인 프로젝트",
    team: [
      "백엔드 1명",
      "백엔드+데이터 분석 2명",
      "데이터 분석 및 시각화 1명",
      "프론트엔드 2명"
    ],
    role: [
      "데이터 전처리",
      "워드 임베딩",
      "시계열 분석",
      "데이터 시각화"
    ],
    skills: [
      { name: "Python", color: "bg-blue-600" },
      { name: "React", color: "bg-purple-600" },
      { name: "JavaScript", color: "bg-yellow-600" }
    ],
    link: "https://verbose-hoodie-b9b.notion.site/1509a445030481deb796dcb7cc23c782?pvs=4",
    category: "SSAFY"
  },
  {
    title: "Arcana",
    titleKo: "덱빌딩 로그라이크 카드게임과 공식 홈페이지",
    period: "2024.10.14 ~ 2024.11.19",
    duration: "5주",
    description: "전략적인 카드게임과 이를 지원하는 다양한 정보를 제공하는 홍보 및 서비스 플랫폼. 전략적인 1:1 대결과 선택 기반 스토리 진행을 특징으로 하며, 지구 멸망 후 새로운 행성에서 인간과 다양한 종족 간의 갈등을 다룹니다. 공식 홈페이지에서는 게임 다운로드, 카드 및 종족 소개, 스토리 영상, 미니게임, 문의 페이지 등을 제공하며 게임에 대한 정보를 종합적으로 제공합니다.",
    image: "/images/arcana.png",
    teamSize: "6인 프로젝트",
    team: [
      "백엔드+유니티 2명",
      "유니티 3명",
      "프론트엔드 1명"
    ],
    role: [
      "기획",
      "디자인",
      "웹사이트 개발",
      "로고 및 콘텐츠 제작"
    ],
    skills: [
      { name: "React", color: "bg-purple-600" },
      { name: "JavaScript", color: "bg-yellow-600" }
    ],
    link: "https://verbose-hoodie-b9b.notion.site/ARCANA-1509a445030481648513f45f0ab30a65?pvs=4",
    category: "SSAFY"
  }
];
