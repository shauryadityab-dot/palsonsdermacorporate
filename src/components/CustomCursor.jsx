import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Media query to disable custom cursor on touch devices where hover isn't possible
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Use GSAP's quickTo for high-performance following (bypasses standard React state delays)
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      // Offset by half the width/height (12px) to center it strictly on the mouse
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);

    // Global Hover Detect logic
    const handleMouseOver = (e) => {
      // Target elements that should trigger the "hover/scale" effect
      // E.g. a, button, input, or elements explicitly marked with dataset attributes
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target) {
        setIsHovering(false);
      }
    };

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[999999] bg-white mix-blend-difference will-change-transform flex items-center justify-center transition-transform duration-300 ease-out hidden md:flex ${
        isHovering ? 'scale-[3] opacity-80' : 'scale-100 opacity-100'
      }`}
    >
      <span ref={textRef} className={`text-[4px] font-bold text-black uppercase tracking-widest opacity-0 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-0'}`}>
        {/* We can dynamically inject text here later if needed, e.g. "VIEW" or "DRAG" */}
      </span>
    </div>
  );
};

export default CustomCursor;
