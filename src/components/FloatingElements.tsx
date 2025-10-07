'use client';
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  const elements = [
    { id: 1, size: 60, x: 10, y: 20, delay: 0, duration: 8 },
    { id: 2, size: 40, x: 80, y: 15, delay: 2, duration: 6 },
    { id: 3, size: 80, x: 20, y: 70, delay: 4, duration: 10 },
    { id: 4, size: 30, x: 90, y: 50, delay: 1, duration: 7 },
    { id: 5, size: 50, x: 60, y: 80, delay: 3, duration: 9 },
    { id: 6, size: 35, x: 30, y: 40, delay: 5, duration: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="glass rounded-full"
            style={{
              width: element.size,
              height: element.size,
              background: `linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%)`,
            }}
          />
        </motion.div>
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-32 h-32 border-2 border-blue-400 rotate-45 glass" />
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/4 opacity-10"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-24 h-24 border-2 border-blue-500 rounded-full glass" />
      </motion.div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default FloatingElements;
