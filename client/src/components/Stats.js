import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { value: "80%", description: "Project Management" },
    { value: "92%", description: "Leadership" },
    { value: "80%", description: "Communication" }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-center hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm tracking-widest">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;