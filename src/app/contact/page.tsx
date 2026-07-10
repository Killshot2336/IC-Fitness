'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Button, Input } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { SITE } from '@/lib/constants';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px]">
        <iframe
          title="IC Fitness location map"
          src={`https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=15&output=embed`}
          className="absolute inset-0 h-full w-full border-0 grayscale contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal-900/60" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Contact Us</h1>
            <p className="mt-2 text-lg text-white/70">We&apos;d love to hear from you.</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-white">Get In Touch</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <MapPin className="shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-white/60">
                    {SITE.address.street}<br />
                    {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="text-white/60 hover:text-accent">{SITE.phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-accent">{SITE.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <p className="text-white/60">{SITE.hours}</p>
                  <p className="text-sm text-white/40">Staffed: {SITE.staffedHours}</p>
                </div>
              </li>
            </ul>
            <div className="relative mt-8 h-48 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="IC Fitness building exterior"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-surface-border bg-surface p-8">
              <SectionHeader title="Send a Message" align="left" />
              <div className="space-y-4">
                <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-surface-border bg-charcoal-900 px-4 py-3 text-white focus:border-accent focus:outline-none"
                  />
                </div>
                <Button type="submit" className="w-full" isLoading={status === 'loading'}>
                  Send Message
                </Button>
                {status === 'success' ? (
                  <p className="text-center text-sm text-accent">Message sent! We&apos;ll be in touch soon.</p>
                ) : null}
                {status === 'error' ? (
                  <p className="text-center text-sm text-accent">Something went wrong. Please try again.</p>
                ) : null}
              </div>
            </form>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
