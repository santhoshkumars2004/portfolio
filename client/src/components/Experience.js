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
    <section id="experience" className="py-20 bg-gray-100 text-gray-800 dark:bg-black dark:text-white"> {/* Section container with padding, background, and text colors, including dark mode */}
      <div className="container mx-auto px-4 text-center"> {/* Container for content, centered text */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 dark:text-white">Experience</h2> {/* Section title, bold, with margin bottom, dark mode text color */}

        <div className="space-y-12"> {/* Space between experience entries */}
          {experiences.map((experience, index) => (
            <div key={index} className="text-left bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-black dark:border-gray-800"> {/* Card-like container for each experience, text aligned left, padding, rounded corners, shadow, border, dark mode styles */}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{experience.title}</h3> {/* Job title, bold, dark mode text color */}
              <p className="text-lg text-gray-700 dark:text-gray-300">{experience.company} | {experience.years}</p> {/* Company and years, dark mode text color */}
              <p className="mt-4 text-gray-600 dark:text-gray-400">{experience.description}</p> {/* Description, margin top, dark mode text color */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 