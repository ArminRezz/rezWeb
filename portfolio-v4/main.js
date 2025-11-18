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
let termConfig = {
    banner_name: 'name1.html',
    banner_image: 'bimage1.html',
    opacity: 100,
    theme: 'earth',
    quote: 'asimov'
};

let audioJunkieConfig = {
    opacity: 100,
    theme: 'earth',
    visualizer: 'linear'
};

let dockConfig = {
    opacity: 100,
    theme: 'earth'
};

let arminOSConfig = {
    bg_img: 'core',
    theme: 'earth'
};

// DOM elements
let input, output, prompt;

// Input state
let waitingForJSONInput = false;

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
    
    // Load terminal config and render banner
    await loadTermConfig();
    await renderBanner();
    await renderQuote();
    
    // Load Audio Junkie config
    await loadAudioJunkieConfig();
    
    // Load dock config
    await loadDockConfig();
    
    // Load arminOS config
    await loadArminOSConfig();
    
    // Ensure audio window starts closed (clear any inline styles)
    const audioWindow = document.getElementById('audio-window');
    if (audioWindow) {
        audioWindow.classList.add('closed');
        audioWindow.style.opacity = '';
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
    
    // Setup audio window controls
    setupAudioControls();
    
    // Make windows draggable
    makeDraggable(document.querySelector('.terminal-window'), document.querySelector('.terminal-window .terminal-header'));
    makeDraggable(document.getElementById('viewer-window'), document.querySelector('#viewer-window .terminal-header'));
    makeDraggable(document.getElementById('audio-window'), document.querySelector('#audio-window .terminal-header'));
    
    // Setup dock
    setupDock();
    
    // Update prompt
    updatePrompt();
}

/**
 * Load terminal configuration from .term file
 */
async function loadTermConfig() {
    const termFile = fs.getFile('.term');
    
    if (termFile && !termFile.startsWith('media/') && !termFile.startsWith('portfolio-source/')) {
        // Parse .term file
        const lines = termFile.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed.startsWith('#')) continue;
            
            const [key, value] = trimmed.split('=').map(s => s.trim());
            if (key && value) {
                // Handle numeric values
                if (key === 'opacity') {
                    termConfig[key] = parseInt(value) || 100;
                } else if (key === 'theme') {
                    termConfig[key] = value || 'earth';
                } else if (key === 'quote') {
                    termConfig[key] = value || 'asimov';
                } else {
                    termConfig[key] = value;
                }
            }
        }
    }
    
    // Apply opacity and theme after loading config
    // Note: renderQuote is called separately in init() after renderBanner()
    applyOpacity();
    await applyTermTheme();
}

/**
 * Load Audio Junkie configuration from .audiojunkie file
 */
async function loadAudioJunkieConfig() {
    const audioJunkieFile = fs.getFile('.audiojunkie');
    
    if (audioJunkieFile && !audioJunkieFile.startsWith('media/') && !audioJunkieFile.startsWith('portfolio-source/')) {
        // Parse .audiojunkie file
        const lines = audioJunkieFile.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed.startsWith('#')) continue;
            
            const [key, value] = trimmed.split('=').map(s => s.trim());
            if (key && value) {
                // Handle numeric values
            if (key === 'opacity') {
                audioJunkieConfig[key] = parseInt(value) || 100;
            } else if (key === 'theme') {
                audioJunkieConfig[key] = value || 'earth';
            } else if (key === 'visualizer') {
                audioJunkieConfig[key] = value || 'linear';
            } else {
                audioJunkieConfig[key] = value;
            }
            }
        }
    }
    
    // Apply opacity and theme after loading config
    applyAudioJunkieOpacity();
    applyAudioJunkieTheme();
}

/**
 * Load arminOS configuration from .arminOS file
 */
async function loadArminOSConfig() {
    const arminOSFile = fs.getFile('.arminOS');
    
    if (arminOSFile && !arminOSFile.startsWith('media/') && !arminOSFile.startsWith('portfolio-source/')) {
        // Parse .arminOS file
        const lines = arminOSFile.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed.startsWith('#')) continue;
            
            const [key, value] = trimmed.split('=').map(s => s.trim());
            if (key && value) {
                if (key === 'bg_img') {
                    arminOSConfig[key] = value || 'core';
                } else if (key === 'theme') {
                    arminOSConfig[key] = value || 'earth';
                } else {
                    arminOSConfig[key] = value;
                }
            }
        }
    }
    
    // Apply background image and theme after loading config
    applyBackgroundImage();
    await applyOSTheme();
}

/**
 * Apply background image based on config
 */
function applyBackgroundImage() {
    const body = document.body;
    if (!body) return;
    
    const bgImg = arminOSConfig.bg_img || 'core';
    
    // Remove existing background classes
    body.classList.remove('bg-core', 'bg-sky');
    
    // Add new background class
    body.classList.add(`bg-${bgImg}`);
}

/**
 * Apply overall OS theme (affects term, audiojunkie, and dock)
 */
async function applyOSTheme() {
    const theme = arminOSConfig.theme || 'earth';
    
    // Automatically set bg_img based on theme
    if (theme === 'water') {
        arminOSConfig.bg_img = 'sky';
    } else if (theme === 'earth') {
        arminOSConfig.bg_img = 'core';
    }
    
    // Apply background image
    applyBackgroundImage();
    
    // Apply theme to all components
    termConfig.theme = theme;
    audioJunkieConfig.theme = theme;
    dockConfig.theme = theme;
    
    // Auto-set quote based on theme
    termConfig.quote = theme === 'water' ? 'watts' : 'asimov';
    
    // Apply all themes
    await applyTermTheme();
    applyAudioJunkieTheme();
    applyDockTheme();
    
    // Update all config files
    updateTermFile();
    updateAudioJunkieFile();
    updateDockFile();
}

/**
 * Load dock configuration from .dock file
 */
async function loadDockConfig() {
    const dockFile = fs.getFile('.dock');
    
    if (dockFile && !dockFile.startsWith('media/') && !dockFile.startsWith('portfolio-source/')) {
        // Parse .dock file
        const lines = dockFile.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed.startsWith('#')) continue;
            
            const [key, value] = trimmed.split('=').map(s => s.trim());
            if (key && value) {
                if (key === 'opacity') {
                    dockConfig[key] = parseInt(value) || 100;
                } else if (key === 'theme') {
                    dockConfig[key] = value || 'earth';
                } else {
                    dockConfig[key] = value;
                }
            }
        }
    }
    
    // Apply opacity and theme after loading config
    applyDockOpacity();
    applyDockTheme();
}

/**
 * Apply opacity to terminal window
 */
function applyOpacity() {
    const terminalWindow = document.querySelector('.terminal-window');
    if (!terminalWindow) return;
    
    const opacityValue = termConfig.opacity || 100;
    // Convert 0-100 to 0-1 opacity (0 = fully transparent, 100 = fully opaque)
    const opacity = opacityValue / 100;
    terminalWindow.style.opacity = opacity;
}

/**
 * Apply theme to terminal window
 */
async function applyTermTheme() {
    const terminalWindow = document.querySelector('.terminal-window');
    if (!terminalWindow) return;
    
    const theme = termConfig.theme || 'earth';
    
    // Remove existing theme classes
    terminalWindow.classList.remove('theme-earth', 'theme-water');
    
    // Add new theme class
    terminalWindow.classList.add(`theme-${theme}`);
    
    // Automatically update quote based on theme
    if (theme === 'water') {
        termConfig.quote = 'watts';
    } else {
        termConfig.quote = 'asimov';
    }
    
    // Update prompt icon based on theme
    updatePrompt();
    
    // Re-render quote with new theme quote
    await renderQuote();
}

/**
 * Apply opacity to Audio Junkie window
 */
function applyAudioJunkieOpacity() {
    const audioWindow = document.getElementById('audio-window');
    if (!audioWindow) return;
    
    // Only apply opacity if window is not closed
    if (audioWindow.classList.contains('closed')) {
        return;
    }
    
    const opacityValue = audioJunkieConfig.opacity || 100;
    // Convert 0-100 to 0-1 opacity (0 = fully transparent, 100 = fully opaque)
    const opacity = opacityValue / 100;
    audioWindow.style.opacity = opacity;
}

/**
 * Apply theme to Audio Junkie window
 */
