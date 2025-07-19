import React from 'react';
// import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Reverted imports

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8 dark:bg-black dark:text-gray-300">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-2 sm:space-y-0">
        <p className="text-center sm:text-left">© 2025 PORTFOLIO. ALL RIGHTS RESERVED.</p>
        <p className="text-center sm:text-right">DESIGNED BY SANTHOSH KUMAR</p>
      </div>
    </footer>
  );
};

export default Footer; 