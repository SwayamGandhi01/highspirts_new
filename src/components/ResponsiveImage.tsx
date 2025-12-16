import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  webpSrc?: string;
  className?: string;
  sizes?: string;
  srcSet?: string;
  lazy?: boolean;
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Responsive Image Component with WebP support and lazy loading
 * 
 * Features:
 * - WebP format support with fallback to JPEG
 * - Lazy loading for performance
 * - Responsive sizing with srcset
 * - Async decoding for better performance
 * 
 * Usage:
 * <ResponsiveImage
 *   src="image.jpg"
 *   webpSrc="image.webp"
 *   alt="Description"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 *   className="w-full h-auto"
 *   lazy={true}
 * />
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  webpSrc,
  alt,
  className,
  sizes,
  srcSet,
  lazy = true,
  decoding = 'async',
  onLoad,
  onError,
}) => {
  // Use picture element for WebP support
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
        <source srcSet={srcSet || src} type="image/jpeg" sizes={sizes} />
        <img
          src={src}
          alt={alt}
          className={className}
          loading={lazy ? 'lazy' : 'eager'}
          decoding={decoding}
          onLoad={onLoad}
          onError={onError}
        />
      </picture>
    );
  }

  // Standard img element with lazy loading
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      srcSet={srcSet}
      sizes={sizes}
      loading={lazy ? 'lazy' : 'eager'}
      decoding={decoding}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

/**
 * Background Image with Lazy Loading
 * 
 * Usage:
 * <LazyBackgroundImage
 *   src="background.jpg"
 *   className="w-full h-screen"
 * />
 */
interface LazyBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  alt?: string;
}

export const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  className,
  children,
  alt = 'Background',
}) => {
  const [backgroundImage, setBackgroundImage] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Create an image to preload
    const img = new Image();
    img.onload = () => {
      setBackgroundImage(`url('${src}')`);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div
      className={`${className} ${isLoaded ? 'bg-cover bg-center' : ''}`}
      style={{ backgroundImage }}
      aria-label={alt}
      role="img"
    >
      {children}
    </div>
  );
};

/**
 * Image with Responsive Breakpoints
 * Automatically handles different image sizes for different viewports
 * 
 * Usage:
 * <ResponsiveImageGrid
 *   mobileSrc="image-sm.jpg"
 *   tabletSrc="image-md.jpg"
 *   desktopSrc="image-lg.jpg"
 *   alt="Description"
 * />
 */
interface ResponsiveImageGridProps {
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  alt: string;
  className?: string;
}

export const ResponsiveImageGrid: React.FC<ResponsiveImageGridProps> = ({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className = 'w-full h-auto',
}) => {
  return (
    <picture>
      {/* Desktop - 1024px and above */}
      <source media="(min-width: 1024px)" srcSet={desktopSrc} />
      {/* Tablet - 640px to 1023px */}
      <source media="(min-width: 640px)" srcSet={tabletSrc} />
      {/* Mobile - Below 640px */}
      <img
        src={mobileSrc}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
