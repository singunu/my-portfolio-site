'use client'

import { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ProjectSection from '@/components/projects/ProjectSection';
import ContactSection from '@/components/contact/ContactSection';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
  }, []);

  const variants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {currentSection === 'about' && <AboutSection />}
            {currentSection === 'projects' && <ProjectSection />}
            {currentSection === 'contact' && <ContactSection />}
            {currentSection === 'home' && <HeroSection />}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="sticky bottom-0 left-0 right-0 z-50">
        <Navbar onSectionChange={handleSectionChange} />
      </div>
    </div>
  );
}