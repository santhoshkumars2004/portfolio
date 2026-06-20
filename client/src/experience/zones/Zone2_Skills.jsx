import React from 'react';
import { motion } from 'framer-motion';
import HologramCard from '../components/HologramCard';

const SKILLS = [
  'Python', 'LangChain', 'FastAPI', 'RAG', 'ChromaDB',
  'MCP Servers', 'Docker', 'Kubernetes', 'PostgreSQL', 'TypeScript',
  'LLM Orchestration', 'Groq API', 'HuggingFace', 'Playwright',
];

const Zone2_Skills = () => (
  <section className="xp-zone xp-zone--right" style={{ height: '100vh' }}>
    <motion.p
      className="xp-kicker"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      Zone 02 // The Dojo
    </motion.p>

    <motion.h2
      className="xp-heading xp-neon-purple"
      style={{ fontSize: 'clamp(2rem, 6vw, 3.6rem)', fontWeight: 700, marginBottom: '0.8rem' }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      Skill Arsenal
    </motion.h2>

    <HologramCard className="" accent="#9b59b6" style={{ maxWidth: 520 }}>
      <p style={{ color: '#cfe9ff', lineHeight: 1.6, marginBottom: '1rem' }}>
        I train in the art of production AI — LLM backends, retrieval pipelines, and
        agentic systems that ship. Each orb is a discipline mastered.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end' }}>
        {SKILLS.map((s, i) => (
          <motion.span
            key={s}
            className="xp-chip"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </HologramCard>
  </section>
);

export default Zone2_Skills;
