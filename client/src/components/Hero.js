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
    <section id="home" className="min-h-[80vh] sm:min-h-screen flex items-center justify-center text-gray-800 relative overflow-hidden pt-16 dark:text-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center py-8 sm:py-12">
        {/* Main large horizontal text */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-2 sm:mb-4 whitespace-normal sm:whitespace-nowrap dark:text-white px-2">
          EXPLORE MY PORTFOLIO
        </h1>

        {/* Cycling role text with transition */}
        <span className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold tracking-wide mb-6 sm:mb-8 md:mb-12 transition-opacity duration-500 ease-in-out dark:text-gray-300">
          {roles[currentRoleIndex]}
        </span>

        {/* Profile image container and arrow button */}
        <div className="relative flex justify-center mb-6 sm:mb-8 md:mb-12">
          <img
            src="/images/my-profile.jpg"
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-full grayscale border-4 border-white shadow-xl dark:border-gray-800"
          />
          {/* Arrow button - positioned below image */}
          <button className="absolute bottom-[-16px] sm:bottom-[-20px] md:bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
            <FaArrowRight className="text-sm sm:text-lg md:text-xl text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Short bio/passion text - horizontally placed below image */}
        <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 dark:text-gray-300 px-4">
          I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD.
        </p>

      </div>
    </section>
  );
};

export default Hero; 