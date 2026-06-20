import React from 'react';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../store/gameStore';

/**
 * SpeechBubble — an in-canvas dialog bubble anchored above an NPC's head.
 * Shows when the global dialog id matches this bubble's id. Press E to dismiss.
 */
export default function SpeechBubble({ id, anchor = [0, 2.9, 0] }) {
  const dialog = useGame((s) => s.dialog);
  const visible = !!dialog && dialog.id === id;

  return (
    <Html position={anchor} center distanceFactor={9} zIndexRange={[20, 0]} pointerEvents="none">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="wl-bubble"
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            {dialog.speaker && <div className="wl-bubble__name">{dialog.speaker}</div>}
            {dialog.lines.map((line, i) => (
              <p key={i} className="wl-bubble__line">
                {line}
              </p>
            ))}
            <div className="wl-bubble__cont">press E ▸</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}
