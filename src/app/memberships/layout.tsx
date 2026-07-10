import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memberships',
  description: 'Choose your IC Fitness membership plan. 24/7 access starting at $35/month.',
};

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
