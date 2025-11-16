import React from 'react';
import { useScrollProgress } from '../hooks/useParallax';
import '../styles/Header.css';

/**
 * Header Component
 * 
 * A fixed navigation bar that stays at the top of the page.
 * Includes smooth scrolling to different sections and a progress bar.
 */
function Header() {
  const scrollProgress = useScrollProgress();

  // Smooth scroll to a section by ID
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header terminal-header">
      <nav className="nav">
        {/* Terminal prompt style */}
        <div className="terminal-nav-prompt">
          <span className="nav-user">armin@portfolio</span>
          <span className="nav-separator">:</span>
          <span className="nav-path">~/sections</span>
          <span className="nav-dollar">$</span>
        </div>

        {/* Navigation items - command style */}
        <div className="nav-commands">
          <button onClick={() => scrollToSection('hero')} className="nav-link">
            ./home
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            ./about
          </button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">
            ./work
          </button>
          <button onClick={() => scrollToSection('education')} className="nav-link">
            ./edu
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            ./contact
          </button>
        </div>

        {/* Social links */}
        <div className="social-links">
          <a 
            href="https://github.com/ArminRezz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
            title="github"
          >
            [GH]
          </a>
          <a 
            href="https://www.linkedin.com/in/arminrezaiyan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
            title="linkedin"
          >
            [in]
          </a>
        </div>
      </nav>

      {/* Progress bar - terminal style */}
      <div className="progress-bar-container">
        <span className="progress-label">[{Math.round(scrollProgress)}%]</span>
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  );
}

export default Header;

