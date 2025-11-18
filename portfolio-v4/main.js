/**
 * Main Terminal Interface
 * 
 * Handles user input, command execution, and output display.
 */

import { fs } from './filesystem.js';

// Terminal state
let commandHistory = [];
let historyIndex = -1;
let musicPlayer = null;
let currentTrack = null;

// DOM elements
let input, output, prompt;

/**
 * Initialize the terminal
 */
async function init() {
    // Get DOM elements
    input = document.getElementById('command-input');
    output = document.getElementById('output');
    prompt = document.getElementById('prompt');

    // Load filesystem
    const loaded = await fs.load();
    if (!loaded) {
        addOutput('Error: Failed to load filesystem. Please refresh the page.', 'error');
        return;
    }

    // Setup event listeners
    input.addEventListener('keydown', handleKeyDown);
    input.addEventListener('input', handleInput);

    // Keep input focused
    document.addEventListener('click', () => input.focus());
    
    // Setup terminal window controls
    setupWindowControls();
    
    // Setup viewer window controls
    setupViewerControls();
    
    // Make windows draggable
    makeDraggable(document.querySelector('.terminal-window'), document.querySelector('.terminal-window .terminal-header'));
    makeDraggable(document.getElementById('viewer-window'), document.querySelector('#viewer-window .terminal-header'));
    
    // Setup dock
    setupDock();
    
    // Update prompt
    updatePrompt();
}

/**
 * Make a window draggable by its header
 */
function makeDraggable(windowElement, headerElement) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let animationId = null;

    headerElement.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        // Don't drag if clicking on window control buttons
        if (e.target.classList.contains('btn')) {
            return;
        }
        
        // Don't drag if window is maximized
        if (windowElement.classList.contains('maximized')) {
            return;
        }

        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === headerElement || headerElement.contains(e.target)) {
            isDragging = true;
            headerElement.style.cursor = 'grabbing';
            windowElement.style.transition = 'none';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            // Use requestAnimationFrame for smooth updates
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            animationId = requestAnimationFrame(() => {
                setTranslate(currentX, currentY, windowElement);
            });
        }
    }

    function dragEnd(e) {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            headerElement.style.cursor = 'grab';
            windowElement.style.transition = '';
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
    
    // Set initial cursor
    headerElement.style.cursor = 'grab';
}

/**
 * Setup terminal window controls (close, minimize, maximize)
 */
function setupWindowControls() {
    const terminalWindow = document.querySelector('.terminal-window');
    const closeBtn = terminalWindow.querySelector('.btn-close');
    const minimizeBtn = terminalWindow.querySelector('.btn-minimize');
    const maximizeBtn = terminalWindow.querySelector('.btn-maximize');
    
    // Close button - hide terminal
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        terminalWindow.classList.add('closed');
        
        // Remove active state from dock
        const terminalApp = document.getElementById('terminal-app');
        if (terminalApp) {
            terminalApp.classList.remove('active');
        }
    });
    
    // Minimize button - hide terminal
    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMinimizing = !terminalWindow.classList.contains('minimized');
        terminalWindow.classList.toggle('minimized');
        
        // Update active state in dock
        const terminalApp = document.getElementById('terminal-app');
        if (terminalApp) {
            if (isMinimizing) {
                terminalApp.classList.remove('active');
            } else {
                terminalApp.classList.add('active');
            }
        }
    });
    
    // Maximize button - fullscreen toggle
    maximizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMaximizing = !terminalWindow.classList.contains('maximized');
        terminalWindow.classList.toggle('maximized');
        
        // Reset position when maximizing
        if (isMaximizing) {
            terminalWindow.style.transform = 'none';
        }
        
        // Hide/show dock when maximized
        const dock = document.querySelector('.dock');
        if (terminalWindow.classList.contains('maximized')) {
            dock.classList.add('hidden');
        } else {
            dock.classList.remove('hidden');
        }
    });
}

/**
 * Setup viewer window controls (close, minimize, maximize)
 */
