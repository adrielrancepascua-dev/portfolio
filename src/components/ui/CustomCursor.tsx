import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!cursorRef.current) return;
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${hoveringRef.current ? 2 : 1})`;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nextHover =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        Boolean(target.closest('a')) ||
        Boolean(target.closest('button'));

      hoveringRef.current = nextHover;
      setIsHovering((prev) => (prev === nextHover ? prev : nextHover));

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${nextHover ? 2 : 1})`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    hoveringRef.current = isHovering;
    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 2 : 1})`;
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[100] transition-transform duration-100 ease-out flex items-center justify-center mix-blend-exclusion`}
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Medical Crosshair Inner */}
      <div className="relative flex items-center justify-center w-6 h-6">
        <div className={`absolute w-full h-[1px] bg-cyan-400 opacity-80 ${isHovering ? 'rotate-90 scale-x-50' : ''} transition-all duration-300`}></div>
        <div className={`absolute h-full w-[1px] bg-cyan-400 opacity-80 ${isHovering ? 'rotate-90 scale-y-50' : ''} transition-all duration-300`}></div>
        <div className={`absolute w-10 h-10 border border-cyan-500/50 rounded-full transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
      </div>
    </div>
  );
}
