import React from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-gray-800 relative overflow-hidden dark:text-white">
      <div className="container mx-auto px-4 flex items-center justify-center">

        {/* Content area with heading and quote */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center"> 

          {/* About heading - visible on all devices */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 dark:text-white">ABOUT</h2>
          
          {/* Quote */}
          <div className="max-w-2xl">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed dark:text-gray-300">
              I'm Santhosh Kumar —  a final year student pursuing a B.Tech in Information Technology, passionate about exploring the realms of technology and design
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About; 