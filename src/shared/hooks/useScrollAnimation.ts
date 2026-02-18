import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer API
 * Provides smooth fade-in and slide animations when elements enter the viewport
 * Only triggers animations when scrolling down, not when scrolling up
 * 
 * @param options - Configuration options for the animation behavior
 * @returns Object containing ref to attach to element and animation state
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: {
  threshold?: number;           // Percentage of element visible before triggering
  rootMargin?: string;          // Margin around root for triggering
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight'; // Animation type
  delay?: number;              // Delay before animation starts (ms)
  duration?: number;           // Animation duration (ms)
} = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationType = 'fadeIn',
    delay = 0,
    duration = 600
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  /**
   * Sets up intersection observer to detect when element enters viewport
   * Animations trigger only once when element comes into view
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer with specified options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Animate only once when element comes into view
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup observer on component unmount
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, delay, hasAnimated]);

  /**
   * Generates CSS classes based on animation type and visibility state
   * Returns appropriate transform and opacity values for smooth animations
   */
  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    
    if (!isVisible) {
      // Initial state - element is hidden/off-screen
      switch (animationType) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-8`;
        default:
          return `${baseClasses} opacity-0`;
      }
    } else {
      // Animated state - element is visible and in position
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
    }
  };

  /**
   * Generates inline styles for animation duration
   * Allows for custom timing control per element
   */
  const getAnimationStyle = () => ({
    transitionDuration: `${duration}ms`,
  });

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
    animationClasses: getAnimationClasses(),
    animationStyle: getAnimationStyle(),
  };
};

/**
 * Hook for staggered animations on multiple elements
 * Useful for animating lists or grids with sequential timing
 * 
 * @param itemCount - Number of items to animate
 * @param staggerDelay - Delay between each item animation (ms)
 * @param options - Additional animation options
 */
export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(
  itemCount: number,
  staggerDelay: number = 100,
  options: Parameters<typeof useScrollAnimation>[0] = {}
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<T>(null);

  /**
   * Sets up intersection observer for staggered animations
   * Animations trigger only once when container comes into view
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Animate only once when container comes into view
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
              }, i * staggerDelay);
            }
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [itemCount, staggerDelay, options.threshold, options.rootMargin, hasAnimated]);

  /**
   * Gets animation classes for individual items based on their visibility state
   * 
   * @param index - Index of the item in the array
   * @param animationType - Type of animation to apply
   */
  const getItemAnimationClasses = (index: number, animationType: string = 'slideUp') => {
    const baseClasses = 'transition-all ease-out';
    const isVisible = visibleItems[index];

    if (!isVisible) {
      switch (animationType) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-8`;
        default:
          return `${baseClasses} opacity-0`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
    }
  };

  return {
    containerRef,
    visibleItems,
    getItemAnimationClasses,
  };
};
