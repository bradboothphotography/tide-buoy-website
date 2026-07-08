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
    image?: BlogImage;
    items?: string[];
    imageIndexes?: number[];
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
    slug: "florida-beach-day-tide-checklist",
    title: "Florida Beach Day Tide Checklist: What to Check Before You Go",
    metaTitle: "Florida Beach Day Tide Checklist | Tide Buoy",
    metaDescription: "Plan a better Florida beach day by checking the tide, tide direction, rip current risk, red tide status, wind, and beach flags before you go.",
    excerpt: "A simple Florida beach planning guide for tide timing, beach safety, and the extra checks that matter before you leave.",
    category: "Beach Planning",
    readTime: "6 min read",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    heroImage: {
      src: "/images/blog/florida-beach-day-tide-checklist/florida-beach-day-tide-checklist-pink-dawn-beach.jpeg",
      alt: "Pink dawn clouds over a Florida beach before sunrise",
      caption: "Dawn is a good time to check the tide before a morning beach session.",
      width: 1182,
      height: 665
    },
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
        imageIndexes: [1]
      },
      {
        heading: "Why tide direction matters",
        paragraphs: [
          "A rising tide and a falling tide can make the same beach feel completely different. Incoming water shrinks the dry sand and changes how waves move through inlets, bars, and cuts. Outgoing water exposes more beach and changes how the shoreline drains.",
          "If you surf, fish, shell, take photos, or just walk the beach, that movement is usually the part that changes the day."
        ],
        imageIndexes: [2]
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
        imageIndexes: [3]
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
    slug: "florida-scallop-season-tide-guide",
    title: "Florida Scallop Season Tide Guide: How to Plan Around Low Tide and Grass Flats",
    metaTitle: "Florida Scallop Season Tide Guide | Tide Buoy",
    metaDescription: "Planning a Florida scalloping trip? Use tide timing, tide direction, wind, grass flats, and FWC season zones to plan a better day on the water.",
    excerpt: "A Florida scallop season guide for checking the tide, grass flats, wind, water clarity, and the ride home before you launch.",
    category: "Boating",
    readTime: "7 min read",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    heroImage: {
      src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-clear-grass-flats.jpeg",
      alt: "Clear shallow Florida grass flats beside a small boat during scallop season",
      caption: "Clear, shallow grass flats are the kind of water many scallopers hope to find.",
      width: 3542,
      height: 888
    },
    sections: [
      {
        heading: "Start with the open zone, then look at the tide",
        paragraphs: [
          "Florida scallop season is a summer ritual on the Gulf Coast. Before you load the boat, masks, fins, cooler, and kids, check two things first: whether your zone is open and what the tide is doing.",
          "A lot of scallopers like lower water over grass flats because scallops can be easier to spot and reach. Low tide is not magic, though. If it leaves you with a shallow ramp, exposed flats, strong wind, or a hard ride home, it may not be the right window."
        ]
      },
      {
        heading: "Why tide matters for scalloping",
        paragraphs: [
          "Scalloping usually happens over shallow grass flats. You are looking for bay scallops tucked in or near seagrass, often while snorkeling from a boat.",
          "Tide changes the depth, the view, and the route in. A flat that feels perfect at one stage of tide can be too deep, too skinny, or tough to reach an hour later. The same low tide that helps you see scallops can make ramps, bars, and backwater cuts less forgiving."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-boat-ride-gulf-water.jpeg",
          alt: "Small boat running across green Gulf Coast water under a blue sky",
          caption: "Before the boat ride, check the tide, weather, and zone rules.",
          width: 1536,
          height: 2048
        }
      },
      {
        heading: "Is low tide best for scalloping?",
        paragraphs: [
          "Low tide can help because there is less water between you and the grass. In many scalloping areas, shallower water makes it easier to see the bottom and drop down without burning energy all day.",
          "The lowest number on the tide chart is not always the best plan. Look for a window where the grass flats are reachable, visible, legal to harvest, and still practical for your boat. For many beginner groups, a slightly rising tide after low is a better compromise because water is coming back over the flats instead of draining away."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-diver-over-seagrass.jpeg",
          alt: "Snorkeler diving over blue water and seagrass while looking for scallops",
          caption: "Lower water can make the bottom easier to see, but it can tighten up the shallows for the boat.",
          width: 2172,
          height: 1448
        }
      },
      {
        heading: "Incoming vs outgoing tide for scalloping",
        paragraphs: [
          "Incoming tide means the water is rising toward the next high tide. Outgoing tide means the water is falling toward the next low tide.",
          "Incoming tide can help when you want a little more water over the flats or a safer ride back through shallow cuts. Outgoing tide can work if you want the water to get skinnier while you search, but pay attention. Falling water can turn a simple ride home into a careful idle through skinny water."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-snorkel-mask-underwater.jpeg",
          alt: "Close-up underwater view of a snorkeler wearing a mask in clear blue water",
          caption: "For beginners, comfort in the water beats chasing a perfect tide number.",
          width: 2172,
          height: 1448
        }
      },
      {
        heading: "Tide is only one part of a good scallop day",
        paragraphs: [
          "Do not use tide alone to decide whether to go. Wind can chop up shallow Gulf water and cloud the bottom. Summer storms can stack up fast. Popular scallop spots can get crowded. Some days look right on the tide chart and still do not give you the visibility you wanted.",
          "FWC notes that bay scallop populations are tied to environmental conditions, harmful algal blooms, and seagrass health. A tide check helps you pick a smarter window. It does not guarantee clear water, scallop numbers, or a safe day."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-clear-water-dive.jpeg",
          alt: "Diver swimming through clear blue water above a bright sandy bottom",
          caption: "Tide timing helps you choose the window. Wind and weather still decide a lot of the visibility.",
          width: 1448,
          height: 2172
        }
      },
      {
        heading: "Florida scallop tide checklist",
        paragraphs: [
          "Before you leave, do one last plain-English check.",
          "Confirm your FWC scallop zone and season dates. Check the current tide near your launch or scalloping area. Look at whether the tide is incoming or outgoing, then check the next high tide and next low tide.",
          "Decide whether low tide helps visibility or creates a boating problem. Check wind, storms, and the local marine forecast. Confirm license, bag limit, gear, and dive flag requirements. Plan your return before the tide makes shallow water harder to run."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-kayak-clear-spring.jpeg",
          alt: "Green kayak floating over clear water near a wooded Florida shoreline",
          caption: "Shallow-water access changes quickly, whether you are boating, paddling, or wading.",
          width: 768,
          height: 1024
        }
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "The best tide for Florida scallop season is the one that gives you reachable grass flats without turning the boat ride into a shallow-water problem. Low tide can help with spotting scallops, but tide direction, wind, water clarity, storms, regulations, and access all matter.",
          "Before you launch, check the current tide, tide direction, and next high or low tide in Tide Buoy. Then confirm FWC rules and local marine conditions so your scallop day starts with a real plan."
        ],
        image: {
          src: "/images/journal/florida-scallop-season-tide-guide/florida-scallop-season-snorkeler-calm-surface.jpeg",
          alt: "Snorkeler floating at the surface on a calm blue Florida water day",
          caption: "Wind and chop can cloud up shallow water even when the tide looks right.",
          width: 2172,
          height: 1448
        }
      }
    ]
  },
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
