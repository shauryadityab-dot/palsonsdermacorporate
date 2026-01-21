import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BrandsPage from './pages/BrandsPage';
import InnovationPage from './pages/InnovationPage';
import EcosystemPage from './pages/EcosystemPage';
// Lenis for smooth scrolling is often a good pair with GSAP, but we'll stick to native + GSAP scrub for now as requested "performance optimized". 
// Actually, let's just make sure the scroll is smooth.

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
        <ScrollToTop />
        <div className="antialiased bg-black min-h-screen selection:bg-white selection:text-black">
            {/* Navigation / Header - Minimal */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none">
                <a href="/" className="pointer-events-auto cursor-pointer">
                    <img src="/assets/logo.webp" alt="Palsons Derma" className="h-10 w-auto object-contain" />
                </a>
                
                <div className="hidden md:flex gap-8 pointer-events-auto">
                    {['Our Brands', 'Our People'].map((item) => (
                        <a key={item} href={`/#${item.toLowerCase().replace(' ', '-')}`} className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">
                            {item}
                        </a>
                    ))}
                    <a href="/innovation" className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">Innovation</a>
                    {/* Explicit link to Portfolio for easy access */}
                    <a href="/ecosystem" className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">Our Ecosystem</a>
                </div>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden pointer-events-auto uppercase text-xs tracking-widest relative z-50">{isMenuOpen ? 'CLOSE' : 'MENU'}</button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-[#0B1121] flex flex-col items-center justify-center gap-10 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                 {['Our Brands', 'Our People'].map((item) => (
                    <a key={item} href={`/#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-white tracking-wide hover:text-accent transition-colors">
                        {item}
                    </a>
                ))}
                <a href="/innovation" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-white tracking-wide hover:text-accent transition-colors">Innovation</a>
                <a href="/ecosystem" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-white tracking-wide hover:text-accent transition-colors">Our Ecosystem</a>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/innovation" element={<InnovationPage />} />
                <Route path="/ecosystem" element={<EcosystemPage />} />
            </Routes>
            
            <footer className="py-20 border-t border-white/10 bg-black text-center relative z-10">
                <p className="text-xs text-slate-500 uppercase tracking-widest">© 2026 Palsons Derma. All Rights Reserved.</p>
            </footer>
        </div>
    </Router>
  );
}

export default App;
