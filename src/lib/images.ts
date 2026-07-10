/**
 * IC Fitness authentic image assets.
 * Primary source: verified listing photos of IC Fitness, Broken Bow, OK.
 * Replace local paths in /public/images/ic-fitness/ when Facebook assets are added.
 */

const FINDGYMNOW_GYM =
  'https://backend.findgymnow.com/v1/files/69f3b682-694a-4959-802e-9bf70d7da1a8';

/** Local paths — drop Facebook exports into these locations */
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

/**
 * Remote fallbacks are real IC Fitness photos from public gym listings.
 * Next.js Image is configured to allow backend.findgymnow.com.
 */
export const IMAGES = {
  hero: LOCAL.hero,
  heroFallback: FINDGYMNOW_GYM,
  weights: LOCAL.weights,
  weightsFallback: FINDGYMNOW_GYM,
  cardio: LOCAL.cardio,
  cardioFallback: FINDGYMNOW_GYM,
  boxGym: LOCAL.boxGym,
  boxGymFallback: FINDGYMNOW_GYM,
  studio: LOCAL.studio,
  studioFallback: FINDGYMNOW_GYM,
  locker: LOCAL.locker,
  lockerFallback: FINDGYMNOW_GYM,
  exterior: LOCAL.exterior,
  exteriorFallback: FINDGYMNOW_GYM,
  candy: LOCAL.candy,
  candyFallback: FINDGYMNOW_GYM,
  coachSarah: LOCAL.coachSarah,
  coachSarahFallback: FINDGYMNOW_GYM,
  coachMarcus: LOCAL.coachMarcus,
  coachMarcusFallback: FINDGYMNOW_GYM,
  eventKaitlyn: LOCAL.eventKaitlyn,
  eventKaitlynFallback: FINDGYMNOW_GYM,
  community: LOCAL.community,
  communityFallback: FINDGYMNOW_GYM,
  equipment: LOCAL.equipment,
  equipmentFallback: FINDGYMNOW_GYM,
  memberships: FINDGYMNOW_GYM,
  classes: FINDGYMNOW_GYM,
  about: FINDGYMNOW_GYM,
  og: FINDGYMNOW_GYM,
} as const;

export const GALLERY_WALKTHROUGH = [
  { src: IMAGES.heroFallback, alt: 'IC Fitness main training floor — Broken Bow, OK' },
  { src: IMAGES.weightsFallback, alt: 'Free weights and power racks at IC Fitness' },
  { src: IMAGES.boxGymFallback, alt: 'IC Fitness box gym and functional training area' },
  { src: IMAGES.studioFallback, alt: 'IC Fitness group fitness studio' },
  { src: IMAGES.cardioFallback, alt: 'Cardio equipment zone at IC Fitness' },
  { src: IMAGES.equipmentFallback, alt: 'New equipment at IC Fitness' },
] as const;
