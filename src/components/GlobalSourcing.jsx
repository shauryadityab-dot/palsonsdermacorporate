import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalSourcing = () => {
  const canvasRef = useRef();
  const sectionRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [activeCountry, setActiveCountry] = useState(null);
  const focusRef = useRef({ phi: 0 });

  // Ingredient Data with Coordinates (approximate centers)
  const locations = [
    {
      country: "USA",
      coords: [37.0902, -95.7129],
      sources: [
        { supplier: "Various", items: ["Jojoba Spheres", "PEG 50 Shea Butter"] }
      ]
    },
    {
      country: "France",
      coords: [48.8932, 2.4027], // Pantin (Solabia)
      sources: [
        { supplier: "Solabia", items: ["Glycopatch"] },
        { supplier: "Lucas Meyer", items: ["Capixyl", "Melanostatine 5"] }
      ]
    },
    {
      country: "Spain",
      coords: [41.6032, 2.2921], // Barcelona/Granollers (Textron)
      sources: [
        { supplier: "Textron Plimon", items: ["Sweet Almond Oil"] }
      ]
    },
    {
      country: "Netherlands",
      coords: [51.8306, 4.9744], // Gorinchem (Corbion)
      sources: [
        { supplier: "Corbion PURAC", items: ["Buffered Lactic Acid"] },
        { supplier: "DSM", items: ["Hya Act S & M (Hyaluronic Acid)", "Alpha Arbutin", "D-Panthenol"] }
      ]
    },
    {
        country: "Monaco",
        coords: [43.7384, 7.4246],
        sources: [
          { supplier: "Exsymol", items: ["Alistin", "Albatin"] }
        ]
    },
    {
      country: "Switzerland",
      coords: [47.5596, 7.5886], // Basel (Lonza)
      sources: [
        { supplier: "Lonza", items: ["Niacinamide"] }
      ]
    },
    {
      country: "Germany",
      coords: [49.4875, 8.4660], // Ludwigshafen (BASF)
      sources: [
        { supplier: "BASF", items: ["Tinosorb S", "Vitamin E"] },
        { supplier: "Merck", items: ["Ectoin"] },
        { supplier: "CLR", items: ["Follicusan", "Hexaplant Richter Ceramide Complex"] },
        { supplier: "Gustav Heess", items: ["Shea Butter", "Olive Oil", "Argan Oil"] },
        { supplier: "Symrise", items: ["Symwhite 377"] }
      ]
    },
    {
      country: "Japan",
      coords: [34.6551, 133.9195], // Okayama (Hayashibara)
      sources: [
        { supplier: "Hayashibara Nagase", items: ["Ascorbyl Glucoside"] }
      ]
    },
    {
        country: "Australia",
        coords: [-28.7738, 153.5358], // Knockrow (Southern Cross)
        sources: [
          { supplier: "Southern Cross Botanicals", items: ["Australian Caviar Lime Pearl"] }
        ]
      }
  ];

  // Convert lat/long to phi/theta
  const markers = locations.map(loc => {
      const [lat, long] = loc.coords;
      return { location: [lat, long], size: 0.05 };
  });

  const handleCountryClick = (index) => {
      setActiveCountry(index);
      const longitude = locations[index].coords[1];
      // Convert longitude to phi (radians).
      focusRef.current.phi = longitude * Math.PI / 180;
  };

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1], // Cyan/Blue accent
      glowColor: [0.05, 0.05, 0.05],
      scale: 0.8,
      offset: [-500, 500],
      markers: markers,
      onRender: (state) => {
        // If user is interacting via pointer
        if (pointerInteracting.current !== null) {
            const delta = pointerInteractionMovement.current;
            pointerInteractionMovement.current = delta;
            phi += delta * 0.005;
        } 
        // If a country is active, rotate towards it
        else if (activeCountry !== null) {
            let target = focusRef.current.phi;
            // Adjust smooth interpolation
            const dist = target - phi;
            phi += dist * 0.05;
        } 
        // Auto rotate default
        else {
            phi += 0.003;
        }

        state.phi = phi;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [activeCountry]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#0B1121] text-white overflow-hidden border-b border-white/10 relative">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
                
                {/* Globe Visualization */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                    <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] relative">
                         <canvas
                            ref={canvasRef}
                            style={{ width: '100%', height: '100%', contain: 'layout paint size', opacity: 0 }}
                            className="transition-opacity duration-1000 ease-in-out fade-in-canvas"
                            onLoad={(e) => e.target.style.opacity = 1}
                         />
                         {/* Fallback/Loading or Decorative ring */}
                         <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 flex flex-col gap-10">
                    <div>
                        <h2 className="text-accent font-mono text-sm tracking-widest mb-4 uppercase">Section 2</h2>
                        <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-none">
                            International <br /> <span className="text-stroke">Ingredient Sourcing</span>
                        </h3>
                        
                        <div className="space-y-6 text-white/70 text-sm leading-relaxed mb-8">
                             <div>
                                <h4 className="text-white font-serif text-lg mb-2">Why We Source Ingredients Globally</h4>
                                <p>
                                    Great formulations start with great ingredients. We source globally because certain ingredients perform best when sourced from their regions of origin—where climate, soil, and expertise align. By working with globally renowned suppliers, we ensure access to higher purity grades, better stability profiles, and clinically validated actives.
                                </p>
                             </div>
                        </div>
                    </div>
                    
                    {/* Interactive List */}
                    <div>
                        <p className="text-accent text-xs font-mono uppercase tracking-widest mb-4">Explore Our Sources</p>
                        <div className="h-[300px] overflow-y-auto pr-4 custom-scrollbar space-y-4 bg-white/5 p-4 border border-white/10 rounded-sm">
                            {locations.map((loc, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => handleCountryClick(idx)}
                                    className={`group border-l-2 pl-4 cursor-pointer transition-all duration-300 ${activeCountry === idx ? 'border-accent bg-white/5 py-3' : 'border-white/10 hover:border-white/50'}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className={`text-xl font-light transition-colors ${activeCountry === idx ? 'text-accent' : 'text-white group-hover:text-white/80'}`}>
                                            {loc.country}
                                        </h4>
                                        {activeCountry === idx && <span className="text-[10px] text-accent animate-pulse">● ACTIVE</span>}
                                    </div>
                                    
                                    <div className={`space-y-3 transition-all duration-500 overflow-hidden ${activeCountry === idx ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}> 
                                        {loc.sources.map((source, sIdx) => (
                                            <div key={sIdx} className="border-t border-white/10 pt-2">
                                                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">{source.supplier}</p>
                                                <ul className="text-xs text-white/80 font-mono space-y-1">
                                                    {source.items.map((item, iIdx) => (
                                                        <li key={iIdx}>- {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How & Consumer Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div>
                             <h4 className="text-white font-serif text-lg mb-3">How We Do It Differently</h4>
                             <ul className="space-y-2 text-white/60">
                                <li className="flex gap-2"><span className="text-accent">▹</span> Suppliers vetted for compliance</li>
                                <li className="flex gap-2"><span className="text-accent">▹</span> Ingredients re-tested upon arrival</li>
                                <li className="flex gap-2"><span className="text-accent">▹</span> Long-term strategic partnerships</li>
                             </ul>
                        </div>
                        <div>
                             <h4 className="text-white font-serif text-lg mb-3">Consumer Benefits</h4>
                             <ul className="space-y-2 text-white/60">
                                <li className="flex gap-2"><span className="text-accent">▹</span> Better product efficacy</li>
                                <li className="flex gap-2"><span className="text-accent">▹</span> Reduced risk of irritation</li>
                                <li className="flex gap-2"><span className="text-accent">▹</span> Consistent results</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>{`
            .fade-in-canvas {
                animation: fadeIn 1.5s forwards;
            }
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            /* Custom Scrollbar for the list */
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.4);
            }
        `}</style>
    </section>
  );
};

export default GlobalSourcing;
