import React, { useState } from 'react';
import { FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm dark:bg-black dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Branding */}
        <div className="font-bold tracking-tight text-gray-900 text-xl dark:text-white">
          SANTHOSH KUMAR S
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors dark:text-gray-300 dark:hover:text-white">HOME</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors dark:text-gray-300 dark:hover:text-white">ABOUT ME</a>
          <a href="#projects" className="text-gray-600 hover:text-gray-900 font-medium transition-colors dark:text-gray-300 dark:hover:text-white">PROJECTS</a>
          <a href="#certificates" className="text-gray-600 hover:text-gray-900 font-medium transition-colors dark:text-gray-300 dark:hover:text-white">CERTIFICATES</a>
        </div>

        {/* Social Icons and Menu */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
            <a href="mailto:santhoshkumar.btech1@gmail.com" className="hover:text-gray-700 transition-colors duration-300 dark:hover:text-gray-200">
              <SiGmail size={20} />
            </a>
            <a href="https://wa.me/9344705641" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors duration-300 dark:hover:text-gray-200">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://www.linkedin.com/in/santhosh-kumar-s-67465a239/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors duration-300 dark:hover:text-gray-200">
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-black text-gray-800 dark:text-white transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>

          {/* Hamburger/Menu Icon (for mobile) */}
          <div className="md:hidden">
            <button onClick={handleMenuToggle} aria-label="Open menu" className="p-2">
              {menuOpen ? <FaTimes className="text-2xl text-gray-700 dark:text-white" /> : <FaBars className="text-2xl text-gray-700 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleMenuToggle}>
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-lg flex flex-col items-center py-8 space-y-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <a href="#" onClick={handleLinkClick} className="text-gray-800 dark:text-white text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400">HOME</a>
            <a href="#about" onClick={handleLinkClick} className="text-gray-800 dark:text-white text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400">ABOUT ME</a>
            <a href="#projects" onClick={handleLinkClick} className="text-gray-800 dark:text-white text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400">PROJECTS</a>
            <a href="#certificates" onClick={handleLinkClick} className="text-gray-800 dark:text-white text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400">CERTIFICATES</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;