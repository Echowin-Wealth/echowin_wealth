import { HeroSection } from "@/components/home/HeroSection";
import { MarketTicker } from "@/components/home/MarketTicker";
import { AdvancedChart } from "@/components/home/AdvancedChart";
import { TrustBadges } from "@/components/home/TrustBadges";
import { OfferingsPreview } from "@/components/home/OfferingsPreview";
import { CTABanner } from "@/components/home/CTABanner";
import { fetchOfferings } from "@/lib/data/offerings";
import { fetchPageContent } from "@/lib/data/content";

export const revalidate = 3600;

export default async function HomePage() {
  const [offerings, heroContent, trustContent] = await Promise.all([
    fetchOfferings(),
    fetchPageContent("home", "hero"),
    fetchPageContent("home", "trust"),
  ]);

  return (
    <>
      <HeroSection
        headline={heroContent.headline as string}
        subheadline={heroContent.subheadline as string}
        ctaText={heroContent.cta_text as string}
        ctaUrl={heroContent.cta_url as string}
        nameChangeNotice={heroContent.name_change_notice as string}
      />
      <MarketTicker />
      <AdvancedChart />
      <TrustBadges />
      <OfferingsPreview offerings={offerings} />
      <CTABanner />
    </>
  );
}
