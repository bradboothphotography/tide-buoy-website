export type FeatureIconKind =
  | "chart"
  | "spark"
  | "pin"
  | "wave"
  | "bookmark"
  | "fish"
  | "calendar";

export type FeaturePage = {
  slug: string;
  title: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: FeatureIconKind;
  screenshot: string;
  kicker: string;
  intro: string;
  whyItMatters: string[];
  howItHelps: string[];
  practicalUses: string[];
  relatedFeatures: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: "accurate-tides-in-your-location",
    title: "Accurate Tides in Your Location",
    shortDescription: "Check a clean tide chart for the place you actually care about right now.",
    metaTitle: "Accurate Local Tide Charts | Tide Buoy Tide App Feature",
    metaDescription: "See how Tide Buoy shows accurate tides in your location with a cleaner chart view built for fast coastal planning.",
    icon: "chart",
    screenshot: "/images/app-screenshots/marketing/accurate-tides-in-your-location.jpg",
    kicker: "Tide app feature",
    intro:
      "Tide Buoy is built around one simple idea: tide data should feel local, obvious, and easy to read. This screen brings the tide chart, the next shift, and the daily numbers together in one place.",
    whyItMatters: [
      "Most people are not checking a generic coastline. They want to know what the tide is doing at the beach, inlet, harbor, or coastal town they are actually headed to.",
      "A local tide chart becomes more useful when the next important change is visible right away instead of buried in a crowded screen.",
      "Fast local checks are especially helpful when you are deciding whether to surf, fish, launch, shoot photos, or head to the beach before the window changes."
    ],
    howItHelps: [
      "Shows the tide curve in a clean visual chart that is easy to scan.",
      "Highlights whether the tide is incoming or outgoing without extra clutter.",
      "Keeps the next tide event and the daily highs and lows close together on the same screen."
    ],
    practicalUses: [
      "Quick morning checks before leaving for the coast.",
      "Timing a session when you only have a short window around the best water movement.",
      "Understanding the shape of the day without bouncing between multiple tide tools."
    ],
    faqs: [
      {
        question: "Is this a live tide chart on the web?",
        answer: "Not yet. Tide Buoy shows live tide charts in the iOS app, and the web version is being built as a guide and SEO resource."
      },
      {
        question: "Why does the local view matter?",
        answer: "Because tide timing only becomes useful when it is tied to the beach, inlet, or harbor you actually plan to visit."
      }
    ],
    relatedFeatures: ["seven-day-tide-forecast", "save-different-spots"]
  },
  {
    slug: "closest-live-swell-buoy-data",
    title: "Closest Live Swell Buoy Data",
    shortDescription: "See nearby buoy readings for swell height, period, direction, and water temperature.",
    metaTitle: "Live Swell Buoy Data in Tide Buoy | Surf Tide App Feature",
    metaDescription: "Learn how Tide Buoy surfaces nearby swell buoy data so surfers and coastal users can plan with more context.",
    icon: "wave",
    screenshot: "/images/app-screenshots/marketing/closest-live-swell-buoy-data.jpg",
    kicker: "Tide app feature",
    intro:
      "Tide Buoy is not only about tide times. For many ocean users, swell context matters too. This view brings nearby buoy details into the same planning flow so the app feels more useful for real coastal decisions.",
    whyItMatters: [
      "Tide alone does not explain the full picture for surf and ocean exposure.",
      "Nearby buoy data helps you understand what the ocean is sending toward your coastline.",
      "Having swell height, period, direction, and water temperature close at hand keeps planning simpler."
    ],
    howItHelps: [
      "Surfaces the closest live buoy readings in an easy-to-scan card layout.",
      "Pairs those readings with tide context so you can read both together.",
      "Keeps the view simple enough for quick checks before you head out."
    ],
    practicalUses: [
      "Checking if the swell is worth a surf session.",
      "Comparing ocean conditions between favorite spots.",
      "Using water temperature and direction data to prepare better before arrival."
    ],
    faqs: [
      {
        question: "Is buoy data useful without surf knowledge?",
        answer: "Yes. Even casual coast users can use swell height, period, and direction to understand how active the ocean is."
      },
      {
        question: "Why combine tide and swell information?",
        answer: "Tide and swell together give a fuller picture of the water than either one alone."
      }
    ],
    relatedFeatures: ["accurate-tides-in-your-location", "live-fishing-and-lunar-data"]
  },
  {
    slug: "live-fishing-and-lunar-data",
    title: "Live Fishing and Lunar Data",
    shortDescription: "Use moon phase, tide movement, and fishing timing signals in one focused screen.",
    metaTitle: "Fishing and Lunar Tide App Feature | Tide Buoy",
    metaDescription: "Explore Tide Buoy's fishing and lunar data view for tide-aware anglers who want moon and feeding-window context.",
    icon: "fish",
    screenshot: "/images/app-screenshots/marketing/live-fishing-and-lunar-data.jpg",
    kicker: "Tide app feature",
    intro:
      "For anglers, the tide is only part of the story. Tide Buoy brings together tide movement, fishing timing, and lunar context so it is easier to make practical decisions before you head out.",
    whyItMatters: [
      "Fishing windows often depend on moving water, time of day, and moon phase together.",
      "Keeping those signals together reduces the need to check multiple apps or charts.",
      "A simpler fishing screen helps you make a faster call when the window looks good."
    ],
    howItHelps: [
      "Shows a fishing-specific view with tide and lunar context on one screen.",
      "Keeps the next tide change visible while also showing a fishing score and time window.",
      "Makes the app more useful for anglers who want a tide app with a little more planning depth."
    ],
    practicalUses: [
      "Checking whether a rising or falling tide lines up with a stronger fishing window.",
      "Using lunar context to add one more layer to a planned session.",
      "Making quick go-or-wait decisions before driving to the water."
    ],
    faqs: [
      {
        question: "Is this meant for serious anglers?",
        answer: "Yes, but it is still simple enough for people who only fish occasionally and want a quick check before leaving."
      },
      {
        question: "Why include lunar data?",
        answer: "Moon phase and tide movement are both useful context when you are trying to understand a fishing window."
      }
    ],
    relatedFeatures: ["closest-live-swell-buoy-data", "accurate-tides-in-your-location"]
  },
  {
    slug: "easy-and-clean-interface",
    title: "Easy and Clean Interface",
    shortDescription: "A simple tide app layout that reads clearly outdoors and under time pressure.",
    metaTitle: "Clean Tide App Interface | Tide Buoy Feature",
    metaDescription: "Learn how Tide Buoy uses a clean tide app interface to make charts, saved spots, map tools, and settings easier to use.",
    icon: "spark",
    screenshot: "/images/app-screenshots/marketing/easy-and-clean-interface.jpg",
    kicker: "Tide app feature",
    intro:
      "A tide app should not feel like work. Tide Buoy keeps the navigation simple so you can jump into saved spots, the map picker, premium, support, and settings without fighting the interface.",
    whyItMatters: [
      "A cleaner interface means less time hunting through menus and more time actually using the information.",
      "Many tide checks happen outside, in a hurry, or with one hand. That makes spacing, contrast, and visual simplicity especially important.",
      "An app that feels calm and understandable gets reused more often than one that feels crowded."
    ],
    howItHelps: [
      "Keeps the main navigation focused on the features real users come back to most.",
      "Uses simple wording and large touch targets for faster movement through the app.",
      "Supports repeat daily use by reducing visual noise."
    ],
    practicalUses: [
      "Opening the app quickly before a surf or fishing stop.",
      "Jumping back into saved spots without digging through layered screens.",
      "Helping new users understand the app immediately."
    ],
    faqs: [
      {
        question: "Why is a clean interface important in a tide app?",
        answer: "People often check tides outside, in a hurry, or one-handed. A simpler layout makes the app faster to use and easier to trust."
      },
      {
        question: "Does Tide Buoy still keep advanced features?",
        answer: "Yes. The app stays simple up front, but it still includes the tools people need for tides, maps, saved spots, and planning."
      }
    ],
    relatedFeatures: ["save-different-spots", "choose-any-new-location-on-map"]
  },
  {
    slug: "choose-any-new-location-on-map",
    title: "Choose Any New Location on Map",
    shortDescription: "Drop into the map picker and move to the exact coastal spot you want to check.",
    metaTitle: "Map Picker Tide App Feature | Tide Buoy",
    metaDescription: "See how Tide Buoy lets you choose a new tide-check location on the map for more flexible local planning.",
    icon: "pin",
    screenshot: "/images/app-screenshots/marketing/choose-any-new-location-on-map.jpg",
    kicker: "Tide app feature",
    intro:
      "Not every tide check starts from a saved favorite. The map picker gives you a fast way to move to a new area, center the map, and use that spot for a more exact tide check.",
    whyItMatters: [
      "Coastal planning often changes once you see crowds, wind, swell, beach access, or travel timing.",
      "A map-based picker helps people explore nearby options instead of being locked into a fixed list.",
      "Precision matters when a small shift in location can change how useful the tide check becomes."
    ],
    howItHelps: [
      "Lets you move the map to a new coastal area quickly.",
      "Shows a clear location pin and coordinate readout before you commit to the spot.",
      "Makes it easier to test alternate beaches, harbors, or shoreline access points."
    ],
    practicalUses: [
      "Finding a better launch or fishing area nearby.",
      "Checking a destination you have not saved yet.",
      "Comparing multiple local spots before deciding where to go."
    ],
    faqs: [
      {
        question: "Can I use the map picker for a place I have never saved?",
        answer: "Yes. The map picker is designed for exploring new coastlines, not just revisiting old favorites."
      },
      {
        question: "Why is precise location useful for tides?",
        answer: "Because a small location shift can change which beach, inlet, or launch you should plan around."
      }
    ],
    relatedFeatures: ["accurate-tides-in-your-location", "save-different-spots"]
  },
  {
    slug: "save-different-spots",
    title: "Save Different Spots",
    shortDescription: "Keep your favorite beaches, towns, and tide-check locations ready to revisit fast.",
    metaTitle: "Saved Spots Feature | Tide Buoy Tide App",
    metaDescription: "See how Tide Buoy lets you save different tide locations so favorite spots are easier to revisit and compare.",
    icon: "bookmark",
    screenshot: "/images/app-screenshots/marketing/save-different-spots.jpg",
    kicker: "Tide app feature",
    intro:
      "If you check the same stretch of coast over and over, saved spots matter. Tide Buoy lets you keep those locations close so returning to them feels immediate.",
    whyItMatters: [
      "Most people have a rotation of go-to beaches, harbors, launches, and travel stops.",
      "Saving locations reduces friction and makes the app feel personal instead of generic.",
      "It also makes comparing likely options much faster when plans shift."
    ],
    howItHelps: [
      "Stores multiple favorite spots in one clean saved list.",
      "Makes it easy to jump back into recurring local checks.",
      "Supports faster planning when you alternate between regions or seasonal spots."
    ],
    practicalUses: [
      "Saving home breaks, travel beaches, and fishing stops.",
      "Switching quickly between east coast, west coast, or Alaska spots in one app.",
      "Building a personal shortlist of places you check most often."
    ],
    faqs: [
      {
        question: "Can I keep multiple tide locations?",
        answer: "Yes. Tide Buoy is built around saved spots so you can return to the places you check most."
      },
      {
        question: "Does saving spots help with travel?",
        answer: "It does. You can keep a local shortlist for trips, seasonal spots, or places you check only occasionally."
      }
    ],
    relatedFeatures: ["choose-any-new-location-on-map", "accurate-tides-in-your-location"]
  },
  {
    slug: "seven-day-tide-forecast",
    title: "7-Day Tide Forecast",
    shortDescription: "Look ahead across the week and plan your sessions around future tide windows.",
    metaTitle: "7-Day Tide Forecast Feature | Tide Buoy",
    metaDescription: "Learn how Tide Buoy's 7-day tide forecast helps users plan surf, fishing, boating, and beach time in advance.",
    icon: "calendar",
    screenshot: "/images/app-screenshots/marketing/seven-day-tide-forecast.jpg",
    kicker: "Tide app feature",
    intro:
      "Some decisions happen now, but others are about the next good morning, the next travel day, or the next weather window. The 7-day tide forecast helps you look ahead without losing clarity.",
    whyItMatters: [
      "Planning ahead is useful for surf trips, family beach time, photography, and fishing windows.",
      "A longer tide view helps people compare which days are worth circling on the calendar.",
      "Forecast browsing should stay simple, not turn into another overloaded chart."
    ],
    howItHelps: [
      "Shows future tides in a readable stacked format.",
      "Makes it easier to scan upcoming days quickly.",
      "Supports longer-range planning while keeping the interface consistent with the rest of the app."
    ],
    practicalUses: [
      "Picking the best day of the week for a surf or fishing run.",
      "Planning beach access around lower tides in advance.",
      "Coordinating tide timing with travel, weather, and free time."
    ],
    faqs: [
      {
        question: "Why use a 7-day tide forecast?",
        answer: "Because many decisions are about planning ahead, not just checking the next tide change right now."
      },
      {
        question: "Is the weekly view harder to read?",
        answer: "Not in Tide Buoy. The forecast is designed to stay readable and simple, even when you look ahead across several days."
      }
    ],
    relatedFeatures: ["accurate-tides-in-your-location", "save-different-spots"]
  }
];

export function getFeaturePage(slug: string) {
  return featurePages.find((feature) => feature.slug === slug);
}
