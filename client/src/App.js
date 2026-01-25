import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import LetsTalk from './components/LetsTalk';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';
import Experience from './components/Experience';
import ProjectDetail from './pages/ProjectDetail';
import CertificateDetail from './pages/CertificateDetail';
import { CursorFollower } from './components/interactive/InteractiveElements';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Always use dark mode for cinematic
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const location = window.location;

  return (
    <Router>
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="min-h-screen bg-black text-white">
          {/* Custom Cursor - hidden on touch devices */}
          <div className="hidden md:block">
            <CursorFollower />
          </div>

          <AnimatedBackground />
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <main>
                    <Hero />
                    <div id="about">
                      <About />
                    </div>
                    <Education />
                    <div id="projects">
                      <Projects />
                    </div>
                    <Stats />
                    <Experience />
                    <div id="skills">
                      <Skills />
                    </div>
                    <div id="services">
                      <Services />
                    </div>
                    <LetsTalk />
                    <div id="contact">
                      <Contact />
                    </div>
                  </main>
                } />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/certificate/:id" element={<CertificateDetail />} />
              </Routes>
              <Footer />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Router>
  );
}

export default App;