import { useTiltEffect } from '@/hooks/useTiltEffect';

interface TiltImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  lazy?: boolean;
}

export const TiltImage = ({ src, alt, onClick, className, children, lazy = true }: TiltImageProps) => {
  const { tilt, elementRef, handleMouseMove, handleMouseLeave } = useTiltEffect();

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
        }}
        className="w-full h-full object-cover gallery-image"
      />
      {children}
    </div>
  );
};
