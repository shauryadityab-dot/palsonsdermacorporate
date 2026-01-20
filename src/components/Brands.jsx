import React from 'react';

const Brands = () => {
    // Brand assets from public folder
    const brands = [
        { name: 'NMFE', src: '/assets/nmfe.webp' },
        { name: 'Qsera', src: '/assets/Qsera.webp' },
        { name: 'Wizderm', src: '/assets/wizderm.webp' },
        { name: 'Neolayr Pro', src: '/assets/neolayrprologo.webp' },
    ];

    // Create a set of brands that is long enough to cover most screens
    // 4 brands * 4 repeats = 16 items.
    const brandSet = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className="w-full py-16 bg-black border-y border-white/10 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
               <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-sans">Trusted by Industry Leaders</p>
            </div>
            
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for fading effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

                {/* Marquee Container - animate-marquee moves this entire flex container -50% */}
                <div className="animate-marquee hover:[animation-play-state:paused]">
                    {/* First Copy */}
                    <div className="flex items-center">
                        {brandSet.map((brand, index) => (
                            <div 
                                key={`set1-${index}`} 
                                className="flex items-center justify-center mx-12 md:mx-16 w-32 md:w-48 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            >
                                <img 
                                    src={brand.src} 
                                    alt={brand.name} 
                                    className="w-full h-auto object-contain max-h-12 md:max-h-16"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Second Copy (Identical) for seamless loop */}
                    <div className="flex items-center">
                        {brandSet.map((brand, index) => (
                            <div 
                                key={`set2-${index}`} 
                                className="flex items-center justify-center mx-12 md:mx-16 w-32 md:w-48 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            >
                                <img 
                                    src={brand.src} 
                                    alt={brand.name} 
                                    className="w-full h-auto object-contain max-h-12 md:max-h-16"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;
