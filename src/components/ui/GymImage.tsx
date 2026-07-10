'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface GymImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  fallback: string;
  alt: string;
}

/**
 * Tries local IC Fitness asset first, falls back to verified listing photo.
 */
export function GymImage({ src, fallback, alt, ...props }: GymImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
