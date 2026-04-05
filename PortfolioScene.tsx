import React, { useRef, useLayoutEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./src/data/projects";
import { ProjectCard } from "./src/components/ui/ProjectCard";
import SceneObjects from "./src/components/3d/SceneObjects";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(prev => (prev !== i ? i : prev));
          },
        });

        gsap.fromTo(panel.querySelector(".glass-card"), 
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
            },
            duration: 1.2,
            ease: "power4.out"
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#090a0f] text-slate-50 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Scan-line CSS Overlay (Reduced Opacity for Clarity) */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-10"
           style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />

      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <SceneObjects activeIndex={activeIndex} />
        </Canvas>
      </div>

      {/* HTML Scroll Areas */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-0">
        {PROJECTS.map((project, i) => (
          <div 
            key={project.id} 
            ref={el => { panelsRef.current[i] = el; }} 
            className="flex min-h-screen items-start md:items-center"
          >
            <ProjectCard project={project} index={i} total={PROJECTS.length} />
          </div>
        ))}

        {/* Hire the Ghost CTA */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center pb-24">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-cyan-400 bg-transparent border border-cyan-500/50 rounded-sm overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-cyan-500/10 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-cyan-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              HIRE_THE_GHOST()
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
