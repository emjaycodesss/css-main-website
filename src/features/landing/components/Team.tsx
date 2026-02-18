import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HyperText } from '../../../shared/components/ui/hyper-text';

const CAROUSEL_EASE = [0.32, 0.72, 0, 1] as const;
const CAROUSEL_TRANSITION_DESKTOP = { duration: 0.6, ease: CAROUSEL_EASE };
const CAROUSEL_TRANSITION_MOBILE = { duration: 0.5, ease: CAROUSEL_EASE };

const MOBILE_BREAKPOINT = 768;

const officers = [
  { id: 1, name: "Julliana Louise I. Onor", role: "President", year: "2nd Year", major: "BSCS", isPresident: true, social: { email: "jlOnor@mcm.edu.ph" } },
  { id: 2, name: "Drew Dwayne B. Sultan", role: "Internal Vice President", year: "2nd Year", major: "BSCS", social: { email: "ddSultan@mcm.edu.ph" } },
  { id: 3, name: "Kisha Ann Joy M. Sanchez", role: "External Vice President", year: "2nd Year", major: "BSCS", social: { email: "kajsanchez@mcm.edu.ph" } },
  { id: 4, name: "Summer Nichole A. Legaspi", role: "Secretary", year: "2nd Year", major: "BSEMC", social: { email: "snlegaspi@mcm.edu.ph" } },
  { id: 5, name: "Kirk Roden C. Pacanan", role: "Finance Head", year: "2nd Year", major: "BSCS", social: { email: "krpacanan@mcm.edu.ph" } },
  { id: 6, name: "Franz Roñelle Orcasitas", role: "Auditor", year: "2nd Year", major: "BSCS", social: { email: "frhOrcasitas@mcm.edu.ph" } },
  { id: 7, name: "Zian Wayne G. Matunding", role: "Logistics Head", year: "2nd Year", major: "BSIS", social: { email: "zwMatunding@mcm.edu.ph" } },
  { id: 8, name: "Vhone Nathaniel C. Uy", role: "Public Relations Head", year: "2nd Year", major: "BSCS", social: { email: "vnuy@mcm.edu.ph" } },
  { id: 9, name: "Matthew Danielle S. Jariol", role: "Technical Head", year: "2nd Year", major: "BSIS", social: { email: "mdjariol@mcm.edu.ph" } },
  { id: 10, name: "Bayani H. Elviña Jr.", role: "Production Head", year: "2nd Year", major: "BSEMC", social: { email: "belvina@mcm.edu.ph" } },
  { id: 11, name: "Myca Joanne M. Faeldonia", role: "Creatives Head", year: "2nd Year", major: "BSCS", social: { email: "mjFaeldonia@mcm.edu.ph" } },
  { id: 12, name: "Danilo Eslawan Jr.", role: "Project Development Head", year: "2nd Year", major: "BSCS", social: { email: "deslawan@mcm.edu.ph" } },
  { id: 13, name: "Urri Jehan Karlo T. Tomas", role: "Community Engagement Head", year: "2nd Year", major: "BSCS", social: { email: "ujkTomas@mcm.edu.ph" } },
  { id: 14, name: "Antonio P. De Jesus", role: "Documentation Head", year: "2nd Year", major: "BSCS", social: { email: "adejesus@mcm.edu.ph" } },
  { id: 15, name: "Jose P. Anuada Jr.", role: "Academic Affairs Head", year: "2nd Year", major: "BSCS", social: { email: "jpanuada@mcm.edu.ph" } }
];

/** Auto-advance carousel to next officer every 5s when not paused (e.g. hover) */
const AUTO_ROTATE_INTERVAL_MS = 5000;

const SEMI_CIRCLE_SLOTS = [-2, -1, 0, 1, 2] as const;

type SlotStyle = { left: string; top: string; rotate: number; scale: number; opacity: number; zIndex: number; pointerEvents?: 'none' | 'auto' };

const SLOT_STYLES_DESKTOP: Record<number, SlotStyle> = {
  [-2]: { left: '12%', top: '60%', rotate: -22, scale: 0.82, opacity: 0.7, zIndex: 0 },
  [-1]: { left: '24%', top: '42%', rotate: -11, scale: 0.95, opacity: 1, zIndex: 1 },
  [0]: { left: '50%', top: '24%', rotate: 0, scale: 1, opacity: 1, zIndex: 2 },
  [1]: { left: '76%', top: '42%', rotate: 11, scale: 0.95, opacity: 1, zIndex: 1 },
  [2]: { left: '88%', top: '60%', rotate: 22, scale: 0.82, opacity: 0.7, zIndex: 0 },
};

