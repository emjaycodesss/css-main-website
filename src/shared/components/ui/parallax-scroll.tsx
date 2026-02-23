"use client";

import { useScroll, useTransform, useSpring, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { BlurFade } from "./blur-fade";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const parallaxRange = isMobile ? 80 : 200;
  const springConfig = { stiffness: 120, damping: 30, mass: 0.5 };

  const rawFirst = useTransform(scrollYProgress, [0, 1], [0, -parallaxRange]);
  const rawSecond = useTransform(scrollYProgress, [0, 1], [0, parallaxRange]);
  const rawThird = useTransform(scrollYProgress, [0, 1], [0, -parallaxRange]);

  const translateFirst = useSpring(rawFirst, springConfig);
  const translateSecond = useSpring(rawSecond, springConfig);
  const translateThird = useSpring(rawThird, springConfig);

  // Split images into columns based on screen size
  if (isMobile) {
    // 3-column layout for mobile/tablet
    const mBase = Math.floor(images.length / 3);
    const mRemainder = images.length % 3;
    const m1Count = mBase + (mRemainder >= 1 ? 1 : 0);
    const m2Count = mBase;
    const col1 = images.slice(0, m1Count);
    const col2 = images.slice(m1Count, m1Count + m2Count);
    const col3 = images.slice(m1Count + m2Count);

    return (
      <div className={cn("w-full", className)} ref={gridRef}>
        <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto grid grid-cols-3 items-start gap-2 sm:gap-3 px-3 sm:px-4 py-12">
          <div className="grid gap-2 sm:gap-3">
            {col1.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst, willChange: "transform" }}
                key={"grid-m1-" + idx}
              >
                <BlurFade delay={0.25 + (0 + idx) * 0.05} inView>
                  <img
                    src={el}
                    className="h-28 sm:h-40 w-full rounded-md object-cover object-center"
                    height="160"
                    width="160"
                    alt="Gallery"
                    loading="eager"
                    decoding="async"
                  />
                </BlurFade>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-2 sm:gap-3 mt-6">
            {col2.map((el, idx) => {
              const globalIdx = m1Count + idx;
              return (
                <motion.div
                  style={{ y: translateSecond, willChange: "transform" }}
                  key={"grid-m2-" + idx}
                >
                  <BlurFade delay={0.25 + globalIdx * 0.05} inView>
                    <img
                      src={el}
                      className="h-28 sm:h-40 w-full rounded-md object-cover object-center"
                      height="160"
                      width="160"
                      alt="Gallery"
                      loading="eager"
                      decoding="async"
                    />
                  </BlurFade>
                </motion.div>
              );
            })}
          </div>
          <div className="grid gap-2 sm:gap-3">
            {col3.map((el, idx) => {
              const globalIdx = m1Count + m2Count + idx;
              return (
                <motion.div
                  style={{ y: translateThird, willChange: "transform" }}
                  key={"grid-m3-" + idx}
                >
                  <BlurFade delay={0.25 + globalIdx * 0.05} inView>
                    <img
                      src={el}
                      className="h-28 sm:h-40 w-full rounded-md object-cover object-center"
                      height="160"
                      width="160"
                      alt="Gallery"
                      loading="eager"
                      decoding="async"
                    />
                  </BlurFade>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: 3-column layout (unchanged)
  const base = Math.floor(images.length / 3);
  const remainder = images.length % 3;
  const firstCount = base + (remainder >= 1 ? 1 : 0);
  const secondCount = base;

  const firstPart = images.slice(0, firstCount);
  const secondPart = images.slice(firstCount, firstCount + secondCount);
  const thirdPart = images.slice(firstCount + secondCount);

  return (
    <div className={cn("w-full", className)} ref={gridRef}>
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto grid grid-cols-3 items-start gap-10 px-4 md:px-8 2xl:px-12 py-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst, willChange: "transform" }}
              key={"grid-1" + idx}
            >
              <BlurFade delay={0.25 + idx * 0.05} inView>
                <img
                  src={el}
                  className="h-96 w-full rounded-lg object-cover object-center"
                  height="400"
                  width="400"
                  alt="Gallery"
                  loading="lazy"
                  decoding="async"
                />
              </BlurFade>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => {
            const globalIdx = firstCount + idx;
            return (
              <motion.div
                style={{ y: translateSecond, willChange: "transform" }}
                key={"grid-2" + idx}
              >
                <BlurFade delay={0.25 + globalIdx * 0.05} inView>
                  <img
                    src={el}
                    className="h-96 w-full rounded-lg object-cover object-center"
                    height="400"
                    width="400"
                    alt="Gallery"
                    loading="eager"
                    decoding="async"
                  />
                </BlurFade>
              </motion.div>
            );
          })}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => {
            const globalIdx = firstCount + secondCount + idx;
            return (
              <motion.div
                style={{ y: translateThird, willChange: "transform" }}
                key={"grid-3" + idx}
              >
                <BlurFade delay={0.25 + globalIdx * 0.05} inView>
                  <img
                    src={el}
                    className="h-96 w-full rounded-lg object-cover object-center"
                    height="400"
                    width="400"
                    alt="Gallery"
                    loading="eager"
                    decoding="async"
                  />
                </BlurFade>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
