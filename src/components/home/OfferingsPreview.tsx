import Link from "next/link";
import {
  Target,
  TrendingUp,
  BarChart3,
  Layers,
  Cpu,
  Shield,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp } from "@/styles/animations";
import type { Offering } from "@/lib/types";
import { cn } from "@/lib/utils";

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
      <div className="group h-full p-6 rounded-2xl border border-border/60 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-base mb-2">{offering.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {offering.short_desc}
        </p>
        <ul className="space-y-1">
          {(offering.features ?? []).slice(0, 2).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedItem>
  );
}

interface OfferingsPreviewProps {
  offerings: Offering[];
}

export function OfferingsPreview({ offerings }: OfferingsPreviewProps) {
  return (
    <section id="offerings" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Our Offerings & Frameworks"
            title="Comprehensive"
            titleHighlight="Wealth Solutions"
            description="End-to-end financial advisory powered by data analytics — from goal planning to sophisticated portfolio strategies."
          />
        </AnimatedSection>

        <AnimatedSection
          stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {offerings.map((offering) => (
            <OfferingCard key={offering.id} offering={offering} />
          ))}
        </AnimatedSection>

        <AnimatedSection className="flex justify-center mt-12">
          <Link
            href="/offerings"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            View All Offerings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
