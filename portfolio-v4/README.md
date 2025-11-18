# Terminal Portfolio v4

A modular, dynamic terminal-based portfolio website that loads content from a JSON filesystem. Built with pure JavaScript, HTML, and CSS - no backend required!

## ✨ Features

### 🗂️ Modular File System
- Content stored in JSON format representing a filesystem
- Generated automatically from source files using Python script
- Easy to update - just edit files and regenerate

### 💻 Terminal Commands
- **Navigation:** `ls`, `cd`, `pwd`, `tree`
- **File Operations:** 
  - `cat <path/file>` - Display text files (supports paths)
  - `open <path/file>` - Open PDFs, images, and audio files (supports paths)
- **Utilities:** `help`, `clear`, `echo`, `history`, `whoami`, `date`
- **Hidden Files:** Support for dotfiles (use `ls -a`)
- **Tab Completion:** ✅ Auto-complete file and directory names
- **Command History:** Navigate with ↑/↓ arrows

### 🎨 Interactive Features
- 🎵 **Audio Junkie** - Built-in audio player with real-time visualizer
- 📄 **Document Viewer** - PDF and image viewer with window controls
- 🪟 **Draggable Windows** - Move windows around the screen
- 🎯 **Window Controls** - Close, minimize, maximize buttons
- 🎨 **Dock System** - macOS-style dock with app icons

### 🎨 User Experience
- Authentic terminal look and feel
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Keyboard shortcuts (Tab for completion, ↑/↓ for history)
- Custom scrollbar styling
- Animated ASCII art banner

### 🚀 Coming Soon
- `banner` - Animated ASCII art banners
- `snake` - Classic Snake game in terminal

## 📁 Project Structure

```
portfolio-v4/
├── index.html              # Main HTML file
├── main.js                 # Command handlers and terminal logic
├── filesystem.js           # Filesystem management module
├── styles.css              # Terminal styling
├── portfolio.json          # Generated filesystem (auto-generated)
├── generate_fs.py          # Python script to generate JSON
├── portfolio-source/       # Source content (edit here!)
│   ├── Documents/
│   │   ├── about.txt
│   │   ├── skills.txt
│   │   ├── experience.txt
│   │   ├── contact.txt
│   │   └── .secret        # Hidden file
│   ├── Projects/
│   │   ├── QR-Referral-System.txt
│   │   ├── Terminal-Portfolio.txt
│   │   └── Machine-Learning-Project.txt
│   ├── Media/
│   └── Resume/
└── media/                  # Media files (auto-copied)
```

## 🚀 Quick Start

### 1. Generate the Filesystem

First, generate the `portfolio.json` from your source files:

```bash
python3 generate_fs.py
```

This will:
- Scan `portfolio-source/` directory
- Read text files and embed their content
- Copy media files to `media/` directory
- Generate `portfolio.json`

### 2. Serve the Website

You can use any static file server. Here are a few options:

**Option A: Python's built-in server**
```bash
python3 -m http.server 8000
```

**Option B: Node.js http-server**
```bash
npx http-server -p 8000
```

**Option C: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

### 3. Open in Browser

Navigate to `http://localhost:8000` and start exploring!

## 📝 Customizing Content

### Adding New Content

1. **Add/Edit Files** in `portfolio-source/`
   - Text files (`.txt`, `.md`) will have their content embedded
   - Media files (images, audio, PDFs) will be copied to `media/`
   - Hidden files start with `.` (e.g., `.secret`)

2. **Regenerate** the filesystem:
   ```bash
   python3 generate_fs.py
   ```

3. **Refresh** your browser - changes are live!

### Directory Structure Tips

```
portfolio-source/
├── Documents/          # Personal info, skills, experience
├── Projects/           # Project descriptions
├── Media/             # Images, audio files
├── Resume/            # PDF resume
└── .secret            # Easter eggs!
```

## 🎮 Using the Terminal

### Basic Commands

```bash
# List files and directories
ls

# List all files (including hidden)
ls -a

# Change directory
cd Documents

# Go back to parent
cd ..

# Go to root
cd /

# Show current directory
pwd

# Display file contents
cat about.txt

# Show directory tree
tree

# Show directory tree with hidden files
tree -a

# Clear screen
clear

# Show command history
history

# Get help
help
```

### Keyboard Shortcuts

