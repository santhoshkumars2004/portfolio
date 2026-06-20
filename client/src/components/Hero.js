import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const roles = ['Software Engineer', 'AI Systems Engineer', 'Full Stack Developer'];
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
    <section id="home" className="min-h-screen pt-20 sm:pt-24 flex items-center relative overflow-hidden bg-[#0B1020]">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.12),transparent_45%)]" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 py-10 sm:py-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="text-blue-400 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 font-mono"
            >
              {'<'} WELCOME TO MY PORTFOLIO {'/>'}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              <span className="block text-gray-400 text-2xl md:text-3xl mb-2 font-light">
                I'm
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                Santhosh
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-400">
                Kumar
              </span>
            </motion.h1>

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

            <motion.div
              variants={itemVariants}
              className="mb-7"
            >
              <span className="inline-block px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm">
                Software Engineer @ <span className="text-blue-400 font-medium">Cisco Systems (Graduate Program)</span>
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-300/90 max-w-xl leading-relaxed mb-8"
            >
              I build production-ready AI-enabled software. At Cisco, I delivered a compliance pipeline that scanned large codebases, cut review time from years to under two hours, and generated engineer-ready tickets.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl">
              {[
                { value: '200+', label: 'Automated Tests' },
                { value: '95%', label: 'Test Coverage' },
                { value: '168k', label: 'Files Analyzed' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl border border-[#22314f] bg-[#121A2B]/80 p-3">
                  <div className="text-xl font-semibold text-white">{metric.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-medium tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 border border-blue-500/30 text-gray-300 rounded-full font-medium tracking-wide hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-xl" />
              <div className="relative rounded-3xl border border-[#22314f] bg-[#121A2B]/85 backdrop-blur-sm p-4">
                <img
                  src="/images/my-profile.jpg"
                  alt="Santhosh Kumar"
                  className="w-full h-[420px] sm:h-[500px] object-cover rounded-2xl"
                />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#0E1628]/80 border border-[#22314f] px-3 py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Focus</p>
                    <p className="text-sm text-gray-200 mt-1">AI Compliance + Automation</p>
                  </div>
                  <div className="rounded-lg bg-[#0E1628]/80 border border-[#22314f] px-3 py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-gray-200 mt-1">Madurai, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/20 z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/20 z-10" />
    </section>
  );
};

export default Hero;