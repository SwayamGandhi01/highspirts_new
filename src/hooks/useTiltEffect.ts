import { useState, useRef, useCallback } from 'react';

interface TiltState {
  x: number;
  y: number;
}

export const useTiltEffect = () => {
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    
    setTilt({ x: x * 10, y: y * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return {
    tilt,
    elementRef,
    handleMouseMove,
    handleMouseLeave,
  };
};