- **↑/↓** - Navigate command history
- **Tab** - Auto-complete file/directory names
- **Ctrl+L** - Clear screen
- **Enter** - Execute command

### Tips

1. Use `Tab` to auto-complete filenames
2. Try `ls -a` to find hidden files
3. Use `cat` on media files to view/play them
4. Navigate like a real terminal with `cd` and `pwd`

## 🛠️ Technical Details

### Architecture

The project follows a modular architecture:

1. **filesystem.js** - Handles all filesystem operations
   - Loads JSON data
   - Manages current directory state
   - Provides navigation methods
   - Handles file/directory queries

2. **main.js** - Terminal interface and commands
   - Input handling
   - Command parsing and routing
   - Output rendering
   - History management

3. **generate_fs.py** - Content generator
   - Recursively scans source directory
   - Embeds text file contents
   - Creates relative paths for media
   - Outputs JSON filesystem

### File System JSON Structure

```json
{
  "Documents": {
    "about.txt": "Text content here...",
    "skills.txt": "More text...",
    ".secret": "Hidden file content"
  },
  "Projects": {
    "project1.txt": "Project description..."
  },
  "Media": {
    "photo.jpg": "media/photo.jpg",
    "song.mp3": "media/song.mp3"
  },
  "Resume": {
    "resume.pdf": "media/resume.pdf"
  }
}
```

- **Directories** are objects
- **Text files** contain their full content as strings
- **Media files** contain relative paths to the `media/` directory
- **Hidden files** start with `.`

### Supported File Types

**Text Files** (content embedded):
- `.txt`, `.md`, `.json`, `.js`, `.py`, `.html`, `.css`, `.xml`

**Media Files** (paths only):
- **Images:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- **Audio:** `.mp3`, `.wav`, `.ogg`, `.m4a`
- **Video:** `.mp4`, `.webm`, `.mov`
- **Documents:** `.pdf`, `.doc`, `.docx`

## 🎨 Customization

### Changing Colors

Edit `styles.css` to customize the terminal theme:

```css
/* Main colors */
--terminal-bg: #000000;
--terminal-fg: #00ff00;
--prompt-color: #00ff00;
--error-color: #ff5555;
--info-color: #55aaff;
```

### Changing Welcome Message

Edit the ASCII art in `index.html`:

```html
<pre class="ascii-art">
    Your custom ASCII art here...
</pre>
```

### Adding New Commands

1. Add command handler in `main.js`:

```javascript
function cmdMyCommand(args) {
    // Your command logic here
    addOutput('Command output', 'success');
}
```

2. Add to command router in `executeCommand()`:

```javascript
case 'mycommand':
    cmdMyCommand(args);
    break;
```

3. Add to help text in `cmdHelp()`.

## 📦 Dependencies

**None!** This is a pure frontend project with no dependencies.

- No npm packages required
- No build step needed
- Just HTML, CSS, and vanilla JavaScript

**Python 3** is only needed for content generation (one-time setup).

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select your branch (usually `main`)
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Netlify

1. Drag and drop the entire `portfolio-v4` folder to Netlify
2. Your site is live instantly!

### Vercel

```bash
vercel deploy
```

## 🎯 Roadmap

- [ ] Music player implementation
- [ ] Animated ASCII banner
- [ ] Snake game
- [ ] Vim-style file editor
- [ ] Multiple terminal tabs
- [ ] Themes/color schemes
- [ ] Command aliases
- [ ] Autocomplete improvements

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🙏 Credits

Built with inspiration from:
- Unix/Linux terminal aesthetics
- Classic command-line interfaces
- Modern web technologies

## 💡 Tips for Your Portfolio

1. **Organize Content Logically**
   - Use clear directory names
   - Group related files together
   - Keep file names descriptive

2. **Write Engaging Content**
   - Be concise but informative
   - Use formatting for readability
   - Include relevant details

3. **Add Media**
   - Screenshots of projects
   - Profile pictures
   - Resume PDFs
   - Background music (optional)

4. **Hidden Easter Eggs**
   - Add hidden files with `.filename`
   - Include fun facts or jokes
   - Reward curious visitors

5. **Keep It Updated**
   - Regular updates are easy - just edit files and regenerate
   - Add new projects as you complete them
   - Update skills and experience

## 🤝 Contributing

Feel free to fork, modify, and improve! Share your custom versions.

---

**Enjoy your terminal portfolio! 🚀**

For questions or issues, feel free to reach out or open an issue.

