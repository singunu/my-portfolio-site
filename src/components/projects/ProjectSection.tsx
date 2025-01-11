'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaClock, FaTools, FaExternalLinkAlt, FaHandPointer } from 'react-icons/fa';

const projects = [
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
    link: "https://verbose-hoodie-b9b.notion.site/RichBeats-1509a4450304813c9283db28124e8ad1?pvs=4"
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
    link: "https://verbose-hoodie-b9b.notion.site/Sixtale-1509a445030481089a3bd2c5ddad0494?pvs=4"
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
    link: "https://verbose-hoodie-b9b.notion.site/1509a445030481deb796dcb7cc23c782?pvs=4"
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
    link: "https://verbose-hoodie-b9b.notion.site/ARCANA-1509a445030481648513f45f0ab30a65?pvs=4"
  }
];

interface ProjectCardProps {
  project: {
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
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    // 애니메이션 중이 아닐 때만 상태 토글
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 min-h-[400px] sm:min-h-[460px] md:min-h-[500px]"
    >
      {/* 모바일 디자인 */}
      <div className="block lg:hidden">
      <div className="glassmorphism rounded-xl overflow-hidden shadow-lg flex flex-col">
          {/* 이미지 */}
          <div className="relative h-36 sm:h-44 md:h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* 콘텐츠 */}
          <div className="p-3 xs:p-3 sm:p-4 flex flex-col">
      {/* 제목 및 기본 정보 */}
      <div className="space-y-2 xs:space-y-2 sm:space-y-3">
        <div>
        <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm xs:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
          {project.titleKo}
        </p>
        </div>
            
        <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <FaUsers className="w-2.5 xs:w-3 h-2.5 xs:h-3" />
            <span>{project.teamSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="w-2.5 xs:w-3 h-2.5 xs:h-3" />
            <span>{project.duration}</span>
          </div>
        </div>

        <div className="mb-1 xs:mb-2">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5 sm:gap-2">
            <FaTools className="w-3 h-3 sm:w-4 sm:h-4" />
            담당 역할
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {project.role.join(', ')}
          </p>
        </div>
        </div>
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 mb-0 w-full py-1 xs:py-1.5 sm:py-2 
            flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2
            text-xs xs:text-sm text-blue-600 dark:text-blue-300 
            border border-blue-500/30 dark:border-blue-400/30
            rounded-lg
            bg-blue-500/5 dark:bg-blue-400/5
            hover:bg-blue-500/10 dark:hover:bg-blue-400/10
            transition-all duration-300 
            group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          자세히 보기
          <FaExternalLinkAlt className="w-2.5 xs:w-3 h-2.5 xs:h-3 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
  </div>
</div>

      {/* 태블릿/데스크톱 디자인 */}
      <div className="hidden lg:block perspective-1000 h-[460px] md:h-[500px]">
        <motion.div
          className="relative w-full h-full preserve-3d group"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ 
            duration: 0.4, 
            type: 'tween',
            ease: 'easeInOut'
          }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {/* Front of card */}
          <div 
            className="absolute w-full h-full backface-hidden cursor-pointer group"
            onClick={handleFlip}
          >
            <div className="glassmorphism h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow relative">
              {/* 호버 시 클릭 가능 표시 */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  <FaHandPointer className="w-3 h-3" />
                  Click to Flip
                </div>
              </div>

              {/* 이미지 */}
              <div className="relative h-36 sm:h-44 md:h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              </div>

              {/* 콘텐츠 */}
              <div className="p-4 flex flex-col h-[calc(100%-12rem)] min-h-[16rem] space-y-4 overflow-y-auto">
  <div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      {project.title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
      {project.titleKo}
    </p>
  </div>

  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
    <div className="flex items-center gap-1">
      <FaUsers className="w-4 h-4" />
      <span>{project.teamSize}</span>
    </div>
    <div className="flex items-center gap-1">
      <FaClock className="w-4 h-4" />
      <span>{project.duration}</span>
    </div>
  </div>

  <div className="mt-auto pt-2">  {/* pt-2 추가 */}
    <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5 sm:gap-2">
      <FaTools className="w-3 h-3 sm:w-4 sm:h-4" />
      담당 역할
    </h4>
    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
      {project.role.join(', ')}
    </p>
  </div>
</div>
            </div>
          </div>

          {/* Back of card */}
          <div 
            className="absolute w-full h-full backface-hidden rotate-y-180 cursor-pointer group"
            onClick={handleFlip}
          >
            <div className="glassmorphism h-full rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div className="space-y-3 overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  프로젝트 상세
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 flex items-center justify-center gap-2
                         text-blue-600 dark:text-blue-300 
                         border border-blue-500/30 dark:border-blue-400/30
                         rounded-full
                         bg-blue-500/5 dark:bg-blue-400/5
                         hover:bg-blue-500/10 dark:hover:bg-blue-400/10
                         transition-all duration-300 
                         group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                자세히 보기
                <FaExternalLinkAlt className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectSection: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20" />
      
      {/* Decorative Gradients */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 
                     bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 
                     bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 
                       text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-16 sm:pb-20 md:pb-24">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;