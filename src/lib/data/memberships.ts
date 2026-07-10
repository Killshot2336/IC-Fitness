import type { MembershipTier } from '@/types';

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 35,
    annualPrice: 350,
    description: 'Essential gym access for the dedicated lifter',
    features: [
      '24/7 Key Fob Access',
      'Full Equipment Use',
      'Locker Room Access',
      'Free Fitness Assessment',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 45,
    annualPrice: 450,
    description: 'Full access plus classes and guest privileges',
    popular: true,
    features: [
      'Everything in Basic',
      'Unlimited Group Classes',
      '2 Guest Passes/Month',
      'Priority Class Booking',
      'Workout Tracker App',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 75,
    annualPrice: 750,
    description: 'Ultimate experience with personal training included',
    features: [
      'Everything in Premium',
      '2 PT Sessions/Month',
      'Nutrition Consultation',
      'Unlimited Guest Passes',
      'Exclusive Merch Discount',
    ],
  },
];

export const VISITOR_PASSES = [
  { id: 'day', name: 'Day Pass', price: 20, description: 'Full 24-hour access' },
  { id: '3day', name: '3-Day Pass', price: 50, description: 'Perfect for weekend trips' },
  { id: 'weekly', name: 'Weekly Pass', price: 75, description: '7 consecutive days' },
];

export const MEMBERSHIP_FAQ = [
  {
    question: 'Can I cancel my membership anytime?',
    answer:
      'Yes. All memberships can be cancelled with 30 days notice. Annual plans receive a prorated refund for unused months.',
  },
  {
    question: 'Is there a joining fee?',
    answer:
      'New members pay a one-time $49 enrollment fee which includes your key fob, fitness assessment, and welcome kit.',
  },
  {
    question: 'Can I freeze my membership?',
    answer:
      'Members can freeze their account for up to 3 months per year for medical or travel reasons at no additional cost.',
  },
  {
    question: 'Do you offer family discounts?',
    answer:
      'Yes! Add a family member at 20% off any tier when signing up together.',
  },
];
