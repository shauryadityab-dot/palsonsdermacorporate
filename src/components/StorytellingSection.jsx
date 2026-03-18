import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storytellingMilestones } from '../data/storytellingMilestones';
import StorytellingScene from './StorytellingScene';

gsap.registerPlugin(ScrollTrigger);

const StorytellingSection = () => {
  const sectionRef = useRef(null);
  const scenesRef = useRef([]);
  const textRefs = useRef([]);
  const metaRefs = useRef([]);
  const bgRefs = useRef([]);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create matchMedia instance for responsiveness
    // On mobile we might want to reduce animations, but we'll keep the core timeline mostly intact, just maybe less travel distance or no pinning if we prefer, 
    // but the user requested pinning. We will adjust the scrub/pin slightly if needed, but GSAP matchMedia handles it perfectly.
    let mm = gsap.matchMedia();

    let ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        // Desktop setup
        const validBgRefs = bgRefs.current.filter(Boolean);
        const validTextRefs = textRefs.current.filter(Boolean);
        const validMetaRefs = metaRefs.current.filter(Boolean);

        if (validBgRefs.length > 0) gsap.set(validBgRefs, { scale: 1 });
        if (validTextRefs.length > 1) gsap.set(validTextRefs.slice(1), { y: 50, opacity: 0 });
        if (validMetaRefs.length > 1) gsap.set(validMetaRefs.slice(1), { y: 50, opacity: 0 });
        if (validBgRefs.length > 1) gsap.set(validBgRefs.slice(1), { scale: 1.2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${storytellingMilestones.length * 1000}`, // artificially extended scroll
            pin: true,
            scrub: 1, // smooth scrubbing
            onUpdate: (self) => setProgress(self.progress),
          }
        });

        storytellingMilestones.forEach((_, index) => {
          if (index === 0) return;

          const prevScene = scenesRef.current[index - 1];
          const prevText = textRefs.current[index - 1];
          const prevMeta = metaRefs.current[index - 1];
          const prevBg = bgRefs.current[index - 1];

          const currScene = scenesRef.current[index];
          const currText = textRefs.current[index];
          const currMeta = metaRefs.current[index];
          const currBg = bgRefs.current[index];

          if (!prevScene || !currScene || !prevText || !currText) return;

          // Ensure current scene is layered above the previous one during the transition
          tl.set(currScene, { zIndex: 10 }, `scene${index}`)
            .set(prevScene, { zIndex: 5 }, `scene${index}`);

          // Add to master timeline
          tl.to(prevText, { y: -50, opacity: 0, duration: 1, ease: 'power1.inOut' }, `scene${index}`)
            .to(prevMeta, { y: -50, opacity: 0, duration: 1, ease: 'power1.inOut' }, `scene${index}`)
            .to(prevBg, { scale: 0.9, opacity: 0, duration: 2, ease: 'power2.inOut' }, `scene${index}`)
            
            .to(currScene, { opacity: 1, duration: 2, ease: 'power2.inOut' }, `scene${index}`)
            .to(currBg, { scale: 1, duration: 2, ease: 'power2.out' }, `scene${index}`)
            
            .to(currText, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, `scene${index}+=1`)
            .to(currMeta, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, `scene${index}+=1`);
        });
        
        return () => tl.kill();
      });
    }, sectionRef);

    let ctxMobile = gsap.context(() => {
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${storytellingMilestones.length * 600}`,
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => setProgress(self.progress),
          }
        });

        const validTextRefs = textRefs.current.filter(Boolean);
        const validMetaRefs = metaRefs.current.filter(Boolean);

        if (validTextRefs.length > 1) gsap.set(validTextRefs.slice(1), { opacity: 0 });
        if (validMetaRefs.length > 1) gsap.set(validMetaRefs.slice(1), { opacity: 0 });

        storytellingMilestones.forEach((_, index) => {
          if (index === 0) return;

          const prevScene = scenesRef.current[index - 1];
          const prevText = textRefs.current[index - 1];
          const prevMeta = metaRefs.current[index - 1];

          const currScene = scenesRef.current[index];
          const currText = textRefs.current[index];
          const currMeta = metaRefs.current[index];

          if (!prevScene || !currScene || !prevText || !currText) return;

          tl.set(currScene, { zIndex: 10 }, `scene${index}`)
            .set(prevScene, { zIndex: 5 }, `scene${index}`);

          tl.to(prevText, { opacity: 0, duration: 1 }, `scene${index}`)
            .to(prevMeta, { opacity: 0, duration: 1 }, `scene${index}`)
            .to(prevScene, { opacity: 0, duration: 1.5 }, `scene${index}`)
            
            .to(currScene, { opacity: 1, duration: 1.5 }, `scene${index}`)
            .to(currText, { opacity: 1, duration: 1 }, `scene${index}+=0.5`)
            .to(currMeta, { opacity: 1, duration: 1 }, `scene${index}+=0.5`);
        });
        
        return () => tl.kill();
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
      ctxMobile.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full bg-black overflow-hidden m-0 p-0">
      
      {/* Vertical Progress Indicator */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-[40vh] w-1 bg-white/20 z-50 rounded-full overflow-hidden">
        <div 
          className="w-full bg-accent rounded-full will-change-transform origin-top"
          style={{ height: `${progress * 100}%` }}
        ></div>
      </div>

      <div className="relative h-full w-full">
        {storytellingMilestones.map((milestone, index) => (
          <StorytellingScene 
            key={milestone.id}
            index={index}
            milestone={milestone}
            sceneRef={el => scenesRef.current[index] = el}
            bgRef={el => bgRefs.current[index] = el}
            textRef={el => textRefs.current[index] = el}
            metaRef={el => metaRefs.current[index] = el}
          />
        ))}
      </div>
    </section>
  );
};

export default StorytellingSection;
