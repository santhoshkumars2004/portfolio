import React from 'react';

const Education = () => {
  return (
    <section id="education" className="py-8 sm:py-12 md:py-16 lg:py-20 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 dark:text-white">Education</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* College Education */}
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800">
            {/* College Emoji */}
            <div className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl">🎓</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white">College Education</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2 dark:text-gray-300">
              B.Tech - Information Technology
            </p>
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400 mb-1">
              Psna College of Engineering and Technology (2021 -2025)
            </p>
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400 mb-2">
              Dindigul, Tamilnadu
            </p>
            {/* College CGPA */}
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400">
              CGPA: <span className="font-bold text-gray-800 dark:text-white">8.1</span>
            </p>
          </div>

          {/* School Education */}
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-gray-200/50 dark:bg-black dark:border-gray-800">
            {/* School Emoji */}
            <div className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl">🏫</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white">School Education</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2 dark:text-gray-300">
              Computer Science
            </p>
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400 mb-1">
              Mahatma Mntessori Higher Secondary School (2020 - 2021)
            </p>
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400 mb-2">
              Madurai, Tamilnadu
            </p>
            {/* School Percentage */}
            <p className="text-xs sm:text-sm md:text-md text-gray-600 dark:text-gray-400">
              Percentage: <span className="font-bold text-gray-800 dark:text-white">88.1%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 