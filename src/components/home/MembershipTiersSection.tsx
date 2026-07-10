'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout/Section';
import { FadeIn } from '@/components/motion';
import { MEMBERSHIP_TIERS } from '@/lib/data/memberships';
import { MembershipHoverCard } from '@/components/memberships/MembershipHoverCard';

export function MembershipTiersSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="memberships-preview">
      <SectionHeader
        title="Membership Plans"
        subtitle="Compare plans and see what's included. All memberships include 24/7 access."
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
        {MEMBERSHIP_TIERS.map((tier, i) => (
          <FadeIn key={tier.id} delay={i * 0.1}>
            <MembershipHoverCard tier={tier} annual={annual} />
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-10 text-center">
        <Link
          href="/memberships"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          View Plans
        </Link>
      </FadeIn>
    </Section>
  );
}
