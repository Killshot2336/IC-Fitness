import { NextResponse } from 'next/server';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';
import { MEMBERSHIP_TIERS } from '@/lib/data/memberships';
import { SITE } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to your environment.' },
        { status: 503 }
      );
    }

    const { tierId, annual } = await request.json();
    const tier = MEMBERSHIP_TIERS.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json({ error: 'Invalid membership tier' }, { status: 400 });
    }

    const stripe = getStripe();
    const price = annual ? tier.annualPrice : tier.monthlyPrice;

    const session = await stripe.checkout.sessions.create({
      mode: annual ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `IC Fitness ${tier.name} Membership`,
              description: tier.description,
            },
            unit_amount: price * 100,
            ...(annual ? {} : { recurring: { interval: 'month' } }),
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE.url}/dashboard?checkout=success`,
      cancel_url: `${SITE.url}/memberships?checkout=cancelled`,
      metadata: { tierId, annual: String(annual) },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
