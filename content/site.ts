// Static copy. Anything in [PLACEHOLDER: ...] must be replaced with real content before launch.

export interface ImageAsset {
  /** Path under /public, e.g. "/images/hero.jpg". */
  src: string;
  alt: string;
}

export interface SiteContent {
  name: string;
  expansion: string;
  nameOrigin: string;
  tagline: string;
  hero: {
    context: string;
    /** Set to show a full-bleed photo hero. null = typographic hero. */
    image: ImageAsset | null;
  };
  origin: {
    heading: string;
    paragraphs: string[];
    quote: string;
    quoteBy: string;
    image: ImageAsset | null;
  };
  vision: { summary: string; paragraphs: string[] };
  mission: { summary: string; intro: string; points: string[] };
  volunteer: { heading: string; subheading: string; text: string; cta: string };
}

export const site: SiteContent = {
  name: "SPAARSH",
  expansion:
    "Strategic Platform for All-Inclusive Aid, Resilience and Sustainable Humanitarianism",
  nameOrigin: "From the Sanskrit for “touch”.",
  tagline: "Touching Lives, Building Futures",
  hero: {
    context: "Flood relief and long-term rehabilitation from Sivasagar, Assam.",
    image: null,
  },
  origin: {
    heading: "Our story",
    paragraphs: [
      // First two entries render as one paragraph; "Read more" cuts in after "a huge amount of".
      "It all began with the heavy monsoon rains across Assam. In July 2026, a huge amount of",
      "water a huge amount of water raging aggressively towards parts of Sivasagar moved into villages, homes and fields within minutes. Thousands sought shelter in relief camps. Many were left behind. Uncertainty and fright hovered around.",
      "People came forward. Volunteers joined rescue and relief efforts, carrying essential supplies and reaching communities where help was urgently needed. The first response was about survival: getting people out of danger and helping them through the immediate crisis.",
      "But then, slowly, the waters began to recede. And that was when another story became visible. Behind the flooded homes were families who had lost everything and were left with the unimaginable task of rebuilding their lives from scratch.",
      "The emergency was beginning to end. But the need was not.",
      "For our volunteers, this sparked a realisation: people need support not only when disaster strikes, but in the long and difficult journey that follows. And from that realisation, SPAARSH was born. A dream to help became a promise to serve.",
      "Today it is committed to be the guiding light for people confronted by the harsh realities of life.",
    ],
    quote: "We came to help. We stayed to make a difference. Compassion in action, communities at heart.",
    quoteBy: "Jojati Gogoi, Founder",
    image: null, // PLACEHOLDER: origin photo (4:5)
  },
  vision: {
    summary: "A helping hand in need, a lasting partner in recovery.",
    paragraphs: [
      "SPAARSH envisions a society where people affected by floods and other challenges receive not only immediate relief, but also long-term rehabilitation, livelihood support and opportunities to rebuild their lives with dignity and self-reliance.",
      "Beyond disaster response, we aspire to address basic social needs and work alongside communities towards better access to education, healthcare, livelihood opportunities, a safe environment and a dignified quality of life.",
      "Our vision is simple: to be a helping hand in times of need and a lasting partner in the journey towards recovery, resilience and hope.",
    ],
  },
  mission: {
    summary: "Compassionate, transparent action for communities.",
    intro:
      "SPAARSH is committed to serving vulnerable and underserved communities through compassionate, transparent and community-driven action. Our mission is to:",
    points: [
      "Provide timely relief and essential support to communities affected by floods and other disasters.",
      "Support the long-term rehabilitation and rebuilding of flood-affected families.",
      "Identify the people most in need and make sure the right support reaches them.",
      "Help communities regain sustainable livelihoods and become self-reliant.",
      "Address basic social needs, including food, education, healthcare, sanitation and a safe living environment.",
      "Mobilize volunteers and citizens to participate in meaningful community service.",
      "Promote awareness, preparedness and resilience against future disasters.",
      "Work in partnership with local communities, organizations and stakeholders to create sustainable social impact.",
    ],
  },
  volunteer: {
    heading: "Volunteer",
    subheading: "Join our relief efforts",
    text: "Lend your time to flood relief and rehabilitation work in Sivasagar. Fill in a short form and we will get in touch.",
    cta: "Sign up as a volunteer",
  },
};
