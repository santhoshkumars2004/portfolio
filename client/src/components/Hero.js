import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const roles = ["developer", "designer", "full stack web developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [roles.length]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white text-gray-800 relative overflow-hidden pt-16 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        {/* Main large horizontal text */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-4 whitespace-nowrap dark:text-white">
          EXPLORE MY PORTFOLIO
        </h1>

        {/* Cycling role text with transition */}
        <span className="text-xl md:text-2xl text-gray-700 font-semibold tracking-wide mb-12 transition-opacity duration-500 ease-in-out dark:text-gray-300">
          {roles[currentRoleIndex]}
        </span>

        {/* Profile image container and arrow button */}
        <div className="relative flex justify-center mb-12">
          <img
            src="/images/my-profile.jpg"
            alt="Profile"
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full grayscale border-4 border-white shadow-xl dark:border-gray-800"
          />
          {/* Arrow button - positioned below image */}
          <button className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
            <FaArrowRight className="text-xl text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Short bio/passion text - horizontally placed below image */}
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 dark:text-gray-300">
          I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD.
        </p>

        {/* Skills/Services text - Removed from Hero as it belongs to the About section in the new design */}
        {/* <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-semibold text-gray-800">
            <span>UI/UX</span>
            <span>WEB DESIGN</span>
            <span>LANDING PAGE</span>
            <span>UI DESIGN FIGMA</span>
            <span>EXPERT WEBFLOW</span>
        </div> */}

      </div>
    </section>
  );
};

export default Hero; 