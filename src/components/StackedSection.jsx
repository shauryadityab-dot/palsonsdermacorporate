import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StackedSection = ({ children, isLast = false, zIndex = 1 }) => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // We don't animate the last section out since there's nothing below it
    if (isLast) return;

    // Use gsap matchMedia so this complex overlap doesn't break mobile scrolling if unwanted,
    // though it generally works well if built carefully.
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: true,
          pin: wrapperRef.current, // Pin the wrapper
          pinSpacing: false, // Don't add spacing, let the next section slide over it!
        }
      });

      // Animate the inner section backwards
      tl.to(sectionRef.current, {
        scale: 0.95,
        y: -50,
        opacity: 0.5,
        filter: "brightness(0.5)",
        borderRadius: "2rem",
        ease: "none"
      });

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
        // Simpler mobile version - just pin it without the heavy scale/filter logic
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: wrapperRef.current,
                pinSpacing: false,
            }
        });

        tl.to(sectionRef.current, {
            scale: 0.98,
            filter: "brightness(0.7)",
            borderRadius: "1rem",
            ease: "none"
        });

        return () => tl.kill();
    });

    return () => mm.revert();
  }, [isLast]);

  return (
    <div 
        ref={wrapperRef} 
        className="relative w-full h-screen overflow-hidden" 
        style={{ zIndex }}
    >
        <div ref={sectionRef} className="w-full h-full will-change-transform origin-top overflow-hidden bg-black">
            {children}
        </div>
    </div>
  );
};

export default StackedSection;
