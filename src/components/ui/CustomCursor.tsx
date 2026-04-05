import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[100] transition-transform duration-100 ease-out flex items-center justify-center mix-blend-exclusion`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
      }}
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