function setupViewerControls() {
    const viewerWindow = document.getElementById('viewer-window');
    const viewerApp = document.getElementById('viewer-app');
    const closeBtn = viewerWindow.querySelector('.btn-close');
    const minimizeBtn = viewerWindow.querySelector('.btn-minimize');
    const maximizeBtn = viewerWindow.querySelector('.btn-maximize');
    
    // Close button - hide viewer and remove from dock
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewerWindow.classList.add('closed');
        
        // Hide from dock and remove active state
        viewerApp.style.display = 'none';
        viewerApp.classList.remove('active');
        
        // Clear viewer content
        document.getElementById('viewer-iframe').src = '';
        document.getElementById('viewer-image').src = '';
    });
    
    // Minimize button - hide viewer
    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMinimizing = !viewerWindow.classList.contains('minimized');
        viewerWindow.classList.toggle('minimized');
        
        // Update active state in dock
        if (isMinimizing) {
            viewerApp.classList.remove('active');
        } else {
            viewerApp.classList.add('active');
        }
    });
    
    // Maximize button - fullscreen toggle
    maximizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMaximizing = !viewerWindow.classList.contains('maximized');
        viewerWindow.classList.toggle('maximized');
        
        // Reset position when maximizing
        if (isMaximizing) {
            viewerWindow.style.transform = 'translate(-50%, -50%)';
        }
        
        // Hide/show dock when maximized
        const dock = document.querySelector('.dock');
        if (viewerWindow.classList.contains('maximized')) {
            dock.classList.add('hidden');
        } else {
            dock.classList.remove('hidden');
        }
    });
}

/**
 * Setup dock interactions
 */
function setupDock() {
    const terminalApp = document.getElementById('terminal-app');
    const terminalWindow = document.querySelector('.terminal-window');
    
    // Terminal app - reopen terminal
    terminalApp.addEventListener('click', (e) => {
        e.stopPropagation();
        terminalWindow.classList.remove('closed');
        terminalWindow.classList.remove('minimized');
        terminalApp.classList.add('active');
        
        // Focus input
        setTimeout(() => {
            const input = document.getElementById('command-input');
            if (input) input.focus();
        }, 100);
    });
    
    // Viewer app - reopen viewer window
    const viewerApp = document.getElementById('viewer-app');
    const viewerWindow = document.getElementById('viewer-window');
    
    viewerApp.addEventListener('click', (e) => {
        e.stopPropagation();
        viewerWindow.classList.remove('closed');
        viewerWindow.classList.remove('minimized');
        viewerApp.classList.add('active');
    });
}

/**
 * Handle keyboard input
 */
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = input.value.trim();
        
        if (command) {
            // Add to history
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Display command
            addOutput(`<span class="prompt">${prompt.textContent}</span> ${escapeHtml(command)}`, 'input');
            
            // Execute command
            executeCommand(command);
        } else {
            addOutput(`<span class="prompt">${prompt.textContent}</span>`, 'input');
        }
        
        // Clear input
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        handleTabCompletion();
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        clearScreen();
    }
}

/**
 * Handle input changes (for live features if needed)
 */
function handleInput(e) {
    // Could add live suggestions here
}

/**
 * Handle tab completion
 */
function handleTabCompletion() {
    const value = input.value;
    const parts = value.split(' ');
    const lastPart = parts[parts.length - 1];
    
    const completions = fs.getCompletions(lastPart);
    
    if (completions.length === 1) {
        parts[parts.length - 1] = completions[0];
        input.value = parts.join(' ');
    } else if (completions.length > 1) {
        addOutput(completions.join('  '), 'info');
    }
}

/**
 * Execute a command
 */
function executeCommand(commandLine) {
    const parts = commandLine.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Command routing
    switch (command) {
        case 'help':
            cmdHelp();
            break;
        case 'ls':
            cmdLs(args);
            break;
        case 'cd':
            cmdCd(args);
            break;
        case 'pwd':
            cmdPwd();
            break;
        case 'cat':
            cmdCat(args);
            break;
        case 'open':
            cmdOpen(args);
            break;
        case 'tree':
            cmdTree(args);
            break;
        case 'clear':
        case 'cls':
            clearScreen();
            break;
        case 'whoami':
            cmdWhoami();
            break;
        case 'date':
            cmdDate();
            break;
        case 'echo':
            cmdEcho(args);
            break;
        case 'music':
            cmdMusic(args);
            break;
        case 'banner':
            cmdBanner();
            break;
        case 'snake':
            cmdSnake();
            break;
        case 'history':
            cmdHistory();
            break;
        case 'about':
            cmdAbout();
            break;
        case '':
            break;
        default:
            addOutput(`Command not found: ${escapeHtml(command)}. Type 'help' for available commands.`, 'error');
    }

    // Scroll to bottom
    scrollToBottom();
}

