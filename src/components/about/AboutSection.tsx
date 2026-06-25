'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import {
  FaPython, FaJsSquare, FaReact, FaVuejs, FaGit, FaSlack,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiDjango, SiTensorflow,
  SiFigma, SiAdobeillustrator, SiAdobephotoshop, SiJira,
  SiConfluence, SiGooglecolab, SiNotion,
} from 'react-icons/si';
import SkillBallCanvas from '@/components/three/SkillBallCanvas';
import type { BallSkill } from '@/components/three/SkillBall';

type SkillItem = { name: string; description: string; icon: ReactNode };
type Category = { category: string; items: SkillItem[] };
type SectionType = 'about' | 'skills';

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState<SectionType>('about');
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const skillsButtonRef = useRef<HTMLButtonElement>(null);
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, left: 0 });

  const updateButtonDimensions = () => {
    const activeButton = activeSection === 'about' ? aboutButtonRef.current : skillsButtonRef.current;
    if (activeButton && skillsButtonRef.current && aboutButtonRef.current) {
      const rect = activeButton.getBoundingClientRect();
      setButtonDimensions({
        width: rect.width,
        left: activeSection === 'about' ? 0 : skillsButtonRef.current.offsetLeft - aboutButtonRef.current.offsetLeft,
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
    name: '신건우',
    age: '1995.07.04',
    education: [
      '경기대학교 산업경영공학과 졸업',
      '그린아카데미 디지털출판편집디자인 수료',
      '삼성 청년 소프트웨어 아카데미(SSAFY) 11기 수료',
    ],
  };

  const aboutMe = [
    '데이터와 사람 사이의 거리를 좁히는 일을 합니다.',
    '숫자 뒤에 있는 맥락을 읽고, 그걸 사람이 움직일 수 있는 말로 바꾸는 일을 해왔습니다. 시스템만으로 사람이 움직이지 않는다는 건 여러 번 부딪히며 배운 것입니다. 설계보다 설득이 먼저였고, 효율보다 신뢰가 남았습니다.',
    '차트든 사람이든, 굴곡에는 이유가 있다고 보는 편입니다. 디자인에서 개발로, 개발에서 프로젝트 관리로. 돌아온 길이지만, 그 시간이 시야를 넓혀주었고 하나가 아닌 여러 답을 볼 수 있게 해주었습니다.',
    '개발도 하고 분석도 합니다. 통계로 기준을 세우고, Django, Python으로 자동화하고, React나 Vue로 전달합니다. 하지만 도구보다 중요한 건 그걸로 어떤 가치를 만드느냐였습니다.',
    '복잡한 것을 단순하게 정리하고, 흩어진 것을 이어붙이는 일. 그 끝에 쓸 만한 해결책이 나올 때, 그게 제일 좋습니다.',
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
      category: 'Data Ops & PM',
      items: [
        { name: 'Monday.com', description: '프로젝트 일정·검사 진행 현황 관리', icon: null },
        { name: 'Jira', description: '이슈 트래킹 및 애자일 프로젝트 관리', icon: <SiJira /> },
        { name: 'Confluence', description: '문서·작업 가이드 협업', icon: <SiConfluence /> },
        { name: 'Slack', description: '대규모 작업자·고객사 커뮤니케이션', icon: <FaSlack /> },
        { name: 'Notion', description: '업무 정리 및 산출물 문서화', icon: <SiNotion /> },
        { name: 'Google Colab', description: '대용량 데이터 처리·샘플링 자동화', icon: <SiGooglecolab /> },
        { name: 'TreeD', description: '3D·문서 멀티모달 데이터 라벨링/검수', icon: null },
        { name: 'Mathpix', description: '수식 OCR', icon: null },
        { name: 'S3 Browser', description: '대용량 학습 데이터 업로드·관리', icon: null },
        { name: 'Data Pipeline', description: '수집→정제→라벨링→검수→납품 설계·운영', icon: null },
      ],
    },
    {
      category: 'Tools & Design',
      items: [
        { name: 'Figma', description: 'UI/UX 디자인 및 프로토타입 제작', icon: <SiFigma /> },
        { name: 'Adobe Photoshop', description: '로고, UI, Game asset 제작 및 그래픽 편집 경험', icon: <SiAdobephotoshop /> },
        { name: 'Adobe Illustrator', description: '벡터 그래픽 디자인 및 로고 제작', icon: <SiAdobeillustrator /> },
        { name: 'Git', description: '협업 및 버전 관리 경험', icon: <FaGit /> },
      ],
    },
  ];

  const categoryColor: Record<string, string> = {
    Frontend: '#06b6d4',
    'Backend & Data Analysis': '#8b5cf6',
    'Data Ops & PM': '#10b981',
    'Tools & Design': '#f59e0b',
  };

  const ballSkills: BallSkill[] = skills.flatMap((c) =>
    c.items.map((it) => ({ name: it.name, color: categoryColor[c.category] ?? '#3b82f6' })),
  );

  return (
    <section className="relative flex w-full items-center justify-center px-4 py-20 sm:px-6 sm:py-24">
      <motion.div
        className="glassmorphism mx-auto w-full max-w-4xl rounded-2xl p-5 sm:p-7"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        {/* 토글 */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex rounded-full border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
            <motion.div
              className="absolute bottom-1 top-1 rounded-full"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}
              initial={false}
              animate={{ width: buttonDimensions.width, x: buttonDimensions.left }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              ref={aboutButtonRef}
              onClick={() => setActiveSection('about')}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{ color: activeSection === 'about' ? 'var(--accent)' : 'var(--fg-muted)' }}
            >
              About Me
            </button>
            <button
              ref={skillsButtonRef}
              onClick={() => setActiveSection('skills')}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{ color: activeSection === 'skills' ? 'var(--accent)' : 'var(--fg-muted)' }}
            >
              Skills
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === 'about' ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-[var(--fg)]" style={{ fontFamily: 'Bai Jamjuree' }}>
                    Profile
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--fg-muted)]">
                    <p>{profile.name}</p>
                    <p>{profile.age}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-[var(--fg)]" style={{ fontFamily: 'Bai Jamjuree' }}>
                    Education
                  </h3>
                  <ul className="space-y-1 text-sm text-[var(--fg-muted)]">
                    {profile.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-[var(--fg)]" style={{ fontFamily: 'Bai Jamjuree' }}>
                  About Me
                </h3>
                <div className="space-y-2.5">
                  {aboutMe.map((paragraph, index) => (
                    <p key={index} className="break-keep text-[13px] leading-relaxed text-[var(--fg-muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col"
            >
              <div className="relative h-72 w-full sm:h-80 md:h-96 lg:h-[440px] xl:h-[520px]">
                <SkillBallCanvas skills={ballSkills} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
