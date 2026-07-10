'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout/Section';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { MembershipHoverCard } from '@/components/memberships/MembershipHoverCard';
import { MEMBERSHIP_TIERS, MEMBERSHIP_FAQ, VISITOR_PASSES } from '@/lib/data/memberships';
import { formatCurrency } from '@/lib/utils';
import { IMAGES } from '@/lib/images';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-surface-border">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="font-semibold text-white">{question}</span>
        <ChevronDown size={20} className={`shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="pb-5 text-white/60">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function MembershipsPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <section className="relative h-[40vh] min-h-[320px]">
        <GymImage src={IMAGES.community} fallback={IMAGES.communityFallback} alt="IC Fitness members at Broken Bow gym" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Memberships</h1>
            <p className="mt-2 text-lg text-white/70">
              Explore plans and pricing. Visit us at 2716 South Park Drive to get started.
            </p>
          </div>
        </div>
      </section>

      <Section id="plans">
        <SectionHeader
          title="Choose Your Plan"
          subtitle="Hover any card to reveal features. This page is an informational preview of IC Fitness memberships."
        />

        <FadeIn className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-surface-border bg-surface p-1">
            <button type="button" onClick={() => setAnnual(false)} className={`rounded-lg px-6 py-2 text-sm font-semibold ${!annual ? 'bg-accent text-white' : 'text-white/60'}`}>Monthly</button>
            <button type="button" onClick={() => setAnnual(true)} className={`rounded-lg px-6 py-2 text-sm font-semibold ${annual ? 'bg-accent text-white' : 'text-white/60'}`}>Annual (Save 17%)</button>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <FadeIn key={tier.id} delay={i * 0.1}>
              <MembershipHoverCard tier={tier} annual={annual} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-sm text-white/50">Ready to talk memberships? Call 580-743-7955 or visit in person.</p>
          <Link href="/contact" className="mt-4 inline-flex rounded-xl border border-accent px-8 py-3 font-semibold text-accent transition-colors hover:bg-accent-muted">
            Learn More
          </Link>
        </FadeIn>
      </Section>

      <Section dark>
        <SectionHeader title="Visitor Passes" subtitle="Perfect for travelers and weekend warriors." />
        <div className="grid gap-6 sm:grid-cols-3">
          {VISITOR_PASSES.map((pass) => (
            <FadeIn key={pass.id}>
              <div className="rounded-2xl border border-surface-border bg-surface p-6 text-center">
                <h3 className="font-display text-xl font-bold">{pass.name}</h3>
                <p className="mt-4 font-display text-4xl font-bold text-secondary">{formatCurrency(pass.price)}</p>
                <p className="mt-2 text-sm text-white/60">{pass.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section dark id="faq">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="mx-auto max-w-3xl">
          {MEMBERSHIP_FAQ.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </Section>
    </>
  );
}
