'use client';

import { useState, useCallback, type ElementType } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Car, Droplets, Lock, ParkingCircle, Wifi, Baby } from 'lucide-react';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { FACILITY_AREAS, EQUIPMENT_CATALOG, AMENITIES } from '@/lib/data/facilities';

const AMENITY_ICONS: Record<string, ElementType> = {
  parking: ParkingCircle,
  towel: Droplets,
  wifi: Wifi,
  water: Droplets,
  lock: Lock,
  child: Baby,
};

const GALLERY_IMAGES = FACILITY_AREAS.map((a) => ({ src: a.image, alt: a.name }));

export default function FacilitiesPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [areaFilter, setAreaFilter] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState<(typeof EQUIPMENT_CATALOG)[0] | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const filteredEquipment =
    areaFilter === 'all'
      ? EQUIPMENT_CATALOG
      : EQUIPMENT_CATALOG.filter((e) => e.area === areaFilter);

  return (
    <>
      <section className="relative min-h-[60vh]">
        <div className="absolute inset-0 bg-charcoal-900">
          <iframe
            title="IC Fitness 360° Virtual Tour"
            src="https://www.youtube-nocookie.com/embed/ml6cT4AZdqI?rel=0"
            className="h-full w-full opacity-60"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex min-h-[60vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <Badge variant="accent" className="mb-4">Virtual Tour</Badge>
            <h1 className="font-display text-5xl font-black text-white">Our Facilities</h1>
            <p className="mt-4 max-w-xl text-lg text-white/70">
              Explore our 360° virtual tour and discover why IC Fitness is Broken Bow&apos;s premier training destination.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader title="Equipment Showcase" subtitle="Filter by area to explore our premium equipment." />
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={areaFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => setAreaFilter('all')}
          >
            All
          </Button>
          {FACILITY_AREAS.map((area) => (
            <Button
              key={area.id}
              size="sm"
              variant={areaFilter === area.id ? 'primary' : 'outline'}
              onClick={() => setAreaFilter(area.id)}
            >
              {area.name}
            </Button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredEquipment.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setSelectedEquipment(item)}
                className="group w-full overflow-hidden rounded-2xl border border-surface-border bg-surface text-left transition-colors hover:border-accent/40"
              >
                <div className="relative h-40">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-accent">{item.brand}</p>
                  <h3 className="font-display font-bold text-white">{item.name}</h3>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </Section>

      {FACILITY_AREAS.map((area) => (
        <Section key={area.id} dark={area.id === 'studio'}>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-display text-3xl font-bold text-white">{area.name}</h2>
              <p className="mt-4 text-white/60">{area.description}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {area.equipment.map((eq) => (
                  <li key={eq} className="text-sm text-white/70">• {eq}</li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative h-80 overflow-hidden rounded-2xl">
                <Image src={area.image} alt={area.name} fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeader title="Photo Gallery" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => openLightbox(i)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform hover:scale-105" />
            </button>
          ))}
        </div>
        <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} index={lightboxIndex} slides={GALLERY_IMAGES} />
      </Section>

      <Section dark>
        <SectionHeader title="Amenities" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity) => {
            const Icon = AMENITY_ICONS[amenity.icon] ?? Car;
            return (
              <FadeIn key={amenity.label}>
                <div className="flex gap-4 rounded-2xl border border-surface-border bg-surface p-6">
                  <Icon className="shrink-0 text-accent" size={28} />
                  <div>
                    <h3 className="font-display font-bold text-white">{amenity.label}</h3>
                    <p className="mt-1 text-sm text-white/60">{amenity.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {selectedEquipment ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedEquipment(null)}
          role="presentation"
        >
          <div
            className="max-w-lg rounded-2xl border border-surface-border bg-charcoal-800 p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="font-display text-2xl font-bold text-white">{selectedEquipment.name}</h3>
            <p className="mt-1 text-accent">{selectedEquipment.brand}</p>
            <p className="mt-4 text-white/70">{selectedEquipment.specs}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedEquipment.muscleGroups.map((mg) => (
                <Badge key={mg} variant="outline">{mg}</Badge>
              ))}
            </div>
            <Button className="mt-6" onClick={() => setSelectedEquipment(null)}>Close</Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
