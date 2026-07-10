'use client';

import { Section, SectionHeader } from '@/components/layout/Section';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { COMMUNITY_EVENTS, STATS } from '@/lib/data/home';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SITE } from '@/lib/constants';

export function CommunitySection() {
  return (
    <>
      <Section dark>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
                <p className="font-display text-4xl font-bold text-accent">
                  {'isText' in stat && stat.isText ? (
                    stat.value
                  ) : (
                    <AnimatedCounter
                      value={stat.value as number}
                      start={'start' in stat ? stat.start : undefined}
                      suffix={'suffix' in stat ? stat.suffix : ''}
                    />
                  )}
                </p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="community">
        <SectionHeader
          title="The IC Family in Broken Bow"
          subtitle={`Located at ${SITE.address.street}, next door to ${SITE.partner.name}. This is our community — not a corporate chain.`}
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_EVENTS.map((event) => (
            <StaggerItem key={event.id}>
              <div className="group overflow-hidden rounded-2xl border border-surface-border">
                <div className="relative h-48 overflow-hidden">
                  <GymImage
                    src={event.image}
                    fallback={event.imageFallback}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{event.date}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{event.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{event.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
