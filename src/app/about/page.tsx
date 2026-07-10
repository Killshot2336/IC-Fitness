import type { Metadata } from 'next';
import Image from 'next/image';
import { Section, SectionHeader } from '@/components/layout/Section';
import { FadeIn } from '@/components/motion';
import { Card, Badge } from '@/components/ui';
import { TIMELINE } from '@/lib/data/home';
import { TRAINERS as TEAM } from '@/lib/data/classes';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the IC Fitness team and discover our story in Broken Bow, Oklahoma.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80"
          alt="IC Fitness team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h1 className="font-display text-5xl font-black text-white">Our Story</h1>
            <p className="mt-2 text-lg text-white/70">Inspiring Broken Bow since 2023</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          title="The IC Fitness Journey"
          subtitle="From a vision to Southeast Oklahoma's premier training destination."
        />
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

      <Section dark id="team">
        <SectionHeader title="Meet Our Team" subtitle="Expert coaches dedicated to your success." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((trainer, i) => (
            <FadeIn key={trainer.id} delay={i * 0.08}>
              <Card hover className="group overflow-hidden p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-sm text-accent">{trainer.role}</p>
                  <p className="mt-3 text-sm text-white/60 group-hover:hidden">{trainer.bio.slice(0, 80)}…</p>
                  <div className="mt-3 hidden group-hover:block">
                    <p className="text-sm text-white/70">{trainer.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {trainer.specialties.map((s) => (
                        <Badge key={s} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="leadership">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
              alt="Candy - Director of Operations"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="font-display text-4xl font-bold text-white">Meet Candy</h2>
            <p className="mt-2 font-semibold text-secondary">Director of Operations</p>
            <p className="mt-6 text-white/70 leading-relaxed">
              IC Fitness operates under the direct leadership of Candy, focusing on providing high-tier
              athletic training facilities and tailored membership services within the Broken Bow region.
            </p>
            <blockquote className="mt-6 border-l-4 border-accent pl-4 italic text-white/80">
              &ldquo;Let me INSPIRE you so that you can INSPIRE others!&rdquo;
            </blockquote>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
