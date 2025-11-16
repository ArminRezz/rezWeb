# Terminal Portfolio v3

A fully interactive terminal-based portfolio website with modern features and a sleek design. Navigate through my information using a real command-line interface.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` and start typing commands!

## 📝 Available Commands

### Information Commands
```bash
help              # Show all available commands
about             # Learn about me
whoami            # Quick introduction
neofetch          # System information (cool!)
experience, work  # View work experience
education         # View educational background
skills            # View technical skills
projects          # View my projects
contact           # Get contact information
resume            # View/download resume
banner            # Show ASCII art banner
```

### File System Commands
```bash
ls                # List files
cat <file>        # Read a file (try: cat README.md)
tree              # Show directory structure
pwd               # Print working directory
```

### Customization Commands
```bash
theme <name>      # Change color theme
                  # Available: green, blue, amber, matrix
```

### Fun & Entertainment
```bash
snake             # Play Snake game!
games             # List all available games
music, play       # Play/pause lofi music
fortune, quote    # Random inspiring quote
joke              # Tell a programming joke
cowsay <msg>      # ASCII cow with your message
weather           # Check the weather
```

### Utility Commands
```bash
clear, cls        # Clear the terminal
history           # Show command history
man <command>     # Show manual for any command
env               # Show environment variables
uname             # System information
uptime            # Portfolio uptime
echo <text>       # Echo text
date              # Show current date
ping <host>       # Ping a host
credits           # View credits
changelog         # View recent updates
```

## 🎯 Features

### Core Terminal Features
- **🎨 Multiple Color Themes**: Switch between green, blue, amber, and matrix themes
- **⌨️ Tab Completion**: Press Tab to auto-complete commands
- **📜 Command History**: Use ↑/↓ to navigate through command history
- **💾 Persistent History**: Command history saved to localStorage
- **🔍 Fuzzy Command Matching**: Get suggestions for mistyped commands
- **📚 Manual Pages**: Type `man <command>` to learn about any command
- **✨ Smooth Animations**: Fade-in effects and smooth transitions

### File System
- **📁 Virtual File System**: Read files with `cat` command
- **🌳 File Tree Visualization**: See directory structure with `tree`
- **📂 Unix Commands**: `ls`, `pwd`, `cat`, and more

### Fun & Entertainment
- **🎵 Music Player**: Play lofi beats while browsing with `music` command
- **🐍 Snake Game**: Play classic Snake game (coming soon!)
- **🎭 ASCII Art**: Beautiful ASCII banner and `cowsay` command
- **🔮 Fortune**: Get random inspiring quotes and programming jokes
- **🌤️ Weather**: Check the weather with ASCII art
- **🎮 Easter Eggs**: Hidden surprises throughout

### Utilities
- **📊 System Info**: `neofetch`, `uname`, `uptime` commands
- **🌍 Environment**: View environment variables with `env`
- **🔧 Developer Tools**: `echo`, `ping`, `date` and more
- **ℹ️ Credits**: View all credits and changelog

### Design
- **📱 Fully Responsive**: Works perfectly on desktop and mobile
- **🖥️ Fullscreen Terminal**: Authentic terminal experience
- **✨ Modern & Clean**: No window chrome, pure terminal

## 🛠️ Customization

All personal information is stored in `src/utils/commands.js`. Update the `personalInfo` object with your details:

```javascript
const personalInfo = {
  name: 'Your Name',
  role: 'Your Role',
  // ... etc
};
```

## 📦 Built With

- React
- Pure CSS (no UI libraries)
- Vanilla JavaScript

## 🎨 Themes

The terminal supports 4 color themes (change with `theme <name>`):

### Green (Default)
- Primary: #00ff41 (Terminal Green)
- Background: #0d0208 (Deep Dark)
- Perfect for classic terminal feel

### Blue
- Primary: #00d9ff (Cyan Blue)
- Background: #0a0e27 (Dark Blue)
- Cool and modern aesthetic

### Amber
- Primary: #ffb000 (Warm Amber)
- Background: #1a0f00 (Deep Brown)
- Vintage computing vibe

### Matrix
- Primary: #0f0 (Pure Green)
- Background: #000 (Pure Black)
- Authentic Matrix code style

---

Made with ❤️ by [Armin Rezaiyan](https://github.com/ArminRezz)
