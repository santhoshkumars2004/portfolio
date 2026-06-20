import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0B1020]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(34,211,238,0.12) 0%, transparent 45%)',
        }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-14">
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block">01. ABOUT ME</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Engineer With A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Delivery Mindset</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.article
            variants={itemVariants}
            className="lg:col-span-7 rounded-2xl border border-[#22314f] bg-[#121A2B]/85 p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-blue-300 mb-5">Current Narrative</p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Software Engineer in the Cisco Graduate Program focused on automation and AI-assisted engineering.
              I build systems that reduce manual effort, improve confidence in releases, and create measurable outcomes.
            </p>

            <p className="text-gray-300 mt-5 leading-relaxed">
              My work combines Python automation, LLM orchestration, and RAG workflows with practical delivery through
              GPT, LangChain, GitHub Copilot, and MCP-integrated pipelines.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Python Automation', 'LLM Orchestration', 'RAG Workflows', 'MCP Integrations'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-blue-500/30 text-blue-200 bg-blue-500/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.aside
            variants={itemVariants}
            className="lg:col-span-5 rounded-2xl border border-[#22314f] bg-[#121A2B]/75 p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-5">What I Bring</p>
            <ul className="space-y-3">
              {[
                'Turn ambiguous problems into executable engineering plans.',
                'Build production pipelines with reliability and speed in mind.',
                'Collaborate across QA, platform, and product teams.',
                'Focus on impact metrics, not just implementation output.',
              ].map((point) => (
                <li key={point} className="text-gray-300 text-sm leading-relaxed flex gap-3">
                  <span className="text-cyan-300 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-[#29426c] bg-[#0F1A30] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Target Roles</p>
              <p className="text-sm text-gray-200 mt-2">AI Engineer, Software Engineer, Full Stack Engineer</p>
            </div>
          </motion.aside>
        </div>

        <motion.div variants={itemVariants} className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {[
            { number: '2 Years to < 2 Hours', label: 'Compliance Cycle Time' },
            { number: '70%', label: 'Noise Removed Before LLM' },
            { number: '3 MCP Servers', label: 'Integrated in Production' },
          ].map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl border border-[#22314f] bg-[#121A2B]/75 p-5">
              <div className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
