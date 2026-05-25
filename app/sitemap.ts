import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { blogPosts } from "@/data/blogPosts";
import { featurePages } from "@/data/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/app", "/features", "/tides", "/blog", "/privacy", "/terms", "/contact"];
  const blogPages = blogPosts.map((post) => `/blog/${post.slug}`);
  const featureUrls = featurePages.map((feature) => `/features/${feature.slug}`);
  const lastModified = new Date();

  return [...staticPages, ...blogPages, ...featureUrls].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
