import React from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

/**
 * InteractHint — the floating "[E] Interact" tooltip that hovers above an
 * object when the player is close enough.
 */
export default function InteractHint({ position = [0, 2.4, 0], label = 'Interact' }) {
  return (
    <Html position={position} center distanceFactor={9} zIndexRange={[18, 0]} pointerEvents="none">
      <motion.div
        className="wl-hint"
        initial={{ opacity: 0, y: 8, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <span className="wl-hint__key">E</span>
        <span className="wl-hint__label">{label}</span>
      </motion.div>
    </Html>
  );
}
