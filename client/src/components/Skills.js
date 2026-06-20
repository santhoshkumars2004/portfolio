import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TiltCard } from './interactive/InteractiveElements';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const skillCategories = [
    {
      title: 'Languages',
      icon: '{ }',
      skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
      color: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'FastAPI', 'REST API'],
      color: 'from-sky-500 to-cyan-400',
    },
    {
      title: 'Databases & AI',
      icon: '🗄️',
      skills: ['PostgreSQL', 'ChromaDB', 'LangChain', 'RAG', 'GPT Integration', 'Prompt Engineering'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Testing & Tools',
      icon: '🔧',
      skills: ['Playwright', 'Unit Testing', 'Jenkins', 'Git', 'GitHub', 'JIRA', 'GitHub Copilot', 'MCP Server'],
      color: 'from-blue-600 to-sky-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0B1020]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020] via-[#121A2B]/60 to-[#0B1020]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block">
            03. TECHNICAL SKILLS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Resume{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Stack
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: '100px' } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                variants={itemVariants}
                className="h-full p-6 rounded-2xl bg-gradient-to-br from-[#121A2B] to-[#16233A] border border-[#22314f] hover:border-blue-500/40 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className={`text-3xl mb-4 w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  {category.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h4 className="text-gray-500 text-sm tracking-widest mb-6">CORE COMPETENCIES</h4>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {['Automation Engineering', 'AI Compliance Pipeline', 'LLM Orchestration', 'Cross-Functional Delivery', 'Production Debugging'].map((comp, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-300 font-medium"
              >
                {comp}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;