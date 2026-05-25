export const tideGuideStates = [
  {
    name: "Florida",
    summary: "Starter guides for East Coast beach towns, inlets, and surf checks where tide direction matters every day."
  },
  {
    name: "California",
    summary: "Surf-driven planning for open beaches, points, and daily windows shaped by tide swings."
  },
  {
    name: "Alaska",
    summary: "Big water movement and practical coastal timing for harbors, boating, fishing, and shoreline access."
  }
] as const;

export const tideGuideTopics = [
  {
    title: "Incoming vs outgoing tide",
    description: "See whether the water is rising or falling before you leave for the beach, harbor, or break."
  },
  {
    title: "Daily highs and lows",
    description: "Quickly understand the major tide swings that shape your session."
  },
  {
    title: "Coastal planning by use case",
    description: "Surfing, fishing, shelling, boating, and photography all use tide data differently."
  }
] as const;
