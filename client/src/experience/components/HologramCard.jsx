import React from 'react';
import { motion } from 'framer-motion';

/**
 * HologramCard — reusable neon glass card with a scan-line sweep and corner
 * brackets. Reveals on scroll-into-view via framer-motion.
 */
const HologramCard = ({ children, className = '', delay = 0, accent, style, ...rest }) => {
  return (
    <motion.div
      className={`xp-card ${className}`}
      style={{ ...(accent ? { borderColor: `${accent}55` } : {}), ...style }}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      <span className="xp-card__corner xp-card__corner--tl" />
      <span className="xp-card__corner xp-card__corner--br" />
      {children}
    </motion.div>
  );
};

export default HologramCard;
