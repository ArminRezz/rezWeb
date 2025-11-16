import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook: useMagneticEffect
 * 
 * Creates a "magnetic" effect where an element subtly follows the cursor
 * when hovering over it. Great for cards, buttons, and interactive elements.
 * 
 * @param {number} strength - How strong the magnetic pull is (0.1-0.5 recommended)
 * @returns {object} - { ref, style } to apply to your element
 * 
 * Example:
 * const magnetic = useMagneticEffect(0.2);
 * return <div ref={magnetic.ref} style={magnetic.style}>Content</div>
 */
export function useMagneticEffect(strength = 0.2) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      // Get element position and size
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from cursor to center
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      // Reset position when mouse leaves
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return {
    ref: elementRef,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.2s ease-out',
    },
  };
}

