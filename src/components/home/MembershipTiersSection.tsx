'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { MEMBERSHIP_TIERS } from '@/lib/data/memberships';
import { formatCurrency } from '@/lib/utils';

export function MembershipTiersSection() {
  const [annual, setAnnual] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <Section id="memberships-preview">
      <SectionHeader
        title="Membership Plans"
        subtitle="Choose the plan that fits your lifestyle. All memberships include 24/7 access."
      />

      <FadeIn className="mb-10 flex justify-center">
        <div className="inline-flex rounded-xl border border-surface-border bg-surface p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-lg px-6 py-2 text-sm font-semibold transition-colors ${
              !annual ? 'bg-accent text-white' : 'text-white/60'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-lg px-6 py-2 text-sm font-semibold transition-colors ${
              annual ? 'bg-accent text-white' : 'text-white/60'
            }`}
          >
            Annual <span className="text-secondary">(Save 17%)</span>
          </button>
        </div>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-3">
        {MEMBERSHIP_TIERS.map((tier, i) => {
          const price = annual ? tier.annualPrice : tier.monthlyPrice;
          const isFlipped = flipped === tier.id;

          return (
            <FadeIn key={tier.id} delay={i * 0.1}>
              <div
                className="perspective-1000 h-[420px] cursor-pointer"
                onClick={() => setFlipped(isFlipped ? null : tier.id)}
                onKeyDown={(e) => e.key === 'Enter' && setFlipped(isFlipped ? null : tier.id)}
                role="button"
                tabIndex={0}
                aria-label={`${tier.name} membership details`}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 rounded-2xl border bg-surface p-8 backface-hidden ${
                      tier.popular ? 'border-accent shadow-glow' : 'border-surface-border'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {tier.popular ? (
                      <Badge variant="accent" className="mb-4">Most Popular</Badge>
                    ) : null}
                    <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
                    <p className="mt-2 text-sm text-white/60">{tier.description}</p>
                    <p className="mt-6 font-display text-5xl font-bold text-accent">
                      {formatCurrency(price)}
                      <span className="text-base font-normal text-white/50">
                        /{annual ? 'yr' : 'mo'}
                      </span>
                    </p>
                    <p className="mt-4 text-xs text-white/40">Click to see features</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-surface-border bg-charcoal-800 p-8"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="font-display text-xl font-bold text-white">{tier.name} Features</h3>
                    <ul className="mt-6 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                          <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/memberships" className="mt-8 block" onClick={(e) => e.stopPropagation()}>
                      <Button className="w-full">Join Now</Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
