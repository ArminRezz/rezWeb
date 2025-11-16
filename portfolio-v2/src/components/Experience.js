import React from 'react';
import '../styles/Experience.css';

/**
 * Experience Card - Git Commit Style
 * 
 * Each experience shown like a git commit
 */
function ExperienceCard({ exp, commitHash }) {
  return (
    <div 
      className="experience-card"
      data-commit={commitHash}
    >
      <div className="card-header">
        <h3 className="card-title">{exp.role}</h3>
        <span className="card-organization">@{exp.organization}</span>
        <span className="card-period">{exp.period}</span>
      </div>
      
      <p className="card-description">{exp.description}</p>
      
      <div className="card-tags">
        {exp.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Experience Component
 * 
 * Displays work experience in a clean, card-based layout.
 * Each experience card contains role, organization, and description.
 */
function Experience() {
  // Experience data - easy to modify and extend
  const experiences = [
    {
      id: 1,
      role: 'AI and ML Intern',
      organization: 'NASA',
      period: 'Summer 2023',
      description: 'Developed knowledge graphs using Weaviate for NASA GES DISC datasets. Collaborated to integrate subsidiary graphs into a comprehensive data discovery system.',
      tags: ['Machine Learning', 'Weaviate', 'Python']
    },
    {
      id: 2,
      role: 'AI and ML Intern',
      organization: 'NASA',
      period: 'Summer 2022',
      description: 'Contributed to primary knowledge graph development and PDF analysis systems, enhancing dataset understanding through bi-weekly collaborative meetings.',
      tags: ['AI', 'Knowledge Graphs', 'Research']
    },
    {
      id: 3,
      role: 'Computational Modeling Intern',
      organization: 'NIST',
      period: 'Summer 2022',
      description: 'Researched relationships between dielectric energy in the human body and RF transmissions from wearable devices to optimize antenna performance.',
      tags: ['Research', 'RF Engineering', 'Modeling']
    },
    {
      id: 4,
      role: 'React Developer',
      organization: 'Dulles Glass',
      period: '2021-2022',
      description: 'Built frontend UI tools for designing dynamic pricing tables and data visualization using React with TypeScript.',
      tags: ['React', 'TypeScript', 'Frontend']
    },
    {
      id: 5,
      role: 'Java/Web Developer',
      organization: 'Dulles Glass',
      period: '2021',
      description: 'Validated hardware attributes against legacy systems using Java and AWS DynamoDB. Followed Agile methodologies for efficient development.',
      tags: ['Java', 'AWS', 'Backend']
    }
  ];

  // Generate fake commit hashes
  const commitHashes = ['a3f2d91', '7b8c4e2', 'f1a9d6b', '4e7c2a8', '9d3f1b5'];

  return (
    <section id="experience" className="experience terminal-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="comment">// git log --work</span>
        </h2>
        
        <div className="terminal-output-section">
          <div className="output-line">
            <span className="prompt">$</span>
            <span className="command">git log --oneline --graph</span>
          </div>
        </div>

        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={exp.id} 
              exp={exp} 
              commitHash={commitHashes[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

