'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  value: number;
  start?: number;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  start,
  suffix = '',
  duration = 2,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const from = start ?? Math.max(0, value - Math.round(value * 0.3));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={from}
          end={value}
          duration={duration}
          decimals={decimals}
          useEasing
          enableScrollSpy={false}
        />
      ) : (
        from
      )}
      {suffix}
    </span>
  );
}
