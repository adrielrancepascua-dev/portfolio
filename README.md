# 🧬 Clinical Systems Architecture Portfolio

![React](https://img.shields.io/badge/React-19.0-blue.svg?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg?style=flat-square&logo=typescript)
![Deployment](https://img.shields.io/badge/Vercel-Deployed-black.svg?style=flat-square&logo=vercel)

**Created by:** Rance Adriel M. Pascua  
**Role:** Clinical Systems Architect & 2nd-Year BSN Student (Age: 20)  
**Focus:** Engineering high-performance software for healthcare, bridging ward workflows to secure, low-latency web applications.

Welcome to my portfolio source code. This is not a static document. It is a highly optimized, interactive WebGL application built with React Three Fiber, designed to showcase how systemic clinical rigor shapes predictable, scalable software engineering.

## 🚀 Key Engineering Features

- **Adaptive GPU Pipeline:** Real-time WebGL rendering with a custom `useExperience` FPS monitor. Gracefully degrades to a "Low Power Mode" automatically on devices dropping below 30FPS by disabling heavy postprocessing (Bloom, Chromatic Aberration).
- **Modular Scene Graph:** Lazy-loaded 3D environments bound to a scroll-progress state (`zustand`) that animates only when required.
- **Scroll-Linked Mathematics:** Precise mathematical lerps for scene rotations and vectors tied directly to `GSAP ScrollTrigger` velocity, mimicking physics without running a costly 2D physics engine.
- **Responsive Composition:** Built mobile-first utilizing a hybrid of standard DOM elements layered perfectly over an absolute-positioned Canvas.

## 🗂️ Engineering Documentation

Good software is documented. I treat this portfolio as a production environment. 
Please review my technical decisions and system architecture below:

1. [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - Learn why I chose Three.js, React 19, and Vite, and how the interaction layers are separated.
2. [**PERFORMANCE.md**](./docs/PERFORMANCE.md) - Review bundle strategies, Lighthouse targets, and hardware accessibility fallbacks.
3. [**CASE_STUDIES.md**](./docs/CASE_STUDIES.md) - Deep dive into my clinical tools (Block9 Nurse, ScolioAustin) and how solving medical problems improves my code reliability.

## 🛠️ Run Locally

You can spin this system up locally. Ensure you have Node.js installed.

```bash
# Clone the repository
git clone https://github.com/adrielrancepascua-dev/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the local development server (Vite)
npm run dev

# Build for production
npm run build
```

## 🌐 The "Nursing Advantage"

Why hire a Nursing Student to build software?
Clinical environments have zero tolerance for latency, poor UX, or dropped data. Every system I build is informed by the critical-care mindset: **Assess, Intervene, Evaluate, Stabilize**. 

I understand how to build systems for exhausted users operating under high cognitive load with terrible hospital WiFi internet. If a system can survive the ward, it can survive anywhere.