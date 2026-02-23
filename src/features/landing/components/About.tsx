import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GlowingEffect } from '../../../shared/components/ui/glowing-effect';
import { HyperText } from '../../../shared/components/ui/hyper-text';

const About: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <section id="about" className="relative overflow-hidden bg-[#1a1d2e] pt-40 md:pt-48 pb-16 md:pb-24">
      <style>{`
        #about .card-standard {
          background: #1a1d2e !important;
          border: 1px solid rgba(139,126,230,0.12) !important;
        }
        #about .card-standard::before {
          display: none !important;
        }
      `}</style>
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-10 xl:gap-12 items-start">
          <div className="order-2 lg:order-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">

          <div className="md:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

              <div>
                <div className="card-standard p-3 md:p-4 h-full flex flex-col relative overflow-hidden group">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-3 h-32 md:h-36 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="calendarFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.25)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.15)" />
                      </linearGradient>
                      <linearGradient id="calendarSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(107,91,149,0.8)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.6)" />
                      </linearGradient>
                      <linearGradient id="calendarTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b7ee6" />
                        <stop offset="100%" stopColor="#6b5b95" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(150, 100)" className="group-hover:translate-y-[-3px] transition-transform duration-500">

                      <ellipse cx="0" cy="68" rx="75" ry="14" fill="rgba(0,0,0,0.3)" opacity="0.5" />

                      <g>
                        <path d="M-65,-45 L-70,-40 L-70,50 L-65,55 Z" fill="rgba(26,29,46,0.9)" />

                        <path d="M-65,-45 L65,-45 L70,-40 L-70,-40 Z" fill="url(#calendarTop)" />

                        <path d="M65,-45 L70,-40 L70,50 L65,55 Z" fill="url(#calendarSide)" />

                        <path d="M-65,-45 L65,-45 L65,55 L-65,55 Z" fill="url(#calendarFront)" stroke="rgba(139,126,230,0.4)" strokeWidth="1.5" />

                        <path d="M-65,-45 L65,-45 L65,-25 L-65,-25 Z" fill="rgba(107,91,149,0.6)" />
                        <path d="M65,-45 L70,-40 L70,-20 L65,-25 Z" fill="rgba(61,63,85,0.8)" />

                        <line x1="-60" y1="-15" x2="60" y2="-15" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-60" y1="-3" x2="60" y2="-3" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-60" y1="9" x2="60" y2="9" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-60" y1="21" x2="60" y2="21" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-60" y1="33" x2="60" y2="33" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-60" y1="45" x2="60" y2="45" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />

                        <line x1="-45" y1="-20" x2="-45" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-27" y1="-20" x2="-27" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="-9" y1="-20" x2="-9" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="9" y1="-20" x2="9" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="27" y1="-20" x2="27" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />
                        <line x1="45" y1="-20" x2="45" y2="50" stroke="rgba(139,126,230,0.25)" strokeWidth="0.8" />

                        <text x="-52" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">1</text>
                        <text x="-34" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">2</text>
                        <text x="-16" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">3</text>
                        <text x="2" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">4</text>
                        <text x="20" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">5</text>
                        <text x="38" y="-8" fill="rgba(139,126,230,0.5)" fontSize="7" fontWeight="600">6</text>

                        <g transform="translate(-35, 5)" className="group-hover:translate-y-[-2px] transition-transform duration-300">
                          <ellipse cx="0" cy="10" rx="4" ry="2" fill="rgba(0,0,0,0.25)" />
                          <circle cx="0" cy="-6" r="3.5" fill="#a78bfa" />
                          <path d="M0,-2.5 L0,8" stroke="#8b7ee6" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="0" cy="-6" r="1.5" fill="#8b7ee6" />
                        </g>

                        <g transform="translate(0, 15)" className="group-hover:translate-y-[-3px] transition-transform duration-300 delay-100">
                          <ellipse cx="0" cy="10" rx="4" ry="2" fill="rgba(0,0,0,0.25)" />
                          <circle cx="0" cy="-6" r="3.5" fill="#a78bfa" />
                          <path d="M0,-2.5 L0,8" stroke="#8b7ee6" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="0" cy="-6" r="1.5" fill="#8b7ee6" />
                        </g>

                        <g transform="translate(40, 25)" className="group-hover:translate-y-[-2px] transition-transform duration-300 delay-200">
                          <ellipse cx="0" cy="10" rx="4" ry="2" fill="rgba(0,0,0,0.25)" />
                          <circle cx="0" cy="-6" r="3.5" fill="#a78bfa" />
                          <path d="M0,-2.5 L0,8" stroke="#8b7ee6" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="0" cy="-6" r="1.5" fill="#8b7ee6" />
                        </g>

                        <g transform="translate(-20, 38)" className="group-hover:translate-y-[-2px] transition-transform duration-300 delay-150">
                          <ellipse cx="0" cy="10" rx="4" ry="2" fill="rgba(0,0,0,0.25)" />
                          <circle cx="0" cy="-6" r="3.5" fill="#a78bfa" />
                          <path d="M0,-2.5 L0,8" stroke="#8b7ee6" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="0" cy="-6" r="1.5" fill="#8b7ee6" />
                        </g>

                        <g>
                          <ellipse cx="-45" cy="-40" rx="3.5" ry="2" fill="#2d2f45" />
                          <circle cx="-45" cy="-42" r="3" fill="#3d3f55" stroke="rgba(139,126,230,0.6)" strokeWidth="1" />

                          <ellipse cx="-15" cy="-40" rx="3.5" ry="2" fill="#2d2f45" />
                          <circle cx="-15" cy="-42" r="3" fill="#3d3f55" stroke="rgba(139,126,230,0.6)" strokeWidth="1" />

                          <ellipse cx="15" cy="-40" rx="3.5" ry="2" fill="#2d2f45" />
                          <circle cx="15" cy="-42" r="3" fill="#3d3f55" stroke="rgba(139,126,230,0.6)" strokeWidth="1" />

                          <ellipse cx="45" cy="-40" rx="3.5" ry="2" fill="#2d2f45" />
                          <circle cx="45" cy="-42" r="3" fill="#3d3f55" stroke="rgba(139,126,230,0.6)" strokeWidth="1" />
                        </g>

                        <path d="M-65,-45 L65,-45 L65,55 L-65,55 Z" fill="rgba(139,126,230,0.15)" opacity="0"
                              className="group-hover:opacity-100 transition-opacity duration-500" />
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 cursor-default">
                    Events & Activities
                  </h3>
                  <p className="text-body-apple text-[#b8b4c9] cursor-default leading-relaxed">
                    Workshops, hackathons, tech talks, and community gatherings year-round.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card-standard p-3 md:p-4 h-full flex flex-col relative overflow-hidden group">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-3 h-32 md:h-36 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <radialGradient id="nodeGlowCenter">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.8)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.2)" />
                      </radialGradient>
                      <linearGradient id="hexagonTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b7ee6" />
                        <stop offset="100%" stopColor="#6b5b95" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(150, 100)">
                      <g className="group-hover:opacity-100 transition-opacity duration-500" opacity="0.6">
                        <line x1="0" y1="0" x2="-70" y2="-40" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                        <line x1="0" y1="0" x2="70" y2="-40" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                        <line x1="0" y1="0" x2="-80" y2="35" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                        <line x1="0" y1="0" x2="80" y2="35" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                        <line x1="0" y1="0" x2="0" y2="70" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                        <line x1="0" y1="0" x2="0" y2="-70" stroke="rgba(139,126,230,0.5)" strokeWidth="2.5" strokeDasharray="3,3" />
                      </g>

                      <g transform="translate(0, -70)" className="group-hover:translate-y-[-2px] transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g transform="translate(-70, -40)" className="group-hover:scale-110 transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g transform="translate(70, -40)" className="group-hover:scale-110 transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g transform="translate(-80, 35)" className="group-hover:scale-110 transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g transform="translate(80, 35)" className="group-hover:scale-110 transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g transform="translate(0, 70)" className="group-hover:translate-y-[2px] transition-transform duration-300">
                        <ellipse cx="0" cy="18" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
                        <path d="M-10,-8 L0,-12 L10,-8 L10,2 L0,6 L-10,2 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.5" />
                        <path d="M-10,-8 L0,-12 L10,-8 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M10,-8 L10,2 L0,6 L0,-4 Z" fill="#3d3f55" />
                        <circle cx="0" cy="-2" r="3" fill="#a78bfa" />
                      </g>

                      <g className="group-hover:scale-110 transition-transform duration-500">
                        <ellipse cx="0" cy="30" rx="20" ry="6" fill="rgba(0,0,0,0.4)" />

                        <path d="M-18,-12 L0,-20 L18,-12 L18,4 L0,12 L-18,4 Z" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="2" />
                        <path d="M-18,-12 L0,-20 L18,-12 L0,-4 Z" fill="url(#hexagonTop)" />
                        <path d="M18,-12 L18,4 L0,12 L0,-4 Z" fill="#3d3f55" />

                        <circle cx="0" cy="-2" r="12" fill="url(#nodeGlowCenter)" opacity="0.8"
                                className="group-hover:opacity-100 transition-opacity duration-500" />
                        <circle cx="0" cy="-2" r="6" fill="#8b7ee6" />
                        <circle cx="0" cy="-2" r="4" fill="#a78bfa" />

                        <circle cx="0" cy="-2" r="24" fill="none" stroke="#8b7ee6" strokeWidth="1" opacity="0.2"
                                className="group-hover:opacity-30 transition-opacity duration-1000" />
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 cursor-default">
                    Networking
                  </h3>
                  <p className="text-body-apple text-[#b8b4c9] cursor-default leading-relaxed">
                    Connect with computing students from CS, IS, and EMC programs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card-standard p-3 md:p-4 h-full flex flex-col relative overflow-hidden group">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-3 h-32 md:h-36 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="browserTop" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.25)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.1)" />
                      </linearGradient>
                      <linearGradient id="browserSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2d2f45" />
                        <stop offset="100%" stopColor="#3d3f55" />
                      </linearGradient>
                      <linearGradient id="screenGlowCareer" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.2)" />
                        <stop offset="100%" stopColor="rgba(26,29,46,0.95)" />
                      </linearGradient>
                      <linearGradient id="briefcaseFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.4)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.2)" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(150, 100)" className="group-hover:translate-y-[-3px] transition-transform duration-500">
                      <ellipse cx="0" cy="60" rx="95" ry="18" fill="rgba(0,0,0,0.3)" opacity="0.5" />

                      <g>
                        <path d="M-85,-60 L-90,-55 L-90,35 L-85,40 Z" fill="#1a1d2e" />

                        <path d="M-85,-60 L85,-60 L90,-55 L-90,-55 Z" fill="url(#browserTop)" />

                        <path d="M85,-60 L90,-55 L90,35 L85,40 Z" fill="url(#browserSide)" />

                        <path d="M-85,-60 L85,-60 L85,40 L-85,40 Z" fill="#2d2f45" stroke="rgba(139,126,230,0.4)" strokeWidth="1.5" />

                        <rect x="-85" y="-60" width="170" height="18" fill="url(#browserTop)" />
                        <rect x="-85" y="-42" width="170" height="2" fill="rgba(139,126,230,0.3)" />

                        <rect x="-70" y="-52" width="100" height="8" fill="rgba(139,126,230,0.15)" rx="4" />
                        <rect x="-68" y="-50" width="30" height="4" fill="rgba(139,126,230,0.3)" rx="2" />

                        <clipPath id="screenClip">
                          <rect x="-77" y="-35" width="154" height="68" />
                        </clipPath>

                        <rect x="-77" y="-35" width="154" height="68" fill="url(#screenGlowCareer)" />

                        <g clipPath="url(#screenClip)" className="group-hover:translate-x-[2px] transition-transform duration-500">

                          <g transform="translate(-50, -15)">
                            <ellipse cx="18" cy="44" rx="18" ry="3" fill="rgba(0,0,0,0.25)" />

                            <path d="M0,0 L-2,2 L-2,40 L0,42 Z" fill="#1a1d2e" />
                            <path d="M0,0 L32,0 L32,40 L0,40 Z" fill="rgba(139,126,230,0.15)" stroke="#8b7ee6" strokeWidth="1.5" />
                            <path d="M32,0 L34,2 L34,42 L32,40 Z" fill="rgba(139,126,230,0.25)" />
                            <path d="M0,0 L32,0 L34,2 L-2,2 Z" fill="rgba(139,126,230,0.3)" />

                            <path d="M5,7 L27,7 L28,8 L6,8 Z" fill="#8b7ee6" opacity="0.7" />
                            <path d="M5,12 L27,12 L28,13 L6,13 Z" fill="#8b7ee6" opacity="0.5" />
                            <path d="M5,17 L22,17 L23,18 L6,18 Z" fill="#8b7ee6" opacity="0.5" />
                            <path d="M5,22 L27,22 L28,23 L6,23 Z" fill="#8b7ee6" opacity="0.5" />
                            <path d="M5,27 L20,27 L21,28 L6,28 Z" fill="#8b7ee6" opacity="0.5" />
                          </g>

                          <g transform="translate(28, 8)" className="group-hover:translate-y-[-2px] transition-transform duration-300">
                            <ellipse cx="5" cy="28" rx="16" ry="4" fill="rgba(0,0,0,0.25)" />

                            <path d="M-10,0 L-12,2 L-12,18 L-10,20 Z" fill="#1a1d2e" />
                            <path d="M-10,0 L18,0 L18,18 L-10,18 Z" fill="url(#briefcaseFront)" stroke="#8b7ee6" strokeWidth="1.5" />
                            <path d="M18,0 L20,2 L20,20 L18,18 Z" fill="rgba(139,126,230,0.25)" />
                            <path d="M-10,18 L18,18 L20,20 L-12,20 Z" fill="rgba(139,126,230,0.2)" />
                            <path d="M-10,0 L18,0 L20,2 L-12,2 Z" fill="rgba(139,126,230,0.35)" />

                            <g>
                              <path d="M0,-4 L-2,-2 L-2,0 L0,2 Z" fill="#2d2f45" />
                              <path d="M0,-4 L9,-4 L11,-2 L-2,-2 Z" fill="#8b7ee6" />
                              <path d="M9,-4 L11,-2 L11,2 L9,2 Z" fill="#6b5b95" />
                              <path d="M0,2 L9,2 L11,0 L-2,0 Z" fill="#3d3f55" />
                            </g>

                            <ellipse cx="4" cy="10" rx="2.5" ry="1.2" fill="#6b5b95" />
                            <circle cx="4" cy="9" r="2" fill="#a78bfa" stroke="#8b7ee6" strokeWidth="0.5" />

                            <rect x="2.5" y="8" width="3" height="2.5" fill="rgba(139,126,230,0.3)" rx="0.4" />
                          </g>

                          <g className="group-hover:scale-110 transition-transform duration-500">
                            <g transform="translate(15, -22)">
                              <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#a78bfa" opacity="0.9" />
                              <path d="M0,-5 L1.2,-1.2 L1.6,-1.6 L0.4,-5.4 Z" fill="#8b7ee6" opacity="0.5" />
                            </g>

                            <g transform="translate(50, -12)">
                              <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#8b7ee6" opacity="0.7" />
                              <path d="M0,-4 L1,-1 L1.3,-1.3 L0.3,-4.3 Z" fill="#a78bfa" opacity="0.4" />
                            </g>

                            <g transform="translate(38, 18)">
                              <path d="M0,-3 L0.8,-0.8 L3,0 L0.8,0.8 L0,3 L-0.8,0.8 L-3,0 L-0.8,-0.8 Z" fill="#a78bfa" opacity="0.8" />
                              <path d="M0,-3 L0.8,-0.8 L1.1,-1.1 L0.3,-3.3 Z" fill="#8b7ee6" opacity="0.4" />
                            </g>
                          </g>
                        </g>

                        <path d="M-75,-33 L-55,-33 L-55,-15 L-75,-20 Z" fill="white" opacity="0.04" />
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 cursor-default">
                    Career Opportunities
                  </h3>
                  <p className="text-body-apple text-[#b8b4c9] cursor-default leading-relaxed">
                    Access internships, job connections, and industry mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>

            </div>
          </div>

          <div className="md:col-span-3">
            <div className="card-standard p-3 md:p-4 h-full flex flex-col relative overflow-hidden group">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-3 h-32 md:h-36 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="barFront1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b7ee6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#8b7ee6" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="barFront2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="barFront3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b7ee6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b7ee6" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="barFront4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="barFront5" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b7ee6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b7ee6" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(80, 150)">
                      <ellipse cx="110" cy="10" rx="160" ry="15" fill="rgba(0,0,0,0.3)" opacity="0.4" />

                      <g className="group-hover:translate-y-[-3px] transition-transform duration-500 delay-100">
                        <ellipse cx="25" cy="7" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

                        <path d="M7,-35 L7,0 L9,2 L9,-33 Z" fill="#1a1d2e" />
                        <path d="M7,-35 L43,-35 L43,0 L7,0 Z" fill="url(#barFront1)" />
                        <path d="M43,-35 L45,-33 L45,2 L43,0 Z" fill="#2d2f45" />
                        <path d="M7,-35 L43,-35 L45,-33 L9,-33 Z" fill="#8b7ee6" />

                        <line x1="17" y1="-33" x2="17" y2="-5" stroke="rgba(139,126,230,0.5)" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(50, 0)" className="group-hover:translate-y-[-4px] transition-transform duration-500 delay-200">
                        <ellipse cx="25" cy="7" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

                        <path d="M7,-70 L7,0 L9,2 L9,-68 Z" fill="#1a1d2e" />
                        <path d="M7,-70 L43,-70 L43,0 L7,0 Z" fill="url(#barFront2)" />
                        <path d="M43,-70 L45,-68 L45,2 L43,0 Z" fill="#3d3f55" />
                        <path d="M7,-70 L43,-70 L45,-68 L9,-68 Z" fill="#a78bfa" />

                        <line x1="17" y1="-68" x2="17" y2="-5" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(100, 0)" className="group-hover:translate-y-[-3px] transition-transform duration-500 delay-300">
                        <ellipse cx="25" cy="7" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

                        <path d="M7,-50 L7,0 L9,2 L9,-48 Z" fill="#1a1d2e" />
                        <path d="M7,-50 L43,-50 L43,0 L7,0 Z" fill="url(#barFront3)" />
                        <path d="M43,-50 L45,-48 L45,2 L43,0 Z" fill="#2d2f45" />
                        <path d="M7,-50 L43,-50 L45,-48 L9,-48 Z" fill="#8b7ee6" />

                        <line x1="17" y1="-48" x2="17" y2="-5" stroke="rgba(139,126,230,0.5)" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(150, 0)" className="group-hover:translate-y-[-5px] transition-transform duration-500 delay-400">
                        <ellipse cx="25" cy="7" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

                        <path d="M7,-90 L7,0 L9,2 L9,-88 Z" fill="#1a1d2e" />
                        <path d="M7,-90 L43,-90 L43,0 L7,0 Z" fill="url(#barFront4)" />
                        <path d="M43,-90 L45,-88 L45,2 L43,0 Z" fill="#3d3f55" />
                        <path d="M7,-90 L43,-90 L45,-88 L9,-88 Z" fill="#a78bfa" />

                        <line x1="17" y1="-88" x2="17" y2="-5" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(200, 0)" className="group-hover:translate-y-[-6px] transition-transform duration-500 delay-500">
                        <ellipse cx="25" cy="7" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

                        <path d="M7,-125 L7,0 L9,2 L9,-123 Z" fill="#1a1d2e" />
                        <path d="M7,-125 L43,-125 L43,0 L7,0 Z" fill="url(#barFront5)" />
                        <path d="M43,-125 L45,-123 L45,2 L43,0 Z" fill="#3d3f55" />
                        <path d="M7,-125 L43,-125 L45,-123 L9,-123 Z" fill="#8b7ee6" />

                        <line x1="17" y1="-123" x2="17" y2="-5" stroke="rgba(139,126,230,0.5)" strokeWidth="1.5" />
                      </g>

                      <g className="group-hover:translate-x-[5px] group-hover:-translate-y-[5px] transition-transform duration-700">
                        <path d="
                          M30,-22
                          L75,-52
                          L125,-32
                          L175,-72
                          L225,-110
                        "
                        stroke="#a78bfa"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6,4"
                        opacity="0.8" />

                        <g transform="translate(225, -110)">
                          <path d="M0,0 L-3,6 L3,3 Z" fill="#a78bfa" opacity="0.8" />
                          <path d="M0,0 L-6,3 L-3,6 Z" fill="#8b7ee6" opacity="0.6" />
                        </g>

                        <circle cx="225" cy="-110" r="4" fill="#a78bfa" opacity="0.6" />
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 cursor-default">
                    Leadership & Growth
                  </h3>
                  <p className="text-body-apple text-[#b8b4c9] cursor-default leading-relaxed">
                    Organize events, lead committees, and develop leadership skills.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="card-standard p-3 md:p-4 h-full flex flex-col relative overflow-hidden group">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-3 h-32 md:h-36 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="avatarBody" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2d2f45" />
                        <stop offset="100%" stopColor="#1a1d2e" />
                      </linearGradient>
                      <radialGradient id="avatarHead">
                        <stop offset="0%" stopColor="rgba(139,126,230,0.5)" />
                        <stop offset="100%" stopColor="rgba(139,126,230,0.1)" />
                      </radialGradient>
                    </defs>

                    <g transform="translate(150, 130)">
                      <ellipse cx="0" cy="35" rx="90" ry="18" fill="rgba(0,0,0,0.4)" opacity="0.5" />

                      <g transform="translate(-55, -30)" opacity="0.7" className="group-hover:translate-y-[-2px] transition-transform duration-500 delay-100">
                        <ellipse cx="0" cy="30" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />

                        <path d="M-8,0 L-10,2 L-10,22 L-8,24 Z" fill="#1a1d2e" />
                        <path d="M-8,0 L8,0 L10,2 L-10,2 Z" fill="url(#avatarBody)" />
                        <path d="M8,0 L10,2 L10,22 L8,24 Z" fill="#2d2f45" />
                        <rect x="-8" y="0" width="16" height="24" fill="url(#avatarBody)" stroke="#8b7ee6" strokeWidth="1.2" />

                        <ellipse cx="0" cy="-8" rx="10" ry="4" fill="#3d3f55" />
                        <circle cx="0" cy="-12" r="10" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.2" />
                        <circle cx="0" cy="-12" r="8" fill="url(#avatarHead)" />
                        <circle cx="0" cy="-12" r="4" fill="#8b7ee6" opacity="0.7" />
                      </g>

                      <g transform="translate(0, -35)" opacity="0.7" className="group-hover:translate-y-[-3px] transition-transform duration-500 delay-200">
                        <ellipse cx="0" cy="30" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />

                        <path d="M-8,0 L-10,2 L-10,22 L-8,24 Z" fill="#1a1d2e" />
                        <path d="M-8,0 L8,0 L10,2 L-10,2 Z" fill="url(#avatarBody)" />
                        <path d="M8,0 L10,2 L10,22 L8,24 Z" fill="#2d2f45" />
                        <rect x="-8" y="0" width="16" height="24" fill="url(#avatarBody)" stroke="#a78bfa" strokeWidth="1.2" />

                        <ellipse cx="0" cy="-8" rx="10" ry="4" fill="#3d3f55" />
                        <circle cx="0" cy="-12" r="10" fill="#2d2f45" stroke="#a78bfa" strokeWidth="1.2" />
                        <circle cx="0" cy="-12" r="8" fill="url(#avatarHead)" />
                        <circle cx="0" cy="-12" r="4" fill="#a78bfa" opacity="0.7" />
                      </g>

                      <g transform="translate(55, -30)" opacity="0.7" className="group-hover:translate-y-[-2px] transition-transform duration-500 delay-100">
                        <ellipse cx="0" cy="30" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />

                        <path d="M-8,0 L-10,2 L-10,22 L-8,24 Z" fill="#1a1d2e" />
                        <path d="M-8,0 L8,0 L10,2 L-10,2 Z" fill="url(#avatarBody)" />
                        <path d="M8,0 L10,2 L10,22 L8,24 Z" fill="#2d2f45" />
                        <rect x="-8" y="0" width="16" height="24" fill="url(#avatarBody)" stroke="#8b7ee6" strokeWidth="1.2" />

                        <ellipse cx="0" cy="-8" rx="10" ry="4" fill="#3d3f55" />
                        <circle cx="0" cy="-12" r="10" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.2" />
                        <circle cx="0" cy="-12" r="8" fill="url(#avatarHead)" />
                        <circle cx="0" cy="-12" r="4" fill="#8b7ee6" opacity="0.7" />
                      </g>

                      <g transform="translate(-35, 0)" className="group-hover:translate-y-[-4px] transition-transform duration-500 delay-300">
                        <ellipse cx="0" cy="38" rx="14" ry="4" fill="rgba(0,0,0,0.4)" />

                        <path d="M-12,0 L-14,2 L-14,28 L-12,30 Z" fill="#1a1d2e" />
                        <path d="M-12,0 L12,0 L14,2 L-14,2 Z" fill="url(#avatarBody)" />
                        <path d="M12,0 L14,2 L14,28 L12,30 Z" fill="#3d3f55" />
                        <rect x="-12" y="0" width="24" height="30" fill="url(#avatarBody)" stroke="#a78bfa" strokeWidth="1.8" />

                        <ellipse cx="0" cy="-10" rx="13" ry="5" fill="#3d3f55" />
                        <circle cx="0" cy="-16" r="13" fill="#2d2f45" stroke="#a78bfa" strokeWidth="1.8" />
                        <circle cx="0" cy="-16" r="11" fill="url(#avatarHead)" />
                        <circle cx="0" cy="-16" r="5" fill="#a78bfa" opacity="0.9" />
                      </g>

                      <g transform="translate(35, 0)" className="group-hover:translate-y-[-4px] transition-transform duration-500 delay-400">
                        <ellipse cx="0" cy="38" rx="14" ry="4" fill="rgba(0,0,0,0.4)" />

                        <path d="M-12,0 L-14,2 L-14,28 L-12,30 Z" fill="#1a1d2e" />
                        <path d="M-12,0 L12,0 L14,2 L-14,2 Z" fill="url(#avatarBody)" />
                        <path d="M12,0 L14,2 L14,28 L12,30 Z" fill="#3d3f55" />
                        <rect x="-12" y="0" width="24" height="30" fill="url(#avatarBody)" stroke="#8b7ee6" strokeWidth="1.8" />

                        <ellipse cx="0" cy="-10" rx="13" ry="5" fill="#3d3f55" />
                        <circle cx="0" cy="-16" r="13" fill="#2d2f45" stroke="#8b7ee6" strokeWidth="1.8" />
                        <circle cx="0" cy="-16" r="11" fill="url(#avatarHead)" />
                        <circle cx="0" cy="-16" r="5" fill="#8b7ee6" opacity="0.9" />
                      </g>

                      <g className="group-hover:opacity-100 transition-opacity duration-500" opacity="0.6">
                        <circle cx="-18" cy="-10" r="2.5" fill="#8b7ee6" />
                        <circle cx="18" cy="-15" r="2.5" fill="#a78bfa" />
                        <circle cx="0" cy="-40" r="2.5" fill="#8b7ee6" />
                        <circle cx="-40" cy="-5" r="2" fill="#a78bfa" opacity="0.7" />
                        <circle cx="40" cy="-5" r="2" fill="#8b7ee6" opacity="0.7" />
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 cursor-default">
                    Community & Belonging
                  </h3>
                  <p className="text-body-apple text-[#b8b4c9] cursor-default leading-relaxed">
                    Find your people in CCIS. All skill levels and programs welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full flex flex-col justify-center lg:sticky lg:top-24 lg:items-end" ref={headingRef}>
            <motion.div
              className="inline-flex items-center mb-2 md:mb-4 w-full justify-center lg:justify-end"
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="section-label-wrapper relative px-2 py-1 md:px-3 md:py-1.5">
                <span className="absolute top-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-l border-[#8b7ee6]" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-r border-[#8b7ee6]" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-l border-[#8b7ee6]" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-r border-[#8b7ee6]" />
                <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-[0.02em] text-white cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>
                <HyperText as="span" startOnView>WHY JOIN?</HyperText>
              </h2>
              </div>
            </motion.div>
            <motion.h3
              className="section-headline uppercase text-white mb-4 md:mb-6 cursor-default text-center lg:text-right"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
            >
              Be Part of
              <br />
              Something
              <br />
              Bigger
            </motion.h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
