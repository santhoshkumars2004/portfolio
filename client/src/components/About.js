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

  const floatingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: [0, 1, 0.8],
      y: [20, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-gray-800 relative overflow-hidden dark:text-white">
      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="absolute top-10 left-10 w-4 h-4 bg-blue-600/20 rounded-full hidden md:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
        className="absolute top-20 right-20 w-6 h-6 bg-purple-600/20 rounded-full hidden md:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-20 w-3 h-3 bg-blue-600/20 rounded-full hidden md:block"
      />

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 flex items-center justify-center"
      >
        {/* Content area with heading and quote */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center"> 

          {/* About heading - visible on all devices */}
          <motion.h2 
            variants={titleVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 dark:text-white relative"
          >
            ABOUT
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: "100%" } : { width: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            />
          </motion.h2>
          
          {/* Quote */}
          <motion.div 
            variants={textVariants}
            className="max-w-2xl"
          >
            <motion.p 
              className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed dark:text-gray-300"
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