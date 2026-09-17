"use client";

import { useEffect, useId, useRef, useState } from "react";

const PREVIEW_WORDS = 0;
const pCls = "mb-5 text-base font-light leading-relaxed md:text-lg";
const btnCls =
  "whitespace-nowrap text-sm font-medium uppercase tracking-[0.12em] text-terracotta-text underline-offset-4 hover:underline";

// The first two paragraphs read as one. Collapsed, the second is cut to its opening words
// (none today: the first entry already ends mid-sentence at "a huge amount of") followed by Read more. The full text stays in the HTML for search engines.
export function ReadMore({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const toggled = useRef(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // The button moves when toggled; keep keyboard focus on it without scrolling the page
  // (never on page load). Opening keeps the reader's place; closing brings "Read more" back into view.
  useEffect(() => {
    if (!toggled.current) return;
    btnRef.current?.focus({ preventScroll: true });
    if (!open) btnRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [open]);
  const [intro, next = "", ...rest] = paragraphs;

  if (!next) return <p className={pCls}>{intro}</p>;

  const preview = next.split(" ").slice(0, PREVIEW_WORDS).join(" ");
  const toggle = (label: string) => (
    <button
      ref={btnRef}
      type="button"
      aria-expanded={open}
      aria-controls={id}
      onClick={() => {
        toggled.current = true;
        setOpen((o) => !o);
      }}
      className={btnCls}
    >
      {label}
    </button>
  );

  return (
    <div id={id}>
      <p className={pCls}>
        {intro}
        {open ? (
          ` ${next}`
        ) : (
          <>
            {preview && ` ${preview}`}… {toggle("Read more")}
            <span hidden>{next.slice(preview.length)}</span>
          </>
        )}
      </p>
      {rest.map((p, i) => (
        <p key={i} hidden={!open} className={pCls}>
          {p}
        </p>
      ))}
      {open && toggle("Read less")}
    </div>
  );
}
