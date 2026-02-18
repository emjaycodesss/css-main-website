"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollProvider
 *
 * Optional provider to unify scroll experience with Lenis smooth scroll and
 * GSAP ScrollTrigger. Wrap your app (or only the landing layout) with this
 * when you want smooth scrolling that stays in sync with ScrollTrigger and
 * Framer Motion's useScroll.
 *
 * Integration:
 * 1. Wrap app in SmoothScrollProvider (e.g. in App.tsx or LandingLayout).
 * 2. Lenis runs its own RAF (autoRaf: true); on each scroll we call
 *    ScrollTrigger.update() so GSAP scrub animations stay in sync.
 * 3. Framer Motion's useScroll reads document scroll; Lenis updates
 *    document scroll position, so MotionValues stay in sync automatically.
 *
 * Usage in App.tsx:
 *   import { SmoothScrollProvider } from './shared/providers/SmoothScrollProvider';
 *   <SmoothScrollProvider>
 *     <AppRoutes />
 *   </SmoothScrollProvider>
 *
 * To disable (e.g. for a11y or performance): do not wrap with SmoothScrollProvider
 * or pass enabled={false}.
 */
export function SmoothScrollProvider({
  children,
  enabled = true,
  options = {},
}: {
  children: React.ReactNode;
  enabled?: boolean;
  options?: ConstructorParameters<typeof Lenis>[0];
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      ...options,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, options]);

  return <>{children}</>;
}
