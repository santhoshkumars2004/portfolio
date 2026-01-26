import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const roles = ["Software Engineer", "Full Stack Developer", "Problem Solver"];
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
      transition: { duration: 1, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-black">
      {/* Spline 3D Scene - Hidden on mobile/tablet, only show on large screens */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <iframe
          src="https://my.spline.design/xmaskcopycopycopy-WeD62O8zkiQr5hu5M3wFLpy2-CAz/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="Spline 3D Design"
        />
      </div>

      {/* Full dark overlay for desktop with 3D */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 70%, transparent 85%)`,
        }}
      />

      {/* Main Content */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10"
      >
        <div className="max-w-xl lg:max-w-2xl">
          {/* Solid background panel for text - ensures no overlap */}
          <div className="lg:bg-black/80 lg:backdrop-blur-sm lg:p-8 lg:rounded-2xl lg:border lg:border-gray-800/50">
            {/* Small Intro Text */}
            <motion.p
              variants={itemVariants}
              className="text-blue-400 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 font-mono"
            >
              {'<'} WELCOME TO MY UNIVERSE {'/>'}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              <span className="block text-gray-400 text-2xl md:text-3xl mb-2 font-light">
                I'm
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
                Santhosh
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400">
                Kumar
              </span>
            </motion.h1>

            {/* Role with Typewriter */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6 text-lg md:text-xl"
            >
              <span className="text-gray-600 font-mono">{'{'}</span>
              <motion.span
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-blue-400 font-medium"
              >
                {roles[currentRoleIndex]}
              </motion.span>
              <span className="text-gray-600 font-mono">{'}'}</span>
            </motion.div>

            {/* Company Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <span className="inline-block px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm">
                Software Engineer Trainee @ <span className="text-blue-400 font-medium">Cisco Systems</span>
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-full font-medium tracking-wide hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-gray-500 text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 z-10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-purple-500/30 z-10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-500/30 z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-500/30 z-10" />

      {/* Bottom Bar - Covers Spline Watermark */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black to-transparent z-[5]" />
      <div className="absolute bottom-0 right-0 w-48 h-20 bg-black z-[6]" />
    </section>
  );
};

export default Hero;