import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact IC Fitness in Broken Bow, OK. Visit us at 2716 S Park Dr or call 580-743-7955.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
