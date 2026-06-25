'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects, Project } from './ProjectsData';
import ScrambleText from '@/components/ui/ScrambleText';

const ProjectSection: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="relative w-full px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl font-extrabold text-[var(--fg)] sm:text-4xl"
            style={{ fontFamily: 'Bai Jamjuree' }}
          >
            <ScrambleText text="Projects" />
          </h2>
          <p className="mt-3 text-sm text-[var(--fg-muted)] sm:text-base">
            <ScrambleText text="카드를 누르면 상세 내용을 확인할 수 있습니다." />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
