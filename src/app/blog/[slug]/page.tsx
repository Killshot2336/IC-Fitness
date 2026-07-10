import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout/Section';
import { getBlogPost, isSanityConfigured } from '@/lib/sanity/client';
import { FALLBACK_POSTS } from '@/lib/data/blog-fallback';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = isSanityConfigured
    ? await getBlogPost(slug)
    : FALLBACK_POSTS.find((p) => p.slug.current === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return FALLBACK_POSTS.map((post) => ({ slug: post.slug.current }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = isSanityConfigured
    ? await getBlogPost(slug)
    : FALLBACK_POSTS.find((p) => p.slug.current === slug);

  if (!post) notFound();

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={post.mainImage?.asset?.url ?? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-3xl px-4">
            <p className="text-sm text-accent">
              {post.author?.name} · {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <h1 className="mt-2 font-display text-4xl font-black text-white sm:text-5xl">{post.title}</h1>
          </div>
        </div>
      </section>

      <Section>
        <article className="prose prose-invert mx-auto max-w-3xl">
          <p className="text-xl text-white/70">{post.excerpt}</p>
          <div className="mt-8 space-y-4 text-white/80 leading-relaxed">
            <p>
              At IC Fitness, we believe in sharing knowledge that helps our members train smarter and live healthier.
              This article is part of our commitment to the Broken Bow fitness community.
            </p>
            <p>
              Ready to put these tips into action? Visit us at 2716 S Park Dr for a free facility tour, or explore our
              membership options to get started today.
            </p>
          </div>
          <Link href="/memberships" className="mt-8 inline-block text-accent hover:underline">
            View Membership Options →
          </Link>
        </article>
      </Section>
    </>
  );
}
