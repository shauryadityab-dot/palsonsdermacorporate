import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurPeoplePage = () => {
    const headerRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });

            sectionsRef.current.forEach((el, index) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: index * 0.1
                });
            });
        });

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    const events = [
        {
            title: "Picnic",
            description: "An annual retreat where our team bonds over food, games, and laughter in nature's lap.",
            date: "Winter Season"
        },
        {
            title: "Vishwakarma Puja",
            description: "Celebrating the divine architect, seeking blessings for our tools, machines, and workspace.",
            date: "September"
        },
        {
            title: "Annual Function",
            description: "A grand celebration of our achievements, culture, and the dedicated people who make it all possible.",
            date: "Year End"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
            {/* Hero Section */}
            <header ref={headerRef} className="mb-20 md:mb-32 border-b border-white/20 pb-10">
                <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-6 uppercase">
                    Our People
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-4xl font-light leading-relaxed">
                    The heartbeat of our organization. We take pride in our long-term associations, fostering a culture of trust, growth, and shared success.
                </p>
            </header>

            {/* Long Term Associates Section */}
            <section ref={addToRefs} className="mb-32">
                <div className="border-t border-white/20 pt-4 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <h2 className="text-3xl md:text-4xl uppercase tracking-widest font-light">Long-term Associates</h2>
                    <span className="text-sm text-white/50 mt-2 md:mt-0">DEDICATION & LOYALTY</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-black p-8 md:p-12 border border-white/5 hover:border-white/20 transition-colors duration-300 min-h-[300px] flex flex-coljustify-between">
                            <div className="w-full h-48 bg-white/5 mb-6 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                                [Image Placeholder]
                            </div>
                            <div>
                                <h3 className="text-xl font-medium mb-1">Team Member Name</h3>
                                <p className="text-white/50 text-sm mb-4">Designation • 10+ Years</p>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Events Section */}
            <section ref={addToRefs}>
                 <div className="border-t border-white/20 pt-4 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <h2 className="text-3xl md:text-4xl uppercase tracking-widest font-light">Life at Our Organization</h2>
                    <span className="text-sm text-white/50 mt-2 md:mt-0">CELEBRATIONS & EVENTS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <div key={index} className="group relative border-t border-white/20 pt-8 transition-all hover:border-white/60">
                            <div className="aspect-video bg-white/5 mb-6 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest group-hover:bg-white/10 transition-colors">
                                [ {event.title} Image ]
                            </div>
                            <span className="absolute top-8 right-0 text-xs font-mono text-white/50 border border-white/20 px-2 py-1 rounded-full">{event.date}</span>
                            <h3 className="text-2xl font-light uppercase tracking-wide mb-3 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                {event.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OurPeoplePage;
