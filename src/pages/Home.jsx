import React from 'react';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import About from '../components/About';
import BrandShowcase from '../components/BrandShowcase';
import StorytellingSection from '../components/StorytellingSection';
import Manufacturing from '../components/Manufacturing';
import StackedSection from '../components/StackedSection';
import ProductScroll from '../components/ProductScroll';
import NmfeScroll from '../components/NmfeScroll';
import HeroProductIntro from '../components/HeroProductIntro';

const Home = () => {
    return (
        <main className="bg-black">
            <Hero />
            <About />
            
            {/* StorytellingSection spins up its own complex pin timeline.
                Nesting pins causes GSAP miscalculations. We render it neutrally at zIndex 3. */}
            <div className="relative w-full z-[3]">
                <StorytellingSection />
            </div>
            
            <HeroProductIntro />
            <NmfeScroll />
            <BrandShowcase />
            <ProductScroll />
        </main>
    );
};

export default Home;
