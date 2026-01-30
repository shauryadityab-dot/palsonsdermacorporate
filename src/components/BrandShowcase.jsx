import React from 'react';

const BrandShowcase = () => {
  const brands = [
    {
      id: 'qsera',
      name: 'Qsera',
      tagline: 'Advanced Hair Vitality',
      description: 'Clinically proven hair care solutions.',
      details: [
        "Q-Sera is a specialized hair care line formulated to combat hair thinning and promote healthier growth. Unlike standard hair products, it focuses on the root of the problem—literally.",
        "The range features advanced serums and revitalizing shampoos enriched with peptides and plant-based bioactives. These ingredients work synergistically to nourish hair follicles, strengthen roots, and improve overall scalp health."
      ],
      image: '/assets/Qsera.webp', 
      bgImage: '/assets/pexels-chloe-amaya-1047565-4079215.jpg' 
    },
    {
      id: 'nmfe',
      name: 'NMFE',
      tagline: 'Deep Hydration & Barrier Support',
      description: 'Restoring the natural protective barrier.',
      details: [
        "NMFe is dedicated to deep hydration and barrier support. Designed for dry, sensitive, and compromised skin, this range goes beyond simple moisturizing to restore the skin's natural defenses.",
        "The formulations are enriched with soothing agents like Aloe Vera, Vitamin E, and Pentavitin, which help attract and retain moisture. From daily lotions to intensive creams, NMFe provides relief for flaky, rough, or irritated skin."
      ],
      image: '/assets/nmfe.webp',
      bgImage: '/assets/pexels-ron-lach-10222458.jpg'
    },
    {
      id: 'wizderm',
      name: 'Wizderm',
      tagline: 'Clinical Skin & Hair Services',
      description: 'Advanced dermatological clinic for skin and hair.',
      details: [
        "Wizderm is a premier clinical destination for advanced skin and hair care. It offers personalized consultations and scientifically proven treatments, moving beyond products to provide holistic dermatological solutions.",
        "From specialized acne management and anti-aging therapies to hair restoration, our expert dermatologists use state-of-the-art technology to deliver visible, long-lasting results tailored to your unique needs."
      ],
      image: '/assets/wizderm.webp',
      bgImage: '/assets/pexels-polina-kovaleva-6543617.jpg'
    },
    {
      id: 'neolayr',
      name: 'Neolayr Pro',
      tagline: 'Everyday Skincare Essentials',
      description: 'Science-backed daily care basics.',
      details: [
        "Neolayr Pro makes effective skincare accessible for everyday concerns. Whether tackling acne, dullness, or dehydration, this range delivers essential actives like Vitamin C, Salicylic Acid, and Niacinamide in balanced formulas.",
        "Designed for daily maintenance, Neolayr Pro offers a complete regimen—from deep-cleaning face washes to hydrating moisturizers and targeted serums. It is the practical choice for maintaining clear, healthy-looking skin day after day."
      ],
      image: '/assets/neolayrprologo.webp',
      bgImage: '/assets/pexels-mandiri-abadi-396768996-14805033.jpg'
    },
    {
      id: 'ridacne',
      name: 'Ridacne',
      tagline: 'Specialized Acne Care',
      description: 'Dermatologist-oriented acne solutions.',
      details: [
        "Ridacne is specifically engineered for oily and acne-prone skin. Its signature foaming face wash provides a deep cleanse that removes excess oil and bacteria without stripping the skin of its essential moisture.",
        "The formula acts as a mild exfoliant and sebum regulator, helping to unclog pores and control breakouts. Free from harsh beads, it offers a gentle yet effective way to manage acne and maintain a clear complexion."
      ],
      image: '/assets/ridacne.png',
      bgImage: '/assets/smiling-asian-lady-touching-her-clear-skin.jpg'
    },
    {
      id: 'sunmate',
      name: 'Sunmate',
      tagline: 'Expert Sun Protection',
      description: 'Broad-spectrum defense for all skin types.',
      details: [
        "Sunmate is the expert defense against solar damage. This specialized sunscreen line offers broad-spectrum protection against both UVA and UVB rays, preventing sunburn, tanning, and long-term photo-aging.",
        "Available in lightweight gel-cream formulations, Sunmate is designed for comfort. It offers a non-greasy, matte finish that is perfect for Indian weather conditions, ensuring your skin stays protected without feeling weighed down."
      ],
      image: '/assets/sunmate.png',
      bgImage: '/assets/young-beautiful-smiling-female-trendy-summer-white-dress-sexy-carefree-woman-posing-near-blue-wall-studio-positive-model-having-fun-cheerful-happy-isolated.jpg'
    }
  ];

  // Duplicate for marquee loop
  const brandSet = [...brands, ...brands];

  return (
    <div id="our-brands" className="relative overflow-hidden bg-black text-white">
      {/* Section Header */}
      <div className="absolute top-0 left-0 z-40 p-8 md:p-12 w-full pointer-events-none">
         <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/50"></span>
            <span className="text-sm md:text-base font-sans uppercase tracking-[0.4em] text-white/80">Our Brands</span>
         </div>
      </div>

      {/* Marquee Wrapper */}
      <div 
        className="flex animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: '60s' }} // Increased speed for better flow
      >
        {brandSet.map((brand, i) => (
          <div key={`${brand.id}-${i}`} className="w-[85vw] md:w-[60vw] h-screen flex-shrink-0 relative flex overflow-hidden border-r border-white/10">
             
             {/* Background with parallax/overlay */}
             <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img src={brand.bgImage} alt="" className="w-full h-full object-cover grayscale opacity-40" />
             </div>

             {/* Content Grid */}
             <div className="container relative z-20 mx-auto px-6 grid grid-cols-1 md:grid-cols-12 h-full items-center gap-8">
                
                {/* Left: Brand Identity */}
                <div className="md:col-span-6 flex flex-col justify-center h-full pr-0 md:pr-12">
                    <div className="mb-8 inline-block w-max">
                        <img src={brand.image} alt={brand.name} className="h-10 md:h-16 w-auto object-contain" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif mb-4">{brand.name}</h2>
                    <p className="text-sm md:text-base text-accent font-sans uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">{brand.tagline}</p>
                    <p className="text-white/60 text-lg font-light italic">{brand.description}</p>
                </div>

                {/* Right: Detailed Content */}
                <div className="md:col-span-6 flex flex-col justify-center pl-0 md:pl-12 border-l border-white/10 h-3/4">
                     <div className="space-y-6">
                        {brand.details.map((paragraph, idx) => (
                          <p key={idx} className="text-base md:text-lg leading-relaxed font-light text-white/80 font-serif">
                            {paragraph}
                          </p>
                        ))}
                     </div>
                </div>
             </div>

             {/* Slide Index Indicator (relative to original set) */}
             <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-2 text-white/10 select-none">
                <span className="font-mono text-4xl">0{(i % brands.length) + 1}</span>
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
