import React from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const About = () => {
  // Removed skills array as it's moved to a separate Skills component
  // const skills = [
  //   "UI/UX",
  //   "WEB DESIGN",
  //   "LANDING PAGE",
  //   "UI DESIGN FIGMA",
  //   "MOBILE APP DESIGN"
  // ];

  return (
    <section id="about" className="py-20 bg-white text-gray-800 relative overflow-hidden dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 flex items-center justify-center">

        {/* Vertical ABOUT text on the left */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-10">
           <span className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight rotate-[-90deg] origin-center whitespace-nowrap dark:text-white">ABOUT</span>
        </div>

        {/* Content area (Quote only) - positioned to the right of vertical text */}
        {/* Removed Skills list from here as it's moved to a separate Skills component */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 pl-24"> 

          {/* Quote */}
          <div className="flex-1 max-w-md text-center md:text-left">
            <p className="text-gray-700 text-lg italic leading-relaxed dark:text-gray-300">
              I'm Santhosh Kumar —  a final year student pursuing a B.Tech in Information Technology, passionate about exploring the realms of technology and design
            </p>
          </div>

          {/* Removed Skills list div */}
          {/* <div className="flex-1 flex justify-center md:justify-start">
            <div className="flex flex-col gap-2 text-sm font-semibold text-gray-800">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </div> */}

        </div>




        {/* Removed old About Me content and skills grid */}
        {/* <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            I'm a passionate full-stack developer with 5+ years of experience in building
            web applications. I love solving complex problems and creating elegant solutions.
            My expertise spans across various technologies, allowing me to craft robust and
            user-friendly experiences from concept to deployment.
          </p>
        </div> */}

        {/* Removed old skills grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 border border-gray-300 rounded-lg"
            >
              <div className="mb-4 flex justify-center">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default About; 