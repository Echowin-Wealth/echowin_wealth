import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echowin.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/offerings", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/contact-us", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
