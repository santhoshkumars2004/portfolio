import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, 
  FaGitAlt, FaDocker, FaAws, FaPython, FaJava, FaPhp 
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiMysql, SiPostgresql } from 'react-icons/si';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
        { name: "React.js", icon: <FaReact className="text-blue-400" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        { name: "Express.js", icon: <SiExpress className="text-gray-600 dark:text-gray-300" /> },
        { name: "Python", icon: <FaPython className="text-blue-600" /> },
        { name: "Java", icon: <FaJava className="text-red-500" /> },
        { name: "PHP", icon: <FaPhp className="text-purple-600" /> }
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
        { name: "SQLite", icon: <FaDatabase className="text-gray-600 dark:text-gray-300" /> }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
        { name: "AWS", icon: <FaAws className="text-yellow-500" /> },
        { name: "REST API", icon: <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">API</div> }
      ]
    }
  ];

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

  const categoryVariants = {
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 text-center"
      >
        {/* Section Title */}
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-gray-800 dark:text-white"
        >
          Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={categoryVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <motion.h3 
                className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-700 flex items-center justify-center dark:text-gray-200"
                whileHover={{ 
                  color: "#3b82f6",
                  transition: { duration: 0.3 }
                }}
              >
                <span className="ml-2">{category.category}</span>
              </motion.h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex} 
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.05,
                      x: 5,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center bg-white/60 dark:bg-black p-2 sm:p-3 md:p-4 rounded-md shadow-sm border border-gray-200/50 dark:border-gray-800 
                               transition-all duration-300 cursor-pointer group"
                  >
                    {/* Wrapped icon in a div for rotation */}
                    <motion.div 
                      className="transition-transform duration-300"
                      whileHover={{ 
                        rotate: 12,
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <motion.span 
                      className="ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base md:text-lg text-gray-800 dark:text-white font-medium"
                      whileHover={{ 
                        color: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 