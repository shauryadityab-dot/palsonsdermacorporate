 import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FutureFactory = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current.children,
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }
        );
    }, []);

    const features = [
        { title: "operational footprint", label: "Larger" },
        { title: "production capacity", label: "Increased" },
        { title: "certifications", label: "Advanced" },
        { title: "location advantage", label: "Strategic" }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-[#f5f5f5] text-[#0B1121] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2 z-10">
                        <span className="block text-accent font-mono text-xs uppercase tracking-[0.3em] mb-6">Future Vision</span>
                        <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                            A Glimpse Into <br/>
                            <span className="italic text-gray-400">What’s Next</span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-xl">
                            The upcoming Gujrap manufacturing facility marks the next phase of our growth—designed for scale, efficiency, and advanced compliance.
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-12 mb-12">
                            {features.map((feature, i) => (
                                <div key={i} className="border-l-2 border-accent/20 pl-6">
                                    <span className="block text-2xl font-serif mb-1">{feature.label}</span>
                                    <span className="text-sm font-mono uppercase tracking-wider text-gray-500">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="inline-block py-3 px-6 border border-[#0B1121]/10 bg-white shadow-sm">
                            <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                                Not a replacement—an expansion of our manufacturing ecosystem.
                            </span>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="w-full md:w-1/2 relative h-[600px]">
                        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                            {/* Using a monochrome/blueprint style via CSS filters for "Sneak Peek" vibe */}
                            <img 
                                src="/assets/cosmetics-factory.jpg" 
                                alt="Future Facility" 
                                className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Overlay patterns */}
                            <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-20 bg-repeat bg-[length:50px_50px]"></div>
                            
                            {/* Floating "Confidential" / "Coming Soon" marker */}
                            <div className="absolute bottom-8 right-8 bg-[#0B1121] text-white p-6 shadow-2xl border border-white/10 backdrop-blur-md">
                                <div className="text-xs font-mono mb-2 text-accent">PROJECT: GUJRAP</div>
                                <div className="text-2xl font-serif">Commissioning 2027</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FutureFactory;
