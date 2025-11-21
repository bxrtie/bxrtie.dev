import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    description: 'A real-time analytics dashboard for cloud infrastructure monitoring, featuring live graphs and alert management.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSockets'],
    link: '#',
  },
  {
    id: 2,
    title: 'Chronos API',
    description: 'High-performance time-series database interface written in Go, optimized for sub-millisecond query speeds.',
    tags: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
    link: '#',
  },
  {
    id: 3,
    title: 'Aether UI Kit',
    description: 'A comprehensive, accessible design system and component library built for modern web applications.',
    tags: ['Storybook', 'Tailwind CSS', 'Radix UI'],
    link: '#',
  },
  {
    id: 4,
    title: 'Vanguard Auth',
    description: 'Secure, decentralized authentication provider using zero-knowledge proofs for privacy-first logins.',
    tags: ['Rust', 'WebAssembly', 'Cryptography'],
    link: '#',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  return (
    <motion.div
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full bg-slate-50 dark:bg-slate-900 rounded-2xl"
      >
        {/* Animated SVG Border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible z-20">
          <motion.rect
            x="0" y="0" width="100%" height="100%" rx="16" ry="16"
            fill="transparent"
            stroke="rgb(37 99 235)" // Brand blue
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            animate={{ strokeDashoffset: hovered ? 0 : 1000 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="opacity-0 group-hover:opacity-100 dark:stroke-brand-400"
          />
        </svg>

        {/* Background Border (Static) */}
        <div className="absolute inset-0 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors group-hover:border-transparent z-0"></div>

        <div className="relative h-full p-8 flex flex-col z-10 transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-brand-500/30 transition-colors">
               <ArrowUpRight className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="flex gap-3">
              <a href={project.link} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full">
                <Github size={20} />
              </a>
              <a href={project.link} className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors font-mono tracking-tight">
            {project.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 font-mono text-sm">
            ~/projects/selected-works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};