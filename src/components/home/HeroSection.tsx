'use client'

import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin,
} from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white 
                     mb-2 sm:mb-3 md:mb-4 lg:mb-5 tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'GumiIndustryTTF',
            WebkitBackfaceVisibility: "hidden",
            WebkitTransform: "translate3d(0, 0, 0)",
            willChange: "transform"
          }}
        >
          안녕하세요, 신건우입니다.
        </motion.h1>
        
        <motion.h2 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 
                     bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-100 
                     mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          style={{ 
          fontFamily: 'Bai Jamjuree',
          WebkitBackfaceVisibility: "hidden",
          WebkitTransform: "translate3d(0, 0, 0)",
          willChange: "transform",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Data Analyst & Front-end Developer
        </motion.h2>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 
                    max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto 
                    leading-relaxed sm:leading-loose px-2 sm:px-3 md:px-4 
                    tracking-normal lg:text-lg
                    mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ 
            WebkitBackfaceVisibility: "hidden",
            WebkitTransform: "translate3d(0, 0, 0)",
            willChange: "transform"
          }}
        >
          데이터를 이해하기 쉽게 전달하고,
          <br className="hidden sm:block" />
          더 나은 사용자 경험을 만들어가고 싶습니다.
        </motion.p>
        
        <motion.div
          className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a 
            href="https://verbose-hoodie-b9b.notion.site/1509a4450304809fab3afaac417ab2ff?pvs=4"
            target="_blank"
            className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-sm lg:text-sm sm:text-base
                      glassmorphism text-gray-800 dark:text-white rounded-full 
                      hover:bg-blue-500/10 dark:hover:bg-blue-400/10 
                      transition-colors flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SiNotion className="w-4 h-4 sm:w-5 sm:h-5 theme-transition-icon" />
            <span className="hidden sm:inline theme-transition-icon">이력서 보기</span>
          </motion.a>
  
          <motion.a 
            href="https://github.com/singunu"
            target="_blank"
            className="p-2 sm:p-3 md:p-4 lg:p-3 glassmorphism 
                      text-gray-700 dark:text-gray-300 
                      rounded-full hover:bg-blue-500/10 
                      dark:hover:bg-blue-400/10 
                      transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 theme-transition-icon" />
          </motion.a>
  
          <motion.a 
            href="https://www.linkedin.com/in/singunu/"
            target="_blank"
            className="p-2 sm:p-3 md:p-4 lg:p-3 glassmorphism 
                      text-blue-600 dark:text-blue-400 
                      rounded-full hover:bg-blue-500/10 
                      dark:hover:bg-blue-400/10 
                      transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 theme-transition-icon" />
          </motion.a>
        </motion.div>
      </motion.div>
     
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 
                     bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 
                     bg-cyan-400/30 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
  );
}