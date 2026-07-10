export const SITE = {
  name: 'IC Fitness',
  tagline: "Broken Bow's 24/7 Gym. Real Equipment. Real Community. Real Results.",
  motto: 'Let me INSPIRE you so that you can INSPIRE others!',
  owner: 'Candy Tipton',
  founded: '2023',
  yearsStrong: 4,
  memberCount: 560,
  facebookFollowers: '1.9K',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://icfitness.com',
  phone: '580-743-7955',
  email: 'icfitness2023tipton@gmail.com',
  address: {
    street: '2716 South Park Drive',
    streetShort: '2716 S Park Dr',
    city: 'Broken Bow',
    state: 'OK',
    zip: '74728',
    country: 'US',
  },
  geo: { lat: 34.0293, lng: -94.7391 },
  social: {
    facebook: 'https://www.facebook.com/ICFitness2',
    instagram: 'https://www.instagram.com/candyfit_tipton',
  },
  partner: {
    name: 'Blend & Believe',
    description: 'Our neighbor next door — grab a post-workout smoothie or wellness boost.',
  },
  hours: 'Open 24/7 for members',
  staffedHours: 'Mon–Fri 9AM–6PM',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/memberships', label: 'Memberships' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/classes', label: 'Classes' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;
