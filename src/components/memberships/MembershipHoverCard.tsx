'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { MembershipTier } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface MembershipHoverCardProps {
  tier: MembershipTier;
  annual: boolean;
}

export function MembershipHoverCard({ tier, annual }: MembershipHoverCardProps) {
  const [hovered, setHovered] = useState(false);
  const price = annual ? tier.annualPrice : tier.monthlyPrice;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-shadow duration-300 ${
        tier.popular ? 'border-accent shadow-glow' : 'border-surface-border'
      } ${hovered ? 'shadow-card' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-surface p-8">
        {tier.popular ? <Badge variant="accent" className="mb-4">Most Popular</Badge> : null}
        <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
        <p className="mt-2 text-sm text-white/60">{tier.description}</p>
        <p className="mt-6 font-display text-5xl font-bold text-accent">
          {formatCurrency(price)}
          <span className="text-base font-normal text-white/50">/{annual ? 'yr' : 'mo'}</span>
        </p>
        <p className="mt-4 text-xs text-white/40">Hover to explore features</p>
      </div>

      <AnimatePresence>
        {hovered ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-surface-border bg-charcoal-800"
          >
            <div className="p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
                What&apos;s Included
              </h4>
              <ul className="mt-4 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/memberships#plans"
                className="mt-5 inline-block w-full rounded-xl border border-accent/40 py-2.5 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent-muted"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
