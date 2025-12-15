import { useEffect, useState, useRef } from 'react';

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout to avoid excessive updates
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }

      // Throttle scroll updates to improve performance
      throttleTimeoutRef.current = setTimeout(() => {
        // Calculate total scrollable height
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;

        // Get current scroll position
        const scrollTop = window.scrollY;

        // Calculate accurate scroll percentage
        const scrollPercentage = scrollableHeight > 0 
          ? (scrollTop / scrollableHeight) * 100 
          : 0;

        // Ensure percentage stays between 0 and 100
        const clampedPercentage = Math.min(Math.max(scrollPercentage, 0), 100);

        setProgress(clampedPercentage);
      }, 10);
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-accent z-51 transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
      }}
    />
  );
};

export default ScrollProgressBar;
