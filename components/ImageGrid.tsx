"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ImageAsset } from "@/content/site";
import { Icon } from "./Icon";

// Same tone treatment on every tile.
const tone = "[filter:sepia(0.18)_saturate(0.85)]";

export function ImageGrid({ images }: { images: ImageAsset[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal(); // native modal: Esc, focus containment, focus restore
  };
  const step = (d: number) => setIndex((i) => ((i ?? 0) + d + images.length) % images.length);
  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-square w-full overflow-hidden bg-sand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${tone}`}
              />
              <span className="sr-only">Open larger view</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        data-dark
        aria-label="Image viewer"
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "Escape") dialog.current?.close(); // native cancel can be skipped in some browsers
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-green-deep p-4 text-cream open:flex open:flex-col md:p-8"
      >
        <div className="flex justify-end">
          <button type="button" onClick={() => dialog.current?.close()} className="flex size-11 items-center justify-center">
            <Icon name="close" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        {current && (
          <figure className="flex min-h-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className={`object-contain ${tone}`} />
            </div>
            <figcaption className="mt-4 text-center text-sm font-light">{current.alt}</figcaption>
          </figure>
        )}
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-6">
            <button type="button" onClick={() => step(-1)} className="flex size-11 items-center justify-center border border-cream">
              <Icon name="prev" className="size-5" />
              <span className="sr-only">Previous image</span>
            </button>
            <span className="text-sm tabular-nums" aria-live="polite">
              {(index ?? 0) + 1} / {images.length}
            </span>
            <button type="button" onClick={() => step(1)} className="flex size-11 items-center justify-center border border-cream">
              <Icon name="next" className="size-5" />
              <span className="sr-only">Next image</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
