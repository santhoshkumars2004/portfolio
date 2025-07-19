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

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-900 text-white min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
        className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-20 w-3 h-3 bg-white/20 rounded-full hidden lg:block"
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Large "LET'S TALK" text with gradient */}
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-center tracking-tight leading-none mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 px-4"
          style={{ background: 'linear-gradient(to right, white 50%, gray 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          LET'S TALK
        </motion.h2>

        {/* Scattered Smaller Links (Absolute Positioning) */}
        {/* Hidden on smaller screens to prevent overlap */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {scatteredLinks.map((link, index) => (
            <motion.a
              key={index}
              href="#" // Replace with actual links
              variants={linkVariants}
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

        {/* Prominent Buttons at the bottom */}
        <motion.div 
          variants={buttonVariants}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 w-full z-20"
        >
           <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {/* Only LinkedIn and Contact Me buttons at the bottom */}
              <motion.a 
                href="#" 
                whileHover={{ 
                  scale: 1.1,
                  y: -3,
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 md:px-6 py-2 rounded-full border border-white text-white font-semibold transition-all duration-300 text-xs sm:text-sm uppercase cursor-pointer"
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
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 md:px-6 py-2 rounded-full border border-white text-white font-semibold transition-all duration-300 text-xs sm:text-sm uppercase cursor-pointer"
              >
                CONTACT ME
              </motion.a>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LetsTalk; 