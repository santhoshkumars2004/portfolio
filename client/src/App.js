import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
// import Sidebar from './components/Sidebar'; // Removed
import Navbar from './components/Navbar'; // Added
import Hero from './components/Hero';
import Stats from './components/Stats'; // Added Stats component import
import About from './components/About';
import Skills from './components/Skills'; // Added Skills component import
import Projects from './components/Projects';
import Services from './components/Services'; // Added Services component import
import LetsTalk from './components/LetsTalk'; // Added LetsTalk component import
import Contact from './components/Contact';
import Footer from './components/Footer'; // Added Footer component import
import Education from './components/Education'; // Added Education component import
import Experience from './components/Experience'; // Added Experience component import
import ProjectDetail from './pages/ProjectDetail'; // Import ProjectDetail component
import CertificateDetail from './pages/CertificateDetail';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Added dark mode state

  // Effect to check for saved theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Effect to update localStorage and the html class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router> {/* Wrap the application with Router */}
      <div className={`min-h-screen bg-white text-gray-800 ${isDarkMode ? 'dark:bg-black dark:text-white' : ''}`}> {/* Apply dark mode styles */}
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> {/* Pass dark mode state and toggle function to Navbar */}

        {/* Added pt-16 to main content wrapper to account for fixed header height */}
        <div className="pt-16"> 
          {/* Main Content */}
          <Routes> {/* Define routes */}
            <Route path="/" element={ 
              <main>
                <Hero />
                <div id="about"> {/* About section comes first */}
                  <About />
                </div>
                <Education /> {/* Education comes after About */}
                <div id="projects"> {/* Projects comes after Education */}
                  <Projects />
                </div>
                <Stats /> {/* Stats section comes after About */}
                <Experience /> {/* Added Experience component after Stats */}
                <div id="skills"> {/* Reordered: Skills comes after Projects */}
                  <Skills />
                </div>
                <div id="services"> {/* Added id for navigation */}
                  <Services /> {/* Added Services component */}
                </div>
                <LetsTalk /> {/* Added LetsTalk component */}
                <div id="contact">
                  <Contact />
                </div>
              </main>
            } />
            <Route path="/projects/:projectId" element={<ProjectDetail />} /> {/* Project detail page route */}
            <Route path="/certificate/:id" element={<CertificateDetail />} />
          </Routes>
          {/* Footer outside Routes so it appears on all pages */}
          <Footer /> {/* Replaced existing footer with Footer component */}
        </div>
      </div>
    </Router>
  );
}

export default App; 