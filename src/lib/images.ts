/**
 * IC Fitness image assets — all served from /public/images/ic-fitness/.
 * Replace individual files to swap in real Facebook exports when available.
 */

const LOCAL = {
  hero: '/images/ic-fitness/hero/gym-main.jpg',
  weights: '/images/ic-fitness/facilities/weight-floor.jpg',
  cardio: '/images/ic-fitness/facilities/cardio-zone.jpg',
  boxGym: '/images/ic-fitness/facilities/box-gym.jpg',
  studio: '/images/ic-fitness/facilities/fitness-studio.jpg',
  locker: '/images/ic-fitness/facilities/locker-rooms.jpg',
  exterior: '/images/ic-fitness/facilities/building-exterior.jpg',
  candy: '/images/ic-fitness/team/candy-tipton.jpg',
  coachSarah: '/images/ic-fitness/team/coach-sarah.jpg',
  coachMarcus: '/images/ic-fitness/team/coach-marcus.jpg',
  eventKaitlyn: '/images/ic-fitness/events/kaitlyn-clouse-competition.jpg',
  community: '/images/ic-fitness/community/member-workout.jpg',
  equipment: '/images/ic-fitness/facilities/new-equipment.jpg',
} as const;

/** Ultimate fallback when a specific asset fails to load */
const DEFAULT_FALLBACK = LOCAL.hero;

export const IMAGES = {
  hero: LOCAL.hero,
  heroFallback: DEFAULT_FALLBACK,
  weights: LOCAL.weights,
  weightsFallback: LOCAL.weights,
  cardio: LOCAL.cardio,
  cardioFallback: LOCAL.cardio,
  boxGym: LOCAL.boxGym,
  boxGymFallback: LOCAL.boxGym,
  studio: LOCAL.studio,
  studioFallback: LOCAL.studio,
  locker: LOCAL.locker,
  lockerFallback: LOCAL.locker,
  exterior: LOCAL.exterior,
  exteriorFallback: LOCAL.exterior,
  candy: LOCAL.candy,
  candyFallback: LOCAL.candy,
  coachSarah: LOCAL.coachSarah,
  coachSarahFallback: LOCAL.coachSarah,
  coachMarcus: LOCAL.coachMarcus,
  coachMarcusFallback: LOCAL.coachMarcus,
  eventKaitlyn: LOCAL.eventKaitlyn,
  eventKaitlynFallback: LOCAL.eventKaitlyn,
  community: LOCAL.community,
  communityFallback: LOCAL.community,
  equipment: LOCAL.equipment,
  equipmentFallback: LOCAL.equipment,
  memberships: LOCAL.community,
  classes: LOCAL.studio,
  about: LOCAL.hero,
  og: LOCAL.hero,
} as const;

export const GALLERY_WALKTHROUGH = [
  { src: LOCAL.hero, alt: 'IC Fitness main training floor — Broken Bow, OK' },
  { src: LOCAL.weights, alt: 'Free weights and power racks at IC Fitness' },
  { src: LOCAL.boxGym, alt: 'IC Fitness box gym and functional training area' },
  { src: LOCAL.studio, alt: 'IC Fitness group fitness studio' },
  { src: LOCAL.cardio, alt: 'Cardio equipment zone at IC Fitness' },
  { src: LOCAL.equipment, alt: 'New equipment at IC Fitness' },
] as const;
