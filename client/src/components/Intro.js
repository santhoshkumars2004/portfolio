import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro = ({ onComplete }) => {
    const [stage, setStage] = useState(0);
    const [progress, setProgress] = useState(0);

    // Generate stars for background
    const stars = useMemo(() => {
        return Array.from({ length: 100 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
    }, []);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Stage transitions
        const timer1 = setTimeout(() => setStage(1), 500);
        const timer2 = setTimeout(() => setStage(2), 2000);
        const timer3 = setTimeout(() => setStage(3), 4000);
        const timer4 = setTimeout(() => setStage(4), 5500);
        const timer5 = setTimeout(() => onComplete(), 6500);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, [onComplete]);

    const letterVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    const name = "SANTHOSH KUMAR";

    return (
        <AnimatePresence>
            {stage < 4 && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#0B1020] flex flex-col items-center justify-center overflow-hidden"
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Floating Stars Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        {stars.map((star) => (
                            <motion.div
                                key={star.id}
                                className="absolute rounded-full bg-white"
                                style={{
                                    left: `${star.left}%`,
                                    top: `${star.top}%`,
                                    width: star.size,
                                    height: star.size,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: star.duration,
                                    delay: star.delay,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Radial Glow Background */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                        }}
                    />

                    {/* Stage 1: Welcome */}
                    <AnimatePresence mode="wait">
                        {stage === 1 && (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center"
                            >
                                <h1 className="text-4xl md:text-6xl font-light text-white tracking-[0.3em] uppercase">
                                    Welcome
                                </h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 0.5, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-gray-500 mt-4 tracking-widest text-sm"
                                >
                                    TO MY UNIVERSE
                                </motion.p>
                            </motion.div>
                        )}

                        {/* Stage 2: Name Reveal */}
                        {stage === 2 && (
                            <motion.div
                                key="name"
                                className="text-center perspective-1000"
                            >
                                <div className="overflow-hidden">
                                    <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 tracking-wider">
                                        {name.split('').map((letter, i) => (
                                            <motion.span
                                                key={i}
                                                custom={i}
                                                variants={letterVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="inline-block"
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {letter === ' ' ? '\u00A0' : letter}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-6 mx-auto max-w-md"
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="text-gray-400 mt-6 tracking-[0.2em] text-lg font-light"
                                >
                                    SOFTWARE ENGINEER
                                </motion.p>
                            </motion.div>
                        )}

                        {/* Stage 3: Loading */}
                        {stage === 3 && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-center"
                            >
                                <motion.p
                                    className="text-gray-400 tracking-[0.3em] text-sm mb-8 font-mono"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    INITIALIZING EXPERIENCE
                                </motion.p>

                                {/* Progress Bar */}
                                <div className="w-64 md:w-96 h-[2px] bg-[#1B2842] rounded-full overflow-hidden mx-auto">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>

                                <motion.p
                                    className="text-gray-600 mt-4 font-mono text-xs"
                                >
                                    {progress}%
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vignette Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.8) 100%)',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
