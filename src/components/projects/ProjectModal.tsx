'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaTools,
  FaExternalLinkAlt,
  FaTimes,
} from 'react-icons/fa';
import { Project } from './ProjectsData';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // ESC 닫기 + 배경 스크롤 락
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  const hasExternalLink = project.link && project.link !== '#';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 상세`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        className="glassmorphism relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl sm:max-w-2xl sm:rounded-3xl"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      >
        {/* 닫기 */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <FaTimes className="h-4 w-4" />
        </button>

        {/* 이미지 헤더 */}
        <div className="relative h-40 w-full flex-shrink-0 sm:h-52">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 640px) 42rem, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            {project.category && (
              <span className="mb-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                {project.category}
              </span>
            )}
            <h3 className="text-lg font-bold text-white sm:text-xl" style={{ fontFamily: 'Bai Jamjuree' }}>
              {project.title}
            </h3>
            <p className="text-sm text-white/80">{project.titleKo}</p>
          </div>
        </div>

        {/* 본문 (스크롤) */}
        <div className="scrollbar-thin flex-1 overflow-y-auto p-4 sm:p-6">
          {/* 메타 */}
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--fg-muted)] sm:text-sm">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
              {project.period}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
              {project.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <FaUsers className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
              {project.teamSize}
            </span>
          </div>

          {/* 설명 */}
          <p className="mb-5 text-sm leading-relaxed text-[var(--fg)] sm:text-[15px]">
            {project.description}
          </p>

          {/* 담당 역할 */}
          <div className="mb-5">
            <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[var(--fg)]">
              <FaTools className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
              담당 역할
            </h4>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {project.role.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg-muted)]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* 팀 구성 */}
          {project.team?.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-2 text-sm font-semibold text-[var(--fg)]">팀 구성</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.team.map((t, i) => (
                  <span key={i} className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-[var(--fg-muted)] dark:bg-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 세부 과제 */}
          {project.subTasks && project.subTasks.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                담당 과제 ({project.subTasks.length}개)
              </h4>
              <ul className="space-y-1.5">
                {project.subTasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--fg-muted)] sm:text-sm">
                    <span
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      {i + 1}
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 스킬 */}
          <div className="mb-2">
            <h4 className="mb-2 text-sm font-semibold text-[var(--fg)]">사용 기술</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s.name}
                  className={`${s.color} rounded-full px-3 py-1 text-xs font-medium text-white`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 외부 링크 (있을 때만) */}
        {hasExternalLink && (
          <div className="flex-shrink-0 border-t border-white/10 p-3 sm:p-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              style={{ background: 'linear-gradient(110deg, var(--accent), var(--accent-3))' }}
            >
              원문(Notion)에서 보기
              <FaExternalLinkAlt className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
