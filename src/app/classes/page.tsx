'use client';

import { useState } from 'react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Button } from '@/components/ui';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { ClassBookingModal } from '@/components/classes/ClassBookingModal';
import { CLASSES, CLASS_SESSIONS, TRAINERS, DAY_NAMES, DAY_NAMES_FULL } from '@/lib/data/classes';
import { useMemberAuth } from '@/context/MemberAuthContext';
import { IMAGES } from '@/lib/images';

const INTENSITY_VARIANT = {
  beginner: 'accent' as const,
  intermediate: 'secondary' as const,
  advanced: 'default' as const,
};

type BookingTarget = {
  sessionId: string;
  className: string;
  day: string;
  time: string;
  instructor: string;
};

export default function ClassesPage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null);
  const { addBooking } = useMemberAuth();

  const daySessions = CLASS_SESSIONS.filter((s) => s.dayOfWeek === selectedDay);

  const handleBook = (data: { name: string; email: string; membershipNumber: string }) => {
    if (!bookingTarget) return;
    addBooking({
      className: bookingTarget.className,
      day: bookingTarget.day,
      time: bookingTarget.time,
      instructor: bookingTarget.instructor,
    });
  };

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <GymImage src={IMAGES.classes} fallback={IMAGES.classes} alt="IC Fitness class in session" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Classes</h1>
            <p className="mt-2 text-lg text-white/70">CrossFit, HIIT, and strength — coached by our Broken Bow team.</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader title="Weekly Schedule" subtitle="Select a day, then book your spot. Premium members get priority." />

        <div className="mb-8 grid grid-cols-7 gap-2">
          {DAY_NAMES.map((day, i) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(i)}
              className={`rounded-xl border py-3 text-center text-sm font-semibold transition-colors ${
                selectedDay === i ? 'border-accent bg-accent text-white' : 'border-surface-border bg-surface text-white/60 hover:border-accent/40'
              }`}
            >
              <span className="block text-xs opacity-70">{day}</span>
              <span className="block">{DAY_NAMES_FULL[i].slice(0, 3)}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {daySessions.length === 0 ? (
            <p className="rounded-2xl border border-surface-border bg-surface p-8 text-center text-white/60">
              No classes scheduled for {DAY_NAMES_FULL[selectedDay]}. Check another day or train open gym 24/7.
            </p>
          ) : (
            daySessions.map((session) => {
              const gymClass = CLASSES.find((c) => c.id === session.classId)!;
              const instructor = TRAINERS.find((t) => t.id === gymClass.instructorId);
              return (
                <FadeIn key={session.id}>
                  <div className="flex flex-col gap-4 rounded-2xl border border-surface-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-accent">{session.startTime} – {session.endTime}</p>
                      <h3 className="font-display text-xl font-bold text-white">{gymClass.name}</h3>
                      <p className="text-sm text-white/60">with {instructor?.name}</p>
                      <Badge variant={INTENSITY_VARIANT[gymClass.intensity]} className="mt-2">{gymClass.intensity}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-white/50">{session.seatsRemaining} spots left</span>
                      <Button
                        size="sm"
                        onClick={() =>
                          setBookingTarget({
                            sessionId: session.id,
                            className: gymClass.name,
                            day: DAY_NAMES_FULL[session.dayOfWeek],
                            time: session.startTime,
                            instructor: instructor?.name ?? 'IC Coach',
                          })
                        }
                      >
                        Book Class
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              );
            })
          )}
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Meet Our Broken Bow Trainers" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINERS.map((trainer, i) => (
            <FadeIn key={trainer.id} delay={i * 0.08}>
              <div className="text-center">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-2 border-accent/30">
                  <GymImage src={trainer.image} fallback={IMAGES.heroFallback} alt={trainer.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-sm text-accent">{trainer.role}</p>
                <p className="mt-2 text-sm text-white/60">{trainer.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {bookingTarget ? (
        <ClassBookingModal
          isOpen
          className={bookingTarget.className}
          day={bookingTarget.day}
          time={bookingTarget.time}
          instructor={bookingTarget.instructor}
          onClose={() => setBookingTarget(null)}
          onBook={handleBook}
        />
      ) : null}
    </>
  );
}
