
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BootSequence } from './components/BootSequence';
import { CommandPalette } from './components/CommandPalette';

const ClickSonar: React.FC = () => {
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setClicks(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {clicks.map(click => (
        <div
          key={click.id}
          style={{ left: click.x, top: click.y }}
          className="fixed pointer-events-none z-[50] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-full border border-brand-400 dark:border-brand-500"
          />
          <motion.div 
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-brand-500 font-mono whitespace-nowrap pointer-events-none select-none"
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        </div>
      ))}
    </>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {loading && <BootSequence onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 relative selection:bg-brand-500 selection:text-white">
          <ClickSonar />
          <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />
          <div className="bg-noise"></div>
          <Navbar />
          <main className="flex-grow relative z-10">
            <Hero />
            <About />
            <Projects />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;