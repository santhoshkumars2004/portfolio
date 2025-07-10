import React from 'react';

const Stats = () => {
  const stats = [
    { value: "80%", description: "Project Management" },
    { value: "92%", description: "Leadership" },
    { value: "80%", description: "Communication" }
  ];

  return (
    <section className="py-12 bg-white text-gray-800 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="border border-gray-300 p-6 rounded-lg dark:border-gray-800 dark:bg-black">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 dark:text-white">{stat.value}</h3>
              <p className="text-gray-600 text-sm tracking-widest dark:text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 