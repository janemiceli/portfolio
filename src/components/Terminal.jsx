import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import 'xterm/css/xterm.css';

const Terminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#f8f8f2',
        cursor: '#10b981', // emerald-500
        selectionBackground: '#4b5563',
      },
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
      lineHeight: 1.2,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    
    // Tiny delay to ensure DOM is ready for fit and focus
    setTimeout(() => {
      fitAddon.fit();
      term.focus();
    }, 50);

    xtermRef.current = term;

    // Initial welcome message
    term.writeln('\x1b[1;32mWelcome to Akash Verma\'s Interactive Portfolio\x1b[0m');
    term.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
    term.writeln('');
    prompt(term);

    let currentLine = '';
    
    // Handle input
    term.onData((data) => {
      const code = data.charCodeAt(0);
      
      // Enter key (13 is CR)
      if (code === 13) {
        term.write('\r\n');
        handleCommand(currentLine.trim(), term);
        currentLine = '';
        prompt(term);
      } 
      // Backspace (127 is DEL)
      else if (code === 127) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } 
      // Printable characters (basic range check + extended ASCII)
      else if (code >= 32) {
        currentLine += data;
        term.write(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);
    
    const handleFocus = () => {
      term.focus();
    };
    
    // Add click listener to the container div
    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleFocus);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleFocus);
      }
      term.dispose();
    };
  }, []);

  const prompt = (term) => {
    term.write('\x1b[1;32mguest@akash-portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
  };

  const handleCommand = (cmd, term) => {
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case 'help':
        term.writeln('Available commands:');
        term.writeln('  \x1b[1;33mwhoami\x1b[0m    - Display profile summary');
        term.writeln('  \x1b[1;33mskills\x1b[0m    - List technical skills');
        term.writeln('  \x1b[1;33mcerts\x1b[0m     - List certifications');
        term.writeln('  \x1b[1;33mcontact\x1b[0m   - Show contact information');
        term.writeln('  \x1b[1;33mclear\x1b[0m     - Clear the terminal');
        term.writeln('  \x1b[1;30m(Try "coffee", "sudo rm -rf /", or "git blame")\x1b[0m');
        break;
      case 'whoami':
        term.writeln('Akash Verma - Site Reliability Engineer & Cloud Architect');
        term.writeln('Over a decade of expertise in designing, automating, and scaling');
        term.writeln('infrastructure across hybrid cloud and HPC environments.');
        break;
      case 'skills':
        term.writeln('\x1b[1;34mCloud:\x1b[0m AWS, Azure, GCP');
        term.writeln('\x1b[1;34mAI/ML:\x1b[0m Google Vertex AI, HPC, Nvidia DGX');
        term.writeln('\x1b[1;34mCI/CD:\x1b[0m Jenkins, GitHub Actions, Argo CD');
        term.writeln('\x1b[1;34mIaC:\x1b[0m   Terraform, Ansible');
        break;
      case 'certifications':
      case 'certs':
      case 'cert':
        term.writeln('\x1b[1;34m--- Google Cloud ---\x1b[0m');
        term.writeln('  • Professional Cloud Architect');
        term.writeln('  • Associate Cloud Engineer');
        term.writeln('  • Generative AI Leader');
        term.writeln('  • Site Reliability Engineering (SRE)');
        term.writeln('');
        term.writeln('\x1b[1;34m--- Microsoft Azure ---\x1b[0m');
        term.writeln('  • Azure Administrator Associate');
        term.writeln('  • Azure Fundamentals');
        term.writeln('');
        term.writeln('\x1b[1;34m--- Other ---\x1b[0m');
        term.writeln('  • GitHub Foundations');
        term.writeln('');
        term.writeln('Type \x1b[1;33mhelp\x1b[0m to see more commands.');
        break;
      case 'contact':
        term.writeln('Email: averma7304@gmail.com');
        term.writeln('Phone: 9133886757');
        term.writeln('LinkedIn: https://www.linkedin.com/in/akashv01/');
        break;
      case 'clear':
        term.clear();
        break;
      case 'sudo':
        if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
          term.writeln('\x1b[1;31mNice try, but I keep my backups on a different continent.\x1b[0m');
        } else {
          term.writeln('User is not in the sudoers file. This incident will be reported.');
        }
        break;
      case 'coffee': 
        term.writeln('    ( (');
        term.writeln('     ) )');
        term.writeln('  ........');
        term.writeln('  |      |]');
        term.writeln('  \\      /');
        term.writeln('   `----\'');
        term.writeln('Caffeine level: \x1b[1;32mOPTIMAL\x1b[0m');
        break;
      case 'git':
        if (args[1] === 'blame') {
          term.writeln('It was definitely the intern.');
        } else {
          term.writeln('git: command not found (just kidding, but try "git blame")');
        }
        break;
      case 'cat':
         term.writeln('Meow. 🐱');
         break;
      case 'ls':
         term.writeln('src/  public/  node_modules/ (don\'t look in there)  resume.pdf');
         break;
      case '':
        break;
      default:
        term.writeln(`Command not found: ${command}. Type 'help' for available commands.`);
    }
  };

  return <div ref={terminalRef} className="h-full w-full" />;
};

export default Terminal;