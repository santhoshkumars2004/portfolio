import React, { useState, useRef } from 'react';
import { FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = useRef([]);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  const handleMouseMove = (e, idx) => {
    const link = navLinksRef.current[idx];
    if (link) {
      const rect = link.getBoundingClientRect();
      setUnderlineStyle({ left: rect.left, width: rect.width });
    }
  };
  const handleMouseLeave = () => setUnderlineStyle({ left: 0, width: 0 });

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: -20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const navLinks = [
    { href: "#", text: "HOME" },
    { href: "#about", text: "ABOUT ME" },
    { href: "#projects", text: "PROJECTS" },
    { href: "#certificates", text: "CERTIFICATES" }
  ];

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-lg dark:bg-black/70 dark:border-gray-800 glass-card"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Enhanced Logo/Branding with Animated Gradient */}
        <motion.div 
          className="font-bold tracking-tight text-gray-900 text-xl dark:text-white animated-gradient-text"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          SANTHOSH KUMAR S
        </motion.div>
        {/* Enhanced Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 relative">
          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full pointer-events-none"
            animate={{ left: underlineStyle.left, width: underlineStyle.width }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ position: 'fixed', zIndex: 100, left: underlineStyle.left, width: underlineStyle.width }}
          />
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              ref={el => navLinksRef.current[index] = el}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-all duration-300 relative group"
              whileHover={{ y: -2, color: '#a21caf', textShadow: '0 0 16px #a21caf88' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {link.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>
        {/* Enhanced Social Icons and Menu */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Social Icons */}
          <motion.a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 magnetic hover-glow"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="text-xl" />
          </motion.a>
          <motion.a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-300 magnetic hover-glow"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp className="text-xl" />
          </motion.a>
          <motion.a
            href="mailto:your-email@gmail.com"
            className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-all duration-300 magnetic hover-glow"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <SiGmail className="text-xl" />
          </motion.a>
          {/* Enhanced Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 magnetic hover-glow"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
          </motion.button>
          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={handleMenuToggle}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 magnetic hover-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="text-xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleMenuToggle}
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-16 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-xl flex flex-col items-center py-8 space-y-6"
              onClick={e => e.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-gray-800 dark:text-white text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
              {/* Mobile Social Icons */}
              <motion.div
                className="flex space-x-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 hover-glow"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="text-2xl" />
                </motion.a>
                <motion.a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-300 hover-glow"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaWhatsapp className="text-2xl" />
                </motion.a>
                <motion.a
                  href="mailto:your-email@gmail.com"
                  className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-all duration-300 hover-glow"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SiGmail className="text-2xl" />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;