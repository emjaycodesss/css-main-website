"use client";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

type CharacterSet = string[] | readonly string[];

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
) as readonly string[];

const getRandomInt = (max: number): number =>
  max <= 0 ? 0 : Math.floor(Math.random() * max);

export interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: CharacterSet;
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "span",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const chars = children.split("");
  const [displayText, setDisplayText] = useState<string[]>(chars);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCountRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);
  const scrollDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  /** Keep displayText in sync when children change */
  useEffect(() => {
    setDisplayText(children.split(""));
  }, [children]);

  /** Trigger animation on hover when animateOnHover is true */
  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCountRef.current = 0;
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    if (!startOnView) return;
    const el = elementRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      once: true,
      onEnter: () => {
        if (delay > 0) {
          scrollDelayTimeoutRef.current = setTimeout(() => {
            iterationCountRef.current = 0;
            setIsAnimating(true);
            scrollDelayTimeoutRef.current = null;
          }, delay);
        } else {
          iterationCountRef.current = 0;
          setIsAnimating(true);
        }
      },
    });

    return () => {
      st.kill();
      if (scrollDelayTimeoutRef.current != null) {
        clearTimeout(scrollDelayTimeoutRef.current);
        scrollDelayTimeoutRef.current = null;
      }
    };
  }, [delay, startOnView]);

  useEffect(() => {
    if (!isAnimating) return;

    const len = children.length;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      iterationCountRef.current = progress * len;

      setDisplayText((prev) =>
        prev.map((letter, index) =>
          letter === " "
            ? letter
            : index < iterationCountRef.current
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)]
        )
      );

      if (progress < 1) {
        frameIdRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        frameIdRef.current = null;
      }
    };

    frameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameIdRef.current != null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [children, duration, isAnimating, characterSet]);

  const Tag = Component as "span";
  return (
    <Tag
      ref={elementRef}
      onMouseEnter={handleAnimationTrigger}
      onFocus={handleAnimationTrigger}
      className={cn("inline-flex cursor-pointer", className)}
    >
      {displayText.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block will-change-transform"
          aria-hidden
        >
          {letter === " " ? "\u00A0" : letter.toUpperCase()}
        </motion.span>
      ))}
    </Tag>
  );
}
