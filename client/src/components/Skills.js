import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, 
  FaGitAlt, FaDocker, FaAws, FaPython, FaJava, FaPhp 
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiMysql, SiPostgresql } from 'react-icons/si';

const skillLevels = {
  'HTML5': 95,
  'CSS3': 90,
  'JavaScript': 92,
  'React.js': 90,
  'Tailwind CSS': 85,
  'Bootstrap': 80,
  'Node.js': 85,
  'Express.js': 80,
  'Python': 88,
  'Java': 75,
  'PHP': 70,
  'MongoDB': 80,
  'MySQL': 85,
  'PostgreSQL': 75,
  'SQLite': 70,
  'Git': 90,
  'Docker': 75,
  'AWS': 70,
  'REST API': 80
};

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
        { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        { name: "Express.js", icon: <SiExpress className="text-gray-600 dark:text-gray-300" /> },
        { name: "Python", icon: <FaPython className="text-blue-600" /> },
        { name: "Java", icon: <FaJava className="text-red-500" /> }
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "AWS", icon: <FaAws className="text-yellow-500" /> }
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

  // Morphing background SVG blob
  const blobPath = `M421,307Q393,364,337,389Q281,414,224,410Q167,406,120,368Q73,330,70,265Q67,200,109,151Q151,102,217,81Q283,60,340,97Q397,134,424,197Q451,260,421,307Z`;

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Morphing Background Shape */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-10 pointer-events-none" viewBox="0 0 500 500">
        <motion.path
          d={blobPath}
          fill="url(#skillsBlobGradient)"
          animate={{
            d: [blobPath,
              'M430,320Q400,400,320,420Q240,440,170,400Q100,360,90,270Q80,180,150,120Q220,60,320,80Q420,100,440,200Q460,300,430,320Z',
              blobPath
            ]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="skillsBlobGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 text-center relative z-10"
      >
        {/* Section Title with Animated Gradient */}
        <motion.h2 
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-gray-800 dark:text-white animated-gradient-text"
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
                scale: 1.05,
                boxShadow: "0 0 30px #a5b4fc55",
                rotateY: 8,
                transition: { duration: 0.4 }
              }}
              className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 bounce-in relative group"
              style={{ perspective: 1000 }}
            >
              {/* Floating Badge */}
              <motion.div
                className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg opacity-80 group-hover:scale-110 transition-transform duration-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {category.category.charAt(0)}
              </motion.div>
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
                      scale: 1.08,
                      x: 5,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      boxShadow: "0 0 20px #6366f1aa",
                      rotateY: 8,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center bg-white/60 dark:bg-black p-2 sm:p-3 md:p-4 rounded-md shadow-sm border border-gray-200/50 dark:border-gray-800 transition-all duration-300 cursor-pointer group hover-lift relative"
                    style={{ transformStyle: 'preserve-3d' }}
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
                    {/* Animated Progress Bar */}
                    <motion.div
                      className="w-full h-2 mt-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md"
                        initial={{ width: 0 }}
                        animate={{ width: isVisible ? `${skillLevels[skill.name] || 70}%` : 0 }}
                        transition={{ delay: 0.2 + skillIndex * 0.1, duration: 1.2, type: 'spring' }}
                      />
                    </motion.div>
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