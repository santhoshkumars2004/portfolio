import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Cinematic Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          variants={textVariants}
          className="text-center mb-16"
        >
          <motion.span
            className="text-blue-500 text-sm tracking-[0.3em] font-mono mb-4 block"
          >
            01. ABOUT ME
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            Who I{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Am
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: '100px' } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* Content Grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={textVariants}
            className="text-center"
          >
            {/* Quote Block */}
            <motion.blockquote
              className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed mb-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-5xl text-blue-500 font-serif">"</span>
              <br />
              I'm <span className="text-white font-medium">Santhosh Kumar</span> — a{' '}
              <span className="text-blue-400">Software Engineer Trainee</span> at{' '}
              <span className="text-purple-400 font-medium">Cisco Systems</span>.
              <br />
              <br />
              Focused on developing and delivering high-quality code that meets client
              requirements and established quality standards. With a strong foundation in
              <span className="text-blue-400"> Java, Python, and full-stack development</span>,
              I have hands-on experience in code delivery, application maintenance,
              SDLC practices, and cross-functional collaboration.
              <br />
              <span className="text-5xl text-purple-500 font-serif">"</span>
            </motion.blockquote>

            {/* Stats Row */}
            <motion.div
              variants={textVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: '100+', label: 'Test Cases Automated' },
                { number: '70%', label: 'Testing Time Reduced' },
                { number: '85%+', label: 'Code Coverage' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
    </section>
  );
};

export default About;