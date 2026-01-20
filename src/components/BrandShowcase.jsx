import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandShowcase = () => {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);

  const brands = [
    {
      id: 'qsera',
      name: 'Qsera',
      tagline: 'Advanced Hair Vitality',
      description: 'Qsera revolutionizes hair care with clinically proven peptides that reactivate hair follicles.',
      stats: [
        { value: '85%', label: 'Regrowth Rate' },
        { value: '12 Weeks', label: 'Visible Results' },
        { value: 'Clinical', label: 'Dermatologist Tested' }
      ],
      testDetails: 'In a double-blind placebo-controlled study, Qsera demonstrated statistically significant increase in hair density and thickness markers. The proprietary peptide complex targets the anagen phase of the hair cycle.',
      image: '/assets/Qsera.webp', // Using logo for now, but in a real design we might want a product shot or tech viz
      bgImage: '/assets/pexels-chloe-amaya-1047565-4079215.jpg' // Reusing hero BG for texture
    },
    {
      id: 'nmfe',
      name: 'NMFE',
      tagline: 'Lipid Barrier Restoration',
      description: 'Intensive hydration technology matching the skin\'s natural moisturizing factors.',
      stats: [
        { value: '24h', label: 'Hydration Lock' },
        { value: '100%', label: 'Non-Comedogenic' },
        { value: 'Safe', label: 'For Sensitive Skin' }
      ],
      testDetails: 'Clinical corneometry showed a 150% increase in skin hydration levels 1 hour after application, sustained for 24 hours. Validated for atopic dermatitis adjunctive care.',
      image: '/assets/nmfe.webp',
      bgImage: '/assets/pexels-ron-lach-10222458.jpg'
    },
    {
      id: 'wizderm',
      name: 'Wizderm',
      tagline: 'Clinical Skin Correction',
      description: 'Professional-grade formulations for targeted hyperpigmentation and brightening control.',
      stats: [
        { value: '9/10', label: 'Patient Satisfaction' },
        { value: '4 Weeks', label: 'Tone Correction' },
        { value: 'Active', label: 'Melanin Inhibition' }
      ],
      testDetails: 'In-vitro studies confirm 60% reduction in tyrosinase activity. Clinical trials demonstrate visible reduction in melasma and PIH scores within 28 days of regular usage.',
      image: '/assets/wizderm.webp',
      bgImage: '/assets/pexels-polina-kovaleva-6543617.jpg'
    },
    {
      id: 'neolayr',
      name: 'Neolayr Pro',
      tagline: 'Multi-Layer Protection',
      description: 'Advanced photostability and environmental shielding for compromised skin.',
      stats: [
        { value: 'SPF 50+', label: 'Broad Spectrum' },
        { value: 'PA++++', label: 'UVA Protection' },
        { value: '8h', label: 'Water Resistant' }
      ],
      testDetails: 'Tested under extreme UV index conditions, Neolayr Pro maintains 95% of its photoprotective capacity after 4 hours of exposure/water immersion. Non-irritating confirmed.',
      image: '/assets/neolayrprologo.webp',
      bgImage: '/assets/pexels-mandiri-abadi-396768996-14805033.jpg'
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll
      let slides = gsap.utils.toArray(".brand-slide");
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => "+=" + sliderRef.current.offsetWidth
        }
      });
      
      // Internal animations for each slide (Optional polish)
      slides.forEach((slide) => {
         gsap.from(slide.querySelectorAll('.animate-up'), {
             y: 50,
             opacity: 0,
             duration: 0.8,
             stagger: 0.1,
             scrollTrigger: {
                 trigger: slide,
                 containerAnimation: gsap.getById("horizontal-scroll"), // Check GSAP docs if this ID is needed for tracking, mostly 'xPercent' tween is main one.
                 start: "left center",
                 toggleActions: "play none none reverse"
             }
         })
      });

    }, componentRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} id="our-brands" className="relative overflow-hidden bg-black text-white">
      <div ref={sliderRef} className="flex w-[400%] h-screen">
        {brands.map((brand, i) => (
          <div key={brand.id} className="brand-slide w-screen h-screen flex-shrink-0 relative flex overflow-hidden border-r border-[#333]">
             
             {/* Background with parallax/overlay */}
             <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img src={brand.bgImage} alt="" className="w-full h-full object-cover grayscale opacity-40" />
             </div>

             {/* Content Grid */}
             <div className="container relative z-20 mx-auto px-6 grid grid-cols-1 md:grid-cols-12 h-full items-center gap-8">
                
                {/* Left: Brand Identity */}
                <div className="md:col-span-4 flex flex-col justify-center border-r border-white/10 h-full pr-8">
                    <div className="mb-8 inline-block w-max">
                        <img src={brand.image} alt={brand.name} className="h-12 md:h-20 w-auto object-contain" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif mb-4 animate-up">{brand.name}</h2>
                    <p className="text-xl text-accent font-sans uppercase tracking-widest mb-6 animate-up">{brand.tagline}</p>
                    <p className="text-white/70 text-lg leading-relaxed animate-up">{brand.description}</p>
                </div>

                {/* Center/Right: Clinical Data */}
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 pl-8">
                    
                    {/* Stats */}
                    <div className="flex flex-col justify-center gap-8">
                        {brand.stats.map((stat, idx) => (
                            <div key={idx} className="border-t border-white/20 pt-4 animate-up">
                                <span className="block text-5xl md:text-7xl font-bold font-sans mb-2">{stat.value}</span>
                                <span className="text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Scientific Context */}
                    <div className="flex flex-col justify-center bg-white/5 p-8 backdrop-blur-md border border-white/10 animate-up">
                        <h3 className="text-sm uppercase tracking-widest border-b border-white/20 pb-2 mb-4 text-accent">Clinical Validation</h3>
                        <p className="font-mono text-sm leading-relaxed text-white/80">
                            "{brand.testDetails}"
                        </p>
                        <div className="mt-8 flex gap-4">
                             <div className="h-1 w-full bg-white/10 overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-accent w-3/4"></div>
                             </div>
                        </div>
                        <span className="text-[10px] mt-2 text-right opacity-50 uppercase">Analysis Complete</span>
                    </div>

                </div>
             </div>

             {/* Slide Index Indicator */}
             <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-2 text-white/10 select-none">
                <span className="font-mono text-4xl">0{i + 1}</span>
             </div>
             
             {/* Interaction Button */}
             <div className="absolute bottom-10 left-10 z-30">
                <button 
                    onClick={() => window.location.href = '/brands'} 
                    className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 text-xs uppercase tracking-widest"
                >
                    Know More
                </button>
             </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandShowcase;