function applyAudioJunkieTheme() {
    const audioWindow = document.getElementById('audio-window');
    if (!audioWindow) return;
    
    const theme = audioJunkieConfig.theme || 'earth';
    
    // Remove existing theme classes
    audioWindow.classList.remove('theme-earth', 'theme-water');
    
    // Add new theme class
    audioWindow.classList.add(`theme-${theme}`);
}

/**
 * Apply opacity to dock
 */
function applyDockOpacity() {
    const dock = document.querySelector('.dock');
    if (!dock) return;
    
    const opacityValue = dockConfig.opacity || 100;
    // Convert 0-100 to 0-1 opacity (0 = fully transparent, 100 = fully opaque)
    const opacity = opacityValue / 100;
    dock.style.opacity = opacity;
}

/**
 * Apply theme to dock
 */
function applyDockTheme() {
    const dock = document.querySelector('.dock');
    if (!dock) return;
    
    const theme = dockConfig.theme || 'earth';
    
    // Remove existing theme classes
    dock.classList.remove('theme-earth', 'theme-water');
    
    // Add new theme class
    dock.classList.add(`theme-${theme}`);
    
    // Update dock icons based on theme
    updateDockIcons(theme);
}

/**
 * Update dock icons based on theme
 */
function updateDockIcons(theme) {
    const icons = {
        terminal: theme === 'water' ? '🌊' : '💻',
        viewer: theme === 'water' ? '📘' : '📄',
        audio: theme === 'water' ? '🎧' : '🎵',
        github: theme === 'water' ? '🐋' : '🐙',
        linkedin: theme === 'water' ? '💧' : '💼'
    };
    
    const terminalIcon = document.querySelector('#terminal-app .icon');
    const viewerIcon = document.querySelector('#viewer-app .icon');
    const audioIcon = document.querySelector('#audio-app .icon');
    const githubIcon = document.querySelector('a[href*="github"] .icon');
    const linkedinIcon = document.querySelector('a[href*="linkedin"] .icon');
    
    if (terminalIcon) terminalIcon.textContent = icons.terminal;
    if (viewerIcon) viewerIcon.textContent = icons.viewer;
    if (audioIcon) audioIcon.textContent = icons.audio;
    if (githubIcon) githubIcon.textContent = icons.github;
    if (linkedinIcon) linkedinIcon.textContent = icons.linkedin;
}

/**
 * Render the banner based on current config
 */
async function renderBanner() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (!welcomeMessage) return;
    
    // Clear current banner (except welcome text at bottom)
    const welcomeText = welcomeMessage.querySelector('.welcome-text');
    welcomeMessage.innerHTML = '';
    
    try {
        // Load banner name
        const nameContent = await loadThemeFile(termConfig.banner_name);
        if (nameContent) {
            const nameElement = document.createElement('pre');
            nameElement.className = 'ascii-art';
            // Add data attribute for theme-specific styling
            const themeName = termConfig.banner_name.replace('.html', '');
            nameElement.setAttribute('data-theme', themeName);
            nameElement.innerHTML = nameContent;
            welcomeMessage.appendChild(nameElement);
        }
        
        // Load banner image
        const imageContent = await loadThemeFile(termConfig.banner_image);
        if (imageContent) {
            const imageElement = document.createElement('pre');
            imageElement.className = 'ascii-art rocket-art';
            // Add data attribute for theme-specific styling
            const themeImage = termConfig.banner_image.replace('.html', '');
            imageElement.setAttribute('data-theme', themeImage);
            imageElement.innerHTML = imageContent;
            welcomeMessage.appendChild(imageElement);
        }
        
        // Re-add welcome text
        if (welcomeText) {
            welcomeMessage.appendChild(welcomeText);
        }
    } catch (error) {
        console.error('Error rendering banner:', error);
    }
}

/**
 * Render the quote based on current config
 */
