// -> team_members table

import type { ImageAsset } from "./site";

export interface TeamMember {
  name: string;
  role: string;
  /** Photos render only when every member has one. */
  photo: ImageAsset | null;
}

export const teamMembers: TeamMember[] = [
  { name: "[PLACEHOLDER: name]", role: "[PLACEHOLDER: role]", photo: null },
  { name: "[PLACEHOLDER: name]", role: "[PLACEHOLDER: role]", photo: null },
  { name: "[PLACEHOLDER: name]", role: "[PLACEHOLDER: role]", photo: null },
];
