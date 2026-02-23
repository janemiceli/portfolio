import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css";

export default function Terminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    let term;

    const start = async () => {
      // Dynamic imports prevent Astro/Vite SSR build issues + handle CJS/ESM quirks
      const xtermMod = await import("xterm");
      const fitMod = await import("@xterm/addon-fit");
      const linksMod = await import("@xterm/addon-web-links");

      const XTerm =
        xtermMod.Terminal ??
        xtermMod.default?.Terminal ??
        xtermMod.default; // last resort

      const FitAddon = fitMod.FitAddon ?? fitMod.default?.FitAddon ?? fitMod.default;
      const WebLinksAddon =
        linksMod.WebLinksAddon ?? linksMod.default?.WebLinksAddon ?? linksMod.default;

      term = new XTerm({
        cursorBlink: true,
        theme: {
          background: "#0b1220",
          foreground: "#e5e7eb",
          cursor: "#10b981",
          selectionBackground: "#334155",
        },
        fontFamily:
          '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
      });

      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();
      term.loadAddon(fitAddon);
      term.loadAddon(webLinksAddon);

      term.open(terminalRef.current);

      // Fit/focus after DOM paint
      setTimeout(() => {
        try {
          fitAddon.fit();
          term.focus();
        } catch {}
      }, 50);

      const prompt = () => {
        term.write("\x1b[1;32mguest@jane-portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ");
      };

      const banner = () => {
        term.writeln("\x1b[1;32mWelcome to Jane Miceli's Interactive Portfolio\x1b[0m");
        term.writeln("Type \x1b[1;33mhelp\x1b[0m to see available commands.");
        term.writeln("");
      };

      const handleCommand = (cmd) => {
        const args = cmd.trim().split(/\s+/).filter(Boolean);
        const command = (args[0] || "").toLowerCase();

        switch (command) {
          case "":
            return;

          case "help":
            term.writeln("Available commands:");
            term.writeln("  \x1b[1;33mwhoami\x1b[0m       - Profile summary");
            term.writeln("  \x1b[1;33mskills\x1b[0m      - Core skill areas");
            term.writeln("  \x1b[1;33mexperience\x1b[0m  - Quick timeline");
            term.writeln("  \x1b[1;33meducation\x1b[0m   - Education highlights");
            term.writeln("  \x1b[1;33mcerts\x1b[0m       - Certifications highlights");
            term.writeln("  \x1b[1;33mcontact\x1b[0m     - Contact links");
            term.writeln("  \x1b[1;33mclear\x1b[0m       - Clear the terminal");
            term.writeln('  \x1b[1;30mTry "coffee" or "sudo rm -rf /"\x1b[0m');
            return;

          case "whoami":
            term.writeln("Jane Miceli — Technology Leader");
            term.writeln("People-first leader focused on growth, scalability, and healthy operations.");
            term.writeln(
              "Domains: Software Engineering, Architecture, DevOps, SRE, Operations, Incident Mgmt."
            );
            return;

          case "skills":
            term.writeln("\x1b[1;34mCore\x1b[0m: Software Engineering, Architecture, DevOps, SRE, Operations");
            term.writeln("\x1b[1;34mLeadership\x1b[0m: Team building, psychological safety, servant leadership");
            term.writeln("\x1b[1;34mDelivery\x1b[0m: Agile methodologies, product-minded execution");
            term.writeln("\x1b[1;34mReliability\x1b[0m: Incident management, continuous improvement, reducing toil");
            return;

          case "experience":
            term.writeln("\x1b[1;34mRecent\x1b[0m:");
            term.writeln(" • Senior Manager, Site Reliability Engineering — Kohl's (2021–2023)");
            term.writeln(" • Principal Engineer & Team Lead, DevOps Now — IBM (2019–2021)");
            term.writeln(" • Cloud Enterprise Architect — Micron (2018–2019)");
            term.writeln(" • Lead, Senior Site Reliability Engineer — HP Inc (2014–2018)");
            term.writeln("Open: /portfolio/experience/ for the full timeline.");
            return;

          case "education":
            term.writeln("\x1b[1;34mEducation\x1b[0m:");
            term.writeln(" • Berkeley CTO Program — UC Berkeley (2025–2026)");
            term.writeln(" • M.S. — University of Wisconsin–Milwaukee (2004–2008)");
            term.writeln(" • B.S. — University of Wisconsin–Milwaukee (2000–2004)");
            return;

          case "certs":
          case "cert":
          case "certifications":
            term.writeln("\x1b[1;34mCertifications (highlights)\x1b[0m:");
            term.writeln(" • Certified Facilitator — Scrum Alliance (2024)");
            term.writeln(" • Certified Agile Leader — Scrum Alliance (2022)");
            term.writeln(" • Women in Leadership — eCornell (2022)");
            term.writeln("Open: /portfolio/certifications/ for full list + verification links.");
            return;

          case "contact":
            term.writeln("Email: jane+github@janemiceli.com");
            term.writeln("LinkedIn: https://www.linkedin.com/in/janemiceli");
            term.writeln("GitHub: https://github.com/janemiceli");
            return;

          case "clear":
            term.clear();
            return;

          case "sudo": {
            const rest = args.slice(1).join(" ");
            if (rest === "rm -rf /") {
              term.writeln("\x1b[1;31mNice try. Change window required.\x1b[0m");
            } else {
              // IMPORTANT: no raw newline inside quotes
              term.writeln("User is not in the sudoers file.");
              term.writeln("This incident will be reported.");
            }
            return;
          }

          case "coffee":
            term.writeln(" ( (");
            term.writeln("  ) )");
            term.writeln(" ........");
            term.writeln(" | |]");
            term.writeln(" \\\\ /");
            term.writeln("  `----'");
            term.writeln("Caffeine level: \x1b[1;32mOPTIMAL\x1b[0m");
            return;

          case "cat":
            term.writeln("Meow.");
            return;

          default:
            term.writeln(`Command not found: ${command}. Type 'help' for commands.`);
            return;
        }
      };

      banner();
      prompt();

      let currentLine = "";

      term.onData((data) => {
        const code = data.charCodeAt(0);

        // Enter
        if (code === 13) {
          term.write("\r\n");
          handleCommand(currentLine);
          currentLine = "";
          prompt();
          return;
        }

        // Backspace
        if (code === 127) {
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write("\b \b");
          }
          return;
        }

        // Printable
        if (code >= 32) {
          currentLine += data;
          term.write(data);
        }
      });

      const onResize = () => {
        try {
          fitAddon.fit();
        } catch {}
      };

      window.addEventListener("resize", onResize);
      terminalRef.current.addEventListener("click", () => term.focus());

      // cleanup
      return () => {
        window.removeEventListener("resize", onResize);
      };
    };

    let cleanup = null;
    start().then((c) => (cleanup = c));

    return () => {
      try {
        cleanup?.();
      } catch {}
      try {
        term?.dispose();
      } catch {}
    };
  }, []);

  return <div ref={terminalRef} className="mt-8 min-h-[260px] rounded-xl border border-slate-800" />;
}
