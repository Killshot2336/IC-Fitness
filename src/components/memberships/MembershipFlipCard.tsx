'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { MembershipTier } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface MembershipFlipCardProps {
  tier: MembershipTier;
  annual: boolean;
  onJoin: () => void;
  loading?: boolean;
}

export function MembershipFlipCard({ tier, annual, onJoin, loading }: MembershipFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const price = annual ? tier.annualPrice : tier.monthlyPrice;

  return (
    <div
      className="perspective-1000 h-[440px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`absolute inset-0 flex flex-col rounded-2xl border bg-surface p-8 backface-hidden ${
            tier.popular ? 'border-accent shadow-glow' : 'border-surface-border'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {tier.popular ? <Badge variant="accent" className="mb-4 w-fit">Most Popular</Badge> : <div className="mb-4 h-6" />}
          <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
          <p className="mt-2 flex-1 text-sm text-white/60">{tier.description}</p>
          <p className="font-display text-5xl font-bold text-accent">
            {formatCurrency(price)}
            <span className="text-base font-normal text-white/50">/{annual ? 'yr' : 'mo'}</span>
          </p>
          <p className="mt-4 text-xs text-white/40">Hover to see all features →</p>
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-2xl border border-surface-border bg-charcoal-800 p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-display text-xl font-bold text-white">{tier.name} Includes</h3>
          <ul className="mt-6 flex-1 space-y-3 overflow-y-auto">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onJoin}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? 'Processing…' : `Join ${tier.name}`}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
