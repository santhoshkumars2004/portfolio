import React from 'react';

const Footer = () => (
  <footer className="w-full py-6 bg-white/70 dark:bg-black/70 glass-card shadow-lg flex items-center justify-center relative z-50" style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }}>
    <span className="animated-gradient-text font-bold text-lg tracking-wide drop-shadow-lg">
      © {new Date().getFullYear()} Santhosh Kumar S. All Rights Reserved.
    </span>
    {/* Floating effect */}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-2 w-3 h-3 bg-blue-400/30 rounded-full blur-md animate-float" />
  </footer>
);

export default Footer; 