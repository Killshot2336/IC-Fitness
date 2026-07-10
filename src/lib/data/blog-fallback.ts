import type { BlogPost } from '@/types';

export const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: '1',
    title: '5 Tips for Maximizing Your 24/7 Gym Access',
    slug: { current: 'maximize-24-7-gym-access' },
    excerpt: 'Learn how to build a consistent training routine when you have round-the-clock access to IC Fitness.',
    publishedAt: '2026-06-15',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' } },
    author: { name: 'Candy' },
  },
  {
    _id: '2',
    title: 'CrossFit vs. Traditional Lifting: Which Is Right for You?',
    slug: { current: 'crossfit-vs-traditional-lifting' },
    excerpt: 'Our coaches break down the benefits of each training style to help you find your perfect fit.',
    publishedAt: '2026-05-28',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80' } },
    author: { name: 'Jake S.' },
  },
  {
    _id: '3',
    title: 'Member Spotlight: James\'s 45-Pound Transformation',
    slug: { current: 'member-spotlight-james' },
    excerpt: 'How IC Fitness\'s 24/7 access and supportive community helped James achieve his weight loss goals.',
    publishedAt: '2026-05-10',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1583454110551-21f2f2b36d7a?w=800&q=80' } },
    author: { name: 'IC Fitness Team' },
  },
];
