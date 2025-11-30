'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaClock, FaTools, FaExternalLinkAlt, FaHandPointer } from 'react-icons/fa';
import { Project } from './ProjectsData';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 min-h-[400px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[440px] xl:min-h-[500px]"
    >
      {/* 모바일 디자인 */}
      <div className="block lg:hidden">
        <div className="glassmorphism rounded-xl overflow-hidden shadow-lg flex flex-col">
          {/* 이미지 */}
          <div className="relative h-36 sm:h-44 md:h-48 lg:h-40 xl:h-48">
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
                <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white theme-transition-icon">
                  {project.title}
                </h3>
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-300 line-clamp-2 theme-transition-icon">
                  {project.titleKo}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <FaUsers className="w-2.5 xs:w-3 h-2.5 xs:h-3 theme-transition-icon" />
                  <span>{project.teamSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-2.5 xs:w-3 h-2.5 xs:h-3 theme-transition-icon" />
                  <span>{project.duration}</span>
                </div>
              </div>

              <div className="mb-1 xs:mb-2">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5 sm:gap-2">
                  <FaTools className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 theme-transition-icon" />
                  담당 역할
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 theme-transition-icon">
                  {project.role.join(', ')}
                </p>
              </div>
            </div>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mb-0 mx-2 sm:mx-0 py-1 xs:py-1.5 sm:py-2 
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
              <FaExternalLinkAlt className="w-2.5 xs:w-3 h-2.5 xs:h-3 transition-transform group-hover:translate-x-1 theme-transition-icon" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* 태블릿/데스크톱 디자인 */}
      <div className="hidden lg:block perspective-1000 h-[460px] md:h-[500px] lg:h-[440px] xl:h-[500px]">
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
              <div className="relative h-36 sm:h-44 md:h-48 lg:h-32 xl:h-48">
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
              <div className="p-4 flex flex-col h-[calc(100%-12rem)] min-h-[16rem] space-y-4 overflow-y-auto lg:p-3 lg:h-[calc(100%-10rem)] xl:h-[calc(100%-12rem)] xl:p-4 lg:space-y-3 xl:space-y-4">
                <div>
                  <h3 className="text-lg lg:text-base xl:text-lg font-bold text-gray-900 dark:text-white theme-transition-icon">
                    {project.title}
                  </h3>
                  <p className="text-sm lg:text-xs xl:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 theme-transition-icon">
                    {project.titleKo}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:gap-2 xl:gap-3 text-sm lg:text-xs xl:text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <FaUsers className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 theme-transition-icon" />
                    <span>{project.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 theme-transition-icon" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <h4 className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5 sm:gap-2">
                    <FaTools className="w-3 h-3 sm:w-4 sm:h-4 theme-transition-icon" />
                    담당 역할
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-xs xl:text-sm text-gray-600 dark:text-gray-300 theme-transition-icon">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {project.period}
                </p>
                <p className="text-sm lg:text-xs xl:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 flex items-center justify-center gap-2 lg:gap-1.5 xl:gap-2
                         text-blue-600 dark:text-blue-300 text-sm lg:text-xs xl:text-sm
                         border border-blue-500/30 dark:border-blue-400/30
                         rounded-full
                         bg-blue-500/5 dark:bg-blue-400/5
                         hover:bg-blue-500/10 dark:hover:bg-blue-400/10
                         transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                자세히 보기
                <FaExternalLinkAlt className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 transition-transform hover:translate-x-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;