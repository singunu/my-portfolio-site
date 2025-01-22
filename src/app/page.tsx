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
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {currentSection === 'about' && <AboutSection />}
            {currentSection === 'projects' && <ProjectSection />}
            {currentSection === 'contact' && <ContactSection />}
            {currentSection === 'home' && <HeroSection />}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-50">
        <Navbar onSectionChange={handleSectionChange} />
      </div>
    </div>
  );
}