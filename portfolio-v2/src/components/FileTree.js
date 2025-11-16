import React, { useState } from 'react';
import '../styles/FileTree.css';

/**
 * FileTree Component
 * 
 * Neovim-style file tree sidebar for navigation
 */
function FileTree({ currentSection, onNavigate }) {
  const [expanded, setExpanded] = useState(true);

  const files = [
    { id: 'hero', name: 'README.md', icon: '📄', section: 'hero' },
    { id: 'about', name: 'about.json', icon: '📋', section: 'about' },
    { id: 'experience', name: 'work.log', icon: '💼', section: 'experience' },
    { id: 'education', name: 'education.md', icon: '🎓', section: 'education' },
    { id: 'contact', name: 'contact.sh', icon: '📧', section: 'contact' },
  ];

  return (
    <aside className={`file-tree ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="file-tree-header">
        <span className="tree-title">EXPLORER</span>
        <button 
          className="tree-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle sidebar"
        >
          {expanded ? '◀' : '▶'}
        </button>
      </div>

      {expanded && (
        <div className="file-tree-content">
          <div className="directory">
            <div className="directory-header">
              <span className="directory-icon">▼</span>
              <span className="directory-name">portfolio/</span>
            </div>
            
            <div className="file-list">
              {files.map((file) => (
                <button
                  key={file.id}
                  className={`file-item ${currentSection === file.section ? 'active' : ''}`}
                  onClick={() => onNavigate(file.section)}
                >
                  <span className="file-icon">{file.icon}</span>
                  <span className="file-name">{file.name}</span>
                  {currentSection === file.section && (
                    <span className="file-indicator">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Status info */}
          <div className="tree-footer">
            <div className="status-item">
              <span className="status-label">Branch:</span>
              <span className="status-value">main</span>
            </div>
            <div className="status-item">
              <span className="status-label">Files:</span>
              <span className="status-value">{files.length}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default FileTree;

