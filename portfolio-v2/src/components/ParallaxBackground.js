import React from 'react';
import { useParallax } from '../hooks/useParallax';
import '../styles/ParallaxBackground.css';

/**
 * ParallaxBackground Component
 * 
 * Creates multiple layers that move at different speeds
 * to create a depth effect as the user scrolls.
 * 
 * Each layer has a different speed multiplier:
 * - Lower values = moves slower (appears farther away)
 * - Higher values = moves faster (appears closer)
 */
function ParallaxBackground() {
  // Create parallax effect for each layer with different speeds
  const layer1 = useParallax(-0.3);  // Slowest (background)
  const layer2 = useParallax(-0.2);
  const layer3 = useParallax(-0.1);
  const layer4 = useParallax(0);     // Static
  const layer5 = useParallax(0.1);   // Fastest (foreground)

  return (
    <div className="parallax-container">
      {/* Background layers - move slower */}
      <div className="parallax-layer layer-1" style={layer1} />
      <div className="parallax-layer layer-2" style={layer2} />
      <div className="parallax-layer layer-3" style={layer3} />
      
      {/* Middle layer - static */}
      <div className="parallax-layer layer-4" style={layer4} />
      
      {/* Foreground layer - moves faster */}
      <div className="parallax-layer layer-5" style={layer5} />
      
      {/* Gradient overlay for better text readability */}
      <div className="gradient-overlay" />
    </div>
  );
}

export default ParallaxBackground;

