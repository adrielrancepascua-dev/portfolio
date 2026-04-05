import React, { useState, useEffect } from 'react';

export function HUD() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6 flex flex-col justify-between font-mono text-xs uppercase tracking-wider">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
         <div className="flex flex-col gap-1 text-cyan-400 bg-[#090a0f]/80 p-3 rounded-sm border border-cyan-500/30 backdrop-blur-sm pointer-events-auto shadow-[0_0_15px_rgba(6,182,212,0.15)] max-w-sm">
           <div className="text-[10px] text-slate-400 mb-1 border-b border-cyan-500/20 pb-1">CLINICAL DATA OVERLAY</div>
           <div className="flex justify-between gap-4"><span className="text-slate-500">SUBJECT:</span> <span className="font-bold">PASCUA, R.A.M.</span></div>
           <div className="flex justify-between gap-4"><span className="text-slate-500">ROLE:</span> <span className="font-bold">BSN-2 / SYSTEMS ARCHITECT</span></div>
           <div className="flex justify-between gap-4 items-center mt-1 pt-1 border-t border-cyan-500/20">
             <span className="text-slate-500">STATUS:</span> 
             <span className="flex items-center gap-2 text-[10px] bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">
               <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
               [OPTIMIZING_SYSTEMS]{dots}
             </span>
           </div>
         </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-center md:justify-start items-end mb-4 md:mb-0">
         <div className="bg-[#090a0f]/90 p-4 rounded-lg border border-slate-800/80 backdrop-blur-md space-y-4 pointer-events-auto w-full max-w-[280px] shadow-lg">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                <span className="tracking-widest">MISSION: BAGUIO_CITY_TRANSFER</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded flex overflow-hidden">
                <div className="h-full bg-cyan-500 w-[60%] rounded shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                <span className="tracking-widest">GOAL: US_AGENCY_CONTRACT</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded flex overflow-hidden">
                <div className="h-full bg-purple-500 w-[85%] rounded shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse"></div>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
