import { HomeIcon, UserIcon, FolderIcon, EnvelopeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSectionChange: (section: string) => void;
}

export default function Navbar({ onSectionChange }: NavbarProps) {
  const [activeItem, setActiveItem] = useState('home');
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const handleClick = (id: string) => {
    setActiveItem(id);
    onSectionChange(id);
  };

  const navItems = [
    {
      id: 'theme',
      icon: theme === 'dark' ? SunIcon : MoonIcon,
      label: '테마 변경',
      onClick: toggleTheme
    },
    { id: 'about', icon: UserIcon, label: 'About Me' },
    { id: 'home', icon: HomeIcon, label: '홈' },
    { id: 'projects', icon: FolderIcon, label: '프로젝트' },
    { id: 'contact', icon: EnvelopeIcon, label: '연락처' },
  ];

  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-id="${activeItem}"]`) as HTMLElement;
      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setIndicatorWidth(buttonRect.width);
        setIndicatorPosition(buttonRect.left - navRect.left);
      }
    }
  }, [activeItem]);

  return (
    <div className="fixed bottom-2 sm:bottom-1 md:bottom-1 w-full flex justify-center pb-4 sm:pb-6 md:pb-8 lg:pb-3 xl:pb-8 pb-[env(safe-area-inset-bottom,1rem)]">
      <motion.nav 
        className="glassmorphism rounded-full 
        px-3 sm:px-4 md:px-6 lg:px-5 xl:px-6
        py-2 sm:py-2.5 md:py-3 lg:py-2.5 xl:py-3 
        relative 
        max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%]"
      >
        <motion.div
          className="absolute bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
          initial={false}
          animate={{
            width: indicatorWidth,
            x: indicatorPosition,
            y: -16,
            opacity: 1
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
          style={{
            height: '32px',
            top: '50%',
          }}
        />
        <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-8" ref={navRef}>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              data-id={item.id}
              onClick={() => item.onClick ? item.onClick() : handleClick(item.id)}
              className={`relative p-1.5 sm:p-2 md:p-2 lg:p-1.5 xl:p-2 rounded-full z-10 ${
                activeItem === item.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}