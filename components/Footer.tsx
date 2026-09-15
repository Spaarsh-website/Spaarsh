import { config } from "@/content/config";
import { site } from "@/content/site";
import { HillCurve } from "./HillCurve";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialIcon";

const label = "mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-cream/80";

export function Footer() {
  const { contact } = config;

  return (
    <footer>
      <HillCurve />
      <div data-dark className="bg-green-deep text-cream">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-6 md:px-10 md:pb-10">
          <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-14">
            <div>
              <Logo className="w-48 md:w-60" />
              <p className="mt-4 font-serif text-lg italic">{site.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:contents">
              <nav aria-label="Footer">
                <h2 className={label}>Quick links</h2>
                <ul className="flex flex-col gap-3 text-[15px] font-light">
                  {config.footerLinks.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <h2 className={label}>Contact</h2>
                <address className="flex flex-col gap-1 text-[15px] font-light not-italic leading-relaxed">
                  <span>{contact.address}</span>
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="break-all hover:underline">
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a href={`tel:+${contact.phone}`} className="hover:underline">
                      +{contact.phone}
                    </a>
                  )}
                </address>
                <SocialLinks className="mt-3 text-[15px] font-light" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-cream/25 pt-6 text-xs font-light md:flex-row md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
              {/* Registration slot: renders nothing until details exist (Phase 2). */}
              {config.registration && <span className="block">{config.registration}</span>}
            </p>
            <p>
              Developed by{" "}
              <a href={config.credits.url} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                {config.credits.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
