import { ArrowRight, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SIGNUP_URL } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection className="space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <TrendingUp className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to grow your{" "}
              <span className="gradient-text">wealth intelligently?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Join clients who trust Echowin Wealth&apos;s data-driven approach to build
              lasting financial well-being.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 h-12 px-8 text-base")}
            >
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:care@echowin.in"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-base")}
            >
              Talk to an Advisor
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
