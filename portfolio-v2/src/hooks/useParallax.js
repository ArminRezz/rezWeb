import { useState, useEffect } from 'react';

/**
 * Custom Hook: useParallax
 * 
 * Creates a smooth parallax scrolling effect by tracking scroll position
 * and calculating transform values based on a speed multiplier.
 * 
 * @param {number} speed - How fast the element moves (0.1 = slow, 1 = normal speed)
 * @returns {object} - Style object with transform property
 * 
 * Example usage:
 * const parallaxStyle = useParallax(0.5);
 * return <div style={parallaxStyle}>Content</div>
 */
export function useParallax(speed = 0.5) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Update scroll position on scroll event
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Clean up listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform based on scroll position and speed
  const translateY = scrollY * speed;

  return {
    transform: `translateY(${translateY}px)`,
    willChange: 'transform', // Hint to browser for performance
  };
}

/**
 * Custom Hook: useScrollProgress
 * 
 * Tracks how far down the page the user has scrolled as a percentage.
 * Useful for progress bars or scroll indicators.
 * 
 * @returns {number} - Scroll progress from 0 to 100
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate percentage scrolled
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', calculateProgress);
    calculateProgress(); // Calculate initial progress

    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return progress;
}

