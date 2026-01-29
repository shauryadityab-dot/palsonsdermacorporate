import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Text Reveal Word by Word
    const words = textRef.current.querySelectorAll('span');
    
    gsap.fromTo(words, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Image Slide In
    gsap.fromTo(imageRef.current,
      { x: '100%' },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1.5,
        },
        x: '0%',
        ease: "none" // Mechanical feel
      }
    );
  }, []);

  const headline = "Science-backed efficacy for compromised biomarkers.";

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#f5f5f5] text-black flex flex-col">
      {/* Intro Section - Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-b border-[#ccc]">
        {/* Left Text Content */}
        <div className="p-10 md:p-20 flex flex-col justify-center relative border-r border-[#ccc]">
            <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black pb-2 font-sans">About Us</span>
            </div>
            
            <h2 ref={textRef} className="text-3xl md:text-4xl font-serif font-medium leading-[1.2] uppercase tracking-tight mb-8 text-[#111]">
                We are a dermatologists’ certified company striving to learn, improvise and go that extra mile.
            </h2>

            <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-800 font-sans">
                <p>
                    Accomplishing national and international recognition, Palsons Derma is among the first few upcoming pharmaceutical companies in India that have launched its skincare line with absolute dermatologists’ approval.
                </p>
                <p>
                    In addition, the ISO 22716 Certified Company is the first company from Eastern India to win the most prestigious and coveted Quality Excellence Award from IDMA.
                </p>
            </div>
        </div>

        {/* Right Image Content */}
        <div className="relative h-60 md:h-auto bg-[#1a1a1a] overflow-hidden">
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <img 
                    src="/assets/lab.webp" 
                    alt="Palsons Derma" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white text-black">
        {/* Mission */}
        <div className="p-10 md:p-20 border-b md:border-b-0 md:border-r border-[#ccc]">
            <h3 className="text-2xl font-serif uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-black"></span>
                Our Mission
            </h3>
            <ul className="space-y-4 font-sans text-sm md:text-base list-disc list-outside pl-5 leading-relaxed text-gray-700">
                <li>To attain leadership position in the field of dermatology.</li>
                <li>To formulate products, which are unique & first times in the country.</li>
                <li>Tie-up with international dermatological companies for marketing their unique formulations.</li>
                <li>Create a manufacturing facility of international standard to cater unique formulations across the globe.</li>
                <li>Initiate a center of excellence in dermatology.</li>
            </ul>
        </div>

        {/* Vision */}
        <div className="p-10 md:p-20">
            <h3 className="text-2xl font-serif uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-2 h-8 bg-black"></span>
                 Our Vision
            </h3>
            <p className="mb-4 font-medium italic">A unique organization, wholly dedicated to the cause of dermatology in totality:</p>
            <ul className="space-y-4 font-sans text-sm md:text-base list-disc list-outside pl-5 leading-relaxed text-gray-700">
                <li>Of national repute with a global presence.</li>
                <li>Involved in manufacturing & marketing of unique dermatological formulations.</li>
                <li>Creating a Centre of excellence, dedicated to progressive research.</li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
