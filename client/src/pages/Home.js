import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-secondary font-mono text-lg bg-tertiary/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Hi, my name is
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="gradient-text">Santhosh Kumar</span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-textSecondary leading-tight"
            >
              I build things for the web.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-textSecondary text-lg max-w-2xl leading-relaxed"
            >
              I'm a final year student pursuing a B.Tech in Information Technology, passionate about exploring 
              the realms of technology and design. Currently, I'm focused on building accessible, 
              human-centered products and learning new technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-6"
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 text-textSecondary hover:text-secondary transition-all duration-300 hover:shadow-glow"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 text-textSecondary hover:text-secondary transition-all duration-300 hover:shadow-glow"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 text-textSecondary hover:text-secondary transition-all duration-300 hover:shadow-glow"
              >
                <FaTwitter size={24} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-8"
            >
              <a
                href="#about"
                className="btn btn-outline group flex items-center space-x-2"
              >
                <span>Learn More</span>
                <HiArrowDown className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-secondary/50 shadow-glow animate-float">
                <img
                  src="/images/profile.jpg"
                  alt="Santhosh Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-secondary/30 rounded-full bg-tertiary/50 backdrop-blur-sm animate-pulse-slow" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-accent/30 rounded-full bg-tertiary/50 backdrop-blur-sm animate-pulse-slow" />
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 border-2 border-secondary/30 rounded-full animate-pulse-slow" />
              <div className="absolute bottom-1/4 -right-4 w-6 h-6 border-2 border-accent/30 rounded-full animate-pulse-slow" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 