import type { Testimonial } from '@/types';

export const STATS = [
  { value: 500, suffix: '+', label: 'Active Members' },
  { value: 3, suffix: '', label: 'Years Strong' },
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
  {
    id: '2',
    name: 'Sarah L.',
    quote:
      'Super easy drop-in process when visiting for the weekend. Great equipment and clean facility. Will definitely be back!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Tom H.',
    quote:
      'The CrossFit area is incredible! Best rig I\'ve used outside of a dedicated CrossFit box. Classes are challenging but welcoming.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Jessica M.',
    quote:
      'Premium feels premium here. From the locker rooms to the coaching staff, IC Fitness is on another level for Southeast Oklahoma.',
    rating: 5,
  },
];

export const COMMUNITY_EVENTS = [
  {
    id: '1',
    title: 'Summer Shred Challenge',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    date: 'Jun 2026',
  },
  {
    id: '2',
    title: 'Charity Lift-A-Thon',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2f2b36d7a?w=600&q=80',
    date: 'Apr 2026',
  },
  {
    id: '3',
    title: 'Member Appreciation BBQ',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    date: 'Mar 2026',
  },
  {
    id: '4',
    title: 'New Year Transformation',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80',
    date: 'Jan 2026',
  },
];

export const TIMELINE = [
  { year: '2023', title: 'IC Fitness Opens', description: 'Launched as Broken Bow\'s premier 24/7 training facility.' },
  { year: '2024', title: 'Studio Expansion', description: 'Added dedicated fitness studio and expanded class schedule.' },
  { year: '2025', title: 'Box Gym Upgrade', description: 'Installed professional CrossFit rig and functional training zone.' },
  { year: '2026', title: '500+ Members', description: 'Celebrated 500 active members and launched digital member portal.' },
];

export const INSTAGRAM_POSTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    caption: 'Monday motivation hits different at IC Fitness 💪',
    likes: 128,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    caption: 'CrossFit night was 🔥 New PRs all around!',
    likes: 96,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
    caption: 'Train on your time — we\'re always open.',
    likes: 74,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    caption: 'Find your flow with Emily\'s yoga classes 🧘',
    likes: 62,
  },
];
