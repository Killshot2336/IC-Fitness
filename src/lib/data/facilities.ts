import type { FacilityArea, EquipmentItem } from '@/types';
import { IMAGES } from '@/lib/images';

export const FACILITY_AREAS: FacilityArea[] = [
  {
    id: 'weights',
    name: 'Weight Training',
    description: 'Our main floor at 2716 South Park Drive — power racks, dumbbells, and machines for serious training.',
    image: IMAGES.weights,
    equipment: ['Power Racks', 'Olympic Platforms', 'Dumbbells', 'Cable Machines', 'New Equipment Arrivals'],
  },
  {
    id: 'cardio',
    name: 'Cardio Zone',
    description: 'Treadmills, bikes, and rowers — train cardio on your schedule, 24/7.',
    image: IMAGES.cardio,
    equipment: ['Treadmills', 'Spin Bikes', 'Rowing Machines', 'Stair Climbers'],
  },
  {
    id: 'box-gym',
    name: 'Box Gym',
    description: 'Functional fitness space with rigs, ropes, and CrossFit equipment — where Coach Sarah runs classes.',
    image: IMAGES.boxGym,
    equipment: ['CrossFit Rig', 'Battle Ropes', 'Kettlebells', 'Plyo Boxes'],
  },
  {
    id: 'studio',
    name: 'Fitness Studio',
    description: 'Climate-controlled studio for group classes, HIIT, and member events.',
    image: IMAGES.studio,
    equipment: ['Open Floor Space', 'Sound System', 'Mirrored Walls', 'Class Equipment'],
  },
  {
    id: 'locker',
    name: 'Locker Rooms',
    description: 'Clean locker rooms with showers — because details matter.',
    image: IMAGES.locker,
    equipment: ['Private Showers', 'Day Lockers', 'Grooming Stations'],
  },
];

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: 'new-equipment',
    name: 'New Floor Equipment',
    brand: 'IC Fitness',
    area: 'weights',
    muscleGroups: ['Full Body'],
    specs: 'Recently added equipment featured on our Facebook — come see it in person.',
    image: IMAGES.equipment,
  },
  {
    id: 'crossfit-rig',
    name: 'Box Gym Rig',
    brand: 'IC Fitness',
    area: 'box-gym',
    muscleGroups: ['Full Body', 'Functional'],
    specs: 'Full functional training rig for CrossFit and HIIT classes.',
    image: IMAGES.boxGym,
  },
  {
    id: 'cardio-fleet',
    name: 'Cardio Fleet',
    brand: 'Commercial Grade',
    area: 'cardio',
    muscleGroups: ['Cardio', 'Endurance'],
    specs: 'Multiple treadmills, bikes, and rowers available 24/7.',
    image: IMAGES.cardio,
  },
];

export const AMENITIES = [
  { icon: 'parking', label: 'Free Parking', description: 'Ample parking at 2716 South Park Drive' },
  { icon: 'lock', label: '24/7 Access', description: 'Secure key fob entry anytime' },
  { icon: 'wifi', label: 'Free WiFi', description: 'Stay connected throughout the facility' },
  { icon: 'water', label: 'Water Stations', description: 'Filtered refill stations on the floor' },
  { icon: 'partner', label: 'Blend & Believe Perk', description: 'Partner perks next door for IC members' },
  { icon: 'child', label: 'Broken Bow Community', description: 'Locally owned by Candy Tipton since 2023' },
];
