import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterXIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { fadeUp } from "@/styles/animations";
import { fetchContactInfo } from "@/lib/data/contact";
import type { ContactInfo } from "@/lib/types";
import { SOCIAL_LINKS } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact Us — Echowin Wealth Hyderabad & Bengaluru",
  description:
    "Reach our offices in Hyderabad and Bengaluru. Call 040-7963-2712 or email care@echowin.in",
};

export const revalidate = 3600;

function OfficeCard({ info }: { info: ContactInfo }) {
  const city = (info.meta as Record<string, unknown>)?.city as string;
  const state = (info.meta as Record<string, unknown>)?.state as string;

  return (
    <AnimatedItem variants={fadeUp}>
      <GlassCard className="p-8" hover>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{info.label}</h3>
            {city && state && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {city}, {state}
              </p>
            )}
            <p className="text-muted-foreground leading-relaxed text-sm">{info.value}</p>
          </div>
        </div>
      </GlassCard>
    </AnimatedItem>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card/40 hover:bg-card transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="font-medium text-sm hover:text-primary transition-colors">
            {value}
          </a>
        ) : (
          <p className="font-medium text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const contacts = await fetchContactInfo();

  const offices = contacts.filter((c) => c.type === "office");
  const phones = contacts.filter((c) => c.type === "phone");
  const emails = contacts.filter((c) => c.type === "email");
  const whatsapp = contacts.filter((c) => c.type === "whatsapp");

  const socialLinks = [
    { href: SOCIAL_LINKS.facebook, icon: <FacebookIcon />, label: "Facebook" },
    { href: SOCIAL_LINKS.instagram, icon: <InstagramIcon />, label: "Instagram" },
    { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
    { href: SOCIAL_LINKS.twitter, icon: <TwitterXIcon />, label: "Twitter/X" },
    { href: SOCIAL_LINKS.youtube, icon: <YoutubeIcon />, label: "YouTube" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="We&apos;re Here"
        titleHighlight="For You"
        description="Visit us at our offices in Hyderabad or Bengaluru, call us, or drop an email — we'd love to help with your financial journey."
      />

      {/* Offices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Offices
            </p>
            <h2 className="text-3xl font-bold mt-2">
              Two locations, one commitment
            </h2>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {offices.map((office) => (
              <OfficeCard key={office.id} info={office} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Channels
            </p>
            <h2 className="text-3xl font-bold mt-2">Reach us your way</h2>
            <p className="text-muted-foreground mt-3">
              Feel free to visit during normal business hours.
            </p>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {phones.map((p) => (
              <AnimatedItem key={p.id} variants={fadeUp}>
                <ContactItem
                  icon={<Phone className="w-4 h-4" />}
                  label={p.label ?? "Phone"}
                  value={p.value}
                  href={`tel:${p.value.replace(/[^+\d]/g, "")}`}
                />
              </AnimatedItem>
            ))}
            {emails.map((e) => (
              <AnimatedItem key={e.id} variants={fadeUp}>
                <ContactItem
                  icon={<Mail className="w-4 h-4" />}
                  label={e.label ?? "Email"}
                  value={e.value}
                  href={`mailto:${e.value}`}
                />
              </AnimatedItem>
            ))}
            {whatsapp.map((w) => (
              <AnimatedItem key={w.id} variants={fadeUp}>
                <ContactItem
                  icon={<MessageCircle className="w-4 h-4" />}
                  label={w.label ?? "WhatsApp"}
                  value={w.value}
                  href={`https://wa.me/${w.value.replace(/[^+\d]/g, "")}`}
                />
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Social */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Follow Us
            </p>
            <h2 className="text-2xl font-bold">Stay connected</h2>
            <div className="flex items-center justify-center gap-4 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
