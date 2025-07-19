import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  const skills = [
    { name: 'React.js', level: '90%' },
    { name: 'Node.js', level: '85%' },
    { name: 'JavaScript', level: '90%' },
    { name: 'HTML/CSS', level: '95%' },
    { name: 'MongoDB', level: '80%' },
    { name: 'Express.js', level: '85%' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h1>
          
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              I am a passionate full-stack developer with a strong foundation in web technologies.
              As a final year B.Tech student in Information Technology, I'm constantly exploring
              new technologies and design patterns to create better user experiences.
            </p>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaGraduationCap className="mr-2 text-blue-600 dark:text-blue-400" />
              Education
            </h2>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-gray-200/50 dark:bg-black dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Technology</h3>
              <p className="text-blue-600 dark:text-blue-400">Information Technology</p>
              <p className="text-gray-600 dark:text-gray-300">2020 - 2024</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Currently in final year, focusing on web development and software engineering.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaCode className="mr-2 text-blue-600 dark:text-blue-400" />
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50 dark:bg-black dark:border-gray-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-900 dark:text-white">{skill.name}</span>
                    <span className="text-blue-600 dark:text-blue-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaLaptopCode className="mr-2 text-blue-600 dark:text-blue-400" />
              Experience
            </h2>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-gray-200/50 dark:bg-black dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Web Development Intern</h3>
              <p className="text-blue-600 dark:text-blue-400">Company Name</p>
              <p className="text-gray-600 dark:text-gray-300">Duration: [Your Internship Period]</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                <li>Developed and maintained web applications using React.js and Node.js</li>
                <li>Collaborated with team members to implement new features</li>
                <li>Participated in code reviews and improved code quality</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 