async function renderQuote() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (!welcomeMessage) return;
    
    // Remove existing quote if present
    const existingQuote = welcomeMessage.querySelector('.quote-display');
    if (existingQuote) {
        existingQuote.remove();
    }
    
    try {
        const quoteName = termConfig.quote || 'asimov';
        const quotePath = `quotes/${quoteName}.txt`;
        
        // Get quote from filesystem
        const quoteResult = resolveFilePath(quotePath);
        if (!quoteResult.success || !quoteResult.content) {
            console.error('Quote file not found:', quotePath);
            return;
        }
        
        // Parse quote content (handle markdown links)
        const quoteContent = quoteResult.content.trim();
        const lines = quoteContent.split('\n').filter(line => line.trim() !== '');
        const quoteText = lines[0] || '';
        const quoteAuthor = lines.length > 1 ? lines[1] : '';
        
        // Create quote element
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote-display';
        
        const quoteTextEl = document.createElement('p');
        quoteTextEl.className = 'quote-text';
        quoteTextEl.textContent = `"${quoteText}"`;
        
        const quoteAuthorEl = document.createElement('p');
        quoteAuthorEl.className = 'quote-author';
        // Parse markdown link if present
        let authorText = '';
        if (quoteAuthor.includes('[') && quoteAuthor.includes('](')) {
            const linkMatch = quoteAuthor.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
                const linkText = linkMatch[1];
                const linkUrl = linkMatch[2];
                authorText = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkText)}</a>`;
            } else {
                authorText = escapeHtml(quoteAuthor);
            }
        } else {
            authorText = escapeHtml(quoteAuthor);
        }
        quoteAuthorEl.innerHTML = `— ${authorText}`;
        
        quoteElement.appendChild(quoteTextEl);
        quoteElement.appendChild(quoteAuthorEl);
        
        // Insert quote before welcome text
        const welcomeText = welcomeMessage.querySelector('.welcome-text');
        if (welcomeText) {
            welcomeMessage.insertBefore(quoteElement, welcomeText);
        } else {
            welcomeMessage.appendChild(quoteElement);
        }
    } catch (error) {
        console.error('Error rendering quote:', error);
    }
}

/**
 * Load a theme file from the themes folder
 */
async function loadThemeFile(filename) {
    if (!filename) return null;
    
    // Navigate to themes folder
    const savedPath = [...fs.currentPath];
    fs.currentPath = [];
    
    if (!fs.changeDirectory('themes')) {
        fs.currentPath = savedPath;
        return null;
    }
    
    const content = fs.getFile(filename);
    fs.currentPath = savedPath;
    
    if (!content || content.startsWith('media/') || content.startsWith('portfolio-source/')) {
        return null;
    }
    
    return content;
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
 * Setup audio window controls and player
 */
function setupAudioControls() {
    const audioWindow = document.getElementById('audio-window');
    const audioApp = document.getElementById('audio-app');
    const closeBtn = audioWindow.querySelector('.btn-close');
    const minimizeBtn = audioWindow.querySelector('.btn-minimize');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');
    
    // Audio visualization setup
    let audioContext;
    let analyser;
    let dataArray;
    let bufferLength;
    let animationId;
    
    // Close button - stop music and hide window
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioWindow.classList.add('closed');
        // Clear inline styles so CSS closed state takes over
        audioWindow.style.opacity = '';
        audioWindow.style.pointerEvents = '';
        audioApp.style.display = 'none';
        audioApp.classList.remove('active');
        
        // Stop visualization
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    // Minimize button - just hide window, keep playing
    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMinimizing = !audioWindow.classList.contains('minimized');
        audioWindow.classList.toggle('minimized');
        
        if (isMinimizing) {
            // Clear inline styles when minimizing
            audioWindow.style.opacity = '';
            audioWindow.style.pointerEvents = '';
            audioApp.classList.remove('active');
        } else {
            // Restore when un-minimizing
            audioWindow.style.pointerEvents = 'auto';
            applyAudioJunkieOpacity();
            applyAudioJunkieTheme();
            audioApp.classList.add('active');
        }
    });
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    });
    
    // Progress bar click to seek
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    // Update progress bar
    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    });
    
    // Set total time when metadata loads
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(audioPlayer.duration);
    });
    
    // Reset when song ends
    audioPlayer.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶️';
        progressFill.style.width = '0%';
    });
    
    // Setup audio visualization
    function setupVisualization() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audioPlayer);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        }
        visualize();
    }
    
    // Visualization animation
    function visualize() {
        const canvas = document.getElementById('audio-visualizer');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Pulse visualizer: store history for scrolling effect (persists across frames)
        let pulseHistory = [];
        let maxHistoryLength = canvas.width;
        
        function draw() {
            // Update max history length if canvas resized
            maxHistoryLength = canvas.width;
            animationId = requestAnimationFrame(draw);
            
            analyser.getByteFrequencyData(dataArray);
            
            // Get theme-specific colors
            const theme = audioJunkieConfig.theme || 'earth';
            const visualizerType = audioJunkieConfig.visualizer || 'linear';
            let bgColor, lineColor, glowColor;
            
            if (theme === 'water') {
                bgColor = 'rgba(10, 14, 39, 0.3)';
                lineColor = '#00d4ff';
                glowColor = 'rgba(138, 43, 226, 0.6)';
            } else { // earth (default)
                bgColor = 'rgba(26, 26, 46, 0.3)';
                lineColor = '#00ff00';
                glowColor = 'rgba(0, 255, 0, 0.5)';
            }
            
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if (visualizerType === 'pulse') {
                // Pulse visualizer (heart monitor style)
                // Calculate average frequency for the pulse line
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;
                const normalizedValue = average / 255;
                
                // Center line position (middle of canvas)
                const centerY = canvas.height / 2;
                
                // Calculate pulse height (positive and negative from center)
                // Use a more dynamic range for better visualization
                const pulseHeight = (normalizedValue - 0.5) * canvas.height * 0.6;
                
                // Add current value to history (scrolls from right to left)
                pulseHistory.push(pulseHeight);
                if (pulseHistory.length > maxHistoryLength) {
                    pulseHistory.shift();
                }
                
                // Draw center reference line first (subtle grid line)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, centerY);
                ctx.lineTo(canvas.width, centerY);
                ctx.stroke();
                
                // Draw the pulse line (heart monitor style)
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 2.5;
                ctx.shadowBlur = 15;
                ctx.shadowColor = lineColor;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.beginPath();
                
                // Draw from right to left (newest data on right, scrolling left)
                const startX = canvas.width - pulseHistory.length;
                for (let i = 0; i < pulseHistory.length; i++) {
                    const x = startX + i;
                    const y = centerY - pulseHistory[i];
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.stroke();
                ctx.shadowBlur = 0;
            } else {
                // Linear visualizer (bars)
                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;
                
                for (let i = 0; i < bufferLength; i++) {
                    barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
                    
                    // Theme-specific bar colors
                    if (theme === 'water') {
                        // Water theme: cyan to purple gradient based on intensity
                        const intensity = dataArray[i] / 255;
                        const r = Math.floor(intensity * 138 + (1 - intensity) * 0);   // 0 to 138 (purple)
                        const g = Math.floor(intensity * 43 + (1 - intensity) * 212);   // 212 to 43 (cyan to purple)
                        const b = Math.floor(intensity * 226 + (1 - intensity) * 255);  // 255 to 226 (cyan to purple)
                        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    } else {
                        // Earth theme: green gradient
                        const green = Math.floor((dataArray[i] / 255) * 200 + 55);
                        ctx.fillStyle = `rgb(0, ${green}, 0)`;
                    }
                    
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    
                    x += barWidth + 1;
                }
            }
        }
        
        draw();
    }
    
    // Start visualization when audio plays
    audioPlayer.addEventListener('play', () => {
        if (!audioContext) {
            setupVisualization();
        } else if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    });
    
    // Format time helper
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
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
    
    // Audio app - reopen audio window
    const audioApp = document.getElementById('audio-app');
    const audioWindow = document.getElementById('audio-window');
    
    audioApp.addEventListener('click', (e) => {
        e.stopPropagation();
        audioWindow.classList.remove('closed');
        audioWindow.classList.remove('minimized');
        // Restore pointer events
        audioWindow.style.pointerEvents = 'auto';
        // Apply opacity and theme
        applyAudioJunkieOpacity();
        applyAudioJunkieTheme();
        audioApp.classList.add('active');
    });
}

/**
 * Handle keyboard input
 */
async function handleKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = input.value.trim();
        
        if (command) {
            // Add to history
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Display command
            addOutput(`<span class="prompt">${prompt.textContent}</span> ${escapeHtml(command)}`, 'input');
            
            // Check if waiting for JSON input
            if (waitingForJSONInput) {
                // Check if it's a command (starts with a letter, not JSON)
                if (command.match(/^[a-z]/i) && !command.trim().startsWith('{')) {
                    // User typed a command, cancel JSON input mode
                    waitingForJSONInput = false;
                    addOutput('JSON input mode cancelled.', 'info');
                    await executeCommand(command);
                } else {
                    // Treat as JSON input
                    await handleJSONInput(command);
                }
                input.value = '';
                return;
            }
            
            // Execute command
            await executeCommand(command);
        } else {
            if (waitingForJSONInput) {
                addOutput('Error: JSON input expected. Paste your JSON config.', 'error');
                addOutput('Or type any command to cancel.', 'info');
            } else {
                addOutput(`<span class="prompt">${prompt.textContent}</span>`, 'input');
            }
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
async function executeCommand(commandLine) {
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
        case 'config':
            await cmdConfig(args);
            break;
            
        case 'bclear':
            cmdBclear(args);
            break;
        case 'wormhole':
            cmdWormhole(args);
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
    <div class="command-group">
        <h4>📁 File System:</h4>
        <div class="command-item"><span class="cmd">ls</span> <span class="args">[-a]</span> - List directory contents (-a shows hidden files)</div>
        <div class="command-item"><span class="cmd">cd</span> <span class="args">&lt;dir&gt;</span> - Change directory</div>
        <div class="command-item"><span class="cmd">pwd</span> - Print working directory</div>
        <div class="command-item"><span class="cmd">tree</span> <span class="args">[-a]</span> - Display directory tree (-a shows hidden files)</div>
    </div>

    <div class="command-group">
        <h4>📄 File Operations:</h4>
        <div class="command-item"><span class="cmd">cat</span> <span class="args">&lt;path/file&gt;</span> - Display file contents</div>
        <div class="command-item"><span class="cmd">open</span> <span class="args">&lt;path/file&gt;</span> - Open PDFs, images, and audio files</div>
    </div>

    <div class="command-group">
        <h4>ℹ️ Information:</h4>
        <div class="command-item"><span class="cmd">help</span> - Show this help message</div>
        <div class="command-item"><span class="cmd">about</span> - About this portfolio</div>
        <div class="command-item"><span class="cmd">config</span> <span class="args">[category] [setting] [value]</span> - View/change terminal themes (try <span class="cmd">config -help</span>)</div>
        <div class="command-item"><span class="cmd">whoami</span> - Display current user</div>
        <div class="command-item"><span class="cmd">date</span> - Display current date and time</div>
    </div>

    <div class="command-group">
        <h4>🛠️ Utilities:</h4>
        <div class="command-item"><span class="cmd">echo</span> <span class="args">&lt;text&gt;</span> - Print text to output</div>
        <div class="command-item"><span class="cmd">clear</span> - Clear the terminal screen</div>
        <div class="command-item"><span class="cmd">bclear</span> <span class="args">[-r]</span> - Clear banner (-r to restore)</div>
        <div class="command-item"><span class="cmd">wormhole</span> - Display wormhole (drag & drop JSON file)</div>
        <div class="command-item"><span class="cmd">wormhole -t</span> - Interactive mode (paste JSON in next command)</div>
        <div class="command-item"><span class="cmd">history</span> - Show command history</div>
    </div>

    <div class="command-group">
        <h4>⌨️ Keyboard Shortcuts:</h4>
        <div class="command-item"><span class="cmd">↑/↓</span> - Navigate command history</div>
        <div class="command-item"><span class="cmd">Tab</span> - Autocomplete file/directory names</div>
    </div>
    
    <div class="command-group">
        <h4>💡 Tips:</h4>
        <div class="command-item">• Use paths like <span class="cmd">open Media/lofi.mp3</span></div>
        <div class="command-item">• PDFs open in Document Viewer <span class="cmd">open Resume/resume.pdf</span></div>
        <div class="command-item">• Audio files open in Audio Junkie player</div>
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
 * Helper: Resolve file path (handles both relative and absolute paths)
 */
function resolveFilePath(filepath) {
    // If it's just a filename (no slashes), use current directory
    if (!filepath.includes('/')) {
        if (fs.isDirectory(filepath)) {
            return { success: false, error: 'Is a directory' };
        }
        
        const content = fs.getFile(filepath);
        if (content === null) {
            return { success: false, error: 'No such file' };
        }
        
        return { success: true, content, filename: filepath };
    }
    
    // Handle paths with directories
    const parts = filepath.split('/').filter(p => p !== '');
    const filename = parts[parts.length - 1];
    const dirPath = parts.slice(0, -1);
    
    // Save current directory
    const savedPath = [...fs.currentPath];
    
    // Navigate to target directory
    if (filepath.startsWith('/')) {
        // Absolute path
        fs.currentPath = [];
    }
    
    // Navigate through directories
    for (const dir of dirPath) {
        if (!fs.changeDirectory(dir)) {
            // Restore original path
            fs.currentPath = savedPath;
            return { success: false, error: 'No such file or directory' };
        }
    }
    
    // Check if target is a directory
    if (fs.isDirectory(filename)) {
        fs.currentPath = savedPath;
        return { success: false, error: 'Is a directory' };
    }
    
    // Get the file
    const content = fs.getFile(filename);
    
    // Restore original path
    fs.currentPath = savedPath;
    
    if (content === null) {
        return { success: false, error: 'No such file' };
    }
    
    return { success: true, content, filename };
}

/**
 * Command: cat
 */
function cmdCat(args) {
    if (args.length === 0) {
        addOutput('cat: missing file operand', 'error');
        return;
    }

    const filepath = args[0];
    const result = resolveFilePath(filepath);
    
    if (!result.success) {
        addOutput(`cat: ${escapeHtml(filepath)}: ${result.error}`, 'error');
        return;
    }

    const { content, filename } = result;

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

    const filepath = args[0];
    const result = resolveFilePath(filepath);
    
    if (!result.success) {
        addOutput(`open: ${escapeHtml(filepath)}: ${result.error}`, 'error');
        return;
    }

    const { content, filename } = result;

    // Check if it's a media file (path to media or portfolio-source)
    if (!content.startsWith('media/') && !content.startsWith('portfolio-source/')) {
        addOutput(`open: ${escapeHtml(filepath)}: Cannot open text files in viewer. Use 'cat' instead.`, 'error');
        return;
    }

    // Determine file type
    const extension = filename.split('.').pop().toLowerCase();
    const supportedFormats = {
        pdf: ['pdf'],
        image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
        audio: ['mp3', 'wav', 'ogg', 'm4a']
    };

    let fileType = null;
    if (supportedFormats.pdf.includes(extension)) {
        fileType = 'pdf';
    } else if (supportedFormats.image.includes(extension)) {
        fileType = 'image';
    } else if (supportedFormats.audio.includes(extension)) {
        fileType = 'audio';
    } else {
        addOutput(`open: ${escapeHtml(filename)}: Unsupported file format. Only PDFs, images, and audio files are supported.`, 'error');
        return;
    }

    // Open in appropriate viewer
    if (fileType === 'audio') {
        openInAudioPlayer(content, filename);
        addOutput(`🎵 Opening ${escapeHtml(filename)} in Audio Junkie...`, 'success');
    } else {
        openInViewer(content, filename, fileType);
        addOutput(`Opening ${escapeHtml(filename)} in viewer...`, 'success');
    }
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
 * Open audio file in Audio Junkie player
 */
function openInAudioPlayer(filePath, fileName) {
    const audioWindow = document.getElementById('audio-window');
    const audioApp = document.getElementById('audio-app');
    const audioPlayer = document.getElementById('audio-player');
    const songNameEl = document.getElementById('song-name');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    // Update song name (remove extension)
    const displayName = fileName.replace(/\.[^/.]+$/, "");
    songNameEl.textContent = displayName;
    
    // Load audio file
    audioPlayer.src = filePath;
    audioPlayer.load();
    
    // Auto-play
    audioPlayer.play().catch(err => {
        console.log('Autoplay prevented, user needs to click play');
    });
    
    playPauseBtn.textContent = '⏸️';
    
    // Show audio window
    audioWindow.classList.remove('closed');
    audioWindow.classList.remove('minimized');
    
    // Restore pointer events and positioning
    audioWindow.style.pointerEvents = 'auto';
    
    // Apply opacity and theme
    applyAudioJunkieOpacity();
    applyAudioJunkieTheme();
    
    // Show audio app in dock
    audioApp.style.display = 'flex';
    audioApp.classList.add('active');
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
 * Reset a category to default values
 */
async function resetCategoryToDefaults(category) {
    if (category === 'term') {
        termConfig.banner_name = 'name1.html';
        termConfig.banner_image = 'bimage1.html';
        termConfig.opacity = 100;
        termConfig.theme = 'earth';
        termConfig.quote = 'asimov';
        await renderBanner();
        applyOpacity();
        await applyTermTheme();
        updateTermFile();
        
        addOutput(`✓ Terminal settings reset to defaults`, 'success');
        addOutput(`  banner_name=name1.html`, 'info');
        addOutput(`  banner_image=bimage1.html`, 'info');
        addOutput(`  opacity=100`, 'info');
        addOutput(`  theme=earth`, 'info');
        addOutput(`  quote=asimov`, 'info');
    } else if (category === 'audiojunkie') {
        audioJunkieConfig.opacity = 100;
        audioJunkieConfig.theme = 'earth';
        audioJunkieConfig.visualizer = 'linear';
        applyAudioJunkieOpacity();
        applyAudioJunkieTheme();
        updateAudioJunkieFile();
        
        addOutput(`✓ Audio Junkie settings reset to defaults`, 'success');
        addOutput(`  opacity=100`, 'info');
        addOutput(`  theme=earth`, 'info');
        addOutput(`  visualizer=linear`, 'info');
    } else if (category === 'dock') {
        dockConfig.opacity = 100;
        dockConfig.theme = 'earth';
        applyDockOpacity();
        applyDockTheme();
        updateDockFile();
        
        addOutput(`✓ Dock settings reset to defaults`, 'success');
        addOutput(`  opacity=100`, 'info');
        addOutput(`  theme=earth`, 'info');
    } else if (category === 'os') {
        arminOSConfig.bg_img = 'core';
        arminOSConfig.theme = 'earth';
        applyBackgroundImage();
        await applyOSTheme();
        updateArminOSFile();
        
        addOutput(`✓ OS settings reset to defaults`, 'success');
        addOutput(`  bg_img=core`, 'info');
        addOutput(`  theme=earth`, 'info');
    }
}

/**
 * Reset a single setting to its default value
 */
async function resetSettingToDefault(category, setting) {
    if (category === 'term') {
        if (setting === 'banner_name') {
            termConfig.banner_name = 'name1.html';
            await renderBanner();
            updateTermFile();
            addOutput(`✓ banner_name reset to default: name1.html`, 'success');
        } else if (setting === 'banner_image') {
            termConfig.banner_image = 'bimage1.html';
            await renderBanner();
            updateTermFile();
            addOutput(`✓ banner_image reset to default: bimage1.html`, 'success');
        } else if (setting === 'opacity') {
            termConfig.opacity = 100;
            applyOpacity();
            updateTermFile();
            addOutput(`✓ opacity reset to default: 100`, 'success');
        } else if (setting === 'theme') {
            termConfig.theme = 'earth';
            termConfig.quote = 'asimov'; // Auto-reset quote when theme resets
            await applyTermTheme();
            updateTermFile();
            addOutput(`✓ theme reset to default: earth`, 'success');
            addOutput(`✓ quote automatically reset to: asimov`, 'success');
        } else if (setting === 'quote') {
            termConfig.quote = 'asimov';
            await renderQuote();
            updateTermFile();
            addOutput(`✓ quote reset to default: asimov`, 'success');
        } else {
            addOutput(`Error: Unknown terminal setting '${escapeHtml(setting)}'`, 'error');
            addOutput('Available settings: banner_name, banner_image, opacity, theme, quote', 'info');
        }
    } else if (category === 'audiojunkie') {
        if (setting === 'opacity') {
            audioJunkieConfig.opacity = 100;
            applyAudioJunkieOpacity();
            updateAudioJunkieFile();
            addOutput(`✓ opacity reset to default: 100`, 'success');
        } else if (setting === 'theme') {
            audioJunkieConfig.theme = 'earth';
            applyAudioJunkieTheme();
            updateAudioJunkieFile();
            addOutput(`✓ theme reset to default: earth`, 'success');
        } else if (setting === 'visualizer') {
            audioJunkieConfig.visualizer = 'linear';
            updateAudioJunkieFile();
            addOutput(`✓ visualizer reset to default: linear`, 'success');
            addOutput(`Note: Restart audio playback to see the change`, 'info');
        } else {
            addOutput(`Error: Unknown Audio Junkie setting '${escapeHtml(setting)}'`, 'error');
            addOutput('Available settings: opacity, theme, visualizer', 'info');
        }
    } else if (category === 'dock') {
        if (setting === 'opacity') {
            dockConfig.opacity = 100;
            applyDockOpacity();
            updateDockFile();
            addOutput(`✓ opacity reset to default: 100`, 'success');
        } else if (setting === 'theme') {
            dockConfig.theme = 'earth';
            applyDockTheme();
            updateDockFile();
            addOutput(`✓ theme reset to default: earth`, 'success');
        } else {
            addOutput(`Error: Unknown dock setting '${escapeHtml(setting)}'`, 'error');
            addOutput('Available settings: opacity, theme', 'info');
        }
    } else if (category === 'os') {
        if (setting === 'bg_img') {
            arminOSConfig.bg_img = 'core';
            applyBackgroundImage();
            updateArminOSFile();
            addOutput(`✓ bg_img reset to default: core`, 'success');
        } else if (setting === 'theme') {
            arminOSConfig.theme = 'earth';
            await applyOSTheme();
            updateArminOSFile();
            addOutput(`✓ theme reset to default: earth`, 'success');
            addOutput(`✓ All components updated to earth theme`, 'success');
        } else {
            addOutput(`Error: Unknown OS setting '${escapeHtml(setting)}'`, 'error');
            addOutput('Available settings: bg_img, theme', 'info');
        }
    }
}

/**
 * Command: config - View and change terminal themes
 */
async function cmdConfig(args) {
    // Check for help flag
    if (args[0] === '-help' || args[0] === '--help' || args[0] === '-h') {
        const helpText = `
