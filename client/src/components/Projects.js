import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const Projects = () => {
  const [rippleIndex, setRippleIndex] = useState(null);
  const projects = [
    {
      id: 'legal-ai-fir-assist',
      title: "Legal AI FIR Assist",
      subtitle: "AI-CHATBOT",
      image: "/images/project1.jpg"
    },
    {
      id: 'petition-tracking-using-ai',
      title: "Petition Tracking Using AI",
      subtitle: "AI Management System",
      image: "/images/project2.jpg"
    },
    {
      id: 'cococyclerevive',
      title: "CocoCyle",
      subtitle: "AI POWERED CHAT",
      image: "/images/project3.jpg"
    }
  ];

  const [containerRef, animatedItems] = useStaggerAnimation(projects, 0.15);

  const getGridCols = () => {
    const count = projects.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4";
    if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
    if (count === 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  };

  const getMaxWidth = () => {
    const count = projects.length;
    if (count === 1) return "max-w-sm";
    if (count === 2) return "max-w-2xl";
    if (count === 3) return "max-w-4xl";
    if (count === 4) return "max-w-5xl";
    if (count === 5) return "max-w-6xl";
    if (count === 6) return "max-w-7xl";
    return "max-w-7xl";
  };

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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Morphing background SVG blob
  const blobPath = `M421,307Q393,364,337,389Q281,414,224,410Q167,406,120,368Q73,330,70,265Q67,200,109,151Q151,102,217,81Q283,60,340,97Q397,134,424,197Q451,260,421,307Z`;

  // Ripple effect handler
  const handleRipple = (index) => {
    setRippleIndex(index);
    setTimeout(() => setRippleIndex(null), 600);
  };

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Morphing Background Shape */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-10 pointer-events-none" viewBox="0 0 500 500">
        <motion.path
          d={blobPath}
          fill="url(#projectsBlobGradient)"
          animate={{
            d: [blobPath,
              'M430,320Q400,400,320,420Q240,440,170,400Q100,360,90,270Q80,180,150,120Q220,60,320,80Q420,100,440,200Q460,300,430,320Z',
              blobPath
            ]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="projectsBlobGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
      </svg>
      {/* Floating Decorative Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-400/20 blur-md pointer-events-none"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            top: `${10 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            zIndex: 1
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 7 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7
          }}
        />
      ))}
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={animatedItems.length > 0 ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Enhanced Section Title with Animated Gradient */}
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white animated-gradient-text"
        >
          FEATURED PROJECT
        </motion.h2>
        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${getMaxWidth()} mx-auto justify-items-center`}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateY: 8,
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-sm dark:bg-black/90 rounded-xl overflow-hidden border border-gray-300/50 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 w-full max-w-sm cursor-pointer group relative card-flip"
              style={{ perspective: 1000 }}
            >
              {/* Card Front */}
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full overflow-hidden card-flip-front" style={{ backfaceVisibility: 'hidden', position: 'relative', zIndex: 2 }}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.6 }
                  }}
                />
                {/* Enhanced Overlay with Morphing Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm"
                >
                  {/* Enhanced Arrow Button with Glow Effect */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="bg-white/90 border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 neon-glow magnetic"
                  >
                    <FaArrowRight className="text-lg text-gray-800 dark:text-white" />
                  </Link>
                </motion.div>
                {/* Animated NEW badge */}
                <motion.div
                  className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-scale"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  NEW
                </motion.div>
              </div>
              {/* Card Back (flip) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-700/90 to-purple-700/90 flex flex-col items-center justify-center text-white p-6 card-flip-back" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: 1 }}>
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-xs mb-4 opacity-80">{project.subtitle}</p>
                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 ripple magnetic shadow-lg hover:shadow-xl relative overflow-hidden"
                  onClick={() => handleRipple(index)}
                >
                  <span>Explore Project</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  {/* Ripple/Explosion effect */}
                  {rippleIndex === index && (
                    <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-white/40 rounded-full animate-ping z-10" style={{ transform: 'translate(-50%, -50%)', width: 120, height: 120 }} />
                  )}
                </Link>
              </div>
              {/* Enhanced Content Section (front) */}
              <motion.div
                className="p-4 sm:p-5 text-center relative"
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm tracking-widest dark:text-gray-300 mb-4">
                    {project.subtitle}
                  </p>
                  {/* Enhanced Explore Button with Ripple Effect */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 ripple magnetic shadow-lg hover:shadow-xl relative overflow-hidden"
                    onClick={() => handleRipple(index)}
                  >
                    Explore Project
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    {/* Ripple/Explosion effect */}
                    {rippleIndex === index && (
                      <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-white/40 rounded-full animate-ping z-10" style={{ transform: 'translate(-50%, -50%)', width: 120, height: 120 }} />
                    )}
                  </Link>
                </div>
              </motion.div>
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
            Want to see more of my work?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects; 