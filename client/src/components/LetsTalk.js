import React from 'react';

const LetsTalk = () => {
  // Adjusted positions for scattered links based on visual estimation from the image
  const scatteredLinks = [
    { name: "REACT", top: '8%', left: '15%' },
    { name: "NODE", top: '12%', right: '18%' },
    { name: "WORDPRESS", top: '18%', right: '5%' },
    { name: "FRAMER", bottom: '25%', left: '10%' },
    // Add more links and adjust positions as needed
  ];

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-900 text-white min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Large "LET'S TALK" text with gradient */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-center tracking-tight leading-none mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 px-4"
          style={{ background: 'linear-gradient(to right, white 50%, gray 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        LET'S TALK
      </h2>

      {/* Scattered Smaller Links (Absolute Positioning) */}
      {/* Hidden on smaller screens to prevent overlap */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {scatteredLinks.map((link, index) => (
          <a
            key={index}
            href="#" // Replace with actual links
            className="absolute text-gray-400 hover:text-white transition-colors text-sm font-semibold pointer-events-auto uppercase"
            style={{ top: link.top, left: link.left, right: link.right, bottom: link.bottom }}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Prominent Buttons at the bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 w-full z-20">
         <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {/* Only LinkedIn and Contact Me buttons at the bottom */}
            <a href="#" className="px-3 sm:px-4 md:px-6 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors text-xs sm:text-sm uppercase">LINKEDIN</a>
            <a href="#contact" className="px-3 sm:px-4 md:px-6 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors text-xs sm:text-sm uppercase">CONTACT ME</a>
         </div>
      </div>
    </section>
  );
};

export default LetsTalk; 