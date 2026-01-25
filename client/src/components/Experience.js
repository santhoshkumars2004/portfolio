import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const experiences = [
    {
      title: 'Software Engineer Trainee',
      company: 'Cisco Systems',
      years: 'Oct 2025 - Present',
      description: 'Developed end-to-end test automation framework using Playwright and TypeScript. Built production-grade APIs using Python and FastAPI. Integrated AI agents for automated security code analysis.',
      highlights: ['Playwright', 'TypeScript', 'FastAPI', 'AI Agents', 'CI/CD'],
    },
    {
      title: 'Java Development Intern',
      company: 'OCTANET',
      years: 'July 2024 - Aug 2024',
      description: 'Enhanced applications with object-oriented principles, exception handling, and optimized data structures. Streamlined automation processes ensuring high code quality and scalability.',
      highlights: ['Java', 'OOP', 'Data Structures', 'Automation'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-gray-900/20" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
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
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block">
            02. EXPERIENCE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Journey
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: '100px' } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"
            initial={{ height: 0 }}
            animate={isVisible ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {experiences.map((exp, index) => (
            <TimelineItem key={index} data={exp} index={index} isVisible={isVisible} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TimelineItem = ({ data, index, isVisible }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.3 }}
      className={`relative flex items-center mb-20 w-full ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Empty space */}
      <div className="w-1/2" />

      {/* Central Dot with Pulse */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(59, 130, 246, 0.4)',
              '0 0 0 20px rgba(59, 130, 246, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Content Card */}
      <motion.div
        className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group">
          {/* Year Badge */}
          <span className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono mb-4">
            {data.years}
          </span>

          {/* Title & Company */}
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {data.title}
          </h3>
          <h4 className="text-lg text-purple-400 font-medium mb-4">
            @ {data.company}
          </h4>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed mb-6">
            {data.description}
          </p>

          {/* Highlights */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            {data.highlights.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;