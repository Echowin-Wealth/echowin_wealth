"use client";

import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { Offering } from "@/lib/types";

interface OfferingFormProps {
  offering?: Offering;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function OfferingForm({ offering, onSuccess, onCancel }: OfferingFormProps) {
  const isEdit = !!offering;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: offering?.slug ?? "",
    title: offering?.title ?? "",
    short_desc: offering?.short_desc ?? "",
    full_desc: offering?.full_desc ?? "",
    icon_name: offering?.icon_name ?? "",
    is_published: offering?.is_published ?? true,
    features: offering?.features ?? [""],
    sort_order: offering?.sort_order ?? 0,
  });

  function setFeature(idx: number, val: string) {
    const updated = [...form.features];
    updated[idx] = val;
    setForm((f) => ({ ...f, features: updated }));
  }

  function addFeature() {
    setForm((f) => ({ ...f, features: [...f.features, ""] }));
  }

  function removeFeature(idx: number) {
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/offerings", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: offering?.id,
          features: form.features.filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success(isEdit ? "Offering updated" : "Offering created");
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "offerings" }),
      });
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Short Description</Label>
        <Textarea value={form.short_desc} onChange={(e) => setForm((f) => ({ ...f, short_desc: e.target.value }))} rows={2} className="resize-none" />
      </div>

      <div className="space-y-2">
        <Label>Full Description</Label>
        <Textarea value={form.full_desc} onChange={(e) => setForm((f) => ({ ...f, full_desc: e.target.value }))} rows={4} className="resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Icon Name (Lucide)</Label>
          <Input
            value={form.icon_name}
            onChange={(e) => setForm((f) => ({ ...f, icon_name: e.target.value }))}
            placeholder="Target, TrendingUp, Shield…"
          />
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Features</Label>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={f}
              onChange={(e) => setFeature(i, e.target.value)}
              placeholder={`Feature ${i + 1}`}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(i)} className="shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addFeature} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Feature
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={form.is_published}
          onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
          id="is_published"
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEdit ? "Update" : "Create"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
