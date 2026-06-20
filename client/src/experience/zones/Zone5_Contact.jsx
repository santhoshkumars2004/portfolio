import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import HologramCard from '../components/HologramCard';

const LINKS = [
  { label: 'Email', icon: FaEnvelope, href: 'mailto:santhoshkumar.btech1@gmail.com', solid: true },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/santhoshkumars2004' },
  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/santhosh-kumar-s-67465a239/' },
  { label: 'Resume', icon: FaFileDownload, href: '/resume.pdf', download: true },
];

const Zone5_Contact = () => (
  <section className="xp-zone xp-zone--center" style={{ height: '100vh' }}>
    <motion.p
      className="xp-kicker"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Zone 05 // Signal
    </motion.p>

    <motion.h2
      className="xp-heading xp-gradient-text"
      style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: 900, marginBottom: '0.6rem' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Let's Build Something
    </motion.h2>

    <motion.p
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#cfe9ff',
        fontSize: 'clamp(0.95rem, 2.6vw, 1.3rem)',
        marginBottom: '2rem',
        maxWidth: 560,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      Open to AI / LLM Backend roles. The signal's live — let's connect.
    </motion.p>

    <HologramCard accent="#ff4fd8">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
        {LINKS.map((l, i) => {
          const Icon = l.icon;
          return (
            <motion.a
              key={l.label}
              className={`xp-btn ${l.solid ? 'xp-btn--solid' : ''}`}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              download={l.download || undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon /> {l.label}
            </motion.a>
          );
        })}
      </div>
    </HologramCard>
  </section>
);

export default Zone5_Contact;
