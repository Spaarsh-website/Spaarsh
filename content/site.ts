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
      "SPAARSH grew out of volunteer rescue and relief coordination during the 2026 Assam floods in Sivasagar.",
      "When the floods came to Sivasagar, a few of us went out. There was no organisation behind it. We were people who knew these villages, and we could not sit at home while families waited for someone to come. We went out in the morning and came back at night, and the next day we went out again.",
      "For weeks that was the whole of it. Rescue, food, water, whatever we could carry to whoever needed it most.",
      "Then the water went down, and we understood the harder part. The families we had pulled out had nowhere to return to. No house standing. No work. No way to begin again. We had kept people alive through the worst of it, and then the worst of it ended and they were still left with nothing.",
      "That is where SPAARSH came from. Not from a plan, but from realising that showing up during a flood is not enough if you leave when the water does. We gave ourselves a name so we could keep going after the emergency passed, and so the next family would not have to hope that strangers turn up.",
      "We are still those same people. We just do not stop at the water line anymore.",
    ],
    quote: "[PLACEHOLDER: pull-quote from a founder or volunteer]",
    image: null, // PLACEHOLDER: origin photo (4:5)
  },
  vision: "[PLACEHOLDER: vision statement]",
  mission: "[PLACEHOLDER: mission statement]",
  volunteer: {
    heading: "Volunteer",
    subheading: "Join our relief efforts",
    text: "Lend your time to flood relief and rehabilitation work in Sivasagar. Fill in a short form and we will get in touch.",
    cta: "Sign up as a volunteer",
  },
};
