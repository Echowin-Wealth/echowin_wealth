import { createClient } from "@/lib/supabase/server";
import { LayoutDashboard, Package, Phone, FileText, Image } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const supabase = await createClient();
    const [offerings, contacts, seo, media] = await Promise.all([
      supabase.from("offerings").select("id", { count: "exact", head: true }),
      supabase.from("contact_info").select("id", { count: "exact", head: true }),
      supabase.from("seo_metadata").select("id", { count: "exact", head: true }),
      supabase.from("media").select("id", { count: "exact", head: true }),
    ]);
    return {
      offerings: offerings.count ?? 0,
      contacts: contacts.count ?? 0,
      seo: seo.count ?? 0,
      media: media.count ?? 0,
    };
  } catch {
    return { offerings: 0, contacts: 0, seo: 0, media: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { href: "/admin/offerings", label: "Offerings", value: stats.offerings, icon: Package, color: "text-indigo-500" },
    { href: "/admin/contact", label: "Contact Info", value: stats.contacts, icon: Phone, color: "text-violet-500" },
    { href: "/admin/seo", label: "SEO Pages", value: stats.seo, icon: FileText, color: "text-sky-500" },
    { href: "/admin/media", label: "Media Files", value: stats.media, icon: Image, color: "text-emerald-500" },
  ];

  const quickLinks = [
    { href: "/admin/homepage", label: "Edit Homepage" },
    { href: "/admin/about", label: "Edit About Us" },
    { href: "/admin/offerings", label: "Manage Offerings" },
    { href: "/admin/contact", label: "Update Contact" },
    { href: "/admin/seo", label: "SEO Settings" },
    { href: "/admin/media", label: "Media Manager" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Welcome to the Echowin Wealth CMS</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
          >
            <card.icon className={`w-6 h-6 mb-3 ${card.color}`} />
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all text-sm font-medium"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      {/* Website preview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-2">Live Website</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Changes saved in the CMS are reflected on the live site within seconds via on-demand revalidation.
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          Open echowin.in →
        </a>
      </div>
    </div>
  );
}
