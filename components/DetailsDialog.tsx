"use client";

import { useRef, type ReactNode } from "react";
import { Icon } from "./Icon";
import { eyebrow } from "./ui";

// Short summary on the page; the full text opens in a native modal (Esc, focus containment, focus restore).
export function DetailsDialog({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <div>
      <h2 className={`${eyebrow} mb-5`}>{title}</h2>
      <p className="mb-5 font-serif text-xl leading-normal md:text-3xl">{summary}</p>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="text-sm font-medium uppercase tracking-[0.12em] text-terracotta-text underline-offset-4 hover:underline"
      >
        Read more
      </button>

      <dialog
        ref={dialog}
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => e.key === "Escape" && close()}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl flex-col rounded-3xl bg-cream p-0 backdrop:bg-green-deep/70 open:flex"
      >
        {/* Header stays put so the close button is always reachable while the body scrolls. */}
        <div className="flex items-center justify-between py-3 pl-6 pr-3 md:pl-12 md:pr-5 md:pt-5">
          <h2 className={eyebrow}>{title}</h2>
          <button type="button" onClick={close} className="flex size-11 items-center justify-center text-terracotta-text">
            <Icon name="close" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="overflow-y-auto px-6 pb-6 md:px-12 md:pb-12">{children}</div>
      </dialog>
    </div>
  );
}
