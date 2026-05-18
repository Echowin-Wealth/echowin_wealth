"use client";

import { useState, useCallback, useEffect } from "react";
import { Plus, Edit2, Trash2, Package, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OfferingForm } from "@/components/admin/OfferingForm";
import { toast } from "sonner";
import type { Offering } from "@/lib/types";

export default function AdminOfferings() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Offering | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/offerings");
    if (res.ok) setOfferings(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this offering?")) return;
    const res = await fetch(`/api/admin/offerings?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else {
      toast.error("Failed to delete");
    }
  }

  async function togglePublish(offering: Offering) {
    const res = await fetch("/api/admin/offerings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...offering, is_published: !offering.is_published }),
    });
    if (res.ok) {
      toast.success(offering.is_published ? "Unpublished" : "Published");
      load();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Offerings
          </h1>
          <p className="text-muted-foreground mt-1">Manage service offerings.</p>
        </div>
        <Button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Offering
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading…</p>
        ) : offerings.length === 0 ? (
          <p className="text-muted-foreground text-sm">No offerings yet.</p>
        ) : (
          offerings.map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{o.title}</p>
                  <Badge variant={o.is_published ? "default" : "secondary"} className="shrink-0">
                    {o.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">{o.short_desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePublish(o)}
                  title={o.is_published ? "Unpublish" : "Publish"}
                >
                  {o.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { setEditing(o); setDialogOpen(true); }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(o.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Offering" : "New Offering"}</DialogTitle>
          </DialogHeader>
          <OfferingForm
            offering={editing ?? undefined}
            onSuccess={() => { setDialogOpen(false); load(); }}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
