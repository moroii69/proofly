import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { FAQSection } from "@/components/layout/sections/faq";
import PythonPackageSection  from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { MacbookShowcase } from "@/components/macbook-showcase";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <MacbookShowcase />
      <SponsorsSection />
      <BenefitsSection />
      <PythonPackageSection />
      <CommunitySection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}

