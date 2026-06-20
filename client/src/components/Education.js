import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-24 bg-[#0B1020] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block">
            05. EDUCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Academic{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Foundation
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#121A2B]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-[#22314f] hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">🎓</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">B.E. Information Technology</h3>
            <p className="text-blue-400 font-medium mb-3 sm:mb-4 text-sm sm:text-base">PSNA College of Engineering and Technology</p>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">2021 - 2025</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#22314f] bg-[#0E1628]/80 p-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider">CGPA</p>
                <p className="text-blue-400 font-semibold mt-1">8.1 / 10</p>
              </div>
              <div className="rounded-lg border border-[#22314f] bg-[#0E1628]/80 p-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Location</p>
                <p className="text-gray-300 mt-1">Dindigul, Tamil Nadu</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-5 leading-relaxed">
              Strong foundation in software engineering, databases, and problem-solving built through academic projects and practical implementation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;