import React from 'react';
import { FaHtml5, FaCss3Alt, FaNodeJs, FaJava, FaPython, FaGithub, FaFigma } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoReact } from 'react-icons/io5'; // Using io5 for newer icons
import { DiVisualstudio, DiSqllite } from 'react-icons/di'; // Using di for devicons
import { SiExpress } from 'react-icons/si'; // Using si for simple-icons

const Skills = () => {
  const skillCategories = [
    {
      category: 'Front-End',
      icon: <span>&lt;/&gt;</span>, // Placeholder, could use a specific icon if available
      skills: [
        { name: 'HTML', icon: <FaHtml5 size={30} className="text-orange-500" /> },
        { name: 'CSS', icon: <FaCss3Alt size={30} className="text-blue-500" /> },
        { name: 'JavaScript', icon: <IoLogoJavascript size={30} className="text-yellow-500" /> },
        { name: 'React Js', icon: <IoLogoReact size={30} className="text-blue-400" /> }, // Using React icon for React Native
      ],
    },
    {
      category: 'Back-End',
      icon: <i className="fas fa-server"></i>, // Placeholder, could use a specific icon if available
      skills: [
        { name: 'Node.js', icon: <FaNodeJs size={30} className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress size={30} className="text-gray-300 dark:text-gray-300" /> }, // Added dark mode text color
      ],
    },
    {
      category: 'Programming',
      icon: <i className="fas fa-code"></i>, // Placeholder
      skills: [
        { name: 'Java', icon: <FaJava size={30} className="text-red-500" /> },
        { name: 'Python', icon: <FaPython size={30} className="text-blue-700" /> },
      ],
    },
    {
      category: 'Tools & Others',
      icon: <i className="fas fa-tools"></i>, // Placeholder
      skills: [
        { name: 'VS Code', icon: <DiVisualstudio size={30} className="text-blue-600" /> },
        { name: 'GitHub', icon: <FaGithub size={30} className="text-gray-800 dark:text-white" /> }, // Added dark mode text color
        { name: 'Figma', icon: <FaFigma size={30} className="text-purple-600" /> },
        { name: 'SQLite', icon: <DiSqllite size={30} className="text-blue-500" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white text-gray-800 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 dark:text-white">Skills</h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 dark:bg-black dark:border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center justify-center dark:text-gray-200">
                <span className="ml-2">{category.category}</span>
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="flex items-center justify-center bg-white p-4 rounded-md shadow-sm border border-gray-200 dark:bg-black dark:border-gray-800 
                               transition-transform duration-300 hover:scale-105 cursor-pointer group"
                  >
                    {/* Wrapped icon in a div for rotation */}
                    <div className="transition-transform duration-300 group-hover:rotate-12"> {/* Added rotation classes */} 
                      {skill.icon}
                    </div>
                    <span className="ml-4 text-lg text-gray-800 dark:text-white">{skill.name}</span>
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