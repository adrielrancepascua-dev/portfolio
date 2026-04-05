export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  theme: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'scolioaustin',
    title: 'ScolioAustin',
    subtitle: 'Clinical Spine Visualizer',
    description: 'Pro-Max Clinical Prototype featuring interactive SVG spine curvature (0-90°) adjusting for Cobb Angles. Built with Next.js, Framer Motion, and HighEnd UX Sheesh design system.',
    theme: '#06b6d4',
  },
  {
    id: 'nursepath',
    title: 'NursePath',
    subtitle: 'Offline Clinical PWA',
    description: 'PWA study app for nursing students. Interactive drug dosage, AOG/EDD calculators, and vital references. Offline-first via Service Workers.',
    theme: '#2dd4bf',
  },
  {
    id: 'hotelsystem',
    title: 'Hotel Ops Demo',
    subtitle: 'Real-time Operations',
    description: 'Next.js App Router system using Supabase live subscriptions. Syncs room states across front desk, housekeeping, and guest concierge QR portals.',
    theme: '#38bdf8',
  },
  {
    id: 'b2b',
    title: 'Stay Awhile Cafe',
    subtitle: 'B2B POS & Management',
    description: 'React/Vite dashboard merging retail storefront and inventory POS systems. Employs Supabase Postgres schema scaling.',
    theme: '#818cf8',
  },
  {
    id: 'vocaloid',
    title: 'Vocaloid Portfolio',
    subtitle: 'Web Audio Lab',
    description: 'Cinematic 3D intro mimicking game UIs. Native Web Audio API engine offloading byte-frequency analysis to Web Workers with dynamic BiquadFilters.',
    theme: '#c084fc',
  }
];