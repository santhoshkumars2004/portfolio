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
    image: '/images/certificate5.jpg',
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

const CARDS_PER_VIEW = 4;
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
    <section id="certificates" className="py-24 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-800 dark:text-white flex flex-col justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-4 dark:text-white tracking-tight">CERTIFICATES</h2>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 dark:text-white tracking-tight">SHOWCASE</h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-14 dark:text-gray-300 text-lg">
          Explore my achievements and certifications that highlight my skills and dedication to continuous learning.
        </p>
        <div className="relative w-full max-w-7xl flex flex-col items-center">
          {/* Carousel Row */}
          <div className="flex gap-10 w-full justify-center items-center min-h-[520px]">
            {visible.map((cert, idx) => (
              <div key={idx} className="bg-white dark:bg-black rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200 dark:border-gray-800 flex flex-col items-center p-8 transition-all duration-500 ease-in-out min-h-[480px] w-[340px] scale-100 hover:scale-105 hover:ring-2 hover:ring-secondary/40 cursor-pointer group justify-between">
                <div className="relative w-full h-56 mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-secondary/10 to-primary/10">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-2xl group-hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col items-center w-full flex-1 justify-center">
                  <span className="font-bold text-2xl text-center mb-2 dark:text-white group-hover:text-secondary transition-colors duration-300">{cert.title}</span>
                  <span className="text-base text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">{cert.subtitle}</span>
                </div>
                <a href={`/certificate/${cert.id}`} className="flex items-center gap-2 mt-4 px-6 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/80 transition-colors shadow-lg" target="_blank" rel="noopener noreferrer">
                  View <FaArrowRight />
                </a>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-white rounded-full p-4 shadow-xl hover:bg-secondary hover:text-white transition-colors z-10 border-2 border-secondary">
            <FaArrowLeft size={28} />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-white rounded-full p-4 shadow-xl hover:bg-secondary hover:text-white transition-colors z-10 border-2 border-secondary">
            <FaArrowRight size={28} />
          </button>
          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: numDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx * CARDS_PER_VIEW)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-secondary ${startIdx === idx * CARDS_PER_VIEW ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-700'}`}
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