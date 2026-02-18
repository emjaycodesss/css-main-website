import React from 'react';
import Hero from '../components/Hero';
import WhatIsCSS from '../components/WhatIsCSS';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Team from '../components/Team';
import Stats from '../components/Stats';
import { GridBackground } from '../components/GridBackground';
import Contact from '../components/Contact';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      <Hero />
      <WhatIsCSS />
      <Gallery />
      <Stats />
      <GridBackground>
        <About />
        <Team />
      </GridBackground>
      <Contact />
    </div>
  );
};

export default LandingPage;
