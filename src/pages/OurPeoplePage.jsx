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


    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
            {/* Hero Section */}
            <header ref={headerRef} className="mb-8 md:mb-12 border-b border-white/20 pb-10">
                <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-6 uppercase">
                    Our People
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-4xl font-light leading-relaxed">
                    The heartbeat of our organization. We take pride in our long-term associations, fostering a culture of trust, growth, and shared success.
                </p>
            </header>

            {/* Events Section */}
            <section ref={addToRefs}>
                 <div className="border-t border-white/20 pt-4 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <h2 className="text-3xl md:text-5xl uppercase tracking-widest font-light">Life at Our Organization</h2>
                    <span className="text-sm text-white/50 mt-2 md:mt-0">CELEBRATIONS & EVENTS</span>
                </div>

                <div className="space-y-32">
                    {[
                        {
                            title: "Picnic",
                            description: "An annual winter retreat where our team bonds over food, games, and laughter in nature's lap. The highlight of the day is always the friendly yet competitive cricket and football matches that bring out the spirit of sportsmanship and camaraderie among us. It's a day to unwind, connect beyond work, and create lasting memories.",
                            date: "Winter Season",
                            image: "/assets/DSC_5732.webp"
                        },
                        {
                            title: "Vishwakarma Puja",
                            description: "Celebrating the divine architect, seeking blessings for our tools, machines, and workspace. It is a day of gratitude where we come together to honor the technology and equipment that drive our daily operations. The entire office is decorated, and the day concludes with a traditional feast and shared blessings.",
                            date: "September",
                            image: "/assets/DSC_1348.webp"
                        },
                        {
                            title: "Annual Function",
                            description: "A grand year-end celebration of our achievements, culture, and the dedicated people who make it all possible. The evening is filled with cultural performances, talent showcases, and awards for excellence. It serves as a moment of reflection and a collective step forward into the new year with renewed energy.",
                            date: "Year End",
                            image: "/assets/DSC_8012.webp"
                        }
                    ].map((event, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Image Side */}
                            <div className="w-full md:w-1/2">
                                <div className="aspect-video bg-white/5 overflow-hidden relative group border border-white/10">
                                    <img 
                                        src={event.image} 
                                        alt={event.title} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-mono rounded-full uppercase tracking-wider">
                                        {event.date}
                                    </div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2">
                                <h3 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">{event.title}</h3>
                                <div className="w-20 h-1 bg-blue-500/50 mb-8"></div>
                                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OurPeoplePage;
