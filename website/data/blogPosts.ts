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
  seoTags?: string[];
  images?: {
    src: string;
    alt: string;
    caption: string;
    tag: string;
    focalPoint?: string;
    aspectClass?: string;
  }[];
  sections: {
    heading: string;
    paragraphs: string[];
    items?: string[];
    imageIndexes?: number[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "florida-beach-day-tide-checklist",
    title: "Florida Beach Day Tide Checklist: What to Check Before You Go",
    metaTitle: "Florida Beach Day Tide Checklist | Tide Buoy",
    metaDescription: "Plan a better Florida beach day by checking the tide, tide direction, rip current risk, red tide status, wind, and beach flags before you go.",
    excerpt: "A simple Florida beach planning guide for tide timing, beach safety, and the extra checks that matter before you leave.",
    category: "Beach Planning",
    readTime: "6 min read",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    seoTags: ["Florida beach day", "tide checklist", "red tide", "rip currents", "beach safety", "tide direction"],
    images: [
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-pink-dawn-beach.jpeg",
        alt: "Pink dawn clouds over a Florida beach before sunrise",
        caption: "Dawn is a good time to check the tide before a morning beach session.",
        tag: "sunrise tide check"
      },
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-sunrise-surf.jpeg",
        alt: "Sunrise surf rolling into a Florida beach with a person sitting on the sand",
        caption: "Morning surf and low light are easier to enjoy when you know the tide first.",
        tag: "surf timing"
      },
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-low-tide-sandbar.jpeg",
        alt: "Low tide sandbars and shallow water at a quiet Florida shoreline",
        caption: "Low tide can expose sandbars, shells, and shallow edges that change the walk.",
        tag: "low tide sandbar"
      },
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-inlet-breakwater.jpeg",
        alt: "Overhead view of a breakwater cutting through green water near a sandy shoreline",
        caption: "Inlets and jetties can change current, water movement, and safety fast.",
        tag: "moving water"
      },
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-waterfront-beach-chair.jpeg",
        alt: "Palm tree and beach chairs beside calm waterfront water in Florida",
        caption: "A relaxed beach setup still deserves a quick check on tide and wind.",
        tag: "easy beach day",
        focalPoint: "center 82%",
        aspectClass: "aspect-[4/5]"
      },
      {
        src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-rip-current-beach-conditions.jpeg",
        alt: "Rippled wet sand with waves breaking beyond the shoreline on a Florida beach",
        caption: "Changing surf and beach slope are part of the reason to check safety conditions before swimming.",
        tag: "beach conditions"
      }
    ],
    sections: [
      {
        heading: "Start with the tide, then check the rest",
        paragraphs: [
          "A good Florida beach day starts before you leave the driveway. Check the current tide, the tide direction, and the next high or low tide first. Then look at rip currents, red tide, wind, storms, and beach flags.",
          "You do not need to turn every beach trip into homework. A quick tide check is usually enough to make a better call."
        ],
        imageIndexes: [0]
      },
      {
        heading: "Why tide direction matters",
        paragraphs: [
          "A rising tide and a falling tide can make the same beach feel completely different. Incoming water shrinks the dry sand and changes how waves move through inlets, bars, and cuts. Outgoing water exposes more beach and changes how the shoreline drains.",
          "If you surf, fish, shell, take photos, or just walk the beach, that movement is usually the part that changes the day."
        ],
        imageIndexes: [1]
      },
      {
        heading: "What to check before swimming",
        paragraphs: [
          "If swimming is the plan, check more than the tide. Rip currents can happen on calm-looking days, and beach flags or local lifeguard guidance matter as much as the forecast. If you are headed to a Gulf Coast beach, check red tide status too, because algae conditions are separate from the daily tide cycle.",
          "Use Tide Buoy for tide timing. For rip currents and red tide, check the official sources before you go."
        ],
        imageIndexes: [5]
      },
      {
        heading: "Match the tide to the kind of beach day you want",
        paragraphs: [
          "For shelling and beach walks, lower water often exposes more shoreline and texture. For surfing, the right tide depends on the spot. For fishing, moving water often matters more than a dead flat tide. For boating, ramps, sandbars, and shallow channels can change fast with water level.",
          "A tide check helps you match the plan to the beach instead of forcing the beach to fit the plan."
        ],
        imageIndexes: [2, 3]
      },
      {
        heading: "Florida beach day checklist",
        paragraphs: [
          "Before you head out, keep the final check short and practical."
        ],
        items: [
          "Current tide",
          "Incoming or outgoing tide direction",
          "Next high tide",
          "Next low tide",
          "Rip current forecast",
          "Beach flags and lifeguard guidance",
          "Red tide status on Gulf Coast days",
          "Wind, storms, and tropical weather",
          "The specific activity you want to do"
        ],
        imageIndexes: [4]
      },
      {
        heading: "If something looks off, adjust the plan",
        paragraphs: [
          "If the tide, wind, or safety forecast looks wrong, change the time, the spot, or the activity and keep the day simple.",
          "Tide Buoy is built for that first step: understanding the water before you head out."
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
