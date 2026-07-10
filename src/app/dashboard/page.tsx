'use client';

import Link from 'next/link';
import { Calendar, CreditCard, Dumbbell, LogOut, User } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Button, Card } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { useMemberAuth } from '@/context/MemberAuthContext';
import { MemberLoginSection } from '@/components/home/MemberLoginSection';
import { SITE } from '@/lib/constants';

export default function DashboardPage() {
  const { member, bookings, checkIns, logout, removeBooking } = useMemberAuth();

  if (!member) {
    return (
      <Section>
        <div className="mx-auto max-w-lg">
          <MemberLoginSection />
        </div>
      </Section>
    );
  }

  const maxCheckIn = Math.max(...checkIns, 1);

  return (
    <>
      <section className="bg-charcoal-800 py-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-white">
              Welcome, {member.name.split(' ')[0]}
            </h1>
            <p className="mt-2 text-white/60">IC Fitness Member Dashboard</p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <User className="text-accent" />
                <h2 className="font-display text-xl font-bold text-white">My Profile</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <dt className="text-white/50">Name</dt>
                  <dd className="font-medium text-white">{member.name}</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <dt className="text-white/50">Email</dt>
                  <dd className="font-medium text-white">{member.email}</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <dt className="text-white/50">Membership #</dt>
                  <dd className="font-medium text-accent">{member.membershipNumber}</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <dt className="text-white/50">Plan</dt>
                  <dd className="font-medium text-white">{member.tier}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/50">Member Since</dt>
                  <dd className="font-medium text-white">{new Date(member.joinDate).toLocaleDateString()}</dd>
                </div>
              </dl>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <CreditCard className="text-secondary" />
                <h2 className="font-display text-xl font-bold text-white">Account</h2>
              </div>
              <p className="text-white/60">{member.tier} Membership</p>
              <p className="mt-2 text-sm text-white/40">Billing managed at {SITE.address.street}</p>
              <Button variant="outline" className="mt-6 w-full" size="sm" disabled>
                Manage Billing (Coming Soon)
              </Button>
              <p className="mt-3 text-xs text-white/40">Questions? Call {SITE.phone}</p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="My Bookings" />
        {bookings.length === 0 ? (
          <p className="text-center text-white/60">No upcoming classes booked. <Link href="/classes" className="text-accent hover:underline">Browse schedule</Link></p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {bookings.map((booking) => (
              <FadeIn key={booking.id}>
                <Card hover className="flex items-center gap-4">
                  <Calendar className="shrink-0 text-accent" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{booking.className}</h3>
                    <p className="text-sm text-white/60">{booking.day} at {booking.time}</p>
                    <p className="text-xs text-white/40">Coach {booking.instructor}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeBooking(booking.id)}>Cancel</Button>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </Section>

      <Section>
        <SectionHeader title="Check-In History" subtitle="Last 30 days at IC Fitness" />
        <FadeIn>
          <Card>
            <div className="mb-4 flex items-center gap-3">
              <Dumbbell className="text-accent" />
              <h2 className="font-display text-lg font-bold text-white">Gym Visits</h2>
            </div>
            <div className="flex h-48 items-end gap-1 overflow-x-auto">
              {checkIns.map((count, i) => (
                <div key={i} className="flex min-w-[8px] flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-accent/80" style={{ height: `${(count / maxCheckIn) * 100}%`, minHeight: '4px' }} title={`Day ${i + 1}: ${count} check-ins`} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/50">
              {checkIns.reduce((a, b) => a + b, 0)} total check-ins this month — keep showing up!
            </p>
          </Card>
        </FadeIn>
      </Section>
    </>
  );
}
