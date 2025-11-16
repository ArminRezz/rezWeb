import React, { useState } from 'react';
import '../styles/Contact.css';

/**
 * Contact Component - TERMINAL SCRIPT EDITION
 * 
 * Terminal-style contact form submission
 */
function Contact() {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact terminal-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="comment">// contact.sh</span>
        </h2>
        
        <div className="terminal-output-section">
          <div className="output-line">
            <span className="prompt">$</span>
            <span className="command">./contact.sh --send-message</span>
          </div>
        </div>

        <div className="script-output">
          <p className="comment"># Initializing contact protocol...</p>
          <p className="comment"># Available channels: Email, GitHub, LinkedIn</p>
        </div>

        <div className="contact-grid">
          {/* Quick contact links */}
          <div className="quick-links">
            <h3 className="links-title">
              <span className="comment"># Quick Links</span>
            </h3>
            <div className="links-list">
              <a href="mailto:your.email@example.com" className="link-item">
                <span className="link-prefix">→</span>
                <span className="link-text">email -to armin@portfolio.dev</span>
              </a>
              <a href="https://github.com/ArminRezz" target="_blank" rel="noopener noreferrer" className="link-item">
                <span className="link-prefix">→</span>
                <span className="link-text">open github.com/ArminRezz</span>
              </a>
              <a href="https://www.linkedin.com/in/arminrezaiyan/" target="_blank" rel="noopener noreferrer" className="link-item">
                <span className="link-prefix">→</span>
                <span className="link-text">connect linkedin.com/in/arminrezaiyan</span>
              </a>
            </div>
          </div>

          {/* Terminal form */}
          <form className="contact-form terminal-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <span className="comment"># Send direct message</span>
            </div>

            <div className="form-group terminal-input">
              <label htmlFor="name">
                <span className="input-prefix">$</span> name=
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='"Your Name"'
                required
              />
            </div>

            <div className="form-group terminal-input">
              <label htmlFor="email">
                <span className="input-prefix">$</span> email=
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='"your@email.com"'
                required
              />
            </div>

            <div className="form-group terminal-input">
              <label htmlFor="message">
                <span className="input-prefix">$</span> message=
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder='"Your message here..."'
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-btn terminal-submit" disabled={isSubmitting}>
              <span className="btn-prefix">$</span>
              {isSubmitting ? 'bash contact.sh --sending...' : 'bash contact.sh --execute'}
            </button>

            {/* Status messages */}
            {status === 'success' && (
              <div className="terminal-response success">
                <p>✓ SUCCESS: Message sent successfully!</p>
                <p className="comment"># Connection established</p>
              </div>
            )}
            {status === 'error' && (
              <div className="terminal-response error">
                <p>✗ ERROR: All fields required</p>
                <p className="comment"># Please fill in all inputs</p>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <footer className="footer">
        <p>© 2024 ArminRezz. Built with React.</p>
      </footer>
    </section>
  );
}

export default Contact;

