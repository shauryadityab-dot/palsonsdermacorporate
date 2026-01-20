import React, { useEffect } from 'react';

const brandsData = [
    {
        id: 'qsera',
        name: 'Qsera',
        tagline: 'Science of Hair Vitality',
        desc: 'Advanced peptide therapy focusing on the anagen phase of hair growth. Qsera represents our commitment to solving complex trichological challenges.',
        accomplishments: [
            'Awarded "Best Hair Care Innovation 2024" by DermaSummit.',
            'Clinically proven to increase hair density by 85% in 12 weeks.',
            'Patented delivery system ensuring deep follicle penetration.',
            'Adopted by over 5000+ leading dermatologists.'
        ],
        image: '/assets/Qsera.webp'
    },
    {
        id: 'nmfe',
        name: 'NMFE',
        tagline: 'Lipid Barrier Restoration',
        desc: 'A complete range of moisturizing solutions mimicking the skin\'s natural lipid barrier for optimal hydration and protection.',
        accomplishments: [
            'Gold Standard in adjuvant therapy for Atopic Dermatitis.',
            'Unique "Hydration Lock" technology provides 24-hour moisture rentention.',
            'Non-comedogenic certification from Global Skin Health Institute.',
            'Trusted choice for sensitive skin maintenance.'
        ],
        image: '/assets/nmfe.webp'
    },
    {
        id: 'wizderm',
        name: 'Wizderm',
        tagline: 'Professional Skin Correction',
        desc: 'Targeted treatments for hyperpigmentation and skin tone unevenness using safe, potent active ingredients.',
        accomplishments: [
            'Demonstrated 60% reduction in melanin synthesis in vitro.',
            'Fast-acting formula shows results in as little as 4 weeks.',
            'Preferred pre/post-procedure care for laser treatments.',
            'Hypoallergenic tested on diverse skin types.'
        ],
        image: '/assets/wizderm.webp'
    },
    {
        id: 'neolayr',
        name: 'Neolayr Pro',
        tagline: 'Advanced Photoprotection',
        desc: 'Next-generation sun protection formulations offering broad-spectrum defense against UVA, UVB, and environmental pollutants.',
        accomplishments: [
            'SPF 50+ PA++++ rating confirmed by In-Vivo testing.',
            'Water-resistant formulation ideal for active lifestyles.',
            'Enriched with antioxidants to neutralize free radical damage.',
            'Matte finish suitable for all-day wear.'
        ],
        image: '/assets/neolayrprologo.webp'
    }
];

const BrandsPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black text-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <header className="mb-24 text-center">
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 animate-pulse-slow">Our Portfolio</h1>
                    <p className="max-w-2xl mx-auto text-white/60 font-mono text-sm uppercase tracking-widest">
                        Pioneering solutions across dermatological spectrums.
                    </p>
                </header>

                <div className="space-y-32">
                    {brandsData.map((brand, index) => (
                        <div key={brand.id} id={brand.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                            
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-accent/10 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                                <div className="relative bg-[#111] border border-white/10 p-12 aspect-square flex items-center justify-center overflow-hidden">
                                     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
                                     <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
                                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></div>
                                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>
                                    
                                    <img src={brand.image} alt={brand.name} className="w-2/3 h-auto object-contain transition-opacity" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-serif mb-2">{brand.name}</h2>
                                <p className="text-accent text-sm uppercase tracking-widest mb-8 font-mono">{brand.tagline}</p>
                                
                                <p className="text-lg text-white/80 leading-relaxed mb-12 border-l border-white/20 pl-6">
                                    {brand.desc}
                                </p>

                                <div className="bg-white/5 p-8 backdrop-blur-sm border border-white/10">
                                    <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Key Accomplishments</h3>
                                    <ul className="space-y-4">
                                        {brand.accomplishments.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-sm text-white/70">
                                                <span className="text-accent">0{i + 1}</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandsPage;
