import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalSourcing = () => {
  const canvasRef = useRef();
  const sectionRef = useRef(null);
  const [focusLocation, setFocusLocation] = useState([0, 0]); // [phi, theta] in radians

  // Ingredient Data with Coordinates (approximate centers)
  // Phi (lat) = (90 - lat) * (PI/180)
  // Theta (lng) = (lng + 180) * (PI/180) - usually needs some adjustment for Cobe
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
        // Called on every animation frame.
        // state.phi = phi
        state.phi = phi + focusLocation[0]; 
        // We can rotate automatically or focus
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

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
                <div className="w-full md:w-1/2">
                    <h2 className="text-accent font-mono text-sm tracking-widest mb-4">GLOBAL SOURCING</h2>
                    <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-none">
                        Best-in-Class <br /> <span className="text-stroke">Ingredients</span>
                    </h3>
                    
                    <div className="h-[400px] overflow-y-auto pr-4 custom-scrollbar space-y-8">
                        {locations.map((loc, idx) => (
                            <div key={idx} className="group border-l-2 border-white/10 pl-6 hover:border-accent transition-colors duration-300">
                                <h4 className="text-2xl font-light mb-2 text-white group-hover:text-accent">{loc.country}</h4>
                                <div className="space-y-4">
                                    {loc.sources.map((source, sIdx) => (
                                        <div key={sIdx}>
                                            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{source.supplier}</p>
                                            <ul className="text-sm text-white/80 font-light space-y-1">
                                                {source.items.map((item, iIdx) => (
                                                    <li key={iIdx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
