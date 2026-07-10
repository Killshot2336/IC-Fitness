import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Card } from '@/components/ui';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { TRAINERS } from '@/lib/data/classes';
import { TIMELINE } from '@/lib/data/home';
import { SITE } from '@/lib/constants';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the IC Fitness team in Broken Bow, OK. Locally owned, 11 years strong, 1,494+ members.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <GymImage src={IMAGES.about} fallback={IMAGES.heroFallback} alt="IC Fitness team and facility" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Our Story</h1>
            <p className="mt-2 text-lg text-white/70">11 Years Strong in Broken Bow</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="text-lg leading-relaxed text-white/75">
              IC Fitness opened April 3rd, 2023 at <strong className="text-white">{SITE.address.street}</strong> when{' '}
              {SITE.owner} turned a lifelong dream into Broken Bow&apos;s only true 24/7 gym. What started with community
              support and an SBA loan has grown into a <strong className="text-white">1,494+ member</strong> family —
              traditional gym, box gym, and fitness studio all under one roof.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              We&apos;re not a franchise. We&apos;re your neighbors. Next door to{' '}
              <strong className="text-accent">{SITE.partner.name}</strong>, we&apos;re part of the South Park Drive
              community that makes Southeast Oklahoma special.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Our Journey" />
        <div className="relative mx-auto max-w-3xl">
          {TIMELINE.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.1}>
              <div className="relative border-l-2 border-accent/30 pb-12 pl-8 last:pb-0">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-accent" />
                <p className="font-display text-sm font-bold text-accent">{item.year}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-white/60">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="team">
        <SectionHeader title="Meet Our Broken Bow Trainers" subtitle="Real coaches who know your name." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINERS.map((trainer, i) => (
            <FadeIn key={trainer.id} delay={i * 0.08}>
              <Card hover className="group overflow-hidden p-0">
                <div className="relative h-64 overflow-hidden">
                  <GymImage src={trainer.image} fallback={IMAGES.heroFallback} alt={trainer.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-sm text-accent">{trainer.role}</p>
                  <p className="mt-3 text-sm text-white/70">{trainer.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {trainer.specialties.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section dark id="leadership">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <GymImage
              src={IMAGES.candy}
              fallback={IMAGES.candyFallback}
              alt="Candy Tipton - Owner of IC Fitness"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="font-display text-4xl font-bold text-white">Meet Candy Tipton</h2>
            <p className="mt-2 font-semibold text-secondary">Owner & Director of Operations</p>
            <p className="mt-6 leading-relaxed text-white/70">
              A personal trainer since 2017, Candy built IC Fitness to give Broken Bow a gym that matches the work ethic
              of this community. From the loan application to the grand opening, she&apos;s been hands-on every step.
            </p>
            <blockquote className="mt-6 border-l-4 border-accent pl-4 italic text-white/80">
              &ldquo;{SITE.motto}&rdquo;
            </blockquote>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
