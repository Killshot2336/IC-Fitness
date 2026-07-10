import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import { MemberAuthProvider } from '@/context/MemberAuthContext';
import { healthClubJsonLd } from '@/lib/seo-jsonld';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interDisplay = Inter({
  subsets: ['latin'],
  variable: '--font-inter-display',
  display: 'swap',
  weight: ['600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://icfitness.com'),
  title: {
    default: 'IC Fitness | 24/7 Premium Fitness in Broken Bow, OK',
    template: '%s | IC Fitness',
  },
  description:
    'IC Fitness is Broken Bow\'s premier 24/7 gym with elite equipment, group classes, and expert coaching.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'IC Fitness',
    title: 'IC Fitness | 24/7 Premium Fitness',
    description: 'Let me INSPIRE you so that you can INSPIRE others!',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'IC Fitness gym interior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(healthClubJsonLd()) }}
        />
      </head>
      <body className="font-sans">
        <Providers>
          <MemberAuthProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
          </MemberAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
