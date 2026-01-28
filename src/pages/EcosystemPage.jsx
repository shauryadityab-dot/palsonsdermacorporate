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
            title: "Wizderm Centre Of Dermatology",
            subtitle: "Education & Future",
            description: "Practicing dermatology with the best and preparing the next generation of specialists through rigorous training and hands-on mentorship.",
            contentBlocks: [
                {
                    title: "Academic Institution",
                    text: "The Wizderm Centre of Dermatology is more than a clinic; it is an academic institution. We are committed to nurturing the next generation of dermatologists through comprehensive training programs.",
                    image: "/assets/DSC_2180.webp"
                },
                {
                    title: "Mentorship & Training",
                    text: "Our residents learn from seasoned experts, gaining practical experience with the latest technologies and treatment modalities. We provide fellowships and hands-on mentorship.",
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
