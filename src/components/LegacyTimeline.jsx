import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2010', title: 'Inception', description: 'Founded by Dr. A. Vance with a focus on barrier repair.', image: '/assets/side-view-smiley-woman-posing.webp', 
    sideInfo: { value: '01', label: 'First Patent Filing' } 
  },
  { year: '2015', title: 'Patent #402', description: 'Breakthrough in peptide delivery systems.', image: '/assets/young-beautiful-smiling-female-trendy-summer-white-dress-sexy-carefree-woman-posing-near-blue-wall-studio-positive-model-having-fun-cheerful-happy-isolated.webp',
    sideInfo: { value: '500+', label: 'Clinical Trials' }
  },
  { year: '2021', title: 'Clinical Trials', description: 'FDA clearance for our core restructuring serum.', image: '/assets/Global-Cosmetics-Cosmetic-Manufacturer-Production-Process.webp',
    sideInfo: { value: '98%', label: 'Efficacy Rate' }
  },
  { year: '2026', title: 'Global Apex', description: 'Standard of care in 45 countries.', image: '/assets/young-girl-with-perfect-light-brown-skin-beautiful-curly-black-hair-smiling-camera-studio.webp',
    sideInfo: { value: '45+', label: 'Countries Served' }
  },
];

const LegacyTimeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Vertical Line Growth
    gsap.fromTo(lineRef.current,
      { height: '0%' },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        height: '100%',
        ease: "none"
      }
    );

    // Cards Animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 }, // Alternating sides
        {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 50%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          x: 0,
          ease: "none"
        }
      );
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white relative flex flex-col items-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container relative z-10 w-full max-w-5xl">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.4em] mb-20 text-white font-sans">Legacy / Timeline</h2>
        
        <div className="relative">
          {/* Central Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[3px] bg-white/10">
             <div ref={lineRef} className="w-full bg-accent"></div>
          </div>

          <div className="space-y-24 md:space-y-48">
            {milestones.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row w-full justify-between items-center relative gap-8 md:gap-0"
              >
                 {/* Dot on line & Year Label - Desktop Only */}
                 <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-20 top-1/2 -translate-y-1/2">
                    <span className="mb-2 font-mono text-sm font-bold tracking-widest bg-black text-white px-2 border border-white/20 shadow-sm">{item.year}</span>
                    <div className="w-4 h-4 bg-black border-2 border-accent rounded-full"></div>
                 </div>

                 {/* Mobile Year Header */}
                 <div className="md:hidden flex flex-col items-center">
                    <span className="text-4xl font-serif font-bold text-white">{item.year}</span>
                    <div className="w-1 h-8 bg-accent my-2"></div>
                 </div>

                 {/* Left Side Content */}
                 <div className={`w-full ${index % 2 === 0 ? 'md:w-[55%] order-2 md:order-1' : 'md:w-[35%] order-3 md:order-1'}`}>
                    {index % 2 === 0 ? (
                        <div 
                        ref={el => cardsRef.current[index] = el}
                        className="group w-full h-80 relative overflow-hidden border border-white/10 transition-all duration-500 hover:border-accent shadow-sm ml-auto"
                        >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-50 group-hover:brightness-75" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                            <div className="mb-auto"></div>
                            <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 border-t border-white/30 pt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 text-white">{item.title}</h3>
                            <p className="text-sm text-gray-300 font-mono leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{item.description}</p>
                        </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center md:items-end text-center md:text-right px-0 md:px-8 opacity-100">
                            <span className="text-3xl md:text-5xl font-bold font-serif text-white/20">{item.sideInfo.value}</span>
                            <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-accent">{item.sideInfo.label}</span>
                        </div>
                    )}
                 </div>

                 {/* Right Side Content */}
                 <div className={`w-full ${index % 2 !== 0 ? 'md:w-[55%] order-2 md:order-3' : 'md:w-[35%] order-3 md:order-3'}`}>
                     {index % 2 !== 0 ? (
                        <div 
                        ref={el => cardsRef.current[index] = el}
                        className="group w-full h-80 relative overflow-hidden border border-white/10 transition-all duration-500 hover:border-accent shadow-sm mr-auto"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-50 group-hover:brightness-75" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                            </div>
    
                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                                <div className="mb-auto"></div>
                                <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 border-t border-white/30 pt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 text-white">{item.title}</h3>
                                <p className="text-sm text-gray-300 font-mono leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{item.description}</p>
                            </div>
                        </div>
                     ) : (
                        <div className="flex flex-col items-center md:items-start text-center md:text-left px-0 md:px-8 opacity-100">
                            <span className="text-3xl md:text-5xl font-bold font-serif text-white/20">{item.sideInfo.value}</span>
                            <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-accent">{item.sideInfo.label}</span>
                        </div>
                     )}
                 </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacyTimeline;
