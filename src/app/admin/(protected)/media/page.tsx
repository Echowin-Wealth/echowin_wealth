"use client";

import { useState, useEffect, useCallback } from "react";
import { Image, Upload, Trash2, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { MediaItem } from "@/lib/types";

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const [usageTag, setUsageTag] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/media");
    if (res.ok) setFiles(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt_text", altText);
    formData.append("usage_tag", usageTag);

    const res = await fetch("/api/admin/media", { method: "POST", body: formData });
    if (res.ok) {
      toast.success("Uploaded successfully");
      setAltText("");
      setUsageTag("");
      load();
    } else {
      toast.error("Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleDelete(id: string, path: string) {
    if (!confirm("Delete this file?")) return;
    const res = await fetch(`/api/admin/media?id=${id}&path=${encodeURIComponent(path)}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Image className="w-6 h-6" />
          Media Manager
        </h1>
        <p className="text-muted-foreground mt-1">Upload and manage site images and assets.</p>
      </div>

      {/* Upload */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4 max-w-lg">
        <h2 className="font-semibold">Upload New File</h2>
        <div className="space-y-2">
          <Label>Alt Text</Label>
          <Input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image"
          />
        </div>
        <div className="space-y-2">
          <Label>Usage Tag</Label>
          <Input
            value={usageTag}
            onChange={(e) => setUsageTag(e.target.value)}
            placeholder="logo, og-image, hero, badge…"
          />
        </div>
        <label className="block cursor-pointer">
          <span className="inline-flex items-center gap-2 h-8 px-2.5 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading…" : "Choose File"}
          </span>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Files grid */}
      <div>
        <h2 className="font-semibold mb-4">Uploaded Files ({files.length})</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : files.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((f) => (
              <div key={f.id} className="group rounded-xl border border-border bg-card overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  {f.mime_type?.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.public_url} alt={f.alt_text ?? f.name} className="w-full h-full object-cover" />
                  ) : (
                    <Image className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs font-medium truncate">{f.name}</p>
                  {f.usage_tag && (
                    <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {f.usage_tag}
                    </span>
                  )}
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyUrl(f.public_url)}
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(f.id, f.storage_path)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
