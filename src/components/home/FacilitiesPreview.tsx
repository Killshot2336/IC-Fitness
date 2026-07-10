'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { IMAGES } from '@/lib/images';

const PREVIEW_AREAS = [
  {
    title: 'Weight Training',
    description: 'Power racks, dumbbells, and machines on our main floor — built for serious lifters.',
    image: IMAGES.weights,
    fallback: IMAGES.weightsFallback,
  },
  {
    title: 'Box Gym',
    description: 'Our functional training space with rigs, ropes, and CrossFit equipment.',
    image: IMAGES.boxGym,
    fallback: IMAGES.boxGymFallback,
  },
  {
    title: 'Fitness Studio',
    description: 'Group classes, spin, yoga, and HIIT in our climate-controlled studio.',
    image: IMAGES.studio,
    fallback: IMAGES.studioFallback,
  },
];

export function FacilitiesPreview() {
  return (
    <Section dark id="facilities-preview">
      <SectionHeader
        title="Real Equipment. Real Spaces."
        subtitle="Traditional gym, box gym, and fitness studio — all at 2716 South Park Drive."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {PREVIEW_AREAS.map((area, i) => (
          <FadeIn key={area.title} delay={i * 0.1}>
            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group relative overflow-hidden rounded-2xl border border-surface-border">
              <div className="relative h-72">
                <GymImage src={area.image} fallback={area.fallback} alt={`IC Fitness ${area.title}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white">{area.title}</h3>
                <p className="mt-2 text-sm text-white/70">{area.description}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-12 text-center">
        <Link href="/facilities" className="inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover">
          Take the Virtual Tour <ArrowRight size={18} />
        </Link>
      </FadeIn>
    </Section>
  );
}
