import React from 'react';

const HeroProductIntro = () => {
    return (
        <section className="w-full bg-white py-32 md:py-48 px-4 flex flex-col items-center justify-center text-center">
            
            {/* Small Top Label */}
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#1a3b2b]/60 mb-6 font-sans font-medium">
                Pioneering Formulation
            </span>
            
            {/* Main Headline */}
            <h2 className="text-5xl md:text-8xl font-serif text-[#1a3b2b] tracking-tight mb-8 drop-shadow-sm">
                Our Hero Product
            </h2>
            
            {/* Subtext */}
            <p className="max-w-xl mx-auto text-lg md:text-xl font-light text-[#1a3b2b]/80 font-sans leading-relaxed">
                Experience the culmination of our research and legacy—a dermatological breakthrough designed to restore and maintain your skin's natural balance.
            </p>
            
            {/* Decorative Vertical Line connecting to the scroll section below */}
            <div className="mt-16 w-px h-24 bg-[#1a3b2b]/20 mx-auto"></div>
            
        </section>
    );
};

export default HeroProductIntro;
