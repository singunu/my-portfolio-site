'use client';

import { Link } from 'react-scroll';
import {
  HomeIcon,
  UserIcon,
  FolderIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'home', icon: HomeIcon, label: '홈' },
  { id: 'about', icon: UserIcon, label: 'About' },
  { id: 'projects', icon: FolderIcon, label: 'Projects' },
  { id: 'contact', icon: EnvelopeIcon, label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState('home');

  // 마지막 섹션(Contact)은 뷰포트 상단까지 못 올라가 react-scroll spy가
  // 활성화하지 못하는 경우가 있어, 페이지 최하단에 닿으면 강제로 활성화한다.
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (scrolledToBottom) setActive('contact');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glassmorphism flex items-center gap-1 rounded-full px-2 py-2 sm:gap-2 sm:px-3"
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <Link
              key={item.id}
              to={item.id}
              spy
              smooth
              duration={500}
              offset={item.id === 'home' ? 0 : -10}
              onSetActive={() => setActive(item.id)}
              aria-label={item.label}
              className="relative flex cursor-pointer items-center justify-center rounded-full p-2 sm:p-2.5"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 16%, transparent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <item.icon
                className="relative h-5 w-5 transition-colors sm:h-6 sm:w-6"
                style={{ color: isActive ? 'var(--accent)' : undefined }}
              />
            </Link>
          );
        })}

        <span className="mx-0.5 h-5 w-px bg-gray-300/50 dark:bg-white/10" />

        <button
          onClick={toggleTheme}
          aria-label="테마 변경"
          className="rounded-full p-2 text-gray-500 transition-colors hover:text-[var(--accent)] dark:text-gray-400 sm:p-2.5"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </motion.nav>
    </div>
  );
}
