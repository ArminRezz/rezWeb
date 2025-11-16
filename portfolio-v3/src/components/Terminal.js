import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, shouldClear, getAllCommands } from '../utils/commands';
import './Terminal.css';

const asciiBanner = `
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║     █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗                        ║
║    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║                        ║
║    ███████║██████╔╝██╔████╔██║██║██╔██╗ ██║                        ║
║    ██╔══██║██╔══██╗██║╚██╔╝██║██║██║╚██╗██║                        ║
║    ██║  ██║██║  ██║██║ ╚═╝ ██║██║██║ ╚████║                        ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                        ║
║                                                                      ║
║              Full-Stack Developer & CS Student                      ║
║                    NASA | NIST | UMD                                ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
`;

function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: asciiBanner },
    { type: 'output', content: 'Welcome to Armin Rezaiyan\'s Portfolio Terminal!' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('green');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [gameActive, setGameActive] = useState(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const audioRef = useRef(null);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount and when clicking anywhere
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentInput.trim()) {
      setHistory(prev => [...prev, { type: 'input', content: '' }]);
      return;
    }

    // Add command to history display
    const newHistory = [
      ...history,
      { type: 'input', content: currentInput }
    ];

    // Execute command and get output
    const output = executeCommand(currentInput.trim());
    
    // Check if it's a clear command
    if (shouldClear(output)) {
      setHistory([]);
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput('');
      return;
    }
    
    // Check for theme changes in output
    const themeChange = output.find(item => item.type === 'theme');
    if (themeChange) {
      setTheme(themeChange.theme);
    }
    
    // Check for music toggle
    const musicCommand = output.find(item => item.type === 'music');
    if (musicCommand) {
      if (musicPlaying && audioRef.current) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else if (audioRef.current) {
        audioRef.current.play();
        setMusicPlaying(true);
      }
    }
    
    // Check for game command
    const gameCommand = output.find(item => item.type === 'game');
    if (gameCommand) {
      setGameActive(gameCommand.game);
    }
    
    // Add output to history (filter out special commands from display)
    const displayOutput = output.filter(item => !['theme', 'music', 'game'].includes(item.type));
    const finalHistory = [...newHistory, ...displayOutput];
    setHistory(finalHistory);

    // Add to command history for up/down arrow navigation
    setCommandHistory(prev => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput('');
  };

  const handleKeyDown = (e) => {
    // Up arrow - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    }
    
    // Down arrow - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }

    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const input = currentInput.trim();
      
      if (!input) return;
      
      const allCommands = getAllCommands();
      const matches = allCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      
      if (matches.length === 1) {
        // Single match - auto-complete
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        // Multiple matches - show them
        const output = [
          { type: 'output', content: matches.join('  ') },
          { type: 'output', content: '' }
        ];
        setHistory(prev => [...prev, ...output]);
      }
    }

    // ESC key - close game overlay
    if (e.key === 'Escape' && gameActive) {
      e.preventDefault();
      setGameActive(null);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`terminal-container theme-${theme}`} onClick={handleTerminalClick}>
      {/* Hidden audio element for music */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
      />
      
      {/* Music player indicator */}
      {musicPlaying && (
        <div className="music-indicator">
          🎵 Now Playing: Lofi Beats
        </div>
      )}
      
      {/* Game overlay */}
      {gameActive && (
        <div className="game-overlay">
          <div className="game-container">
            <h2>🐍 Snake Game</h2>
            <p>Coming soon! Building the game...</p>
            <p>Press ESC or type 'clear' to exit</p>
            <button onClick={() => setGameActive(null)}>Close Game</button>
          </div>
        </div>
      )}
      
      <div className="terminal-body" ref={terminalRef}>
        {history.map((entry, index) => (
          <div key={index} className={`terminal-line ${entry.type}`}>
            {entry.type === 'input' ? (
              <div className="input-line">
                <span className="prompt">visitor@armin:~$</span>
                <span className="command">{entry.content}</span>
              </div>
            ) : (
              <pre className="output-line">{entry.content}</pre>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="input-line">
            <span className="prompt">visitor@armin:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Terminal;

