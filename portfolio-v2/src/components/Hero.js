import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

/**
 * Hero Component - TERMINAL EDITION
 * 
 * Terminal-style landing with ASCII art and typing effect
 */
function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = '$ whoami';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero terminal">
      <div className="hero-content">
        {/* ASCII Art */}
        <pre className="ascii-art">{`
   █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
  ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
  ███████║██████╔╝██╔████╔██║██║██╔██╗ ██║
  ██╔══██║██╔══██╗██║╚██╔╝██║██║██║╚██╗██║
  ██║  ██║██║  ██║██║ ╚═╝ ██║██║██║ ╚████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
        `}</pre>

        <div className="terminal-prompt">
          <span className="prompt-symbol">{'>'}</span>
          <span className="prompt-text">{displayText}</span>
          <span className="cursor-blink">▊</span>
        </div>

        <div className="terminal-output">
          <p><span className="comment"># Full-Stack Developer</span></p>
          <p><span className="comment"># CS @ University of Maryland</span></p>
          <p><span className="comment"># NASA | NIST Intern</span></p>
        </div>

        <div className="terminal-stats">
          <span className="stat">[ Lines of Code: ∞ ]</span>
          <span className="stat">[ Coffee Consumed: █████████ ]</span>
          <span className="stat">[ Bugs Fixed: Daily ]</span>
        </div>
      </div>
      
      {/* Terminal-style scroll indicator */}
      <div className="scroll-indicator">
        <span className="comment">// scroll_down()</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

export default Hero;

