"use client";

import { useRef } from "react";
import {
  motion,
  type MotionProps,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type UseInViewOptions,
  type Variants,
} from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number; x?: number };
    visible: { y: number; x?: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

/**
 * High-performance BlurFade: when inView is true, uses useScroll + useTransform
 * so that y/opacity/filter are driven by MotionValues (no React re-renders during scroll).
 * "Once" behavior is achieved by clamping scroll progress to max so far.
 */
export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    maxProgress.set(Math.max(v, maxProgress.get()));
  });

  const scrollInputRange: [number, number] = [0, 0.35];
  const translateAxis = direction === "left" || direction === "right" ? "x" : "y";
  const translateStart =
    direction === "right" || direction === "down" ? -offset : offset;

  const translateValue = useTransform(
    maxProgress,
    scrollInputRange,
    [translateStart, 0]
  );
  const opacity = useTransform(maxProgress, scrollInputRange, [0, 1]);
  const filter = useTransform(maxProgress, scrollInputRange, [`blur(${blur})`, "blur(0px)"]);

  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const defaultVariants: Variants = {
    hidden: {
      [translateAxis]: direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [translateAxis]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const combinedVariants = variant ?? defaultVariants;

  if (inView) {
    return (
      <motion.div
        ref={ref}
        style={{
          ...(translateAxis === "x" ? { x: translateValue } : { y: translateValue }),
          opacity,
          filter,
          willChange: "transform, opacity, filter",
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{ duration, delay }}
      style={{ willChange: "transform, opacity, filter" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
