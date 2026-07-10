import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'accent' | 'secondary' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white',
  accent: 'bg-accent-muted text-accent border border-accent/30',
  secondary: 'bg-secondary-muted text-secondary border border-secondary/30',
  outline: 'border border-surface-border text-white/70',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
