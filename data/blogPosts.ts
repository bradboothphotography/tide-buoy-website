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
    slug: "storm-surge-and-high-tide",
    title: "Storm Surge and High Tide: A Tropical Storm and Hurricane Checklist",
    metaTitle: "Storm Surge and High Tide | Hurricane Tide Checklist | Tide Buoy",
    metaDescription:
      "Use this tropical storm and hurricane checklist to understand storm surge, high tide, surf, rip currents, and local warnings before going near the coast.",
    excerpt:
      "Storm surge can turn a normal high tide into a serious coastal flooding problem. Check these tide and safety basics before going near the water during a tropical storm or hurricane.",
    category: "Storm Safety",
    readTime: "8 min read",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    heroImage: {
      src: "/images/blog/storm-surge-and-high-tide/storm-surge-damaged-boats-marina.jpeg",
      alt: "Storm surge damaged boats leaning against a marina dock after coastal flooding",
      caption: "Storm water does not stop at the beach. Marinas, docks, canals, and tied-up boats can take the hit too. Photo: Brad Booth, bradboothmedia.com.",
      width: 2172,
      height: 1448
    },
    seoTags: ["storm surge and high tide", "hurricane tide checklist", "tropical storm and hurricane safety", "coastal flooding", "rip currents", "tide timing"],
    images: [
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-damaged-boats-marina.jpeg",
        alt: "Storm surge damaged boats leaning against a marina dock after coastal flooding",
        caption: "Storm water does not stop at the beach. Marinas, docks, canals, and tied-up boats can take the hit too. Photo: Brad Booth, bradboothmedia.com.",
        tag: "storm surge damage",
        focalPoint: "center center",
        aspectClass: "aspect-[16/7]"
      },
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-beach-debris-palms.jpeg",
        alt: "Storm surge debris and broken waterfront structure near palm trees and calm water",
        caption: "After the water drops, the damage can look deceptively calm. Surge can move heavy debris and leave hazards behind. Photo: Brad Booth, bradboothmedia.com.",
        tag: "after the water",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-exposed-dock-low-water.jpeg",
        alt: "Old dock pilings exposed at low water on a calm coast",
        caption: "The normal tide cycle still matters during storm season because it changes the starting water level. Photo: Brad Booth, bradboothmedia.com.",
        tag: "tide timing",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-canal-debris-dock.png",
        alt: "Storm damaged waterfront canal with broken dock pieces and debris in the water",
        caption: "Canals and backwaters can hold debris, damaged docks, and unsafe edges after storm water moves through. Photo: Brad Booth, bradboothmedia.com.",
        tag: "canal damage",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-yard-debris-utility-damage.png",
        alt: "Storm debris, damaged utility lines, and household items beside a coastal home",
        caption: "Surge and wind can leave hazards inland from the waterline, including debris, utilities, and unstable structures. Photo: Brad Booth, bradboothmedia.com.",
        tag: "inland hazards",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/storm-surge-and-high-tide/storm-surge-waterfront-structure-damage.png",
        alt: "Damaged waterfront structure and palm trees beside a canal after storm surge",
        caption: "Low roads, waterfront homes, docks, and shoreline structures can all be affected when surge lines up with high water. Photo: Brad Booth, bradboothmedia.com.",
        tag: "waterfront impact",
        focalPoint: "center center"
      }
    ],
    sections: [
      {
        heading: "High tide can make storm surge worse",
        paragraphs: [
          "When a tropical storm or hurricane is near the coast, high tide can make a bad water situation worse. Storm surge is water pushed toward shore by the storm. High tide is the normal tide cycle. When those two line up, water can reach places that are usually dry.",
          "That does not mean every high tide during a storm will flood the coast. It means tide timing belongs in the first set of checks, right next to the National Hurricane Center, your local National Weather Service office, evacuation guidance, beach flags, marine warnings, and local closures.",
          "Tide Buoy helps with the tide part: what the water is doing now, whether the tide is coming in or going out, and when the next high or low tide arrives. During tropical weather, that is context. It is not permission to go near unsafe water.",
          "Before storm conditions arrive, download Tide Buoy so your tide check is ready. Open it before you leave, check the current tide, tide direction, and next high or low tide, then compare that timing with NHC, NWS, and local guidance."
        ],
        imageIndexes: [0]
      },
      {
        heading: "What Bertha showed on July 22",
        paragraphs: [
          "Tropical Storm Bertha is a current example. At 1:00 PM CDT on July 22, 2026, the National Hurricane Center said Bertha was near southeastern Louisiana with tropical storm warnings from the Alabama and Florida border to Morgan City, Louisiana, including Metropolitan New Orleans and Lake Pontchartrain. A tropical storm watch extended west of Morgan City to Sargent, Texas.",
          "The same advisory listed possible storm surge of 1 to 3 feet from the Alabama and Florida border to Port Bolivar, Texas, and 1 to 3 feet for Lake Pontchartrain if peak surge occurred at high tide. NHC also warned that surge-related flooding depends on the timing of the surge and the tidal cycle, and that it can vary a lot over short distances.",
          "That is exactly why a tide check matters. It does not replace the storm forecast, but it helps you understand whether the coast is already near a normal high-water window before wind, waves, rain, and surge add more water."
        ],
        imageIndexes: [1, 2]
      },
      {
        heading: "Storm surge is not the same as high tide",
        paragraphs: [
          "High tide is predictable. It comes from the normal tide cycle.",
          "Storm surge is different. NOAA describes it as an abnormal rise in seawater caused by a storm. Wind pushes water toward shore, pressure changes can add to the rise, and shallow coastal water can let that water build up near land.",
          "Storm tide is the combined water level from storm surge plus the astronomical tide. In plain language: if a storm pushes water in at the same time the normal tide is high, the coast can flood more easily."
        ]
      },
      {
        heading: "Why timing matters",
        paragraphs: [
          "If peak surge arrives near low tide, the total water level may be lower than it would be at high tide. If peak surge arrives near high tide, water starts from a higher base.",
          "That timing can affect roads near bays and marshes, boat ramps, docks, marinas, beach access points, low bridges, canals, inlets, and passes. Waves can ride on top of that water. Rain can back up drains and flood low roads. Debris can move into places that looked manageable earlier in the day.",
          "The hard part is that surge does not arrive neatly at one exact minute for every location. A bay shape, barrier island, canal, inlet, storm track, wind direction, and local elevation can all change what happens."
        ],
        imageIndexes: [3]
      },
      {
        heading: "What to check before going near the coast",
        paragraphs: [
          "Start with official storm information. For an active system like Bertha, check the NHC advisory and key messages first. Then check your local National Weather Service office for coastal flood warnings, marine warnings, rainfall, wind, surf, and rip-current risk.",
          "After that, check the tide near the actual place you care about. Do not use a tide station from far away if you can avoid it. A beach, inlet, bay, marina, and river mouth can all have different timing and different water behavior.",
          "In Tide Buoy, look at the current tide height, whether the tide is incoming or outgoing, the next high tide, the next low tide, and how close you are to the next high-water window."
        ],
        imageIndexes: [4]
      },
      {
        heading: "A quick checklist by coastal user",
        paragraphs: [
          "For beachgoers, the safest move during tropical storm or hurricane surf is usually to stay out of the water. NHC warned that Bertha's swells were likely to cause life-threatening surf and rip-current conditions along the northern Gulf Coast. Do not treat a tide chart as a swim forecast.",
          "For surfers, storm swell can look tempting, but wind, debris, current, closed beaches, and rescue conditions matter more than wave size. Do not paddle out around closed beaches, piers, inlets, or emergency conditions.",
          "For boaters and fishermen, tide height matters at ramps, canals, docks, bridges, oyster bars, and shallow channels. Storm wind and surge can also make water levels misleading. A ramp that looks usable now may be dangerous later, and the return trip can be harder than the launch."
        ],
        imageIndexes: [5]
      },
      {
        heading: "Tropical storm and hurricane tide checklist",
        paragraphs: [
          "Before going near the coast during a tropical storm or hurricane, keep the check plain and practical."
        ],
        items: [
          "NHC advisories and key messages",
          "Local NWS warnings and marine forecasts",
          "Storm surge maps and coastal flood warnings",
          "Rainfall and flash flood risk",
          "Rip-current risk and beach flags",
          "Local closures and evacuation guidance",
          "Current tide and tide direction",
          "Next high tide and next low tide",
          "Whether peak weather may overlap with high tide"
        ]
      },
      {
        heading: "Where Tide Buoy fits",
        paragraphs: [
          "Tide Buoy helps you understand the tide quickly. It shows what the tide is doing now, whether the water is coming in or going out, and when the next high or low tide arrives.",
          "That is useful during storm season because timing matters. It helps you avoid guessing whether the shoreline is naturally rising, falling, near high tide, or near low tide.",
          "Tide Buoy is not a storm surge forecast, evacuation tool, beach closure alert, or rip-current forecast. During tropical weather, use Tide Buoy for tide context and use NHC, NWS, local officials, lifeguards, and emergency management for storm decisions.",
          "If you live near the coast or check the water often, download Tide Buoy before the next storm window. It gives you a fast read on the current tide, tide direction, and next high or low tide, so the tide part of your hurricane checklist is already handled."
        ]
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Storm surge is dangerous because it adds water where people, roads, docks, and buildings are not ready for it. High tide can raise the starting line.",
          "Before you go, check the current tide, tide direction, and next high or low tide in Tide Buoy. Download the app so that check is quick when a tropical storm, hurricane, king tide, or coastal flood warning shows up. Then check NHC, NWS, and local guidance. If officials say to stay away from the water, stay away from the water."
        ]
      }
    ]
  },
  {
    slug: "el-nino-surf-fishing",
    title: "How El Nino Can Affect Surf and Fishing",
    metaTitle: "How El Nino Affects Surf and Fishing | Tide Buoy",
    metaDescription:
      "El Nino can bring better swell windows, changing fish patterns, rougher water, dirty runoff, and harder planning. Learn what surfers and fishermen should check.",
    excerpt:
      "El Nino can create real opportunities for surfers and fishermen, but it can also bring wind, runoff, rough water, stronger currents, and less predictable conditions.",
    category: "Surf & Fishing",
    readTime: "8 min read",
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
    heroImage: {
      src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-big-wave-spray.jpeg",
      alt: "Surfer riding high on a powerful blue wave with spray blowing offshore",
      caption: "El Nino can send more energy into the ocean, but not every bigger swell turns into a better session. Photo: Brad Booth, bradboothmedia.com.",
      width: 540,
      height: 360
    },
    seoTags: ["El Nino surf", "El Nino fishing", "surf forecast", "fishing conditions", "swell", "tide timing"],
    images: [
      {
        src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-surfer-shorebreak.jpeg",
        alt: "Surfer watching large blue waves from the beach with a bright surfboard",
        caption: "El Nino can bring exciting swell windows, but bigger surf needs more respect from the beach. Photo: Brad Booth, bradboothmedia.com.",
        tag: "swell check",
        focalPoint: "center 47%",
        aspectClass: "aspect-[16/9]"
      },
      {
        src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-cliff-lines.jpeg",
        alt: "Long lines of swell wrapping toward a beach below coastal cliffs",
        caption: "Long-period lines are the upside surfers hope for, especially when wind and tide cooperate. Photo: Brad Booth, bradboothmedia.com.",
        tag: "long-period swell",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-pier-rough-surf.jpeg",
        alt: "Large rough surf breaking near a pier on a cloudy beach",
        caption: "The downside is real too: rough surf, stronger currents, and conditions that can turn fast. Photo: Brad Booth, bradboothmedia.com.",
        tag: "rough water",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-sunset-turn.jpeg",
        alt: "Surfer carving on a wave at sunset with spray backlit by orange light",
        caption: "A good El Nino window still needs the basics: swell direction, wind, tide, and a spot that can hold the size. Photo: Brad Booth, bradboothmedia.com.",
        tag: "clean window",
        focalPoint: "center center"
      },
      {
        src: "/images/blog/el-nino-surf-fishing/el-nino-surf-fishing-beach-walk-swell.jpeg",
        alt: "Two surfers walking along a sandy beach with waves breaking offshore",
        caption: "Before the paddle or the fishing trip, read the local conditions instead of trusting the headline. Photo: Brad Booth, bradboothmedia.com.",
        tag: "before you go",
        focalPoint: "center center"
      }
    ],
    sections: [
      {
        heading: "El Nino can help, but it can also make a mess",
        paragraphs: [
          "El Nino gets surfers and fishermen paying attention because it can change the pattern behind the pattern. The ocean may see stronger storm systems, different swell windows, warmer or cooler water in the wrong places, heavier rain in some regions, and fish that do not behave exactly like they did last season.",
          "That can be good. It can also be a pain.",
          "For surfers, El Nino can mean more swell and a few standout days. For fishermen, it can move bait, change water temperature, and create new windows around current, structure, and cleaner water. The downside is that the same pattern can bring wind, runoff, rough water, stronger currents, beach erosion, dirty water, and cancelled trips."
        ],
        imageIndexes: [0]
      },
      {
        heading: "What El Nino actually changes",
        paragraphs: [
          "El Nino starts in the tropical Pacific, where warmer-than-normal water can shift weather patterns across large areas. That does not mean your local beach gets one guaranteed result. It means the odds around weather, storms, rainfall, wind, and swell may change for a season.",
          "NOAA's July 2026 ENSO update says El Nino is active and expected to strengthen through the end of 2026. That makes it worth watching now, especially for fall and winter surf and fishing plans.",
          "The useful way to think about it is simple: El Nino is not your forecast. It is the background setup. Your real decision still comes from local wind, swell, water quality, water temperature, tide, rainfall, and marine conditions."
        ],
        imageIndexes: [1, 2]
      },
      {
        heading: "How El Nino can benefit surfing",
        paragraphs: [
          "The upside for surfers is swell. In the right region, El Nino can help set up more active storm tracks and longer-period swell. Some spots that sleep through average weeks can wake up when the ocean has more energy.",
          "Better surf is most likely when the pieces line up: swell direction, period, wind, tide, and a sandbar or reef that can handle the size. A strong El Nino pattern may help send the swell, but the local setup still decides whether it turns into a good session.",
          "For experienced surfers, that can mean bigger days, more powerful lines, and more chances at spots that need a real pulse. For newer surfers, it can mean more days to watch from the sand."
        ],
        imageIndexes: [3]
      },
      {
        heading: "The surfing downside",
        paragraphs: [
          "El Nino surf can get overhyped. More swell does not always mean better waves.",
          "The negatives can show up fast: blown-out surf, closeouts, heavy shorebreak, stronger rip currents, crowded forecasts, beach erosion, storm runoff, and water that should be avoided after heavy rain. A swell can look perfect on a chart and still arrive with the wrong wind or too much size for the beach.",
          "This is where tide matters a little. Some breaks need more water. Some get better as the tide drops. Some turn into a mess at high tide or get too shallow at low tide. During a stronger swell pattern, a bad tide window can make an already powerful ocean less forgiving."
        ]
      },
      {
        heading: "How El Nino can benefit fishing",
        paragraphs: [
          "Fishing is more complicated because El Nino does not help every species or every coast the same way. Still, changes in weather, water temperature, current, and bait can create openings for people who adjust.",
          "Bait may move. Fish may slide into cleaner water, deeper edges, inlets, passes, or areas with better salinity. Offshore, temperature breaks and current edges may become more important. Inshore, the best bite may come when stable weather lines up with moving water after a messy stretch.",
          "That is the opportunity. El Nino can shake up the usual routine enough that fishermen who pay attention find patterns other people miss."
        ]
      },
      {
        heading: "The fishing downside",
        paragraphs: [
          "The bad side is usually water quality and access.",
          "Heavy rain can push freshwater into estuaries and backwaters. Wind can dirty up flats. Runoff can hurt clarity. Rough seas can keep smaller boats at the dock. A spot that usually fishes well on a certain tide may feel dead if the water is muddy, the bait moved, or the salinity changed.",
          "El Nino can also make planning less predictable. You may need to stop fishing last month's pattern and start looking for cleaner water, steadier temperature, active bait, and safer windows."
        ]
      },
      {
        heading: "Where tides fit in",
        paragraphs: [
          "Tides are not the main El Nino story, but they still matter once you are planning a real session or trip.",
          "For surfers, tide changes how a wave breaks. A powerful swell at the wrong tide can be too deep, too drained, too fast, or too heavy. For fishermen, tide moves water, bait, scent, and fish. Moving water around inlets, docks, flats, bridges, oyster bars, and shorelines can still make the difference.",
          "Use Tide Buoy for the tide part: current tide, tide direction, and the next high or low tide. Then check surf, wind, marine weather, rainfall, water quality, and local safety info before you go."
        ],
        imageIndexes: [4]
      },
      {
        heading: "Quick checklist for surfers",
        paragraphs: ["Before paddling out during an El Nino pattern, check the full setup."],
        items: [
          "Swell height, period, and direction",
          "Wind direction and whether it is expected to switch",
          "Current tide and whether the tide is rising or falling",
          "Whether your spot can hold the size",
          "Rip current risk and beach hazard statements",
          "Recent rainfall and water quality",
          "Your own comfort level if the surf is bigger than normal"
        ]
      },
      {
        heading: "Quick checklist for fishermen",
        paragraphs: ["Before heading out, look for the cleanest and safest window instead of chasing the old routine."],
        items: [
          "Current tide, tide direction, and next high or low",
          "Wind speed and direction",
          "Rainfall over the last few days",
          "Water clarity and salinity changes",
          "Water temperature",
          "Bait activity",
          "Marine forecast and storm risk",
          "Safe launch, inlet, and return conditions"
        ]
      },
      {
        heading: "Bottom line",
        paragraphs: [
          "El Nino can be good for surf and fishing. It can also ruin plans.",
          "For surfers, the benefit is more energy in the ocean and better chances at real swell. The downside is rougher water, stronger currents, bad wind, erosion, and dirty runoff. For fishermen, the benefit is changing bait and fish movement that can create new patterns. The downside is muddy water, salinity swings, rough boating, and less predictable bites.",
          "Treat El Nino as a heads-up, not a promise. Check the local weather, surf, marine forecast, water quality, and safety guidance. Then check the current tide, tide direction, and next high or low tide in Tide Buoy before you go."
        ]
      }
    ]
  },
  {
    slug: "rip-currents-and-tide",
    title: "Rip Currents and Tide: What Florida Beachgoers Should Check Before Swimming",
    metaTitle: "Rip Currents and Tide | Florida Beach Safety | Tide Buoy",
    metaDescription: "Learn how tide timing can affect rip-current conditions and what Florida beachgoers should check before swimming, including beach flags, surf, lifeguards, and local forecasts.",
    excerpt: "A practical Florida beach safety guide for checking the tide, rip-current risk, surf, beach flags, and lifeguard guidance before getting in the water.",
    category: "Beach Safety",
    readTime: "7 min read",
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
    heroImage: {
      src: "/images/blog/rip-currents-and-tide/rip-currents-and-tide-rough-surf.jpeg",
      alt: "Rough surf breaking across a Florida beach under a blue sky",
      caption: "Rough surf is a reminder to check more than the tide before swimming.",
      width: 2048,
      height: 1536
    },
    seoTags: ["rip currents and tide", "Florida rip current risk", "beach safety", "tide direction", "swimming conditions", "beach flags"],
    images: [
      {
        src: "/images/blog/rip-currents-and-tide/rip-currents-and-tide-rough-surf.jpeg",
        alt: "Rough surf breaking across a Florida beach under a blue sky",
        caption: "Rough surf is a reminder to check more than the tide before swimming.",
        tag: "surf-zone check",
        focalPoint: "center center",
        aspectClass: "aspect-[16/7]"
      },
      {
        src: "/images/blog/rip-currents-and-tide/rip-currents-and-tide-dune-surf.jpeg",
        alt: "Ocean surf viewed from behind beach dunes and sea grass",
        caption: "Pause at the dune line and read the beach before walking into the water.",
        tag: "before you swim",
        focalPoint: "center 46%",
        aspectClass: "aspect-[4/5]"
      },
      {
        src: "/images/blog/rip-currents-and-tide/rip-currents-and-tide-swimmers.jpeg",
        alt: "Two people standing near breaking waves on a sunny beach",
        caption: "Even inviting beach days need a quick check on tide, surf, flags, and lifeguard guidance.",
        tag: "swim planning",
        focalPoint: "center center"
      }
    ],
    sections: [
      {
        heading: "Tide matters, but it is not the whole forecast",
        paragraphs: [
          "Tide matters before a swim, but it is not a rip-current forecast by itself.",
          "A better way to think about it is simple: tide changes the water level, the shoreline, the sandbars, and where waves are breaking. Those details can affect rip-current conditions. Rip currents also depend on surf height, wave direction, beach shape, piers, jetties, storms, and local conditions that change fast.",
          "So check the tide first. Then check the local rip-current risk, beach flags, lifeguard guidance, weather, and surf."
        ],
        imageIndexes: [0]
      },
      {
        heading: "What is a rip current?",
        paragraphs: [
          "A rip current is a narrow flow of water moving away from the beach through the surf zone. It does not pull you under. The danger is that it can carry swimmers away from shore faster than they expect.",
          "Rip currents often form where water pushed toward the beach by breaking waves finds a path back out. That can happen near gaps in sandbars, beside piers and jetties, around groins, or in channels where waves are breaking differently from the water around them.",
          "They can be hard to spot. Sometimes the water in a rip looks calmer than the breaking waves beside it. That calm-looking gap can be the wrong place to swim."
        ],
        imageIndexes: [1]
      },
      {
        heading: "How tide can affect rip-current risk",
        paragraphs: [
          "Tide changes the depth of water over sandbars and near the beach. That changes where waves break.",
          "On many ocean beaches with smaller tidal ranges, rip currents can flow faster around an hour or two on either side of low tide because shallower water can increase breaking wave activity over bars. On beaches with larger tidal ranges, the strongest window may be closer to mid tide if bars become exposed at low tide.",
          "That does not mean every low tide is dangerous or every high tide is safe. It means tide stage is one piece of the beach setup. A low tide may expose sandbars, channels, troughs, and steeper drop-offs. A rising tide may cover bars and change where people stand, wade, or swim. A high tide may push water higher on the beach and reduce some breaking over outer bars, but it can also leave less dry sand and stronger shorebreak in some places."
        ],
        imageIndexes: [2]
      },
      {
        heading: "Is outgoing tide worse for rip currents?",
        paragraphs: [
          "Not automatically.",
          "Rip-current speed is tied to water level because water level affects wave breaking. That is different from saying rip currents are always stronger simply because the tide is falling. A falling tide can matter, but it is not the only thing to watch.",
          "At inlets, passes, bays, and harbor mouths, outgoing water can create strong tidal currents. Those are real hazards, but they are not the same thing as surf-zone rip currents on an open beach."
        ]
      },
      {
        heading: "Florida beach checklist before swimming",
        paragraphs: [
          "Before getting in the water, keep the check plain and practical."
        ],
        items: [
          "Current tide and whether water is rising or falling",
          "Next high tide and next low tide",
          "Local rip-current risk from the National Weather Service",
          "Beach flags at the access point",
          "Lifeguard guidance",
          "Surf height and wave direction",
          "Wind, thunderstorms, and tropical weather",
          "Nearby piers, jetties, inlets, or channels",
          "Red tide status on Gulf Coast beach days",
          "Whether children or weaker swimmers can stay near a lifeguard"
        ]
      },
      {
        heading: "What beachgoers should watch from shore",
        paragraphs: [
          "When you arrive, pause before swimming. Look at the water from a slightly higher spot if you can.",
          "Watch for gaps in the line of breaking waves, darker or choppier water moving away from shore, foam or sand being carried seaward, or a narrow channel near a pier or jetty. Those signs are not always obvious, and not every rip current is easy to see.",
          "If lifeguards are present, ask where the safer swimming area is. Swim near them when possible."
        ]
      },
      {
        heading: "Where Tide Buoy fits",
        paragraphs: [
          "Tide Buoy helps with the tide part of the decision. Open the app and look at the current tide, tide direction, and next high or low tide before you leave or before you walk down to the water.",
          "That quick check helps you understand whether the shoreline is filling in, draining out, nearing low water, or moving toward high water. It is useful context for beach walks, swimming plans, surf checks, shelling, photography, and family beach days.",
          "Pair that tide check with official beach safety information. Use local National Weather Service forecasts, beach flags, lifeguards, and county beach updates for rip-current risk."
        ]
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "The tide can influence rip-current conditions because it changes water depth and wave breaking. Tide alone does not tell you whether swimming is safe.",
          "For a smarter Florida beach day, check the tide first, then check rip-current risk, surf, wind, weather, beach flags, and lifeguard guidance. If anything looks questionable, stay out of the water or stay near a guarded swimming area.",
          "Before you go, check the current tide, tide direction, and next high or low tide in Tide Buoy. Then confirm local beach conditions before anyone gets in."
        ]
      }
    ]
  },
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
