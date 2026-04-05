import React, { useRef, useLayoutEffect, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { PROJECTS } from "./data/projects";
import { ProjectCard } from "./components/ui/ProjectCard";
import SceneObjects from "./components/3d/SceneObjects";
import { HUD } from "./components/ui/HUD";
import { SystemDiagnostic } from "./components/ui/SystemDiagnostic";
import { CustomCursor } from "./components/ui/CustomCursor";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction, ChromaticAberrationEffect } from "postprocessing";
import { useExperience } from "./hooks/useExperience";
import { useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

function MagneticButton({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

function ScrollEffects({ scrollVelocityRef }: { scrollVelocityRef: React.RefObject<number> }) {
  const chromaticEffect = React.useMemo(
    () =>
      new ChromaticAberrationEffect({
        blendFunction: BlendFunction.NORMAL,
        offset: new THREE.Vector2(0, 0), // Start with 0 offset (perfectly merged)
        radialModulation: false,
        modulationOffset: 0.15,
      }),
    []
  );

  const lowPower = useExperience((s) => s.lowPowerMode);

  useFrame(() => {
    if (lowPower) return;
    let velocity = scrollVelocityRef.current ?? 0;
    velocity = gsap.utils.clamp(0, 0.05, velocity);

    // Lerp back to 0 so the RGB channels perfectly align into one object when stopped
    chromaticEffect.offset.x = THREE.MathUtils.lerp(chromaticEffect.offset.x, velocity * 0.5, 0.1);
    chromaticEffect.offset.y = THREE.MathUtils.lerp(chromaticEffect.offset.y, velocity * 0.5, 0.1);
  });

  if (lowPower) return null;

  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <Bloom luminanceThreshold={0.5} luminanceSmoothing={1} intensity={1.5} />
      <primitive object={chromaticEffect} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}

export default function PortfolioScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollVelocityRef = useRef(0);

  const { setActiveIndex, setTargetProgress, triggerGlitch, startPerformanceMonitor, setIsMobile, setIsReady, isReady, isMobile } = useExperience();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        useExperience.getState().setLowPowerMode(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  useLayoutEffect(() => {
    const totalProjects = PROJECTS.length;

    // Start FPS monitoring so the site can disable heavy postprocessing on low-end devices
    startPerformanceMonitor();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Progress covers total panels including the Diagnostic Hero
          setTargetProgress(self.progress * totalProjects);
          scrollVelocityRef.current = Math.abs(self.getVelocity() / 3000);
        },
      });

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(i);
              triggerGlitch();
            }
          },
        });

        gsap.fromTo(
          panel.querySelector(".glass-card"),
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
            ease: "power4.out",
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [setActiveIndex, setTargetProgress, triggerGlitch]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#090a0f] text-slate-50 font-sans selection:bg-cyan-500 selection:text-white"
    >
      <CustomCursor />
      <div className="crt-overlay mix-blend-overlay"></div>
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-10"
        style={{
          background:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />

      <HUD />

      <div className={`fixed inset-0 z-0 h-screen w-full pointer-events-none md:pointer-events-auto transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} onCreated={() => setIsReady(true)}>
          <SceneObjects />
          <ScrollEffects scrollVelocityRef={scrollVelocityRef} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-16">
        <SystemDiagnostic ref={(el: HTMLDivElement | null) => {
          panelsRef.current[0] = el;
        }} />

        {PROJECTS.map((project, i) => (
          <div key={project.id} ref={(el) => {
            panelsRef.current[i + 1] = el;
          }} className="flex min-h-screen items-start md:items-center py-10 md:py-0">
            <ProjectCard project={project} index={i} total={PROJECTS.length} />
          </div>
        ))}

        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center pb-24">
          <MagneticButton>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-cyan-400 bg-transparent border border-cyan-500/50 rounded-sm overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-cyan-500/10 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-cyan-500"></span>
              <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                INITIATE_PARTNERSHIP()
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
