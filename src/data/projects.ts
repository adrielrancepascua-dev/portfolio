export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  demoUrl: string;
  condensed: {
    about: string;
    stack: string;
    results: string;
  };
  theme: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'scolioaustin',
    title: 'ScolioAustin',
    subtitle: 'Clinical Spine Visualizer',
    description: 'Pro-Max Clinical Prototype featuring interactive SVG spine curvature (0-90°) adjusting for Cobb Angles. Built with Next.js, Framer Motion, and HighEnd UX Sheesh design system.',
    demoUrl: 'https://scolioaustin.vercel.app/',
    condensed: {
      about: 'High-fidelity scoliosis experience with interactive spine visualization, clinical method comparison, and guided assessment flow.',
      stack: 'Next.js, TypeScript, Tailwind CSS, Framer Motion, PWA support.',
      results: 'Delivered a polished medical-themed prototype with responsive UI, smooth motion system, and installable app behavior.',
    },
    theme: '#06b6d4',
  },
  {
    id: 'nursepath',
    title: 'NursePath',
    subtitle: 'Offline Clinical PWA',
    description: 'PWA study app for nursing students. Interactive drug dosage, AOG/EDD calculators, and vital references. Offline-first via Service Workers.',
    demoUrl: 'https://block9nurseapp.vercel.app/',
    condensed: {
      about: 'Academic nursing study companion focused on concept reinforcement, formula practice, and quick classroom references.',
      stack: 'HTML, CSS, JavaScript, Tailwind (inlined), Service Worker, PWA manifest.',
      results: 'Published a fully offline-capable learning app with IV flow, AOG/EDD, OTC references, and textbook-aligned vital sign guides.',
    },
    theme: '#2dd4bf',
  },
  {
    id: 'hotelsystem',
    title: 'Hotel Ops Demo',
    subtitle: 'Real-time Operations',
    description: 'Next.js App Router system using Supabase live subscriptions. Syncs room states across front desk, housekeeping, and guest concierge QR portals.',
    demoUrl: 'https://hotel-system-demo.vercel.app/',
    condensed: {
      about: 'Operations dashboard for hotel teams covering room states, front desk workflows, housekeeping, and guest request handling.',
      stack: 'Next.js App Router, TypeScript, Tailwind CSS, Supabase realtime subscriptions.',
      results: 'Built a multi-role demo that keeps room and request data synchronized across manager, staff, and guest views.',
    },
    theme: '#38bdf8',
  },
  {
    id: 'flowershop',
    title: 'Flower Backoffice Demo',
    subtitle: 'Cafe + Flower Operations',
    description: 'Dual-mode React and Vite platform with cafe operations plus branch-aware flower backoffice modules for products, orders, inventory, and reports.',
    demoUrl: 'https://flower-backoffice-demo.vercel.app/',
    condensed: {
      about: 'Modular operations suite that supports both cafe workflows and an expandable flower backoffice with branch-aware data.',
      stack: 'React, TypeScript, Vite, Tailwind CSS, Supabase, route-based module architecture.',
      results: 'Prepared scalable admin workflows including POS, inventory movement, order management, and reporting foundations.',
    },
    theme: '#818cf8',
  },
  {
    id: 'vocaloid',
    title: 'Vocaloid Portfolio',
    subtitle: 'Web Audio Lab',
    description: 'Cinematic 3D intro mimicking game UIs. Native Web Audio API engine offloading byte-frequency analysis to Web Workers with dynamic BiquadFilters.',
    demoUrl: 'https://vocaloids.vercel.app/',
    condensed: {
      about: 'Immersive character portfolio with cinematic transitions, dynamic theme system, and music-first interaction design.',
      stack: 'Next.js, React 19, TypeScript, Tailwind v4, Framer Motion, Web Audio API, Web Workers.',
      results: 'Implemented seamless crossfade audio pipeline, performance-aware visual effects, and SEO-ready dynamic content routes.',
    },
    theme: '#c084fc',
  }
];