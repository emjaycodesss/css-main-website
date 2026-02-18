import React, { useState, useEffect } from 'react';
import { Cookie, X, Eye } from 'lucide-react';
import { Button } from './ui/button';

/**
 * CookieConsent component - Apple-inspired typography
 */
const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [eyePosition, setEyePosition] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cookieRect = document.querySelector('.cookie-eyes')?.getBoundingClientRect();
      if (cookieRect) {
        const centerX = cookieRect.left + cookieRect.width / 2;
        const deltaX = e.clientX - centerX;
        const distance = Math.abs(deltaX);
        const maxDistance = 8;
        const factor = Math.min(distance, maxDistance) / distance;
        
        setEyePosition({
          left: (deltaX * factor) / 2,
          right: (deltaX * factor) / 2
        });
      }
    };

    if (isVisible) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="max-w-sm">
        <div className="
          bg-[rgba(37,40,55,0.95)] backdrop-blur-[8px]
          border border-[rgba(168,156,200,0.15)]
          shadow-[0_8px_24px_rgba(30,26,61,0.5)]
          rounded-[16px] 
          p-5
          relative overflow-hidden
        ">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-[8px] text-[#b8b4c9] cursor-pointer transition-colors duration-150 hover:text-white hover:bg-[rgba(168,156,200,0.1)] focus:outline-none z-20"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
          
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="
                  cookie-eyes relative 
                  w-12 h-12 
                  bg-gradient-to-br from-[#8b7ee6] to-[#6b5b95]
                  rounded-full 
                  flex items-center justify-center 
                  shadow-[0_2px_6px_rgba(124,111,214,0.25)]
                  border-2 border-[rgba(181,168,212,0.25)]
                  cursor-default
                ">
                  <div 
                    className="absolute w-2 h-2 bg-[#1a1d2e] rounded-full transition-all duration-150 ease-out"
                    style={{
                      left: `calc(50% - 6px + ${eyePosition.left}px)`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  <div 
                    className="absolute w-2 h-2 bg-[#1a1d2e] rounded-full transition-all duration-150 ease-out"
                    style={{
                      left: `calc(50% + 6px + ${eyePosition.right}px)`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  <Cookie className="w-5 h-5 text-[rgba(26,29,46,0.2)] absolute" strokeWidth={2} />
                </div>
              </div>
              
              <div className="flex-1 cursor-default">
                <h3 className="font-[var(--font-sans)] font-semibold text-base tracking-[-0.005em] text-white flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#8b7ee6]" strokeWidth={2} />
                  We Use Cookies
                </h3>
              </div>
            </div>

            <p className="font-[var(--font-sans)] font-normal text-sm leading-relaxed text-[#b8b4c9] cursor-default">
              We use cookies to enhance your browsing experience and analyze our traffic.
            </p>

            <div className="flex gap-3">
              <Button onClick={handleAccept} variant="primary" size="sm" className="flex-1 gap-2">
                <Cookie className="h-3.5 w-3.5" strokeWidth={2} />
                Accept
              </Button>
              <Button onClick={handleDecline} variant="outline" size="sm" className="flex-1">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
