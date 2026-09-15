// -> support_options table

export interface SupportOption {
  slug: string;
  title: string;
  description: string;
  icon: "home" | "money" | "materials" | "household" | "stationery";
}

// DRAFT copy: descriptions only restate the category - confirm wording.
export const supportOptions: SupportOption[] = [
  {
    slug: "build-a-home",
    title: "Build a Home",
    description: "Help build a home for a family whose house was washed away in the floods.",
    icon: "home",
  },
  {
    slug: "money",
    title: "Money",
    description: "Contribute funds towards relief and rehabilitation work.",
    icon: "money",
  },
  {
    slug: "raw-materials",
    title: "Raw materials for building a house",
    description: "Donate materials to help families rebuild their homes.",
    icon: "materials",
  },
  {
    slug: "household-items",
    title: "Household items",
    description: "Donate everyday essentials for households affected by the floods.",
    icon: "household",
  },
  {
    slug: "stationery",
    title: "Stationery",
    description: "Donate stationery so children can keep learning.",
    icon: "stationery",
  },
];
