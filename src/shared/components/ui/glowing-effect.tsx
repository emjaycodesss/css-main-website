"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * GlowingEffect Component
 * Creates an interactive glowing border effect that follows mouse movement
 * Uses cartesian coordinates with radial-gradient for precise mouse tracking
 * 
 * @param spread - Radius of the radial glow in pixels (default: 40)
 * @param glow - Force visibility regardless of hover state (default: false)
 * @param disabled - Disable the interactive effect (default: false)
 * @param proximity - Distance from border where effect remains active (default: 64)
 * @param inactiveZone - Center zone radius multiplier where effect is disabled (default: 0.01)
 * @param borderWidth - Width of the glowing border in pixels (default: 2.5)
 * @param variant - Color variant: "default" or "white" (default: "default")
 * @param blur - Blur amount in pixels (default: 0)
 * @param movementDuration - Duration of glow movement animation in seconds (default: 0.1)
 * @param className - Additional CSS classes
 */
interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  /**
   * Outer proximity in px used to ramp opacity based on distance to card center
   */
  outerProximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
  variant?: "default" | "white";
  blur?: number;
  movementDuration?: number;
  className?: string;
}

export function GlowingEffect({
  spread = 2000,
  glow = false,
  disabled = false,
  proximity = 64,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- reserved for future inactive-zone behavior
  inactiveZone: _inactiveZone = 0.01,
  borderWidth = 2.5,
  variant = "default",
  blur = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- reserved for future animation tuning
  movementDuration: _movementDuration = 0.1,
  outerProximity = 1600,
  className = "",
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const gradientColors = useMemo(() => {
    if (variant === "white") {
      return {
        start: "rgba(255, 255, 255, 1)",
        mid: "rgba(255, 255, 255, 0.85)",
        end: "rgba(255, 255, 255, 0.6)",
      };
    }
    return {
      start: "rgba(139, 126, 230, 1)",
      mid: "rgba(139, 126, 230, 0.85)",
      end: "rgba(139, 126, 230, 0.6)",
    };
  }, [variant]);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const parentCard = container.closest('.card-standard') || container.parentElement;
    if (!parentCard) return;
    const cardElement = parentCard as HTMLElement;

    let rect = cardElement.getBoundingClientRect();
    const computedStyle = getComputedStyle(cardElement);
    // Parsed for potential future use (e.g. matching glow corner radius); referenced to satisfy noUnusedLocals
    const _parsedBorderRadius = parseFloat(computedStyle.borderRadius || "0") || 0;
    void _parsedBorderRadius;
    const updateRect = () => {
      rect = cardElement.getBoundingClientRect();
      if (glowLayerRef.current) {
        const el = glowLayerRef.current as HTMLElement;
        const bw = Math.max(0, Math.round(borderWidth));
        const mask = `linear-gradient(#000,#000), linear-gradient(#fff,#fff)`;
        el.style.webkitMaskImage = mask;
        el.style.maskImage = mask;
        el.style.webkitMaskClip = 'content-box, border-box';
        el.style.maskClip = 'content-box, border-box';
        el.style.webkitMaskComposite = 'exclude';
        el.style.maskComposite = 'exclude';
        el.style.webkitMaskRepeat = 'no-repeat';
        el.style.maskRepeat = 'no-repeat';
        el.style.webkitMaskSize = '100% 100%';
        el.style.maskSize = '100% 100%';
        el.style.padding = `${bw}px`;
      }
    };

    const handleScroll = () => updateRect();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    let rafId: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;

    const processPointer = () => {
      rafId = null;

      const localX = lastClientX - rect.left;
      const localY = lastClientY - rect.top;

      mouseX.set(localX);
      mouseY.set(localY);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = localX - centerX;
      const deltaY = localY - centerY;
      const _distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      void _distance;

      const dx = Math.max(rect.left - lastClientX, 0, lastClientX - rect.right);
      const dy = Math.max(rect.top - lastClientY, 0, lastClientY - rect.bottom);
      const distToCard = Math.sqrt(dx * dx + dy * dy);

      const norm = Math.max(0, Math.min(1, distToCard / outerProximity));
      const quad = 1 - norm * norm;
      const calculatedOpacity = glow ? 1 : Math.max(0, Math.min(1, quad));
      opacity.set(calculatedOpacity);
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (rafId == null) rafId = requestAnimationFrame(processPointer);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    updateRect();

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [disabled, proximity, glow, mouseX, mouseY, opacity, borderWidth, outerProximity]);

  const bg = useMotionTemplate`
    linear-gradient(#1a1d2e, #1a1d2e) padding-box,
    radial-gradient(
      circle ${spread}px at ${mouseX}px ${mouseY}px,
      ${gradientColors.start} 0%,
      ${gradientColors.mid} 40%,
      ${gradientColors.end} 70%,
      transparent 100%
    ) border-box
  `;

  const boxShadow = useMotionTemplate`
    0 0 ${spread * 3}px ${gradientColors.start},
    0 0 ${spread * 5}px ${gradientColors.mid}
  `;

  if (disabled && !glow) return null;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        borderRadius: "inherit",
    }}
  >
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius: "inherit",
          border: `${borderWidth}px solid transparent`,
          background: bg,
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
          WebkitMaskComposite: 'exclude',
          maskComposite: 'exclude',
          filter: blur > 0 ? `blur(${blur}px)` : "none",
          opacity: opacity,
          boxShadow: boxShadow,
          willChange: "opacity",
        }}
      />
    </div>
  );
}
