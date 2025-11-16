# Unique Features ✨

Your portfolio now has several unique, eye-catching features that set it apart!

## 1. Animated Gradient Blobs 🌊
**What:** Floating, colorful gradient spheres that slowly drift across the background
**Where:** Throughout the entire site
**Effect:** Creates depth and visual interest without being distracting

## 2. Magnetic Cards 🧲
**What:** Experience cards that subtly follow your cursor when you hover over them
**Where:** Experience section
**Effect:** Creates an interactive, premium feel
**How it works:** Custom `useMagneticEffect` hook tracks mouse position

## 3. Glitch Effect on Title 👾
**What:** Quick glitch animation when hovering over your name
**Where:** Hero section (main title)
**Effect:** Modern, tech-inspired aesthetic

## 4. Gradient Shine on Cards ✨
**What:** A diagonal light sweep that travels across cards on hover
**Where:** Experience cards
**Effect:** Premium, polished interaction

## 5. Ripple Effect Button 💧
**What:** Circle expands from center when hovering submit button
**Where:** Contact form submit button
**Effect:** Satisfying, tactile feedback

## 6. Enhanced Hover Effects 🎯
**What:** Scale, lift, and glow effects on interactive elements
**Where:** All cards and buttons
**Effect:** Everything feels responsive and alive

## 7. Smooth Parallax Scrolling 🏔️
**What:** Background layers move at different speeds
**Where:** Throughout the site
**Effect:** Creates 3D depth as you scroll

## How to Customize

### Adjust Blob Movement Speed
In `src/styles/AnimatedBackground.css`:
```css
.blob-1 {
  animation-duration: 25s;  /* Change this! Higher = slower */
}
```

### Change Magnetic Strength
In `src/components/Experience.js`:
```javascript
const magnetic = useMagneticEffect(0.15);  // 0.1-0.3 recommended
```

### Disable Features
Don't like a feature? Simply remove it from `App.js`:
```javascript
// Comment out to disable animated blobs
<AnimatedBackground />
```

## Performance Notes

All animations are:
- ✅ GPU-accelerated (using `transform` and `opacity`)
- ✅ Respect user's motion preferences (`prefers-reduced-motion`)
- ✅ Lightweight (no heavy libraries)
- ✅ Smooth 60fps on modern devices

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Touch-optimized (no magnetic effect on mobile)

---

**Pro Tip:** The best way to stand out is not just what you build, but how you build it. All these effects use clean, well-commented code that anyone can understand and modify! 🚀

