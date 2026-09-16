// -> support_options table

/** Designer icon set in public/icons (48x48 PNG, terracotta). */
export type IconName = "house" | "tin-sheets" | "rehab-home" | "heart" | "utensils" | "tools" | "book-pencil" | "boat";

export interface SupportOption {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
}

// DRAFT copy: descriptions only restate the category - confirm wording.
export const supportOptions: SupportOption[] = [
  {
    slug: "build-a-home",
    title: "Build a Home",
    description: "Help build a home for a family whose house was washed away in the floods.",
    icon: "house",
  },
  {
    slug: "financial-aid",
    title: "Financial Aid",
    description: "Contribute funds towards relief and rehabilitation work.",
    icon: "heart",
  },
  {
    slug: "raw-materials",
    title: "Raw materials for building a house",
    description: "Donate materials to help families rebuild their homes.",
    icon: "tin-sheets",
  },
  {
    slug: "household-items",
    title: "Household items",
    description: "Donate everyday essentials for households affected by the floods.",
    icon: "utensils",
  },
  {
    slug: "stationery",
    title: "Stationery",
    description: "Donate stationery so children can keep learning.",
    icon: "book-pencil",
  },
];
