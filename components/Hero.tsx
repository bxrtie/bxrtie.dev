import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Open Source Contributor", "System Architect"];
const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// --- Canvas Particle System ---
const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'; // Brand color low opacity
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1500})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
};

// --- Magnetic Button Component ---
const MagneticButton: React.FC<{ children: React.ReactNode; href: string; primary?: boolean }> = ({ children, href, primary }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    x.set(distance.x * 0.35);
    y.set(distance.y * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="relative z-20"
    >
      <a
        href={href}
        className={`relative group inline-flex items-center justify-center px-8 py-3 md:py-4 md:text-lg border rounded-xl text-base font-medium transition-all duration-200 overflow-hidden ${
          primary
            ? 'border-transparent text-white bg-brand-600 hover:bg-brand-700 shadow-lg hover:shadow-brand-500/25'
            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 backdrop-blur-sm'
        }`}
      >
        <span className="relative z-10 flex items-center">{children}</span>
      </a>
    </motion.div>
  );
};

// --- Glitch Text Component ---
const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / 10);
    y.set((e.clientY - centerY) / 10);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  // Derived transforms for the RGB layers
  const redX = useTransform(springX, (val) => val * 1.5);
  const redY = useTransform(springY, (val) => val * 1.5);
  
  const blueX = useTransform(springX, (val) => val * -1.5);
  const blueY = useTransform(springY, (val) => val * -1.5);

  return (
    <div 
      className="relative inline-block cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      {/* Red Channel */}
      <motion.h1 
        className="absolute inset-0 text-6xl md:text-9xl font-extrabold tracking-tighter text-red-500 opacity-70 pointer-events-none font-mono mix-blend-screen"
        style={{ x: redX, y: redY }}
        aria-hidden="true"
      >
        {text}<span className="opacity-0">.</span>
      </motion.h1>

      {/* Blue Channel */}
      <motion.h1 
        className="absolute inset-0 text-6xl md:text-9xl font-extrabold tracking-tighter text-blue-500 opacity-70 pointer-events-none font-mono mix-blend-screen"
        style={{ x: blueX, y: blueY }}
        aria-hidden="true"
      >
        {text}<span className="opacity-0">.</span>
      </motion.h1>

      {/* Main Channel */}
      <h1 className="relative z-10 text-6xl md:text-9xl font-extrabold tracking-tighter text-slate-900 dark:text-white font-mono">
        {text}<span className="text-brand-600 dark:text-brand-500">.</span>
      </h1>
    </div>
  );
};

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameText, setNameText] = useState("bxrtie");
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 150;
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleMouseOver = () => {
    let iterations = 0;
    const originalName = "bxrtie";
    const interval = setInterval(() => {
      setNameText(
        originalName
          .split("")
          .map((letter, index) => {
            if (index < iterations) return originalName[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= originalName.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-slate-950">
        <ParticleNetwork />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium tracking-wider text-brand-600 dark:text-brand-400 uppercase bg-brand-50/80 dark:bg-brand-900/20 rounded-full border border-brand-100 dark:border-brand-900/30 font-mono backdrop-blur-sm">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
             System Online v2.0.4
          </div>
          
          <div ref={nameRef} onMouseEnter={handleMouseOver} className="mb-8">
             <GlitchText text={nameText} />
          </div>
          
          <div className="h-8 md:h-12 mb-8 font-mono text-lg md:text-2xl">
            <span className="text-slate-400 mr-2">$</span>
            <span className="text-slate-700 dark:text-slate-200">
              current_role = 
            </span>
            <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">
              "{displayText}"
            </span>
            <span className="animate-pulse text-brand-600 dark:text-brand-400">_</span>
          </div>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineering digital experiences with a focus on <span className="text-slate-900 dark:text-white font-medium">performance</span>, <span className="text-slate-900 dark:text-white font-medium">aesthetics</span>, and <span className="text-slate-900 dark:text-white font-medium">scalability</span>.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 items-center">
            <MagneticButton href="#projects" primary>
              View Projects
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </MagneticButton>
            <MagneticButton href="#contact">
              Contact Me
              <Mail className="ml-2 -mr-1 h-5 w-5" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};