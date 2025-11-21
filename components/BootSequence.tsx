import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING KERNEL...",
  "LOADING VFS MODULES...",
  "MOUNTING FILE SYSTEM...",
  "CONNECTING TO NEURAL NETWORK...",
  "ALLOCATING MEMORY BLOCKS...",
  "DECRYPTING SECURE STORAGE...",
  "OPTIMIZING RENDERING ENGINE...",
  "SYSTEM READY."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    
    // Line typing interval
    const lineInterval = setInterval(() => {
      if (currentIndex < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(lineInterval);
        setTimeout(onComplete, 800); // Slight delay after text finishes
      }
    }, 150);

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-green-500 overflow-hidden p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md space-y-4">
        <div className="h-64 border border-green-900/50 bg-green-900/5 p-4 rounded-sm overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
          <div className="flex flex-col justify-end h-full">
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs md:text-sm tracking-wider"
              >
                <span className="text-green-700 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs uppercase tracking-widest text-green-700">
            <span>System Boot</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
          </div>
          <div className="h-1 w-full bg-green-900/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-[10px] text-green-900/50 uppercase tracking-[0.5em] animate-pulse">
        bxrtie.dev_secure_env_v2.0
      </div>
    </motion.div>
  );
};