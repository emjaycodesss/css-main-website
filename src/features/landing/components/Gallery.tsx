import React from 'react';
import { ParallaxScroll } from '../../../shared/components/ui/parallax-scroll';
import { HyperText } from '../../../shared/components/ui/hyper-text';

const images = [
  "/assets/images/gallery/band.png",
  "/assets/images/gallery/band2.jpg",
  "/assets/images/gallery/ccis-2526.png",
  "/assets/images/gallery/cheerdance.jpg",
  "/assets/images/gallery/lakad-dagat.png",
  "/assets/images/gallery/lakad-dagat2.png",
  "/assets/images/gallery/oathtaking.png",
  "/assets/images/gallery/photobooth.png",
  "/assets/images/gallery/streetdance.jpg",
  "/assets/images/gallery/volleyball.jpg",
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="relative bg-[#1a1d2e] pt-24 md:pt-32">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="inline-flex items-center mb-2 md:mb-4 justify-center md:justify-start w-full">
          <div className="section-label-wrapper relative px-2 py-1 md:px-3 md:py-1.5">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-l border-[#8b7ee6]" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-r border-[#8b7ee6]" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-l border-[#8b7ee6]" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-r border-[#8b7ee6]" />
            <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-[0.02em] text-white cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>
            <HyperText as="span" startOnView>GALLERY</HyperText>
          </h2>
          </div>
        </div>

        <h3 className="section-headline uppercase text-white mb-6 md:mb-8 cursor-default text-center md:text-left">
          The Community
        </h3>
      </div>

      <ParallaxScroll images={images} />
    </section>
  );
};

export default Gallery;
