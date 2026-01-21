import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResearchLabs = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll for Test Cards
      const sections = gsap.utils.toArray('.test-card');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (containerRef.current.offsetWidth * (sections.length - 1)),
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tests = [
    {
      id: '01',
      name: 'Microbiological Analysis',
      result: '0.00% Contamination',
      desc: 'Rigorous sterility testing across 5 stages of production.',
      icon: 'microscope' 
    },
    {
      id: '02',
      name: 'Stability Profiling',
      result: '98% Potency Retention',
      desc: 'Accelerated aging tests simulating 3 years of shelf life.',
      icon: 'clock'
    },
    {
      id: '03',
      name: 'Dermatological Safety',
      result: 'Non-Irritant Certified',
      desc: 'Patch testing on sensitive skin groups under clinical supervision.',
      icon: 'shield'
    },
    {
      id: '04',
      name: 'Bio-Availability',
      result: 'Enhanced Penetration',
      desc: 'Nano-emulsion verification for deep tissue delivery.',
      icon: 'dna'
    }
  ];

  return (
    <div className="bg-black text-white relative">
      
      {/* Intro Section - Values */}
      <div className="py-24 border-b border-white/10 bg-[#080c14]">
          <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                  <span className="text-accent font-mono text-xs uppercase tracking-widest mb-4 block">Our Philosophy</span>
                  <h2 className="text-4xl md:text-6xl font-serif mb-12">
                      40 Years of<br/>
                      <span className="text-white/50 italic">Uncompromising Science</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm leading-relaxed opacity-70">
                      <p>
                          Since 1986, we have operated on a single premise: Efficacy is non-negotiable. 
                          We don't chase trends; we engineer solutions rooted in cellular biology and validated by rigorous clinical data.
                      </p>
                      <p>
                          Our R&D centers are not just labs; they are the proving grounds where raw chemistry is transformed into therapeutic certainty.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* Horizontal Scroll Test Laboratory */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col relative bg-[#0B1121]">
          
          {/* Header / Label - Relative positioning to sit above cards */}
          <div className="w-full px-8 pt-32 pb-8 z-20 flex-shrink-0">
              <h3 className="text-xl uppercase tracking-widest font-bold">Research & Verification</h3>
              <p className="font-mono text-xs opacity-50 mt-1">LIVE DATA STREAM // LAB_04</p>
          </div>

          {/* Cards Wrapper - Takes remaining height */}
          <div className="flex-1 w-full relative">
            <div ref={scrollContainerRef} className="flex h-full w-[400%]">
                {tests.map((test, i) => (
                    <div key={i} className="test-card w-screen h-full flex flex-col justify-center items-center relative border-r border-white/5">
                        
                        {/* Background Tech Elements */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent"></div>
                            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-accent"></div>
                            <div className="absolute top-[20%] right-[20%] w-32 h-32 border border-dashed border-white rounded-full animate-spin-slow"></div>
                        </div>

                        <div className="relative z-10 text-center p-8 max-w-2xl bg-[#0B1121]/80 backdrop-blur-md border border-white/10 shadow-2xl">
                            <div className="inline-block px-4 py-1 border border-accent text-accent text-xs font-mono mb-8">
                                TEST PROTOCOL _{test.id}
                            </div>
                            
                            <h4 className="text-5xl md:text-7xl font-bold mb-4">{test.result}</h4>
                            <h5 className="text-xl uppercase tracking-widest mb-6 opacity-80">{test.name}</h5>
                            
                            <p className="text-white/60 font-mono text-sm leading-7">
                                {test.desc}
                            </p>

                            {/* Data Bars */}
                            <div className="mt-8 flex gap-1 justify-center h-8 items-end">
                                {[...Array(10)].map((_, idx) => (
                                    <div key={idx} 
                                         className="w-2 bg-accent/30" 
                                         style={{ height: `${Math.random() * 100}%` }}>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {tests.map((_, i) => (
                <div key={i} className="w-12 h-1 bg-white/20">
                     {/* We could animate this based on scroll index if needed */}
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ResearchLabs;
