import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-blue-600 dark:text-blue-400 font-mono text-sm sm:text-lg bg-blue-100 dark:bg-blue-900/50 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm">
                Hi, my name is
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
            >
              <span className="gradient-text">Santhosh Kumar</span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-700 dark:text-gray-300 leading-tight"
            >
              I build things for the web.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              I'm a final year student pursuing a B.Tech in Information Technology, passionate about exploring 
              the realms of technology and design. Currently, I'm focused on building accessible, 
              human-centered products and learning new technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4 sm:space-x-6"
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
              >
                <FaGithub size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
              >
                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
              >
                <FaTwitter size={20} className="sm:w-6 sm:h-6" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4 sm:pt-8"
            >
              <a
                href="#about"
                className="btn btn-outline group flex items-center space-x-2 text-sm sm:text-base"
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
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              <div className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-600/50 shadow-lg animate-float">
                <img
                  src="/images/profile.jpg"
                  alt="Santhosh Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 border-4 border-blue-600/30 rounded-full bg-blue-100/50 dark:bg-blue-900/50 backdrop-blur-sm animate-pulse-slow" />
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 border-4 border-purple-600/30 rounded-full bg-purple-100/50 dark:bg-purple-900/50 backdrop-blur-sm animate-pulse-slow" />
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-600/30 rounded-full animate-pulse-slow" />
              <div className="absolute bottom-1/4 -right-2 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 border-2 border-purple-600/30 rounded-full animate-pulse-slow" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 