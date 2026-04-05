import React, { useRef, useState } from 'react';
import { Project } from '../../data/projects';
import gsap from 'gsap';
import { useExperience } from '../../hooks/useExperience';

// Optional: extract magnetic effect hook
function useMagneticEffect() {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.1;
    const y = (e.clientY - top - height / 2) * 0.1;
    
    gsap.to(ref.current, {
      x, y,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0, y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

function ScrambledText({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const chars = '!<>-_\\\\/[]{}—=+*^?#_';
  
  React.useEffect(() => {
    if (!ref.current) return;
    let iteration = 0;
    let interval: any;
    
    const scramble = () => {
      interval = setInterval(() => {
        ref.current!.innerText = text
          .split('')
          .map((letter, index) => {
            if(index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('');
        
        if(iteration >= text.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3; 
      }, 30);
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, 
        { opacity: 0 }, 
        {
          opacity: 1,
          duration: 1,
          onStart: scramble
        }
      );
    });

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [text]);

  return <h2 ref={ref} className="text-3xl md:text-6xl font-bold tracking-tight mb-4 min-h-[4rem]">{text}</h2>;
}

export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect();
  const [isExpanded, setIsExpanded] = useState(false);
  const { triggerGlitch } = useExperience();

  const onCardHover = (e: React.MouseEvent) => {
    handleMouseMove(e);
  };
  
  const onCardEnter = () => {
    // trigger a short, timed glitch (200ms)
    triggerGlitch(200);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onCardHover}
      onMouseEnter={onCardEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-card w-full md:w-1/2 p-6 md:p-8 rounded-2xl border ${project.title === 'Vocaloids' ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-cyan-500/20 bg-slate-900/60'} backdrop-blur-xl shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] mt-[10vh] md:mt-0 max-w-lg lg:max-w-[45%] md:mx-0 transition-colors duration-500`}
    >
      <div className="flex items-center gap-4 mb-2 opacity-80">
        <p className="font-mono text-xs tracking-widest text-slate-500 font-bold border border-slate-700 bg-slate-900/50 px-2 py-1 rounded">
          [00{index + 1}] SECTOR
        </p>
        <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: project.theme }}>
          [ SYSTEM {index + 1} / {total} ]
        </p>
      </div>
      <ScrambledText text={project.title} />
      <h3 className="text-lg md:text-xl font-medium text-slate-300 mb-4 font-sans hover:text-cyan-400 transition-colors">
        {project.subtitle}
      </h3>
      <p className="text-slate-300 leading-relaxed font-mono text-sm mb-4">
        {project.impact}
      </p>

      <div className="mt-6 space-y-4">
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="inline-flex items-center rounded border border-cyan-400/40 px-3 py-2 font-mono text-xs tracking-[0.15em] uppercase text-cyan-300 transition hover:bg-cyan-400/10"
        >
          {isExpanded ? 'Hide Condensed Brief' : 'Open Condensed Brief'}
        </button>

        {isExpanded && (
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-sm text-slate-300">
            <div className="space-y-3">
              <p><span className="font-semibold text-cyan-300">About:</span> {project.condensed.about}</p>
              <p><span className="font-semibold text-cyan-300">Stack:</span> {project.condensed.stack}</p>
              <p><span className="font-semibold text-cyan-300">Results:</span> {project.condensed.results}</p>
            </div>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center rounded border border-cyan-400/50 px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase text-cyan-200 transition hover:bg-cyan-400/15"
            >
              Open Live Demo
            </a>
          </div>
        )}
      </div>
    </div>
  );
}