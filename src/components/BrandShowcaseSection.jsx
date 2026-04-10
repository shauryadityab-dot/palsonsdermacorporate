import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandShowcaseSection = ({ brand, isEven }) => {
  const imagesRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Subtle fade-up animation for each image as it scrolls into view on the right
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%", // Trigger when image top hits 85% of viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [brand]);

  const bgColors = isEven ? "bg-[#ffffff]" : "bg-[#f5f5f7]";

  return (
    <section className={`relative w-full ${bgColors} text-[#111] border-b border-black/10 flex flex-col md:flex-row relative clip-path-none`}>
      
      {/* Sticky Left Sidebar (Brand Info) */}
      <div className="w-full md:w-5/12 lg:w-1/3 relative z-20 border-b md:border-b-0 md:border-r border-black/10">
        <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-serif mb-4 tracking-tight text-black">{brand.name}</h2>
          <p className="text-lg lg:text-xl font-mono uppercase tracking-[0.1em] lg:tracking-[0.2em] mb-8 text-black/50">{brand.tagline}</p>
          
          <p className="text-base lg:text-lg font-sans leading-relaxed text-black/80 mb-10 border-l-4 border-black/20 pl-5">
            {brand.desc}
          </p>

          <div className="bg-white p-6 shadow-sm border border-black/5">
            <h3 className="text-[10px] lg:text-xs uppercase font-bold tracking-widest mb-4 border-b border-black/10 pb-2">Key Accomplishments</h3>
            <ul className="space-y-3 text-left">
              {brand.accomplishments.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-black/80 font-medium">
                  <span className="text-black/40 font-mono">0{i + 1}</span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scrolling Right Column (Product Images) */}
      <div className={`w-full md:w-7/12 lg:w-2/3 relative z-10 flex flex-col items-center justify-center p-16 md:p-32 space-y-24 md:space-y-40 bg-black/5 ${brand.images.length === 0 ? 'min-h-[50vh]' : ''}`}>
        
        {brand.images.length === 0 ? (
          <div className="text-center opacity-40 py-20 border-2 border-dashed border-black/20 w-11/12 max-w-xl rounded-xl">
            <span className="block text-2xl font-serif mb-2">Portfolio Updating</span>
            <span className="text-sm font-mono uppercase tracking-[0.2em]">Digital Catalog Coming Soon</span>
          </div>
        ) : (
          brand.images.map((src, i) => (
            <div 
              key={i} 
              ref={el => imagesRef.current[i] = el}
              className="w-11/12 max-w-4xl px-4 md:px-0 flex justify-center"
            >
              <img 
                src={src} 
                alt={`${brand.name} catalog page ${i+1}`} 
                className="w-full h-auto object-contain shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-black/5 bg-white"
              />
            </div>
          ))
        )}
      </div>

    </section>
  );
};

export default BrandShowcaseSection;
