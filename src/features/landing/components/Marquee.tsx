import React from 'react';

/** Destination URL for the marquee CTA (opens in new tab) */
const MARQUEE_LINK_URL = 'https://www.facebook.com/share/p/1GLx9BeSAG/';

const MARQUEE_TEXT = 'CCIS WEEK 2026 IS ON THE HORIZON';
const SEPARATOR = ' // ';

const MARQUEE_UNIT = `${MARQUEE_TEXT}${SEPARATOR}`;

const REPEAT_COUNT = 15;

const MARQUEE_DURATION_S = 55;

const Marquee: React.FC = () => {
  const blockContent = Array(REPEAT_COUNT).fill(MARQUEE_UNIT).join('');

  const textStyle: React.CSSProperties = {
    fontFamily: "'Nasalization', 'Impact', 'Arial Black', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
    letterSpacing: '0.02em',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <a
      className="marquee-bar"
      href={MARQUEE_LINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="CCIS Week 2026 is on the horizon — open event link in new tab"
      style={{
        position: 'absolute',
        top: 'var(--navbar-height, 72px)',
        left: 0,
        right: 0,
        width: '100%',
        height: '56px',
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 999,
        cursor: 'pointer',
        textDecoration: 'none',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animation: `marquee-scroll ${MARQUEE_DURATION_S}s linear infinite`,
        }}
      >
        <span className="marquee-text" style={textStyle}>
          {blockContent}
        </span>
        <span className="marquee-text" style={textStyle}>
          {blockContent}
        </span>
      </div>
    </a>
  );
};

export default Marquee;
