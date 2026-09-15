// -> gallery_images table. Empty until real photos are added; the section renders nothing.
// To add: put the file in public/gallery/ and append { src: "/gallery/name.jpg", alt: "..." }.

import type { ImageAsset } from "./site";

export type GalleryImage = ImageAsset;

export const galleryImages: GalleryImage[] = [];
