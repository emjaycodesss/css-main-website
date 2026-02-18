import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import Navbar from '../../../shared/components/layout/Navbar';
import Marquee from './Marquee';

/** Top subtitle words – slide up by word */
const TOP_LINE_WORDS = ['Your', 'Community', 'For'];

/** Bottom subtitle words – slide up by word */
const BOTTOM_LINE_WORDS = [
  'A', 'Diverse', 'Collective', 'Shaping', 'the', 'Global',
  'Technological', 'Landscape', 'of', 'Tomorrow',
];

/** GSAP defaults: force3D promotes GPU layer; only x/y/rotation/scale (yPercent/xPercent are transform-based) */
const TWEEN_DEFAULTS = { force3D: true };

const Hero: React.FC = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLParagraphElement>(null);
  const allThingsRef = useRef<HTMLHeadingElement>(null);
  const computingRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const topWords = topLineRef.current?.querySelectorAll('.hero-word-inner') ?? [];
      const bottomWords = bottomLineRef.current?.querySelectorAll('.hero-word-inner') ?? [];
      const allThings = allThingsRef.current;
      const computing = computingRef.current;

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out', ...TWEEN_DEFAULTS },
      });

      timeline.fromTo(
        topWords,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, stagger: 0.06, force3D: true }
      );

      timeline.fromTo(
        allThings,
        { xPercent: -100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          overwrite: 'auto',
          force3D: true,
        },
        '-=0.2'
      );

      timeline.fromTo(
        computing,
        { xPercent: 100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          overwrite: 'auto',
          force3D: true,
        },
        '-=0.5'
      );

      timeline.fromTo(
        bottomWords,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, stagger: 0.04, force3D: true },
        '-=0.3'
      );
    },
    { scope: heroContentRef, dependencies: [] }
  );

  return (
    <section
      id="home"
      className="hero-section relative overflow-hidden bg-[#1a1d2e]"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas pixelDensity={1} fov={45}>
          <ShaderGradient
            animate="on"
            brightness={1.1}
            cAzimuthAngle={180}
            cDistance={3.9}
            cPolarAngle={115}
            cameraZoom={1}
            color1="#151728"
            color2="#151728"
            color3="#60529F"
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={-0.5}
            positionY={0.1}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={235}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={2.4}
            uTime={0.2}
            wireframe={false}
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.7]"
        style={{
          filter: 'url(#hero-grain)',
          backgroundImage: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/></svg>")',
          mixBlendMode: 'multiply',
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-[20vh]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #1a1d2e 100%)',
        }}
      />

      <div ref={heroContentRef} className="hero-section__center relative z-10">
        <div
          className="hero-section__inner w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 py-16 md:py-24 relative"
          style={{ zIndex: 10 }}
        >
        <div className="flex flex-col items-center justify-center text-center gap-0">
          <p
            ref={topLineRef}
            className="font-[var(--font-sans)] font-medium text-base sm:text-lg md:text-xl tracking-[0.02em] text-white mb-6 md:mb-8 cursor-default overflow-hidden hero-line"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.22)' }}
          >
            {TOP_LINE_WORDS.map((word, i) => (
              <span key={i} className="hero-word-wrap inline-block overflow-hidden align-middle">
                <span className="hero-word-inner inline-block will-change-transform">{word}</span>
                {i < TOP_LINE_WORDS.length - 1 ? '\u00A0' : null}
              </span>
            ))}
          </p>

          <div className="hero-heading-block relative mb-8 md:mb-12 cursor-default overflow-hidden">
            <h1
              ref={allThingsRef}
              className="hero-heading-title will-change-transform font-['Nasalization',sans-serif] font-normal uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,12vw,9rem)] text-white"
            >
              All Things
            </h1>
            <span
              ref={computingRef}
              className="hero-heading-title hero-heading-computing block will-change-transform font-['Nasalization',sans-serif] font-normal uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(3.5rem,14vw,10.5rem)] bg-gradient-to-b from-[#e3d7ff] via-[#b7a4ff] to-[#8b7ee6] bg-clip-text text-transparent"
            >
              Computing
            </span>
          </div>

          <p
            ref={bottomLineRef}
            className="font-[var(--font-sans)] font-medium text-base sm:text-lg md:text-xl tracking-[0.02em] text-white cursor-default overflow-hidden"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.22)' }}
          >
            {BOTTOM_LINE_WORDS.map((word, i) => (
              <span key={i} className="hero-word-wrap inline-block overflow-hidden align-middle">
                <span className="hero-word-inner inline-block will-change-transform">{word}</span>
                {i < BOTTOM_LINE_WORDS.length - 1 ? '\u00A0' : null}
              </span>
            ))}
          </p>
        </div>
        </div>
      </div>
      <Navbar />
      <Marquee />
    </section>
  );
};

export default Hero;
