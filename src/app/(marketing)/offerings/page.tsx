import type { Metadata } from "next";
import {
  Target,
  TrendingUp,
  BarChart3,
  Layers,
  Cpu,
  Shield,
  Check,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTABanner } from "@/components/home/CTABanner";
import { fadeUp } from "@/styles/animations";
import { fetchOfferings } from "@/lib/data/offerings";
import type { Offering } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our Offerings — Mutual Funds, PMS, AIF, Algo Plans | Echowin Wealth",
  description:
    "Explore our full range: Financial Planning, Mutual Funds, PMS, AIF, Algorithm-Based Plans, and Insurance Products.",
};

export const revalidate = 3600;

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  TrendingUp,
  BarChart3,
  Layers,
  Cpu,
  Shield,
};

function OfferingCard({ offering }: { offering: Offering }) {
  const Icon = offering.icon_name ? (ICON_MAP[offering.icon_name] ?? TrendingUp) : TrendingUp;

  return (
    <AnimatedItem variants={fadeUp}>
      <GlassCard
        className="p-8 h-full flex flex-col"
        hover
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-xl leading-tight">{offering.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{offering.short_desc}</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
          {offering.full_desc}
        </p>

        {(offering.features ?? []).length > 0 && (
          <div className="space-y-2 border-t border-border/60 pt-6">
            {offering.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </AnimatedItem>
  );
}

export default async function OfferingsPage() {
  const offerings = await fetchOfferings();

  return (
    <>
      <PageHero
        eyebrow="Our Offerings & Frameworks"
        title="Process Centric"
        titleHighlight="Financial Solutions"
        description="From mutual funds to proprietary algorithm-based plans — every offering is designed with a data-backed process for superior outcomes."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {offerings.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Why process matters */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Our Commitment
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Client participation, visibility,{" "}
                <span className="gradient-text">flexibility, and transparency</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Throughout every investment implementation, we ensure you are informed,
                in control, and confident about your financial journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
