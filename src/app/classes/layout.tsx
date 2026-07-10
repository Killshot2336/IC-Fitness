import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Browse IC Fitness group classes — CrossFit, yoga, spin, HIIT, and more. View schedule and reserve your spot.',
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
