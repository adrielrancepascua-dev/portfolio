# ⚡ Performance: System Hardening

To a Software Engineer, performance isn't a feature; it's a structural requirement. This document lists the performance targets for my technical portfolio and the direct techniques used to maintain them across hardware tiers.

## 🎯 Target Metrics

| Metric                        | Target | Typical Result on Mid-Tier System      |
| :---------------------------- | :----- | :------------------------------------- |
| **First Contentful Paint**    | < 1.0s | ~0.8s                                  |
| **Lighthouse Score**          | > 90   | 95 - 98+                               |
| **Frames Per Second (FPS)**   | 60     | Stable 60 (or gracefully degraded 30)  |
| **Bundle Size Goal (JS)**     | < 500kb| ~450kb gzip                           |

### 🏎️ GPU-Accelerated Adaptive Mode (`useExperience.ts`)
Users visit on everything from M3 MacBooks to $300 Chromebooks or mobile phones. A core issue with Three.js rendering postprocessing pipelines is hardware limitations. If a recruiter views this site at 10FPS, the design is "broken," regardless of how intricate it is.

**The Solution: The FPS Fallback Loop**
Our zustand hook `useExperience` runs a direct `requestAnimationFrame` loop parallel to the `Canvas`.
- Every 1,000ms the system calculates average frames mathematically.
- If the hardware dips below **30 FPS**, a silent `lowPowerMode: true` state is flagged.
- The `PortfolioScene` EffectComposer immediately shorts out, disabling Bloom, Vignette, and Chromatic Aberration—all heavy, multi-pass GPU effects.
- **The Outcome:** Weak devices fall back immediately to an un-styled 3D canvas but retain perfectly smooth CSS and DOM interactivity. 

### 📐 Memory Avoidance (InstancedMesh)
Instead of rendering numerous independent geometries and materials for complex repeating shapes (e.g., the ReactiveWaveform audio bars, the Spine cylinders), the scene utilizes `<instancedMesh>`.
- The `dummy` `THREE.Object3D` is constructed once within a `useMemo`.
- During `useFrame`, simple matrix transformations execute against an array.
- This results in a single draw call passing an instance matrix to the GPU, cutting rendering overhead drastically against the hardware.

### 🧹 State Hoisting & Closures
Variables derived frame-by-frame (scroll velocity, rotation, offset lerps) are actively prevented from participating in the React Component lifecycle.
- **Tradeoff:** Direct DOM mutations via references (`gsap.to(ref.current)`) or Three.js mutations (`groupRef.current.rotation.y = time`).
- **Benefit:** `React.createElement` does not trigger reflows. The `Canvas` components never re-render. They solely process local frame ticks and read global pointer refs.

### 🗑️ Vite Native Bundling vs SSR
The project natively uses Vite/Rollup tree shaking.
There is a minor issue of bundle sizing (we currently output slightly over 500kb minified JS solely due to `three.js` + `gsap` + `react-three-fiber` being bulky graphical libraries).
- In the future, dynamic `import()` and `React.lazy()` or lazy-loading the Canvas wrapper entirely until an `IntersectionObserver` hits it could be used. Currently, they load cleanly in un-throttled networks.
