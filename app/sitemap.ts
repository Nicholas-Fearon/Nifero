import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...services.map(({ slug }) => `/services/${slug}`), "/privacy", "/data-protection", "/cookies"]
    .map((path) => ({ url: new URL(path, siteUrl).href }));
}
