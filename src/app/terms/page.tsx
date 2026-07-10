import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE.name} — membership rules, liability, billing, and facility use policies.`,
};

const EFFECTIVE_DATE = 'July 10, 2026';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle={`These Terms of Service govern your use of the ${SITE.name} website, member portal, and gym facilities located at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}.`}
      effectiveDate={EFFECTIVE_DATE}
      sections={[
        {
          title: '1. Acceptance of Terms',
          paragraphs: [
            `By accessing our website, creating a membership, booking a class, or using any IC Fitness facility or service, you agree to be bound by these Terms of Service and our Privacy Policy.`,
            'If you do not agree to these terms, do not use our website or services.',
          ],
        },
        {
          title: '2. Membership Agreements',
          paragraphs: [
            'IC Fitness offers various membership tiers and visitor passes. By enrolling, you agree to the following:',
          ],
          list: [
            'Members receive 24/7 key fob access to the facility at 2716 South Park Drive, Broken Bow, OK 74728',
            'Memberships are personal and non-transferable unless approved in writing by management',
            'You must present valid identification when requested by staff',
            'Guest pass privileges vary by membership tier and are subject to facility capacity',
            'IC Fitness reserves the right to modify membership offerings with reasonable notice',
            'All members must complete a fitness assessment or waiver before first use of equipment',
          ],
        },
        {
          title: '3. User Responsibilities',
          paragraphs: [
            'As a member or visitor of IC Fitness, you agree to:',
          ],
          list: [
            'Use equipment properly and only as intended; ask staff for guidance when unsure',
            'Follow all posted safety rules and staff instructions',
            'Wipe down equipment after use and maintain a clean, respectful environment',
            'Treat staff, trainers, and fellow members with respect at all times',
            'Not engage in dangerous, disruptive, or illegal behavior on premises',
            'Report damaged equipment or safety hazards to staff immediately',
            'Not share your key fob or membership credentials with unauthorized persons',
          ],
        },
        {
          title: '4. Liability Waiver & Assumption of Risk',
          paragraphs: [
            'PHYSICAL ACTIVITY INVOLVES INHERENT RISKS. By using IC Fitness facilities, equipment, and participating in classes or personal training, you acknowledge that exercise can result in injury, illness, or death.',
            'You voluntarily assume all risks associated with your participation and agree that IC Fitness, its owners (including Candy Tipton), employees, trainers, and affiliates shall not be liable for any injury, loss, or damage arising from your use of the facility, except where prohibited by Oklahoma law.',
            'You represent that you are physically fit to participate in exercise activities or have obtained clearance from a healthcare provider.',
          ],
        },
        {
          title: '5. Payment & Billing',
          paragraphs: [
            'Membership fees are billed according to your selected plan (monthly or annual). By providing payment information, you authorize recurring charges until you cancel.',
          ],
          list: [
            'Monthly memberships renew automatically each billing cycle',
            'Annual memberships are charged once per year at the discounted rate',
            'A one-time enrollment fee may apply to new memberships',
            'Cancellation requires 30 days written notice; contact us at ' + SITE.email,
            'Refunds are provided on a prorated basis for annual plans when applicable',
            'Failed payments may result in suspension of access until the account is current',
            'Visitor passes are non-refundable once activated',
          ],
        },
        {
          title: '6. Class Booking & Cancellation',
          paragraphs: [
            'Class reservations are subject to capacity limits. Members who repeatedly no-show without cancellation may lose booking privileges. Cancel at least 2 hours before class start time when possible.',
          ],
        },
        {
          title: '7. Intellectual Property',
          paragraphs: [
            'All content on the IC Fitness website — including text, logos, images, videos, and design — is owned by IC Fitness or its licensors and protected by copyright and trademark laws.',
            'You may not reproduce, distribute, or create derivative works from our content without written permission.',
          ],
        },
        {
          title: '8. Termination',
          paragraphs: [
            'IC Fitness may suspend or terminate your membership immediately for violation of these terms, unsafe conduct, non-payment, or actions that harm other members or staff.',
            'Upon termination, you must return any IC Fitness property including key fobs. Access will be revoked immediately.',
          ],
        },
        {
          title: '9. Third-Party Services',
          paragraphs: [
            'Our website integrates with third-party services including Stripe (payments), Supabase (data), and Google Maps. Your use of those services is subject to their respective terms.',
            'IC Fitness partners with Blend & Believe next door; partnership perks are subject to separate terms from that business.',
          ],
        },
        {
          title: '10. Governing Law',
          paragraphs: [
            'These Terms of Service are governed by and construed in accordance with the laws of the State of Oklahoma, without regard to conflict of law principles.',
            'Any disputes arising from these terms or your use of IC Fitness services shall be resolved in the courts of McCurtain County, Oklahoma.',
          ],
        },
        {
          title: '11. Contact',
          paragraphs: [
            `Questions about these terms? Contact ${SITE.name}:`,
            `Email: ${SITE.email} | Phone: ${SITE.phone}`,
            `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
          ],
        },
      ]}
    />
  );
}
