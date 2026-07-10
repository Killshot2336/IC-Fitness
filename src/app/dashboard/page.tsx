'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Calendar, CreditCard, Dumbbell, LogIn } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Button, Card } from '@/components/ui';
import { FadeIn } from '@/components/motion';

const MOCK_CHECKINS = [12, 18, 15, 22, 19, 24, 20];
const MOCK_BOOKINGS = [
  { id: '1', name: 'CrossFit', day: 'Tuesday', time: '5:30 PM' },
  { id: '2', name: 'Yoga Flow', day: 'Saturday', time: '9:00 AM' },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <LogIn className="mx-auto text-accent" size={48} />
          <h1 className="mt-6 font-display text-3xl font-bold text-white">Member Portal</h1>
          <p className="mt-4 text-white/60">Sign in to view your check-ins, bookings, and billing.</p>
          <Link href="/auth/signin" className="mt-8 inline-block">
            <Button>Sign In</Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="bg-charcoal-800 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-display text-4xl font-bold text-white">
            Welcome back, {session.user?.name?.split(' ')[0] ?? 'Member'}
          </h1>
          <p className="mt-2 text-white/60">Your IC Fitness member dashboard</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <Dumbbell className="text-accent" />
                <h2 className="font-display text-xl font-bold text-white">Check-In History</h2>
              </div>
              <div className="flex h-40 items-end gap-2">
                {MOCK_CHECKINS.map((count, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-accent/80 transition-all"
                      style={{ height: `${(count / 24) * 100}%` }}
                    />
                    <span className="text-xs text-white/40">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/50">130 check-ins this month</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <CreditCard className="text-secondary" />
                <h2 className="font-display text-xl font-bold text-white">Billing</h2>
              </div>
              <p className="text-white/60">Premium Membership</p>
              <p className="mt-2 font-display text-3xl font-bold text-accent">$45<span className="text-base text-white/50">/mo</span></p>
              <Button variant="outline" className="mt-6 w-full" size="sm">Manage Billing</Button>
            </Card>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Upcoming Classes" />
        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_BOOKINGS.map((booking) => (
            <FadeIn key={booking.id}>
              <Card hover className="flex items-center gap-4">
                <Calendar className="shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold text-white">{booking.name}</h3>
                  <p className="text-sm text-white/60">{booking.day} at {booking.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">Cancel</Button>
              </Card>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/classes"><Button variant="outline">Browse Classes</Button></Link>
        </div>
      </Section>
    </>
  );
}
