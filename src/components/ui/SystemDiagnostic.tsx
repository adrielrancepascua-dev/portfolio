import React, { forwardRef } from 'react';
import { Activity, Terminal, Code2, HeartPulse } from 'lucide-react';

export const SystemDiagnostic = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center w-full relative pt-20 pb-10">
      <div className="glass-card max-w-3xl w-full p-8 border border-cyan-500/30 bg-[#090a0f]/80 backdrop-blur-md rounded-lg shadow-[0_0_40px_rgba(6,182,212,0.15)] font-mono relative overflow-hidden">
        {/* Glitch Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <h2 className="text-xl md:text-2xl text-cyan-400 font-bold mb-6 flex items-center gap-3 border-b border-cyan-500/30 pb-4 relative z-10">
          <Activity className="w-6 h-6 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] text-red-500 tracking-[0.2em] mb-1">ENCRYPTED_MEDICAL_FILE // SECURE_ACCESS_GRANTED</span>
            <span className="text-base md:text-lg text-white font-medium">Engineering High-Performance Systems for Healthcare &amp; Beyond.</span>
          </div>
        </h2>

        <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed relative z-10">
          <p>
            <strong className="text-cyan-300 flex items-center gap-2 mb-1"><HeartPulse className="w-4 h-4"/> THE BLUEPRINT</strong>
            Born into a lineage of clinicians, I followed the biological blueprint. I entered Nursing as a primary directive, only to realize my true architecture was built for both the ward and the terminal.
          </p>
          <p>
            <strong className="text-purple-400 flex items-center gap-2 mb-1"><Code2 className="w-4 h-4"/> THE PARADOX</strong>
            Clinical precision meets raw code. I spend my mornings in the ward and my nights in the IDE. Operating out of Aguilar, I balance managing a local family shop with architecting high-end React and Next.js systems for US markets. I don’t just build apps; I stabilize them.
          </p>
          <p>
            <strong className="text-emerald-400 flex items-center gap-2 mb-1"><Terminal className="w-4 h-4"/> CLINICAL SYSTEMS ARCHITECT</strong>
            I am a Clinical Systems Architect: a bridge between ward workflows and robust production systems. I combine clinical domain expertise with systems engineering to build reliable, safety-minded software that performs under pressure.
          </p>
          <p>
            <em className="text-slate-400">3rd Year Nursing Student at Universidad de Dagupan. Building the future of clinical workflows through code.</em>
          </p>
        </div>

        <div className="mt-10 border-t border-cyan-500/30 pt-6 relative z-10">
          <h3 className="text-cyan-400 mb-4 text-sm font-bold tracking-widest">SYSTEM_SPECS //</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">FOCUS</span>
              <div className="text-white font-bold tracking-wide">NURSING / FULL-STACK</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">STAMINA</span>
              <div className="text-green-400 font-bold tracking-wide flex items-center justify-between">
                <span>99%</span>
                <span className="text-[10px] border border-green-500/50 px-1 rounded bg-green-500/10">GRIND_ACTIVE</span>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 bg-slate-900/50 p-4 shrink-0 rounded border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 gap-2">
                <div>
                  <span className="text-slate-500 text-xs block mb-1">INTELLIGENCE</span>
                  <div className="text-white font-bold">2.6 UPG</div>
                  <div className="text-xs text-cyan-500/80 mt-1">Presidential Scholar | 93/91 GWA</div>
                </div>
                <div className="text-cyan-400 text-xs sm:text-right font-bold tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  RAW CAPACITY: ELITE
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 mt-2 rounded flex overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-[93%] shadow-[0_0_10px_rgba(6,182,212,0.8)] relative flex">
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                </div>
              </div>
              <div className="mt-4 bg-slate-900/40 p-3 rounded border border-slate-800">
                <div className="text-slate-400 text-xs font-bold mb-2">CERTIFICATIONS &amp; VALIDATION</div>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li><strong>Presidential Scholarship</strong> — recognized academic merit within the University of the Philippines system.</li>
                  <li><strong>2.6 UPG</strong> — demonstrated ability to maintain elite academic performance while balancing demanding clinical rotations.</li>
                </ul>
                <div className="text-slate-400 text-xs mt-2">Proven ability to maintain elite academic performance while managing complex technical deployments.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SystemDiagnostic.displayName = 'SystemDiagnostic';
