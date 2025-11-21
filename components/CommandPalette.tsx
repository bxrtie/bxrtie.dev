
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Moon, Sun, Code, Home, User, Mail, Hash } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: <Home className="w-4 h-4" />,
      action: () => { window.location.href = '#home'; onClose(); },
    },
    {
      id: 'projects',
      label: 'View Projects',
      icon: <Code className="w-4 h-4" />,
      action: () => { window.location.href = '#projects'; onClose(); },
    },
    {
      id: 'about',
      label: 'Read About Me',
      icon: <User className="w-4 h-4" />,
      action: () => { window.location.href = '#about'; onClose(); },
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: <Mail className="w-4 h-4" />,
      action: () => { window.location.href = '#contact'; onClose(); },
    },
    {
      id: 'theme',
      label: 'Toggle Theme',
      icon: <Sun className="w-4 h-4" />,
      action: () => { toggleTheme(); onClose(); },
      shortcut: ['T'],
    },
    {
      id: 'source',
      label: 'View Source Code',
      icon: <Hash className="w-4 h-4" />,
      action: () => { window.open('https://github.com/bxrtie/portfolio', '_blank'); onClose(); },
    },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
          >
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono border border-slate-200 dark:border-slate-700">
                ESC
              </div>
            </div>
            
            <div className="overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-500">
                  No commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    onClick={() => { cmd.action(); }}
                    onMouseEnter={() => { setSelectedIndex(index); }}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      index === selectedIndex 
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${
                       index === selectedIndex ? 'bg-brand-100 dark:bg-brand-900/40' : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {cmd.icon}
                    </div>
                    <span className="flex-grow font-medium">{cmd.label}</span>
                    {cmd.shortcut && (
                      <div className="flex gap-1">
                        {cmd.shortcut.map(key => (
                          <kbd key={key} className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500">
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                    {index === selectedIndex && (
                      <motion.div layoutId="active-indicator" className="ml-3 w-1.5 h-1.5 rounded-full bg-brand-500" />
                    )}
                  </button>
                ))
              )}
            </div>
            
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex justify-between">
              <span>Protip: Use arrows to navigate</span>
              <span>bxrtie.dev system v2.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
