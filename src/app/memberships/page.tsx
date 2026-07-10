'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { MEMBERSHIP_TIERS, MEMBERSHIP_FAQ, VISITOR_PASSES } from '@/lib/data/memberships';
import { formatCurrency } from '@/lib/utils';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-surface-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-white">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-white/60">{answer}</p>
      </motion.div>
    </div>
  );
}

async function handleCheckout(tierId: string, annual: boolean) {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tierId, annual }),
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

export default function MembershipsPage() {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const checkout = async (tierId: string) => {
    setLoading(tierId);
    try {
      await handleCheckout(tierId, annual);
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <section className="relative h-[40vh] min-h-[320px]">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80"
          alt="IC Fitness members training"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Memberships</h1>
            <p className="mt-2 text-lg text-white/70">Invest in yourself. Train without limits.</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader title="Choose Your Plan" subtitle="All plans include 24/7 key fob access." />

        <FadeIn className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-surface-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-lg px-6 py-2 text-sm font-semibold ${!annual ? 'bg-accent text-white' : 'text-white/60'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-lg px-6 py-2 text-sm font-semibold ${annual ? 'bg-accent text-white' : 'text-white/60'}`}
            >
              Annual (Save 17%)
            </button>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <FadeIn key={tier.id} delay={i * 0.1}>
              <div
                className={`rounded-2xl border p-8 ${
                  tier.popular ? 'border-accent bg-surface shadow-glow' : 'border-surface-border bg-surface'
                }`}
              >
                {tier.popular ? <Badge variant="accent" className="mb-4">Most Popular</Badge> : null}
                <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/60">{tier.description}</p>
                <p className="mt-6 font-display text-5xl font-bold text-accent">
                  {formatCurrency(annual ? tier.annualPrice : tier.monthlyPrice)}
                  <span className="text-base font-normal text-white/50">/{annual ? 'yr' : 'mo'}</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                      <Check size={16} className="mt-0.5 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={tier.popular ? 'primary' : 'outline'}
                  isLoading={loading === tier.id}
                  onClick={() => checkout(tier.id)}
                >
                  Join {tier.name}
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
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

      <Section>
        <SectionHeader title="Add-On Services" />
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="rounded-2xl border border-surface-border bg-surface p-8">
              <h3 className="font-display text-xl font-bold text-white">Personal Training</h3>
              <p className="mt-3 text-white/60">One-on-one coaching tailored to your goals. From $60/session.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-surface-border bg-surface p-8">
              <h3 className="font-display text-xl font-bold text-white">Nutrition Coaching</h3>
              <p className="mt-3 text-white/60">Custom meal plans and macro guidance. From $75/consultation.</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
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
