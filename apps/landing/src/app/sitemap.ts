import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.seo.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.seo.url}/gracias`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
