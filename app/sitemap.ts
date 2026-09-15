import type { MetadataRoute } from "next";
import { config } from "@/content/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: config.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
