import Image from "next/image";
import { config, contactHref, type ContactChannel } from "@/content/config";
import { site } from "@/content/site";
import { programs } from "@/content/work";
import { impactStats } from "@/content/impact";
import { galleryImages } from "@/content/gallery";
import { teamMembers } from "@/content/team";
import { partners, partnerImages } from "@/content/collaborations";
import { supportOptions } from "@/content/support";
import { HillCurve } from "./HillCurve";
import { Icon } from "./Icon";
import { ImageGrid } from "./ImageGrid";
import { ContactForm } from "./ContactForm";
import { Carousel } from "./Carousel";
import { ReadMore } from "./ReadMore";
import { SocialLinks } from "./SocialIcon";
import { btnOutline, btnPrimary, card, container, eyebrow, h2 } from "./ui";

/* ---------- 1. Hero ---------- */

function HeroText() {
  return (
    <>
      <h1 className="font-serif text-[clamp(2.5rem,min(14vw,13svh),7.5rem)] font-semibold leading-none tracking-wide text-cream">
        {site.name}
      </h1>
      <p className="mt-3 font-serif text-lg italic text-cream md:mt-5 md:text-3xl">{site.tagline}</p>
      <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-cream md:mt-4 md:text-lg">
        {site.hero.context}
      </p>
      <div className="mt-6 flex gap-3 sm:gap-4 md:mt-8">
        <a href="#support" className={`${btnPrimary} max-sm:flex-1 max-sm:px-3 max-sm:py-3.5`}>
          Support Us
        </a>
        <a href="#about" className={`${btnOutline} max-sm:flex-1 max-sm:px-3 max-sm:py-3.5`}>
          Our Story
        </a>
      </div>
    </>
  );
}

export function Hero() {
  const { image } = site.hero;

  if (image) {
    return (
      <section id="top" data-dark className="relative flex flex-1 items-end bg-green-deep">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/60 to-transparent" />
        <div className={`${container} relative w-full pb-10 pt-24 md:pb-16`}>
          <HeroText />
        </div>
      </section>
    );
  }

  return (
    <section id="top" data-dark className="relative isolate flex flex-1 flex-col overflow-hidden bg-green-deep">
      {/* Soft olive glow behind the watermark - tokens only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_90%_95%,color-mix(in_oklab,var(--green-olive)_38%,transparent),transparent_70%)]"
      />
      {/* স্পৰ্শ - Assamese for "touch". Decorative; the meaning is stated in the name band. */}
      <div className={`${container} flex w-full flex-1 flex-col justify-center pb-4 pt-24 md:pb-8 md:pt-28`}>
        <div className="border-l-2 border-terracotta pl-5 md:pl-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-sand md:mb-6">Sivasagar · Assam</p>
          <HeroText />
        </div>
        {/* Mobile: sits under the buttons, centred with the text; sized to the height left on short phones.
            Desktop: floats bottom-right behind the content. */}
        <div aria-hidden="true" className="mt-2 flex justify-end md:contents">
          <p
            aria-hidden="true"
            lang="as"
            className="pointer-events-none -z-10 select-none bg-linear-to-br from-green-olive/70 via-green-olive/35 to-green-olive/10 bg-clip-text pt-[0.2em] font-bengali text-[clamp(3rem,min(34vw,calc((100svh-35rem)/1.3)),9rem)] font-bold leading-[1.1] text-transparent md:absolute md:bottom-2 md:right-12 md:text-[clamp(6rem,min(26vw,34svh),24rem)]"
          >
            স্পৰ্শ
          </p>
        </div>
      </div>
      {/* Hill motif: the cream page rises into the banner. */}
      <HillCurve className="relative text-cream" />
    </section>
  );
}

/* ---------- 2. The Name ---------- */

export function NameBand() {
  return (
    <section aria-label="The name" className="border-b border-green-olive/35 px-5 py-5 text-center md:py-7">
      <p className="mx-auto max-w-6xl text-balance text-[11px] uppercase leading-relaxed tracking-[0.14em] md:text-sm md:leading-loose md:tracking-[0.18em]">
        <span className="block font-medium sm:inline">
          {site.name}
          <span className="hidden sm:inline"> - </span>
        </span>
        <span className="text-balance">{site.expansion}</span>
      </p>
      <p className="mt-2 font-serif text-sm italic text-terracotta-text md:mt-3 md:text-base">{site.nameOrigin}</p>
    </section>
  );
}

/* ---------- 3. Origin Story ---------- */

