import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2010', title: 'Inception', description: 'Founded by Dr. A. Vance with a focus on barrier repair.', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop' },
  { year: '2015', title: 'Patent #402', description: 'Breakthrough in peptide delivery systems.', image: '/assets/pexels-cottonbro-4612159.jpg' },
  { year: '2021', title: 'Clinical Trials', description: 'FDA clearance for our core restructuring serum.', image: '/assets/pexels-mandiri-abadi-396768996-14805033.jpg' },
  { year: '2026', title: 'Global Apex', description: 'Standard of care in 45 countries.', image: '/assets/pexels-polina-kovaleva-6543617.jpg' },
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
           style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container relative z-10 w-full max-w-5xl">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.4em] mb-20 text-gray-500 font-sans">Legacy / Timeline</h2>
        
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-[#222]">
             <div ref={lineRef} className="w-full bg-accent"></div>
          </div>

          <div className="space-y-48">
            {milestones.map((item, index) => (
              <div 
                key={index} 
                className={`flex w-full ${index % 2 === 0 ? 'justify-end md:justify-start' : 'justify-start md:justify-end'} relative`}
              >
                 {/* Dot on line */}
                 <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-black border border-white z-20 top-1/2 -translate-y-1/2"></div>

                 <div 
                    ref={el => cardsRef.current[index] = el}
                    className={`group w-full md:w-[45%] h-80 relative overflow-hidden border border-gray-800 transition-all duration-500 hover:border-white ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                 >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-50 group-hover:brightness-75" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                        <div className="flex items-baseline gap-4 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                             <span className="text-6xl font-serif font-bold text-white/20 group-hover:text-white transition-colors duration-500">{item.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 border-t border-white/30 pt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                        <p className="text-sm text-gray-300 font-mono leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{item.description}</p>
                    </div>
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
