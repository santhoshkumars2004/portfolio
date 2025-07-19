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
    <section id="home" className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center text-gray-800 relative overflow-hidden pt-12 sm:pt-16 dark:text-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center py-4 sm:py-8 md:py-12">
        {/* Main large horizontal text */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-2 sm:mb-4 whitespace-normal sm:whitespace-nowrap dark:text-white px-2">
          EXPLORE MY PORTFOLIO
        </h1>

        {/* Cycling role text with transition */}
        <span className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold tracking-wide mb-4 sm:mb-6 md:mb-8 lg:mb-12 transition-opacity duration-500 ease-in-out dark:text-gray-300">
          {roles[currentRoleIndex]}
        </span>

        {/* Profile image container and arrow button */}
        <div className="relative flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <img
            src="/images/my-profile.jpg"
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 object-cover rounded-full grayscale border-4 border-white shadow-xl dark:border-gray-800"
          />
          {/* Arrow button - positioned below image */}
          <button className="absolute bottom-[-12px] sm:bottom-[-16px] md:bottom-[-20px] lg:bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
            <FaArrowRight className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Short bio/passion text - horizontally placed below image */}
        <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-2 sm:mb-4 md:mb-6 lg:mb-8 dark:text-gray-300 px-4">
          I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD.
        </p>

      </div>
    </section>
  );
};

export default Hero; 