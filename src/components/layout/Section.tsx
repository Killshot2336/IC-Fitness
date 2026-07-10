import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className, id, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-20 sm:py-28', dark ? 'bg-charcoal-900' : 'bg-charcoal-800', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
}: {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <FadeIn className={cn('mb-16', align === 'center' && 'text-center')}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 max-w-2xl text-lg text-white/60', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      ) : null}
      <div className={cn('mt-6 h-1 w-20 rounded-full bg-accent', align === 'center' && 'mx-auto')} />
    </FadeIn>
  );
}
