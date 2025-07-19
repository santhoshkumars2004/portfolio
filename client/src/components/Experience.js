import React from 'react';

const Experience = () => {
  // Example data structure for experiences - replace with your actual details
  const experiences = [
    {
      title: 'JAVA DEVELOPMENT',
      company: 'OCTANET',
      years: 'July 2024 - Aug 2024',
      description: 'Focused on best practices in Java programming, enhancing applications with object-oriented principles, exception handling, and optimized data structures.Utilized Java frameworks and libraries to streamline automation processes, ensuring high code quality, scalability, and reliability.',
    },
    // Add more experience objects here
    {
      title: 'ARTIFICIAL INTELLIGENCE',
      company: 'RINEX',
      years: 'Sep 2022 - Nov 2022',
      description: 'Gained hands-on experience in developing and implementing machine learning models, including supervised, unsupervised, and reinforcement learning techniques.',
    },
  ];

  return (
    <section id="experience" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 dark:text-white">Experience</h2>

        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <div key={index} className="text-left bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{experience.title}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{experience.company} | {experience.years}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 