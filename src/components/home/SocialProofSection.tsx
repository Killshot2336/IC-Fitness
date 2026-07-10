'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Facebook, Heart, MessageCircle } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { INSTAGRAM_POSTS, TESTIMONIALS } from '@/lib/data/home';
import { SITE } from '@/lib/constants';

export function SocialProofSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const next = () => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <Section id="social-proof">
      <SectionHeader
        title="Trusted by Our Community"
        subtitle="Real members. Real results. Join 500+ athletes who call IC Fitness home."
      />

      <div className="mb-16 grid gap-8 sm:grid-cols-3">
        <FadeIn className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <p className="font-display text-4xl font-bold text-accent">4.9</p>
          <p className="mt-2 text-sm text-white/60">Average Rating</p>
        </FadeIn>
        <FadeIn delay={0.1} className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <p className="font-display text-4xl font-bold text-accent">
            <AnimatedCounter value={500} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-white/60">Happy Members</p>
        </FadeIn>
        <FadeIn delay={0.2} className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <Facebook className="mb-2 text-accent transition-transform group-hover:scale-110" size={32} />
            <p className="font-display text-4xl font-bold text-accent">
              <AnimatedCounter value={1200} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-white/60">Facebook Followers</p>
          </a>
        </FadeIn>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <FadeIn>
          <h3 className="mb-6 font-display text-2xl font-bold text-white">Member Stories</h3>
          <div className="relative rounded-2xl border border-surface-border bg-surface p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg italic text-white/80">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {TESTIMONIALS[activeTestimonial].image ? (
                    <Image
                      src={TESTIMONIALS[activeTestimonial].image!}
                      alt={TESTIMONIALS[activeTestimonial].name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-bold text-white">
                      {TESTIMONIALS[activeTestimonial].name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-sm text-secondary">★★★★★</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={prev} className="rounded-full bg-charcoal-800 p-2 text-white/70 hover:text-white" aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={next} className="rounded-full bg-charcoal-800 p-2 text-white/70 hover:text-white" aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h3 className="mb-6 font-display text-2xl font-bold text-white">@ICFitness on Instagram</h3>
          <StaggerContainer className="grid grid-cols-2 gap-3">
            {INSTAGRAM_POSTS.map((post) => (
              <StaggerItem key={post.id}>
                <div className="group relative overflow-hidden rounded-xl border border-surface-border">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    width={300}
                    height={300}
                    className="aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs text-white/90 line-clamp-2">{post.caption}</p>
                    <div className="mt-2 flex gap-3 text-xs text-white/70">
                      <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} /> 12</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </Section>
  );
}
