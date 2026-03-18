import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoader } from '../context/LoaderContext';

const PageLoader = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const { setIsLoaded } = useLoader();
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // 1. Preload key images logic
  useEffect(() => {
    const imagesToLoad = [
      '/assets/hero-banner.jpg',
      '/assets/logo.webp',
      // Add other critical LCP images here
    ];

    let loadedCount = 0;

    const imageLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        setImagesLoaded(true);
      }
    };

    if (imagesToLoad.length === 0) {
      setImagesLoaded(true);
    } else {
      imagesToLoad.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = imageLoaded;
        img.onerror = imageLoaded; // Proceed even if an image fails so we don't hang
      });
    }
  }, []);

  // 2. Master GSAP Timeline
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsHidden(true); // Safely unmount from DOM *after* wipe is finished
        }
      });

      // Phase 1: Entry
      tl.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Phase 2: Progress
      tl.fromTo(progressBarRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: 'power2.inOut',
          onUpdate: function() {
            setProgress(Math.round(this.progress() * 100));
          }
        }
      );

      // Add a small pause to wait for actual images if they are somehow still loading
      tl.add(() => {
        if (!imagesLoaded) {
          tl.pause();
          const checkInterval = setInterval(() => {
            if (imagesLoaded) {
              clearInterval(checkInterval);
              tl.play();
            }
          }, 100);
        }
      });

      // Phase 3: Exit (Clip Path Upward Wipe)
      // Signal home page to start animating its background right as the wipe starts
      tl.add(() => setIsLoaded(true), "+=0.2");

      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [imagesLoaded, setIsLoaded]);

  if (isHidden) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center will-change-transform"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div ref={contentRef} className="flex flex-col items-center will-change-transform opacity-0">
        <img 
          src="/assets/logo.webp" 
          alt="Palsons Derma" 
          className="h-16 w-auto object-contain mb-8 filter brightness-0 invert opacity-90"
        />
        
        {/* Progress Text */}
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-3 ml-2">
           {progress.toString().padStart(3, '0')}%
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-white/10 overflow-hidden relative">
           <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 w-full h-full bg-accent origin-left will-change-transform"
              style={{ transform: 'scaleX(0)' }}
           ></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
