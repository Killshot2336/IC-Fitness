'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/layout/Section';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { MembershipFlipCard } from '@/components/memberships/MembershipFlipCard';
import { MembershipJoinModal } from '@/components/memberships/MembershipJoinModal';
import { MEMBERSHIP_TIERS, MEMBERSHIP_FAQ, VISITOR_PASSES } from '@/lib/data/memberships';
import { formatCurrency } from '@/lib/utils';
import { IMAGES } from '@/lib/images';
import { useMemberAuth } from '@/context/MemberAuthContext';

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
  const [loading, setLoading] = useState<string | null>(null);
  const [joinModal, setJoinModal] = useState<{ tierId: string; tierName: string; price: string } | null>(null);
  const { login } = useMemberAuth();

  const openJoin = (tierId: string, tierName: string) => {
    const tier = MEMBERSHIP_TIERS.find((t) => t.id === tierId)!;
    const price = formatCurrency(annual ? tier.annualPrice : tier.monthlyPrice) + (annual ? '/yr' : '/mo');
    setJoinModal({ tierId, tierName, price });
  };

  const handleJoinSubmit = async (data: { name: string; email: string; membershipNumber: string }) => {
    if (!joinModal) return;
    const memberNum = data.membershipNumber || `IC-${Date.now().toString().slice(-5)}`;
    login(data.email, memberNum, data.name);
    setJoinModal(null);
    setLoading(joinModal.tierId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId: joinModal.tierId, annual }),
      });
      const result = await res.json();
      if (result.url) window.location.href = result.url;
      else alert('Checkout is in demo mode. Your membership signup was recorded — welcome to the IC Family!');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <section className="relative h-[40vh] min-h-[320px]">
        <GymImage src={IMAGES.community} fallback={IMAGES.communityFallback} alt="IC Fitness members at Broken Bow gym" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Memberships</h1>
            <p className="mt-2 text-lg text-white/70">24/7 access at 2716 South Park Drive. No corporate nonsense — just results.</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader title="Choose Your Plan" subtitle="All plans include 24/7 key fob access. Hover a card to flip and see features." />

        <FadeIn className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-surface-border bg-surface p-1">
            <button type="button" onClick={() => setAnnual(false)} className={`rounded-lg px-6 py-2 text-sm font-semibold ${!annual ? 'bg-accent text-white' : 'text-white/60'}`}>Monthly</button>
            <button type="button" onClick={() => setAnnual(true)} className={`rounded-lg px-6 py-2 text-sm font-semibold ${annual ? 'bg-accent text-white' : 'text-white/60'}`}>Annual (Save 17%)</button>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <FadeIn key={tier.id} delay={i * 0.1}>
              <MembershipFlipCard
                tier={tier}
                annual={annual}
                onJoin={() => openJoin(tier.id, tier.name)}
                loading={loading === tier.id}
              />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Visitor Passes" subtitle="Visiting Broken Bow? Drop in at South Park Drive." />
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

      <Section dark>
        <SectionHeader title="Frequently Asked Questions" />
        <div className="mx-auto max-w-3xl">
          {MEMBERSHIP_FAQ.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </Section>

      {joinModal ? (
        <MembershipJoinModal
          isOpen
          tierName={joinModal.tierName}
          price={joinModal.price}
          onClose={() => setJoinModal(null)}
          onSubmit={handleJoinSubmit}
        />
      ) : null}
    </>
  );
}
