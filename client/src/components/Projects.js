import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      subtitle: "FULL STACK",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "Portfolio Website",
      subtitle: "FRONTEND",
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "Blog Website",
      subtitle: "FULL STACK",
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

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={animatedItems.length > 0 ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white"
        >
          FEATURED PROJECT
        </motion.h2>

        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${getMaxWidth()} mx-auto justify-items-center`}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm dark:bg-black rounded-lg overflow-hidden border border-gray-300/50 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm cursor-pointer group"
            >
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                >
                  <Link to={`/projects/${project.id}`} className="bg-white border border-gray-300 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
                    <FaArrowRight className="text-lg text-gray-800 dark:text-white" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="p-3 sm:p-4 text-center"
                whileHover={{ 
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm tracking-widest dark:text-gray-300">
                  {project.subtitle}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects; 