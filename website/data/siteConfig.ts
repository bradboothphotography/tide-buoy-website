export const siteConfig = {
  name: "Tide Buoy",
  tagline: "Tides Made Simple",
  url: "https://tidebuoy.com",
  appStoreUrl: "https://apps.apple.com/us/app/tide-buoy/id6760411286",
  email: "hello@tidebuoy.com",
  supportEmail: "support@tidebuoy.com",
  supportResponseTime: "Usually within 1 to 2 business days",
  appAdsContent: "google.com, pub-6342044419043640, DIRECT, f08c47fec0942fa0",
  supportTopics: [
    "App Support",
    "Bug Report",
    "Billing or Premium",
    "Feature Request",
    "Partnership or Press",
    "General Question"
  ],
  supportChecklist: [
    "Tell us the location you were checking.",
    "Include your iPhone model and iOS version if the issue is app-related.",
    "Mention whether you were using the free or premium version.",
    "Add screenshots if you plan to follow up by email."
  ],
  appHighlights: [
    "Easy tide charts",
    "Incoming and outgoing tide direction",
    "Daily highs and lows",
    "Location-based tide planning",
    "Simple coastal decision-making",
    "Lightweight design built for outdoors use"
  ],
  supportFaqs: [
    {
      question: "Does the website show live tide charts yet?",
      answer: "Not yet. Live tide charts are available in the Tide Buoy iOS app. Web tide charts are coming soon."
    },
    {
      question: "What should I send with a support request?",
      answer: "The most helpful tickets include the location, what you expected to see, what happened instead, and your app version."
    },
    {
      question: "How do premium questions get handled?",
      answer: "Use the support form and choose the billing or premium topic so we can prioritize the right details."
    }
  ]
} as const;
