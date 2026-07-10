'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface MemberProfile {
  name: string;
  email: string;
  membershipNumber: string;
  tier: string;
  joinDate: string;
}

export interface ClassBooking {
  id: string;
  className: string;
  day: string;
  time: string;
  instructor: string;
  bookedAt: string;
}

interface MemberAuthContextValue {
  member: MemberProfile | null;
  bookings: ClassBooking[];
  checkIns: number[];
  login: (email: string, membershipNumber: string, name?: string) => void;
  logout: () => void;
  addBooking: (booking: Omit<ClassBooking, 'id' | 'bookedAt'>) => void;
  removeBooking: (id: string) => void;
}

const STORAGE_KEY = 'ic_fitness_member';
const BOOKINGS_KEY = 'ic_fitness_bookings';

const MemberAuthContext = createContext<MemberAuthContextValue | null>(null);

function loadMember(): MemberProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadBookings(): ClassBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function MemberAuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [bookings, setBookings] = useState<ClassBooking[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMember(loadMember());
    setBookings(loadBookings());
    setHydrated(true);
  }, []);

  const login = useCallback((email: string, membershipNumber: string, name = 'Member') => {
    const profile: MemberProfile = {
      name,
      email,
      membershipNumber,
      tier: 'Premium',
      joinDate: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setMember(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMember(null);
  }, []);

  const persistBookings = useCallback((next: ClassBooking[]) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
    setBookings(next);
  }, []);

  const addBooking = useCallback(
    (booking: Omit<ClassBooking, 'id' | 'bookedAt'>) => {
      const entry: ClassBooking = {
        ...booking,
        id: crypto.randomUUID(),
        bookedAt: new Date().toISOString(),
      };
      persistBookings([...loadBookings(), entry]);
    },
    [persistBookings]
  );

  const removeBooking = useCallback(
    (id: string) => {
      persistBookings(loadBookings().filter((b) => b.id !== id));
    },
    [persistBookings]
  );

  const checkIns = [8, 12, 10, 14, 11, 16, 9, 13, 15, 10, 12, 14, 11, 9, 16, 13, 12, 15, 10, 14, 11, 13, 16, 12, 10, 14, 15, 11, 13, 9];

  if (!hydrated) {
    return <div className="min-h-screen bg-charcoal-900" />;
  }

  return (
    <MemberAuthContext.Provider value={{ member, bookings, checkIns, login, logout, addBooking, removeBooking }}>
      {children}
    </MemberAuthContext.Provider>
  );
}

export function useMemberAuth() {
  const ctx = useContext(MemberAuthContext);
  if (!ctx) throw new Error('useMemberAuth must be used within MemberAuthProvider');
  return ctx;
}