<div class="help-section">
    <div class="command-group">
        <h4>🎨 Config - Terminal Theme Manager</h4>
    </div>

    <div class="command-group">
        <h4>Usage:</h4>
        <div class="command-item"><span class="cmd">config</span> - Show current settings</div>
        <div class="command-item"><span class="cmd">config</span> <span class="args">&lt;category&gt; &lt;setting&gt; &lt;value&gt;</span> - Change setting</div>
        <div class="command-item"><span class="cmd">config</span> <span class="args">&lt;category&gt; -d</span> - Reset category to defaults</div>
        <div class="command-item"><span class="cmd">config</span> <span class="args">&lt;category&gt; &lt;setting&gt; -d</span> - Reset setting to default</div>
        <div class="command-item"><span class="cmd">config export</span> - Export current config as JSON (display)</div>
        <div class="command-item"><span class="cmd">config export -d</span> - Export and download config as JSON file</div>
        <div class="command-item"><span class="cmd">config load</span> <span class="args">&lt;json&gt;</span> - Load config from JSON string</div>
        <div class="command-item"><span class="cmd">config -help</span> - Show this help</div>
    </div>

    <div class="command-group">
        <h4>Categories:</h4>
        <div class="command-item"><span class="cmd">term</span> - Terminal settings (banner_name, banner_image, opacity, theme, quote)</div>
        <div class="command-item"><span class="cmd">audiojunkie</span> (or <span class="cmd">aj</span>) - Audio Junkie settings (opacity, theme, visualizer)</div>
        <div class="command-item"><span class="cmd">dock</span> - Dock settings (opacity, theme)</div>
        <div class="command-item"><span class="cmd">os</span> - OS-wide settings (bg_img, theme) - affects all components</div>
    </div>

    <div class="command-group">
        <h4>Examples:</h4>
        <div class="command-item"><span class="cmd">config term banner_name name2.html</span> - Switch to alternate name</div>
        <div class="command-item"><span class="cmd">config term banner_image bimage2.html</span> - Switch to alternate scene</div>
        <div class="command-item"><span class="cmd">config term opacity 75</span> - Set terminal to 75% opacity</div>
        <div class="command-item"><span class="cmd">config term theme water</span> - Switch to water theme (blue background, purple border)</div>
        <div class="command-item"><span class="cmd">config term quote watts</span> - Switch to Alan Watts quote</div>
        <div class="command-item"><span class="cmd">config audiojunkie opacity 80</span> (or <span class="cmd">config aj opacity 80</span>) - Set Audio Junkie to 80% opacity</div>
        <div class="command-item"><span class="cmd">config audiojunkie theme water</span> (or <span class="cmd">config aj theme water</span>) - Switch to water theme (blue/purple/pink)</div>
        <div class="command-item"><span class="cmd">config audiojunkie visualizer pulse</span> (or <span class="cmd">config aj visualizer pulse</span>) - Switch to pulse visualizer (heart monitor style)</div>
        <div class="command-item"><span class="cmd">config dock theme water</span> - Switch dock to water theme</div>
        <div class="command-item"><span class="cmd">config dock opacity 75</span> - Set dock to 75% opacity</div>
        <div class="command-item"><span class="cmd">config os bg_img sky</span> - Change background image to sky</div>
        <div class="command-item"><span class="cmd">config os theme water</span> - Set all components to water theme</div>
        <div class="command-item"><span class="cmd">config term -d</span> - Reset all terminal settings to defaults</div>
        <div class="command-item"><span class="cmd">config term theme -d</span> - Reset terminal theme to default</div>
        <div class="command-item"><span class="cmd">ls themes</span> - View all available themes</div>
        <div class="command-item"><span class="cmd">cat .term</span> - View terminal config file</div>
        <div class="command-item"><span class="cmd">cat .audiojunkie</span> - View Audio Junkie config file</div>
        <div class="command-item"><span class="cmd">cat .dock</span> - View dock config file</div>
    </div>

    <div class="command-group">
        <h4>💡 Tips:</h4>
        <div class="command-item">• Changes are temporary (session only)</div>
        <div class="command-item">• Edit <span class="cmd">portfolio-source/.term</span> for permanent changes</div>
        <div class="command-item">• Add custom themes to <span class="cmd">portfolio-source/themes/</span></div>
        <div class="command-item">• Run <span class="cmd">python3 generate_fs.py</span> after adding themes</div>
    </div>
