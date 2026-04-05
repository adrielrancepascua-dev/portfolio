import { create } from 'zustand';

interface ExperienceState {
  activeIndex: number;
  targetProgress: number; // 0 to PROJECTS.length - 1 (float)
  glitchTrigger: number; // Increment to trigger glitch effects
  glitchActive: boolean;
  fps: number;
  lowPowerMode: boolean;

  setActiveIndex: (index: number) => void;
  setTargetProgress: (progress: number) => void;
  triggerGlitch: (duration?: number) => void;
  startPerformanceMonitor: () => void;
  stopPerformanceMonitor: () => void;
  setLowPowerMode: (v: boolean) => void;
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;
  isReady: boolean;
  setIsReady: (v: boolean) => void;
}

export const useExperience = create<ExperienceState>((set, get) => {
  // RAF state kept in closure to avoid re-creating monitors
  let rafId: number | null = null;
  let last = 0;
  let frames = 0;
  let pendingIndex: number | null = null;

  function startPerformanceMonitor() {
    if (rafId) return;
    if (typeof performance === 'undefined') return;
    last = performance.now();
    frames = 0;

    const loop = (t: number) => {
      frames++;
      const delta = t - last;
      if (delta >= 1000) {
        const fps = Math.round((frames * 1000) / delta);
        set({ fps, lowPowerMode: fps < 30 });
        frames = 0;
        last = t;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
  }

  function stopPerformanceMonitor() {
    if (rafId) cancelAnimationFrame(rafId as number);
    rafId = null;
  }

  return {
    activeIndex: 0,
    targetProgress: 0,
    glitchTrigger: 0,
    glitchActive: false,
    fps: 60,
    lowPowerMode: false,
    isMobile: false,
    isReady: false,

    setActiveIndex: (index) => {
      const state = get();
      if (state.activeIndex === index) return;
      
      if (state.glitchActive) {
        pendingIndex = index;
        return;
      }
      
      set({ activeIndex: index });
    },
    setTargetProgress: (progress) => set({ targetProgress: progress }),
    triggerGlitch: (duration = 200) => {
      set((state) => ({ glitchTrigger: state.glitchTrigger + 1, glitchActive: true }));
      setTimeout(() => {
        set({ glitchActive: false });
        if (pendingIndex !== null) {
          get().setActiveIndex(pendingIndex);
          pendingIndex = null;
        }
      }, duration);
    },
    startPerformanceMonitor,
    stopPerformanceMonitor,
    setLowPowerMode: (v: boolean) => set({ lowPowerMode: v }),
    setIsMobile: (v: boolean) => set({ isMobile: v }),
    setIsReady: (v: boolean) => set({ isReady: v }),
  };
});
