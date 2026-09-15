"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const arrow =
  "flex size-11 items-center justify-center border border-cream text-cream transition-colors hover:bg-cream hover:text-green-deep disabled:pointer-events-none disabled:opacity-30";

// Native scroll-snap row with arrow buttons. Children should be <li> with a width class.
export function Carousel({ label, heading, children }: { label: string; heading: React.ReactNode; children: React.ReactNode }) {
  const list = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = list.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (dir: number) => {
    const el = list.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
        {heading}
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => scroll(-1)} disabled={atStart} className={arrow}>
            <Icon name="prev" className="size-5" />
            <span className="sr-only">Previous</span>
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={atEnd} className={arrow}>
            <Icon name="next" className="size-5" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
      <ul
        ref={list}
        onScroll={update}
        tabIndex={0}
        aria-label={label}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-6 pt-2 [scrollbar-width:none] md:mx-0 md:gap-6 md:scroll-px-0 md:px-0 motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </>
  );
}
