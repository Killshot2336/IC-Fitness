'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { X } from 'lucide-react';

interface MembershipJoinModalProps {
  isOpen: boolean;
  tierName: string;
  price: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; membershipNumber: string }) => void;
}

export function MembershipJoinModal({ isOpen, tierName, price, onClose, onSubmit }: MembershipJoinModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service to continue.');
      return;
    }
    setError('');
    onSubmit({ name, email, membershipNumber });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="presentation" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-2xl border border-surface-border bg-charcoal-800 p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="joinTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-white/60 hover:text-white" aria-label="Close">
          <X size={20} />
        </button>
        <h2 id="joinTitle" className="font-display text-2xl font-bold text-white">Join {tierName}</h2>
        <p className="mt-1 text-accent">{price}</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Membership Number (if existing)"
            value={membershipNumber}
            onChange={(e) => setMembershipNumber(e.target.value)}
            placeholder="Leave blank for new members"
          />
          <label className="flex items-start gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-surface-border accent-accent"
              required
            />
            <span>
              I agree to the{' '}
              <Link href="/terms" target="_blank" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and have read the{' '}
              <Link href="/privacy" target="_blank" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={!agreedToTerms}>
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
