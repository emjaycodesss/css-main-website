"use client";
import { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven animation: progress tied to viewport scroll over the tall container (210vh/220vh). */

// ── Vertical SVG paths (viewBox 0 0 400 700) ──
const PATH1 =
  "M80 60 C80 130 55 175 110 230 C165 285 75 320 135 370 C170 395 190 398 200 400";
const PATH2_UPPER =
  "M200 60 C200 130 220 175 190 230 C160 285 225 320 195 370 C180 395 198 398 200 400";
const PATH2_LOWER =
  "M200 400 C202 402 215 435 200 480 C185 525 210 575 200 620 C195 648 200 658 200 660";
const PATH3 =
  "M320 60 C320 130 345 175 290 230 C235 285 325 320 265 370 C230 395 210 398 200 400";

/** Returns responsive values based on current viewport width */
function getResponsiveConfig() {
  const w = window.innerWidth;
  if (w < 640) {
    return {
      strokeWidth: 2,
      scrub: 1.5,
      start: "top 70%",
      end: "bottom 80%",
    };
  }
  if (w < 768) {
    return {
      strokeWidth: 2.5,
      scrub: 1.5,
      start: "top 60%",
      end: "bottom 90%",
    };
  }
  if (w < 1024) {
    return {
      strokeWidth: 3,
      scrub: 1.5,
      start: "top 55%",
      end: "bottom bottom",
    };
  }
  return {
    strokeWidth: 3,
    scrub: 1.5,
    start: "top 50%",
    end: "bottom bottom",
  };
}

// Animated badge — rotating conic-gradient border, pure CSS
const Badge = ({
  children,
  borderColor,
  textColor,
  size = "sm",
}: {
  children: React.ReactNode;
  borderColor: string;
  textColor: string;
  size?: "sm" | "lg" | "xl";
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 sm:px-4 sm:py-1.5 md:px-8 md:py-3 text-xs sm:text-sm md:text-2xl",
    lg: "px-4 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-3 text-sm sm:text-lg md:text-2xl",
    xl: "px-5 py-2 sm:px-8 sm:py-3 md:px-14 md:py-5 text-xl sm:text-3xl md:text-5xl",
  };

  const glowSizes = {
    sm: "0 0 12px 2px",
    lg: "0 0 16px 3px",
    xl: "0 0 24px 4px",
  };

  const spinDurations = {
    sm: "4s",
    lg: "5s",
    xl: "6s",
  };

  return (
    <span
      className="relative flex items-center justify-center w-fit"
      style={{
        filter: `drop-shadow(${glowSizes[size]} ${borderColor})`,
      }}
    >
      {/* Border wrapper — clips the rotating gradient */}
      <span className="relative flex rounded-full items-center justify-center p-0.5 sm:p-1 overflow-hidden">
        {/* Spinning conic gradient — creates the animated border */}
        <span
          className="absolute inset-[-50%] animate-[badge-spin_var(--spin-duration)_linear_infinite]"
          style={{
            "--spin-duration": spinDurations[size],
            background: `conic-gradient(from 0deg, transparent 0%, ${textColor} 25%, transparent 50%, ${borderColor} 75%, transparent 100%)`,
          } as React.CSSProperties}
        />
        {/* Solid inner pill */}
        <span
          className={cn(
            "relative z-10 rounded-full font-bold font-['Nasalization',sans-serif] uppercase tracking-[-0.02em] bg-[#1a1d2e]",
            sizeClasses[size]
          )}
          style={{ color: textColor }}
        >
          {children}
        </span>
      </span>
    </span>
  );
};

export const GoogleGeminiEffect = ({
  containerRef,
  className,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) => {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2UpperRef = useRef<SVGPathElement>(null);
  const path2LowerRef = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cssBadgeRef = useRef<HTMLDivElement>(null);
  const ccisBadgeRef = useRef<HTMLDivElement>(null);
  const isBadgeRef = useRef<HTMLDivElement>(null);
  const csBadgeRef = useRef<HTMLDivElement>(null);
  const emcBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline | undefined;
    let scrollTriggerInstance: ScrollTrigger | undefined;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let retryId: ReturnType<typeof setTimeout> | undefined;

    function runWhenReady() {
      const container = containerRef.current;
      const paths = [path1Ref.current, path2UpperRef.current, path2LowerRef.current, path3Ref.current];
      const svg = svgRef.current;
      const cssBadge = cssBadgeRef.current;
      const ccisBadge = ccisBadgeRef.current;
      const topBadges = [isBadgeRef.current, csBadgeRef.current, emcBadgeRef.current];

      if (
        !container ||
        !svg ||
        !cssBadge ||
        !ccisBadge ||
        paths.some((p) => !p) ||
        topBadges.some((b) => !b)
      )
        return;

        const [path1, path2Upper, path2Lower, path3] = paths as SVGPathElement[];
      const isMobile = () => window.innerWidth < 640;

      function showStaticState() {
        const sw = "2";
        path1.setAttribute("stroke-width", sw);
        path2Upper.setAttribute("stroke-width", sw);
        path2Lower.setAttribute("stroke-width", sw);
        path3.setAttribute("stroke-width", sw);
        path1.removeAttribute("style");
        path2Upper.removeAttribute("style");
        path2Lower.removeAttribute("style");
        path3.removeAttribute("style");
        gsap.set(topBadges, { scale: 1, opacity: 1, clearProps: "transform" });
        gsap.set([cssBadge, ccisBadge], { scale: 1, opacity: 1, clearProps: "transform" });
      }

      function buildAnimation() {
        tl?.kill();
        scrollTriggerInstance?.kill();

        if (isMobile()) {
          showStaticState();
          return;
        }

        const config = getResponsiveConfig();
        const sw = String(config.strokeWidth);
        path1.setAttribute("stroke-width", sw);
        path2Upper.setAttribute("stroke-width", sw);
        path2Lower.setAttribute("stroke-width", sw);
        path3.setAttribute("stroke-width", sw);

        const path1Len = path1.getTotalLength();
        const path2UpperLen = path2Upper.getTotalLength();
        const path2LowerLen = path2Lower.getTotalLength();
        const path3Len = path3.getTotalLength();
        const peekAmount = 0.15;
        const path1Start = path1Len * (1 - peekAmount);
        const path2UpperStart = path2UpperLen * (1 - peekAmount);
        const path3Start = path3Len * (1 - peekAmount);

        gsap.set(path1, { strokeDasharray: path1Len, strokeDashoffset: path1Start });
        gsap.set(path2Upper, { strokeDasharray: path2UpperLen, strokeDashoffset: path2UpperStart });
        gsap.set(path2Lower, { strokeDasharray: path2LowerLen, strokeDashoffset: path2LowerLen, opacity: 0 });
        gsap.set(path3, { strokeDasharray: path3Len, strokeDashoffset: path3Start });
        gsap.set(topBadges, { scale: 1, opacity: 1, force3D: true });
        gsap.set([cssBadge, ccisBadge], { scale: 0, opacity: 0, force3D: true });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: config.start,
            end: config.end,
            scrub: config.scrub,
            fastScrollEnd: true,
          },
        });
        scrollTriggerInstance = tl.scrollTrigger ?? undefined;

        tl.fromTo(path1, { strokeDashoffset: path1Start }, { strokeDashoffset: 0, ease: "none", duration: 0.50 }, 0);
        tl.fromTo(path3, { strokeDashoffset: path3Start }, { strokeDashoffset: 0, ease: "none", duration: 0.50 }, 0);
        tl.fromTo(path2Upper, { strokeDashoffset: path2UpperStart }, { strokeDashoffset: 0, ease: "none", duration: 0.50 }, 0);
        tl.fromTo(cssBadge, { scale: 0, opacity: 0, force3D: true }, { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 0.08, force3D: true }, 0.50);
        tl.set(path2Lower, { opacity: 1 }, 0.58);
        tl.fromTo(path2Lower, { strokeDashoffset: path2LowerLen }, { strokeDashoffset: 0, ease: "none", duration: 0.32 }, 0.58);
        tl.fromTo(ccisBadge, { scale: 0, opacity: 0, force3D: true }, { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 0.10, force3D: true }, 0.90);
      }

      buildAnimation();
      if (!isMobile()) ScrollTrigger.refresh();
    }

    const rafId = requestAnimationFrame(() => {
      runWhenReady();
      if (!tl && containerRef.current) retryId = setTimeout(runWhenReady, 50);
    });
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(runWhenReady, 250);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", runWhenReady);

    return () => {
      cancelAnimationFrame(rafId);
      if (retryId) clearTimeout(retryId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", runWhenReady);
      tl?.kill();
      scrollTriggerInstance?.kill();
    };
  }, [containerRef]);

  return (
    <div className={cn("sm:sticky sm:top-0 sm:h-screen flex items-center sm:items-start justify-center", className)}>
      <div
        className="relative w-full max-w-[90vw] sm:max-w-[75vw] md:max-w-200 lg:max-w-240 xl:max-w-280 mx-auto overflow-visible"
        style={{ aspectRatio: "400 / 700" }}
      >
        {/* Top badges — spread horizontally */}
        <div
          ref={isBadgeRef}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          style={{ left: "20%", top: "8.6%" }}
        >
          <Badge borderColor="rgba(167,139,250,0.4)" textColor="#A78BFA">IS</Badge>
        </div>
        <div
          ref={csBadgeRef}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          style={{ left: "50%", top: "8.6%" }}
        >
          <Badge borderColor="rgba(239,201,255,0.4)" textColor="#EFC9FF">CS</Badge>
        </div>
        <div
          ref={emcBadgeRef}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          style={{ left: "80%", top: "8.6%" }}
        >
          <Badge borderColor="rgba(139,99,170,0.4)" textColor="#8B63AA">EMC</Badge>
        </div>
        {/* CSS badge — center, pops in when lines meet */}
        <div
          ref={cssBadgeRef}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          style={{ left: "50%", top: "57%" }}
        >
          <Badge borderColor="rgba(139,126,230,0.4)" textColor="#FFFFFF" size="xl">CSS</Badge>
        </div>
        {/* CCIS badge — bottom center */}
        <div
          ref={ccisBadgeRef}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          style={{ left: "50%", top: "94%" }}
        >
          <Badge borderColor="rgba(239,201,255,0.4)" textColor="#EFC9FF" size="lg">CCIS</Badge>
        </div>

        <svg
          ref={svgRef}
          width="400"
          height="700"
          viewBox="0 0 400 700"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "contents", contain: "layout style" }}
        >
          <path
            ref={path1Ref}
            d={PATH1}
            stroke="#A78BFA"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <path
            ref={path2UpperRef}
            d={PATH2_UPPER}
            stroke="#EFC9FF"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <path
            ref={path2LowerRef}
            d={PATH2_LOWER}
            stroke="#EFC9FF"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <path
            ref={path3Ref}
            d={PATH3}
            stroke="#8B63AA"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
