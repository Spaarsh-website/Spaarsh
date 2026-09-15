import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

// ponytail: in-memory per-instance rate limit. Serverless instances don't share it,
// so it slows abuse rather than stopping it; move to Upstash/Vercel KV if spam gets through.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const fail = (error: string, status: number, extra?: object) => Response.json({ error, ...extra }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail("Too many messages. Please wait a few minutes and try again.", 429);

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Please check the highlighted fields.", 400, { fieldErrors: z.flattenError(parsed.error).fieldErrors });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = typeof body?.token === "string" ? body.token : "";
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }));
    if (!verify.success) return fail("Verification failed. Please try again.", 400);
  } else if (process.env.NODE_ENV === "production") {
    console.error("contact: TURNSTILE_SECRET_KEY is not set");
    return fail("The form is not available right now. Please contact us another way.", 500);
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("contact: Resend environment variables are not set");
    return fail("The form is not available right now. Please contact us another way.", 500);
  }

  const { name, email, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Website message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`, // plain text only: no HTML injection
    }),
    signal: AbortSignal.timeout(15000),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("contact: Resend failed", res?.status, await res?.text().catch(() => ""));
    return fail("Your message could not be sent. Please try again shortly.", 502);
  }

  return Response.json({ ok: true });
}
