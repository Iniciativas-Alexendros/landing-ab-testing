import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/resultados", "/api/"] },
    sitemap: `${siteConfig.seo.url}/sitemap.xml`,
  };
}
