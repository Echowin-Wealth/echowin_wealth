import { ContentEditor } from "@/components/admin/ContentEditor";
import { fetchPageContent } from "@/lib/data/content";
import { Home } from "lucide-react";

export default async function AdminHomepage() {
  const [heroContent, trustContent, navContent] = await Promise.all([
    fetchPageContent("home", "hero"),
    fetchPageContent("home", "trust"),
    fetchPageContent("global", "navbar"),
  ]);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-6 h-6" />
          Homepage Editor
        </h1>
        <p className="text-muted-foreground mt-1">
          Edit homepage content. Changes go live instantly.
        </p>
      </div>

      <ContentEditor
        page="home"
        section="hero"
        title="Hero Section"
        fields={[
          { key: "headline", label: "Headline", type: "textarea" },
          { key: "subheadline", label: "Sub-headline", type: "textarea" },
          { key: "cta_text", label: "CTA Button Text" },
          { key: "cta_url", label: "CTA Button URL", type: "url" },
          { key: "name_change_notice", label: "Name Change Notice" },
        ]}
        initialValues={heroContent as Record<string, string>}
      />

      <ContentEditor
        page="home"
        section="trust"
        title="Trust Badges"
        fields={[
          { key: "amfi_label", label: "AMFI Badge Label" },
          { key: "startup_label", label: "Startup India Badge Label" },
        ]}
        initialValues={trustContent as Record<string, string>}
      />

      <ContentEditor
        page="global"
        section="navbar"
        title="Navbar Links"
        fields={[
          { key: "client_login_url", label: "Login Button URL", type: "url" },
          { key: "signup_url", label: "Sign Up Button URL", type: "url" },
        ]}
        initialValues={navContent as Record<string, string>}
      />
    </div>
  );
}
