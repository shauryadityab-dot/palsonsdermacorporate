import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Laboratories', value: 8, suffix: '' },
  { label: 'Patents', value: 142, suffix: '+' },
  { label: 'Efficacy Rate', value: 98, suffix: '%' },
  { label: 'Dermatologists', value: 5000, suffix: '+' },
];

const Manufacturing = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
  
    useEffect(() => {
      // Horizontal Wipe for Images/Blocks
      const blocks = gridRef.current.children;
      
      gsap.fromTo(blocks, 
        { clipPath: 'inset(0 100% 0 0)' },
        { 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out'
        }
      );
    }, []);
  
    return (
      <section ref={sectionRef} className="py-24 bg-[#f5f5f5] text-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-8">
            <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight leading-none">Research &<br/>Development</h2>
            <p className="text-right text-xs max-w-xs font-mono hidden md:block mt-4 md:mt-0 opacity-70">
              PIONEERING THE FUTURE OF DERMATOLOGICAL HEALTH.
            </p>
          </div>
  
          {/* Grid Layout */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-black">
             {stats.map((stat, i) => (
                <div key={i} className="border-r border-b border-black p-8 aspect-square flex flex-col justify-between hover:bg-white transition-colors duration-300 group">
                    <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-black">{stat.label}</span>
                    <div className="text-4xl font-bold font-serif">
                        {stat.value}{stat.suffix}
                    </div>
                </div>
             ))}
             
             {/* Visual Blocks filling remainder of grid if needed, or separate row */}
          </div>
  
          {/* Additional Factory Visuals Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-0 border-l border-b border-black">
             <div className="border-r border-black h-96 relative overflow-hidden group">
                 <img src="/assets/pexels-ron-lach-10222458.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-linear" alt="Lab Research" />
                 <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest">Active Compounds</div>
             </div>
             <div className="border-r border-black h-96 relative overflow-hidden group">
                 <img src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-linear" alt="Molecular Structure" />
                 <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest">Molecular Stability</div>
             </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Manufacturing;
