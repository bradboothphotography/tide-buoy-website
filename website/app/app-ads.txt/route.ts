import { siteConfig } from "@/data/siteConfig";

export const runtime = "nodejs";

export function GET() {
  return new Response(`${siteConfig.appAdsContent}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
