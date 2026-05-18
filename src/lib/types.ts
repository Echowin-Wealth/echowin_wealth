export interface SiteContent {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string | null;
  value_json: unknown | null;
  is_visible: boolean;
  sort_order: number;
  updated_at: string;
}

export interface Offering {
  id: string;
  slug: string;
  title: string;
  short_desc: string | null;
  full_desc: string | null;
  features: string[];
  icon_name: string | null;
  is_published: boolean;
  sort_order: number;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  type: "office" | "phone" | "email" | "whatsapp";
  label: string | null;
  value: string;
  meta: Record<string, unknown> | null;
  is_visible: boolean;
  sort_order: number;
}

export interface SeoMetadata {
  id: string;
  page: string;
  title: string | null;
  description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
}

export interface MediaItem {
  id: string;
  name: string;
  storage_path: string;
  public_url: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  usage_tag: string | null;
  uploaded_at: string;
}

export type PageContentMap = Record<string, string | Record<string, unknown>>;
export type ContentBySection = Record<string, PageContentMap>;
