# Quick Start Guide

## Install & Run (3 steps)

```bash
# 1. Navigate to project
cd portfolio-v2

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm start
```

The site will open at `http://localhost:3000`

## File Structure Explained

### Components (src/components/)
Each component is a self-contained section:
- **Header.js** - Top navigation bar
- **Hero.js** - Landing page with your name
- **About.js** - Your bio and highlights
- **Experience.js** - Work experience cards
- **Education.js** - Education timeline
- **Contact.js** - Contact form
- **ParallaxBackground.js** - Animated background layers

### Styles (src/styles/)
Each component has its own CSS file with the same name.
- **index.css** - Global styles and CSS variables
- **App.css** - Main layout
- All other CSS files match their component names

### Hooks (src/hooks/)
- **useParallax.js** - Custom hook for parallax effect

## Quick Customization

### Change Colors
Open `src/styles/index.css` and modify:
```css
:root {
  --color-primary: #6366f1;  /* Change this! */
}
```

### Update Your Info
1. **Name & Title**: Edit `src/components/Hero.js`
2. **Bio**: Edit `src/components/About.js`
3. **Experience**: Edit the `experiences` array in `src/components/Experience.js`
4. **Education**: Edit the `education` array in `src/components/Education.js`

### Adjust Parallax Speed
In `src/components/ParallaxBackground.js`:
```javascript
// Lower number = slower movement
const layer1 = useParallax(-0.3);  // Try -0.5 for slower
```

## Common Tasks

### Build for Production
```bash
npm run build
```
Creates optimized files in `build/` folder

### Deploy
After running `npm run build`, upload the `build/` folder to:
- Netlify (drag & drop)
- Vercel (connect GitHub repo)
- GitHub Pages
- Any static hosting service

## Need Help?

Check the main README.md for detailed documentation.

Key concepts:
- **Components** = Reusable pieces of UI
- **Props** = Data passed to components
- **Hooks** = Functions that add features to components
- **CSS Variables** = Centralized style values

Happy coding! 🚀

