import React from 'react';
import '../styles/About.css';

/**
 * About Component - TERMINAL EDITION
 * 
 * JSON-formatted personal data display
 */
function About() {
  return (
    <section id="about" className="about terminal-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="comment">// about.json</span>
        </h2>
        
        <div className="code-block">
          <pre className="json-display">
{`{
  "name": "Armin Rezaiyan",
  "role": "Full-Stack Developer",
  "status": "Open to opportunities",
  
  "bio": {
    "description": [
      "Energetic CS student with unique journey:",
      "→ Completed 2 years of college during HS",
      "→ NASA & NIST internship experience",
      "→ Passionate about ML & system design"
    ],
    "philosophy": "Build fast, break things, learn faster"
  },
  
  "skills": {
    "languages": ["JavaScript", "Python", "Java", "C"],
    "frameworks": ["React", "Node.js", "Flask"],
    "tools": ["Git", "Docker", "AWS", "Weaviate"],
    "interests": ["ML", "Knowledge Graphs", "RF Engineering"]
  },
  
  "stats": {
    "education": "University of Maryland",
    "major": "Computer Science",
    "focus": ["Full-Stack Dev", "Machine Learning"],
    "internships": ["NASA", "NIST", "Dulles Glass"],
    "status": "Always learning"
  }
}`}
          </pre>
        </div>

        {/* Terminal output style highlights */}
        <div className="terminal-output-section">
          <div className="output-line">
            <span className="prompt">$</span>
            <span className="command">cat skills.txt</span>
          </div>
          <div className="skills-grid">
            <div className="skill-tag">React.js</div>
            <div className="skill-tag">Python</div>
            <div className="skill-tag">Node.js</div>
            <div className="skill-tag">Machine Learning</div>
            <div className="skill-tag">AWS</div>
            <div className="skill-tag">Java</div>
            <div className="skill-tag">Knowledge Graphs</div>
            <div className="skill-tag">TypeScript</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

