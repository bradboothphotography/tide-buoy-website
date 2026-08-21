export type UseCasePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  kicker: string;
  intro: string;
  readTime: string;
  targetKeyword: string;
  seoTags: string[];
  heroImage: {
    src: string;
    alt: string;
    caption: string;
  };
  images: {
    src: string;
    alt: string;
    caption: string;
    tag: string;
    aspectClass?: string;
    focalPoint?: string;
  }[];
  quickChecks: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    items?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedFeatureSlugs: string[];
  relatedBlogSlugs: string[];
  relatedUseCaseSlugs: string[];
};

export const useCasePages: UseCasePage[] = [
  {
    slug: "surfing",
    title: "Surfing",
    metaTitle: "Best Tide App for Surfing | Tide Buoy",
    metaDescription:
      "Looking for the best tide app for surfing? Tide Buoy helps surfers check tide direction, next tide change, buoy context, and clean local timing fast.",
    excerpt:
      "A surf session usually starts with one simple question: is the tide doing what this spot needs right now?",
    kicker: "Surf guide",
    intro:
      "If you are trying to find the best tide app for surfing, the real test is simple. Can you open it, see whether the tide is pushing or draining, check the next change, and decide if the drive is worth it without bouncing through five screens? That is the lane Tide Buoy is built for.",
    readTime: "6 min read",
    targetKeyword: "best tide app",
    seoTags: ["best tide app for surfing", "tide app for surfers", "best tide for surfing", "surf tide chart", "incoming tide surfing"],
    heroImage: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Gl70Ap-9aFCPX7aDhGO6-210PaD3alTXTFEyP9-hvXbv4rEpeX2ypjGsRl2qKOVejoZLIII6KHcqoyS5cwe1HyYwN4vx7KBYSVaMDbJogLWLlcZhLovjMY8exOFj0kWGhblvNZBmlL2Q3p9H4EvgZ7IxgXXZ_nnX8m4GwUeIWx3Hen2XacgJrw0kk6QWeTYV7kgrCKA4fpTnErnxP2ix7Y7pyWxaNFhZNN3fBeTBrkOMEF2l1EGy03z0o8o9iGM-J1xgZIhxYYA",
      alt: "Surfer tucked inside a blue wave",
      caption: "Surfers usually care less about raw tide tables and more about whether the window lines up with the break."
    },
    images: [
      { src: "/images/use-cases/surfing/surfing-action.jpeg", alt: "Surfer launching off a wave with a coastal mountain range behind the break", caption: "A good surf window starts with the water moving in a way the break can use.", tag: "surf window", aspectClass: "aspect-[4/3]" },
      { src: "/images/use-cases/surfing/surfing-point-break.jpeg", alt: "Surfer riding a wave beside a forested coastal point", caption: "The same tide can feel different from one point, beach, or reef to the next.", tag: "coastal break", aspectClass: "aspect-[4/3]" },
      { src: "/images/use-cases/surfing/surfing-barrel.jpeg", alt: "Surfer tucked inside a translucent breaking wave", caption: "Tide timing is part of finding the short window when a wave has shape and room to run.", tag: "inside the wave", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/surfing/surfing-golden-gate.jpeg", alt: "Surfer riding a wave below the Golden Gate Bridge", caption: "Local knowledge matters. Tide Buoy helps you get to the local check faster.", tag: "local check", aspectClass: "aspect-[3/4]" }
    ],
    quickChecks: [
      "Current tide and whether it is incoming or outgoing",
      "Next high or low tide so you know if the spot is improving or fading",
      "Nearby buoy context for swell height, period, direction, and water temperature",
      "A saved-spot workflow that makes dawn checks quick"
    ],
    sections: [
      {
        heading: "Why surfers care about tide before almost anything else",
        paragraphs: [
          "A surf forecast can look decent on paper and still miss if the tide is wrong for your break. Some spots wake up on a push. Some get fat on high water. Some need mid tide to keep the wave lined up without closing out.",
          "That is why surfers keep coming back to tide. It is one of the fastest ways to filter whether a session has real potential or whether it is just another hopeful parking lot check."
        ]
      },
      {
        heading: "What surfers actually need from the best tide app",
        paragraphs: [
          "Most surfers are not asking a tide app to tell them everything. They want the key pieces that shape the call: current tide level, tide direction, the next change, and enough nearby ocean context to understand the bigger picture.",
          "Tide Buoy keeps that planning flow simple. You can see whether the water is filling in or draining out, how close you are to the next switch, and how nearby buoy conditions fit that tide window."
        ],
        items: [
          "Fast local tide checks for the exact beach, reef, or inlet you care about",
          "Clear incoming and outgoing tide direction",
          "The next high or low tide without extra clutter",
          "Nearby buoy context for a more complete surf read"
        ]
      },
      {
        heading: "Best tide for surfing depends on the break, not a universal rule",
        paragraphs: [
          "There is no one best tide for every surf spot. Beach breaks, jetties, reefs, and inlets all react differently to rising and falling water. A high tide that softens one wave can clean up another. A low tide that turns one bar on can leave a reef too shallow or too fast.",
          "The useful move is not memorizing a generic answer. It is learning your spot, then checking the tide in a way that makes the local window obvious. That is where a simple surf tide chart helps more than a crowded dashboard."
        ]
      },
      {
        heading: "How Tide Buoy fits a real pre-surf routine",
        paragraphs: [
          "A good dawn check should take seconds. Open the app, see what the tide is doing at your saved spot, glance at the next shift, compare that with the buoy, and decide whether to paddle out, wait an hour, or stay home.",
          "That is the practical case for calling Tide Buoy the best tide app for surfers who want a cleaner read. It stays tide-first, but it still gives you the extra coastal context that matters when the ocean is not cooperating."
        ]
      }
    ],
    faqs: [
      {
        question: "What makes a tide app good for surfing?",
        answer:
          "A good surf tide app should show the current tide, whether it is incoming or outgoing, the next high or low tide, and enough local context to help you judge the window quickly."
      },
      {
        question: "Is high tide or low tide better for surfing?",
        answer:
          "Neither is automatically better. The right tide depends on the break. Some spots improve on a push, some need mid tide, and some lose shape once water gets too high or too low."
      },
      {
        question: "Should surfers check buoy data with the tide?",
        answer:
          "Yes. Tide tells you how the water level is changing. Buoy data helps explain what kind of swell is actually reaching the coast. Reading both together usually leads to better calls."
      }
    ],
    relatedFeatureSlugs: ["closest-live-swell-buoy-data", "accurate-tides-in-your-location", "save-different-spots"],
    relatedBlogSlugs: ["best-tide-for-surfing", "florida-beach-day-tide-checklist"],
    relatedUseCaseSlugs: ["beach-days", "diving"]
  },
  {
    slug: "fishing",
    title: "Fishing",
    metaTitle: "Best Tide App for Fishing | Tide Buoy",
    metaDescription:
      "Need the best tide app for fishing? Tide Buoy helps anglers check moving water, incoming vs outgoing tide, and next tide changes before they leave the dock.",
    excerpt:
      "For a lot of anglers, the question is not just what time high tide hits. It is when the water actually starts moving in a way their spot likes.",
    kicker: "Fishing guide",
    intro:
      "The best tide app for fishing should help you make a plain decision before you burn gas, ice down bait, or commit a morning to the wrong window. Tide Buoy is built around that kind of quick judgment, especially for anglers who care about moving water more than flashy extras.",
    readTime: "6 min read",
    targetKeyword: "best tide app",
    seoTags: ["best tide app for fishing", "fishing tide app", "best tide for fishing", "incoming tide fishing", "saltwater fishing tide chart"],
    heroImage: {
      src: "/images/use-cases/fishing.jpeg",
      alt: "Angler standing in coastal water with mountains in the background",
      caption: "Good fishing windows often start with current, access, and timing, not guesswork."
    },
    images: [
      { src: "/images/use-cases/fishing/fishing-beach-cast.jpeg", alt: "Angler casting from a dark beach toward snowy coastal mountains", caption: "A quick tide check can tell you whether the shoreline is about to fill, drain, or change access.", tag: "shoreline check", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/fishing/fishing-catch.jpeg", alt: "Angler standing in shallow water beside trays of fish on a rocky shoreline", caption: "Tide direction helps explain where bait and current seams may set up.", tag: "moving water", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/fishing/fishing-pier.jpeg", alt: "Anglers fishing from a pier in rough coastal water", caption: "The tide matters from a pier, too. Water movement changes the feel of the whole edge.", tag: "pier fishing", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/fishing/fishing-cast.jpeg", alt: "Angler casting a fly rod in shallow water beside a forested coast", caption: "When the window is short, quick tides are easier to use than a crowded forecast screen.", tag: "quick read", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/fishing/fishing-wade.jpeg", alt: "Angler wading in a broad mountain-lined bay", caption: "Exact location matters when a few miles can change depth, current, and access.", tag: "exact location", aspectClass: "aspect-[4/3]" },
      { src: "/images/use-cases/fishing/fishing-boat.jpeg", alt: "Small fishing boat with a kayaker nearby on a mountain-lined lake", caption: "A tide check belongs in the plan before the boat, tackle, and long ride out.", tag: "before launch", aspectClass: "aspect-[3/4]", focalPoint: "center center" }
    ],
    quickChecks: [
      "Current tide and whether water is still or moving",
      "Incoming or outgoing direction for the structure you are fishing",
      "Next high or low tide so you can time the feed, launch, and ride home",
      "Saved spots for regular docks, flats, bridges, and inlets"
    ],
    sections: [
      {
        heading: "Why tide matters so much in fishing",
        paragraphs: [
          "Fish respond to moving water. That movement positions bait, changes current seams, opens up shallow access, and can stack fish around bridges, mangroves, inlets, docks, and points.",
          "When anglers talk about a window turning on, they are often talking about tide as much as weather. Even a short push or drain can change how a whole shoreline fishes."
        ]
      },
      {
        heading: "What anglers need from the best tide app",
        paragraphs: [
          "Fishing apps can get busy fast. A tide app does not need to overwhelm the screen to be useful. It needs to show the direction of the water, the next meaningful shift, and the local timing that fits your spot.",
          "That is where Tide Buoy helps. It keeps the current tide and next change visible, while still giving anglers access to fishing and lunar context when they want another layer."
        ],
        items: [
          "Local tide timing for the exact water you fish",
          "Clear incoming and outgoing tide direction",
          "Fast access to the next high or low tide",
          "A simple way to compare recurring fishing spots"
        ]
      },
      {
        heading: "Incoming vs outgoing tide for fishing",
        paragraphs: [
          "There is no single answer here either. An incoming tide can push cleaner water and bait onto flats or along shoreline cover. An outgoing tide can pull bait through cuts, drains, and current edges where predators wait.",
          "The best tide for fishing is usually the stage that fits your structure, depth, and species. The common thread is movement. Dead slack water often tells anglers to wait, move, or change tactics."
        ]
      },
      {
        heading: "Why Tide Buoy works for fishing days",
        paragraphs: [
          "The best tide app for fishing should let you glance at the app and know whether it is time to leave the house, stall until the water starts moving, or plan for a later push. Tide Buoy is designed for that kind of quick read.",
          "It stays clean, which matters when you are trying to make a fast call in the dark with coffee in one hand and tackle in the other."
        ]
      }
    ],
    faqs: [
      {
        question: "Is incoming or outgoing tide better for fishing?",
        answer:
          "It depends on the species and spot. Many anglers like moving water in either direction because it positions bait and creates feeding lanes. The most important part is usually the movement, not the label alone."
      },
      {
        question: "What should a fishing tide app show first?",
        answer:
          "It should show the current tide, whether the water is rising or falling, and when the next high or low tide is coming. That is the core timing information most anglers use first."
      },
      {
        question: "Does Tide Buoy include fishing-specific context?",
        answer:
          "Yes. Tide Buoy includes a fishing and lunar view for anglers who want more context without turning the whole app into clutter."
      }
    ],
    relatedFeatureSlugs: ["live-fishing-and-lunar-data", "accurate-tides-in-your-location", "save-different-spots"],
    relatedBlogSlugs: ["best-tide-for-fishing", "key-west-lobster-season-tide-guide"],
    relatedUseCaseSlugs: ["boating", "beach-days"]
  },
  {
    slug: "beach-days",
    title: "Beach Days",
    metaTitle: "Best Tide App for Beach Days | Tide Buoy",
    metaDescription:
      "Planning a beach day? Tide Buoy helps you check tide timing, beach access, shelling windows, sandbars, and safer family timing in one quick glance.",
    excerpt:
      "A calmer beach day usually starts before the car is packed, when you check whether the water is coming in, dropping out, or about to change the whole shoreline.",
    kicker: "Beach guide",
    intro:
      "If your version of the best tide app is one that helps with beach walks, shelling, kids, sandbars, photography, and timing the shoreline without overthinking it, Tide Buoy is built in the right direction. It keeps the tide readable so the rest of the day feels easier.",
    readTime: "5 min read",
    targetKeyword: "best tide app",
    seoTags: ["best tide app for beach days", "beach day tide checklist", "beach tide app", "best tide for beach walks", "shelling tide chart"],
    heroImage: {
      src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-waterfront-beach-chair.jpeg",
      alt: "Beach chairs facing calm water beside a palm tree",
      caption: "A simple tide check can change where you set up, how much beach you get, and when the shoreline feels best."
    },
    images: [
      { src: "/images/use-cases/beach-days/beach-walk.jpeg", alt: "Person walking across a reflective beach beneath a bright sky", caption: "A wide, quiet shoreline can look completely different after a tide change.", tag: "beach walk", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/beach-days/beach-wade.jpeg", alt: "Person wading through calm shallow water beneath overhanging trees", caption: "Tide timing helps you know when shallow water will meet the day you have planned.", tag: "shallow water", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/beach-days/beach-driftwood.jpeg", alt: "Large piece of driftwood on a quiet beach beside blue water", caption: "Low water can reveal the small details that make a beach walk worth the drive.", tag: "low tide walk", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/beach-days/beach-sunset.jpeg", alt: "Rocky beach and tide pools at sunset", caption: "An exact location check is useful when a beach, cove, or tide pool has a narrow window.", tag: "tide pools", aspectClass: "aspect-[4/3]" },
      { src: "/images/use-cases/beach-days/beach-waterfall.jpeg", alt: "Small waterfall flowing onto a secluded beach beside clear blue water", caption: "Some shoreline walks are only comfortable when the tide leaves enough room around the rocks.", tag: "shore access", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/beach-days/beach-arch.jpeg", alt: "Ocean waves rolling toward a beach below a natural rock arch", caption: "Check the next tide before exploring headlands, arches, and narrow beach passages.", tag: "coastal exploring", aspectClass: "aspect-[4/3]" }
    ],
    quickChecks: [
      "Current tide and whether the beach is filling in or opening up",
      "Next high or low tide for walks, shelling, and family timing",
      "How the tide fits inlets, sandbars, shallow play zones, and beach access",
      "A quick cue to cross-check beach flags, rip current guidance, and weather"
    ],
    sections: [
      {
        heading: "Why tide changes the feel of a beach day",
        paragraphs: [
          "The same beach can feel wide, easy, and playful at one tide stage, then tight, choppy, or current-heavy a little later. That matters whether you are walking, shelling, swimming, taking photos, or just trying to find a calm place to sit.",
          "Low water can open up sandbars, tide pools, and shell lines. Rising water can eat up setup space and change how waves run through cuts and bars."
        ]
      },
      {
        heading: "What beachgoers need from the best tide app",
        paragraphs: [
          "Most people heading to the beach do not want a marine terminal on their phone. They want a quick, reliable sense of what the shoreline will look like when they arrive and whether it is getting better or worse for the plan they have in mind.",
          "Tide Buoy keeps that simple. You can check the current tide, see whether the water is coming in or going out, and know when the next shift is about to happen."
        ],
        items: [
          "A clean beach tide check before you leave the house",
          "Simple incoming and outgoing labels",
          "The next high or low tide for timing shell walks and family setups",
          "Saved spots for favorite beach towns, piers, and inlets"
        ]
      },
      {
        heading: "Best tide for beach walks, shelling, and sandbars",
        paragraphs: [
          "Lower water often gives beach walkers and shell hunters more ground to work with. It can expose texture, shallows, sandbars, and shell lines that disappear once the tide starts filling back in.",
          "That does not make low tide the answer for every beach day. If your goal is calmer swimming or a later family window, you still need to think about surf, currents, beach flags, and local conditions."
        ]
      },
      {
        heading: "Why Tide Buoy works for easy coastal planning",
        paragraphs: [
          "The best tide app for beach days should feel calm. You should be able to check it in a parking lot, outside a coffee shop, or while loading towels and know what the shoreline is about to do.",
          "That is the point of Tide Buoy. It keeps the beach-day decision simple, then gets out of the way."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the best tide for a beach walk or shelling?",
        answer:
          "Lower water is often better because it exposes more shoreline, shell lines, and shallow edges. The exact sweet spot still depends on the beach and how quickly the water moves there."
      },
      {
        question: "Can a tide app replace beach flags or rip current guidance?",
        answer:
          "No. Use Tide Buoy for tide timing, then cross-check local beach flags, lifeguard guidance, and rip current information before swimming."
      },
      {
        question: "Why check the tide for a family beach day?",
        answer:
          "Because tide affects setup space, shallow play zones, sandbars, shoreline width, and how quickly conditions can change once you are already there."
      }
    ],
    relatedFeatureSlugs: ["accurate-tides-in-your-location", "seven-day-tide-forecast", "save-different-spots"],
    relatedBlogSlugs: ["florida-beach-day-tide-checklist", "how-tides-affect-beach-photography"],
    relatedUseCaseSlugs: ["surfing", "diving"]
  },
  {
    slug: "boating",
    title: "Boating",
    metaTitle: "Best Tide App for Boating | Tide Buoy",
    metaDescription:
      "Need a boating tide app? Tide Buoy helps boaters check launch timing, sandbars, shallow channels, and incoming vs outgoing water before they leave the ramp.",
    excerpt:
      "Boaters do not just check tide for curiosity. They check it because ramps, channels, sandbars, and the ride home can change fast.",
    kicker: "Boating guide",
    intro:
      "The best tide app for boating should help you avoid dumb surprises. It should tell you whether a launch window is shrinking, whether shallow water is becoming a problem, and whether the trip back is about to get tighter than the ride out. That is the kind of boating planning Tide Buoy is made for.",
    readTime: "6 min read",
    targetKeyword: "best tide app",
    seoTags: ["best tide app for boating", "tide app for boaters", "boating tide planner", "boat ramp low tide", "marine tide app"],
    heroImage: {
      src: "/images/use-cases/boating.jpeg",
      alt: "Sailboat at anchor during golden hour",
      caption: "For boaters, a tide chart is often about access, depth, and not getting caught by a bad return window."
    },
    images: [
      { src: "/images/use-cases/boating/boating-cabin.jpeg", alt: "Small cabin boat on calm water with mountains behind it", caption: "Exact location tide timing helps you think about the ramp, channel, and return trip together.", tag: "on the water", aspectClass: "aspect-[4/5]" },
      { src: "/images/use-cases/boating/boating-sailboat.jpeg", alt: "Yellow sailboat resting on calm water under a blue sky", caption: "A quick tide check can be the difference between an easy departure and a shallow-water problem.", tag: "launch timing", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/boating/boating-charter.jpeg", alt: "Fishing charter boat viewed from the waterline", caption: "Tide direction affects more than the fishing spot. It changes the ride, the current, and the way a boat handles.", tag: "boat handling", aspectClass: "aspect-[4/3]" },
      { src: "/images/use-cases/boating/boating-skiff.jpeg", alt: "Small skiff and kayaker on calm water beneath coastal mountains", caption: "Keep the tide in the same conversation as weather, fuel, and the route home.", tag: "return plan", aspectClass: "aspect-[3/4]" }
    ],
    quickChecks: [
      "Current tide before launch and return",
      "Incoming or outgoing direction when channels, inlets, and bars matter",
      "The next low tide if ramps or backwater routes get skinny",
      "Saved spots for harbors, marinas, launches, and sandbar runs"
    ],
    sections: [
      {
        heading: "Why tide is a boating safety tool",
        paragraphs: [
          "A lot of boating problems begin long before anyone hits the throttle. They start when people assume a launch, flat, channel, or sandbar will have the same depth later that it had when they first arrived.",
          "Tide is one of the cleanest ways to avoid that mistake. A quick check tells you whether the water is building, draining, or about to hit the part of the cycle that makes your route more annoying or more risky."
        ]
      },
      {
        heading: "What boaters need from the best tide app",
        paragraphs: [
          "Boaters usually do not need a wall of information from a tide app. They need the local chart to be obvious, the direction of the water to be easy to read, and the next tide event close at hand when they are making launch or return decisions.",
          "Tide Buoy is designed around that faster read. It helps with local checks, saved spots, and the simple question that matters most before a trip: is this window getting easier or tighter?"
        ],
        items: [
          "A local tide chart that is easy to scan at the ramp",
          "Simple incoming and outgoing direction",
          "Fast access to the next low or high tide",
          "Saved locations for common launches and coastal stops"
        ]
      },
      {
        heading: "Where tide changes boating plans the most",
        paragraphs: [
          "Tide matters at ramps, shallow canals, inlets, sandbars, oyster edges, and anywhere depth margins are already narrow. Even if the main bay or harbor feels forgiving, the route into it may not be.",
          "That is why many boaters check tide twice. Once before they leave, and once again before they commit to the run back in case the cycle is setting up a shallower exit."
        ]
      },
      {
        heading: "Why Tide Buoy fits real boating days",
        paragraphs: [
          "The best tide app for boaters is the one you can trust when you are moving quickly and making practical calls. Tide Buoy stays clean enough for that. You can see the current state, the direction of the water, and what is coming next without digging.",
          "That makes it a strong fit for people who want tide timing on hand without turning every boating day into a software project."
        ]
      }
    ],
    faqs: [
      {
        question: "Why should boaters check the tide before launching?",
        answer:
          "Because ramps, shallow channels, bars, and backwater routes can change fast as the water rises or falls. A tide check helps you avoid getting stuck or dealing with a harder return window."
      },
      {
        question: "Is outgoing tide always bad for boating?",
        answer:
          "No. Outgoing tide is not automatically bad, but it can make shallow exits, bars, or channels less forgiving. What matters is how your route reacts to dropping water."
      },
      {
        question: "What should a boating tide app show first?",
        answer:
          "It should show the current tide, whether water is rising or falling, and when the next low or high tide is due. That core timing is what most boating decisions start with."
      }
    ],
    relatedFeatureSlugs: ["accurate-tides-in-your-location", "choose-any-new-location-on-map", "seven-day-tide-forecast"],
    relatedBlogSlugs: ["key-west-lobster-season-tide-guide", "florida-scallop-season-tide-guide"],
    relatedUseCaseSlugs: ["fishing", "diving"]
  },
  {
    slug: "diving",
    title: "Diving",
    metaTitle: "Best Tide App for Diving | Tide Buoy",
    metaDescription:
      "Looking for the best tide app for diving or snorkeling? Tide Buoy helps divers check tide timing, current windows, access, and slack-water planning before they gear up.",
    excerpt:
      "Divers and snorkelers usually feel tide in the water, through current, visibility, access, and how comfortable an entry really is.",
    kicker: "Diving guide",
    intro:
      "The best tide app for diving is not just about seeing a high and low tide table. It is about understanding whether current is about to build, whether access gets easier or harder, and whether your dive or snorkel plan lines up with a more forgiving window. Tide Buoy is well suited to that quick read.",
    readTime: "6 min read",
    targetKeyword: "best tide app",
    seoTags: ["best tide app for diving", "tide app for divers", "slack tide diving", "best tide for snorkeling", "dive tide chart"],
    heroImage: {
      src: "/images/use-cases/diving.jpeg",
      alt: "Diver underwater with sunlight filtering through blue water",
      caption: "For diving and snorkeling, tide often shows up as current, visibility, and entry comfort long before it feels like a number."
    },
    images: [
      { src: "/images/use-cases/diving/diving-coral.jpeg", alt: "Swimmer moving above coral in clear blue water", caption: "A clear local tide check helps you pair water movement with visibility and comfort.", tag: "underwater check", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/diving/diving-freediver.jpeg", alt: "Freediver descending below the surface in blue water", caption: "The tide is one part of the dive plan. Conditions, skill, and a safe buddy plan still lead.", tag: "dive window", aspectClass: "aspect-[3/4]" },
      { src: "/images/use-cases/diving/diving-silhouette.jpeg", alt: "Freediver seen in silhouette below the bright water surface", caption: "Quick tides are useful when you are comparing a few possible entry points before heading out.", tag: "surface check", aspectClass: "aspect-[4/3]" }
    ],
    quickChecks: [
      "Current tide and whether flow is building or backing off",
      "The next shift if you are trying to line up a calmer entry or exit",
      "Saved spots for reefs, inlets, springs, grass flats, and favorite snorkel areas",
      "A fast reminder to pair tide timing with weather, visibility, and local rules"
    ],
    sections: [
      {
        heading: "Why tide matters for diving and snorkeling",
        paragraphs: [
          "Divers feel tide through current, clarity, depth, and access. A site that feels easy near a slower change of water can feel very different once the flow starts pushing harder through an inlet, channel, reef edge, or cut.",
          "That is why tide timing matters even on casual snorkel days. It helps you choose a window that feels more comfortable and easier to manage."
        ]
      },
      {
        heading: "What divers need from the best tide app",
        paragraphs: [
          "The best tide app for diving should make timing simple. You want to see whether water is still building or dropping, when the next change is coming, and whether your favorite site is trending toward a better or tougher window.",
          "Tide Buoy keeps that visible without crowding the screen. It is especially useful for people who bounce between local dive spots, shore entries, and seasonal snorkeling areas."
        ],
        items: [
          "Fast tide checks before gearing up",
          "Clear incoming and outgoing direction",
          "The next high or low tide when timing entries matters",
          "Saved spots for recurring dive and snorkel locations"
        ]
      },
      {
        heading: "Slack tide, visibility, and access",
        paragraphs: [
          "A lot of divers look for calmer movement around a tide change, especially where current builds through passes, bridges, inlets, or tight coastal structure. That does not guarantee perfect water, but it can make a site feel more manageable.",
          "Visibility is still shaped by wind, swell, runoff, and local conditions. Tide helps you choose the window. It does not replace the rest of the check."
        ]
      },
      {
        heading: "Why Tide Buoy works for dive planning",
        paragraphs: [
          "The best tide app for diving should help you answer a simple question fast: is this water moving in a direction and on a schedule that makes sense for my site today? Tide Buoy is built for that kind of clarity.",
          "It keeps the app practical for divers, snorkelers, scallopers, and anyone who wants a cleaner sense of the tide before getting in."
        ]
      }
    ],
    faqs: [
      {
        question: "Is slack tide best for diving?",
        answer:
          "It is often a preferred window around current-prone sites because water movement can be more manageable. The exact timing depends on the site and how local current behaves."
      },
      {
        question: "Why should snorkelers check the tide too?",
        answer:
          "Because tide changes depth, current, entry comfort, and sometimes visibility. A quick check can make a casual snorkel day noticeably easier."
      },
      {
        question: "Can a tide app tell me if visibility will be good?",
        answer:
          "Not by itself. Tide helps with timing, but visibility also depends on wind, swell, weather, runoff, and the local site."
      }
    ],
    relatedFeatureSlugs: ["accurate-tides-in-your-location", "save-different-spots", "seven-day-tide-forecast"],
    relatedBlogSlugs: ["key-west-lobster-season-tide-guide", "florida-scallop-season-tide-guide"],
    relatedUseCaseSlugs: ["boating", "beach-days"]
  }
];

export function getUseCasePage(slug: string) {
  return useCasePages.find((useCase) => useCase.slug === slug);
}
