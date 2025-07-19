import React from 'react';

const Stats = () => {
  const stats = [
    { value: "80%", description: "Project Management" },
    { value: "92%", description: "Leadership" },
    { value: "80%", description: "Communication" }
  ];

  return (
    <section className="py-6 sm:py-8 md:py-12 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm border border-gray-300/50 p-3 sm:p-4 md:p-6 rounded-lg dark:border-gray-800 dark:bg-black">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 dark:text-white">{stat.value}</h3>
              <p className="text-gray-600 text-xs sm:text-sm tracking-widest dark:text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 