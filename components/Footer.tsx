
import React, { useState, useRef, useEffect } from 'react';
import { Socials } from './Socials';

const commands: Record<string, string> = {
  help: 'Available commands: help, whoami, email, clear, repo, date',
  whoami: 'visitor@bxrtie.dev',
  email: 'mail@bxrtie.dev',
  repo: 'github.com/bxrtie/portfolio',
  date: new Date().toLocaleString(),
};

export const Footer: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Type "help" to see available commands.']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setOutput([]);
    } else {
      const response = commands[cmd] || `Command not found: ${cmd}. Type "help".`;
      setOutput((prev) => [...prev, `> ${input}`, response]);
    }
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="flex flex-col justify-between h-full">
          <div>
             <span className="text-2xl font-bold tracking-tighter text-brand-600 dark:text-brand-400 block mb-4">
              bxrtie<span className="text-slate-900 dark:text-white">.dev</span>
            </span>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Built with passion, coffee, and a lot of late nights. 
              Thanks for stopping by.
            </p>
            <Socials />
          </div>
          <p className="text-slate-400 text-xs mt-8">
            &copy; {new Date().getFullYear()} bxrtie. All rights reserved.
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-64 relative group">
          <div className="flex items-center gap-1.5 mb-4 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs">guest@bxrtie-term: ~</span>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto scrollbar-hide space-y-1 pb-2">
            {output.map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-slate-500 mt-2' : 'text-brand-400'}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2 border-t border-slate-800 pt-2">
            <span className="text-green-500">➜</span>
            <span className="text-cyan-500">~</span>
            <input 
              type="text" 
              value={input}
              onChange={handleInputChange}
              className="bg-transparent focus:outline-none flex-grow text-white"
              placeholder="Enter command..."
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

      </div>
    </footer>
  );
};
