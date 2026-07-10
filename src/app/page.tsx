import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview';
import { MembershipTiersSection } from '@/components/home/MembershipTiersSection';
import { CommunitySection } from '@/components/home/CommunitySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CommunitySection />
      <FacilitiesPreview />
      <MembershipTiersSection />
      <SocialProofSection />
    </>
  );
}
