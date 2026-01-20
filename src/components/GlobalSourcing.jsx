import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalSourcing = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Animate Map Nodes
    const nodes = mapRef.current.querySelectorAll('.sourcing-node');
    gsap.fromTo(nodes, 
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: {
          amount: 1.5,
          from: "random"
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

    // Animate Lines
    const lines = mapRef.current.querySelectorAll('.connection-line');
    gsap.fromTo(lines,
      { drawSVG: 0, opacity: 0 }, // Note: drawSVG needs Plugin, we'll simulate opacity/scale for now if no plugin
      {
        opacity: 0.4,
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%"
        }
      }
    );

  }, []);

  const isoCerts = [
    { code: "ISO 9001:2015", desc: "Quality Management System" },
    { code: "ISO 14001:2015", desc: "Environmental Management" },
    { code: "ISO 22716:2007", desc: "GMP for Cosmetics" },
    { code: "WHO GMP", desc: "World Health Organization Standard" }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-[#0B1121] text-white relative overflow-hidden border-b border-white/10">
        
        {/* Simplified World Map Background (Abstract) */}
        <div ref={mapRef} className="absolute inset-0 z-0 opacity-20">
             {/* Use a dotted grid to represent the world/tech */}
             <div className="absolute inset-0" 
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
             </div>
             
             {/* Randomly placed 'nodes' to represent 75 countries */}
             {Array.from({ length: 30 }).map((_, i) => (
                 <div key={i} className="sourcing-node absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(0,170,255,0.8)]"
                      style={{ 
                          top: `${Math.random() * 80 + 10}%`, 
                          left: `${Math.random() * 90 + 5}%` 
                      }}>
                 </div>
             ))}

             {/* Center Node (India/HQ) */}
             <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-white rounded-full z-10 shadow-[0_0_20px_white] animate-pulse"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                
                {/* Text Content */}
                <div className="md:w-1/2">
                    <h2 className="text-accent font-mono text-sm tracking-widest mb-4">GLOBAL SOURCING NETWORK</h2>
                    <h3 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                        World Class<br/>
                        <span className="text-stroke">Ingredients</span>
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-lg">
                        We define excellence by the purity of our inputs. Sourcing active pharmaceutical ingredients from <span className="text-white font-bold">75+ countries</span>, ensuring that every formulation meets global benchmarks of efficacy and safety.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div>
                            <span className="block text-5xl font-bold mb-2">75+</span>
                            <span className="text-xs uppercase tracking-widest opacity-60">Source Countries</span>
                        </div>
                        <div>
                            <span className="block text-5xl font-bold mb-2">100%</span>
                            <span className="text-xs uppercase tracking-widest opacity-60">Vendor Audited</span>
                        </div>
                    </div>
                </div>

                {/* ISO Cards */}
                <div className="md:w-1/2 grid grid-cols-1 gap-4">
                    <h4 className="text-right text-xs uppercase tracking-widest opacity-50 mb-4">Accreditations & Standards</h4>
                    {isoCerts.map((cert, idx) => (
                        <div key={idx} className="group flex items-center justify-between p-6 border border-white/10 hover:bg-white/5 hover:border-accent transition-all duration-300">
                            <div>
                                <span className="block text-xl font-bold group-hover:text-accent transition-colors">{cert.code}</span>
                                <span className="text-xs font-mono opacity-60">{cert.desc}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent">
                                <span className="text-xs">✓</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

        {/* Floating Ticker */}
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm py-3">
             <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs uppercase tracking-[0.2em] opacity-50 font-mono">
                 {['USA', 'Germany', 'France', 'Switzerland', 'Japan', 'South Korea', 'Italy', 'Canada', 'Australia', 'Spain', 'United Kingdom'].map(country => (
                     <span key={country}>Imported from {country}</span>
                 ))}
                 {['USA', 'Germany', 'France', 'Switzerland', 'Japan', 'South Korea', 'Italy', 'Canada', 'Australia', 'Spain', 'United Kingdom'].map(country => (
                     <span key={country + '_dup'}>Imported from {country}</span>
                 ))}
             </div>
        </div>

    </section>
  );
};

export default GlobalSourcing;
