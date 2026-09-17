export type ContactChannel = "whatsapp" | "phone" | "email";

export interface ContactConfig {
  /** Which channel primary CTAs use. Switching channels is this one line. */
  primary: ContactChannel;
  /** E.164 without "+", e.g. "919876543210". null until supplied. */
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string;
}

export interface SocialLink {
  platform: "instagram";
  handle: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  url: string;
  contact: ContactConfig;
  socials: SocialLink[];
  nav: NavLink[];
  footerLinks: NavLink[];
  /** Phase 2: registration details. Renders nothing while null. */
  registration: string | null;
  credits: { label: string; url: string };
  volunteerFormUrl: string;
  /** Formspree form that delivers contact messages by email. */
  contactFormEndpoint: string;
}

export const config: SiteConfig = {
  url: "https://spaarsh.org",
  contact: {
    primary: "email", // only live channel for now; switch to "whatsapp" once the number is added
    phone: null, // PLACEHOLDER: phone number
    whatsapp: null, // PLACEHOLDER: WhatsApp number
    email: "spaarshngo@gmail.com",
    address: "Sivasagar, Assam, India",
  },
  socials: [{ platform: "instagram", handle: "@spaarsh.ngo", url: "https://www.instagram.com/spaarsh.ngo/" }],
  nav: [
    { label: "About", href: "#about" },
    { label: "Our Work", href: "#work" },
    // { label: "Team", href: "#team" }, - hidden with the Team section
    { label: "Contact", href: "#contact" },
  ],
  footerLinks: [
    { label: "About", href: "#about" },
    { label: "Our Work", href: "#work" },
    // { label: "Team", href: "#team" }, - hidden with the Team section
    { label: "Support Us", href: "#support" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Contact", href: "#contact" },
  ],
  registration: null,
  credits: { label: "@tech_bagwitty", url: "https://www.instagram.com/tech_bagwitty/" },
  volunteerFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeFBFJJD5d5fIXLBNg_Cf1370it2ifUl1sdnbOh7YqIK0Se6g/viewform",
  contactFormEndpoint: "https://formspree.io/f/xppwagao",
};

/** Link for a channel, carrying `label` as WhatsApp text or email subject. null if the channel isn't set. */
export function contactHref(channel: ContactChannel, label?: string): string | null {
  const { phone, whatsapp, email } = config.contact;
  if (channel === "phone") return phone && `tel:+${phone}`;
  if (channel === "whatsapp") {
    if (!whatsapp) return null;
    return label
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello SPAARSH, I would like to help with: ${label}`)}`
      : `https://wa.me/${whatsapp}`;
  }
  if (!email) return null;
  return label ? `mailto:${email}?subject=${encodeURIComponent(`Support: ${label}`)}` : `mailto:${email}`;
}
