export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  heroImage?: BlogImage;
  sections: {
    heading: string;
    paragraphs: string[];
    image?: BlogImage;
  }[];
};

export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-a-king-tide",
    title: "What Is a King Tide?",
    metaTitle: "What Is a King Tide? A Simple Beach Planning Guide | Tide Buoy",
    metaDescription: "Learn what a king tide is, why it matters for beach days, surfing, fishing, and boating, and how to check tide timing before you go.",
    excerpt: "A simple guide to unusually high tides, beach access, surf timing, boating decisions, and what to check before you head for the coast.",
    category: "Tide Planning",
    readTime: "7 min read",
    datePublished: "2026-06-25",
    dateModified: "2026-06-25",
    heroImage: {
      src: "/images/journal/king-tides/king-tide-surf-swell-rocky-beach.jpeg",
      alt: "Large surf breaking near a rocky beach during rough coastal conditions",
      caption: "King tides matter most when high water combines with swell, wind, or local coastal hazards.",
      width: 2172,
      height: 1448
    },
    sections: [
      {
        heading: "Start with the simple meaning",
        paragraphs: [
          "A king tide is an unusually high tide. It is not a formal scientific term, but people use it to describe the kind of high tide that can push water farther up the beach, cover low areas, flood docks or streets, and make familiar coastal spots feel different than they do on a normal day.",
          "For most beachgoers, surfers, fishermen, and boaters, the important part is simple: a king tide is a reason to pay closer attention to tide timing before you go."
        ]
      },
      {
        heading: "Why king tides happen",
        paragraphs: [
          "Tides are shaped mainly by the pull of the moon and sun. Higher-than-normal tides often happen around a new moon or full moon, when the sun, moon, and Earth line up in a way that strengthens the tidal pull. They can also be higher when the moon is closer to Earth, or during seasonal patterns that affect different coasts in different ways.",
          "That does not mean every king tide causes flooding. Local weather, wind direction, swell, barometric pressure, shoreline shape, and sea level all matter. A predicted high tide may be manageable on a calm day, but the same tide can become more serious when wind, waves, or storm conditions push extra water toward shore.",
          "That is why tide timing is only the first check. It tells you when the water is expected to be highest. Then you pair that with real-world conditions."
        ],
        image: {
          src: "/images/journal/king-tides/king-tide-high-water-beach-shoreline.jpeg",
          alt: "A calm shoreline with small waves washing high onto the sand",
          caption: "The same beach can feel completely different as the tide rises toward its high point.",
          width: 1536,
          height: 2048
        }
      },
      {
        heading: "Why king tides matter for beach planning",
        paragraphs: [
          "A king tide can change a familiar beach quickly. A wide beach at low tide can become narrow at high tide. A dry walking route can get cut off. A sandbar can disappear. Rocks, jetties, seawalls, and inlet edges can become more dangerous when higher water combines with wave energy.",
          "If you are heading to the coast during a king tide window, ask one practical question first: when is the next high tide, and is the water still rising?",
          "If the tide is incoming, water is still pushing higher. If the tide is outgoing, the highest water may already have passed, but currents can still be strong as water drains away from beaches, inlets, bays, and channels. Tide direction matters because it tells you whether conditions are building toward the high point or easing away from it."
        ],
        image: {
          src: "/images/journal/king-tides/king-tide-coastal-flooding-beach-access.jpeg",
          alt: "A vehicle parked close to high water on a narrow beach access",
          caption: "High water can affect access, parking, and the route back off the beach.",
          width: 838,
          height: 1144
        }
      },
      {
        heading: "For beachgoers",
        paragraphs: [
          "For a normal beach walk, shell hunt, or family beach day, king tides mostly affect space and access. A beach that looks open in the morning may shrink by afternoon. Water can reach dunes, seawalls, stairs, and access paths that usually stay dry.",
          "Before you set up, check the next high tide. Avoid placing towels, chairs, coolers, or strollers close to the waterline during an incoming tide. If the beach is backed by cliffs, rocks, dunes, or a seawall, make sure there is still a clear way out as the water rises."
        ]
      },
      {
        heading: "For surfers",
        paragraphs: [
          "A king tide does not automatically mean good surf. It can help some breaks and hurt others. Some spots need more water to work. Others get too deep, soft, or backwashy near a very high tide. Beach breaks, reefs, points, and inlet setups all respond differently.",
          "The best move is to think in windows. Check whether the tide is rising or falling, when high tide hits, and how that lines up with swell and wind. If a beach has warnings for large shorebreak, rip currents, or sneaker waves, treat that separately from whether the tide window looks good.",
          "A good tide does not cancel out dangerous surf."
        ]
      },
      {
        heading: "For fishermen and boaters",
        paragraphs: [
          "For anglers, king tides can open up water over flats, marsh edges, docks, mangroves, oyster bars, and shoreline structure that may be too shallow at lower stages. That can create new feeding zones, especially when water is moving. But high water can also spread fish out, so the useful question is where the water will move and when that movement fits your spot.",
          "Boaters should treat king tides as a planning signal around ramps, docks, bridges, sandbars, and shallow channels. Higher water may make some areas easier to access for a short window, but it can also hide hazards that are usually visible, increase current around inlets or passes, and make docking more awkward if wind and water are pushing together.",
          "Before launching, check the high tide time, the low tide time, and whether your return window lines up with falling water. A trip that starts with plenty of depth can end with a different ramp, channel, or sandbar situation if you come back near low tide."
        ],
        image: {
          src: "/images/journal/king-tides/king-tide-low-tide-boat-flats.jpeg",
          alt: "A small boat sitting near exposed flats at low tide",
          caption: "Tide height can change access around flats, channels, ramps, and shallow water.",
          width: 1330,
          height: 2364
        }
      },
      {
        heading: "What to check before you go",
        paragraphs: [
          "Use a short checklist: current tide, tide direction, next high tide, next low tide, weather and wind, surf or swell, and any local beach hazard, coastal flood, or rip current alerts.",
          "Tide Buoy is built around that first quick read: current tide, tide direction, and the next high or low tide. That gives you the water-timing context before you layer in surf, weather, fishing, or boating details."
        ]
      },
      {
        heading: "Does a king tide always mean flooding?",
        paragraphs: [
          "No. A king tide means higher-than-normal tide potential. Flooding depends on the location and the conditions around it. Low-lying waterfront roads, docks, marsh edges, and harbor areas are more likely to notice it. A steep beach with calm weather may see less obvious impact.",
          "A king tide can be dangerous when high water combines with strong surf, rip currents, sneaker waves, storm surge, or coastal flooding. The tide itself is predictable, but the water on top of that tide can change with weather and swell. If official local guidance says to stay out of the water, avoid rocks, avoid jetties, or expect coastal flooding, follow that guidance."
        ]
      },
      {
        heading: "The simple takeaway",
        paragraphs: [
          "A king tide is a reminder to check the water before you go. You do not need to memorize lunar cycles or read a complicated marine table. Start with the basics: current tide, whether the tide is incoming or outgoing, and the time of the next high or low tide. Then look at local weather, surf, and safety alerts.",
          "Before your next beach walk, surf check, fishing trip, or boat launch, open Tide Buoy and check the current tide, tide direction, and next high or low tide before you go."
        ]
      }
    ]
  },
  {
    slug: "how-to-read-a-tide-chart",
    title: "How to Read a Tide Chart",
    metaTitle: "How to Read a Tide Chart | Tide Buoy",
    metaDescription: "Learn how to read tide charts, spot highs and lows, and plan better beach, fishing, boating, and surf sessions.",
    excerpt: "A simple guide to reading highs, lows, timing, and tide direction without the clutter.",
    category: "Tide Basics",
    readTime: "5 min read",
    datePublished: "2026-05-01",
    dateModified: "2026-06-11",
    sections: [
      {
        heading: "Start with the highs and lows",
        paragraphs: [
          "A tide chart shows you when the water will be highest and lowest through the day. Most people should first look for the next high tide, the next low tide, and the time of each one.",
          "That basic timing is enough to help with surf planning, fishing windows, launching a boat, walking a flat beach, or catching a shoreline at golden light."
        ]
      },
      {
        heading: "Understand what happens between the peaks",
        paragraphs: [
          "The tide is not only about the exact high and low points. It is also about the movement between them. That is where incoming and outgoing tide direction matters.",
          "An incoming tide can push water into inlets and over shallow bars. An outgoing tide can expose structure, tighten channels, and change the feel of a beach or break."
        ]
      },
      {
        heading: "Use a simple app instead of over-reading the graph",
        paragraphs: [
          "The best tide tools help you answer practical questions quickly: what is the next tide, which way is it moving, and when will the next major change happen.",
          "That is the approach behind Tide Buoy. It is designed to make tide planning readable at a glance."
        ]
      }
    ]
  },
  {
    slug: "incoming-vs-outgoing-tide",
    title: "Incoming vs Outgoing Tide: What It Means",
    metaTitle: "Incoming vs Outgoing Tide Explained | Tide Buoy",
    metaDescription: "Learn the difference between incoming and outgoing tide and why tide direction matters for the beach, surf, fishing, and boating.",
    excerpt: "Tide direction changes how water moves through inlets, beaches, channels, and sandbars.",
    category: "Tide Basics",
    readTime: "4 min read",
    datePublished: "2026-05-02",
    dateModified: "2026-06-11",
    sections: [
      {
        heading: "Incoming tide",
        paragraphs: [
          "An incoming tide means the water is rising toward the next high tide. Shorelines fill in, channels deepen, and currents can behave very differently around inlets and passes.",
          "For many people, this is the key context missing from cluttered tide tools. Direction often matters as much as the exact height."
        ]
      },
      {
        heading: "Outgoing tide",
        paragraphs: [
          "An outgoing tide means the water is dropping toward the next low tide. Sandbars, shell lines, flats, and shallow structure become easier to see as water drains away.",
          "That can be helpful for shell hunters, anglers targeting moving water, and photographers looking for texture and reflective sand."
        ]
      },
      {
        heading: "Why people check direction first",
        paragraphs: [
          "If you spend time around the water, tide direction often answers the practical question faster than a dense forecast table does.",
          "Tide Buoy keeps this simple by highlighting whether the tide is currently coming in or going out."
        ]
      }
    ]
  },
  {
    slug: "best-tide-for-surfing",
    title: "Best Tide for Surfing",
    metaTitle: "Best Tide for Surfing | Tide Buoy",
    metaDescription: "The best tide for surfing depends on the break. Learn how to think about sandbars, reef, tide swings, and timing before a session.",
    excerpt: "There is no single best tide for every surf spot, but there is a better way to think about it.",
    category: "Surf",
    readTime: "5 min read",
    datePublished: "2026-05-03",
    dateModified: "2026-06-11",
    sections: [
      {
        heading: "Every break responds differently",
        paragraphs: [
          "Some surf spots need more water to break well. Others lose shape when the tide gets too high. Beach breaks, reefs, points, and inlets all react differently to the same tide swing.",
          "That is why experienced surfers usually learn their local window instead of chasing a generic rule."
        ]
      },
      {
        heading: "Use tide timing, not just tide height",
        paragraphs: [
          "The hour before and after a tide change can be as important as the number itself. Some sessions improve as the tide pushes in. Others work best as it drains out and exposes shape.",
          "Planning around the movement of the water helps you arrive during the best part of the window."
        ]
      },
      {
        heading: "Keep your planning workflow light",
        paragraphs: [
          "A simple surf tide app should help you see the tide direction, next change, and daily highs and lows quickly.",
          "That is where Tide Buoy fits in for surfers who want clarity without the noise."
        ]
      }
    ]
  },
  {
    slug: "best-tide-for-fishing",
    title: "Best Tide for Fishing",
    metaTitle: "Best Tide for Fishing | Tide Buoy",
    metaDescription: "Learn how tides affect fishing, feeding windows, current movement, and when anglers often prefer incoming or outgoing water.",
    excerpt: "Fish often respond to moving water, and tide direction can shape feeding windows more than people realize.",
    category: "Fishing",
    readTime: "5 min read",
    datePublished: "2026-05-04",
    dateModified: "2026-06-11",
    sections: [
      {
        heading: "Moving water creates opportunity",
        paragraphs: [
          "Many anglers watch tides because moving water can position bait, concentrate current, and create feeding windows around structure.",
          "That does not make every incoming or outgoing tide equally good, but it does make timing an important part of the plan."
        ]
      },
      {
        heading: "Incoming and outgoing both matter",
        paragraphs: [
          "An incoming tide may bring cleaner water and access to new feeding zones. An outgoing tide can pull bait through cuts, drains, and channels where predators wait.",
          "Local knowledge matters, but tide direction is usually one of the first things serious anglers check."
        ]
      },
      {
        heading: "Think in windows, not only predictions",
        paragraphs: [
          "The useful question is often not just what time high tide happens, but when the current begins to move in a way that fits your spot.",
          "Tide Buoy is built to make that call easier at a glance."
        ]
      }
    ]
  },
  {
    slug: "how-tides-affect-beach-photography",
    title: "How Tides Affect Beach Photography",
    metaTitle: "How Tides Affect Beach Photography | Tide Buoy",
    metaDescription: "See how tide timing changes beach access, foreground texture, reflections, and coastal photography planning.",
    excerpt: "Tide timing can change access, reflections, foreground texture, and how safe a beach photo mission feels.",
    category: "Photography",
    readTime: "4 min read",
    datePublished: "2026-05-05",
    dateModified: "2026-06-11",
    sections: [
      {
        heading: "Tide changes the beach itself",
        paragraphs: [
          "Low tide can reveal reflective flats, shell lines, tide pools, and textures that disappear when the water rises.",
          "High tide can bring stronger shorebreak, more dramatic water movement, and a tighter composition near cliffs, jetties, or dunes."
        ]
      },
      {
        heading: "Timing matters for safety and access",
        paragraphs: [
          "Photographers often focus on light first, but the tide can determine whether the scene is accessible or whether the water cuts off your path back.",
          "Checking the tide before sunrise or sunset sessions is one of the simplest ways to plan smarter."
        ]
      },
      {
        heading: "Pair light with water movement",
        paragraphs: [
          "The strongest coastal sessions often come from the combination of good light and the right tide stage for your subject.",
          "Tide Buoy helps photographers keep that planning step simple."
        ]
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
