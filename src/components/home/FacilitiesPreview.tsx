'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { FadeIn } from '@/components/motion';

const PREVIEW_AREAS = [
  {
    title: 'Weight Training',
    description: 'Power racks, free weights, and machines for every training style.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    title: 'Cardio Zone',
    description: 'Commercial treadmills, bikes, and rowers with entertainment screens.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
  },
  {
    title: 'Fitness Studio',
    description: 'Climate-controlled space for yoga, spin, HIIT, and group classes.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  },
];

export function FacilitiesPreview() {
  return (
    <Section dark id="facilities-preview">
      <SectionHeader
        title="World-Class Facilities"
        subtitle="Three distinct training environments designed for every fitness goal."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {PREVIEW_AREAS.map((area, i) => (
          <FadeIn key={area.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-surface-border"
            >
              <div className="relative h-72">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
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
        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Explore All Facilities <ArrowRight size={18} />
        </Link>
      </FadeIn>
    </Section>
  );
}
