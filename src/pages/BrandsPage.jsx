import React, { useEffect } from 'react';

const brandsData = [
    {
        id: 'qsera',
        name: 'Qsera',
        tagline: 'Advanced Hair Vitality',
        desc: 'Clinically proven hair care solutions. Q-Sera is a specialized hair care line formulated to combat hair thinning and promote healthier growth. Unlike standard hair products, it focuses on the root of the problem—literally. The range features advanced serums and revitalizing shampoos enriched with peptides and plant-based bioactives.',
        accomplishments: [
            'Reduces Hair Fall',
            'Strengthens Roots',
            'Promotes Growth',
            'Enriched with Peptides'
        ],
        image: '/assets/Qsera.webp'
    },
    {
        id: 'nmfe',
        name: 'NMFE',
        tagline: 'Deep Hydration & Barrier Support',
        desc: 'Restoring the natural protective barrier. NMFe is dedicated to deep hydration and barrier support. Designed for dry, sensitive, and compromised skin, this range goes beyond simple moisturizing to restore the skin\'s natural defenses. The formulations are enriched with soothing agents like Aloe Vera, Vitamin E, and Pentavitin.',
        accomplishments: [
            'Restores Skin Barrier',
            'Deep Hydration',
            'Soothing Formula',
            'Enriched with Aloe Vera & Vitamin E'
        ],
        image: '/assets/nmfe.webp'
    },
    {
        id: 'wizderm',
        name: 'Wizderm',
        tagline: 'Clinical Skin & Hair Services',
        desc: 'Advanced dermatological clinic for skin and hair. Wizderm is a premier clinical destination for advanced skin and hair care. It offers personalized consultations and scientifically proven treatments, moving beyond products to provide holistic dermatological solutions.',
        accomplishments: [
            'Personalized Consultations',
            'Advanced Treatments',
            'Acne Management',
            'Anti-Aging Therapies'
        ],
        image: '/assets/wizderm.webp'
    },
    {
        id: 'neolayr',
        name: 'Neolayr Pro',
        tagline: 'Everyday Skincare Essentials',
        desc: 'Science-backed daily care basics. Neolayr Pro makes effective skincare accessible for everyday concerns. Whether tackling acne, dullness, or dehydration, this range delivers essential actives like Vitamin C, Salicylic Acid, and Niacinamide in balanced formulas.',
        accomplishments: [
            'Acne Control & Brightening',
            'Deep Hydration',
            'Daily Skin Defense',
            'Essential Actives'
        ],
        image: '/assets/neolayrprologo.webp'
    },
    {
        id: 'ridacne',
        name: 'Ridacne',
        tagline: 'Specialized Acne Care',
        desc: 'Dermatologist-oriented acne solutions. Ridacne is specifically engineered for oily and acne-prone skin. Its signature foaming face wash provides a deep cleanse that removes excess oil and bacteria without stripping the skin of its essential moisture.',
        accomplishments: [
            'Beads-free Gentle Foam',
            'Controls Excess Oil',
            'Mild Exfoliating Action',
            'Regulates Sebum'
        ],
        image: '/assets/ridacne.png'
    },
    {
        id: 'sunmate',
        name: 'Sunmate',
        tagline: 'Expert Sun Protection',
        desc: 'Broad-spectrum defense for all skin types. Sunmate is the expert defense against solar damage. This specialized sunscreen line offers broad-spectrum protection against both UVA and UVB rays, preventing sunburn, tanning, and long-term photo-aging.',
        accomplishments: [
            'SPF 30+ to SPF 100+',
            'Non-greasy Matte Finish',
            'Sweat & Water Resistant',
            'Broad-Spectrum Protection'
        ],
        image: '/assets/sunmate.png'
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
