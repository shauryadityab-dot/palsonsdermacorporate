import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manufacturing = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
  
    useEffect(() => {
     // Simple fade-in for sections
      gsap.utils.toArray('.fade-in-section').forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );
      });
    }, []);
  
    return (
      <section ref={sectionRef} className="pt-24 pb-0 bg-[#0B1121] text-white">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="mb-20 text-center fade-in-section">
             <h2 className="text-accent font-mono text-sm uppercase tracking-[0.3em] mb-4">Section 1</h2>
             <h1 className="text-5xl md:text-7xl font-serif mb-6">Innovation & Authority</h1>
             <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
                Establishing credibility through control, scale, and uncompromising verification systems.
             </p>
          </div>

          {/* 1. Existing Manufacturing Facility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center fade-in-section">
                <div className="relative h-[500px] border border-white/10 group overflow-hidden">
                    <img src="/assets/factory.jpg" alt="Manufacturing Facility" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 border-l-2 border-accent pl-4">
                        <span className="text-xs font-mono uppercase text-accent">Est. 1986</span>
                        <h3 className="text-xl font-serif">State-of-the-Art Unit</h3>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-3xl font-serif mb-4">Legacy & Evolution</h3>
                        <p className="text-white/70 leading-relaxed mb-6">
                            Our manufacturing journey began with a clear focus on quality-driven production. Over the years, our existing facility has grown into a robust, process-led manufacturing unit that laid the foundation for everything we do today. From infrastructure planning to workforce training, the facility was designed to support consistent output, strict quality benchmarks, and scalable operations.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 p-8 border border-white/10">
                        <h4 className="text-lg font-serif mb-4 text-accent">Transition to Dermatology</h4>
                        <p className="text-sm text-white/60 mb-4">
                            As consumer needs evolved, we made a conscious shift towards dermatology-backed formulations. This transition involved:
                        </p>
                        <ul className="space-y-3">
                            {['Upgrading machinery for active-driven formulations', 'Training teams for dermatology-grade protocols', 'Introducing lab-controlled stability environments'].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-white/80 items-start">
                                    <span className="text-accent mt-1">▹</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
          </div>

          {/* 2. International Standards */}
          <div className="mb-32 fade-in-section">
             <div className="flex flex-col md:flex-row gap-12 bg-[#101625] border border-white/10 p-12 relative overflow-hidden">
                 {/* Decorative BG */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

                 <div className="w-full md:w-1/3">
                     <h3 className="text-3xl font-serif mb-4">Quality is Non-Negotiable</h3>
                     <p className="text-white/60 text-sm leading-relaxed mb-6">
                        Every product manufactured undergoes 100+ quality checks. Our QC and QA teams operate independently to ensure unbiased validation at every stage.
                     </p>
                     <p className="text-white/60 text-sm leading-relaxed">
                        All processes adhere to international standards, ensuring safety, effectiveness, and consistency—batch after batch.
                     </p>
                 </div>

                 <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {[
                         'Raw material verification',
                         'In-process quality control',
                         'Stability testing',
                         'Microbiological safety checks',
                         'Final batch approval',
                         'Independent validation'
                     ].map((check, i) => (
                         <div key={i} className="flex items-center gap-4 bg-black/20 p-4 border border-white/5 hover:border-accent/50 transition-colors">
                             <div className="w-6 h-6 rounded-full border border-accent flex items-center justify-center text-accent text-[10px]">✓</div>
                             <span className="text-sm font-mono tracking-wide">{check}</span>
                         </div>
                     ))}
                 </div>
             </div>
          </div>
        </div>

        {/* 3. Evolution Timeline (White Background) */}
        <div className="w-full bg-white text-[#0B1121] py-24 fade-in-section">
          <div className="container mx-auto px-4 md:px-8">
             <div className="text-center mb-16">
                 <h3 className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4">Our Journey</h3>
                 <h2 className="text-3xl md:text-5xl font-serif">Evolution of Excellence</h2>
             </div>

             <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                 {/* Connecting Line (Desktop) */}
                 <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-[#0B1121]/10 z-0"></div>

                 {/* Stage 1 */}
                 <div className="relative z-10 flex flex-col items-center text-center group">
                     <div className="w-24 h-24 rounded-full bg-white border border-[#0B1121]/10 flex items-center justify-center mb-6 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(74,144,226,0.15)] transition-all duration-500 shadow-sm">
                         {/* Beaker Icon (Laboratory/Chemical) */}
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-accent transition-colors">
                            <path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>
                         </svg>
                     </div>
                     <h4 className="text-xl font-serif mb-3">Conventional Manufacturing</h4>
                     <p className="text-sm text-gray-500 px-8 leading-relaxed max-w-xs">
                         Establishing core quality benchmarks and consistent output systems.
                     </p>
                 </div>

                 {/* Stage 2 */}
                 <div className="relative z-10 flex flex-col items-center text-center group">
                     <div className="w-24 h-24 rounded-full bg-white border border-[#0B1121]/10 flex items-center justify-center mb-6 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(74,144,226,0.15)] transition-all duration-500 delay-100 shadow-sm">
                         {/* Shield Icon (Safety/Control) */}
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-accent transition-colors">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                         </svg>
                     </div>
                     <h4 className="text-xl font-serif mb-3">Systematized Control</h4>
                     <p className="text-sm text-gray-500 px-8 leading-relaxed max-w-xs">
                         Integrating strict safety protocols, independent QC/QA, and scalable processes.
                     </p>
                 </div>

                 {/* Stage 3 */}
                 <div className="relative z-10 flex flex-col items-center text-center group">
                     <div className="w-24 h-24 rounded-full bg-white border border-accent/50 shadow-lg flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-500 delay-200">
                         {/* Microscope Icon (Dermatology/Science) */}
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                            <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
                         </svg>
                     </div>
                     <h4 className="text-xl font-serif mb-3 text-accent">Dermatology-Grade</h4>
                     <p className="text-sm text-gray-600 px-8 leading-relaxed max-w-xs">
                         Advanced active-driven formulations produced in lab-controlled sterile environments.
                     </p>
                 </div>
             </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Manufacturing;
