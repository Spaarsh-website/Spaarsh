# SPAARSH website

Next.js (App Router) + Tailwind. Static site with a contact form.

```bash
npm install
cp .env.example .env.local   # fill in Resend + Turnstile keys
npm run dev
```

## Editing content

All copy and data live in `content/`. Search for `PLACEHOLDER` to find what still needs real content.

- Images go in `public/` and are referenced as `/path/to/file.jpg` with alt text.
- Empty arrays (impact, gallery, collaborations) hide their section entirely.
- `content/config.ts` → `contact.primary` switches the main contact channel.
- `content/site.ts` → set `hero.image` to switch the hero to a photo.

## Contact form

`app/api/contact/route.ts` validates with zod, verifies Turnstile, and sends via Resend from an address on `send.spaarsh.org` (verify that domain in Resend first).
