import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE.name} — how we collect, use, and protect your personal information.`,
};

const EFFECTIVE_DATE = 'July 10, 2026';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle={`${SITE.name} is committed to protecting your privacy. This policy explains how we handle your personal information when you use our website, mobile services, and gym facilities.`}
      effectiveDate={EFFECTIVE_DATE}
      sections={[
        {
          title: '1. Information We Collect',
          paragraphs: [
            'We collect information you provide directly to us when you create a membership, book a class, sign in to the member portal, contact us, or subscribe to communications.',
          ],
          list: [
            'Personal identifiers: full name, email address, phone number, and mailing address',
            'Membership information: membership tier, membership number, join date, and billing details',
            'Check-in data: facility entry timestamps via secure key fob access logs',
            'Class booking data: classes reserved, attendance history, and waitlist status',
            'Payment information: processed securely through Stripe; we do not store full card numbers on our servers',
            'Communications: messages you send through our contact form or email',
            'Technical data: IP address, browser type, device information, and cookies for site functionality and analytics',
          ],
        },
        {
          title: '2. How We Use Your Information',
          paragraphs: [
            'We use the information we collect to operate IC Fitness and provide you with a safe, premium fitness experience.',
          ],
          list: [
            'Process memberships, payments, and account management',
            'Manage class schedules, reservations, and capacity',
            'Communicate about your account, bookings, facility updates, and promotions you opt into',
            'Maintain 24/7 secure access through key fob systems',
            'Improve our website, services, and member experience',
            'Comply with legal obligations and enforce our Terms of Service',
            'Respond to inquiries submitted through our contact form',
          ],
        },
        {
          title: '3. Data Sharing',
          paragraphs: [
            `${SITE.name} does not sell, rent, or trade your personal information to third parties for marketing purposes.`,
            'We may share limited information with trusted service providers who assist us in operating our business, including payment processing (Stripe), email delivery, website hosting (Vercel), and database services (Supabase). These providers are contractually obligated to protect your data and use it only for the services they provide to us.',
            'We may disclose information if required by law, court order, or to protect the rights, safety, and property of IC Fitness, our members, or others.',
          ],
        },
        {
          title: '4. Data Security',
          paragraphs: [
            'We implement industry-standard security measures to protect your personal information, including encrypted connections (HTTPS/SSL), secure payment processing, access controls on member data, and regular review of our data practices.',
            'While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to use strong passwords and keep your membership credentials confidential.',
          ],
        },
        {
          title: '5. Your Rights',
          paragraphs: [
            'You have the right to access, correct, or request deletion of your personal information. You may also opt out of promotional communications at any time.',
          ],
          list: [
            'Request a copy of the personal data we hold about you',
            'Update or correct inaccurate information through your member portal or by contacting us',
            'Request deletion of your account data, subject to legal and contractual retention requirements',
            'Withdraw consent for marketing emails by using the unsubscribe link or contacting us directly',
          ],
        },
        {
          title: '6. Cookie Usage',
          paragraphs: [
            'Our website uses cookies and similar technologies to enable core functionality, remember your preferences, and understand how visitors use our site.',
          ],
          list: [
            'Essential cookies: required for site navigation, member login sessions, and security',
            'Analytics cookies: help us understand traffic patterns and improve our website (used in aggregate, not to identify individuals)',
            'You can control cookies through your browser settings; disabling essential cookies may affect site functionality',
          ],
        },
        {
          title: '7. Children\'s Privacy',
          paragraphs: [
            'Our services are not directed to individuals under 16. We do not knowingly collect personal information from children without parental consent. Contact us if you believe we have collected information from a minor.',
          ],
        },
        {
          title: '8. Changes to This Policy',
          paragraphs: [
            'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised policy.',
          ],
        },
        {
          title: '9. Contact for Privacy Matters',
          paragraphs: [
            `For privacy-related questions, data requests, or concerns, contact ${SITE.name}:`,
            `Email: ${SITE.email}`,
            `Phone: ${SITE.phone}`,
            `Mail: ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
          ],
        },
      ]}
    />
  );
}
