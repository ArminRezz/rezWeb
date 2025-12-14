# arminOS Portfolio - Architecture Overview

## 🏗️ Project Structure

```
portfolio-v4/
├── index.html              # Main HTML structure (terminal, viewer, audio windows, dock)
├── main.js                 # Core application logic (4226 lines)
├── filesystem.js           # Filesystem module (350 lines)
├── styles.css              # All styling (2173 lines)
├── portfolio.json          # Generated filesystem data (from portfolio-source/)
├── generate_fs.py          # Python script to generate portfolio.json
├── config.json             # Example configuration
└── portfolio-source/       # Source content directory
    ├── Documents/          # Text files (about.txt, skills.txt, etc.)
    ├── Media/             # Audio files (.mp3)
    ├── Resume/           # PDF resume
    ├── themes/            # HTML theme files (banners, names, dancer)
    ├── quotes/           # Quote text files
    └── updates/          # Version changelogs
```

---

## 🧩 Core Architecture

### 1. **Filesystem Module** (`filesystem.js`)

**Purpose**: Virtual filesystem that loads from JSON and provides navigation/query APIs.

**Key Components**:
- **FileSystem Class**: Singleton instance exported as `fs`
- **State Management**: 
  - `root`: The entire filesystem tree (loaded from `portfolio.json`)
  - `currentPath`: Array representing current directory (e.g., `['Documents']`)
  - `loaded`: Boolean flag for initialization

**How It Works**:
1. **Loading**: `fs.load()` fetches `portfolio.json` and parses it into a nested object structure
2. **Navigation**: `changeDirectory(path)` handles:
   - Absolute paths (`/Documents`)
   - Relative paths (`Documents`, `..`, `.`)
   - Path traversal with `..` support
3. **File Operations**:
   - `getFile(filename)`: Returns file content (string) or null
   - `isDirectory(name)` / `isFile(name)`: Type checking
   - `list(showHidden)`: Lists directory contents
   - `generateTree()`: Recursive tree generation for `tree` command
4. **Autocomplete**: `getPathCompletions(path)` handles nested path completion

**JSON Structure**:
```json
{
  "Documents": {
    "about.txt": "File content as string...",
    "skills.txt": "More content..."
  },
  "Media": {
    "lofi.mp3": "portfolio-source/Media/lofi.mp3"  // Relative path for media
  },
  "Projects": {
    "project1": {  // Nested directory
      "readme.txt": "Content..."
    }
  }
}
```

**Key Insight**: Text files are embedded as strings, while media files store relative paths. Directories are nested objects.

---

### 2. **Main Application** (`main.js`)

**Purpose**: Terminal interface, command execution, window management, and all interactive features.

#### **A. State Management**

**Configuration Objects** (loaded from `.term`, `.audiojunkie`, `.dock`, `.arminOS` files):
```javascript
termConfig = {
    banner_name: 'name1.html',
    banner_image: 'bimage1.html',
    avatar: 'dancer.html',
    opacity: 100,
    theme: 'earth',
    quote: 'asimov'
}

audioJunkieConfig = { opacity, theme, visualizer, window }
dockConfig = { opacity, theme }
arminOSConfig = { bg_img, theme }
```

**Global State**:
- `commandHistory`: Array of executed commands
- `openViewerFile` / `openAudioFile`: Track currently open files
- `dancerFrames`: ASCII art animation frames
- `dancerAnalyser` / `dancerDataArray`: Web Audio API for music-responsive animation

#### **B. Command System**

**Command Flow**:
1. **Input Handler** (`handleKeyDown`):
   - Captures Enter key
   - Adds command to history
   - Calls `executeCommand(commandLine)`

2. **Command Execution** (`executeCommand`):
   - **Command Chaining**: Splits on `&` and executes sequentially
   - **Parsing**: Splits command into `command` and `args[]`
   - **Routing**: Switch statement routes to specific command functions
   - **Output**: Commands call `addOutput()` to display results

