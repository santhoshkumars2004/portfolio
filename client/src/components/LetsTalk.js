import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const LetsTalk = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  // Adjusted positions for scattered links based on visual estimation from the image
  const scatteredLinks = [
    { name: "REACT", top: '8%', left: '15%' },
    { name: "NODE", top: '12%', right: '18%' },
    { name: "WORDPRESS", top: '18%', right: '5%' },
    { name: "FRAMER", bottom: '25%', left: '10%' },
    // Add more links and adjust positions as needed
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
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
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const linkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Animated chat bubbles
  const chatBubbles = [
    { text: "👋", top: '10%', left: '60%', delay: 0 },
    { text: "💬", top: '30%', left: '80%', delay: 0.5 },
    { text: "🚀", top: '60%', left: '10%', delay: 1 },
    { text: "✨", top: '80%', left: '70%', delay: 1.5 },
  ];

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-900 text-white min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated SVG Wave at the top */}
      <svg className="absolute top-0 left-0 w-full h-24 z-10" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,80 Q360,0 720,80 T1440,80 V120 H0 Z"
          fill="url(#letsTalkWave)"
          animate={{ d: [
            'M0,80 Q360,0 720,80 T1440,80 V120 H0 Z',
            'M0,60 Q360,100 720,60 T1440,100 V120 H0 Z',
            'M0,80 Q360,0 720,80 T1440,80 V120 H0 Z'
          ] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="letsTalkWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
      </svg>
      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full hidden lg:block z-10"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
        className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full hidden lg:block z-10"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-20 w-3 h-3 bg-white/20 rounded-full hidden lg:block z-10"
      />
      {/* Parallax/Floating Chat Bubbles */}
      {chatBubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl select-none pointer-events-none z-20"
          style={{ top: bubble.top, left: bubble.left }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay
          }}
        >
          {bubble.text}
        </motion.div>
      ))}
      {/* Scattered Smaller Links (Absolute Positioning) */}
      {/* Hidden on smaller screens to prevent overlap */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
        {scatteredLinks.map((link, index) => (
          <motion.a
            key={index}
            href="#" // Replace with actual links
            variants={linkVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            whileHover={{ 
              scale: 1.2,
              color: "#ffffff",
              transition: { duration: 0.2 }
            }}
            className="absolute text-gray-400 hover:text-white transition-colors text-sm font-semibold pointer-events-auto uppercase"
            style={{ top: link.top, left: link.left, right: link.right, bottom: link.bottom }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>
      {/* Main Content Container */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-30 flex flex-col items-center justify-center w-full h-full"
      >
        {/* Large "LET'S TALK" text with animated gradient */}
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-center tracking-tight leading-none mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 animated-gradient-text"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          LET'S TALK
        </motion.h2>
        {/* Buttons Container */}
        <motion.div 
          variants={buttonVariants}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4"
        >
          {/* LinkedIn and Contact Me buttons with ripple, magnetic, and glow effect */}
          <motion.a 
            href="#" 
            whileHover={{ 
              scale: 1.1,
              y: -3,
              backgroundColor: "#ffffff",
              color: "#1f2937",
              boxShadow: "0 0 30px #a21caf88",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full border border-white text-white font-semibold transition-all duration-300 text-sm sm:text-base uppercase cursor-pointer hover:shadow-lg ripple magnetic hover-glow"
          >
            LINKEDIN
          </motion.a>
          <motion.a 
            href="#contact" 
            whileHover={{ 
              scale: 1.1,
              y: -3,
              backgroundColor: "#ffffff",
              color: "#1f2937",
              boxShadow: "0 0 30px #6366f188",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full border border-white text-white font-semibold transition-all duration-300 text-sm sm:text-base uppercase cursor-pointer hover:shadow-lg ripple magnetic hover-glow"
          >
            CONTACT ME
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LetsTalk; 