const SLOT_STYLES_MOBILE_WINGS: Record<number, SlotStyle> = {
  [-2]: { left: '12%', top: '80%', rotate: -20, scale: 0.8, opacity: 0, zIndex: 0, pointerEvents: 'none' },
  [-1]: { left: '28%', top: '50%', rotate: -10, scale: 0.8, opacity: 0, zIndex: 0, pointerEvents: 'none' },
  [0]: { left: '50%', top: '28%', rotate: 0, scale: 1, opacity: 1, zIndex: 10 },
  [1]: { left: '72%', top: '50%', rotate: 10, scale: 0.8, opacity: 0, zIndex: 0, pointerEvents: 'none' },
  [2]: { left: '88%', top: '80%', rotate: 20, scale: 0.8, opacity: 0, zIndex: 0, pointerEvents: 'none' },
};

function getSlotStyle(slot: number, isMobile: boolean): SlotStyle {
  if (!isMobile) return SLOT_STYLES_DESKTOP[slot as keyof typeof SLOT_STYLES_DESKTOP];
  return SLOT_STYLES_MOBILE_WINGS[slot as keyof typeof SLOT_STYLES_MOBILE_WINGS];
}

function OfficerCardContent({
  officer,
  isCenter,
  isMobile,
}: {
  officer: (typeof officers)[0];
  isCenter: boolean;
  isMobile: boolean;
}) {
  const showDetails = isCenter || !isMobile;

  return (
    <div className="relative z-10 flex flex-col items-center text-center w-full min-w-0">
      <h3 className="font-['Nasalization',sans-serif] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-2 break-words line-clamp-2">
        {officer.name}
      </h3>
      {showDetails && (
        <div className="mb-4 space-y-0.5">
          <p className="text-body-apple text-[#b8b4c9] leading-relaxed">
            {officer.year} | {officer.major}
          </p>
          {officer.social?.email && (
            <p className="text-body-apple text-[#b8b4c9] leading-relaxed">
              <a href={`mailto:${officer.social.email}`} data-officer-email className="cursor-text" style={{ color: '#a89cc8' }} onClick={(e) => e.stopPropagation()}>
                {officer.social.email}
              </a>
            </p>
          )}
        </div>
      )}
      {showDetails && <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(139,126,230,0.3)] to-transparent" />}
      <p className="text-body-apple font-medium leading-relaxed mt-3" data-officer-role style={{ color: '#8b7ee6' }}>
        {officer.role}
      </p>
    </div>
  );
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

/** Index of the president so the carousel opens with the president centered on first load */
const PRESIDENT_INITIAL_INDEX = Math.max(
  0,
  officers.findIndex((o) => o.isPresident === true)
);

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(PRESIDENT_INITIAL_INDEX);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();

  const nextOfficer = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % officers.length);
  }, []);

  const prevOfficer = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + officers.length) % officers.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextOfficer, AUTO_ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused, nextOfficer]);

  const handleUserInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
    handleUserInteraction();
  };

  return (
    <section id="team" className="relative overflow-visible bg-[#1a1d2e] pt-24 md:pt-48 pb-0">
      <style>{`
        #team .card-standard {
          background: #1a1d2e !important;
          border: 1px solid rgba(139,126,230,0.12) !important;
        }
        #team .card-standard::before {
          display: none !important;
        }
        #team .card-standard.card-spotlight {
          border-color: transparent !important;
        }
        @property --spotlight-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        #team .spotlight-border {
          --spotlight-angle: 0deg;
          background: conic-gradient(
            from var(--spotlight-angle),
            #8b7ee6,
            #a89cc8,
            #6b5b95,
            #b8a8e8,
            #8b7ee6
          );
          animation: spotlight-spin 4s linear infinite;
        }
        @keyframes spotlight-spin {
          to {
            --spotlight-angle: 360deg;
          }
        }
        #team .card-standard [data-officer-role] {
          color: #8b7ee6 !important;
        }
        #team .card-standard [data-officer-email] {
          color: #a89cc8 !important;
        }
      `}</style>
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="inline-flex items-center mb-2 md:mb-4 w-full justify-center md:justify-start">
          <div className="relative px-2 py-1 md:px-3 md:py-1.5">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-l border-[#8b7ee6]" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-r border-[#8b7ee6]" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-l border-[#8b7ee6]" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-r border-[#8b7ee6]" />
            <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-[0.02em] text-white cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>
              <HyperText as="span" startOnView>TEAM</HyperText>
            </h2>
          </div>
        </div>

        <h3 className="font-['Nasalization',sans-serif] font-normal uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] text-white mb-2 md:mb-4 pb-4 md:pb-6 cursor-default text-center md:text-left">
          Meet the Officers
        </h3>

        <div className="relative pt-2 md:pt-4 pb-4 overflow-visible">
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 md:h-40 z-[5]"
            style={{
              background: 'linear-gradient(to top, #1a1d2e 0%, rgba(26,29,46,0.85) 35%, transparent 100%)',
            }}
            aria-hidden
          />
          <div
            className={`relative w-full max-w-6xl mx-auto overflow-visible ${isMobile ? 'min-h-[520px]' : 'min-h-[540px] md:min-h-[640px]'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {SEMI_CIRCLE_SLOTS.map((slot) => {
              const index = (activeIndex + slot + officers.length) % officers.length;
              const officer = officers[index];
              const style = getSlotStyle(slot, isMobile);
              const isCenter = slot === 0;

              const cardWidthClass = isCenter
                ? (isMobile ? 'w-[90vw] max-w-[90vw]' : 'max-w-[550px] w-full')
                : (isMobile ? 'w-[90vw] max-w-[90vw]' : 'w-[280px] md:w-[340px]');

              return (
                <motion.div
                  key={officer.id}
                  className={`absolute origin-center ${style.pointerEvents === 'none' ? 'pointer-events-none' : 'cursor-pointer'} ${cardWidthClass}`}
                  initial={false}
                  animate={{
                    left: style.left,
                    top: style.top,
                    x: '-50%',
                    y: '-50%',
                    rotate: style.rotate,
                    scale: style.scale,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={isMobile ? CAROUSEL_TRANSITION_MOBILE : CAROUSEL_TRANSITION_DESKTOP}
                  style={{ willChange: 'transform' as const, ...(style.pointerEvents ? { pointerEvents: style.pointerEvents } : {}) }}
                  onClick={() => !isCenter && goToIndex(index)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isCenter) {
                      e.preventDefault();
                      goToIndex(index);
                    }
                  }}
                  role={isCenter ? undefined : 'button'}
                  tabIndex={isCenter ? -1 : 0}
                  aria-label={isCenter ? undefined : `View ${officer.name}, ${officer.role}`}
                >
                  {isCenter ? (
                    <div className="spotlight-border w-full rounded-2xl p-[2px]">
                      <div className="card-standard card-spotlight w-full rounded-[14px] p-5 md:p-8 shadow-[0_0_24px_rgba(139,126,230,0.15)]">
                        <OfficerCardContent officer={officer} isCenter={isCenter} isMobile={isMobile} />
                      </div>
                    </div>
                  ) : (
                    <div className={`card-standard w-full ${'p-4 md:p-5 hover:ring-1 hover:ring-[rgba(139,126,230,0.2)]'}`}>
                      <OfficerCardContent officer={officer} isCenter={isCenter} isMobile={isMobile} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            <div
              className="absolute left-1/2 top-[62%] md:top-[56%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3"
              aria-hidden
            >
              <button
                type="button"
                onClick={() => { prevOfficer(); handleUserInteraction(); }}
                className="w-12 h-12 md:w-10 md:h-10 rounded-full inline-flex items-center justify-center bg-gradient-to-br from-[#6b5b95] to-[#8b7ee6] text-white border border-[rgba(168,156,200,0.2)] shadow-[0_2px_6px_rgba(124,111,214,0.2)] cursor-pointer transition-all duration-300 hover:brightness-[1.08] hover:shadow-[0_3px_8px_rgba(124,111,214,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)]"
                aria-label="Previous officer"
              >
                <ChevronLeft className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => { nextOfficer(); handleUserInteraction(); }}
                className="w-12 h-12 md:w-10 md:h-10 rounded-full inline-flex items-center justify-center bg-gradient-to-br from-[#6b5b95] to-[#8b7ee6] text-white border border-[rgba(168,156,200,0.2)] shadow-[0_2px_6px_rgba(124,111,214,0.2)] cursor-pointer transition-all duration-300 hover:brightness-[1.08] hover:shadow-[0_3px_8px_rgba(124,111,214,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)]"
                aria-label="Next officer"
              >
                <ChevronRight className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
