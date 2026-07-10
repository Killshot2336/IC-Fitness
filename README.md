# IC Fitness — Premium Next.js Website

World-class fitness destination website for IC Fitness, Broken Bow, OK.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** design system
- **Framer Motion** animations
- **Supabase** (auth, bookings, profiles)
- **Stripe** (membership checkout)
- **Sanity.io** (blog CMS)
- **NextAuth.js** (email + Google OAuth)
- **Resend** (contact form emails)

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for all required keys. The site runs in demo mode without Supabase/Stripe/Sanity configured.

## Project Structure

```
src/
├── app/              # App Router pages & API routes
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── layout/       # Header, Footer, Section
│   ├── home/         # Homepage sections
│   └── motion/       # Framer Motion wrappers
├── lib/
│   ├── data/         # Static content & seed data
│   ├── supabase/     # Supabase client
│   ├── stripe/       # Stripe server utilities
│   └── sanity/       # Sanity CMS client
└── types/            # TypeScript definitions
legacy/               # Previous static HTML site (archived)
supabase/schema.sql   # Database schema
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Deployment

Deploy to Vercel. Set environment variables in the Vercel dashboard.

## Legacy Site

The previous single-page HTML site is archived in `/legacy`.
