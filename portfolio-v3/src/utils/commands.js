// Command execution logic
// All personal information and command handlers

// ASCII Art Banner
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

const neofetchArt = `
       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
      ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
      ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌
      ▐░▌       ▐░▌▐░▌       ▐░▌
      ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌
      ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
      ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀█░█▀▀ 
      ▐░▌       ▐░▌▐░▌     ▐░▌  
      ▐░▌       ▐░▌▐░▌      ▐░▌ 
      ▐░▌       ▐░▌▐░▌       ▐░▌
       ▀         ▀  ▀         ▀ 
`;

const personalInfo = {
  name: 'Armin Rezaiyan',
  role: 'Full-Stack Developer & CS Student',
  location: 'Maryland, USA',
  email: 'your.email@example.com',
  github: 'https://github.com/ArminRezz',
  linkedin: 'https://www.linkedin.com/in/arminrezaiyan/',
  
  about: `Energetic Computer Science student with a unique educational journey—
completing two years of college coursework during high school and gaining 
hands-on experience through internships at NASA and NIST.

I've built expertise in software development and machine learning, 
contributing to projects ranging from web development to knowledge graph 
construction and antenna performance optimization.

Collaborative by nature, I thrive in diverse team environments, driven by 
innovation and continuous learning. Eager to apply my skills to cutting-edge 
projects and grow under expert mentorship.`,

  experience: [
    {
      title: 'Software Engineer Intern',
      company: 'NASA Goddard Space Flight Center',
      period: 'June 2024 - August 2024',
      description: 'Built an automated Weaviate knowledge graph from NASA Technical Reports. Designed intelligent query system using Python, LangChain, and React.'
    },
    {
      title: 'Software Engineer Intern',
      company: 'NIST (National Institute of Standards and Technology)',
      period: 'June 2023 - August 2023',
      description: 'Developed web application for antenna measurement visualization. Created interactive 3D plots and optimization tools.'
    },
    {
      title: 'Software Engineer Intern',
      company: 'Dulles Glass and Mirror',
      period: 'June 2022 - August 2022',
      description: 'Modernized invoicing system using React and AWS. Built mobile-responsive interface for contractors.'
    },
    {
      title: 'Frontend Developer Intern',
      company: 'Boon Health',
      period: 'January 2022 - May 2022',
      description: 'Developed insurance inquiry platform using React and Firebase.'
    },
    {
      title: 'Backend Developer Intern',
      company: 'Medrio',
      period: 'June 2021 - August 2021',
      description: 'Validated hardware attributes against legacy systems using Java and AWS DynamoDB.'
    }
  ],

  education: [
    {
      degree: 'B.S. Computer Science',
      school: 'University of Maryland - College Park',
      period: '2024 - Present',
      status: 'Current'
    },
    {
      degree: 'A.S. Computer Science',
      school: 'Montgomery College',
      period: '2021 - 2023',
      status: 'Completed (Early College Program)'
    },
    {
      degree: 'High School Diploma',
      school: 'Thomas S. Wootton High School',
      period: '2019 - 2023',
      status: 'Completed (AOIT, Varsity Soccer)'
    }
  ],

  skills: {
    languages: ['JavaScript', 'Python', 'Java', 'C', 'TypeScript', 'SQL'],
    frameworks: ['React', 'Node.js', 'Flask', 'Express'],
    tools: ['Git', 'Docker', 'AWS', 'Weaviate', 'LangChain'],
    interests: ['Machine Learning', 'Knowledge Graphs', 'RF Engineering', 'Full-Stack Development']
  },

  projects: [
    {
      name: 'NASA Knowledge Graph',
      tech: ['Python', 'Weaviate', 'LangChain', 'React'],
      description: 'Automated knowledge graph construction from NASA Technical Reports using vector databases and LLM integration.',
      link: 'https://github.com/ArminRezz',
      year: '2024'
    },
    {
      name: 'NIST Antenna Visualization',
      tech: ['Python', 'Plotly', 'Flask', 'JavaScript'],
      description: 'Interactive 3D visualization tool for antenna measurement data with optimization algorithms.',
      link: 'https://github.com/ArminRezz',
      year: '2023'
    },
    {
      name: 'Terminal Portfolio',
      tech: ['React', 'CSS', 'JavaScript'],
      description: 'Interactive terminal-based portfolio website with CRT effects and command-line interface.',
      link: 'https://github.com/ArminRezz',
      year: '2024'
    },
    {
      name: 'Chess Wizards',
      tech: ['Java', 'JavaFX', 'AI'],
      description: 'Chess game with AI opponent implementation using minimax algorithm and alpha-beta pruning.',
      link: 'https://github.com/ArminRezz',
      year: '2023'
    }
  ]
};

