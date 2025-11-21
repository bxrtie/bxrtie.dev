import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrollValue(latest);
    });
  }, [scrollY]);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-12 hidden lg:flex flex-col items-center justify-center z-40 pointer-events-none mix-blend-difference">
      <div className="h-full w-px bg-slate-800/30 dark:bg-slate-200/30 relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-brand-500"
          style={{ height: '100%', scaleY, transformOrigin: 'top' }}
        />
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 font-mono text-[10px] text-slate-500 dark:text-slate-400 select-none">
        <span className="writing-vertical-rl transform rotate-180 tracking-widest">
          SCROLL_Y // {Math.floor(scrollValue).toString(16).toUpperCase().padStart(4, '0')}
        </span>
        
        <div className="flex flex-col gap-1 items-end">
           {Array.from({ length: 5 }).map((_, i) => (
             <div key={i} className="w-1 h-1 rounded-full bg-current opacity-20" />
           ))}
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
          className="writing-vertical-rl transform rotate-180 text-brand-500 font-bold"
        >
          SYSTEM_ACTIVE
        </motion.div>
      </div>
    </div>
  );
};