import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const achievements = [
    { title: 'Rajasthan National Level Police Hackathon 2024', value: 'Finalist' },
    { title: 'AWS Cloud Practitioner', value: 'Amazon Web Services' },
    { title: 'Claude Code in Action', value: 'Anthropic' },
    { title: 'SQL with Relational Database', value: 'IBM' }
  ];

  return (
    <section className="py-16 bg-[#0B1020] text-white" id="achievements">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-3 block">06. ACHIEVEMENTS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Highlights{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Snapshot</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#121A2B]/80 border border-[#22314f] p-6 rounded-2xl text-center hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                {item.value}
              </h3>
              <p className="text-gray-400 text-sm tracking-wide">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;