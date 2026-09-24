"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { track } from "./Analytics";

export type Interest = "demo" | "project" | "other";

const interests: { value: Interest; label: string; hint: string }[] = [
  { value: "demo", label: "AImdoc demo", hint: "For care agencies" },
  { value: "project", label: "Custom project", hint: "For organizations" },
  { value: "other", label: "Something else", hint: "Press, partners, hiring" },
];

const timelines = ["As soon as possible", "In the next 1–3 months", "In 3–6 months", "Just exploring"];
const teamSizes = ["Under 25 caregivers", "25–100 caregivers", "100–500 caregivers", "More than 500 caregivers"];

const field =
  "mt-2 block w-full rounded-sm border border-light-600 bg-light-50 px-3 py-2.5 text-[15px] font-normal text-dark-500 placeholder:text-light-800 transition-[border-color,box-shadow] hover:border-light-700 focus:border-dark-500 focus:shadow-[0_0_0_3px_rgb(255_67_5/0.15)] focus:outline-none";

const copy: Record<Interest, { problemLabel: string; placeholder: string; submit: string }> = {
  demo: {
    problemLabel: "What would you like to see? (optional)",
    placeholder: "How your DSPs document today, what's hardest, what your compliance lead will ask…",
    submit: "Request a demo",
  },
  project: {
    problemLabel: "What problem are you trying to solve?",
    placeholder: "Who it's for, what's slowing you down today, and any date you're working toward.",
    submit: "Send project details",
  },
  other: {
    problemLabel: "What problem are you trying to solve?",
    placeholder: "Tell us what's on your mind.",
    submit: "Send message",
  },
};

/**
 * Contact + project intake (§5.8). Choosing "AImdoc demo" shows the inline
 * calendar when a booking link is configured, or a short demo-request form.
 */
export function ContactForm({
  initial,
  calendar,
  lockInterest = false,
}: {
  initial: Interest;
  calendar?: React.ReactNode;
  lockInterest?: boolean;
}) {
  const [interest, setInterest] = useState<Interest>(initial);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track(interest === "demo" ? "demo_booked" : "project_form_submit", { interest });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const c = copy[interest];

  return (
    <div>
      {!lockInterest && (
        <fieldset>
          <legend className="text-sm font-medium">I&rsquo;m interested in</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {interests.map((i) => (
              <label
                key={i.value}
                className={`flex cursor-pointer items-start gap-3 rounded-sm border px-3 py-3 transition-[border-color,background-color,box-shadow] has-[:focus-visible]:shadow-[0_0_0_3px_rgb(255_67_5/0.2)] ${
                  interest === i.value ? "border-dark-500 bg-light-50 shadow-[0_6px_16px_-12px_rgb(11_11_11/0.4)]" : "border-light-600 bg-light-500 hover:border-light-700"
                }`}
              >
                <input
                  type="radio"
                  name="interest_picker"
                  value={i.value}
                  checked={interest === i.value}
                  onChange={() => {
                    setInterest(i.value);
                    setState("idle");
                  }}
                  className="mt-0.5 h-4 w-4 accent-[#0b0b0b]"
                />
                <span className="flex flex-col">
                  <span className="text-[15px] font-medium">{i.label}</span>
                  <span className="text-xs text-light-900">{i.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {interest === "demo" && calendar ? (
        <div className="mt-8">
          <p className="mb-4 text-[15px] text-light-900">Pick a time that works for you.</p>
          {calendar}
        </div>
      ) : state === "sent" ? (
        <div role="status" className="animate-rise mt-8 rounded-md border border-light-600 bg-light-50 p-8">
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-status-live-bg text-status-live">✓</span>
          <p className="display mt-5 text-3xl">Thanks. We&rsquo;ve got it.</p>
          <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-light-900">
            {interest === "demo"
              ? "We'll email you to find a time for your AImdoc demo."
              : "We'll read it properly and reply by email."}{" "}
            If it&rsquo;s urgent, write to{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-dark-500 underline underline-offset-4">{site.contactEmail}</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={`grid gap-5 sm:grid-cols-2 ${lockInterest ? "" : "mt-8"}`}>
          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="text-sm font-medium">
            Name
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="text-sm font-medium">
            Work email
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className={`text-sm font-medium ${interest === "demo" ? "" : "sm:col-span-2"}`}>
            Organization
            <input name="organization" required={interest === "demo"} autoComplete="organization" className={field} />
          </label>
          {interest === "demo" && (
            <label className="text-sm font-medium">
              Your role
              <input name="role" placeholder="Director, program manager, compliance lead…" className={field} />
            </label>
          )}
          {interest === "demo" && (
            <label className="text-sm font-medium sm:col-span-2">
              Team size
              <select name="teamSize" defaultValue="" className={field}>
                <option value="">Select team size</option>
                {teamSizes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          )}
          <label className="text-sm font-medium sm:col-span-2">
            {c.problemLabel}
            <textarea name="problem" required={interest !== "demo"} rows={5} placeholder={c.placeholder} className={field} />
          </label>
          {interest !== "demo" && (
            <label className="text-sm font-medium sm:col-span-2">
              Timeline <span className="font-normal text-light-900">(optional)</span>
              <select name="timeline" defaultValue="" className={field}>
                <option value="">Select a timeline</option>
                {timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          )}
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={state === "sending"}
              data-event={interest === "demo" ? "demo_click" : undefined}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent-500 px-5 font-medium text-dark-500 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-[background-color,transform] hover:bg-accent-400 active:scale-[0.98] disabled:opacity-60"
            >
              {state === "sending" && <span aria-hidden className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-dark-500 border-t-transparent" />}
              {state === "sending" ? "Sending…" : c.submit}
            </button>
            <p aria-live="polite" className="text-sm text-accent-800">
              {state === "error" && (
                <>
                  We couldn&rsquo;t send that. Please email{" "}
                  <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-4">{site.contactEmail}</a>.
                </>
              )}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
