'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import ScrambleText from '@/components/ui/ScrambleText';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--fg-muted)] sm:text-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ScrambleText text="Portfolio" />
        </motion.p>

        <motion.h1
          className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'GumiIndustryTTF' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ScrambleText text="안녕하세요, 신건우입니다." />
        </motion.h1>

        <motion.h2
          className="text-gradient mb-5 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: 'Bai Jamjuree',
            // 보라색을 빼고 하늘·데이터 톤의 파랑→시안 그라데이션으로 통일
            backgroundImage: 'linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 100%)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ScrambleText text="AI Data Project Manager" />
        </motion.h2>

        <motion.p
          className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ScrambleText text="대규모 AI 학습·테스트 데이터를 기획부터 납품까지 운영합니다." className="block" />
          <ScrambleText text="데이터 파이프라인 설계와 인력 운영, 품질 검증을 직접 다룹니다." className="mt-1 block" />
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="https://verbose-hoodie-b9b.notion.site/1509a4450304809fab3afaac417ab2ff?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
            className="glassmorphism card-hover flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--fg)]"
            whileTap={{ scale: 0.96 }}
          >
            <SiNotion className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>이력서 보기</span>
          </motion.a>

          <motion.a
            href="https://github.com/singunu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glassmorphism card-hover flex items-center rounded-full p-3 text-[var(--fg)]"
            whileTap={{ scale: 0.96 }}
          >
            <FaGithub className="h-5 w-5" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/singunu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glassmorphism card-hover flex items-center rounded-full p-3"
            style={{ color: 'var(--accent)' }}
            whileTap={{ scale: 0.96 }}
          >
            <FaLinkedin className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 스크롤 유도 */}
      <Link to="about" smooth duration={500} offset={-10} className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 cursor-pointer sm:block">
        <motion.div
          className="text-[var(--fg-muted)]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon className="h-6 w-6" />
        </motion.div>
      </Link>
    </section>
  );
}
