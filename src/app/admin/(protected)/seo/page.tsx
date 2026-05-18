"use client";

import { useState, useEffect } from "react";
import { Search, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { SeoMetadata } from "@/lib/types";

const PAGES = ["home", "about", "offerings", "contact"] as const;

function SEOForm({ pageName }: { pageName: string }) {
  const [data, setData] = useState<Partial<SeoMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/seo?page=${pageName}`)
      .then((r) => r.json())
      .then((d) => { setData(d ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, [pageName]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: pageName }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("SEO saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-2">
        <Label>Page Title</Label>
        <Input
          value={data.title ?? ""}
          onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          placeholder="Page title (shown in browser tab)"
        />
      </div>
      <div className="space-y-2">
        <Label>Meta Description</Label>
        <Textarea
          value={data.description ?? ""}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
          rows={3}
          className="resize-none"
          placeholder="Brief description for search engines (150-160 chars)"
        />
      </div>
      <div className="space-y-2">
        <Label>OG Title</Label>
        <Input
          value={data.og_title ?? ""}
          onChange={(e) => setData((d) => ({ ...d, og_title: e.target.value }))}
          placeholder="Open Graph title (for social sharing)"
        />
      </div>
      <div className="space-y-2">
        <Label>OG Description</Label>
        <Textarea
          value={data.og_description ?? ""}
          onChange={(e) => setData((d) => ({ ...d, og_description: e.target.value }))}
          rows={2}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label>OG Image URL</Label>
        <Input
          value={data.og_image_url ?? ""}
          onChange={(e) => setData((d) => ({ ...d, og_image_url: e.target.value }))}
          type="url"
          placeholder="https://…"
        />
      </div>
      <div className="space-y-2">
        <Label>Keywords (comma-separated)</Label>
        <Input
          value={(data.keywords ?? []).join(", ")}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
            }))
          }
          placeholder="financial advisor, mutual funds, SIP…"
        />
      </div>
      <Button onClick={handleSave} disabled={saving} className="gap-2">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Save SEO
      </Button>
    </div>
  );
}

export default function AdminSEO() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Search className="w-6 h-6" />
          SEO Metadata
        </h1>
        <p className="text-muted-foreground mt-1">Manage page titles, descriptions, and Open Graph tags.</p>
      </div>

      <Tabs defaultValue="home">
        <TabsList>
          {PAGES.map((p) => (
            <TabsTrigger key={p} value={p} className="capitalize">
              {p === "home" ? "Homepage" : p.charAt(0).toUpperCase() + p.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {PAGES.map((p) => (
          <TabsContent key={p} value={p} className="pt-6">
            <SEOForm pageName={p} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
