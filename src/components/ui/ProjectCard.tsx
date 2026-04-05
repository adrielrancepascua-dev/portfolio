import React from 'react';
import { Project } from '../../data/projects';

export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div className="glass-card w-full md:w-1/2 p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] mt-[10vh] md:mt-0 max-w-lg md:max-w-none ml-0 md:ml-0">
      <p className="font-mono text-xs tracking-[0.2em] uppercase mb-2" style={{ color: project.theme }}>
        [ SYSTEM {index + 1} / {total} ]
      </p>
      <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
        {project.title}
      </h2>
      <h3 className="text-lg md:text-xl font-medium text-slate-300 mb-6 font-sans">
        {project.subtitle}
      </h3>
      <p className="text-slate-400 leading-relaxed font-mono text-sm">
        {project.description}
      </p>
    </div>
  );
}