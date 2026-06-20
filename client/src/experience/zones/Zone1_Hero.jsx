import React from 'react';
import { motion } from 'framer-motion';

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Zone1_Hero = () => (
  <section className="xp-zone xp-zone--center" style={{ height: '100vh' }}>
    <motion.p className="xp-kicker" variants={fade} initial="hidden" whileInView="show" custom={0}>
      Zone 01 // Origin
    </motion.p>

    <motion.h1
      className="xp-heading xp-gradient-text"
      style={{ fontSize: 'clamp(2.6rem, 9vw, 6.5rem)', fontWeight: 900, margin: '0.2rem 0' }}
      variants={fade}
      initial="hidden"
      whileInView="show"
      custom={1}
    >
      SANTHOSH KUMAR
    </motion.h1>

    <motion.p
      className="xp-sub xp-neon-cyan"
      style={{ fontSize: 'clamp(0.8rem, 2.4vw, 1.15rem)' }}
      variants={fade}
      initial="hidden"
      whileInView="show"
      custom={2}
    >
      AI Engineer · LLM Backend Developer · Agentic AI
    </motion.p>

    <motion.p
      style={{
        marginTop: '1.4rem',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(1rem, 3vw, 1.6rem)',
        color: '#cfe9ff',
      }}
      variants={fade}
      initial="hidden"
      whileInView="show"
      custom={3}
    >
      “Building systems that think.”
    </motion.p>

    <motion.p
      style={{ marginTop: '2rem', fontSize: '0.8rem', letterSpacing: '0.3em', color: 'rgba(0,245,255,0.7)' }}
      variants={fade}
      initial="hidden"
      whileInView="show"
      custom={4}
    >
      SCROLL TO RUN THROUGH THE CITY ↓
    </motion.p>
  </section>
);

export default Zone1_Hero;
