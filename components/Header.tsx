"use client";

import { useEffect, useRef, useState } from "react";
import { config } from "@/content/config";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const btn =
  "inline-flex items-center justify-center bg-terracotta-btn px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-terracotta-text";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current!;
    const toggle = toggleRef.current;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      // Keep focus inside the header while the menu is open.
      const items = [...header.querySelectorAll<HTMLElement>("a, button")].filter((el) => el.offsetParent);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      data-dark
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "bg-green-deep shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
        <a href="#top" onClick={close} className="block">
          <Logo priority className="w-36 md:w-52" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {config.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-[0.06em] text-cream underline-offset-8 hover:underline"
            >
              {l.label}
            </a>
          ))}
          <a href="#support" className={btn}>
            Support Us
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex size-11 items-center justify-center text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <Icon name="close" className="size-6" />
          ) : (
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="h-[1.5px] w-6 bg-cream" />
              <span className="h-[1.5px] w-6 bg-cream" />
              <span className="h-[1.5px] w-6 bg-cream" />
            </span>
          )}
        </button>
      </div>

      {open && (
        <>
          {/* Dim the page below; tapping it closes the menu. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={close}
            className="fixed inset-0 -z-10 cursor-default bg-green-deep/50 lg:hidden"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            data-light
            className="mx-3 rounded-3xl bg-cream px-5 pb-5 pt-2 shadow-[0_20px_40px_-12px_color-mix(in_oklab,var(--green-deep)_60%,transparent)] outline-none lg:hidden"
          >
            <nav aria-label="Main">
              <ul className="divide-y divide-green-olive/25">
                {config.nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={close} className="block py-3 font-serif text-xl text-green-deep transition-colors hover:text-terracotta-text">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#support" onClick={close} className={`${btn} mt-4 w-full`}>
                Support Us
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
