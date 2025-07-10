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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-8">About Me</h1>
          
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-textSecondary text-lg leading-relaxed">
              I am a passionate full-stack developer with a strong foundation in web technologies.
              As a final year B.Tech student in Information Technology, I'm constantly exploring
              new technologies and design patterns to create better user experiences.
            </p>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-textPrimary mb-6 flex items-center">
              <FaGraduationCap className="mr-2 text-secondary" />
              Education
            </h2>
            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-textPrimary">Bachelor of Technology</h3>
              <p className="text-secondary">Information Technology</p>
              <p className="text-textSecondary">2020 - 2024</p>
              <p className="text-textSecondary mt-2">
                Currently in final year, focusing on web development and software engineering.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-textPrimary mb-6 flex items-center">
              <FaCode className="mr-2 text-secondary" />
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-tertiary p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-textPrimary">{skill.name}</span>
                    <span className="text-secondary">{skill.level}</span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-6 flex items-center">
              <FaLaptopCode className="mr-2 text-secondary" />
              Experience
            </h2>
            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-textPrimary">Web Development Intern</h3>
              <p className="text-secondary">Company Name</p>
              <p className="text-textSecondary">Duration: [Your Internship Period]</p>
              <ul className="list-disc list-inside text-textSecondary mt-2">
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