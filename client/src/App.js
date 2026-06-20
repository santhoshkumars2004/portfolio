import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

// The cinematic 3D city is code-split so it never weighs down the main site.
const ImmersiveExperience = lazy(() => import('./experience/ImmersiveExperience'));
// The playable walkable neighborhood is code-split too.
const WorldExperience = lazy(() => import('./world/WorldExperience'));

function AppShell() {
  const location = useLocation();
  const isExperience = location.pathname === '/experience';
  const isWorld = location.pathname === '/world';

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  // Full-screen immersive route — no navbar/footer chrome.
  if (isExperience) {
    return (
      <Suspense
        fallback={
          <div style={{ height: '100vh', background: '#0a0a0f' }} />
        }
      >
        <ImmersiveExperience />
      </Suspense>
    );
  }

  // Full-screen playable neighborhood route — no navbar/footer chrome.
  if (isWorld) {
    return (
      <Suspense
        fallback={
          <div style={{ height: '100vh', background: '#8EC5C0' }} />
        }
      >
        <WorldExperience />
      </Suspense>
    );
  }

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#E6EDF7]">
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
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  <About />
                  <Experience />
                  <Skills />
                  <Projects />
                  <Education />
                  <Stats />
                  <Services />
                  <LetsTalk />
                  <Contact />
                </main>
              }
            />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/certificate/:id" element={<CertificateDetail />} />
          </Routes>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;