3. **Command Functions** (examples):
   - `cmdLs(args)`: Lists directory, makes items clickable
   - `cmdCd(args)`: Changes directory via `fs.changeDirectory()`
   - `cmdCat(args)`: Reads file via `fs.getFile()` or `resolveFilePath()`
   - `cmdOpen(args)`: Opens PDFs/images in viewer, audio in Audio Junkie
   - `cmdConfig(args)`: Complex config system (see below)

**Path Resolution** (`resolveFilePath`):
- Handles absolute (`/Documents/about.txt`) and relative paths
- Supports `..` traversal
- Returns `{ success: boolean, content: string, error: string }`

#### **C. Configuration System**

**Three-Tier Architecture**:

1. **Config Files** (`.term`, `.audiojunkie`, `.dock`, `.arminOS`):
   - Stored in filesystem as text files
   - Format: `key=value` (one per line)
   - Loaded on init via `loadTermConfig()`, etc.

2. **Runtime Config Objects**:
   - JavaScript objects (`termConfig`, `audioJunkieConfig`, etc.)
   - Modified by `config` command
   - Applied immediately via theme/opacity functions

3. **JSON Export/Import**:
   - `config export`: Displays or downloads JSON
   - `wormhole`: Drag-and-drop or paste JSON to load config
   - `loadConfigFromJSON()`: Applies all settings from JSON object

**Config Command Flow**:
```
config term theme water
  → Validates category/setting/value
  → Updates termConfig.theme = 'water'
  → Calls applyTermTheme()
  → Updates .term file via updateTermFile()
  → Applies CSS classes (.theme-water)
```

**Theme System**:
- Themes are CSS classes (`.theme-earth`, `.theme-water`)
- Applied to windows via `classList.add/remove`
- Each theme has specific color schemes defined in `styles.css`

#### **D. Window Management**

**Three Window Types**:
1. **Terminal Window** (`.terminal-window`)
2. **Viewer Window** (`.viewer-window`) - PDF/image viewer
3. **Audio Junkie Window** (`.audio-window`) - Audio player

**Window States** (CSS classes):
- `.closed`: Hidden (display: none)
- `.minimized`: Transformed off-screen with CSS animation
- `.maximized`: Full viewport with dock hidden

**Dragging System** (`makeDraggable`):
- **Drag Element**: Header (or body for circle mode)
- **Position Tracking**: Uses `transform: translate()` for positioning
- **Key Features**:
  - Disables CSS transitions during drag for smooth movement
  - Calculates position from mouse offset and element bounds
  - Prevents jumpiness by syncing transform with actual position
  - Uses `getBoundingClientRect()` for accurate position reading

**Window Controls** (`setupWindowControls`, `setupViewerControls`, `setupAudioControls`):
- **Close**: Adds `.closed` class, clears content
- **Minimize**: Toggles `.minimized`, clears inline styles for CSS transitions
- **Maximize**: Toggles `.maximized`, saves/restores transform position

**Dock Integration** (`setupDock`):
- Dock icons toggle window states (minimize if open, restore if minimized)
- Updates `.active` class for visual feedback
- Clears inline styles to allow CSS transitions

#### **E. Banner & Avatar System**

**Banner Rendering** (`renderBanner`):
1. Loads theme files (`banner_name`, `banner_image`) via `loadThemeFile()`
2. Creates flex container with banner image and avatar side-by-side
3. Avatar loads from `termConfig.avatar` (default: `dancer.html`)
4. Avatar displays first frame statically, animates when music plays

**Dancer Animation**:
- **Frame Loading** (`loadDancerFrames`):
  - Parses `dancer.html` by splitting on frame delimiters
  - Extracts exactly 5 lines per frame
  - Stores in `dancerFrames[]` array

- **Animation Loop** (`animateDancer`):
  - Uses `requestAnimationFrame` for smooth updates
  - **Music-Responsive**: If `dancerAnalyser` exists:
    - Gets frequency data via `getByteFrequencyData()`
    - Calculates average energy
    - Adjusts `dancerSpeed` (80-200ms) based on energy
  - Updates `avatar-static` element with current frame
  - Cycles through frames continuously

