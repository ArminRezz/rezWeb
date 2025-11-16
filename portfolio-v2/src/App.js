import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import MatrixRain from './components/MatrixRain';
import FileTree from './components/FileTree';

/**
 * Main App Component - TERMINAL/VIM EDITION
 * 
 * Split-screen layout like a code editor
 */
function App() {
  const [currentSection, setCurrentSection] = useState('hero');

  // Detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app terminal-theme">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Terminal header */}
      <Header />
      
      {/* File tree sidebar */}
      <FileTree currentSection={currentSection} onNavigate={handleNavigate} />
      
      {/* Main content with editor layout */}
      <main className="main-content editor-layout">
        {/* Line numbers column */}
        <div className="line-numbers" aria-hidden="true">
          {Array.from({ length: 200 }, (_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>

        {/* Content column */}
        <div className="content-column">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Contact />
        </div>
      </main>

      {/* Status bar at bottom */}
      <footer className="status-bar">
        <div className="status-left">
          <span className="status-item">
            <span className="status-icon">●</span> {currentSection}.jsx
          </span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">JSX</span>
        </div>
        <div className="status-right">
          <span className="status-item">ln 1, col 1</span>
          <span className="status-item">Spaces: 2</span>
          <span className="status-item">main ✓</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