/**
 * Command: help
 */
function cmdHelp() {
    const helpText = `
<div class="help-section">
    <h3>Available Commands:</h3>
    
    <div class="command-group">
        <h4>📁 File System Navigation:</h4>
        <div class="command-item"><span class="cmd">ls</span> <span class="args">[-a]</span> - List directory contents (-a shows hidden files)</div>
        <div class="command-item"><span class="cmd">cd</span> <span class="args">&lt;dir&gt;</span> - Change directory</div>
        <div class="command-item"><span class="cmd">pwd</span> - Print working directory</div>
        <div class="command-item"><span class="cmd">cat</span> <span class="args">&lt;file&gt;</span> - Display file contents</div>
        <div class="command-item"><span class="cmd">open</span> <span class="args">&lt;file&gt;</span> - Open PDFs and images in viewer</div>
        <div class="command-item"><span class="cmd">tree</span> <span class="args">[-a]</span> - Display directory tree (-a shows hidden files)</div>
    </div>

    <div class="command-group">
        <h4>ℹ️ Information:</h4>
        <div class="command-item"><span class="cmd">help</span> - Show this help message</div>
        <div class="command-item"><span class="cmd">about</span> - About this portfolio</div>
        <div class="command-item"><span class="cmd">whoami</span> - Display current user</div>
        <div class="command-item"><span class="cmd">date</span> - Display current date and time</div>
    </div>

    <div class="command-group">
        <h4>🛠️ Utilities:</h4>
        <div class="command-item"><span class="cmd">echo</span> <span class="args">&lt;text&gt;</span> - Print text to output</div>
        <div class="command-item"><span class="cmd">clear</span> - Clear the terminal screen</div>
        <div class="command-item"><span class="cmd">history</span> - Show command history</div>
    </div>

    <div class="command-group">
        <h4>🎮 Fun Features (Coming Soon):</h4>
        <div class="command-item"><span class="cmd">music</span> <span class="args">[play|pause|list]</span> - Control music player</div>
        <div class="command-item"><span class="cmd">banner</span> - Display animated ASCII art</div>
        <div class="command-item"><span class="cmd">snake</span> - Play Snake game</div>
    </div>

    <div class="command-group">
        <h4>⌨️ Keyboard Shortcuts:</h4>
        <div class="command-item"><span class="cmd">↑/↓</span> - Navigate command history</div>
        <div class="command-item"><span class="cmd">Tab</span> - Autocomplete file/directory names</div>
        <div class="command-item"><span class="cmd">Ctrl+L</span> - Clear screen</div>
    </div>
</div>
    `;
    addOutput(helpText, 'info');
}

/**
 * Command: ls
 */
function cmdLs(args) {
    const showHidden = args.includes('-a') || args.includes('--all');
    const items = fs.list(showHidden);
    
    if (items.length === 0) {
        addOutput('(empty directory)', 'info');
        return;
    }

    let output = '<div class="ls-output">';
    items.forEach(item => {
        const isDir = fs.isDirectory(item);
        const icon = isDir ? '📁' : '📄';
        const className = isDir ? 'directory' : 'file';
        const hidden = item.startsWith('.') ? ' hidden' : '';
        output += `<span class="${className}${hidden}">${icon} ${escapeHtml(item)}</span>`;
    });
    output += '</div>';
    
    addOutput(output, 'success');
}

/**
 * Command: cd
 */
function cmdCd(args) {
    if (args.length === 0) {
        // Go to root
        fs.changeDirectory('/');
        updatePrompt();
        return;
    }

    const path = args[0];
    const success = fs.changeDirectory(path);
    
    if (success) {
        updatePrompt();
    } else {
        addOutput(`cd: ${escapeHtml(path)}: No such directory`, 'error');
    }
}

/**
 * Command: pwd
 */
