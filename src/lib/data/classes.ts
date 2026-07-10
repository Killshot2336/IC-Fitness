import type { Trainer, GymClass, ClassSession } from '@/types';
import { IMAGES } from '@/lib/images';

export const TRAINERS: Trainer[] = [
  {
    id: 'candy',
    name: 'Candy Tipton',
    role: 'Owner & Director of Operations',
    bio: 'Personal trainer since 2017. Candy founded IC Fitness in 2023 to bring a premium 24/7 training home to Broken Bow. "Let me INSPIRE you so that you can INSPIRE others!"',
    image: IMAGES.candy,
    specialties: ['Leadership', 'Personal Training', 'Community Building'],
    certifications: ['Certified Personal Trainer'],
  },
  {
    id: 'sarah',
    name: 'Coach Sarah',
    role: 'CrossFit & HIIT Coach',
    bio: 'Broken Bow native who brings high-energy coaching to our 6 AM CrossFit and evening HIIT classes. Technique first, ego left at the door.',
    image: IMAGES.coachSarah,
    specialties: ['CrossFit', 'HIIT', 'Olympic Lifting'],
    certifications: ['CrossFit L1'],
  },
  {
    id: 'marcus',
    name: 'Marcus T.',
    role: 'Strength & Conditioning Coach',
    bio: 'NASM certified with 10+ years experience. Specializes in powerlifting and metabolic conditioning for all levels.',
    image: IMAGES.coachMarcus,
    specialties: ['Powerlifting', 'Strength Training', 'HIIT'],
    certifications: ['NASM-CPT', 'USAW Level 1'],
  },
];

export const CLASSES: GymClass[] = [
  {
    id: 'crossfit',
    name: 'CrossFit',
    description: 'High-intensity functional fitness on our box gym rig — ropes, Olympic lifting, and community energy.',
    instructorId: 'sarah',
    intensity: 'advanced',
    image: IMAGES.boxGym,
    duration: 60,
    capacity: 15,
  },
  {
    id: 'hiit',
    name: 'HIIT Blast',
    description: 'Maximum calorie burn with short bursts of intense work and active recovery.',
    instructorId: 'sarah',
    intensity: 'advanced',
    image: IMAGES.studio,
    duration: 45,
    capacity: 15,
  },
  {
    id: 'strength',
    name: 'Strength & Conditioning',
    description: 'Build muscle and power with structured weight training on our main floor.',
    instructorId: 'marcus',
    intensity: 'intermediate',
    image: IMAGES.weights,
    duration: 60,
    capacity: 12,
  },
];

/** Weekly schedule with Broken Bow coaches */
export const CLASS_SESSIONS: ClassSession[] = [
  { id: 'mon-6-crossfit', classId: 'crossfit', dayOfWeek: 1, startTime: '06:00', endTime: '07:00', seatsRemaining: 12 },
  { id: 'mon-530-hiit', classId: 'hiit', dayOfWeek: 1, startTime: '17:30', endTime: '18:15', seatsRemaining: 14 },
  { id: 'wed-6-crossfit', classId: 'crossfit', dayOfWeek: 3, startTime: '06:00', endTime: '07:00', seatsRemaining: 13 },
  { id: 'wed-5-hiit', classId: 'hiit', dayOfWeek: 3, startTime: '17:00', endTime: '17:45', seatsRemaining: 15 },
  { id: 'thu-630-strength', classId: 'strength', dayOfWeek: 4, startTime: '18:30', endTime: '19:30', seatsRemaining: 10 },
  { id: 'fri-6-crossfit', classId: 'crossfit', dayOfWeek: 5, startTime: '06:00', endTime: '07:00', seatsRemaining: 11 },
  { id: 'sat-9-strength', classId: 'strength', dayOfWeek: 6, startTime: '09:00', endTime: '10:00', seatsRemaining: 12 },
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
