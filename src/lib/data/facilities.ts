import type { FacilityArea, EquipmentItem } from '@/types';

export const FACILITY_AREAS: FacilityArea[] = [
  {
    id: 'weights',
    name: 'Weight Training',
    description: 'Professional-grade free weights, machines, and power racks for serious lifters.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
    equipment: ['Power Racks', 'Olympic Platforms', 'Dumbbells to 150lbs', 'Cable Machines'],
  },
  {
    id: 'cardio',
    name: 'Cardio Zone',
    description: 'State-of-the-art treadmills, bikes, rowers, and ellipticals with entertainment screens.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
    equipment: ['Treadmills', 'Spin Bikes', 'Rowing Machines', 'Stair Climbers'],
  },
  {
    id: 'box-gym',
    name: 'Box Gym',
    description: 'Full CrossFit rig with ropes, rings, battle ropes, and functional training space.',
    image: 'https://images.unsplash.com/photo-1540497077202-7a8a3998166e?w=1200&q=80',
    equipment: ['CrossFit Rig', 'Battle Ropes', 'Kettlebells', 'Plyo Boxes'],
  },
  {
    id: 'studio',
    name: 'Fitness Studio',
    description: 'Climate-controlled studio for yoga, spin, HIIT, and group fitness classes.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    equipment: ['Spin Bike Fleet', 'Yoga Mats & Blocks', 'Sound System', 'Mirrored Walls'],
  },
  {
    id: 'locker',
    name: 'Locker Rooms',
    description: 'Clean, spacious locker rooms with showers, saunas, and towel service.',
    image: 'https://images.unsplash.com/photo-1576678927480-cc5889e056d2?w=1200&q=80',
    equipment: ['Private Showers', 'Day Lockers', 'Towel Service', 'Grooming Stations'],
  },
];

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: 'rogue-rack',
    name: 'Rogue Monster Rack',
    brand: 'Rogue Fitness',
    area: 'weights',
    muscleGroups: ['Full Body', 'Squats', 'Pressing'],
    specs: '6-post rack with pull-up bar, safety arms, and band pegs',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2f2b36d7a?w=600&q=80',
  },
  {
    id: 'life-fitness-treadmill',
    name: 'Life Fitness Treadmill',
    brand: 'Life Fitness',
    area: 'cardio',
    muscleGroups: ['Cardio', 'Legs'],
    specs: 'Commercial-grade with 22" HD touchscreen and incline up to 15%',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
  },
  {
    id: 'concept2-rower',
    name: 'Concept2 Rower',
    brand: 'Concept2',
    area: 'cardio',
    muscleGroups: ['Full Body', 'Cardio'],
    specs: 'Model D with PM5 performance monitor',
    image: 'https://images.unsplash.com/photo-1540497077202-7a8a3998166e?w=600&q=80',
  },
  {
    id: 'rogue-rig',
    name: 'Custom CrossFit Rig',
    brand: 'Rogue Fitness',
    area: 'box-gym',
    muscleGroups: ['Full Body', 'Functional'],
    specs: '20-foot rig with 8 squat stations and rope climb',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
  },
];

export const AMENITIES = [
  { icon: 'parking', label: 'Free Parking', description: 'Ample parking with well-lit lot' },
  { icon: 'towel', label: 'Towel Service', description: 'Clean towels available daily' },
  { icon: 'wifi', label: 'Free WiFi', description: 'High-speed throughout facility' },
  { icon: 'water', label: 'Water Stations', description: 'Filtered water refill stations' },
  { icon: 'lock', label: '24/7 Access', description: 'Secure key fob entry anytime' },
  { icon: 'child', label: 'Family Friendly', description: 'Youth programs available' },
];