function cmdPwd() {
    const path = fs.getCurrentPathString() || '/';
    addOutput(path, 'success');
}

/**
 * Command: cat
 */
function cmdCat(args) {
    if (args.length === 0) {
        addOutput('cat: missing file operand', 'error');
        return;
    }

    const filename = args[0];
    
    if (fs.isDirectory(filename)) {
        addOutput(`cat: ${escapeHtml(filename)}: Is a directory`, 'error');
        return;
    }

    const content = fs.getFile(filename);
    
    if (content === null) {
        addOutput(`cat: ${escapeHtml(filename)}: No such file`, 'error');
        return;
    }

    // Check if it's a media file (path to media or portfolio-source)
    if (content.startsWith('media/') || content.startsWith('portfolio-source/')) {
        handleMediaFile(filename, content);
        return;
    }

    // Display text content
    addOutput(`<pre class="file-content">${escapeHtml(content)}</pre>`, 'success');
}

/**
 * Command: open
 * Opens PDFs and images in a separate viewer window
 */
function cmdOpen(args) {
    if (args.length === 0) {
        addOutput('open: missing file operand', 'error');
        addOutput('Usage: open &lt;filename&gt;', 'info');
        return;
    }

    const filename = args[0];
    
    if (fs.isDirectory(filename)) {
        addOutput(`open: ${escapeHtml(filename)}: Is a directory`, 'error');
        return;
    }

    const content = fs.getFile(filename);
    
    if (content === null) {
        addOutput(`open: ${escapeHtml(filename)}: No such file`, 'error');
        return;
    }

    // Check if it's a media file (path to media or portfolio-source)
    if (!content.startsWith('media/') && !content.startsWith('portfolio-source/')) {
        addOutput(`open: ${escapeHtml(filename)}: Cannot open text files in viewer. Use 'cat' instead.`, 'error');
        return;
    }

    // Determine file type
    const extension = filename.split('.').pop().toLowerCase();
    const supportedFormats = {
        pdf: ['pdf'],
        image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
    };

    let fileType = null;
    if (supportedFormats.pdf.includes(extension)) {
        fileType = 'pdf';
    } else if (supportedFormats.image.includes(extension)) {
        fileType = 'image';
    } else {
        addOutput(`open: ${escapeHtml(filename)}: Unsupported file format. Only PDFs and images are supported.`, 'error');
        return;
    }

    // Open in viewer
    openInViewer(content, filename, fileType);
    addOutput(`Opening ${escapeHtml(filename)} in viewer...`, 'success');
}

/**
 * Open file in viewer window
 */
function openInViewer(filePath, fileName, fileType) {
    const viewerWindow = document.getElementById('viewer-window');
    const viewerTitle = document.getElementById('viewer-title');
    const viewerIframe = document.getElementById('viewer-iframe');
    const viewerImage = document.getElementById('viewer-image');
    const viewerApp = document.getElementById('viewer-app');
    
    // Update title
    viewerTitle.textContent = fileName;
    
    // Show appropriate viewer
    if (fileType === 'pdf') {
        viewerIframe.src = filePath;
        viewerIframe.style.display = 'block';
        viewerImage.style.display = 'none';
    } else if (fileType === 'image') {
        viewerImage.src = filePath;
        viewerImage.style.display = 'block';
        viewerIframe.style.display = 'none';
    }
    
    // Show viewer window
    viewerWindow.classList.remove('closed');
    viewerWindow.classList.remove('minimized');
    
    // Show viewer app in dock
    viewerApp.style.display = 'flex';
    viewerApp.classList.add('active');
}

/**
 * Handle media files
 */
