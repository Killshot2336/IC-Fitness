import type { Trainer, GymClass, ClassSession } from '@/types';

export const TRAINERS: Trainer[] = [
  {
    id: 'marcus',
    name: 'Marcus T.',
    role: 'Strength & HIIT Coach',
    bio: '10+ years experience. NASM certified. Specializes in powerlifting and metabolic conditioning.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80',
    specialties: ['Powerlifting', 'HIIT', 'Strength Training'],
    certifications: ['NASM-CPT', 'USAW Level 1'],
  },
  {
    id: 'emily',
    name: 'Emily R.',
    role: 'Yoga Instructor',
    bio: 'RYT-500 certified. Focuses on vinyasa flow and restorative practices for all levels.',
    image: 'https://images.unsplash.com/photo-1594381898411-8465977d25c3?w=600&q=80',
    specialties: ['Vinyasa Flow', 'Restorative Yoga', 'Mobility'],
    certifications: ['RYT-500', 'Yin Yoga Certified'],
  },
  {
    id: 'jake',
    name: 'Jake S.',
    role: 'CrossFit Level 2 Coach',
    bio: 'Former competitive athlete. Expert in Olympic lifting and functional fitness programming.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    specialties: ['CrossFit', 'Olympic Lifting', 'Functional Fitness'],
    certifications: ['CrossFit L2', 'USAW Sports Performance'],
  },
  {
    id: 'lisa',
    name: 'Lisa M.',
    role: 'Spin & Cardio Coach',
    bio: 'ACE certified group fitness instructor. Creates high-energy rides that push your limits.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    specialties: ['Indoor Cycling', 'Cardio Conditioning', 'Endurance'],
    certifications: ['ACE Group Fitness', 'Schwinn Cycling'],
  },
];

export const CLASSES: GymClass[] = [
  {
    id: 'crossfit',
    name: 'CrossFit',
    description: 'High-intensity functional fitness with rigs, ropes, and Olympic lifting.',
    instructorId: 'jake',
    intensity: 'advanced',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    duration: 60,
    capacity: 15,
  },
  {
    id: 'yoga',
    name: 'Yoga Flow',
    description: 'Improve flexibility, balance, and mental clarity with guided yoga sessions.',
    instructorId: 'emily',
    intensity: 'beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    duration: 60,
    capacity: 20,
  },
  {
    id: 'spin',
    name: 'Spin Cycle',
    description: 'Heart-pumping indoor cycling with energizing music and expert coaching.',
    instructorId: 'lisa',
    intensity: 'intermediate',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    duration: 45,
    capacity: 18,
  },
  {
    id: 'hiit',
    name: 'HIIT Blast',
    description: 'Maximum calorie burn with short bursts of intense exercise and recovery.',
    instructorId: 'marcus',
    intensity: 'advanced',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',
    duration: 45,
    capacity: 15,
  },
  {
    id: 'strength',
    name: 'Strength & Conditioning',
    description: 'Build muscle and power with structured weight training programs.',
    instructorId: 'marcus',
    intensity: 'intermediate',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    duration: 60,
    capacity: 12,
  },
];

export const CLASS_SESSIONS: ClassSession[] = [
  { id: 'mon-6-hiit', classId: 'hiit', dayOfWeek: 1, startTime: '06:00', endTime: '06:45', seatsRemaining: 15 },
  { id: 'mon-12-yoga', classId: 'yoga', dayOfWeek: 1, startTime: '12:00', endTime: '13:00', seatsRemaining: 20 },
  { id: 'tue-530-crossfit', classId: 'crossfit', dayOfWeek: 2, startTime: '17:30', endTime: '18:30', seatsRemaining: 15 },
  { id: 'wed-6-spin', classId: 'spin', dayOfWeek: 3, startTime: '06:00', endTime: '06:45', seatsRemaining: 18 },
  { id: 'wed-630-strength', classId: 'strength', dayOfWeek: 3, startTime: '18:30', endTime: '19:30', seatsRemaining: 12 },
  { id: 'thu-530-crossfit', classId: 'crossfit', dayOfWeek: 4, startTime: '17:30', endTime: '18:30', seatsRemaining: 15 },
  { id: 'fri-6-hiit', classId: 'hiit', dayOfWeek: 5, startTime: '06:00', endTime: '06:45', seatsRemaining: 15 },
  { id: 'sat-9-yoga', classId: 'yoga', dayOfWeek: 6, startTime: '09:00', endTime: '10:00', seatsRemaining: 20 },
  { id: 'sat-1030-spin', classId: 'spin', dayOfWeek: 6, startTime: '10:30', endTime: '11:15', seatsRemaining: 18 },
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
