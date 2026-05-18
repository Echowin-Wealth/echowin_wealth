import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterXIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import {
  COMPANY_NAME,
  FOUNDED_YEAR,
  FOOTER_LINKS,
  NAV_LINKS,
  SOCIAL_LINKS,
  SIGNUP_URL,
  CLIENT_LOGIN_URL,
} from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Echowin Wealth"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Powered by Data Analytics &amp; Investment Algorithms. AMFI (SEBI) Registered
              Mutual Fund Distributor serving clients across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <SocialLink href={SOCIAL_LINKS.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                <LinkedinIcon />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.twitter} label="Twitter/X">
                <TwitterXIcon />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.youtube} label="YouTube">
                <YoutubeIcon />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CLIENT_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Client Login
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {FOUNDED_YEAR} {COMPANY_NAME}. All Rights Reserved.
          </p>
          <p className="text-xs">
            Formerly HealthofWealth Financial Advisors Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
    >
      {children}
    </a>
  );
}
