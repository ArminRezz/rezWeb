import React from 'react';
import '../styles/Education.css';

/**
 * Education Component - CHANGELOG EDITION
 * 
 * Education history as version releases
 */
function Education() {
  const education = [
    {
      id: 1,
      version: 'v3.0.0',
      school: 'University of Maryland - College Park',
      degree: 'B.S. Computer Science',
      period: '2024 - Present',
      details: 'Pursuing Bachelor degree with focus on software engineering and machine learning',
      status: 'current',
      changes: [
        'Advanced algorithms & data structures',
        'Machine learning coursework',
        'System design & architecture',
        'Contributing to research projects'
      ]
    },
    {
      id: 2,
      version: 'v2.0.0',
      school: 'Montgomery College',
      degree: 'A.S. Computer Science',
      period: '2021 - 2023',
      details: 'Completed Associate degree through Early College program while in high school',
      status: 'completed',
      changes: [
        'Completed CS fundamentals',
        'Early College program achievement',
        'Dean\'s List recognition'
      ]
    },
    {
      id: 3,
      version: 'v1.0.0',
      school: 'Thomas S. Wootton High School',
      degree: 'High School Diploma',
      period: '2019 - 2023',
      details: 'Academy of Information Technology (AOIT), Varsity Soccer',
      status: 'completed',
      changes: [
        'AOIT certification',
        'Varsity Soccer athlete',
        'Dual enrollment success'
      ]
    }
  ];

  return (
    <section id="education" className="education terminal-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="comment">// CHANGELOG.md</span>
        </h2>

        <div className="terminal-output-section">
          <div className="output-line">
            <span className="prompt">$</span>
            <span className="command">cat CHANGELOG.md</span>
          </div>
        </div>
        
        <div className="changelog">
          {education.map((edu) => (
            <div key={edu.id} className={`version-block ${edu.status}`}>
              <div className="version-header">
                <span className="version-tag">{edu.version}</span>
                <span className="version-date">{edu.period}</span>
                {edu.status === 'current' && (
                  <span className="status-badge">LATEST</span>
                )}
              </div>
              
              <div className="version-content">
                <h3 className="version-title">{edu.school}</h3>
                <p className="version-subtitle">{edu.degree}</p>
                
                <div className="changes-list">
                  {edu.changes.map((change, index) => (
                    <div key={index} className="change-item">
                      <span className="change-icon">+</span>
                      <span className="change-text">{change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;

