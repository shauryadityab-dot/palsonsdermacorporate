import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manufacturing = () => {
    const sectionRef = useRef(null);
    const processRef = useRef(null);
  
    useEffect(() => {
     // Animate Process Steps
      const steps = processRef.current.children;
      gsap.fromTo(steps,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: processRef.current,
                start: "top 80%",
            }
        }
      );

    }, []);
  
    const processSteps = [
        { num: '01', title: 'Sourcing', desc: 'Procurement of premium grade active pharmaceutical ingredients from certified global suppliers.' },
        { num: '02', title: 'Quality Control', desc: 'Rigorous pre-production analysis ensuring purity and potency standards are met.' },
        { num: '03', title: 'Formulation', desc: 'Precision compounding in sterile, temperature-controlled active labs.' },
        { num: '04', title: 'Processing', desc: 'Advanced homogenization and stabilization using cutting-edge reaction vessels.' },
        { num: '05', title: 'Packaging', desc: 'Automated sterile filling and sealing to maintain formulation integrity.' },
        { num: '06', title: 'Distribution', desc: 'Final quality assurance and cold-chain logistics dispatch.' }
    ];

    return (
      <section ref={sectionRef} className="py-24 bg-[#f5f5f5] text-black border-t border-black">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-8">
            <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight leading-none">Manufacturing<br/>Excellence</h2>
            <p className="text-right text-xs max-w-xs font-mono hidden md:block mt-4 md:mt-0 opacity-70">
              END-TO-END PRODUCTION CAPABILITIES
            </p>
          </div>
  
          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {/* Plant 1 - Active */}
             <div className="group relative border border-black h-[500px] overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-xs uppercase tracking-widest">Unit 01: Operational</div>
                <img src="/assets/pexels-ron-lach-10222458.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Operational Facility" />
                <div className="absolute bottom-0 left-0 w-full bg-black/90 text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-serif mb-2">Primary Formulation Plant</h3>
                    <p className="text-sm opacity-70 font-mono">Specialized in topical semisolids and liquid manufacturing. Capacity: 50M units/annum.</p>
                </div>
             </div>

             {/* Plant 2 - Construction */}
             <div className="group relative border-2 border-dashed border-black/30 h-[500px] overflow-hidden bg-gray-200">
                <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 text-xs uppercase tracking-widest">Unit 02: Under Construction</div>
                 {/* Using a placeholder or different image style to imply construction/future */}
                <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop')] bg-cover grayscale opacity-50">
                    <div className="text-center p-8 bg-white/10 backdrop-blur-md border border-black/10">
                        <span className="block text-4xl font-bold mb-2">2027</span>
                        <span className="text-xs uppercase tracking-widest">Expansion Phase</span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black/90 text-white p-6">
                    <h3 className="text-2xl font-serif mb-2">Advanced Biologics Facility</h3>
                    <p className="text-sm opacity-70 font-mono">Future hub for peptide synthesis and nano-delivery systems. Commissioning Q1 2027.</p>
                </div>
             </div>
          </div>

          {/* Process Flow */}
          <div className="border-t border-black pt-16">
             <h3 className="text-xl uppercase tracking-widest mb-12 flex items-center gap-4">
                <div className="w-4 h-4 bg-black"></div>
                Production Lifecycle
             </h3>
             
             <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {processSteps.map((step, i) => (
                    <div key={i} className="relative pl-8 border-l border-black/20 group hover:border-black transition-colors duration-300">
                        <span className="absolute -left-3 top-0 text-4xl font-bold font-serif bg-[#f5f5f5] pr-2 text-black/20 group-hover:text-black transition-colors">{step.num}</span>
                        <h4 className="text-lg font-bold uppercase tracking-wider mb-2 mt-2">{step.title}</h4>
                        <p className="text-sm opacity-70 leading-relaxed font-mono">{step.desc}</p>
                    </div>
                ))}
             </div>
          </div>

        </div>
      </section>
    );
  };
  
  export default Manufacturing;
