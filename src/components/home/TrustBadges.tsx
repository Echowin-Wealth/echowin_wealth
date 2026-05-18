import { BadgeCheck, Award, Shield } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function TrustBadges() {
  const badges = [
    {
      icon: <BadgeCheck className="w-6 h-6 text-primary" />,
      title: "AMFI (SEBI) Registered",
      desc: "Mutual Fund Distributor",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Startup India",
      desc: "Recognised Company",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Regulatory Compliant",
      desc: "Fully Regulated & Transparent",
    },
  ];

  return (
    <section className="py-16 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <AnimatedItem key={badge.title} variants={fadeUp}>
              <div className="flex items-center gap-4 p-6 rounded-2xl border border-border/60 bg-card/40 hover:bg-card transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm">{badge.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
