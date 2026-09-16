# SPAARSH website

Next.js (App Router) + Tailwind. Static site with a contact form.

```bash
npm install
npm run dev
```

## Editing content

All copy and data live in `content/`. Search for `PLACEHOLDER` to find what still needs real content.

- Images go in `public/` and are referenced as `/path/to/file.jpg` with alt text.
- Empty arrays (impact, gallery, collaborations) hide their section entirely.
- `content/config.ts` → `contact.primary` switches the main contact channel.
- `content/site.ts` → set `hero.image` to switch the hero to a photo.

## Contact form

Messages go to Formspree (`contactFormEndpoint` in `content/config.ts`), which emails them to the form owner. Fields are validated in the browser with zod before sending; spam filtering and reply-to are handled by Formspree.
