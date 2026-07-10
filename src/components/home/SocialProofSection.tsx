'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Facebook, Heart, MessageCircle } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { GymImage } from '@/components/ui/GymImage';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { FACEBOOK_POSTS, TESTIMONIALS } from '@/lib/data/home';
import { SITE } from '@/lib/constants';

export function SocialProofSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = TESTIMONIALS[activeTestimonial];

  return (
    <Section id="social-proof">
      <SectionHeader
        title="Trusted by Broken Bow"
        subtitle="Real members. Real reviews. Follow us @ICFitness2 on Facebook."
      />

      <div className="mb-16 grid gap-8 sm:grid-cols-3">
        <FadeIn className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <p className="font-display text-4xl font-bold text-accent">4.9</p>
          <p className="mt-2 text-sm text-white/60">Average Rating</p>
        </FadeIn>
        <FadeIn delay={0.1} className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <p className="font-display text-4xl font-bold text-accent">
            <AnimatedCounter value={SITE.memberCount} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-white/60">Active Members</p>
        </FadeIn>
        <FadeIn delay={0.2} className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
          <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
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
          <h3 className="mb-6 font-display text-2xl font-bold text-white">What Members Say</h3>
          <div className="relative rounded-2xl border border-surface-border bg-surface p-8">
            <AnimatePresence mode="wait">
              <motion.div key={testimonial.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-lg italic text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-secondary font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-secondary">★★★★★ · IC Fitness Member</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {TESTIMONIALS.length > 1 ? (
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="rounded-full bg-charcoal-800 p-2 text-white/70 hover:text-white" aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)} className="rounded-full bg-charcoal-800 p-2 text-white/70 hover:text-white" aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </div>
            ) : null}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h3 className="mb-6 font-display text-2xl font-bold text-white">From Our Facebook</h3>
          <StaggerContainer className="grid grid-cols-2 gap-3">
            {FACEBOOK_POSTS.map((post) => (
              <StaggerItem key={post.id}>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl border border-surface-border"
                >
                  <div className="relative aspect-square">
                    <GymImage src={post.image} fallback={post.imageFallback} alt={post.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs text-white/90 line-clamp-2">{post.caption}</p>
                    <div className="mt-2 flex gap-3 text-xs text-white/70">
                      <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} /> FB</span>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </Section>
  );
}
