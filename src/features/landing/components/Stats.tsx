import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { NumberTicker } from '../../../shared/components/ui/number-ticker';

const stats = [
  { value: 100, suffix: '+', label: 'Active Members' },
  { value: 20, suffix: '+', label: 'Events Held' },
  { value: 6, suffix: '+', label: 'Years Active' },
];

const StatItem: React.FC<{
  value: number;
  suffix: string;
  label: string;
}> = ({ value, suffix, label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 md:gap-4 py-10 md:py-16">
      <span className="stat-value text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight text-white whitespace-nowrap">
        <NumberTicker
          value={value}
          className="stat-value text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight text-white"
        />
        {suffix}
      </span>
      <span className="font-[var(--font-sans)] text-sm sm:text-base md:text-lg text-white/60 font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
};

const Stats: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section
      className="relative bg-[#60529F]"
    >
      <div className="border-b border-dashed border-white/25 px-6 py-8 md:px-8 md:py-10" ref={headingRef}>
        <motion.h3
          className="font-[var(--font-sans)] font-normal leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] text-white text-center cursor-default"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Our numbers speak for themselves.
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={i < stats.length - 1 ? 'border-b border-dashed sm:border-b-0 sm:border-r border-white/25' : ''}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
