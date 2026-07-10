import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { SITE } from '@/lib/constants';

interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export function LegalPage({ title, subtitle, effectiveDate, sections }: LegalPageProps) {
  return (
    <>
      <section className="border-b border-surface-border bg-charcoal-800 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-black text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-white/60">{subtitle}</p>
          <p className="mt-2 text-sm text-white/40">Effective date: {effectiveDate}</p>
        </div>
      </section>

      <Section>
        <article className="prose prose-invert mx-auto max-w-3xl prose-headings:font-display prose-headings:text-white prose-p:text-white/75 prose-li:text-white/75 prose-a:text-accent">
          {sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-12 rounded-2xl border border-surface-border bg-surface p-6 not-prose">
            <h3 className="font-display text-lg font-bold text-white">Questions?</h3>
            <p className="mt-2 text-sm text-white/60">
              Contact {SITE.name} at{' '}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>{' '}
              or call{' '}
              <a href={`tel:${SITE.phone}`} className="text-accent hover:underline">
                {SITE.phone}
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-white/40">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
            </p>
          </div>

          <p className="mt-8 text-sm text-white/40">
            See also:{' '}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>{' '}
            ·{' '}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </p>
        </article>
      </Section>
    </>
  );
}