- **Lifecycle**:
  - Starts when audio plays (`audioPlayer.addEventListener('play')`)
  - Stops when audio pauses/ends
  - Shares Web Audio analyser with visualizer

#### **F. Audio Visualization**

**Setup** (`setupVisualization`):
1. Creates `AudioContext` and `AnalyserNode`
2. Connects audio source → analyser → destination
3. Creates `Uint8Array` buffer for frequency data
4. Shares analyser with dancer animation

**Visualization Modes**:

1. **Linear** (`visualize` function):
   - Bar chart style
   - Draws vertical bars based on frequency data
   - Updates on each animation frame

2. **Pulse** (heart monitor style):
   - Horizontal scrolling line
   - Stores history in `pulseHistory[]` array
   - Calculates average frequency for each column
   - Scrolls left as new data arrives

**Canvas Rendering**:
- Sets canvas size to match container
- Clears and redraws on each frame
- Uses `requestAnimationFrame` for smooth animation

#### **G. Tab Completion**

**System** (`handleInput`):
1. **Command Completion**: Matches against `AVAILABLE_COMMANDS[]`
2. **Path Completion**: Uses `fs.getPathCompletions(path)`
3. **Config Completion**: 
   - Categories: `CONFIG_CATEGORIES`
   - Values: `CONFIG_VALUES` (themes, visualizers, etc.)
4. **Multi-Tab Cycling**: Second Tab press cycles through completions
5. **Context Tracking**: `lastCompletionContext` prevents conflicts

---

### 3. **Styling System** (`styles.css`)

**Architecture**:
- **Base Styles**: Global resets, body, container
- **Theme Classes**: `.theme-earth`, `.theme-water` applied to windows
- **State Classes**: `.closed`, `.minimized`, `.maximized`
- **Component Styles**: Terminal, viewer, audio, dock

**Key Features**:
- **CSS Variables**: Used for theme colors (though limited)
- **Flexbox**: Used extensively for layouts
- **CSS Animations**: 
  - Background gradients (`@keyframes coreGradient`, `skyGradient`)
  - Window transitions (minimize/maximize)
- **Backdrop Filter**: Glassmorphism effects on windows
- **Scrollbar Styling**: Custom webkit scrollbars per theme

**Theme Implementation**:
- Each component has theme-specific selectors:
  ```css
  .terminal-window.theme-earth { /* earth colors */ }
  .terminal-window.theme-water { /* water colors */ }
  ```
- Background images via body classes: `.bg-core`, `.bg-sky`

---

### 4. **Content Generation** (`generate_fs.py`)

**Purpose**: Scans `portfolio-source/` directory and generates `portfolio.json`

**Process**:
1. **Scan Directory** (`scan_directory`):
   - Recursively walks directory tree
   - For each file:
     - **Text files**: Reads and embeds content as string
     - **Media files**: Stores relative path (`portfolio-source/Media/file.mp3`)
     - **Other files**: Stores placeholder string
   - For directories: Recursively calls itself

2. **File Filtering**:
   - Skips hidden files (unless `-a` flag)
   - Skips certain extensions (`.pyc`, `.git`, etc.)

3. **Output**: Writes nested dictionary to `portfolio.json`

**Usage**:
```bash
python3 generate_fs.py
# Or via npm:
npm run generate
```

---

## 🔄 Data Flow Examples

### Example 1: User Types `ls Documents`

```
1. handleKeyDown() captures Enter
2. executeCommand("ls Documents")
3. cmdLs(["Documents"])
4. fs.changeDirectory("Documents")
5. fs.list() returns array of filenames
6. cmdLs() creates HTML with clickable spans
7. addOutput() appends to #output div
8. User clicks a directory
9. Event listener executes: executeCommand("cd dirname & ls")
10. Command chaining splits and executes sequentially
```

### Example 2: User Types `config term theme water`

