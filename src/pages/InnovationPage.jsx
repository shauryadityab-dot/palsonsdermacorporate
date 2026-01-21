import React, { useEffect } from 'react';

import GlobalSourcing from '../components/GlobalSourcing';
import Manufacturing from '../components/Manufacturing';
import ResearchLabs from '../components/ResearchLabs';

const InnovationPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#0B1121] min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-[url('/assets/pexels-chloe-amaya-1047565-4079215.jpg')] bg-cover bg-center opacity-30 grayscale"></div>
                <div className="absolute inset-0 bg-[#0B1121]/50 backdrop-blur-sm"></div>
                
                <div className="container relative z-10 text-center px-4">
                     <h1 className="text-6xl md:text-9xl font-serif text-white mb-6 tracking-tighter">
                         FUTURE <span className="text-stroke">READY</span>
                     </h1>
                     <p className="text-accent uppercase tracking-[0.3em] text-sm md:text-base font-mono">
                         Pioneering Dermatology Since 1986
                     </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <span className="text-[10px] uppercase tracking-widest text-white">Explore</span>
                    <div className="w-[1px] h-12 bg-white"></div>
                </div>
            </section>

            {/* Components Assembly */}
            <ResearchLabs />
            <GlobalSourcing />
            <Manufacturing />
            
        </div>
    );
};

export default InnovationPage;
