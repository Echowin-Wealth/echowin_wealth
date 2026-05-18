"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone, Save, Loader2, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { ContactInfo } from "@/lib/types";

export default function AdminContact() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contact");
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function startEdit(c: ContactInfo) {
    setEditingId(c.id);
    setEditValue(c.value);
    setEditLabel(c.label ?? "");
  }

  async function saveEdit(c: ContactInfo) {
    setSaving(true);
    const res = await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, value: editValue, label: editLabel }),
    });
    if (res.ok) {
      toast.success("Updated");
      setEditingId(null);
      load();
    } else {
      toast.error("Failed to update");
    }
    setSaving(false);
  }

  const typeLabel: Record<string, string> = {
    office: "Office",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Phone className="w-6 h-6" />
          Contact Information
        </h1>
        <p className="text-muted-foreground mt-1">
          Edit office addresses, phone numbers, and email addresses.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          contacts.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl border border-border bg-card space-y-3"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline">{typeLabel[c.type] ?? c.type}</Badge>
                {editingId === c.id ? (
                  <Input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="h-7 text-sm"
                    placeholder="Label"
                  />
                ) : (
                  <span className="text-sm font-medium">{c.label}</span>
                )}
              </div>

              {editingId === c.id ? (
                <div className="space-y-2">
                  {c.type === "office" ? (
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={3}
                      className="resize-none text-sm"
                    />
                  ) : (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="text-sm"
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => saveEdit(c)}
                      disabled={saving}
                      className="gap-1.5"
                    >
                      {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="gap-1.5"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-7 w-7"
                    onClick={() => startEdit(c)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
