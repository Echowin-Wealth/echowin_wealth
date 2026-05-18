import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTABanner } from "@/components/home/CTABanner";
import { fadeUp, staggerContainer } from "@/styles/animations";
import { Target, BarChart2, Users, Building2, Cpu, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Echowin Wealth Private Limited",
  description:
    "Analytics-backed investment solutions. A team of finance professionals from ICICI Bank combined with data analytics specialists.",
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Echowin Wealth"
        title="Intelligent Wealth"
        titleHighlight="For Every One"
        description="We combine the precision of data analytics with deep financial expertise to deliver investment solutions tailored to your unique individuality."
      />

      {/* Mission & Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  To look after the best financial interests of each of our clients
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Echowin Wealth was established with the philosophy of bringing top notch
                  investment solutions for every one — not just the privileged few.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe every investor deserves access to intelligent, data-driven
                  wealth management. Our proprietary analytical models adapt recommendations
                  based on changing market conditions, tax regulations, inflation, economic
                  factors, and your personal demographics.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Cpu className="w-5 h-5" />, label: "Algorithm-driven", desc: "Data signals guide every recommendation" },
                  { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics-backed", desc: "Quality investing through rigorous analysis" },
                  { icon: <Users className="w-5 h-5" />, label: "Client-first", desc: "Your financial goals drive our work" },
                  { icon: <Database className="w-5 h-5" />, label: "Data-powered", desc: "Extensive data mining for superior results" },
                ].map((item) => (
                  <GlassCard key={item.label} className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                      {item.icon}
                    </div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Our Approach"
              title="Process Centric"
              titleHighlight="Data Backed Approach"
              description="Analytics Backed Quality Investing Recommendations — our framework combines institutional-grade research with cutting-edge data science."
            />
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              {
                step: "01",
                title: "Understand",
                desc: "We start by deeply understanding your goals, risk appetite, investment horizon, and personal circumstances.",
              },
              {
                step: "02",
                title: "Analyse",
                desc: "Our algorithms process thousands of data points — market trends, macro factors, fund performance — to identify optimal opportunities.",
              },
              {
                step: "03",
                title: "Execute",
                desc: "We implement tailored strategies with full transparency, client participation, flexibility, and ongoing monitoring.",
              },
            ].map((step) => (
              <AnimatedItem key={step.step} variants={fadeUp}>
                <GlassCard className="p-8 h-full" hover>
                  <div className="text-5xl font-black text-primary/10 mb-4">{step.step}</div>
                  <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </GlassCard>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Our Team"
              title="Finance Expertise Meets"
              titleHighlight="Data Science"
              description="Our team brings together seasoned finance professionals from leading institutions with specialists in data analytics and data mining."
            />
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            <AnimatedItem variants={fadeUp}>
              <GlassCard className="p-8" hover>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Finance Professionals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our core advisory team comprises finance professionals with extensive
                  experience at major institutions, including ICICI Bank. They bring
                  decades of market knowledge and client relationship expertise.
                </p>
              </GlassCard>
            </AnimatedItem>

            <AnimatedItem variants={fadeUp}>
              <GlassCard className="p-8" hover>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Data Analytics Specialists</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We have recruited specialists in data analytics and data mining to
                  support our algorithm-driven wealth management strategies — translating
                  complex market signals into actionable investment decisions.
                </p>
              </GlassCard>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Our Reach
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              We serve clients across several companies
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              From individual investors to corporate clients — our solutions scale to
              every need.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
