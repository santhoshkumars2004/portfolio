import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block">
            04. EDUCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Academic{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Journey
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* College Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="text-5xl mb-6">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">College Education</h3>
            <p className="text-blue-400 font-medium mb-4">B.Tech - Information Technology</p>
            <p className="text-gray-400 text-sm mb-1">
              Psna College of Engineering and Technology
            </p>
            <p className="text-gray-500 text-sm mb-4">2021 - 2025 • Dindigul, Tamilnadu</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">CGPA:</span>
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 font-bold">8.1</span>
            </div>
          </motion.div>

          {/* School Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="text-5xl mb-6">🏫</div>
            <h3 className="text-xl font-bold text-white mb-2">School Education</h3>
            <p className="text-purple-400 font-medium mb-4">Computer Science</p>
            <p className="text-gray-400 text-sm mb-1">
              Mahatma Montessori Higher Secondary School
            </p>
            <p className="text-gray-500 text-sm mb-4">2020 - 2021 • Madurai, Tamilnadu</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Percentage:</span>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 font-bold">88.1%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;