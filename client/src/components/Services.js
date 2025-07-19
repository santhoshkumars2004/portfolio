import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const certificates = [
  {
    id: 'java',
    title: 'Java Crash Course',
    subtitle: 'Issued by Udemy',
    image: '/images/java1.jpg',
    link: '#',
  },
  {
    id: 'sql',
    title: 'SQL With Relational Database',
    subtitle: 'Issued by IBM',
    image: '/images/sql.jpg',
    link: '#',
  },
  {
    id: 'htmlcssjs',
    title: 'Html, Css, Javascript',
    subtitle: 'Issued by Great Learning',
    image: '/images/certificate3.jpg',
    link: '#',
  },
  {
    id: 'ai',
    title: 'Learn AI Skill Challenge',
    subtitle: 'Issued by Microsoft',
    image: '/images/ai1.jpg',
    link: '#',
  },
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    subtitle: 'Issued by AWS',
    image: '/images/amazon.jpg',
    link: '#',
  },
  {
    id: 'design',
    title: 'Enterprise Design Thinking Practitioner',
    subtitle: 'Issued by IBM',
    image: '/images/design.jpg',
    link: '#',
  },
];

const CARDS_PER_VIEW = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
const SLIDE_INTERVAL = 4000; // 4 seconds

const Certificates = () => {
  const [startIdx, setStartIdx] = useState(0);
  const total = certificates.length;
  const timerRef = useRef();

  // Auto-slide logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + CARDS_PER_VIEW) % total);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Manual navigation resets timer
  const goTo = (idx) => {
    setStartIdx(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + CARDS_PER_VIEW) % total);
    }, SLIDE_INTERVAL);
  };

  const prevSlide = () => goTo((startIdx - CARDS_PER_VIEW + total) % total);
  const nextSlide = () => goTo((startIdx + CARDS_PER_VIEW) % total);

  // Calculate visible certificates
  const visible = [];
  for (let i = 0; i < CARDS_PER_VIEW; i++) {
    visible.push(certificates[(startIdx + i) % total]);
  }

  // Dots navigation (one per slide group)
  const numDots = Math.ceil(total / CARDS_PER_VIEW);

  return (
    <section id="certificates" className="py-8 sm:py-12 md:py-16 min-h-[80vh] sm:min-h-screen text-gray-800 dark:text-white flex flex-col justify-center">
      <div className="container mx-auto px-2 sm:px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-2 dark:text-white tracking-tight">CERTIFICATES</h2>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 dark:text-white tracking-tight">SHOWCASE</h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-6 sm:mb-8 dark:text-gray-300 text-sm sm:text-base md:text-lg">
          Explore my achievements and certifications that highlight my skills and dedication to continuous learning.
        </p>
        <div className="relative w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl flex flex-col items-center">
          {/* Carousel Row */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-10 w-full justify-center items-center min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[520px] overflow-x-auto no-scrollbar">
            {visible.map((cert, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm dark:bg-black rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200/50 dark:border-gray-800 flex flex-col items-center p-3 sm:p-4 md:p-8 transition-all duration-500 ease-in-out min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] w-[85vw] sm:w-[340px] scale-100 hover:scale-105 hover:ring-2 hover:ring-blue-600/40 cursor-pointer group justify-between">
                <div className="relative w-full h-32 sm:h-40 md:h-56 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600/10 to-purple-600/10">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col items-center w-full flex-1 justify-center">
                  <span className="font-bold text-base sm:text-lg md:text-2xl text-center mb-1 sm:mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{cert.title}</span>
                  <span className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 uppercase tracking-wide">{cert.subtitle}</span>
                </div>
                <a href={`/certificate/${cert.id}`} className="flex items-center gap-2 mt-2 sm:mt-4 px-3 sm:px-4 md:px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg text-xs sm:text-sm md:text-base" target="_blank" rel="noopener noreferrer">
                  View <FaArrowRight />
                </a>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button onClick={prevSlide} className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 text-gray-700 dark:text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:bg-blue-600 hover:text-white transition-colors z-10 border-2 border-blue-600">
            <FaArrowLeft size={16} className="sm:hidden" />
            <FaArrowLeft size={20} className="hidden sm:block md:hidden" />
            <FaArrowLeft size={28} className="hidden md:block" />
          </button>
          <button onClick={nextSlide} className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 text-gray-700 dark:text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:bg-blue-600 hover:text-white transition-colors z-10 border-2 border-blue-600">
            <FaArrowRight size={16} className="sm:hidden" />
            <FaArrowRight size={20} className="hidden sm:block md:hidden" />
            <FaArrowRight size={28} className="hidden md:block" />
          </button>
          {/* Dots Navigation */}
          <div className="flex justify-center mt-3 sm:mt-4 md:mt-8 gap-2 sm:gap-3">
            {Array.from({ length: numDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx * CARDS_PER_VIEW)}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 border-2 border-blue-600 ${startIdx === idx * CARDS_PER_VIEW ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates; 