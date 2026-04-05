import { create } from 'zustand';

interface ExperienceState {
  activeIndex: number;
  targetProgress: number; // 0 to PROJECTS.length - 1 (float)
  glitchTrigger: number; // Increment to trigger glitch effects

  setActiveIndex: (index: number) => void;
  setTargetProgress: (progress: number) => void;
  triggerGlitch: () => void;
}

export const useExperience = create<ExperienceState>((set) => ({
  activeIndex: 0,
  targetProgress: 0,
  glitchTrigger: 0,

  setActiveIndex: (index) => set({ activeIndex: index }),
  setTargetProgress: (progress) => set({ targetProgress: progress }),
  triggerGlitch: () => set((state) => ({ glitchTrigger: state.glitchTrigger + 1 })),
}));
