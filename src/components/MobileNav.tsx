import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/portfolio/experience', label: './experience' },
    { href: '/portfolio/education', label: './education' },
    { href: '/portfolio/certifications', label: './certifications' },
    { href: '/portfolio/projects', label: './projects' },
    { href: '/portfolio/skills', label: './skills' },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-slate-300 hover:text-emerald-400 focus:outline-none transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl z-40 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg font-mono text-sm transition-all border border-transparent hover:border-slate-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