function handleMediaFile(filename, path) {
    const ext = filename.split('.').pop().toLowerCase();
    
    // Audio files
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
        const audio = `
            <div class="media-container">
                <p>🎵 Audio file: ${escapeHtml(filename)}</p>
                <audio controls src="${path}">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
        addOutput(audio, 'success');
    }
    // Image files
    else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        const image = `
            <div class="media-container">
                <p>🖼️ Image file: ${escapeHtml(filename)}</p>
                <img src="${path}" alt="${escapeHtml(filename)}" style="max-width: 100%; height: auto;">
            </div>
        `;
        addOutput(image, 'success');
    }
    // PDF files
    else if (ext === 'pdf') {
        const pdf = `
            <div class="media-container">
                <p>📄 PDF file: ${escapeHtml(filename)}</p>
                <p><a href="${path}" target="_blank" class="file-link">Open PDF in new tab</a></p>
                <embed src="${path}" type="application/pdf" width="100%" height="600px">
            </div>
        `;
        addOutput(pdf, 'success');
    }
    // Other media
    else {
        addOutput(`Media file: <a href="${path}" target="_blank" class="file-link">${escapeHtml(filename)}</a>`, 'success');
    }
}

/**
 * Command: tree
 */
function cmdTree(args) {
    const showHidden = args.includes('-a') || args.includes('--all');
    const currentPath = fs.getCurrentPathString() || '/';
    
    let output = `<pre class="tree-output">${escapeHtml(currentPath)}\n`;
    output += fs.generateTree(fs.getCurrentDir(), '', true, showHidden);
    output += '</pre>';
    
    addOutput(output, 'success');
}

/**
 * Command: whoami
 */
function cmdWhoami() {
    addOutput('guest', 'success');
}

/**
 * Command: date
 */
function cmdDate() {
    const now = new Date();
    addOutput(now.toString(), 'success');
}

/**
 * Command: echo
 */
function cmdEcho(args) {
    addOutput(escapeHtml(args.join(' ')), 'success');
}

/**
 * Command: history
 */
function cmdHistory() {
    if (commandHistory.length === 0) {
        addOutput('(no commands in history)', 'info');
        return;
    }

    let output = '<div class="history-output">';
    commandHistory.forEach((cmd, index) => {
        output += `<div>${index + 1}  ${escapeHtml(cmd)}</div>`;
    });
    output += '</div>';
    
    addOutput(output, 'success');
}

/**
 * Command: about
 */
function cmdAbout() {
    const aboutText = `
<div class="about-section">
    <h3>About This Portfolio</h3>
    <p>This is an interactive terminal-based portfolio website built with:</p>
    <ul>
        <li>📦 <strong>Modular Design:</strong> Content loaded from JSON filesystem</li>
        <li>🐍 <strong>Python Generator:</strong> Automatic JSON generation from source files</li>
        <li>⚡ <strong>Pure Frontend:</strong> No backend required - runs entirely in browser</li>
        <li>🎨 <strong>Terminal UI:</strong> Authentic command-line experience</li>
    </ul>
    <p>To update content: Edit files in <code>portfolio-source/</code> and run <code>python generate_fs.py</code></p>
    <br>
    <p>Explore the filesystem with <code>ls</code>, <code>cd</code>, and <code>cat</code> commands!</p>
</div>
    `;
    addOutput(aboutText, 'info');
}

/**
 * Command: music (placeholder)
 */
function cmdMusic(args) {
    const subcommand = args[0] || 'help';
    
    switch (subcommand) {
        case 'play':
            addOutput('🎵 Music feature coming soon! Stay tuned.', 'info');
            break;
        case 'pause':
            addOutput('🎵 Music feature coming soon! Stay tuned.', 'info');
            break;
        case 'list':
            addOutput('🎵 Music feature coming soon! Stay tuned.', 'info');
            break;
        default:
            addOutput('Usage: music [play|pause|list]', 'info');
    }
}

/**
 * Command: banner (placeholder)
 */
function cmdBanner() {
    addOutput('🎨 Animated banner feature coming soon! Stay tuned.', 'info');
}

/**
 * Command: snake (placeholder)
 */
function cmdSnake() {
    addOutput('🐍 Snake game coming soon! Stay tuned.', 'info');
}

/**
 * Clear screen
 */
function clearScreen() {
    output.innerHTML = '';
}

/**
 * Add output to terminal
 */
function addOutput(text, type = 'default') {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.innerHTML = text;
    output.appendChild(line);
}

/**
 * Update prompt with current directory
 */
function updatePrompt() {
    const path = fs.getCurrentPathString() || '~';
    const displayPath = path === '/' ? '~' : '~' + path;
    prompt.innerHTML = `<span class="coffee-mug">C|_|</span>:${displayPath} armin$`;
}

/**
 * Scroll to bottom of terminal
 */
function scrollToBottom() {
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

