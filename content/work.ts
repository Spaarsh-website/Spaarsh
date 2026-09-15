// -> programs table

export interface Program {
  slug: string;
  title: string;
  summary: string;
  icon: "response" | "rehabilitation";
}

// DRAFT copy: summaries restate the brief only - confirm wording.
export const programs: Program[] = [
  {
    slug: "immediate-response",
    title: "Immediate Humanitarian Response",
    summary: "Rescue and relief coordination for families caught in the floods.",
    icon: "response",
  },
  {
    slug: "rehabilitation",
    title: "Long-Term Rehabilitation",
    summary: "Helping flood-affected families rebuild after the water recedes.",
    icon: "rehabilitation",
  },
];
