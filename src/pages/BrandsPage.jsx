import React, { useEffect } from 'react';
import BrandShowcaseSection from '../components/BrandShowcaseSection';

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
        images: ['/assets/q-sera1.jpg', '/assets/q-sera2.jpg', '/assets/q-sera3.jpg', '/assets/qsera-4.jpg']
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
        images: ['/assets/nmfe1.jpg', '/assets/nmfe2.jpg', '/assets/nmfe3.jpg', '/assets/nmfe4.jpg', '/assets/nmfe5.jpg']
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
        images: []
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
        images: ['/assets/ridacne1.jpg']
    },
    {
        id: 'renewderm',
        name: 'Renewderm',
        tagline: 'Intensive Skin Renewal',
        desc: 'Advanced anti-aging and skin regeneration formulas. Renewderm offers high-performance serums and creams with clinically proven actives like Hyaluronic Acid to restore youthful elasticity and deeply hydrate parched skin.',
        accomplishments: [
            'Deep Cellular Hydration',
            'Restores Skin Elasticity',
            'Clinically Proven Anti-Aging',
            'Dermatologist Tested'
        ],
        images: ['/assets/renewderm1.jpg', '/assets/renewdermHA.jpg']
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
        images: ['/assets/sunmate1.jpg']
    }
];

const BrandsPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fdfdfd] min-h-screen">
            <header className="pt-32 pb-24 text-center border-b border-black/10 bg-white relative z-50 shadow-sm">
                <h1 className="text-5xl md:text-8xl font-serif mb-6 text-black tracking-tight drop-shadow-sm">Our Portfolio</h1>
                <p className="max-w-2xl mx-auto text-black/60 font-mono text-sm uppercase tracking-widest">
                    Pioneering solutions across dermatological spectrums.
                </p>
            </header>

            <div className="w-full flex flex-col">
                {brandsData.map((brand, index) => (
                    <BrandShowcaseSection 
                      key={brand.id} 
                      brand={brand} 
                      isEven={index % 2 !== 0} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BrandsPage;
