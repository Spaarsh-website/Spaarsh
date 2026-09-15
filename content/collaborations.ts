// -> partners, partner_images tables. Empty until confirmed; the section renders nothing.

import type { ImageAsset } from "./site";

export interface Partner {
  name: string;
  /** Logo under /public. null = name set in the serif. */
  logo: ImageAsset | null;
  url: string | null;
}

export type PartnerImage = ImageAsset;

export const partners: Partner[] = [];

export const partnerImages: PartnerImage[] = [];
