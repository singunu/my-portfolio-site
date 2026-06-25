'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaClock, FaArrowRight } from 'react-icons/fa';
import { Project } from './ProjectsData';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen }) => {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`${project.title} 상세 보기`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4) }}
      className="glassmorphism card-hover group flex h-full flex-col overflow-hidden rounded-2xl text-left"
    >
      {/* 이미지 */}
      <div className="relative h-40 w-full flex-shrink-0 overflow-hidden sm:h-44">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-1 flex-col p-4">
        {project.category && (
          <span
            className="mb-1.5 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--accent)',
            }}
          >
            {project.category}
          </span>
        )}

        <h3 className="text-base font-bold text-[var(--fg)] sm:text-lg">{project.title}</h3>
        <p className="line-clamp-1 text-sm text-[var(--fg-muted)]">{project.titleKo}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)]">
          <span className="flex items-center gap-1">
            <FaUsers className="h-3 w-3" />
            {project.teamSize}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="h-3 w-3" />
            {project.duration}
          </span>
        </div>

        {/* 스킬 미리보기 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 3).map((s) => (
            <span
              key={s.name}
              className={`${s.color} rounded-full px-2 py-0.5 text-[10px] font-medium text-white`}
            >
              {s.name}
            </span>
          ))}
        </div>

        <span
          className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          자세히 보기
          <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
