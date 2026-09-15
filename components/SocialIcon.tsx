import { config } from "@/content/config";

// Official Instagram glyph in brand colours (a third-party mark, so it sits outside our token palette).
function InstagramIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="ig-warm" cx="0.28" cy="1.08" r="1.2">
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.12" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        <linearGradient id="ig-cool" x1="0" y1="0" x2="0.45" y2="0.45">
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ig-warm)" />
      <rect width="64" height="64" rx="15" fill="url(#ig-cool)" />
      <rect x="13" y="13" width="38" height="38" rx="11" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="32" cy="32" r="9" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="43.5" cy="20.5" r="2.6" fill="#fff" />
    </svg>
  );
}

/** Icon + handle for each social profile. Renders nothing when none are configured. */
export function SocialLinks({ className = "" }: { className?: string }) {
  if (config.socials.length === 0) return null;
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {config.socials.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-6 shrink-0" />
            <span>
              <span className="sr-only">Instagram: </span>
              {s.handle}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
