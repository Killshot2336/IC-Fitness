'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface GymImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  fallback: string;
  alt: string;
}

/**
 * Renders a local IC Fitness asset with automatic fallback on load failure.
 */
export function GymImage({ src, fallback, alt, fill, className, ...props }: GymImageProps) {
  const [current, setCurrent] = useState(src);
  const [useUnoptimized, setUseUnoptimized] = useState(false);

  const handleError = () => {
    if (current !== fallback) {
      setCurrent(fallback);
      setUseUnoptimized(true);
    }
  };

  const image = (
    <Image
      {...props}
      src={current}
      alt={alt}
      fill={fill}
      className={className}
      unoptimized={useUnoptimized}
      onError={handleError}
    />
  );

  if (fill) {
    return (
      <div className="absolute inset-0">
        {image}
      </div>
    );
  }

  return image;
}
