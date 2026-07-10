'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { CLASSES, CLASS_SESSIONS, TRAINERS, DAY_NAMES } from '@/lib/data/classes';

const INTENSITY_VARIANT = {
  beginner: 'accent' as const,
  intermediate: 'secondary' as const,
  advanced: 'default' as const,
};

export default function ClassesPage() {
  const [dayFilter, setDayFilter] = useState<number | 'all'>('all');
  const [intensityFilter, setIntensityFilter] = useState<string>('all');

  const filteredSessions =
    dayFilter === 'all'
      ? CLASS_SESSIONS
      : CLASS_SESSIONS.filter((s) => s.dayOfWeek === dayFilter);

  const filteredClasses =
    intensityFilter === 'all'
      ? CLASSES
      : CLASSES.filter((c) => c.intensity === intensityFilter);

  const bookClass = async (sessionId: string) => {
    const res = await fetch('/api/classes/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
    const data = await res.json();
    if (data.success) alert('Class booked successfully!');
    else alert(data.error ?? 'Please sign in to book classes.');
  };

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80"
          alt="Group fitness class"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Classes</h1>
            <p className="mt-2 text-lg text-white/70">From CrossFit to yoga — find your perfect class.</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader title="Weekly Schedule" subtitle="Click a class to register. Premium members get priority booking." />
        <div className="mb-6 flex flex-wrap gap-2">
          <Button size="sm" variant={dayFilter === 'all' ? 'primary' : 'outline'} onClick={() => setDayFilter('all')}>
            All Days
          </Button>
          {DAY_NAMES.map((day, i) => (
            <Button
              key={day}
              size="sm"
              variant={dayFilter === i ? 'primary' : 'outline'}
              onClick={() => setDayFilter(i)}
            >
              {day}
            </Button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-surface-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-charcoal-900 text-accent">
              <tr>
                <th className="p-4">Day</th>
                <th className="p-4">Time</th>
                <th className="p-4">Class</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => {
                const gymClass = CLASSES.find((c) => c.id === session.classId)!;
                const instructor = TRAINERS.find((t) => t.id === gymClass.instructorId);
                return (
                  <tr key={session.id} className="border-t border-surface-border bg-surface">
                    <td className="p-4">{DAY_NAMES[session.dayOfWeek]}</td>
                    <td className="p-4">{session.startTime}</td>
                    <td className="p-4 font-semibold">{gymClass.name}</td>
                    <td className="p-4">{instructor?.name}</td>
                    <td className="p-4">{session.seatsRemaining} left</td>
                    <td className="p-4">
                      <Button size="sm" onClick={() => bookClass(session.id)}>Reserve</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Class Catalog" />
        <div className="mb-6 flex gap-2">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <Button
              key={level}
              size="sm"
              variant={intensityFilter === level ? 'primary' : 'outline'}
              onClick={() => setIntensityFilter(level)}
            >
              {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((gymClass, i) => {
            const instructor = TRAINERS.find((t) => t.id === gymClass.instructorId);
            return (
              <FadeIn key={gymClass.id} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface">
                  <div className="relative h-48">
                    <Image src={gymClass.image} alt={gymClass.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <Badge variant={INTENSITY_VARIANT[gymClass.intensity]}>{gymClass.intensity}</Badge>
                    <h3 className="mt-3 font-display text-xl font-bold text-white">{gymClass.name}</h3>
                    <p className="mt-2 text-sm text-white/60">{gymClass.description}</p>
                    <p className="mt-3 text-sm text-accent">with {instructor?.name}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our Instructors" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINERS.map((trainer, i) => (
            <FadeIn key={trainer.id} delay={i * 0.08}>
              <div className="text-center">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-2 border-accent/30">
                  <Image src={trainer.image} alt={trainer.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-sm text-accent">{trainer.role}</p>
                <p className="mt-2 text-sm text-white/60">{trainer.bio}</p>
                <Link href="/classes" className="mt-4 inline-block">
                  <Button size="sm" variant="outline">Book Class</Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
