'use client';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { GymImage } from '@/components/ui/GymImage';
import { FadeIn } from '@/components/motion';
import { GALLERY_WALKTHROUGH, IMAGES } from '@/lib/images';

export function VirtualTourSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    { title: 'Main Training Floor', image: IMAGES.hero, fallback: IMAGES.heroFallback, description: 'Free weights, machines, and open training space.' },
    { title: 'Box Gym', image: IMAGES.boxGym, fallback: IMAGES.boxGymFallback, description: 'Functional fitness rigs, ropes, and CrossFit equipment.' },
    { title: 'Fitness Studio', image: IMAGES.studio, fallback: IMAGES.studioFallback, description: 'Group classes, spin, yoga, and HIIT.' },
    { title: 'Cardio Zone', image: IMAGES.cardio, fallback: IMAGES.cardioFallback, description: 'Treadmills, bikes, and rowers.' },
  ];

  const slides = GALLERY_WALKTHROUGH.map((s) => ({ src: s.src, alt: s.alt }));

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Take a Virtual Tour of Your Future Gym
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Walk through IC Fitness at 2716 South Park Drive — real equipment, real spaces, built for Broken Bow.
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <button
              type="button"
              onClick={() => { setIndex(activeScene); setOpen(true); }}
              className="group relative block h-[420px] w-full overflow-hidden rounded-2xl border border-surface-border"
            >
              <GymImage
                src={scenes[activeScene].image}
                fallback={scenes[activeScene].fallback}
                alt={scenes[activeScene].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-left">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Virtual Walkthrough</p>
                <h3 className="font-display text-2xl font-bold text-white">{scenes[activeScene].title}</h3>
                <p className="mt-1 text-sm text-white/70">{scenes[activeScene].description}</p>
                <p className="mt-3 text-xs text-white/50">Click to open full gallery →</p>
              </div>
            </button>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-3">
            {scenes.map((scene, i) => (
              <button
                key={scene.title}
                type="button"
                onClick={() => setActiveScene(i)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                  activeScene === i ? 'border-accent bg-accent-muted' : 'border-surface-border bg-surface hover:border-accent/30'
                }`}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <GymImage src={scene.image} fallback={scene.fallback} alt={scene.title} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-semibold text-white">{scene.title}</p>
                  <p className="text-xs text-white/50 line-clamp-2">{scene.description}</p>
                </div>
              </button>
            ))}
          </FadeIn>
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Thumbnails]}
          on={{ view: ({ index: i }) => setIndex(i) }}
        />
      </div>
    </section>
  );
}