// File system for cat command
const fileSystem = {
  'about.txt': personalInfo.about,
  'contact.txt': `Email: ${personalInfo.email}\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`,
  'location.txt': personalInfo.location,
  'README.md': 'Welcome to Armin\'s portfolio! Type "help" to see available commands.',
};

// Command handlers
const commands = {
  help: () => {
    return [
      { type: 'output', content: 'Available commands:' },
      { type: 'output', content: '' },
      { type: 'output', content: '📋 Information:' },
      { type: 'output', content: '  about               Learn about me' },
      { type: 'output', content: '  whoami              Quick introduction' },
      { type: 'output', content: '  neofetch            System information (cool!)' },
      { type: 'output', content: '  experience, work    View my work experience' },
      { type: 'output', content: '  education           View my educational background' },
      { type: 'output', content: '  skills              View my technical skills' },
      { type: 'output', content: '  projects            View my projects' },
      { type: 'output', content: '  contact             Get my contact information' },
      { type: 'output', content: '  resume              View/download my resume' },
      { type: 'output', content: '' },
      { type: 'output', content: '🗂️  File System:' },
      { type: 'output', content: '  ls                  List files' },
      { type: 'output', content: '  cat <file>          Read a file' },
      { type: 'output', content: '  tree                Show file tree' },
      { type: 'output', content: '  pwd                 Print working directory' },
      { type: 'output', content: '' },
      { type: 'output', content: '🎨 Customization:' },
      { type: 'output', content: '  theme <name>        Change color theme (green/blue/amber/matrix)' },
      { type: 'output', content: '  banner              Show ASCII banner' },
      { type: 'output', content: '' },
      { type: 'output', content: '🎮 Fun & Games:' },
      { type: 'output', content: '  snake               Play Snake game!' },
      { type: 'output', content: '  games               List all games' },
      { type: 'output', content: '  music, play         Play/pause lofi music' },
      { type: 'output', content: '  cowsay <msg>        ASCII cow with message' },
      { type: 'output', content: '  fortune, quote      Random inspiring quote' },
      { type: 'output', content: '  joke                Tell a programming joke' },
      { type: 'output', content: '  weather             Check the weather' },
      { type: 'output', content: '' },
      { type: 'output', content: '🛠️  Utilities:' },
      { type: 'output', content: '  clear, cls          Clear the terminal' },
      { type: 'output', content: '  history             Show command history' },
      { type: 'output', content: '  man <command>       Show manual for command' },
      { type: 'output', content: '  env                 Show environment variables' },
      { type: 'output', content: '  uname               System information' },
      { type: 'output', content: '  uptime              How long portfolio has been running' },
      { type: 'output', content: '  date                Show current date' },
      { type: 'output', content: '  echo <text>         Echo text back' },
      { type: 'output', content: '  ping <host>         Ping a host' },
      { type: 'output', content: '  credits             Show credits' },
      { type: 'output', content: '  changelog           View recent updates' },
      { type: 'output', content: '  help, --help        Show this help message' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Tips:' },
      { type: 'output', content: '  • Use arrow keys (↑↓) to navigate command history' },
      { type: 'output', content: '  • Press Tab for command auto-completion' },
      { type: 'output', content: '  • Try "man <command>" to learn more about any command' },
      { type: 'output', content: '  • Type "fortune" for inspiration!' },
      { type: 'output', content: '' }
    ];
  },

  about: () => {
    return [
      { type: 'output', content: '=== About Me ===' },
      { type: 'output', content: '' },
      { type: 'output', content: personalInfo.about },
      { type: 'output', content: '' }
    ];
  },

  whoami: () => {
    return [
      { type: 'output', content: `${personalInfo.name}` },
      { type: 'output', content: `${personalInfo.role}` },
      { type: 'output', content: `📍 ${personalInfo.location}` },
      { type: 'output', content: '' }
    ];
  },

  experience: () => {
    const lines = [
      { type: 'output', content: '=== Work Experience ===' },
      { type: 'output', content: '' }
    ];

    personalInfo.experience.forEach((exp, index) => {
      lines.push({ type: 'output', content: `${index + 1}. ${exp.title}` });
      lines.push({ type: 'output', content: `   @ ${exp.company}` });
      lines.push({ type: 'output', content: `   📅 ${exp.period}` });
      lines.push({ type: 'output', content: `   ${exp.description}` });
      lines.push({ type: 'output', content: '' });
    });

    return lines;
  },

  work: () => commands.experience(),

  education: () => {
    const lines = [
      { type: 'output', content: '=== Education ===' },
      { type: 'output', content: '' }
    ];

    personalInfo.education.forEach((edu, index) => {
      lines.push({ type: 'output', content: `${index + 1}. ${edu.degree}` });
      lines.push({ type: 'output', content: `   ${edu.school}` });
      lines.push({ type: 'output', content: `   📅 ${edu.period}` });
      lines.push({ type: 'output', content: `   Status: ${edu.status}` });
      lines.push({ type: 'output', content: '' });
    });

    return lines;
  },

  skills: () => {
    return [
      { type: 'output', content: '=== Technical Skills ===' },
      { type: 'output', content: '' },
      { type: 'output', content: `Languages:  ${personalInfo.skills.languages.join(', ')}` },
      { type: 'output', content: '' },
      { type: 'output', content: `Frameworks: ${personalInfo.skills.frameworks.join(', ')}` },
      { type: 'output', content: '' },
      { type: 'output', content: `Tools:      ${personalInfo.skills.tools.join(', ')}` },
      { type: 'output', content: '' },
      { type: 'output', content: `Interests:  ${personalInfo.skills.interests.join(', ')}` },
      { type: 'output', content: '' }
    ];
  },

  contact: () => {
    return [
      { type: 'output', content: '=== Contact Information ===' },
      { type: 'output', content: '' },
      { type: 'output', content: `📧 Email:    ${personalInfo.email}` },
      { type: 'output', content: `💼 LinkedIn: ${personalInfo.linkedin}` },
      { type: 'output', content: `🔗 GitHub:   ${personalInfo.github}` },
      { type: 'output', content: '' },
      { type: 'output', content: 'Feel free to reach out!' },
      { type: 'output', content: '' }
    ];
  },

  resume: () => {
    return [
      { type: 'output', content: '📄 Resume' },
      { type: 'output', content: '' },
      { type: 'output', content: 'To download my resume, run:' },
      { type: 'output', content: '  curl -O https://your-site.com/resume.pdf' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Or contact me for a copy!' },
      { type: 'output', content: '' }
    ];
  },

  projects: () => {
    const lines = [
      { type: 'output', content: '=== Projects ===' },
      { type: 'output', content: '' }
    ];

    personalInfo.projects.forEach((project, index) => {
      lines.push({ type: 'output', content: `${index + 1}. ${project.name} (${project.year})` });
      lines.push({ type: 'output', content: `   Tech: ${project.tech.join(', ')}` });
      lines.push({ type: 'output', content: `   ${project.description}` });
      lines.push({ type: 'output', content: `   🔗 ${project.link}` });
      lines.push({ type: 'output', content: '' });
    });

    lines.push({ type: 'output', content: 'View more on GitHub: ' + personalInfo.github });
    lines.push({ type: 'output', content: '' });

    return lines;
  },

  neofetch: () => {
    return [
      { type: 'output', content: neofetchArt },
      { type: 'output', content: `${personalInfo.name}` },
      { type: 'output', content: '─────────────────────────────────' },
      { type: 'output', content: `OS: Portfolio Terminal v3.0` },
      { type: 'output', content: `Host: ${personalInfo.role}` },
      { type: 'output', content: `Kernel: JavaScript / React` },
      { type: 'output', content: `Uptime: Coding since 2021` },
      { type: 'output', content: `Shell: bash (visitor mode)` },
      { type: 'output', content: `Resolution: Full-Stack Development` },
      { type: 'output', content: `DE: VS Code + JetBrains` },
      { type: 'output', content: `Theme: CRT Green Terminal` },
      { type: 'output', content: `Icons: 📧 💼 🔗` },
      { type: 'output', content: `Terminal: armin@portfolio` },
      { type: 'output', content: `CPU: NASA + NIST Experience` },
      { type: 'output', content: `GPU: ${personalInfo.skills.languages.slice(0, 3).join(', ')}` },
      { type: 'output', content: `Memory: ${personalInfo.skills.frameworks.length} frameworks, ${personalInfo.skills.tools.length} tools` },
      { type: 'output', content: '' },
      { type: 'output', content: '████████████████████████' },
      { type: 'output', content: '' }
    ];
  },

  tree: () => {
    return [
      { type: 'output', content: '📁 armin-portfolio/' },
      { type: 'output', content: '├── 📄 README.md' },
      { type: 'output', content: '├── 📄 about.txt' },
      { type: 'output', content: '├── 📄 contact.txt' },
      { type: 'output', content: '├── 📄 location.txt' },
      { type: 'output', content: '├── 📁 experience/' },
      { type: 'output', content: '│   ├── nasa.md' },
      { type: 'output', content: '│   ├── nist.md' },
      { type: 'output', content: '│   ├── dulles-glass.md' },
      { type: 'output', content: '│   ├── boon-health.md' },
      { type: 'output', content: '│   └── medrio.md' },
      { type: 'output', content: '├── 📁 education/' },
      { type: 'output', content: '│   ├── umd.txt' },
      { type: 'output', content: '│   ├── montgomery-college.txt' },
      { type: 'output', content: '│   └── wootton-hs.txt' },
      { type: 'output', content: '├── 📁 projects/' },
      { type: 'output', content: '│   ├── nasa-knowledge-graph/' },
      { type: 'output', content: '│   ├── nist-antenna-viz/' },
      { type: 'output', content: '│   ├── terminal-portfolio/' },
      { type: 'output', content: '│   └── chess-wizards/' },
      { type: 'output', content: '└── 📁 skills/' },
      { type: 'output', content: '    ├── languages.json' },
      { type: 'output', content: '    ├── frameworks.json' },
      { type: 'output', content: '    └── tools.json' },
      { type: 'output', content: '' }
    ];
  },

  cat: (args) => {
    if (args.length === 0) {
      return [
        { type: 'output', content: 'Usage: cat <filename>' },
        { type: 'output', content: 'Try: cat README.md' },
        { type: 'output', content: '' }
      ];
    }

    const filename = args[0];
    if (fileSystem[filename]) {
      return [
        { type: 'output', content: fileSystem[filename] },
        { type: 'output', content: '' }
      ];
    } else {
      return [
        { type: 'output', content: `cat: ${filename}: No such file or directory` },
        { type: 'output', content: 'Available files: ' + Object.keys(fileSystem).join(', ') },
        { type: 'output', content: '' }
      ];
    }
  },

  banner: () => {
    return [
      { type: 'output', content: asciiBanner },
      { type: 'output', content: '' }
    ];
  },

  theme: (args) => {
    if (args.length === 0) {
      return [
        { type: 'output', content: 'Available themes:' },
        { type: 'output', content: '  • green  (default) - Classic terminal green' },
        { type: 'output', content: '  • blue   - Cool blue terminal' },
        { type: 'output', content: '  • amber  - Warm amber terminal' },
        { type: 'output', content: '  • matrix - Matrix code rain' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Usage: theme <name>' },
        { type: 'output', content: '' }
      ];
    }

    const themeName = args[0].toLowerCase();
    const validThemes = ['green', 'blue', 'amber', 'matrix'];
    
    if (validThemes.includes(themeName)) {
      return [
        { type: 'theme', theme: themeName },
        { type: 'output', content: `Theme changed to: ${themeName}` },
        { type: 'output', content: '' }
      ];
    } else {
      return [
        { type: 'output', content: `Unknown theme: ${themeName}` },
        { type: 'output', content: 'Available themes: ' + validThemes.join(', ') },
        { type: 'output', content: '' }
      ];
    }
  },

  history: () => {
    const hist = JSON.parse(localStorage.getItem('commandHistory') || '[]');
    if (hist.length === 0) {
      return [
        { type: 'output', content: 'No command history yet.' },
        { type: 'output', content: '' }
      ];
    }

    const lines = [
      { type: 'output', content: 'Command History:' },
      { type: 'output', content: '' }
    ];

    hist.slice(-20).forEach((cmd, index) => {
      lines.push({ type: 'output', content: `  ${index + 1}  ${cmd}` });
    });

    lines.push({ type: 'output', content: '' });
    return lines;
  },

  clear: () => 'CLEAR',
  cls: () => 'CLEAR',

  // Easter eggs
  sudo: (args) => {
    const command = args.join(' ');
    return [
      { type: 'output', content: `[sudo] password for visitor: ` },
      { type: 'output', content: 'Nice try! 😄' },
      { type: 'output', content: '' }
    ];
  },

  exit: () => {
    return [
      { type: 'output', content: 'Thanks for visiting! 👋' },
      { type: 'output', content: 'Refresh the page to return.' },
      { type: 'output', content: '' }
    ];
  },

  ls: () => {
    return [
      { type: 'output', content: 'about.txt  experience.txt  education.txt  skills.txt  contact.txt' },
      { type: 'output', content: '' }
    ];
  },

  pwd: () => {
    return [
      { type: 'output', content: '/home/visitor/armin-portfolio' },
      { type: 'output', content: '' }
    ];
  },

  // More easter eggs
  echo: (args) => {
    return [
      { type: 'output', content: args.join(' ') },
      { type: 'output', content: '' }
    ];
  },

  date: () => {
    return [
      { type: 'output', content: new Date().toString() },
      { type: 'output', content: '' }
    ];
  },

  hack: () => {
    return [
      { type: 'output', content: 'Initializing hack sequence...' },
      { type: 'output', content: '[████████████████████] 100%' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Just kidding! 😄' },
      { type: 'output', content: 'This is a portfolio, not a hacking simulator.' },
      { type: 'output', content: '' }
    ];
  },

  matrix: () => {
    return [
      { type: 'output', content: 'Follow the white rabbit... 🐰' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Try: theme matrix' },
      { type: 'output', content: '' }
    ];
  },

  coffee: () => {
    return [
      { type: 'output', content: '☕ Brewing coffee...' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Error 418: I\'m a teapot!' },
      { type: 'output', content: '(But thanks for asking)' },
      { type: 'output', content: '' }
    ];
  },

  ping: (args) => {
    const target = args[0] || 'localhost';
    return [
      { type: 'output', content: `PING ${target} (127.0.0.1): 56 data bytes` },
      { type: 'output', content: '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.048 ms' },
      { type: 'output', content: '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.052 ms' },
      { type: 'output', content: '' }
    ];
  },

  uname: () => {
    return [
      { type: 'output', content: 'Portfolio-OS 3.0.0 Terminal x86_64' },
      { type: 'output', content: '' }
    ];
  },

  uptime: () => {
    return [
      { type: 'output', content: 'Portfolio has been running since 2021' },
      { type: 'output', content: 'User has been coding for: 4+ years' },
      { type: 'output', content: 'Load average: NASA, NIST, UMD' },
      { type: 'output', content: '' }
    ];
  },

  fortune: () => {
    const fortunes = [
      '"The best way to predict the future is to invent it." - Alan Kay',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
      '"Knowledge is power." - Francis Bacon',
      '"The only way to do great work is to love what you do." - Steve Jobs',
      '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
      '"Stay hungry, stay foolish." - Steve Jobs',
      '"Make it work, make it right, make it fast." - Kent Beck',
      '"Talk is cheap. Show me the code." - Linus Torvalds',
      'You\'re viewing the portfolio of a NASA and NIST intern. Pretty cool!',
      'Fun fact: This terminal was built with React and no UI libraries!',
      'Try typing "neofetch" for a surprise!',
      'Did you know? You can change themes with "theme <name>"',
      'The force is strong with this one... Keep exploring!',
    ];
    
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    return [
      { type: 'output', content: random },
      { type: 'output', content: '' }
    ];
  },

  cowsay: (args) => {
    const message = args.join(' ') || 'Hello from the terminal!';
    const msgLength = message.length;
    const border = '_'.repeat(msgLength + 2);
    
    return [
      { type: 'output', content: ' ' + border },
      { type: 'output', content: `< ${message} >` },
      { type: 'output', content: ' ' + '-'.repeat(msgLength + 2) },
      { type: 'output', content: '        \\   ^__^' },
      { type: 'output', content: '         \\  (oo)\\_______' },
      { type: 'output', content: '            (__)\\       )\\/\\' },
      { type: 'output', content: '                ||----w |' },
      { type: 'output', content: '                ||     ||' },
      { type: 'output', content: '' }
    ];
  },

  figlet: (args) => {
    const text = args.join(' ').toUpperCase() || 'ARMIN';
    
    // Simple ASCII art generator for short text
    if (text.length > 10) {
      return [
        { type: 'output', content: 'Text too long! Keep it under 10 characters.' },
        { type: 'output', content: '' }
      ];
    }
    
    return [
      { type: 'output', content: '' },
      { type: 'output', content: `  ${text}` },
      { type: 'output', content: `  ${'='.repeat(text.length)}` },
      { type: 'output', content: '' }
    ];
  },

  env: () => {
    return [
      { type: 'output', content: 'USER=visitor' },
      { type: 'output', content: 'HOME=/home/visitor' },
      { type: 'output', content: 'SHELL=/bin/portfolio-bash' },
      { type: 'output', content: 'PATH=/usr/local/bin:/usr/bin:/bin' },
      { type: 'output', content: 'PWD=/home/visitor/armin-portfolio' },
      { type: 'output', content: 'LANG=en_US.UTF-8' },
      { type: 'output', content: 'PORTFOLIO_VERSION=3.0.0' },
      { type: 'output', content: 'DEVELOPER=Armin Rezaiyan' },
      { type: 'output', content: 'INTERNSHIPS=NASA,NIST,DullesGlass,BoonHealth,Medrio' },
      { type: 'output', content: '' }
    ];
  },

  man: (args) => {
    if (args.length === 0) {
      return [
        { type: 'output', content: 'What manual page do you want?' },
        { type: 'output', content: 'Try: man <command>' },
        { type: 'output', content: 'Example: man help' },
        { type: 'output', content: '' }
      ];
    }

    const cmd = args[0];
    const manPages = {
      help: 'Displays all available commands and their descriptions.',
      about: 'Shows detailed information about Armin Rezaiyan.',
      experience: 'Lists all work experience with descriptions.',
      skills: 'Displays technical skills, languages, and frameworks.',
      projects: 'Shows portfolio projects with tech stacks.',
      contact: 'Provides contact information and social links.',
      theme: 'Changes the terminal color theme. Usage: theme <name>',
      cat: 'Reads and displays file contents. Usage: cat <filename>',
      ls: 'Lists files in the current directory.',
      tree: 'Displays directory structure in tree format.',
      neofetch: 'Shows system information with ASCII art.',
      fortune: 'Displays a random quote or fortune.',
      cowsay: 'Generates ASCII cow with custom message. Usage: cowsay <message>',
      music: 'Opens music player with lofi beats.',
      snake: 'Play the classic Snake game!',
      clear: 'Clears the terminal screen.',
    };

    if (manPages[cmd]) {
      return [
        { type: 'output', content: `NAME` },
        { type: 'output', content: `    ${cmd} - portfolio command` },
        { type: 'output', content: '' },
        { type: 'output', content: `DESCRIPTION` },
        { type: 'output', content: `    ${manPages[cmd]}` },
        { type: 'output', content: '' },
        { type: 'output', content: `SEE ALSO` },
        { type: 'output', content: `    help(1), portfolio(1)` },
        { type: 'output', content: '' }
      ];
    } else {
      return [
        { type: 'output', content: `No manual entry for ${cmd}` },
        { type: 'output', content: 'Try "man help" for available commands.' },
        { type: 'output', content: '' }
      ];
    }
  },

  weather: () => {
    const conditions = ['Sunny', 'Cloudy', 'Perfect for coding'];
    const weather = conditions[Math.floor(Math.random() * conditions.length)];
    
    return [
      { type: 'output', content: '    \\  /       ' },
      { type: 'output', content: '  _ /"".-.     Maryland' },
      { type: 'output', content: '    \\_(   ).   ' + weather },
      { type: 'output', content: '    /(___(__)  72°F' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Perfect weather for building cool projects! 🌤️' },
      { type: 'output', content: '' }
    ];
  },

  quote: () => {
    return commands.fortune();
  },

  joke: () => {
    const jokes = [
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
      'Why did the programmer quit his job? Because he didn\'t get arrays. 💰',
      'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
      'Why do Java developers wear glasses? Because they don\'t C#! 👓',
      'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?" 🍺',
      'Why did the developer go broke? Because he used up all his cache! 💸',
      'What\'s a programmer\'s favorite hangout place? Foo Bar! 🍻',
      'Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃🎄',
    ];
    
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    return [
      { type: 'output', content: random },
      { type: 'output', content: '' }
    ];
  },

  music: () => {
    return [
      { type: 'music', action: 'toggle' },
      { type: 'output', content: '🎵 Music player toggled!' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Controls:' },
      { type: 'output', content: '  music        - Toggle play/pause' },
      { type: 'output', content: '  music stop   - Stop music' },
      { type: 'output', content: '' }
    ];
  },

  play: () => {
    return commands.music();
  },

  snake: () => {
    return [
      { type: 'game', game: 'snake' },
      { type: 'output', content: '🐍 Starting Snake game...' },
      { type: 'output', content: 'Use arrow keys to play!' },
      { type: 'output', content: 'Press ESC to exit.' },
      { type: 'output', content: '' }
    ];
  },

  tetris: () => {
    return [
      { type: 'output', content: '🎮 Tetris is coming soon!' },
      { type: 'output', content: 'For now, try "snake" for a game!' },
      { type: 'output', content: '' }
    ];
  },

  games: () => {
    return [
      { type: 'output', content: '🎮 Available Games:' },
      { type: 'output', content: '' },
      { type: 'output', content: '  snake        - Play Snake game' },
      { type: 'output', content: '  tetris       - Coming soon!' },
      { type: 'output', content: '' },
      { type: 'output', content: 'More games coming soon...' },
      { type: 'output', content: '' }
    ];
  },

  credits: () => {
    return [
      { type: 'output', content: '═══════════════════════════════════════' },
      { type: 'output', content: '           PORTFOLIO CREDITS           ' },
      { type: 'output', content: '═══════════════════════════════════════' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Created by: Armin Rezaiyan' },
      { type: 'output', content: 'Built with: React, JavaScript, CSS' },
      { type: 'output', content: 'Year: 2024' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Special Thanks:' },
      { type: 'output', content: '  • NASA Goddard Space Flight Center' },
      { type: 'output', content: '  • NIST' },
      { type: 'output', content: '  • University of Maryland' },
      { type: 'output', content: '  • Coffee ☕' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Made with 💚 and lots of terminal commands' },
      { type: 'output', content: '' }
    ];
  },

  changelog: () => {
    return [
      { type: 'output', content: 'Portfolio v3.0.0 - Latest Updates:' },
      { type: 'output', content: '' },
      { type: 'output', content: '✨ New Features:' },
      { type: 'output', content: '  • Full terminal emulation' },
      { type: 'output', content: '  • Multiple color themes' },
      { type: 'output', content: '  • Tab completion' },
      { type: 'output', content: '  • Fuzzy command matching' },
      { type: 'output', content: '  • Command history persistence' },
      { type: 'output', content: '  • Virtual file system' },
      { type: 'output', content: '  • Snake game' },
      { type: 'output', content: '  • Music player' },
      { type: 'output', content: '  • ASCII art commands' },
      { type: 'output', content: '' },
      { type: 'output', content: '🐛 Bug Fixes:' },
      { type: 'output', content: '  • Improved mobile responsiveness' },
      { type: 'output', content: '  • Better command parsing' },
      { type: 'output', content: '' }
    ];
  }
};

// Get all command names for tab completion
export function getAllCommands() {
  return Object.keys(commands);
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Find similar commands
function findSimilarCommands(input) {
  const commandList = Object.keys(commands);
  const similarities = commandList.map(cmd => ({
    command: cmd,
    distance: levenshteinDistance(input.toLowerCase(), cmd.toLowerCase())
  }));

  return similarities
    .filter(item => item.distance <= 3)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map(item => item.command);
}

// Command parser and executor
export function executeCommand(input) {
  // Save to localStorage for history persistence
  const savedHistory = JSON.parse(localStorage.getItem('commandHistory') || '[]');
  savedHistory.push(input);
  localStorage.setItem('commandHistory', JSON.stringify(savedHistory.slice(-100))); // Keep last 100

  const parts = input.trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Handle --help flag
  if (args.includes('--help') || args.includes('-h')) {
    return commands.help();
  }

  // Check if command exists
  if (commands[command]) {
    const result = commands[command](args);
    
    // Handle clear command specially
    if (result === 'CLEAR') {
      return 'CLEAR';
    }
    
    return result;
  }

  // Command not found - suggest similar commands
  const similar = findSimilarCommands(command);
  const output = [
    { type: 'output', content: `Command not found: ${command}` }
  ];

  if (similar.length > 0) {
    output.push({ type: 'output', content: '' });
    output.push({ type: 'output', content: 'Did you mean:' });
    similar.forEach(cmd => {
      output.push({ type: 'output', content: `  ${cmd}` });
    });
  } else {
    output.push({ type: 'output', content: 'Type "help" to see available commands.' });
  }
  
  output.push({ type: 'output', content: '' });
  return output;
}

// Special function to handle clear
export function shouldClear(output) {
  return output === 'CLEAR';
}

