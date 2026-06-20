import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import HologramCard from '../components/HologramCard';

const PROJECTS = [
  {
    title: 'PSB Security Compliance',
    accent: '#00f5ff',
    points: [
      '12-phase agentic AI pipeline',
      '168,000+ file codebase analysed',
      'Consensus-voted LLM gap detection',
    ],
    stack: 'LangChain · RAG · ChromaDB · MCP · FastAPI',
  },
  {
    title: 'StackSense',
    accent: '#9b59b6',
    points: [
      'AI-powered codebase Q&A system',
      'Semantic search over repositories',
      'Fast, grounded answers with citations',
    ],
    stack: 'Groq API · HuggingFace · ChromaDB · Next.js',
    github: 'https://github.com/santhoshkumars2004',
  },
  {
    title: 'CUSP Testing Framework',
    accent: '#2d6cff',
    points: [
      'End-to-end UI automation at scale',
      '200+ automated tests · 95% coverage',
      'Wired into Jenkins CI',
    ],
    stack: 'Playwright · TypeScript · Jenkins',
  },
];

const Zone3_Projects = () => (
  <section className="xp-zone" style={{ height: '100vh' }}>
    <motion.p
      className="xp-kicker"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Zone 03 // Missions
    </motion.p>

    <motion.h2
      className="xp-heading xp-neon-cyan"
      style={{ fontSize: 'clamp(2rem, 6vw, 3.6rem)', fontWeight: 700, marginBottom: '1.4rem' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Mission Log
    </motion.h2>

    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        maxWidth: 1000,
      }}
    >
      {PROJECTS.map((p, i) => (
        <HologramCard key={p.title} accent={p.accent} delay={i * 0.12}>
          <h3
            className="xp-heading"
            style={{ color: p.accent, fontSize: '1.1rem', marginBottom: '0.7rem', letterSpacing: '0.05em' }}
          >
            {p.title}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '0.9rem' }}>
            {p.points.map((pt) => (
              <li
                key={pt}
                style={{
                  color: '#cfe9ff',
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                  paddingLeft: '1rem',
                  position: 'relative',
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: p.accent }}>▸</span>
                {pt}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.04em', color: '#8fb8d6', marginBottom: p.github ? '0.9rem' : 0 }}>
            {p.stack}
          </p>
          {p.github && (
            <a className="xp-btn" href={p.github} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View on GitHub
            </a>
          )}
        </HologramCard>
      ))}
    </div>
  </section>
);

export default Zone3_Projects;
