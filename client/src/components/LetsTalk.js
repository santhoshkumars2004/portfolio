import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const LetsTalk = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.9,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-16 md:py-20 bg-[#0B1020] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.14),transparent_40%)]" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-6xl mx-auto rounded-3xl border border-[#24406f] bg-[#121A2B]/90 p-6 md:p-10 shadow-[0_20px_80px_rgba(13,24,42,0.55)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-4">Open For Roles</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Let Us Build The Next
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> High-Impact Product</span>
              </h2>
              <p className="text-gray-300 mt-5 max-w-2xl leading-relaxed">
                I am open to AI and software engineering opportunities where strong execution, fast learning, and practical outcomes matter.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <span className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200">AI Engineer</span>
                <span className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200">Software Engineer</span>
                <span className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200">Full Stack Engineer</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2a4f89] bg-[#0F1A30] p-5 md:p-6">
                <p className="text-sm text-gray-300 mb-5">Quick Actions</p>
                <div className="space-y-3">
                  <a
                    href="https://linkedin.com/in/santhosh-kumar-s-67465a239/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-95 transition-opacity"
                  >
                    Connect On LinkedIn
                  </a>
                  <a
                    href="#contact"
                    className="block w-full text-center px-5 py-3 rounded-xl border border-blue-500/40 text-blue-200 hover:bg-blue-500/10 transition-colors"
                  >
                    Send A Message
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-[#2a3f61] grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-[#121F38] px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">Based In</p>
                    <p className="text-sm text-gray-100 mt-1">Madurai, India</p>
                  </div>
                  <div className="rounded-lg bg-[#121F38] px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">Availability</p>
                    <p className="text-sm text-gray-100 mt-1">Open To Interview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LetsTalk;
