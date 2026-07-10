'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Button, Input } from '@/components/ui';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.error) setError('Invalid email or password');
    else window.location.href = '/dashboard';
    setLoading(false);
  };

  return (
    <Section>
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-bold text-white">Member Sign In</h1>
        <p className="mt-2 text-center text-white/60">Access your dashboard, bookings, and billing.</p>

        <form onSubmit={handleCredentials} className="mt-8 space-y-4 rounded-2xl border border-surface-border bg-surface p-8">
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-border" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-charcoal-900 px-4 text-white/40">or</span></div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-sm text-white/50">
          Not a member? <Link href="/memberships" className="text-accent hover:underline">View memberships</Link>
        </p>
      </div>
    </Section>
  );
}