```
1. executeCommand() routes to cmdConfig(["term", "theme", "water"])
2. Validates category ("term") and setting ("theme")
3. Updates termConfig.theme = "water"
4. Calls applyTermTheme()
5. applyTermTheme() adds/removes .theme-water class on terminal
6. Calls updateTermFile() to write to filesystem
7. CSS rules for .theme-water apply new colors
```

### Example 3: User Opens Audio File

```
1. cmdOpen(["Media/lofi.mp3"])
2. resolveFilePath() finds file in filesystem
3. Returns relative path: "portfolio-source/Media/lofi.mp3"
4. openInAudioPlayer() sets audioPlayer.src
5. Removes .closed class from audio-window
6. applyAudioJunkieWindow() applies window style (box/circle)
7. User clicks play
8. setupVisualization() creates AudioContext
9. visualize() starts animation loop
10. startDancerAnimation() begins avatar animation
11. animateDancer() syncs speed with audio energy
```

---

## 🎯 Key Design Patterns

### 1. **Singleton Pattern**
- `FileSystem` class exported as singleton `fs`
- Single source of truth for filesystem state

### 2. **Module Pattern**
- `filesystem.js` is ES6 module (`export const fs`)
- `main.js` imports it (`import { fs } from './filesystem.js'`)

### 3. **Command Pattern**
- Each command is a function (`cmdLs`, `cmdCd`, etc.)
- Centralized routing via `executeCommand()` switch statement

### 4. **Observer Pattern**
- Event listeners for window controls, dock clicks, audio events
- DOM events trigger state changes

### 5. **State Management**
- Config objects hold runtime state
- Config files persist state across sessions
- JSON export/import for sharing configs

---

## 🔧 Key Technologies

- **Vanilla JavaScript** (ES6+): No frameworks, pure DOM manipulation
- **Web Audio API**: Audio visualization and music-responsive animation
- **CSS3**: Animations, flexbox, backdrop-filter, custom scrollbars
- **Python**: Content generation script
- **JSON**: Filesystem data structure and config export/import

---

## 📝 File Management Philosophy

**Virtual Filesystem**:
- All content lives in `portfolio-source/` directory
- `generate_fs.py` converts to JSON
- Browser loads JSON and creates virtual filesystem
- No server-side file operations needed
- Text files embedded, media files referenced by path

**Config Files**:
- Stored as text files in virtual filesystem (`.term`, `.audiojunkie`, etc.)
- Format: `key=value` (simple, human-readable)
- Loaded on init, updated on config changes
- Can be viewed with `cat .term`

---

## 🚀 Extension Points

**Adding a New Command**:
1. Add command name to `AVAILABLE_COMMANDS[]`
2. Add case to `executeCommand()` switch
3. Implement command function (e.g., `cmdNewCommand`)
4. Add to help text in `cmdHelp()`

**Adding a New Theme**:
1. Add theme class to CSS (e.g., `.theme-fire`)
2. Add theme-specific styles
3. Add theme to `CONFIG_VALUES.theme`
4. Add validation in `cmdConfig()`
5. Add theme application logic

**Adding a New Window**:
1. Add HTML structure to `index.html`
2. Add CSS styles
3. Create setup function (e.g., `setupNewWindowControls()`)
4. Make draggable via `makeDraggable()`
5. Add dock icon and handler

---

## 🎨 Visual Architecture

**Layering** (z-index order, bottom to top):
1. Body background (gradient animation)
2. Dock (bottom of screen)
3. Windows (terminal, viewer, audio)
4. Window headers (draggable)
5. Window controls (buttons)

**Positioning**:
- Windows: `position: fixed` with `transform: translate()` for dragging
- Dock: `position: fixed` at bottom
- Background: Body-level gradient

**Responsive Design**:
- Terminal resizable via drag handle
- Windows can be maximized (full viewport)
- Dock adapts to window width

---

This architecture provides a solid foundation for a terminal-based portfolio with extensible theming, window management, and interactive features. The separation of concerns (filesystem, commands, windows, styling) makes it maintainable and easy to extend.

