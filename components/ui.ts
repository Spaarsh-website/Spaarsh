// Shared class strings, so every button and label looks the same.
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-terracotta-btn px-8 py-4 text-[13px] font-medium uppercase tracking-[0.09em] text-white transition-colors hover:bg-terracotta-text disabled:opacity-70";

export const btnOutline =
  "inline-flex items-center justify-center border border-cream px-8 py-4 text-[13px] font-medium uppercase tracking-[0.09em] text-cream transition-colors hover:bg-cream hover:text-green-deep";

export const eyebrow = "text-xs font-medium uppercase tracking-[0.24em] text-terracotta-text";

export const h2 = "font-serif text-4xl font-semibold leading-tight text-terracotta-text md:text-5xl";

export const container = "mx-auto max-w-7xl px-5 md:px-10";

// Rounded card that lifts on hover/keyboard focus and gains a terracotta edge with a soft glow.
// --card-glow is set in globals.css (green shadow on cream, sand glow on dark bands).
export const card =
  "rounded-3xl transition-[translate,box-shadow] duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:focus-within:-translate-y-1.5 hover:shadow-[0_0_0_1.5px_var(--terracotta),0_18px_40px_-14px_var(--card-glow)] focus-within:shadow-[0_0_0_1.5px_var(--terracotta),0_18px_40px_-14px_var(--card-glow)]";
