import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HoverBorderGradient } from '../ui/hover-border-gradient';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /** Close mobile menu on route/location change */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /**
   * Scroll to a section on the home page
   * Scrolls to section (navbar is absolute, no offset needed)
   */
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSectionElement(sectionId), 300);
    } else {
      scrollToSectionElement(sectionId);
    }
  };

  /**
   * Helper function to actually scroll to the section element.
   * Navbar is absolute (scrolls with page), so no offset needed.
   */
  const scrollToSectionElement = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'what-is-css' },
    { label: 'Team', sectionId: 'team' },
    { label: 'Gallery', sectionId: 'gallery' },
  ];


  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.pathname !== '/') navigate('/');
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className="
        absolute top-0 left-0 right-0 w-full z-[1000]
        bg-[rgba(26,29,46,0.85)]
        backdrop-blur-[24px]
        border-b border-[rgba(255,255,255,0.06)]
        h-[72px]
        flex items-center
        transition-all duration-300
      "
      style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 flex items-center justify-between relative z-10">
        <div className="flex items-center flex-shrink-0 w-1/3 justify-start">
          <button
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)] rounded-lg"
          >
            <img
              src="/assets/icons/logo.svg"
              alt="Computing Students' Society"
              className="h-10 w-auto"
            />
          </button>
        </div>

        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 w-1/3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.sectionId)}
              className="
                font-[var(--font-sans)] font-medium text-[1rem] leading-none tracking-[0.01em]
                text-[#b8b4c9]
                cursor-pointer
                px-2 py-2
                transition-colors duration-200 ease-out
                hover:text-white
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end w-1/3">
          <HoverBorderGradient
            as="button"
            containerClassName="rounded-full"
            className="bg-[#1a1d2e] flex items-center gap-2 px-5 py-2 font-['Nasalization',sans-serif] font-normal text-base tracking-[0.01em] text-white cursor-pointer"
            onClick={() => scrollToSection('contact')}
          >
            GET IN TOUCH
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </HoverBorderGradient>
        </div>

        <div className="md:hidden relative flex flex-col cursor-pointer p-2 group" onClick={toggleMenu}>
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2 bg-[#8b7ee6]' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-[#8b7ee6]' : ''}`}></span>
        </div>
      </div>

      <div className={`
        md:hidden
        absolute top-[72px] left-0 right-0
        bg-[rgba(26,29,46,0.95)]
        backdrop-blur-[24px]
        border-b border-[rgba(255,255,255,0.06)]
        px-4 py-4
        transition-all duration-200 ease-out
        ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible pointer-events-none'}
      `}>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                handleNavClick(item.sectionId);
                toggleMenu();
              }}
              className="block w-full text-left font-[var(--font-sans)] font-medium text-base text-[#b8b4c9] py-3 px-4 cursor-pointer transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 mt-2 border-t border-[rgba(255,255,255,0.06)] flex justify-center">
            <HoverBorderGradient
              as="button"
              containerClassName="rounded-full"
              className="bg-[#1a1d2e] flex items-center justify-center gap-2 px-5 py-2 font-['Nasalization',sans-serif] font-normal text-base text-white cursor-pointer"
              onClick={() => { scrollToSection('contact'); toggleMenu(); }}
            >
              GET IN TOUCH
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
