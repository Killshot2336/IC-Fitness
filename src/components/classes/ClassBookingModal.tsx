'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { X, CheckCircle } from 'lucide-react';

interface ClassBookingModalProps {
  isOpen: boolean;
  className: string;
  day: string;
  time: string;
  instructor: string;
  onClose: () => void;
  onBook: (data: { name: string; email: string; membershipNumber: string }) => void;
}

export function ClassBookingModal({
  isOpen,
  className: classTitle,
  day,
  time,
  instructor,
  onClose,
  onBook,
}: ClassBookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({ name, email, membershipNumber });
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setName('');
    setEmail('');
    setMembershipNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="presentation" onClick={handleClose}>
      <div
        className="relative w-full max-w-md rounded-2xl border border-surface-border bg-charcoal-800 p-8"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={handleClose} className="absolute right-4 top-4 text-white/60 hover:text-white" aria-label="Close">
          <X size={20} />
        </button>

        {success ? (
          <div className="text-center">
            <CheckCircle className="mx-auto text-accent" size={48} />
            <h2 className="mt-4 font-display text-2xl font-bold text-white">You&apos;re booked!</h2>
            <p className="mt-2 text-white/60">We&apos;ll see you there.</p>
            <p className="mt-4 text-sm text-white/50">
              {classTitle} · {day} at {time} with {instructor}
            </p>
            <Button className="mt-6 w-full" onClick={handleClose}>Done</Button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold text-white">Book Class</h2>
            <p className="mt-2 text-sm text-white/60">
              {classTitle} · {day} at {time}
            </p>
            <p className="text-sm text-accent">Coach: {instructor}</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                label="Membership Number"
                required
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                placeholder="Found on your key fob or welcome email"
              />
              <Button type="submit" className="w-full">Confirm Booking</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
