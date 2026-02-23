import React, { useRef } from 'react';
import { GoogleGeminiEffect } from '../../../shared/components/ui/google-gemini-effect';
import { FlickeringGrid } from '../../../shared/components/ui/flickering-grid';
import { HyperText } from '../../../shared/components/ui/hyper-text';


const WhatIsCSS: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="what-is-css" className="relative z-10 overflow-visible bg-[#1a1d2e] pt-24 md:pt-32 pb-0">
      <div className="absolute inset-0 z-0" style={{ mask: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMask: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
        <FlickeringGrid
          className="size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.1}
        />
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="relative z-20 text-center md:text-left">
          <div className="inline-flex items-center mb-2 md:mb-4 justify-center md:justify-start">
            <div className="section-label-wrapper relative px-2 py-1 md:px-3 md:py-1.5">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-l border-[#8b7ee6]" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-r border-[#8b7ee6]" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-l border-[#8b7ee6]" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-r border-[#8b7ee6]" />
              <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-[0.02em] text-white cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>
                <HyperText as="span" startOnView>ABOUT</HyperText>
              </h2>
            </div>
          </div>

          <h3 className="section-headline uppercase text-white mb-6 md:mb-8 cursor-default">
            What is CSS?
          </h3>

          <p className="font-[var(--font-sans)] text-lg md:text-xl leading-relaxed text-[#b8b4c9] cursor-default">
            The <span className="text-white font-medium">Computing Students' Society (CSS)</span> is
            the premier student organization of the{' '}
            <span className="text-white font-medium">College of Computer and Information Sciences (CCIS)</span> at Mapúa Malayan Colleges Mindanao.
            We unite students across Computer Science, Information Systems, and Entertainment &
            Multimedia Computing under one community.
          </p>
        </div>

        <div
          className="mt-4 md:-mt-8 h-auto sm:h-[210vh] md:h-[220vh] w-full relative overflow-visible"
          ref={ref}
        >
          <GoogleGeminiEffect containerRef={ref} />
        </div>
      </div>
    </section>
  );
};

export default WhatIsCSS;
