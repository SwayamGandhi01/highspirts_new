import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if device is mobile
 * Returns true if viewport width is less than 768px (Tailwind md breakpoint)
 * 
 * Usage:
 * const isMobile = useIsMobile();
 * 
 * Can be used to:
 * - Disable complex animations on mobile
 * - Reduce animation intensity
 * - Apply mobile-specific logic
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Set initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Add event listener for resize
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

/**
 * Hook to check if user prefers reduced motion
 * Returns true if user has prefers-reduced-motion set
 * 
 * Usage:
 * const prefersReducedMotion = usePrefersReducedMotion();
 * 
 * Used to respect accessibility preferences
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const checkPreference = () => {
      setPrefersReduced(mediaQuery.matches);
    };

    checkPreference();

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return prefersReduced;
};

/**
 * Combined hook for mobile optimization
 * Returns object with both mobile and animation preference checks
 */
export const useMobileOptimizations = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  return {
    isMobile,
    prefersReducedMotion,
    shouldReduceAnimations: isMobile || prefersReducedMotion,
  };
};
