import React from 'react';
import '../styles/AnimatedBackground.css';

/**
 * AnimatedBackground Component
 * 
 * Creates floating, animated gradient blobs that move around the screen.
 * Adds visual interest and depth to the background.
 */
function AnimatedBackground() {
  return (
    <div className="animated-background">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />
    </div>
  );
}

export default AnimatedBackground;

