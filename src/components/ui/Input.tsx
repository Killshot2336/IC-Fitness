import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-white/80">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border border-surface-border bg-charcoal-900 px-4 py-3 text-white',
            'placeholder:text-white/40 transition-colors duration-200',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
            error && 'border-accent',
            className
          )}
          {...props}
        />
        {error ? <p className="mt-1 text-sm text-accent">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
