
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Globe, Coffee, Zap } from 'lucide-react';

const TechTicker: React.FC<{ reverse?: boolean }> = ({ reverse }) => {
  const tech = [
    "React", "TypeScript", "Next.js", "Node.js", "Go", "Rust", "Docker", 
    "Kubernetes", "Tailwind", "PostgreSQL", "Redis", "GraphQL", "AWS", 
    "Framer Motion", "Three.js", "Python"
  ];
  
  return (
    <div className="flex overflow-hidden py-4 relative mask-gradient select-none">
      <motion.div 
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...tech, ...tech, ...tech].map((item, i) => (
          <span key={i} className="text-lg font-mono font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
            {item}
          </span>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950 pointer-events-none"></div>
    </div>
  );
};

// Static Bento Item Wrapper
const BentoItem: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, zIndex: 5 }}
      className={`${className} relative transition-shadow hover:shadow-xl`}
    >
      {children}
    </motion.div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            About Me
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-mono">
            // system_architecture_overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Box 1: Bio (Large) */}
          <BentoItem className="md:col-span-2 lg:col-span-2 row-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">The Developer</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative z-10">
              I'm a full-stack engineer with a deep love for systems architecture and pixel-perfect user interfaces. 
              My philosophy is simple: build things that are beautiful inside and out.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed relative z-10">
              When I'm not coding, I'm likely disassembling electronics, reading sci-fi, or optimizing my ZSH config for the 100th time.
            </p>
          </BentoItem>

          {/* Box 2: Tech Stack (Tall) */}
          <BentoItem delay={0.1} className="md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center overflow-hidden group">
            <div className="p-6 pb-0">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-mono">Stack_Trace</h3>
            </div>
            <TechTicker />
            <TechTicker reverse />
          </BentoItem>

          {/* Box 3: Location (Small) */}
          <BentoItem delay={0.2} className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute inset-0 opacity-20 text-[8px] leading-[8px] font-mono pointer-events-none select-none overflow-hidden group-hover:opacity-40 transition-opacity">
              {Array(400).fill(0).map((_, i) => (
                <span key={i}>{Math.random() > 0.5 ? '1' : '0'} </span>
              ))}
            </div>
            <Globe className="w-8 h-8 text-brand-400 mb-2 relative z-10" />
            <div className="relative z-10">
              <p className="text-xs text-slate-400 font-mono mb-1">LOCATION</p>
              <p className="text-xl font-bold">Digital Nomad</p>
              <p className="text-xs text-slate-500">Planet Earth</p>
            </div>
          </BentoItem>

          {/* Box 4: Focus (Small) */}
          <BentoItem delay={0.3} className="bg-brand-600 text-white rounded-3xl p-6 border border-brand-500 relative overflow-hidden flex flex-col justify-between group">
            <Zap className="w-8 h-8 text-white/80 mb-2" />
            <div>
              <p className="text-xs text-white/60 font-mono mb-1">CURRENT FOCUS</p>
              <p className="text-xl font-bold">WebAssembly & Rust</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
          </BentoItem>

          {/* Box 5: Stats (Wide) */}
          <BentoItem delay={0.4} className="md:col-span-3 lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-2xl text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">3+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Years Exp.</p>
              </div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">20+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Projects</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
            <div className="hidden sm:flex items-center gap-4">
               <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                <Coffee size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">∞</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Caffeine</p>
              </div>
            </div>
          </BentoItem>

        </div>
      </div>
    </section>
  );
};
