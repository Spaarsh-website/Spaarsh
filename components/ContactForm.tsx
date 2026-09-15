"use client";

import Script from "next/script";
import { useState } from "react";
import { z } from "zod";
import { contactSchema, type ContactFieldErrors, type ContactInput } from "@/lib/contact-schema";
import { btnPrimary } from "./ui";

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Status = "idle" | "sending" | "success" | "error";

const labelCls = "mb-2 block text-[11px] font-medium uppercase tracking-[0.2em]";
const inputCls =
  "w-full rounded-lg border border-green-olive bg-cream px-4 py-3 text-base font-light text-green-deep placeholder:text-green-deep/60 aria-[invalid=true]:border-terracotta-btn aria-[invalid=true]:border-2";
const errorCls = "mt-2 text-sm font-medium text-terracotta-btn";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [serverError, setServerError] = useState("");

  function read(form: HTMLFormElement): ContactInput {
    const d = new FormData(form);
    return { name: String(d.get("name") ?? ""), email: String(d.get("email") ?? ""), message: String(d.get("message") ?? "") };
  }

  // Re-check a field as the visitor fixes it, once it has shown an error.
  function onChange(e: React.ChangeEvent<HTMLFormElement>) {
    const field = e.target.name as keyof ContactInput;
    if (!errors[field]) return;
    const result = contactSchema.safeParse(read(e.currentTarget));
    const next = result.success ? {} : z.flattenError(result.error).fieldErrors;
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setServerError("");

    const result = contactSchema.safeParse(read(form));
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors(fieldErrors);
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    setErrors({});

    const token = new FormData(form).get("cf-turnstile-response");
    if (siteKey && !token) {
      setStatus("error");
      setServerError("Please complete the verification check above the button.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, token }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    } finally {
      window.turnstile?.reset(); // tokens are single-use
    }
  }

  const field = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });
  const fieldError = (name: keyof ContactInput) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className={errorCls}>
        {errors[name]![0]}
      </p>
    );

  // The form stays mounted when hidden so the Turnstile widget survives "send another".
  return (
    <>
    <div role="status">
      {status === "success" && (
        <div className="rounded-3xl bg-sand p-6 md:p-8">
          <p className="font-serif text-2xl font-semibold md:text-3xl">Thank you - your message has been sent.</p>
          <p className="mt-3 font-light">We will get back to you by email.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium underline underline-offset-4">
            Send another message
          </button>
        </div>
      )}
    </div>
    <form noValidate hidden={status === "success"} onSubmit={onSubmit} onChange={onChange} className="flex flex-col gap-5 rounded-3xl bg-sand p-6 md:p-8">
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
      <div>
        <label htmlFor="contact-name" className={labelCls}>Name</label>
        <input {...field("name")} type="text" autoComplete="name" placeholder="Your name" className={inputCls} />
        {fieldError("name")}
      </div>
      <div>
        <label htmlFor="contact-email" className={labelCls}>Email</label>
        <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} />
        {fieldError("email")}
      </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelCls}>Message</label>
        <textarea {...field("message")} rows={4} placeholder="How would you like to help?" className={`${inputCls} resize-y`} />
        {fieldError("message")}
      </div>

      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />}

      {serverError && (
        <p role="alert" className="border-l-2 border-terracotta-btn bg-cream px-4 py-3 text-sm font-medium">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={`${btnPrimary} self-stretch sm:self-start`}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
    </>
  );
}