</div>
        `;
        addOutput(helpText, 'info');
        return;
    }
    
    if (args.length === 0) {
        // Show current configuration
        const configInfo = `
<div class="config-section">
    <h3>Terminal Theme Configuration</h3>
    <p>Current settings from <code>~/.term</code>:</p>
    <br>
    <div class="config-item"><span class="cmd">banner_name</span> = ${termConfig.banner_name}</div>
    <div class="config-item"><span class="cmd">banner_image</span> = ${termConfig.banner_image}</div>
    <div class="config-item"><span class="cmd">opacity</span> = ${termConfig.opacity}</div>
    <div class="config-item"><span class="cmd">theme</span> = ${termConfig.theme}</div>
    <div class="config-item"><span class="cmd">quote</span> = ${termConfig.quote}</div>
    <br>
    <p><strong>Audio Junkie Settings:</strong></p>
    <div class="config-item"><span class="cmd">opacity</span> = ${audioJunkieConfig.opacity}</div>
    <div class="config-item"><span class="cmd">theme</span> = ${audioJunkieConfig.theme}</div>
    <div class="config-item"><span class="cmd">visualizer</span> = ${audioJunkieConfig.visualizer}</div>
    <br>
    <p><strong>Dock Settings:</strong></p>
    <div class="config-item"><span class="cmd">opacity</span> = ${dockConfig.opacity}</div>
    <div class="config-item"><span class="cmd">theme</span> = ${dockConfig.theme}</div>
    <br>
    <p><strong>OS Settings:</strong></p>
    <div class="config-item"><span class="cmd">bg_img</span> = ${arminOSConfig.bg_img}</div>
    <div class="config-item"><span class="cmd">theme</span> = ${arminOSConfig.theme}</div>
    <br>
    <p>Quick commands:</p>
    <div class="command-item"><span class="cmd">config term banner_name &lt;file.html&gt;</span> - Change ASCII name banner</div>
    <div class="command-item"><span class="cmd">config term banner_image &lt;file.html&gt;</span> - Change scene/image banner</div>
    <div class="command-item"><span class="cmd">config term opacity &lt;0-100&gt;</span> - Change terminal opacity</div>
    <div class="command-item"><span class="cmd">config term theme &lt;earth|water&gt;</span> - Change terminal theme</div>
    <div class="command-item"><span class="cmd">config term quote &lt;asimov|watts&gt;</span> - Change quote display</div>
    <div class="command-item"><span class="cmd">config audiojunkie opacity &lt;0-100&gt;</span> (or <span class="cmd">config aj opacity &lt;0-100&gt;</span>) - Change Audio Junkie opacity</div>
    <div class="command-item"><span class="cmd">config audiojunkie theme &lt;earth|water&gt;</span> (or <span class="cmd">config aj theme &lt;earth|water&gt;</span>) - Change Audio Junkie theme</div>
    <div class="command-item"><span class="cmd">config audiojunkie visualizer &lt;linear|pulse&gt;</span> (or <span class="cmd">config aj visualizer &lt;linear|pulse&gt;</span>) - Change visualizer style</div>
    <div class="command-item"><span class="cmd">config dock opacity &lt;0-100&gt;</span> - Change dock opacity</div>
    <div class="command-item"><span class="cmd">config dock theme &lt;earth|water&gt;</span> - Change dock theme</div>
    <div class="command-item"><span class="cmd">config os bg_img &lt;core|sky&gt;</span> - Change background image</div>
    <div class="command-item"><span class="cmd">config os theme &lt;earth|water&gt;</span> - Set all components to theme</div>
    <div class="command-item"><span class="cmd">config &lt;category&gt; -d</span> - Reset category to defaults</div>
    <div class="command-item"><span class="cmd">config &lt;category&gt; &lt;setting&gt; -d</span> - Reset setting to default</div>
    <div class="command-item"><span class="cmd">ls themes</span> - View available themes</div>
    <div class="command-item"><span class="cmd">config -help</span> - Detailed guide</div>
    <br>
    <p>Note: Changes are temporary. Edit <code>~/.term</code>, <code>~/.audiojunkie</code>, or <code>~/.dock</code> to make them permanent.</p>
