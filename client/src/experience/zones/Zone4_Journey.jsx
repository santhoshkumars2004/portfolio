import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import HologramCard from '../components/HologramCard';

const Zone4_Journey = () => (
  <section className="xp-zone xp-zone--right" style={{ height: '100vh' }}>
    <motion.p
      className="xp-kicker"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      Zone 04 // The Academy
    </motion.p>

    <motion.h2
      className="xp-heading xp-neon-cyan"
      style={{ fontSize: 'clamp(2rem, 6vw, 3.6rem)', fontWeight: 700, marginBottom: '1.2rem' }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      The Journey
    </motion.h2>

    <div style={{ display: 'grid', gap: '1rem', maxWidth: 460 }}>
      <HologramCard accent="#00f5ff">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
          <FaGraduationCap style={{ color: '#00f5ff' }} />
          <h3 className="xp-heading" style={{ color: '#fff', fontSize: '1rem' }}>Education</h3>
        </div>
        <p style={{ color: '#cfe9ff', fontSize: '0.9rem', lineHeight: 1.5 }}>
          B.E. Information Technology — PSNA College of Engineering & Technology
        </p>
        <p style={{ color: '#8fb8d6', fontSize: '0.8rem', marginTop: '0.3rem' }}>
          CGPA 8.1 · Class of 2025
        </p>
      </HologramCard>

      <HologramCard accent="#2d6cff" delay={0.12}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
          <FaBriefcase style={{ color: '#2d6cff' }} />
          <h3 className="xp-heading" style={{ color: '#fff', fontSize: '1rem' }}>Experience</h3>
        </div>
        <p style={{ color: '#cfe9ff', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Software Engineer, Graduate Program — Cisco Systems, Bangalore
        </p>
        <p style={{ color: '#8fb8d6', fontSize: '0.8rem', marginTop: '0.3rem' }}>
          Agentic AI pipelines · Security compliance automation
        </p>
      </HologramCard>
    </div>
  </section>
);

export default Zone4_Journey;
