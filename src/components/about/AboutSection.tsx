'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  FaPython, FaJsSquare,
  FaReact, FaVuejs, FaGit,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiDjango, SiTensorflow,
  SiFigma, SiAdobeillustrator, SiAdobephotoshop, SiJira,
} from 'react-icons/si';

type SkillItem = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

type Category = {
  category: string;
  items: SkillItem[];
};

type SectionType = 'about' | 'skills';

export default function AboutAndSkills() {
  const [activeSection, setActiveSection] = useState<SectionType>('about');
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const skillsButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    left: 0
  });

  const updateButtonDimensions = () => {
    const activeButton = activeSection === 'about' ? aboutButtonRef.current : skillsButtonRef.current;
    if (activeButton && skillsButtonRef.current && aboutButtonRef.current) {
      const rect = activeButton.getBoundingClientRect();
      setButtonDimensions({
        width: rect.width,
        left: activeSection === 'about' ? 0 : skillsButtonRef.current.offsetLeft - aboutButtonRef.current.offsetLeft
      });
    }
  };

  useEffect(() => {
  updateButtonDimensions();
  window.addEventListener('resize', updateButtonDimensions);
  return () => window.removeEventListener('resize', updateButtonDimensions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  updateButtonDimensions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeSection]);

  const profile = {
    name: "신건우",
    age: "1995.07.04",
    education: [
      "경기대학교 산업경영공학과 졸업",
      "그린아카데미 디지털출판편집디자인 수료",
      "삼성 청년 소프트웨어 아카데미(SSAFY) 11기 수료"
    ],
  };
  
  const aboutMe = [
  "데이터와 사람 사이의 거리를 좁히는 일을 합니다.",
  "숫자 뒤에 있는 맥락을 읽고, 그걸 사람이 움직일 수 있는 말로 바꾸는 일을 해왔습니다. 시스템만으로 사람이 움직이지 않는다는 건 여러 번 부딪히며 배운 것입니다. 설계보다 설득이 먼저였고, 효율보다 신뢰가 남았습니다.",
  "차트든 사람이든, 굴곡에는 이유가 있다고 보는 편입니다. 디자인에서 개발로, 개발에서 프로젝트 관리로. 돌아온 길이지만, 그 시간이 시야를 넓혀주었고 하나가 아닌 여러 답을 볼 수 있게 해주었습니다.",
  "개발도 하고 분석도 합니다. 통계로 기준을 세우고, Django, Python으로 자동화하고, React나 Vue로 전달합니다. 하지만 도구보다 중요한 건 그걸로 어떤 가치를 만드느냐였습니다.",
  "복잡한 것을 단순하게 정리하고, 흩어진 것을 이어붙이는 일. 그 끝에 쓸 만한 해결책이 나올 때, 그게 제일 좋습니다."
];

  const skills: Category[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', description: '컴포넌트 기반 웹 애플리케이션 개발 경험', icon: <FaReact /> },
        { name: 'Vue.js', description: 'REST API 연동 및 실시간 데이터 처리 구현', icon: <FaVuejs /> },
        { name: 'Tailwind CSS', description: '', icon: <SiTailwindcss /> },
        { name: 'D3.js', description: '데이터 기반의 동적 시각화 라이브러리', icon: null },
        { name: 'Three.js', description: '3D 그래픽 렌더링 및 웹 기반 시각화', icon: null },
        { name: 'Recharts', description: '', icon: null },
        { name: 'JavaScript', description: 'ES6+ 문법 및 비동기 프로그래밍 활용 경험', icon: <FaJsSquare /> },
        { name: 'TypeScript', description: '', icon: <SiTypescript /> },
      ],
    },
    {
      category: 'Backend & Data Analysis',
      items: [
        { name: 'Python', description: '데이터 분석, 웹 개발, 머신러닝 모델 개발 경험', icon: <FaPython /> },
        { name: 'Django', description: 'MVC 패턴 기반 웹 서버 개발 경험', icon: <SiDjango /> },
        { name: 'TensorFlow/Keras', description: '시계열 예측 모델 개발 및 학습 경험', icon: <SiTensorflow /> },
        { name: 'Scikit-learn', description: '', icon: null },
        { name: 'Pandas', description: '', icon: null },
        { name: 'NumPy', description: '', icon: null },
        { name: 'Word2Vec', description: '텍스트 임베딩 및 자연어 처리 경험', icon: null },
      ],
    },
    {
      category: 'Tools & Others',
      items: [
        
        { name: 'Figma', description: 'UI/UX 디자인 및 프로토타입 제작', icon: <SiFigma /> },
        { name: 'Adobe Photoshop', description: '로고, UI, Game asset 제작 및 그래픽 편집 경험', icon: <SiAdobephotoshop /> },
        { name: 'Adobe Illustrator', description: '벡터 그래픽 디자인 및 로고 제작', icon: <SiAdobeillustrator /> },
        { name: 'Git', description: '협업 및 버전 관리 경험', icon: <FaGit /> },
        { name: 'Jira', description: '애자일 방식의 프로젝트 관리 경험', icon: <SiJira /> },
      ],
    },
  ];

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/20 dark:to-blue-900/20">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-10 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 
                    bg-indigo-400/25 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 
                    bg-purple-400/25 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto scrollbar-thin px-3 sm:px-4 md:px-6 
          pt-12 pb-28
          sm:pt-24 sm:pb-8 md:pt-20 lg:pt-16 xl:pt-12 md:pb-12"
      >
        <motion.div
          className="max-w-3xl mx-auto glassmorphism p-4 sm:p-5 md:p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Toggle Section */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative bg-white/50 dark:bg-gray-800 rounded-full p-1 flex backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-blue-500/20 dark:bg-blue-400/20"
                initial={false}
                animate={{
                  width: buttonDimensions.width,
                  x: buttonDimensions.left
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
              <button
                ref={aboutButtonRef}
                onClick={() => setActiveSection('about')}
                className={`relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeSection === 'about' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                About Me
              </button>
              <button
                ref={skillsButtonRef}
                onClick={() => setActiveSection('skills')}
                className={`relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeSection === 'skills'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Skills
              </button>
            </div>
          </div>

          {/* Content Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 sm:mt-6 grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  WebkitTransform: "translate3d(0, 0, 0)",
                  willChange: "transform"  // style 객체 안으로 이동
                }}
              >
                {/* Profile Information */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 theme-transition-heading"
                    style={{ fontFamily: 'Bai Jamjuree' }}>
                    Profile</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p className="text-gray-600 dark:text-gray-300 theme-transition-text">
                        <span className="font-medium"></span> {profile.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 theme-transition-text">
                        <span className="font-medium"></span> {profile.age}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 theme-transition-heading"
                      style={{ fontFamily: 'Bai Jamjuree' }}>
                      Education</h3>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {profile.education.map((edu, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300 theme-transition-text">{edu}</li>
                      ))}
                    </ul>
                  </div>

                  {/* <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Experience</h3>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {profile.experience.map((exp, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">{exp}</li>
                      ))}
                    </ul>
                  </div> */}
                </div>

                {/* Introduction */}
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 theme-transition-heading"
                      style={{ fontFamily: 'Bai Jamjuree' }}>
                      About Me
                    </h3>
                    <div className="overflow-y-auto max-h-[200px] sm:max-h-[280px] md:max-h-none pr-2 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-blue-100/10 dark:scrollbar-thumb-blue-400/20 dark:scrollbar-track-gray-800/10">
                      <div className="space-y-2 sm:space-y-3">
                        {aboutMe.map((paragraph, index) => (
                          <p key={index} className="text-xs sm:text-[11px] md:text-[12px] lg:text-sm text-gray-600 dark:text-gray-300 
                            leading-relaxed sm:leading-loose lg:leading-[1.5] xl:leading-[1.8]
                            tracking-tighter
                            break-keep
                            theme-transition-text">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
              </motion.div>
            ) : (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-4 sm:mt-6 relative"
              >
                <div className={`overflow-y-auto overflow-x-visible pr-2 space-y-6 sm:space-y-8 
                  pb-8 sm:pb-12 md:pb-16 pt-2 sm:pt-4
                  max-h-[calc(100vh-360px)] sm:max-h-[calc(100vh-340px)] md:max-h-[calc(100vh-320px)]
                  mb-1
                  scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-blue-100/10
                  dark:scrollbar-thumb-blue-400/20 dark:scrollbar-track-gray-800/10`}>
                    {skills.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <h3 className="text-blue-500 dark:text-blue-400 font-semibold text-xs sm:text-sm md:text-base lg:text-base xl:text-lg mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 theme-transition-heading"
                      style={{ fontFamily: 'Bai Jamjuree' }}>
                        {category.category}
                        <span className="h-px flex-grow bg-blue-500/20 dark:bg-blue-400/20 ml-2" />
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-3">
                        {category.items.map((item) => (
                          <motion.div
                            key={item.name}
                            className="group relative"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-3 p-1.5 sm:p-2 md:p-3 lg:p-2 xl:p-3
                                          bg-white/50 dark:bg-gray-800/50 rounded-lg 
                                          hover:bg-blue-50 dark:hover:bg-blue-900/20 
                                          transition-colors duration-200
                                          backdrop-blur-sm
                                          border border-gray-200 dark:border-gray-700
                                          theme-transition">
                              <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 flex items-center justify-center
                                            bg-blue-100 dark:bg-blue-900/30 rounded-full theme-transition">
                                {item.icon ? (
                                  <span className="text-blue-500 dark:text-blue-400 text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg theme-transition-icon">
                                    {item.icon}
                                  </span>
                                ) : (
                                  <span className="text-blue-500 dark:text-blue-400 text-[10px] sm:text-xs font-medium theme-transition-icon">
                                    {item.name.slice(0, 2)}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-300 truncate theme-transition-icon">
                                {item.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}