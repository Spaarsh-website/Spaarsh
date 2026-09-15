// Line-drawn icons. Colour via currentColor.
const paths = {
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z" />
      <path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1-1.5-2-1-1 .8a4 4 0 0 1-2.3-2.3l.8-1-1-2z" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 6l9 7 9-7" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5L5 19" />,
  prev: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
