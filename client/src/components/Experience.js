import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const impactBlocks = [
    {
      title: 'CUSP Application Testing',
      bullets: [
        'Scaled the automated suite from 100 to 200+ tests using Playwright and TypeScript.',
        'Raised coverage to 95% across critical user flows.',
        'Ran headed-mode validations to catch UI and backend mismatches before CI execution.'
      ]
    },
    {
      title: 'PSB Security Compliance Pipeline',
      bullets: [
        'Built an AI compliance pipeline that scanned a 168,000-file codebase and auto-generated JIRA tickets.',
        'Reduced a manual 2-year review cycle to under 2 hours.',
        'Designed a 12-phase workflow where only 4 phases invoke LLMs, after filtering 70% irrelevant files.',
        'Improved reliability with consensus scoring across 3 parallel LLM calls and 5-run history checks.',
        'Integrated 3 MCP servers (JIRA, GitHub Copilot, OpenAI Codex) to automate triage and produce developer-ready outputs.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0B1020]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#121A2B]/50 via-[#0B1020] to-[#0B1020]" />

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
            Recent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Impact
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: '100px' } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[#22314f] bg-[#121A2B]/80 p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-2xl font-bold text-white">Software Engineer</h3>
              <span className="text-blue-400 text-sm font-mono">Oct 2025 - Present</span>
            </div>
            <p className="text-cyan-300 mb-3">Cisco Systems (Graduate Program)</p>
            <p className="text-gray-300 leading-relaxed">
              Building high-confidence test automation and AI-assisted compliance systems with measurable business outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {impactBlocks.map((block, idx) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="rounded-2xl border border-[#22314f] bg-[#121A2B]/70 p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-4">{block.title}</h4>
                <ul className="space-y-3">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="text-gray-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;