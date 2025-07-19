import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const roles = ["developer", "designer", "full stack web developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
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

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const roleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center text-gray-800 relative overflow-hidden pt-12 sm:pt-16 dark:text-white">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 via-transparent to-transparent opacity-50" />
      
      {/* Floating Particles Background */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Morphing Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 morphing-bg opacity-20 hidden lg:block"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 morphing-bg opacity-15 hidden lg:block"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 flex flex-col items-center justify-center text-center py-4 sm:py-8 md:py-12 relative z-10"
      >
        {/* Enhanced Main Title with Animated Gradient */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-2 sm:mb-4 whitespace-normal sm:whitespace-nowrap dark:text-white px-2 animated-gradient-text"
        >
          EXPLORE MY PORTFOLIO
        </motion.h1>

        {/* Enhanced Role Text with Typewriter Effect */}
        <motion.div
          key={currentRoleIndex}
          variants={roleVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold tracking-wide mb-4 sm:mb-6 md:mb-8 lg:mb-12 dark:text-gray-300 h-8 sm:h-10 md:h-12 flex items-center justify-center"
        >
          <span className="typewriter">{roles[currentRoleIndex]}</span>
        </motion.div>

        {/* Enhanced Profile Image Container with Floating Animation */}
        <motion.div 
          variants={itemVariants}
          className="relative flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
        >
          {/* Glowing Ring Effect */}
          <motion.div
            className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 rounded-full neon-glow"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.img
            variants={imageVariants}
            src="/images/my-profile.jpg"
            alt="Profile"
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 object-cover rounded-full grayscale border-4 border-white shadow-xl dark:border-gray-800 floating-element"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Enhanced Arrow Button with Ripple Effect */}
          <motion.button 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              rotate: 15,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-[-12px] sm:bottom-[-16px] md:bottom-[-20px] lg:bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 ripple magnetic"
          >
            <FaArrowRight className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-800 dark:text-white" />
          </motion.button>
        </motion.div>

        {/* Enhanced Bio Text with Shimmer Effect */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-2 sm:mb-4 md:mb-6 lg:mb-8 dark:text-gray-300 px-4 shimmer"
        >
          I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD.
        </motion.p>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero; 