import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const FloatingLines = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scaleReverse = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.9, 1.1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Large rotating ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{ rotate, scale }}
      >
        <div className="w-full h-full rounded-full border border-blue-500/10" />
      </motion.div>

      {/* Second ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: rotateReverse, scale: scaleReverse }}
      >
        <div className="w-full h-full rounded-full border border-purple-500/10" />
      </motion.div>

      {/* Static horizontal lines with opacity animation */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          style={{ top: `${20 + i * 15}%` }}
          animate={{
            x: [i % 2 === 0 ? -50 : 50, i % 2 === 0 ? 50 : -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <>
      <ScrollParticles />
      <FloatingLines />
    </>
  );
};

export default AnimatedBackground;