</div>
        `;
        addOutput(configInfo, 'info');
        return;
    }
    
    // Handle export command
    if (args[0] === 'export') {
        const jsonConfig = exportConfigToJSON();
        
        // Check for -d flag to download
        if (args[1] === '-d' || args[1] === '--download') {
            downloadJSONFile(jsonConfig, 'config.json');
            addOutput('✓ Configuration downloaded as config.json', 'success');
            return;
        }
        
        // Regular export: display JSON
        addOutput(`<pre class="config-json">${escapeHtml(jsonConfig)}</pre>`, 'info');
        addOutput('✓ Configuration exported. Copy the JSON above.', 'success');
        addOutput('Tip: Use <span class="cmd">config export -d</span> to download as file', 'info');
        addOutput('Tip: Use this JSON with the wormhole command or config load', 'info');
        return;
    }
    
    // Handle load command
    if (args[0] === 'load') {
        if (!args[1]) {
            addOutput('Usage: config load <json_string>', 'error');
            addOutput('Example: config load \'{"term":{"theme":"water"}}\'', 'info');
            addOutput('Or use the wormhole command for interactive JSON input', 'info');
            return;
        }
        
        try {
            // Try to parse the JSON (handle both quoted and unquoted)
            let jsonText = args.slice(1).join(' ');
            // Remove surrounding quotes if present
            if ((jsonText.startsWith('"') && jsonText.endsWith('"')) || 
                (jsonText.startsWith("'") && jsonText.endsWith("'"))) {
                jsonText = jsonText.slice(1, -1);
            }
            
            const configObj = JSON.parse(jsonText);
            const success = await loadConfigFromJSON(configObj);
            if (success) {
                addOutput('✓ Configuration loaded successfully!', 'success');
            } else {
                addOutput('Error: Failed to load configuration', 'error');
            }
        } catch (error) {
            addOutput(`Error: Invalid JSON - ${error.message}`, 'error');
            addOutput('Tip: Use the wormhole command for easier JSON input', 'info');
        }
        return;
    }
    
    let category = args[0];
    let setting = args[1];
    let value = args[2];
    
    // Normalize aliases
    if (category === 'aj') {
        category = 'audiojunkie';
    }
    
    // Validate category
    if (!category || (category !== 'term' && category !== 'audiojunkie' && category !== 'dock' && category !== 'os')) {
        addOutput(`Usage: config <category> <setting> <value>`, 'error');
        addOutput(`Categories: term, audiojunkie (or aj), dock, os`, 'info');
        addOutput(`Example: config term banner_name name2.html`, 'info');
        addOutput(`Example: config term -d (reset all term settings)`, 'info');
        addOutput(`Example: config term theme -d (reset theme only)`, 'info');
        return;
    }
    
    // Check for -d flag at category level (e.g., "config term -d")
    if (setting === '-d') {
        await resetCategoryToDefaults(category);
        return;
    }
    
    // Check for -d flag at setting level (e.g., "config term theme -d")
    if (value === '-d') {
        if (!setting) {
            addOutput(`Usage: config ${category} <setting> -d`, 'error');
            if (category === 'term') {
                addOutput(`Available settings: banner_name, banner_image, opacity, theme, quote`, 'info');
            } else if (category === 'audiojunkie') {
                addOutput(`Available settings: opacity, theme, visualizer`, 'info');
            } else if (category === 'dock') {
                addOutput(`Available settings: opacity, theme`, 'info');
            }
            return;
        }
        await resetSettingToDefault(category, setting);
        return;
    }
    
    if (!setting || !value) {
        addOutput(`Usage: config ${category} <setting> <value>`, 'error');
        addOutput(`Or: config ${category} -d (reset all)`, 'info');
        addOutput(`Or: config ${category} <setting> -d (reset setting)`, 'info');
        if (category === 'term') {
            addOutput(`Available settings: banner_name, banner_image, opacity, theme, quote`, 'info');
        } else if (category === 'audiojunkie') {
            addOutput(`Available settings: opacity, theme, visualizer`, 'info');
            addOutput(`Tip: You can use 'aj' as a shortcut for 'audiojunkie'`, 'info');
        } else if (category === 'dock') {
            addOutput(`Available settings: opacity, theme`, 'info');
        }
        return;
    }
    
    // Handle term category
    if (category === 'term') {
        if (setting === 'banner_name') {
            // Check if theme file exists
            const themeContent = await loadThemeFile(value);
            if (!themeContent) {
                addOutput(`Error: Theme file '${escapeHtml(value)}' not found in themes folder`, 'error');
                addOutput('Use <span class="cmd">ls themes</span> to see available themes', 'info');
                return;
            }
            
            termConfig.banner_name = value;
            await renderBanner();
            updateTermFile();
            
            addOutput(`✓ banner_name changed to ${escapeHtml(value)}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.term</code> and change:`, 'info');
            addOutput(`  banner_name=${value}`, 'info');
            return;
        }
        
        if (setting === 'banner_image') {
            // Check if theme file exists
            const themeContent = await loadThemeFile(value);
            if (!themeContent) {
                addOutput(`Error: Theme file '${escapeHtml(value)}' not found in themes folder`, 'error');
                addOutput('Use <span class="cmd">ls themes</span> to see available themes', 'info');
                return;
            }
            
            termConfig.banner_image = value;
            await renderBanner();
            updateTermFile();
            
            addOutput(`✓ banner_image changed to ${escapeHtml(value)}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.term</code> and change:`, 'info');
            addOutput(`  banner_image=${value}`, 'info');
            return;
        }
        
        if (setting === 'opacity') {
            const opacity = parseInt(value);
            if (isNaN(opacity) || opacity < 0 || opacity > 100) {
                addOutput(`Error: Opacity must be a number between 0 and 100`, 'error');
                return;
            }
            
            termConfig.opacity = opacity;
            applyOpacity();
            updateTermFile();
            
            addOutput(`✓ Terminal opacity changed to ${opacity}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.term</code> and change:`, 'info');
            addOutput(`  opacity=${opacity}`, 'info');
            return;
        }
        
        if (setting === 'theme') {
            const validThemes = ['earth', 'water'];
            if (!validThemes.includes(value.toLowerCase())) {
                addOutput(`Error: Theme must be one of: ${validThemes.join(', ')}`, 'error');
                return;
            }
            
            termConfig.theme = value.toLowerCase();
            await applyTermTheme();
            updateTermFile();
            
            const newQuote = value.toLowerCase() === 'water' ? 'watts' : 'asimov';
            addOutput(`✓ Terminal theme changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`✓ Quote automatically changed to ${escapeHtml(newQuote)}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.term</code> and change:`, 'info');
            addOutput(`  theme=${value.toLowerCase()}`, 'info');
            addOutput(`  quote=${newQuote}`, 'info');
            return;
        }
        
        if (setting === 'quote') {
            const validQuotes = ['asimov', 'watts'];
            if (!validQuotes.includes(value.toLowerCase())) {
                addOutput(`Error: Quote must be one of: ${validQuotes.join(', ')}`, 'error');
                return;
            }
            
            termConfig.quote = value.toLowerCase();
            await renderQuote();
            updateTermFile();
            
            addOutput(`✓ Terminal quote changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.term</code> and change:`, 'info');
            addOutput(`  quote=${value.toLowerCase()}`, 'info');
            return;
        }
        
        addOutput(`Error: Unknown terminal setting '${escapeHtml(setting)}'`, 'error');
        addOutput('Available settings: banner_name, banner_image, opacity, theme, quote', 'info');
        return;
    }
    
    // Handle audiojunkie category
    if (category === 'audiojunkie') {
        if (setting === 'opacity') {
            const opacity = parseInt(value);
            if (isNaN(opacity) || opacity < 0 || opacity > 100) {
                addOutput(`Error: Opacity must be a number between 0 and 100`, 'error');
                return;
            }
            
            audioJunkieConfig.opacity = opacity;
            applyAudioJunkieOpacity();
            updateAudioJunkieFile();
            
            addOutput(`✓ Audio Junkie opacity changed to ${opacity}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.audiojunkie</code> and change:`, 'info');
            addOutput(`  opacity=${opacity}`, 'info');
            return;
        }
        
        if (setting === 'theme') {
            const validThemes = ['earth', 'water'];
            if (!validThemes.includes(value.toLowerCase())) {
                addOutput(`Error: Theme must be one of: ${validThemes.join(', ')}`, 'error');
                return;
            }
            
            audioJunkieConfig.theme = value.toLowerCase();
            applyAudioJunkieTheme();
            updateAudioJunkieFile();
            
            addOutput(`✓ Audio Junkie theme changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.audiojunkie</code> and change:`, 'info');
            addOutput(`  theme=${value.toLowerCase()}`, 'info');
            return;
        }
        
        if (setting === 'visualizer') {
            const validVisualizers = ['linear', 'pulse'];
            if (!validVisualizers.includes(value.toLowerCase())) {
                addOutput(`Error: Visualizer must be one of: ${validVisualizers.join(', ')}`, 'error');
                return;
            }
            
            audioJunkieConfig.visualizer = value.toLowerCase();
            updateAudioJunkieFile();
            
            addOutput(`✓ Audio Junkie visualizer changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.audiojunkie</code> and change:`, 'info');
            addOutput(`  visualizer=${value.toLowerCase()}`, 'info');
            addOutput(`Note: Restart audio playback to see the new visualizer`, 'info');
            return;
        }
        
        addOutput(`Error: Unknown Audio Junkie setting '${escapeHtml(setting)}'`, 'error');
        addOutput('Available settings: opacity, theme, visualizer', 'info');
        return;
    }
    
    // Handle dock category
    if (category === 'dock') {
        if (setting === 'opacity') {
            const opacity = parseInt(value);
            if (isNaN(opacity) || opacity < 0 || opacity > 100) {
                addOutput(`Error: Opacity must be a number between 0 and 100`, 'error');
                return;
            }
            
            dockConfig.opacity = opacity;
            applyDockOpacity();
            updateDockFile();
            
            addOutput(`✓ Dock opacity changed to ${opacity}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.dock</code> and change:`, 'info');
            addOutput(`  opacity=${opacity}`, 'info');
            return;
        }
        
        if (setting === 'theme') {
            const validThemes = ['earth', 'water'];
            if (!validThemes.includes(value.toLowerCase())) {
                addOutput(`Error: Theme must be one of: ${validThemes.join(', ')}`, 'error');
                return;
            }
            
            dockConfig.theme = value.toLowerCase();
            applyDockTheme();
            updateDockFile();
            
            addOutput(`✓ Dock theme changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.dock</code> and change:`, 'info');
            addOutput(`  theme=${value.toLowerCase()}`, 'info');
            return;
        }
        
        addOutput(`Error: Unknown dock setting '${escapeHtml(setting)}'`, 'error');
        addOutput('Available settings: opacity, theme', 'info');
        return;
    }
    
    // Handle os category
    if (category === 'os') {
        if (setting === 'bg_img') {
            const validBgImgs = ['core', 'sky'];
            if (!validBgImgs.includes(value.toLowerCase())) {
                addOutput(`Error: bg_img must be one of: ${validBgImgs.join(', ')}`, 'error');
                return;
            }
            
            arminOSConfig.bg_img = value.toLowerCase();
            applyBackgroundImage();
            updateArminOSFile();
            
            addOutput(`✓ Background image changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`To make this permanent, edit <code>~/.arminOS</code> and change:`, 'info');
            addOutput(`  bg_img=${value.toLowerCase()}`, 'info');
            return;
        }
        
        if (setting === 'theme') {
            const validThemes = ['earth', 'water'];
            if (!validThemes.includes(value.toLowerCase())) {
                addOutput(`Error: Theme must be one of: ${validThemes.join(', ')}`, 'error');
                return;
            }
            
            arminOSConfig.theme = value.toLowerCase();
            
            // Automatically update bg_img based on theme
            if (value.toLowerCase() === 'water') {
                arminOSConfig.bg_img = 'sky';
            } else if (value.toLowerCase() === 'earth') {
                arminOSConfig.bg_img = 'core';
            }
            
            applyBackgroundImage();
            await applyOSTheme();
            updateArminOSFile();
            
            addOutput(`✓ OS theme changed to ${escapeHtml(value.toLowerCase())}`, 'success');
            addOutput(`✓ Background image automatically set to ${escapeHtml(arminOSConfig.bg_img)}`, 'success');
            addOutput(`✓ All components (term, audiojunkie, dock) updated to ${escapeHtml(value.toLowerCase())} theme`, 'success');
            addOutput(`To make this permanent, edit <code>~/.arminOS</code> and change:`, 'info');
            addOutput(`  theme=${value.toLowerCase()}`, 'info');
            addOutput(`  bg_img=${arminOSConfig.bg_img}`, 'info');
            return;
        }
        
        addOutput(`Error: Unknown OS setting '${escapeHtml(setting)}'`, 'error');
        addOutput('Available settings: bg_img, theme', 'info');
        return;
    }
}

/**
 * Download JSON file to user's computer
 */
function downloadJSONFile(jsonContent, filename) {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Export current configuration to JSON format
 */
function exportConfigToJSON() {
    const config = {
        term: {
            banner_name: termConfig.banner_name,
            banner_image: termConfig.banner_image,
            opacity: termConfig.opacity,
            theme: termConfig.theme,
            quote: termConfig.quote
        },
        audiojunkie: {
            opacity: audioJunkieConfig.opacity,
            theme: audioJunkieConfig.theme,
            visualizer: audioJunkieConfig.visualizer
        },
        dock: {
            opacity: dockConfig.opacity,
            theme: dockConfig.theme
        },
        os: {
            bg_img: arminOSConfig.bg_img,
            theme: arminOSConfig.theme
        }
    };
    return JSON.stringify(config, null, 2);
}

/**
 * Load configuration from JSON object
 */
async function loadConfigFromJSON(configObj) {
    try {
        // Validate structure
        if (!configObj || typeof configObj !== 'object') {
            throw new Error('Invalid config format');
        }
        
        // Load term config
        if (configObj.term) {
            if (configObj.term.banner_name) termConfig.banner_name = configObj.term.banner_name;
            if (configObj.term.banner_image) termConfig.banner_image = configObj.term.banner_image;
            if (configObj.term.opacity !== undefined) termConfig.opacity = parseInt(configObj.term.opacity) || 100;
            if (configObj.term.theme) termConfig.theme = configObj.term.theme;
            if (configObj.term.quote) termConfig.quote = configObj.term.quote;
        }
        
        // Load audiojunkie config
        if (configObj.audiojunkie) {
            if (configObj.audiojunkie.opacity !== undefined) audioJunkieConfig.opacity = parseInt(configObj.audiojunkie.opacity) || 100;
            if (configObj.audiojunkie.theme) audioJunkieConfig.theme = configObj.audiojunkie.theme;
            if (configObj.audiojunkie.visualizer) audioJunkieConfig.visualizer = configObj.audiojunkie.visualizer;
        }
        
        // Load dock config
        if (configObj.dock) {
            if (configObj.dock.opacity !== undefined) dockConfig.opacity = parseInt(configObj.dock.opacity) || 100;
            if (configObj.dock.theme) dockConfig.theme = configObj.dock.theme;
        }
        
        // Load OS config
        if (configObj.os) {
            if (configObj.os.bg_img) arminOSConfig.bg_img = configObj.os.bg_img;
            if (configObj.os.theme) arminOSConfig.theme = configObj.os.theme;
        }
        
        // Apply all configurations
        await renderBanner();
        applyOpacity();
        await applyTermTheme();
        await renderQuote();
        applyAudioJunkieOpacity();
        applyAudioJunkieTheme();
        applyDockOpacity();
        applyDockTheme();
        applyBackgroundImage();
        await applyOSTheme();
        
        // Update all config files
        updateTermFile();
        updateAudioJunkieFile();
        updateDockFile();
        updateArminOSFile();
        
        return true;
    } catch (error) {
        console.error('Error loading config from JSON:', error);
        return false;
    }
}

/**
 * Handle JSON input when waiting for paste
 */
async function handleJSONInput(jsonText) {
    waitingForJSONInput = false;
    
    if (!jsonText || jsonText.trim() === '') {
        addOutput('Error: No JSON provided', 'error');
        return;
    }
    
    try {
        // Try to parse the JSON (handle both quoted and unquoted)
        let json = jsonText.trim();
        // Remove surrounding quotes if present
        if ((json.startsWith('"') && json.endsWith('"')) || 
            (json.startsWith("'") && json.endsWith("'"))) {
            json = json.slice(1, -1);
        }
        
        const configObj = JSON.parse(json);
        const success = await loadConfigFromJSON(configObj);
        if (success) {
            addOutput('✓ Configuration loaded successfully!', 'success');
        } else {
            addOutput('Error: Failed to load configuration', 'error');
        }
    } catch (error) {
        addOutput(`Error: Invalid JSON - ${error.message}`, 'error');
    }
}

/**
 * Command: wormhole - Display ASCII art wormhole and handle JSON config file drag & drop
 */
function cmdWormhole(args) {
    // Check for -t flag (text input mode)
    if (args.length > 0 && (args[0] === '-t' || args[0] === '--text')) {
        waitingForJSONInput = true;
        addOutput('Paste your config JSON and press Enter:', 'info');
        addOutput('(Use <span class="cmd">config export</span> to get current config as JSON)', 'info');
        return;
    }
    
    // Regular mode: drag and drop on ASCII art
    const wormholeArt = `
<div class="wormhole-container">
<pre class="wormhole-art json-drop-zone">     ________________________________         
    /                                "-_          
   /      .  |  .                       \\          
  /      : \\ | / :                       \\         
 /        '-___-'                         \\      
/_________________________________________ \\      
     _______| |________________________--""-L 
    /       F J                              \\ 
   /       F   J                              L
  /      :'     ':                            F
 /        '-___-'                            / 
/_________________________________________--</pre>
<div class="wormhole-message">
    slide in your arminOS config json
</div>
<div class="wormhole-actions">
    <div class="command-item">• Use <span class="cmd">config export</span> to export current config as JSON</div>
    <div class="command-item">• Drag and drop a JSON file onto the wormhole above</div>
    <div class="command-item">• Or use <span class="cmd">wormhole -t</span> to paste JSON in next command</div>
    <div class="command-item">• Or use <span class="cmd">config load &lt;json&gt;</span> to load from JSON string</div>
</div>
</div>
    `;
    addOutput(wormholeArt, 'info');
    
    // Find the wormhole art element and make it a drop zone
    setTimeout(() => {
        const wormholeArtElement = document.querySelector('.wormhole-art.json-drop-zone');
        if (!wormholeArtElement) return;
        
        // Handle drag events on the ASCII art itself
        wormholeArtElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wormholeArtElement.classList.add('drag-over');
        });
        
        wormholeArtElement.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wormholeArtElement.classList.remove('drag-over');
        });
        
        wormholeArtElement.addEventListener('drop', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            wormholeArtElement.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length === 0) {
                addOutput('Error: No file dropped', 'error');
                return;
            }
            
            const file = files[0];
            if (!file.name.endsWith('.json')) {
                addOutput('Error: File must be a JSON file (.json)', 'error');
                return;
            }
            
            // Read the file
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const jsonText = event.target.result;
                    const configObj = JSON.parse(jsonText);
                    const success = await loadConfigFromJSON(configObj);
                    if (success) {
                        addOutput(`✓ Configuration loaded from ${escapeHtml(file.name)}!`, 'success');
                    } else {
                        addOutput('Error: Failed to load configuration', 'error');
                    }
                } catch (error) {
                    addOutput(`Error: Invalid JSON - ${error.message}`, 'error');
                }
            };
            
            reader.onerror = () => {
                addOutput('Error: Failed to read file', 'error');
            };
            
            reader.readAsText(file);
        });
    }, 100);
}

/**
 * Clear or restore banner (bclear command)
 */
function cmdBclear(args) {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (!welcomeMessage) {
        addOutput('Error: Banner element not found', 'error');
        return;
    }
    
    // Check for -r flag to restore
    if (args.length > 0 && (args[0] === '-r' || args[0] === '--restore' || args[0] === 'restore')) {
        welcomeMessage.style.display = '';
        addOutput('✓ Banner restored', 'success');
    } else {
        welcomeMessage.style.display = 'none';
        addOutput('✓ Banner cleared', 'success');
    }
}

/**
 * Update .term file content in filesystem (session only)
 */
function updateTermFile() {
    const termContent = `banner_name=${termConfig.banner_name}\nbanner_image=${termConfig.banner_image}\nopacity=${termConfig.opacity}\ntheme=${termConfig.theme}\nquote=${termConfig.quote}\n`;
    
    // Update the .term file at root level
    if (fs.root && fs.root['.term'] !== undefined) {
        fs.root['.term'] = termContent;
    }
}

/**
 * Update .audiojunkie file content in filesystem (session only)
 */
function updateAudioJunkieFile() {
    const audioJunkieContent = `opacity=${audioJunkieConfig.opacity}\ntheme=${audioJunkieConfig.theme}\nvisualizer=${audioJunkieConfig.visualizer}\n`;
    
    // Update the .audiojunkie file at root level
    if (fs.root && fs.root['.audiojunkie'] !== undefined) {
        fs.root['.audiojunkie'] = audioJunkieContent;
    }
}

/**
 * Update .dock file content in filesystem (session only)
 */
function updateDockFile() {
    const dockContent = `opacity=${dockConfig.opacity}\ntheme=${dockConfig.theme}\n`;
    
    // Update the .dock file at root level
    if (fs.root && fs.root['.dock'] !== undefined) {
        fs.root['.dock'] = dockContent;
    }
}

/**
 * Update .arminOS file content in filesystem (session only)
 */
function updateArminOSFile() {
    const arminOSContent = `bg_img=${arminOSConfig.bg_img}\ntheme=${arminOSConfig.theme}\n`;
    
    // Update the .arminOS file at root level
    if (fs.root && fs.root['.arminOS'] !== undefined) {
        fs.root['.arminOS'] = arminOSContent;
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
    const theme = termConfig.theme || 'earth';
    
    // Use fish icon for water theme, coffee mug for earth theme
    if (theme === 'water') {
        prompt.innerHTML = `<span class="fish-icon">><((((('></span>:${displayPath} armin$`;
    } else {
        prompt.innerHTML = `<span class="coffee-mug">C|_|</span>:${displayPath} armin$`;
    }
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

