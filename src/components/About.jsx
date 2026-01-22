import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Text Reveal Word by Word
    const words = textRef.current.querySelectorAll('span');
    
    gsap.fromTo(words, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Image Slide In
    gsap.fromTo(imageRef.current,
      { x: '100%' },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1.5,
        },
        x: '0%',
        ease: "none" // Mechanical feel
      }
    );
  }, []);

  const headline = "Science-backed efficacy for compromised biomarkers.";

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#f5f5f5] text-black grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Text Content */}
      <div className="p-10 md:p-20 flex flex-col justify-center relative border-r border-[#ccc]">
        <div className="mb-8">
             <span className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black pb-2 font-sans">The Science</span>
        </div>
        
        <h2 ref={textRef} className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] uppercase tracking-tight mb-12 text-[#111]">
          {headline.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-3">{word}</span>
          ))}
        </h2>

        <div className="space-y-8 max-w-lg text-sm md:text-lg leading-relaxed text-gray-800 font-sans">
            <p className="border-l-2 border-black pl-6">
                We believe in molecular precision. Our formulations are engineered to penetrate the dermal layer with zero irritation.
            </p>
            <p>
                Trusted by 5,000+ dermatologists worldwide. We don't follow trends; we follow clinical data.
            </p>
        </div>
      </div>

      {/* Right Image/Video Content */}
      <div className="relative h-60 md:h-auto bg-[#1a1a1a] overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <img 
                src="/assets/applying-face-serum.jpg" 
                alt="Clinical Texture" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        </div>
        
        {/* Decorative elements */}

      </div>
    </section>
  );
};

export default About;
