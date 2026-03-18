import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 151;

// Helper to pad the frame index (e.g. 1 -> "001")
const currentFrame = (index) => 
  `/assets/sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const ProductScroll = () => {
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
            
            // Using ultra-crisp "object-contain" scaled down to 75% for a premium "floating frame" effect
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            let ratio = Math.min(hRatio, vRatio) * 0.75; 
            
            // Limit stretching to preserve absolute 720p clarity
            if (ratio > 1.2) ratio = 1.2;
            
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

        // Background Color Transition (White to Black for final frames)
        gsap.to(containerRef.current, {
            backgroundColor: "#050505",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "75% top",
                end: "90% top",
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
    <section ref={containerRef} className="relative w-full h-[400vh]" style={{ backgroundColor: "#ffffff" }}>
      
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
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain pointer-events-none"></canvas>
        
        {/* Text Overlays - Luxury Minimal Apple Style (Light Theme) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center mix-blend-difference text-white">
            
            {/* 0% Intro Text */}
            <div ref={textRef0} className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-7xl font-serif mb-4 tracking-tight drop-shadow-xl">Q-SERA</h2>
                <p className="text-sm md:text-base tracking-[0.3em] uppercase origin-center font-sans font-medium drop-shadow-lg">
                  Advanced Hair Science
                </p>
            </div>

            {/* 30% Formation Text */}
            <div ref={textRef30} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-12">
                <h3 className="text-3xl md:text-6xl font-serif tracking-tight drop-shadow-xl mb-4">Reduces Hair Fall</h3>
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase border-b-2 pb-1 font-sans font-medium drop-shadow-lg">
                  Clinically Proven Efficacy
                </p>
            </div>

            {/* 60% Ingredients Text */}
            <div ref={textRef60} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-12">
                <h3 className="text-3xl md:text-6xl font-serif tracking-tight max-w-3xl leading-[1.1] drop-shadow-xl">
                  Powered by Peptides<br/><span className="italic font-light opacity-80">& Redensyl</span>
                </h3>
            </div>

            {/* 90% Final Product Text */}
            <div ref={textRef90} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-12 mt-[30vh]">
                <h3 className="text-4xl md:text-7xl font-serif tracking-tight drop-shadow-xl leading-[1]">
                  Stronger.<br/>Fuller.<br/>Healthier Hair.
                </h3>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ProductScroll;
