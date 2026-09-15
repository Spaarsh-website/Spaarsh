import Image from "next/image";
import logo from "@/public/brand/logo-on-dark.png";

// The mark has no letterform, so mark + wordmark always render together.
// Every current placement is on deep green; use brand/logo-on-light.png on cream.
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`inline-flex ${className}`}>
      <Image src={logo} alt="SPAARSH" priority={priority} sizes="240px" className="h-auto w-full" />
    </span>
  );
}
