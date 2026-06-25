'use client';

import { Element } from 'react-scroll';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ProjectSection from '@/components/projects/ProjectSection';
import ContactSection from '@/components/contact/ContactSection';
import BackgroundScene from '@/components/three/BackgroundScene';
import CursorGlow from '@/components/three/CursorGlow';

export default function Home() {
  return (
    <>
      <BackgroundScene />
      <CursorGlow />

      <main className="relative z-10">
        <Element name="home" className="section-anchor">
          <HeroSection />
        </Element>
        <Element name="about" className="section-anchor">
          <AboutSection />
        </Element>
        <Element name="projects" className="section-anchor">
          <ProjectSection />
        </Element>
        <Element name="contact" className="section-anchor">
          <ContactSection />
        </Element>
      </main>

      <Navbar />
    </>
  );
}
