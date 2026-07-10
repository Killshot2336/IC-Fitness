import type { Testimonial } from '@/types';
import { IMAGES } from '@/lib/images';

export const STATS = [
  { value: 560, suffix: '+', label: 'Active Members' },
  { value: 4, suffix: '', label: 'Years Strong' },
  { value: 15, suffix: '+', label: 'Weekly Classes' },
  { value: '24/7', label: 'Access Daily', isText: true },
] as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mike R.',
    quote:
      'The atmosphere puts you in beast mode. Equipment is top-notch and the 24/7 access fits my crazy schedule. Best gym in Broken Bow!',
    rating: 5,
  },
];

export const COMMUNITY_EVENTS = [
  {
    id: '1',
    title: 'Kaitlyn Clouse Powerlifting Competition',
    image: IMAGES.eventKaitlyn,
    imageFallback: IMAGES.eventKaitlynFallback,
    date: 'Community Event',
    description: 'IC Fitness members showing out at local competition — proud of our athletes!',
  },
  {
    id: '2',
    title: 'New Equipment Day',
    image: IMAGES.equipment,
    imageFallback: IMAGES.equipmentFallback,
    date: 'Facility Upgrade',
    description: 'Fresh gear on the floor — because Broken Bow deserves better.',
  },
  {
    id: '3',
    title: 'Member Appreciation Night',
    image: IMAGES.community,
    imageFallback: IMAGES.communityFallback,
    date: 'IC Family',
    description: 'Celebrating the community that built IC Fitness at 2716 South Park Drive.',
  },
  {
    id: '4',
    title: 'Blend & Believe Partner Perk',
    image: IMAGES.studio,
    imageFallback: IMAGES.studioFallback,
    date: 'Local Partnership',
    description: 'IC Fitness members get exclusive perks at Blend & Believe next door.',
  },
];

export const TIMELINE = [
  {
    year: '2023',
    title: 'Grand Opening — April 3rd',
    description:
      'Candy Tipton opens IC Fitness at 2716 South Park Drive after securing an SBA loan with help from the Oklahoma SBDC. Broken Bow finally gets a true 24/7 gym.',
  },
  {
    year: '2024',
    title: 'Studio & Class Expansion',
    description:
      'Added our dedicated fitness studio and grew the weekly class schedule — yoga, spin, HIIT, and CrossFit for the IC Family.',
  },
  {
    year: '2025',
    title: 'Box Gym Upgrade',
    description:
      'Installed professional functional training equipment and expanded our box gym — the rig our members asked for.',
  },
  {
    year: '2026',
    title: '4 Years Strong · 560+ Members',
    description:
      'Four years of INSPIRE-ing Broken Bow. Partnered with Blend & Believe next door and launched our digital member portal.',
  },
];

export const FACEBOOK_POSTS = [
  {
    id: '1',
    image: IMAGES.hero,
    imageFallback: IMAGES.heroFallback,
    caption: 'Another night at IC Fitness on South Park Drive. Who\'s training tonight? 💪',
    likes: 128,
  },
  {
    id: '2',
    image: IMAGES.boxGym,
    imageFallback: IMAGES.boxGymFallback,
    caption: 'New equipment on the floor! Come see what we added.',
    likes: 96,
  },
  {
    id: '3',
    image: IMAGES.community,
    imageFallback: IMAGES.communityFallback,
    caption: '24/7 access means YOUR schedule runs the show. Key fob in, grind out.',
    likes: 74,
  },
  {
    id: '4',
    image: IMAGES.eventKaitlyn,
    imageFallback: IMAGES.eventKaitlynFallback,
    caption: 'Proud of Kaitlyn Clouse and every IC athlete representing at competition!',
    likes: 112,
  },
];
