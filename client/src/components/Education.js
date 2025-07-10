import React from 'react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-white text-gray-800 dark:bg-black dark:text-white"> {/* Section container with padding, background, and text colors, including dark mode */}
      <div className="container mx-auto px-4 text-center"> {/* Container for content, centered text */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 dark:text-white">Education</h2> {/* Section title, bold, with margin bottom, dark mode text color */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> {/* Grid for two columns on medium screens and up, with gap */}
          {/* College Education */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 dark:bg-black dark:border-gray-800"> {/* Card-like container for college info, padding, rounded corners, shadow, border, dark mode styles */}
            {/* College Emoji */}
            <div className="mx-auto mb-4 w-32 h-32 flex items-center justify-center text-7xl">🎓</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">College Education</h3> {/* Sub-title for college, bold, margin bottom, dark mode text color */}
            <p className="text-lg text-gray-700 mb-2 dark:text-gray-300"> {/* Text for degree/field, margin bottom, dark mode text color */}
              B.Tech - Information Technology
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for University/Institution, dark mode text color */}
              Psna College of Engineering and Technology (2021 -2025)
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for Location, dark mode text color */}
              Dindigul, Tamilnadu
            </p>
            {/* College CGPA */}
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for CGPA, dark mode text color, added highlighting */}
              CGPA: <span className="font-bold text-gray-800 dark:text-white">8.1</span>
            </p>
          </div>

          {/* School Education */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 dark:bg-black dark:border-gray-800"> {/* Card-like container for school info, similar styles to college */}
            {/* School Emoji */}
            <div className="mx-auto mb-4 w-32 h-32 flex items-center justify-center text-7xl">🏫</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">School Education</h3> {/* Sub-title for school, bold, margin bottom, dark mode text color */}
            <p className="text-lg text-gray-700 mb-2 dark:text-gray-300"> {/* Text for Degree/Focus, margin bottom, dark mode text color */}
              Computer Science
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for School Name, dark mode text color */}
              Mahatma Mntessori Higher Secondary School (2020 - 2021)
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for Location, dark mode text color */}
              Madurai, Tamilnadu
            </p>
            {/* School Percentage */}
            <p className="text-md text-gray-600 dark:text-gray-400"> {/* Text for Percentage, dark mode text color, added highlighting */}
              Percentage: <span className="font-bold text-gray-800 dark:text-white">88.1%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 