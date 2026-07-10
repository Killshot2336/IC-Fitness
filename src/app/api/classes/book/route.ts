import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Please sign in to book classes' }, { status: 401 });
  }

  const { sessionId } = await request.json();
  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ success: true, demo: true });
  }

  try {
    const supabase = createSupabaseClient();
    const userId = (session.user as { id?: string }).id;

    const { data: existing } = await supabase
      .from('class_bookings')
      .select('id')
      .eq('user_id', userId)
      .eq('session_id', sessionId)
      .eq('status', 'confirmed')
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Already booked for this class' }, { status: 409 });
    }

    const { error } = await supabase.from('class_bookings').insert({
      user_id: userId,
      session_id: sessionId,
      status: 'confirmed',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}
