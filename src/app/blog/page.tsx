import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout/Section';
import { FadeIn } from '@/components/motion';
import type { BlogPost } from '@/types';
import { getBlogPosts, isSanityConfigured } from '@/lib/sanity/client';
import { FALLBACK_POSTS } from '@/lib/data/blog-fallback';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Fitness tips, member stories, and news from IC Fitness in Broken Bow, OK.',
};

export default async function BlogPage() {
  const posts: BlogPost[] = isSanityConfigured ? await getBlogPosts() : FALLBACK_POSTS;
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-charcoal-800 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-display text-5xl font-black text-white">Blog & News</h1>
          <p className="mt-4 text-lg text-white/60">Tips, stories, and updates from the IC Fitness community.</p>
        </div>
      </section>

      {featured ? (
        <Section>
          <Link href={`/blog/${featured.slug.current}`} className="group block">
            <div className="grid overflow-hidden rounded-2xl border border-surface-border lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featured.mainImage?.asset?.url ?? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center bg-surface p-8 lg:p-12">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Featured</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-white group-hover:text-accent">{featured.title}</h2>
                <p className="mt-4 text-white/60">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-white/40">
                  {featured.author?.name} · {new Date(featured.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        </Section>
      ) : null}

      <Section dark>
        <SectionHeader title="Recent Posts" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <FadeIn key={post._id} delay={i * 0.08}>
              <Link href={`/blog/${post.slug.current}`} className="group block overflow-hidden rounded-2xl border border-surface-border bg-surface">
                <div className="relative h-48">
                  <Image
                    src={post.mainImage?.asset?.url ?? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-accent">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{post.excerpt}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
