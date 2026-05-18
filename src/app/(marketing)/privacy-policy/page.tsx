import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — Echowin Wealth Private Limited",
  description: "Privacy policy for Echowin Wealth Private Limited.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        titleHighlight="Policy"
        description="Effective Date: February 14, 2019"
      />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-muted-foreground">
            <PolicySection title="Overview">
              <p>
                This privacy policy sets out how Echowin Wealth Private Limited uses and
                protects any information that you share when you use this website. Echowin
                Wealth Private Limited is committed to ensuring that your privacy is
                protected.
              </p>
            </PolicySection>

            <PolicySection title="Who We Are">
              <p>
                Echowin Wealth Private Limited is an AMFI (SEBI) registered Mutual Fund
                Distributor. We provide financial advisory and investment management
                services to clients across India.
              </p>
            </PolicySection>

            <PolicySection title="Information We Collect">
              <p>We may collect the following information:</p>
              <ul>
                <li>Personal identifiers including names, email addresses, and contact information during registration or service use</li>
                <li>Image data from device cameras/galleries for document verification and Video KYC processes</li>
                <li>Location data to verify identity and enable app functionality</li>
                <li>Financial information required to provide advisory services</li>
              </ul>
            </PolicySection>

            <PolicySection title="How We Use Your Information">
              <p>We use your information to:</p>
              <ul>
                <li>Provide financial advisory and investment management services</li>
                <li>Verify your identity and comply with regulatory requirements</li>
                <li>Communicate with you about your account and investments</li>
                <li>Improve our services and user experience</li>
              </ul>
            </PolicySection>

            <PolicySection title="Data Protection">
              <p>
                We are committed to ensuring your information is secure. Our security
                safeguards include 256-bit encryption for all communications and encrypted
                password storage. Data is hosted with top-tier providers with continuous
                backups.
              </p>
            </PolicySection>

            <PolicySection title="Your Rights">
              <p>
                You have the right to update your account details, manage communication
                preferences, delete your account, or request personal information removal.
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:care@echowin.in"
                  className="text-primary hover:underline"
                >
                  care@echowin.in
                </a>{" "}
                or through app settings.
              </p>
            </PolicySection>

            <PolicySection title="Third-Party Disclosure">
              <p>
                Your information may be shared with government bodies, regulators, or
                judicial authorities as legally required. We do not otherwise share your
                personal information with third parties without your consent.
              </p>
            </PolicySection>

            <PolicySection title="External Links">
              <p>
                Our website may contain links to other websites. We are not responsible
                for the privacy practices of those sites and encourage you to review
                their privacy policies.
              </p>
            </PolicySection>

            <PolicySection title="Contact Us">
              <p>
                For any privacy-related queries, please contact:{" "}
                <a
                  href="mailto:care@echowin.in"
                  className="text-primary hover:underline"
                >
                  care@echowin.in
                </a>
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                Echowin Wealth Private Limited (formerly HealthofWealth Financial
                Advisors Private Limited)
              </p>
            </PolicySection>
          </div>
        </div>
      </section>
    </>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4">
        {title}
      </h2>
      <div className="pl-4 space-y-3">{children}</div>
    </div>
  );
}
