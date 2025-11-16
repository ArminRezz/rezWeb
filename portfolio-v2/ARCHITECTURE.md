# Architecture Guide

## How Everything Works Together

### The Big Picture

```
App.js (Main Container)
├── Header (Fixed Navigation)
├── ParallaxBackground (Visual Layers)
└── Main Content (Scrollable Sections)
    ├── Hero
    ├── About
    ├── Experience
    ├── Education
    └── Contact
```

## Component Flow

### 1. Entry Point (index.js)
```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```
- Renders the entire app into the HTML page
- Only runs once when page loads

### 2. App Component (App.js)
The main orchestrator that:
- Imports all section components
- Arranges them in order
- Wraps them in a container

### 3. Header Component
**What it does:**
- Fixed position at top of page
- Handles navigation clicks
- Shows scroll progress bar

**How it works:**
```javascript
// Uses custom hook to track scroll
const scrollProgress = useScrollProgress();

// Smoothly scrolls to sections
const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};
```

### 4. ParallaxBackground Component
**What it does:**
- Creates depth effect
- Layers move at different speeds
- Always stays behind content

**How it works:**
```javascript
// Each layer uses the parallax hook
const layer1 = useParallax(-0.3);  // Speed value
// Returns: { transform: 'translateY(pixels)' }

// Applied to div
<div style={layer1} />
```

**Why negative speeds?**
- Negative = moves up as you scroll down (creates depth)
- Positive = moves down as you scroll down (foreground effect)
- Zero = stays in place

## Custom Hooks

### useParallax(speed)
**Purpose:** Makes elements move during scroll

**How it works:**
1. Listens to scroll events
2. Calculates: `scrollY * speed`
3. Returns CSS transform value

**Example:**
```javascript
// Slow movement (background)
const bgStyle = useParallax(-0.2);

// Fast movement (foreground)  
const fgStyle = useParallax(0.3);
```

### useScrollProgress()
**Purpose:** Track scroll percentage (0-100)

**Use case:** Progress bar in header

## Data Flow

### Static Content (No Props)
Most components contain their own data:
```javascript
const experiences = [
  { id: 1, role: "...", organization: "..." },
  // More items...
];
```

**Why?** 
- Simpler for beginners
- Easy to find and edit
- No prop drilling

### Interactive Elements
Contact form manages its own state:
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
```

## CSS Architecture

### Global Styles (index.css)
- CSS Variables (colors, spacing)
- Reset styles
- Font imports

### Component Styles
Each component has its own CSS file:
- Scoped to that component
- Uses global variables
- No conflicts

### CSS Variables Example
```css
/* Define once in index.css */
:root {
  --color-primary: #6366f1;
}

/* Use everywhere */
.button {
  background: var(--color-primary);
}
```

## Performance Optimizations

### 1. Will-Change Property
```css
.parallax-layer {
  will-change: transform;
}
```
Tells browser to optimize this property.

### 2. Transform Instead of Top/Left
```javascript
// Fast ✓
transform: translateY(100px)

// Slow ✗  
top: 100px
```
Transform uses GPU acceleration.

### 3. Event Listener Cleanup
```javascript
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  
  // Cleanup when component unmounts
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## Accessibility Features

### 1. Semantic HTML
```javascript
<section>  // Not just <div>
<nav>      // For navigation
<header>   // For page header
```

### 2. ARIA Labels
```javascript
<a aria-label="GitHub">
  <svg>...</svg>
</a>
```

### 3. Focus States
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
}
```

### 4. Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
```

## Common Patterns

### Pattern 1: Component Structure
```javascript
import React from 'react';
import './ComponentName.css';

function ComponentName() {
  return (
    <section id="component-name" className="component-name">
      <div className="section-container">
        {/* Content */}
      </div>
    </section>
  );
}

export default ComponentName;
```

### Pattern 2: Array Mapping
```javascript
const items = [{ id: 1, title: "..." }, ...];

return (
  <div>
    {items.map(item => (
      <div key={item.id}>
        <h3>{item.title}</h3>
      </div>
    ))}
  </div>
);
```

### Pattern 3: Conditional Rendering
```javascript
{status === 'success' && (
  <p className="success">Message sent!</p>
)}
```

## Debugging Tips

### 1. Check Console
```javascript
console.log('Scroll position:', scrollY);
```

### 2. React DevTools
- Install browser extension
- Inspect component props & state

### 3. CSS Issues
- Use browser inspector
- Check for typos in classNames
- Verify CSS file is imported

## Extending the Project

### Add New Section
1. Create component file: `src/components/NewSection.js`
2. Create CSS file: `src/styles/NewSection.css`
3. Import in `App.js`
4. Add to main content
5. Add navigation link in `Header.js`

### Add Images
1. Create `src/assets/images/` folder
2. Import in component:
   ```javascript
   import myImage from '../assets/images/photo.jpg';
   ```
3. Use in JSX:
   ```javascript
   <img src={myImage} alt="Description" />
   ```

## Key Takeaways

✅ **Components** = Building blocks  
✅ **Hooks** = Add functionality  
✅ **Props** = Pass data down  
✅ **State** = Store changing data  
✅ **CSS Modules** = Scoped styling  

This architecture prioritizes:
- **Readability** over complexity
- **Simplicity** over cleverness
- **Clarity** over brevity

---

**Remember:** The best code is code you can understand 6 months from now! 🧠

