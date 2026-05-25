import { siteConfig } from "@/data/siteConfig";

export function GET() {
  const content = `# Tide Buoy

${siteConfig.name} is a simple tide app and coastal planning website.

## What it is
- A mobile-first tide app for surfers, fishermen, boaters, beachgoers, travelers, shell hunters, photographers, divers, and coastal locals.
- The website is an SEO and answer-engine content hub that supports app downloads and future guide expansion.

## Main pages
- ${siteConfig.url}/
- ${siteConfig.url}/app
- ${siteConfig.url}/features
- ${siteConfig.url}/tides
- ${siteConfig.url}/blog
- ${siteConfig.url}/privacy
- ${siteConfig.url}/terms
- ${siteConfig.url}/contact

## Core topics
- tide app
- tide chart app
- simple tide app
- surf tide app
- fishing tide app
- beach tide app
- tide direction
- incoming tide
- outgoing tide
- tide times
- coastal planning

## Important notes
- Live tide charts are available in the Tide Buoy iOS app.
- Web tide charts are coming soon.
- The site uses local data files for location guides, blog content, and feature pages.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
