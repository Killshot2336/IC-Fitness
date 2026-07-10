import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview';
import { MembershipTiersSection } from '@/components/home/MembershipTiersSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { MemberLoginSection } from '@/components/home/MemberLoginSection';
import { Section } from '@/components/layout/Section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CommunitySection />
      <FacilitiesPreview />
      <MembershipTiersSection />
      <Section dark id="member-login">
        <div className="mx-auto max-w-lg">
          <MemberLoginSection />
        </div>
      </Section>
      <SocialProofSection />
    </>
  );
}
