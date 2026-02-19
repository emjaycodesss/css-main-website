import React, { useState } from 'react';
import { Github, Facebook, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/** Discord icon SVG - Lucide doesn't include Discord */
const DiscordIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

/**
 * Developer information interface
 */
interface Developer {
  id: number;
  name: string;
  role: string;
  year: string;
  major: string;
  github?: string;
  email?: string;
}

/**
 * Developers data - CSS Project Development Team
 */
const developers: Developer[] = [
  {
    id: 1,
    name: "Danilo Eslawan",
    role: "Project Development Head",
    year: "2nd Year",
    major: "BSCS",
    github: "danengine",
    email: "deslawan@mcm.edu.ph"
  },
  {
    id: 2,
    name: "Myca Faeldonia",
    role: "Creatives Head",
    year: "2nd Year",
    major: "BSCS",
    github: "emjaycodesss",
    email: "mjFaeldonia@mcm.edu.ph"
  }
];

/**
 * Developer Modal Component
 * Displays information about the developers behind the project.
 * Design matches site system: #1a1d2e bg, Nasalization title, gradient divider, card-standard-style cards.
 */
const DeveloperModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1d2e]/80 p-3 backdrop-blur-[8px] sm:p-4"
      style={{ paddingLeft: 'max(12px, env(safe-area-inset-left))', paddingRight: 'max(12px, env(safe-area-inset-right))' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] min-h-0 overflow-y-auto overflow-x-hidden rounded-xl border border-[rgba(139,126,230,0.12)] bg-[#1a1d2e] shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          .dev-modal-card {
            background: #1a1d2e !important;
            border: 1px solid rgba(139,126,230,0.12) !important;
            border-radius: 16px;
          }
          .dev-modal-card .dev-role { color: #8b7ee6 !important; }
          .dev-modal-social:hover { color: #9388C4 !important; }
        `}</style>

        <div className="flex items-center justify-between gap-3 p-4 pb-3 sticky top-0 z-10 min-w-0 border-b border-transparent bg-[#1a1d2e] sm:gap-4 sm:p-6 sm:pb-4">
          <div className="min-w-0 cursor-default">
            <h2 className="font-['Nasalization',sans-serif] mb-2 cursor-default font-normal uppercase leading-[0.95] tracking-[-0.02em] text-white text-[clamp(1.25rem,4vw,3rem)] sm:text-[clamp(1.75rem,4vw,3rem)]">
              Development Team
            </h2>
            <p className="font-[var(--font-sans)] cursor-default text-sm leading-relaxed text-[#b8b4c9] sm:text-base md:text-lg lg:text-xl">Meet the developers behind this project</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 touch-manipulation rounded-xl p-2 text-[#8b7ee6] cursor-pointer transition-colors duration-200 hover:text-[#b5a8d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)]"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mx-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(139,126,230,0.3)] to-transparent" />

        <div className="p-4 pt-4 sm:p-6 sm:pt-6">
          <div className="grid grid-cols-1 gap-3 min-w-0 md:grid-cols-2 md:gap-4">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="dev-modal-card p-6 cursor-default transition-all duration-300 hover:border-[rgba(139,126,230,0.2)]"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-['Nasalization',sans-serif] font-normal text-2xl md:text-3xl tracking-[-0.005em] text-white mb-2">
                      {developer.name}
                    </h3>
                    <p className="dev-role font-[var(--font-sans)] font-medium text-base md:text-lg mb-2">
                      {developer.role}
                    </p>
                    <div className="flex items-center gap-2 text-sm md:text-base text-[#b8b4c9]">
                      <span>{developer.year}</span>
                      <span className="text-[rgba(168,156,200,0.4)]">•</span>
                      <span>{developer.major}</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(139,126,230,0.3)] to-transparent" />

                  <div className="flex gap-2 pt-1">
                    {developer.github && (
                      <a
                        href={`https://github.com/${developer.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dev-modal-social w-9 h-9 rounded-lg bg-[rgba(30,32,50,0.9)] border border-[rgba(168,156,200,0.15)] flex items-center justify-center text-[#b5a8d4] transition-all duration-300 cursor-pointer hover:scale-105"
                        title="GitHub"
                      >
                        <Github className="w-[18px] h-[18px]" strokeWidth={2} />
                      </a>
                    )}
                    {developer.email && (
                      <a
                        href={`mailto:${developer.email}`}
                        className="dev-modal-social w-9 h-9 rounded-lg bg-[rgba(30,32,50,0.9)] border border-[rgba(168,156,200,0.15)] flex items-center justify-center text-[#b5a8d4] transition-all duration-300 cursor-pointer hover:scale-105"
                        title="Email"
                      >
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Footer component props
 */
interface FooterProps {
  /** If true, renders a minimal footer (just copyright) */
  minimal?: boolean;
}

/**
 * Footer component - Enhanced with developer information
 * 
 * @param minimal - If true, shows only copyright line
 */
const Footer: React.FC<FooterProps> = ({ minimal = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Minimal footer for auth pages (hooks must be called before any early return)
  // Uses design-system container so padding/margins never exceed page layout
  if (minimal) {
    return (
      <footer className="w-full overflow-x-hidden border-t border-[rgba(168,156,200,0.08)] rounded-b-2xl">
        <div className="container-responsive w-full py-4">
          <p className="font-[var(--font-sans)] font-normal text-xs text-[rgba(184,180,201,0.5)] text-center cursor-default">
            © {new Date().getFullYear()} Computing Students' Society. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  /**
   * Scroll to a section on the home page
   */
  const scrollToSection = (sectionId: string) => {
    const scrollToElement = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  // Full footer - Enhanced with angled top edge
  return (
    <>
      <style>{`
        .footer-pages-link {
          font-family: var(--font-sans);
          font-weight: var(--weight-body);
          font-size: var(--text-body);
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: #b8b4c9;
          transition: color 0.2s ease;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .footer-pages-link:hover {
          color: #9388C4 !important;
        }
        .footer-icon-link {
          color: #b8b4c9;
          transition: color 0.2s ease;
        }
        .footer-icon-link:hover {
          color: #9388C4 !important;
        }
      `}</style>
      {/* Mobile-first, responsive footer: respects design-system container padding so content never exceeds page margins */}
      <footer
        className="relative w-full min-w-0 overflow-x-hidden overflow-y-visible bg-[#1a1d2e] pt-6 pb-6 min-h-0 sm:pt-8 sm:pb-8 md:pt-10 md:pb-10 lg:pt-16 lg:pb-12 lg:min-h-[420px]"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(165deg, #000000 0%, #0a0910 40%, rgba(147,136,196,0.2) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.4]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'><filter id=\'footer-noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23footer-noise)\'/></svg>")',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Design-system container: same max-width and horizontal padding as rest of site — no overflow past page margins */}
        <div className="container-responsive relative z-10 w-full min-w-0">
          {/* Mobile: single column; lg: 12-col grid. min-w-0 on grid prevents flex/grid blowout. */}
          <div className="grid grid-cols-1 gap-3 gap-y-5 min-w-0 sm:gap-4 sm:gap-y-6 md:gap-5 lg:grid-cols-12 lg:gap-6 lg:gap-y-0">
            {/* Logo + tagline block: full width on mobile, lg = 4 cols. min-w-0 allows text to shrink/wrap. */}
            <div className="flex min-w-0 flex-col items-start border border-[rgba(168,156,200,0.2)] rounded-xl p-3 sm:rounded-2xl sm:p-4 md:p-5 lg:col-span-4 lg:p-6">
              <div className="flex min-w-0 flex-col items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-left">
                <img src="/assets/icons/logo.svg" alt="CSS Logo" className="h-12 w-auto shrink-0 sm:h-14 md:h-16 lg:h-20 cursor-default" />
                <p className="font-[var(--font-sans)] min-w-0 text-[length:var(--text-subhead)] sm:text-sm md:text-base text-[rgba(184,180,201,0.9)] leading-relaxed text-left cursor-default">
                  A Diverse Collective Shaping the Global Technological Landscape of Tomorrow
                </p>
              </div>
            </div>

            {/* Right column: pages, copyright/socials, made-with. Full width on mobile. */}
            <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:col-span-8">
              {/* PAGES: stacked on mobile, row on sm+; nav can wrap without overflowing */}
              <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-[rgba(168,156,200,0.2)] p-3 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:gap-4 sm:p-4 md:p-5 lg:p-6">
                <h3 className="font-['Nasalization',sans-serif] shrink-0 cursor-default text-xs font-semibold uppercase tracking-wide text-white sm:text-sm md:text-base">
                  PAGES
                </h3>
                <nav className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 sm:gap-x-6 sm:gap-y-2" aria-label="Footer pages">
                  <button type="button" onClick={() => scrollToSection('home')} className="footer-pages-link flex min-h-[44px] min-w-0 items-center text-left text-xs uppercase cursor-pointer sm:min-h-0 sm:text-sm md:text-base">Home</button>
                  <button type="button" onClick={() => scrollToSection('what-is-css')} className="footer-pages-link flex min-h-[44px] min-w-0 items-center text-left text-xs uppercase cursor-pointer sm:min-h-0 sm:text-sm md:text-base">About</button>
                  <button type="button" onClick={() => scrollToSection('team')} className="footer-pages-link flex min-h-[44px] min-w-0 items-center text-left text-xs uppercase cursor-pointer sm:min-h-0 sm:text-sm md:text-base">Team</button>
                  <button type="button" onClick={() => scrollToSection('gallery')} className="footer-pages-link flex min-h-[44px] min-w-0 items-center text-left text-xs uppercase cursor-pointer sm:min-h-0 sm:text-sm md:text-base">Gallery</button>
                </nav>
              </div>

              {/* Copyright + socials: mobile = copyright full-width then 3 icons in one row; sm+ = single row */}
              <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[7fr_1fr_1fr_1fr]">
                <div className="flex min-h-[3rem] min-w-0 flex-wrap items-center justify-center gap-2 rounded-xl border border-[rgba(168,156,200,0.2)] p-3 sm:min-h-[3.5rem] sm:justify-between sm:rounded-2xl sm:p-4 md:min-h-[4rem] md:p-5 lg:p-6">
                  <span className="font-['Nasalization',sans-serif] shrink-0 cursor-default text-xs text-white sm:text-sm md:text-base">{new Date().getFullYear()}</span>
                  <span className="min-w-0 cursor-default text-center text-xs text-[rgba(184,180,201,0.8)] sm:text-left sm:text-sm md:text-base">
                    Copyright © CSS
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 min-w-0 sm:contents">
                  <a
                    href="https://github.com/css-mmcm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon-link flex min-h-[3rem] min-w-0 items-center justify-center rounded-xl border border-[rgba(168,156,200,0.2)] p-3 transition-all cursor-pointer touch-manipulation sm:min-h-[4rem] sm:rounded-2xl sm:p-4 md:p-5 lg:p-6"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2} />
                  </a>
                  <a
                    href="https://www.facebook.com/CSS.MMCM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon-link flex min-h-[3rem] min-w-0 items-center justify-center rounded-xl border border-[rgba(168,156,200,0.2)] p-3 transition-all cursor-pointer touch-manipulation sm:min-h-[4rem] sm:rounded-2xl sm:p-4 md:p-5 lg:p-6"
                    title="Facebook"
                  >
                    <Facebook className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2} />
                  </a>
                  <a
                    href="https://discord.gg/XUxWQ2xNWJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon-link flex min-h-[3rem] min-w-0 items-center justify-center rounded-xl border border-[rgba(168,156,200,0.2)] p-3 transition-all cursor-pointer touch-manipulation sm:min-h-[4rem] sm:rounded-2xl sm:p-4 md:p-5 lg:p-6"
                    title="Discord"
                  >
                    <DiscordIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" size={24} />
                  </a>
                </div>
              </div>

              {/* Made with: centered, single row */}
              <div className="flex items-center justify-center rounded-xl border border-[rgba(168,156,200,0.2)] p-3 sm:rounded-2xl sm:p-4 md:p-5 lg:p-6">
                <div className="flex flex-nowrap items-center justify-center gap-1.5 text-center sm:gap-2">
                  <span className="shrink-0 cursor-default text-xs text-[rgba(184,180,201,0.8)] sm:text-sm md:text-base">Made with</span>
                  <span className="shrink-0 text-[#9388C4]">💜</span>
                  <span className="shrink-0 cursor-default text-xs text-[rgba(184,180,201,0.8)] sm:text-sm md:text-base">by</span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 whitespace-nowrap py-1 text-xs text-[#8b7ee6] hover:text-[#b5a8d4] transition-colors cursor-pointer hover:underline touch-manipulation min-h-[44px] sm:text-sm md:text-base"
                  >
                    CSS Project Development Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </footer>

      <DeveloperModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
