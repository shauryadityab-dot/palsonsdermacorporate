import React from 'react';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import About from '../components/About';
import BrandShowcase from '../components/BrandShowcase';
import LegacyTimeline from '../components/LegacyTimeline';
import Manufacturing from '../components/Manufacturing';

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            {/* <Brands /> */}
            <LegacyTimeline />
            <BrandShowcase />
            {/* Manufacturing moved to Innovation Page */}
        </main>
    );
};

export default Home;
