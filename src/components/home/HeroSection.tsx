"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientText } from "@/components/shared/GradientText";
import { fadeUp, staggerContainer } from "@/styles/animations";
import { SIGNUP_URL } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaUrl?: string;
  nameChangeNotice?: string;
}

export function HeroSection({
  headline = "Powered by Data Analytics & Investment Algorithms",
  subheadline = "Echowin Wealth is a Financial Advisory and Investment Management Firm",
  ctaText = "Sign Up",
  ctaUrl = SIGNUP_URL,
  nameChangeNotice = "Formerly HealthofWealth Financial Advisors Private Limited",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 px-4 py-1.5 text-sm border-primary/30 bg-primary/5 text-primary"
            >
              <BadgeCheck className="w-3.5 h-3.5" />
              AMFI (SEBI) Registered Mutual Fund Distributor
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <GradientText className="block">{headline}</GradientText>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 h-12 px-8 text-base")}
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#offerings"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-base")}
            >
              Explore Offerings
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            <TrustItem icon={<Sparkles className="w-3.5 h-3.5" />} label="Startup India Recognised" />
            <TrustItem icon={<BadgeCheck className="w-3.5 h-3.5" />} label="SEBI Registered" />
            <TrustItem icon={<BadgeCheck className="w-3.5 h-3.5" />} label="Algo-backed Returns" />
          </motion.div>

          {/* Name change notice */}
          {nameChangeNotice && (
            <motion.p variants={fadeUp} className="text-xs text-muted-foreground/60">
              {nameChangeNotice}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
