import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { blogPosts } from "@/data/blogPosts";
import { featurePages } from "@/data/features";
import { useCasePages } from "@/data/useCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/app", "/features", "/tides", "/blog", "/use-cases", "/privacy", "/terms", "/contact"];
  const blogPages = blogPosts.map((post) => `/blog/${post.slug}`);
  const featureUrls = featurePages.map((feature) => `/features/${feature.slug}`);
  const useCaseUrls = useCasePages.map((useCase) => `/use-cases/${useCase.slug}`);
  const lastModified = new Date();

  return [...staticPages, ...blogPages, ...featureUrls, ...useCaseUrls].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/blog" || path === "/features" || path === "/use-cases" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/app"
          ? 0.95
          : path === "/features" || path === "/blog" || path === "/use-cases"
            ? 0.85
            : path.startsWith("/features/") || path.startsWith("/blog/") || path.startsWith("/use-cases/")
              ? 0.8
              : path === "/tides"
                ? 0.75
                : 0.45
  }));
}
