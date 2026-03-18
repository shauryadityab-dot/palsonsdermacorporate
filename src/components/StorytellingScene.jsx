/* eslint-disable react/prop-types */
import React from 'react';
const StorytellingScene = ({ milestone, sceneRef, bgRef, textRef, metaRef, index }) => {
  return (
    <div
      ref={sceneRef}
      className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden will-change-transform ${index === 0 ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform origin-center">
        <img
          src={milestone.image}
          alt={milestone.title}
          className="w-full h-full object-cover filter brightness-50 md:brightness-75"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between">
        <div ref={textRef} className="md:w-1/2 flex flex-col justify-center text-center md:text-left will-change-transform">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 drop-shadow-md">
            {milestone.title}
          </h2>
          <p className="text-lg text-gray-300 font-sans max-w-md mx-auto md:mx-0 drop-shadow-md">
            {milestone.description}
          </p>
        </div>
        
        <div ref={metaRef} className="mt-12 md:mt-0 flex flex-col items-center md:items-end will-change-transform">
          <span className="text-5xl md:text-8xl font-serif font-bold text-white/20 leading-none">
            {milestone.sideInfo.value}
          </span>
          <span className="text-sm md:text-base uppercase tracking-[0.3em] text-accent mt-2 font-bold drop-shadow-md">
            {milestone.sideInfo.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StorytellingScene;
