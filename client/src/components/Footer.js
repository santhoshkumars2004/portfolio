import React from 'react';
// import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Reverted imports

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 dark:bg-black dark:text-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 PORTFOLIO. ALL RIGHTS RESERVED.</p>
        {/* Removed Social Media Icons */}
        <p>DESIGNED BY SANTHOSH KUMAR</p>
      </div>
    </footer>
  );
};

export default Footer; 