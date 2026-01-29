import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EcosystemPage = () => {
    const heroRef = useRef(null);
    const sectionsRef = useRef([]);
    const overlayRef = useRef(null);
    const [activeDivision, setActiveDivision] = useState(null);

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();
        tl.fromTo('.hero-text', 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
        );

        // Sections Animation
        sectionsRef.current.forEach((section, index) => {
            if (!section) return; // Guard against null refs
            
            gsap.fromTo(section.querySelector('.section-content'),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: "top 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            
            // Image Parallax
            const sectionImage = section.querySelector('.section-image');
            if (sectionImage) {
                gsap.fromTo(sectionImage,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }
        });
        
        window.scrollTo(0, 0);

    }, []);

    // Handle Overlay Animation
    useEffect(() => {
        if (activeDivision && overlayRef.current) {
            document.body.style.overflow = 'hidden'; // Lock scroll
            gsap.fromTo(overlayRef.current,
                { y: '100%' },
                { y: '0%', duration: 0.8, ease: 'power4.out' }
            );
        } else {
            document.body.style.overflow = 'auto'; // Unlock scroll
        }
    }, [activeDivision]);

    const handleClose = () => {
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                y: '100%',
                duration: 0.5,
                ease: 'power4.in',
                onComplete: () => setActiveDivision(null)
            });
        }
    };

    const sections = [
        {
            title: "Wizderm",
            subtitle: "Clinical Excellence",
            description: "A premier clinic dedicated to advanced dermatological treatments, combining state-of-the-art technology with medical expertise to deliver exceptional skin care results.",
            contentBlocks: [
                {
                    title: "Pinnacle of Care",
                    text: "Established in 2011, Wizderm Speciality Skin & Hair Clinic has grown into a trusted leader in advanced dermatological care. Founded in Kolkata, we now operate 8 clinics across India — four in Kolkata (Jodhpur Park, Shakespeare Sarani, City Centre 1 and Wizderm Hair Sciences) along with centres in Siliguri, Ahmedabad, Guwahati and Hyderabad (which opened in 2025). Wizderm combines expert medical practices with world-class technology to address a wide range of skin and hair concerns. With a team of over 115 experienced dermatologists, state-of-the-art infrastructure and proven treatment protocols, we are committed to delivering ethical, safe and effective care. Today, more than 9.6 lakh patients have trusted Wizderm for their skin and hair needs, reinforcing our mission to offer reliable dermatology rooted in excellence and patient satisfaction",
                    image: "/assets/Consultation Room.jpg"
                },
                {
                    title: "How We Work",
                    text: "At Wizderm Skin & Clinic, our dermatologists are true Partners in Practice, which means they work collaboratively with our team and patients to provide the highest quality care. With the freedom to focus entirely on their professional expertise, they are dedicated to delivering exceptional treatment and care, ensuring that your well-being is always their top priority.",
                    image: "/assets/Procedure Room3.webp"
                },
                {
                    title: "Our Vision",
                    text: "We see a world where skincare is coupled with expertise and utmost care and is accessible and affordable for everyone. Whether it’s cosmetic or clinical, people should visit us to get their solutions efficiently. We also envision a world where people can appreciate their natural beauty and be confident in the skin they are in.",
                    image: "/assets/How-we-work.png"
                }
            ],
            image: "/assets/Exteriors.jpg",
            video: "1E_rhg_jtmY",
            color: "text-white",
            gallery: [
                "/assets/Procedure Room.webp",
                "/assets/The Team.jpg",
                "/assets/Consultation Room.jpg",
                "/assets/Pharmacy.jpg"
            ]
        },
        {
            title: "Wizderm Hair Sciences",
            subtitle: "Restoration & Technology",
            description: "Specialized in hair restorative treatments and transplants, utilizing cutting-edge follicular advancement techniques for natural, lasting results.",
            contentBlocks: [
                {
                    title: "Art & Science of Restoration",
                    text: "Wizderm Hair Sciences is dedicated to the art and science of hair restoration. We understand the psychological impact of hair loss and provide comprehensive solutions ranging from medical management to advanced transplants.",
                    image: "/assets/whs-consultation.jpeg"
                },
                {
                    title: "Advanced FUE Techniques",
                    text: "Our trichologists utilize the latest diagnostic tools to create personalized treatment plans that stimulate growth and restore density. We employ advanced FUE techniques for natural-looking, permanent results.",
                    image: "/assets/whs_procedureroom.jpeg"
                }
            ],
            image: "/assets/whs_reception.webp",
            color: "text-blue-100",
            gallery: [
                "/assets/whs_waitingroom1.webp",
                "/assets/Fotona Machine.jpeg",
                "/assets/whs-consultation.jpeg"
            ]
        },
        {
            title: "Our Expert Summits",
            subtitle: "Global Collaboration",
            description: "Where renowned doctors and dermatologists converge. A hub for sharing breakthrough research, clinical case studies, and shaping the future of dermatology.",
            contentBlocks: [
                {
                    title: "Knowledge Exchange",
                    text: "Knowledge grows when shared. Our Expert Summits are exclusive gatherings that bring together the brightest minds in dermatology from around the globe to discuss the future of skin health.",
                    image: "/assets/SBP_4853.webp"
                },
                {
                    title: "Groundbreaking Research",
                    text: "These events facilitate the exchange of groundbreaking research, discussion of complex clinical cases, and the dissemination of new treatment protocols. It is our commitment to advancing the field through collaboration.",
                    image: "/assets/SBP_4064.webp"
                }
            ],
            image: "/assets/pxs.webp",
            color: "text-accent",
            gallery: [
                "/assets/SBP_4853.webp",
                "/assets/SBP_4064.webp",
                "/assets/DSC_9818.webp",
                "/assets/DSC_4611.webp",
                "/assets/DSC_2180.webp"
            ]
        },
        {
            title: "Wizderm Pathlab",
            subtitle: "Diagnostic Precision",
            description: "A state-of-the-art pathology center committed to deliverying accurate, timely, and reliable diagnostic services.",
            contentBlocks: [
                {
                    title: "Advanced Diagnostics",
                    text: "Wizderm Pathlab is equipped with cutting-edge technology to ensure the highest standards of diagnostic accuracy. We understand that precise diagnosis is the foundation of effective treatment.",
                    image: "/assets/DSC_2180.webp"
                },
                {
                    title: "Expert Pathologists",
                    text: "Our team of experienced pathologists and technicians work tirelessly to maintain rigorous quality control, ensuring that every report you receive is trustworthy and precise.",
                    image: "/assets/DSC_4611.webp"
                }
            ],
            image: "/assets/DSC_2180.webp",
            color: "text-teal-100",
            gallery: [
                "/assets/DSC_2209.JPG",
                "/assets/DSC_2192.JPG"
            ]
        }
    ];

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className="h-[70vh] flex items-center justify-center relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-[url('/assets/pexels-chloe-amaya-1047565-4079215.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="container relative z-10 text-center px-4">
                    <h1 className="hero-text text-6xl md:text-9xl font-serif text-white mb-4 tracking-tighter">
                        OUR <span className="text-stroke">ECOSYSTEM</span>
                    </h1>
                    <p className="hero-text text-accent uppercase tracking-[0.3em] font-mono text-sm md:text-base max-w-2xl mx-auto">
                        An integrated network of clinical care, research, and education
                    </p>
                </div>
            </section>

            {/* Our Core Values */}
            <section className="py-24 bg-[#0B1121] border-b border-white/10 relative overflow-hidden">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-16">
                         <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Our Core Values</h2>
                         <div className="w-24 h-1 bg-white/20 mx-auto"></div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                         {/* Integrity - Orange */}
                         <div className="group p-6 border border-white/5 hover:bg-white/5 transition-colors text-center">
                             <div className="w-16 h-16 mx-auto mb-6 text-orange-400 group-hover:scale-110 transition-transform duration-500">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                     <path d="M12 3v18M3 12h18M5 9l-3 3 3 3M19 9l3 3-3 3" opacity="0"/>
                                     <path d="M16 3h5v5M8 3H3v5"/><path d="M12 22v-8"/><path d="M8 10h8"/><path d="M4 14h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/><path d="M20 14h-2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2"/>
                                     <path d="M12 3l-4 4h8l-4-4z"/>
                                 </svg>
                             </div>
                             <h3 className="text-2xl font-serif text-orange-400 mb-2">Integrity</h3>
                             <p className="text-white/60 text-sm leading-relaxed">
                                 Always do what's right. Even when no one is watching.
                             </p>
                         </div>

                         {/* Retention - Purple */}
                         <div className="group p-6 border border-white/5 hover:bg-white/5 transition-colors text-center">
                             <div className="w-16 h-16 mx-auto mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-500">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                 </svg>
                             </div>
                             <h3 className="text-2xl font-serif text-purple-400 mb-2">Retention</h3>
                             <p className="text-white/60 text-sm leading-relaxed">
                                 Acquire with the intention to retain and retain with the intention to grow.
                             </p>
                         </div>

                         {/* L&D - Pink */}
                         <div className="group p-6 border border-white/5 hover:bg-white/5 transition-colors text-center">
                             <div className="w-16 h-16 mx-auto mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-500">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                 </svg>
                             </div>
                             <h3 className="text-2xl font-serif text-pink-400 mb-2">L&D</h3>
                             <p className="text-white/60 text-sm leading-relaxed">
                                 Never stop learning because life never stops teaching.
                             </p>
                         </div>

                         {/* Innovation - Blue */}
                         <div className="group p-6 border border-white/5 hover:bg-white/5 transition-colors text-center">
                             <div className="w-16 h-16 mx-auto mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-500">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                     <path d="M12 2a9 9 0 0 1 9 9c0 1.6-.7 3.1-2 4.2v3.8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3.8A8.99 8.99 0 0 1 3 11a9 9 0 0 1 9-9z"/>
                                     <path d="M9 22h6"/>
                                     <path d="M12 14v4"/>
                                 </svg>
                             </div>
                             <h3 className="text-2xl font-serif text-blue-400 mb-2">Innovation</h3>
                             <p className="text-white/60 text-sm leading-relaxed">
                                 Find a way to do it better.
                             </p>
                         </div>

                         {/* Focus - Green */}
                         <div className="group p-6 border border-white/5 hover:bg-white/5 transition-colors text-center">
                             <div className="w-16 h-16 mx-auto mb-6 text-green-400 group-hover:scale-110 transition-transform duration-500">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                     <circle cx="12" cy="12" r="10"/>
                                     <circle cx="12" cy="12" r="6"/>
                                     <circle cx="12" cy="12" r="2"/>
                                 </svg>
                             </div>
                             <h3 className="text-2xl font-serif text-green-400 mb-2">Focus</h3>
                             <p className="text-white/60 text-sm leading-relaxed">
                                 Focus on what matters. Eliminate the rest.
                             </p>
                         </div>
                     </div>
                 </div>
            </section>

            {/* Content Sections */}
            <div className="flex flex-col">
                {sections.map((item, index) => (
                    <section 
                        key={index} 
                        ref={el => sectionsRef.current[index] = el}
                        className={`min-h-[80vh] flex flex-col md:flex-row items-stretch relative overflow-hidden border-b border-white/10 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image/Video Side */}
                        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
                                   <div className="section-image absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                        style={{ 
                                            backgroundImage: `url(${item.image})`,
                                            // filter: 'grayscale(100%) brightness(0.7)' 
                                        }}
                                   ></div>
                                   <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-black section-content z-10 transition-colors duration-500 hover:bg-[#0B1121]">
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">0{index + 1} / {item.subtitle}</span>
                            <h2 className={`text-5xl md:text-7xl font-serif mb-8 tracking-tight ${item.color}`}>
                                {item.title}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light border-l border-white/20 pl-6">
                                {item.description}
                            </p>
                            
                            <button 
                                onClick={() => setActiveDivision(item)}
                                className="mt-12 self-start flex items-center gap-4 text-xs uppercase tracking-widest text-white hover:text-accent transition-colors group cursor-pointer"
                            >
                                Explore Division
                                <div className="w-12 h-[1px] bg-white/50 group-hover:bg-accent transition-colors"></div>
                            </button>
                        </div>
                    </section>
                ))}
            </div>

            {/* Detail Overlay */}
            {activeDivision && (
                <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-50 flex justify-between items-center p-8 bg-black/80 backdrop-blur-md border-b border-white/10">
                        <div className="flex flex-col">
                            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-2">{activeDivision.subtitle}</span>
                            <h2 className="text-2xl md:text-4xl font-serif text-white">{activeDivision.title}</h2>
                        </div>
                        <button onClick={handleClose} className="text-white hover:text-accent uppercase text-xs tracking-widest transition-colors flex items-center gap-2 group">
                            Close
                            <div className="w-6 h-6 border rounded-full flex items-center justify-center group-hover:border-accent group-hover:rotate-90 transition-all duration-300">
                                ✕
                            </div>
                        </button>
                    </div>

                    {/* Content */}
                    {/* Content */}
                    <div className="container mx-auto px-4 py-16 space-y-32">
                        {activeDivision.contentBlocks.map((block, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                {/* Text Side */}
                                <div className="w-full md:w-1/2">
                                     <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">{block.title}</h3>
                                     <div className="w-20 h-1 bg-accent mb-8"></div>
                                     <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                                        {block.text}
                                     </p>
                                </div>
                                {/* Image Side */}
                                <div className="w-full md:w-1/2">
                                    <div className="aspect-[4/3] bg-white/5 overflow-hidden border border-white/10 relative group">
                                         <img 
                                            src={block.image} 
                                            alt={block.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                         />
                                         <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Video in Detail View */}
                        {activeDivision.video && (
                            <div className="max-w-4xl mx-auto mb-20 aspect-video bg-black border border-white/10">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`https://www.youtube.com/embed/${activeDivision.video}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`} 
                                    title={activeDivision.title}
                                    className="w-full h-full object-cover"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {/* Image Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
                            {activeDivision.gallery.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`relative overflow-hidden group ${idx % 3 === 0 ? 'md:col-span-2' : ''} ${idx % 4 === 0 ? 'row-span-2' : ''}`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`${activeDivision.title} gallery ${idx + 1}`} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Call to Action */}
             <section className="py-32 text-center bg-[#0B1121]">
                 <h2 className="text-4xl font-serif text-white mb-8">Join Our Network</h2>
                 <button className="px-10 py-4 border border-white/30 text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                     Contact Us
                 </button>
             </section>

        </div>
    );
};

export default EcosystemPage;
