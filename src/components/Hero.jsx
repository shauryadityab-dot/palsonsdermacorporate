import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const { isLoaded } = useLoader();

  useEffect(() => {
    // We only want the scroll interaction, no entrance animation
    // The Hero needs to be visible immediately.

    // If we only want the text to animate on scroll, we could do that here.
    // However, the user asked to "just show the image and on scroll give the animation".
    // I will ensure the text is visible by removing the opacity-0 classes below.
  }, [isLoaded]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Scroll Interaction - Video Scale
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        scale: 0.65,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Video Background Placeholder */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full bg-cover z-0 origin-center" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("/assets/hero-banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%'
      }}>
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      </div>

      <div className="container relative z-10 text-center text-white mix-blend-normal">
        <h1 ref={textRef} className="hero-title text-5xl md:text-7xl font-serif font-medium tracking-tight uppercase leading-[0.9] mb-8">
          <div className="overflow-hidden inline-block italic">Passionate</div><br/>
          <div className="overflow-hidden inline-block">About</div><br/>
          <div className="overflow-hidden inline-block text-stroke">Dermatology</div>
        </h1>
        
        <div className="hero-sub max-w-xl mx-auto mt-8 flex flex-col items-center gap-8">
          <p className="text-sm md:text-base tracking-[0.2em] uppercase opacity-90 border-l-2 border-accent pl-4 text-left font-sans">
            Advanced dermatological formulas for cellular restructuring.
          </p>
          
          <button className="group relative px-8 py-3 bg-transparent border border-white text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors duration-300">
            Explore Capabilities
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white group-hover:border-black"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white group-hover:border-black"></div>
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference">
        <div className="w-[1px] h-16 bg-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line"></div>
        </div>
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
