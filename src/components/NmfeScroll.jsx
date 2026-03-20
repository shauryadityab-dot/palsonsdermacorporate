import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 178;

// Helper to pad the frame index (e.g. 1 -> "001")
const currentFrame = (index) => 
  `/assets/sequence-nmfe/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const NmfeScroll = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef0 = useRef(null);
  const textRef30 = useRef(null);
  const textRef60 = useRef(null);
  const textRef90 = useRef(null);
  
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Preload Images Array
  useEffect(() => {
    const loadedImages = [];
    let loadCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadCount++;
            if (loadCount === frameCount) {
                setLoaded(true);
            }
        };
        // Even if some fail, we don't want a permanent hang, but for perfect scrub we wait
        img.onerror = () => {
            loadCount++;
            if (loadCount === frameCount) {
                setLoaded(true);
            }
        };
        loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  // Main GSAP ScrollTrigger Logic
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    let ctx = gsap.context(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Initial setup for canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const renderFrame = (index) => {
            if (!images[index]) return;
            const img = images[index];
            
            // Using ultra-crisp "object-cover" scaled to fill full screen
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            let ratio = Math.max(hRatio, vRatio); // Object-cover behavior
            
            // Force high-quality interpolation
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;  

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img, 
                0, 
                0, 
                img.width, 
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio, 
                img.height * ratio
            );
        };

        // Render first frame immediately
        renderFrame(0);

        // Object to hold our playhead property
        const frameSequence = { frame: 0 };

        // The Master Canvas Scrub Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Much smoother, heavier cinematic scrub
            }
        });

        tl.to(frameSequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: () => renderFrame(frameSequence.frame)
        });

        // ------------------ TEXT OVERLAYS ------------------
        
        // Setup initial text states
        gsap.set([textRef30.current, textRef60.current, textRef90.current], { opacity: 0, y: 50 });
        
        // 0% - Out by 20%
        gsap.to(textRef0.current, {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "20% top",
                scrub: true,
            }
        });

        // 30% - In by 25%, Out by 45%
        gsap.to(textRef30.current, {
            opacity: 1, 
            y: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "20% top",
                end: "30% top",
                scrub: true,
            }
        });
        gsap.to(textRef30.current, {
            opacity: 0, 
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "45% top",
                end: "55% top",
                scrub: true,
            }
        });

        // 60% - In by 55%, Out by 75%
        gsap.to(textRef60.current, {
            opacity: 1, 
            y: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "55% top",
                end: "65% top",
                scrub: true,
            }
        });
        gsap.to(textRef60.current, {
            opacity: 0, 
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "75% top",
                end: "85% top",
                scrub: true,
            }
        });

        // 90% - In by 85%
        gsap.to(textRef90.current, {
            opacity: 1, 
            y: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "85% top",
                end: "95% top",
                scrub: true,
            }
        });

        // Resize handler
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(frameSequence.frame);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, containerRef);

    return () => ctx.revert();
  }, [loaded, images]);

  return (
    <section ref={containerRef} className="relative w-full h-[600vh]" style={{ backgroundColor: "#ffffff" }}>
      
      {/* Loading State Overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black">
          <div className="flex flex-col items-center gap-4">
             <div className="w-8 h-8 rounded-full border-t-2 border-black animate-spin"></div>
             <p className="tracking-[0.2em] text-xs uppercase text-black/50">Loading Assets...</p>
          </div>
        </div>
      )}

      {/* Sticky Container for full screen canvas and absolute text */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* HTML5 Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none"></canvas>
        
        {/* Text Overlays - Luxury Minimal Apple Style (Green Theme) */}
        <div className="absolute inset-0 z-20 pointer-events-none text-[#1a3b2b]">
            
            {/* 0% Intro Text (Left) */}
            <div ref={textRef0} className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col items-start justify-center px-8 md:pl-24 text-left">
                <h2 className="text-4xl md:text-7xl font-serif mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.7)]">NMF E LOTION</h2>
                <p className="text-sm md:text-base tracking-[0.3em] uppercase font-sans font-medium drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">
                  Intensive Hydration
                </p>
            </div>

            {/* 30% Formation Text (Right) */}
            <div ref={textRef30} className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col items-end justify-center px-8 md:pr-24 text-right opacity-0 translate-y-12">
                <h3 className="text-3xl md:text-6xl font-serif tracking-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.7)] mb-4">Restores Moisture</h3>
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase border-b-2 pb-1 font-sans font-medium drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">
                  Dermatologically Tested
                </p>
            </div>

            {/* 60% Ingredients Text (Left) */}
            <div ref={textRef60} className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col items-start justify-center px-8 md:pl-24 text-left opacity-0 translate-y-12">
                <h3 className="text-3xl md:text-6xl font-serif tracking-tight max-w-3xl leading-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.7)]">
                  Nourishing Formula<br/><span className="italic font-light opacity-80">& Lasting Softness</span>
                </h3>
            </div>

            {/* 90% Final Product Text (Center) */}
            <div ref={textRef90} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-12 mt-[30vh]">
                <h3 className="text-4xl md:text-7xl font-serif tracking-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.7)] leading-tight text-center">
                  Healthy.<br/>Glowing.<br/>Skin.
                </h3>
            </div>

        </div>
      </div>
    </section>
  );
};

export default NmfeScroll;
