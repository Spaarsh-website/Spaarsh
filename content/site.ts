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
    image: ImageAsset | null;
  };
  vision: string;
  mission: string;
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
      "SPAARSH grew out of volunteer rescue and relief coordination during the 2026 Assam floods in Sivasagar.",
      "[PLACEHOLDER: the rest of the origin story - how the volunteer effort began and why it became an organisation.]",
    ],
    quote: "[PLACEHOLDER: pull-quote from a founder or volunteer]",
    image: null, // PLACEHOLDER: origin photo (4:5)
  },
  vision: "[PLACEHOLDER: vision statement]",
  mission: "[PLACEHOLDER: mission statement]",
};
