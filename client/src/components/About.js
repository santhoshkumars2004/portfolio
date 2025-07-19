import React from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      x: -20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // SVG blob animation
  const blobPath = `M421,307Q393,364,337,389Q281,414,224,410Q167,406,120,368Q73,330,70,265Q67,200,109,151Q151,102,217,81Q283,60,340,97Q397,134,424,197Q451,260,421,307Z`;

  return (
    <section id="about" className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-gray-800 relative overflow-hidden dark:text-white">
      {/* Animated SVG Blob */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-20 pointer-events-none" viewBox="0 0 500 500">
        <motion.path
          d={blobPath}
          fill="url(#aboutBlobGradient)"
          animate={{
            d: [blobPath,
              'M430,320Q400,400,320,420Q240,440,170,400Q100,360,90,270Q80,180,150,120Q220,60,320,80Q420,100,440,200Q460,300,430,320Z',
              blobPath
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="aboutBlobGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
      </svg>
      {/* Floating glowing particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/30 blur-md pointer-events-none"
          style={{
            width: `${16 + Math.random() * 32}px`,
            height: `${16 + Math.random() * 32}px`,
            top: `${10 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            zIndex: 1
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 flex items-center justify-center relative z-20"
      >
        {/* Content area with heading and quote */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center relative"> 
          {/* About heading - visible on all devices */}
          <motion.h2 
            variants={titleVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 dark:text-white animated-gradient-text relative"
          >
            ABOUT
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: "100%" } : { width: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            />
          </motion.h2>
          {/* Animated signature underline for name */}
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: 180 } : { width: 0 }}
            transition={{ delay: 1.2, duration: 1.2, type: 'spring' }}
            className="mx-auto mb-2 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{ width: 180, maxWidth: '80%' }}
          />
          {/* Quote with typewriter and shimmer effect */}
          <motion.div 
            variants={textVariants}
            className="max-w-2xl"
          >
            <motion.p 
              className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed dark:text-gray-300 typewriter shimmer"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              I'm Santhosh Kumar —  a final year student pursuing a B.Tech in Information Technology, passionate about exploring the realms of technology and design
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 