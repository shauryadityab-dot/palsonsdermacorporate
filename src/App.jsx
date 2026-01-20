import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Brands from './components/Brands';
import About from './components/About';
import BrandShowcase from './components/BrandShowcase';
import LegacyTimeline from './components/LegacyTimeline';
import Manufacturing from './components/Manufacturing';
// Lenis for smooth scrolling is often a good pair with GSAP, but we'll stick to native + GSAP scrub for now as requested "performance optimized". 
// Actually, let's just make sure the scroll is smooth.

function App() {
  return (
    <div className="antialiased bg-black min-h-screen selection:bg-white selection:text-black">
        {/* Navigation / Header - Minimal */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none">
            <div className="text-xl font-bold tracking-tighter uppercase pointer-events-auto cursor-pointer font-sans">PALSONS DERMA</div>
            
            <div className="hidden md:flex gap-8 pointer-events-auto">
                {['Our Brands', 'Innovation', 'Our People'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">
                        {item}
                    </a>
                ))}
            </div>

            <button className="md:hidden pointer-events-auto uppercase text-xs tracking-widest">MENU</button>
        </nav>

        <main>
            <Hero />
            <Brands />
            <About />
            <BrandShowcase />
            <LegacyTimeline />
            <Manufacturing />
            
            <footer className="py-20 border-t border-[#333] bg-black text-center">
                <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026 Palsons Derma. All Rights Reserved.</p>
            </footer>
        </main>
    </div>
  );
}

export default App;
