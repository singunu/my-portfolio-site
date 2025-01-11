'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageIndex: number;
}

export default function PageTransition({ children, pageIndex }: PageTransitionProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageIndex);

  useEffect(() => {
    if (currentPage !== pageIndex) {
      setIsRotating(true);
      const timer = setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsRotating(false);
      }, 500); // 애니메이션 시간
      return () => clearTimeout(timer);
    }
  }, [pageIndex, currentPage]);

  return (
    <motion.div
      className="w-screen h-screen"
      initial={false}
      animate={{
        rotateX: isRotating ? 90 : 0,
        opacity: isRotating ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}