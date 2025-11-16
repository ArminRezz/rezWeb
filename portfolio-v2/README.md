# Portfolio V2 - Clean & Minimal

A modern, clean, and beginner-friendly React portfolio with custom parallax effects.

## ✨ Features

- **Custom Parallax Effect**: Built from scratch without external libraries
- **Smooth Scrolling**: Seamless navigation between sections
- **Responsive Design**: Works beautifully on all devices
- **Clean Code**: Well-commented, easy-to-understand structure
- **Glassmorphism UI**: Modern, frosted glass effects
- **No Bloat**: Minimal dependencies, maximum performance

## 📁 Project Structure

```
portfolio-v2/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/          # React components
│   │   ├── Header.js        # Navigation bar
│   │   ├── Hero.js          # Landing section
│   │   ├── About.js         # About section
│   │   ├── Experience.js    # Work experience
│   │   ├── Education.js     # Education timeline
│   │   ├── Contact.js       # Contact form
│   │   └── ParallaxBackground.js  # Parallax layers
│   ├── hooks/
│   │   └── useParallax.js   # Custom parallax hook
│   ├── styles/              # CSS modules
│   │   ├── index.css        # Global styles
│   │   ├── App.css          # App layout
│   │   ├── Header.css
│   │   ├── Hero.css
│   │   ├── About.css
│   │   ├── Experience.css
│   │   ├── Education.css
│   │   ├── Contact.css
│   │   └── ParallaxBackground.css
│   ├── App.js               # Main app component
│   └── index.js             # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-v2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Customization

### Updating Content

#### Personal Information
Edit the content in each component file:
- `src/components/Hero.js` - Landing page title and subtitle
- `src/components/About.js` - Bio and highlights
- `src/components/Experience.js` - Work experience array
- `src/components/Education.js` - Education timeline array

#### Colors and Theme
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --color-primary: #6366f1;      /* Main accent color */
  --color-primary-light: #818cf8;
  --color-primary-dark: #4f46e5;
  --color-bg: #0a0a0a;           /* Background color */
  --color-text: #ffffff;         /* Text color */
}
```

#### Parallax Effect
Adjust parallax speeds in `src/components/ParallaxBackground.js`:
```javascript
const layer1 = useParallax(-0.3);  // Slower = farther away
const layer2 = useParallax(-0.2);
const layer3 = useParallax(-0.1);
```

### Adding Email Service

The contact form is set up but needs a backend service. Popular options:

1. **EmailJS** (Recommended for beginners)
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Add their SDK to `public/index.html`
   - Update `src/components/Contact.js` with your service ID

2. **Formspree**
   - Sign up at [formspree.io](https://formspree.io/)
   - Update form action URL

3. **Custom Backend**
   - Create your own API endpoint
   - Update the `handleSubmit` function in `Contact.js`

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🎨 Code Philosophy

This project follows these principles:

- **Beginner-Friendly**: Every component is well-commented
- **No Over-Engineering**: Simple, direct solutions
- **Modern React**: Hooks, functional components
- **Clean CSS**: No CSS-in-JS complexity, just well-organized stylesheets
- **Performance**: Optimized animations and rendering

## 📝 Notes

- All components use functional components with hooks (modern React)
- The parallax effect is custom-built using scroll event listeners
- Animations are done with CSS for better performance
- The design is mobile-first and fully responsive

## 🤝 Contributing

Feel free to customize this template for your own use. No attribution required.

## 📄 License

Free to use for personal and commercial projects.

---

Built with ❤️ using React

