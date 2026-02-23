import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import { GridBackground } from '../components/GridBackground';

const WhatIsCSS = lazy(() => import('../components/WhatIsCSS'));
const Gallery = lazy(() => import('../components/Gallery'));
const Stats = lazy(() => import('../components/Stats'));
const About = lazy(() => import('../components/About'));
const Team = lazy(() => import('../components/Team'));
const Contact = lazy(() => import('../components/Contact'));

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      <Hero />
      <Suspense fallback={null}>
        <WhatIsCSS />
        <Gallery />
        <Stats />
        <GridBackground>
          <About />
          <Team />
        </GridBackground>
        <Contact />
      </Suspense>
    </div>
  );
};

export default LandingPage;
