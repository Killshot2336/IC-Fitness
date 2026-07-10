import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities',
  description: 'Tour IC Fitness facilities — weight training, cardio, box gym, studio, and locker rooms.',
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
