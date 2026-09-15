// The hill curve from the logo, used as the top edge of deep green bands.
// Sits directly above the band; colour comes from `className` via currentColor.
export function HillCurve({ className = "text-green-deep" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`-mb-px block h-10 w-full md:h-20 ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 34C170 -4 360 6 520 52C640 88 800 88 920 52C1080 6 1270 -4 1440 34V90H0Z"
      />
    </svg>
  );
}
