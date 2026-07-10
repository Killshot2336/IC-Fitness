export type IntensityLevel = 'beginner' | 'intermediate' | 'advanced';

export interface MembershipTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  stripePriceIdMonthly?: string;
  stripePriceIdAnnual?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  certifications: string[];
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  intensity: IntensityLevel;
  image: string;
  duration: number;
  capacity: number;
}

export interface ClassSession {
  id: string;
  classId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  seatsRemaining: number;
}

export interface FacilityArea {
  id: string;
  name: string;
  description: string;
  image: string;
  equipment: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  area: string;
  muscleGroups: string[];
  specs: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image?: string;
  rating: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage?: { asset: { url: string } };
  author?: { name: string; image?: { asset: { url: string } } };
  body?: unknown;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  membershipTier?: string;
  stripeCustomerId?: string;
}

export interface ClassBooking {
  id: string;
  userId: string;
  sessionId: string;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  createdAt: string;
}
