import React from 'react';
import { FaHtml5, FaCss3Alt, FaNodeJs, FaJava, FaPython, FaGithub, FaFigma } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoReact } from 'react-icons/io5';
import { DiVisualstudio, DiSqllite } from 'react-icons/di';
import { SiExpress } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Front-End',
      icon: <span>&lt;/&gt;</span>,
      skills: [
        { name: 'HTML', icon: <FaHtml5 size={30} className="text-orange-500" /> },
        { name: 'CSS', icon: <FaCss3Alt size={30} className="text-blue-500" /> },
        { name: 'JavaScript', icon: <IoLogoJavascript size={30} className="text-yellow-500" /> },
        { name: 'React Js', icon: <IoLogoReact size={30} className="text-blue-400" /> },
      ],
    },
    {
      category: 'Back-End',
      icon: <i className="fas fa-server"></i>,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs size={30} className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress size={30} className="text-gray-300 dark:text-gray-300" /> },
      ],
    },
    {
      category: 'Programming',
      icon: <i className="fas fa-code"></i>,
      skills: [
        { name: 'Java', icon: <FaJava size={30} className="text-red-500" /> },
        { name: 'Python', icon: <FaPython size={30} className="text-blue-700" /> },
      ],
    },
    {
      category: 'Tools & Others',
      icon: <i className="fas fa-tools"></i>,
      skills: [
        { name: 'VS Code', icon: <DiVisualstudio size={30} className="text-blue-600" /> },
        { name: 'GitHub', icon: <FaGithub size={30} className="text-gray-800 dark:text-white" /> },
        { name: 'Figma', icon: <FaFigma size={30} className="text-purple-600" /> },
        { name: 'SQLite', icon: <DiSqllite size={30} className="text-blue-500" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-gray-800 dark:text-white">Skills</h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-700 flex items-center justify-center dark:text-gray-200">
                <span className="ml-2">{category.category}</span>
              </h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="flex items-center justify-center bg-white/60 dark:bg-black p-2 sm:p-3 md:p-4 rounded-md shadow-sm border border-gray-200/50 dark:border-gray-800 
                               transition-transform duration-300 hover:scale-105 cursor-pointer group"
                  >
                    {/* Wrapped icon in a div for rotation */}
                    <div className="transition-transform duration-300 group-hover:rotate-12">
                      {skill.icon}
                    </div>
                    <span className="ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base md:text-lg text-gray-800 dark:text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 