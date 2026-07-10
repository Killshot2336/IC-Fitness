'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { useMemberAuth } from '@/context/MemberAuthContext';

export function MemberLoginSection() {
  const { member, login } = useMemberAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [name, setName] = useState('');

  if (member) {
    return (
      <FadeIn className="rounded-2xl border border-accent/30 bg-surface p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Member Portal</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">
          Welcome back, {member.name.split(' ')[0]}!
        </h3>
        <p className="mt-2 text-white/60">Membership #{member.membershipNumber}</p>
        <Link href="/dashboard" className="mt-6 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </FadeIn>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, membershipNumber, name || 'Member');
    router.push('/dashboard');
  };

  return (
    <FadeIn className="rounded-2xl border border-surface-border bg-surface p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Member Portal</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white">Member Sign In</h3>
      <p className="mt-2 text-sm text-white/60">
        Access your bookings, check-in history, and account details.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Membership Number"
          required
          value={membershipNumber}
          onChange={(e) => setMembershipNumber(e.target.value)}
          placeholder="e.g. IC-12345"
        />
        <Button type="submit" className="w-full">Sign In to Dashboard</Button>
      </form>
    </FadeIn>
  );
}