export function Origin() {
  const { origin } = site;
  return (
    // Photo column only renders once site.origin.image is set; until then the text runs alone.
    <section id="about" className={`${container} grid gap-10 py-16 md:gap-20 md:py-28 ${origin.image ? "md:grid-cols-2" : ""}`}>
      <div className={origin.image ? "" : "max-w-3xl"}>
        <h2 className={`${h2} mb-8`}>{origin.heading}</h2>
        <ReadMore paragraphs={origin.paragraphs} />
        <figure className="mt-10 max-w-md">
          <div aria-hidden="true" className="mb-5 h-0.5 w-16 bg-terracotta" />
          <blockquote className="font-serif text-2xl italic leading-snug">{origin.quote}</blockquote>
        </figure>
      </div>
      {origin.image && (
        <div className="relative order-first aspect-[4/3] overflow-hidden bg-sand md:order-last md:aspect-[5/4]">
          <Image src={origin.image.src} alt={origin.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
    </section>
  );
}

/* ---------- 4. What We Do ---------- */

// Designer icons from public/icons. Decorative - the card heading carries the meaning.
// ponytail: source files are 48px PNGs, slightly soft on retina; swap for SVGs if the designer exports them.
function IconBox({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <Image
      src={`/icons/${name}.png`}
      alt=""
      width={48}
      height={48}
      unoptimized
      className={`md:mb-6 md:size-12 ${small ? "mb-3 size-9" : "mb-4 size-11"}`}
    />
  );
}

export function WhatWeDo() {
  if (programs.length === 0) return null;
  return (
    <section id="work" className={`${container} pb-16 md:pb-28`}>
      <h2 className={`${eyebrow} mb-8 md:mb-10`}>What we do</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        {programs.map((p) => (
          <article key={p.slug} className={`bg-sand p-5 md:p-12 ${card}`}>
            <IconBox name={p.icon} />
            <h3 className="mb-2 font-serif text-xl font-semibold md:mb-4 md:text-3xl">{p.title}</h3>
            <p className="text-[15px] font-light leading-relaxed md:text-base">{p.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Vision & Mission ---------- */

export function VisionMission() {
  return (
    <section aria-label="Vision and mission" className={`${container} grid gap-8 pb-16 md:grid-cols-[1fr_1px_1fr] md:gap-16 md:pb-28`}>
      <div>
        <h2 className={`${eyebrow} mb-5`}>Vision</h2>
        <p className="font-serif text-xl leading-normal md:text-3xl">{site.vision}</p>
      </div>
      <div aria-hidden="true" className="h-px bg-terracotta md:h-auto" />
      <div>
        <h2 className={`${eyebrow} mb-5`}>Mission</h2>
        <p className="font-serif text-xl leading-normal md:text-3xl">{site.mission}</p>
      </div>
    </section>
  );
}

/* ---------- 5. Impact ---------- */

export function Impact() {
  if (impactStats.length === 0) return null;
  return (
    <section aria-labelledby="impact-heading" data-dark>
      <HillCurve />
      <div className="bg-green-deep pb-16 pt-6 md:pb-28">
        <h2 id="impact-heading" className="sr-only">
          Our impact
        </h2>
        <dl className={`${container} grid gap-10 text-center sm:grid-cols-3 md:gap-12`}>
          {impactStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-3 text-xs uppercase tracking-[0.22em] text-cream">{s.label}</dt>
              <dd className="font-serif text-6xl font-semibold text-cream md:text-8xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- 6. Gallery ---------- */

export function Gallery() {
  if (galleryImages.length === 0) return null;
  return (
    <section aria-labelledby="gallery-heading" className={`${container} py-16 md:py-28`}>
      <h2 id="gallery-heading" className={`${h2} mb-8 md:mb-10`}>
        Gallery
      </h2>
      <ImageGrid images={galleryImages} />
    </section>
  );
}

/* ---------- 7. Our Team ---------- */

export function Team() {
  if (teamMembers.length === 0) return null;
  // Never mix photos with typographic entries.
  const withPhotos = teamMembers.every((m) => m.photo);

  return (
    <section id="team" className={`${container} pb-16 md:pb-28`}>
      <h2 className={`${h2} mb-10 md:mb-14`}>Our team</h2>
      {withPhotos ? (
        <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {teamMembers.map((m, i) => (
            <li key={i}>
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={m.photo!.src} alt={m.photo!.alt} fill sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-5 font-serif text-2xl font-semibold">{m.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">{m.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid divide-y divide-terracotta md:grid-cols-3 md:divide-x md:divide-y-0">
          {teamMembers.map((m, i) => (
            <li key={i} className="px-4 py-5 text-center md:py-4">
              <p className="font-serif text-2xl font-semibold md:text-3xl">{m.name}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em]">{m.role}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------- 8. Collaborations ---------- */

export function Collaborations() {
  if (partners.length === 0 && partnerImages.length === 0) return null;
  return (
    <section aria-labelledby="collab-heading" className={`${container} pb-16 md:pb-28`}>
      <h2 id="collab-heading" className={`${h2} mb-8 md:mb-10`}>
        Collaborations
      </h2>
      {partners.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {partners.map((p) => {
            const tile = p.logo ? (
              <span className="relative block h-12 w-full">
                <Image src={p.logo.src} alt={p.logo.alt} fill sizes="200px" className="object-contain" />
              </span>
            ) : (
              <span className="text-center font-serif text-lg">{p.name}</span>
            );
            const cls = "flex h-28 items-center justify-center border border-green-olive/40 bg-cream px-5";
            return (
              <li key={p.name}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-green-olive`}>
                    {tile}
                  </a>
                ) : (
                  <div className={cls}>{tile}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {partnerImages.length > 0 && (
        <div className="mt-10 md:mt-14">
          <h3 className={`${eyebrow} mb-6`}>From our shared work</h3>
          <ImageGrid images={partnerImages} />
        </div>
      )}
    </section>
  );
}

/* ---------- 9. Support Us ---------- */

const channelLabel: Record<ContactChannel, string> = {
  whatsapp: "WhatsApp",
  phone: "Call",
  email: "Email",
};

function SupportActions({ title }: { title: string }) {
  const order: ContactChannel[] = [
    config.contact.primary,
    ...(["whatsapp", "phone", "email"] as const).filter((c) => c !== config.contact.primary),
  ];
  const actions = order
    .map((channel) => ({ channel, href: contactHref(channel, title) }))
    .filter((a): a is { channel: ContactChannel; href: string } => a.href !== null);

  // No channel configured yet: fall back to the contact form.
  if (actions.length === 0) {
    return (
      <a href="#contact" className={btnPrimary}>
        Get in touch
      </a>
    );
  }

  const external = (c: ContactChannel) => (c === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {});

  return (
    <div className="flex items-center gap-2">
      {actions.map((a) => (
        <a
          key={a.channel}
          href={a.href}
          {...external(a.channel)}
          aria-label={`${channelLabel[a.channel]} about ${title}`}
          title={channelLabel[a.channel]}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-btn text-white transition-colors hover:bg-terracotta-text"
        >
          <Icon name={a.channel} className="size-5" />
        </a>
      ))}
    </div>
  );
}

export function Support() {
  if (supportOptions.length === 0) return null;
  return (
    <section id="support" data-dark className="mt-4">
      <HillCurve />
      <div className="bg-green-deep pb-16 pt-6 md:pb-28">
        <div className={container}>
          <Carousel
            label="Ways to support"
            heading={<h2 className="font-serif text-4xl font-semibold text-cream md:text-5xl">Support us</h2>}
          >
            {supportOptions.map((o) => (
              <li
                key={o.slug}
                data-light
                className={`flex w-[62%] shrink-0 snap-start flex-col bg-cream p-4 ${card} sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.5rem)/2)] md:p-8 lg:w-[calc((100%-3rem)/3)]`}
              >
                <IconBox name={o.icon} small />
                <h3 className="mb-1.5 font-serif text-lg font-semibold leading-snug md:mb-3 md:text-2xl">{o.title}</h3>
                <p className="mb-4 text-sm font-light leading-relaxed md:mb-6 md:text-base">{o.description}</p>
                <div className="mt-auto">
                  <SupportActions title={o.title} />
                </div>
              </li>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ---------- Volunteer ---------- */

export function Volunteer() {
  const { volunteer } = site;
  // Same two-column layout as Get in touch: heading + subheading left, sand panel right.
  return (
    <section id="volunteer" className={`${container} pt-16 md:pt-20`}>
      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.35fr] md:gap-x-16">
        <div>
          <h2 className={h2}>{volunteer.heading}</h2>
          <p className="mt-3 font-serif text-lg italic md:mt-5 md:text-3xl">{volunteer.subheading}</p>
        </div>
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-sand p-6 md:p-8">
          <p className="font-light leading-relaxed md:text-lg">{volunteer.text}</p>
          <a
            href={config.volunteerFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} max-sm:w-full`}
          >
            {volunteer.cta}
            <span className="sr-only"> (opens a Google Form in a new tab)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Contact ---------- */

const detailLabel = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-terracotta-text";

export function Contact() {
  const { contact, socials } = config;
  return (
    <section id="contact" className={`${container} py-16 md:py-20`}>
      {/* DOM order is heading, form, details so the form comes first on mobile;
          on desktop the heading and details share the left column. */}
      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.35fr] md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-8">
      <h2 className={h2}>Get in touch</h2>
      <div className="md:col-start-2 md:row-span-2 md:row-start-1">
        <ContactForm />
      </div>
      <div className="md:col-start-1 md:row-start-2">
        <address className="flex flex-col gap-5 font-light not-italic">
          <div>
            <span className={detailLabel}>Location</span>
            {contact.address}
          </div>
          {contact.email && (
            <div>
              <span className={detailLabel}>Email</span>
              <a href={`mailto:${contact.email}`} className="break-all underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </div>
          )}
          {contact.phone && (
            <div>
              <span className={detailLabel}>Phone</span>
              <a href={`tel:+${contact.phone}`} className="underline-offset-4 hover:underline">
                +{contact.phone}
              </a>
            </div>
          )}
          {contact.whatsapp && (
            <div>
              <span className={detailLabel}>WhatsApp</span>
              <a href={contactHref("whatsapp")!} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                +{contact.whatsapp}
              </a>
            </div>
          )}
        </address>
        {socials.length > 0 && (
          <div className="mt-5 font-light">
            <span className={detailLabel}>Socials</span>
            <SocialLinks />
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
