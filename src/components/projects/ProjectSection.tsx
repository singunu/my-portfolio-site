'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from './ProjectsData';

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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-20 lg:pt-6 xl:pt-16 md:pb-12 lg:pb-8 xl:pb-12">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 lg:mb-6 xl:mb-16 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Bai Jamjuree' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 pb-16 sm:pb-20 md:pb-24">
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