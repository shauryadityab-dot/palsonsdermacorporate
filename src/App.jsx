import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BrandsPage from './pages/BrandsPage';
import InnovationPage from './pages/InnovationPage';
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
  return (
    <Router>
        <ScrollToTop />
        <div className="antialiased bg-black min-h-screen selection:bg-white selection:text-black">
            {/* Navigation / Header - Minimal */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none">
                <a href="/" className="text-xl font-bold tracking-tighter uppercase pointer-events-auto cursor-pointer font-sans no-underline text-white">PALSONS DERMA</a>
                
                <div className="hidden md:flex gap-8 pointer-events-auto">
                    {['Our Brands', 'Our People'].map((item) => (
                        <a key={item} href={`/#${item.toLowerCase().replace(' ', '-')}`} className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">
                            {item}
                        </a>
                    ))}
                    <a href="/innovation" className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">Innovation</a>
                    {/* Explicit link to Portfolio for easy access */}
                    <a href="/brands" className="uppercase text-xs tracking-widest hover:text-white/70 transition-colors">Portfolio</a>
                </div>

                <button className="md:hidden pointer-events-auto uppercase text-xs tracking-widest">MENU</button>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/innovation" element={<InnovationPage />} />
            </Routes>
            
            <footer className="py-20 border-t border-white/10 bg-black text-center relative z-10">
                <p className="text-xs text-slate-500 uppercase tracking-widest">© 2026 Palsons Derma. All Rights Reserved.</p>
            </footer>
        </div>
    </Router>
  );
}

export default App;
