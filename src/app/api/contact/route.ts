import { NextResponse } from "next/server";

/**
 * Contact, project intake, and demo requests.
 * Delivery, in order of preference:
 *  1. RESEND_API_KEY (+ CONTACT_TO, default hello@aimebase.com): emails the message
 *  2. CONTACT_WEBHOOK_URL: POSTs the JSON payload (Zapier, Make, Slack, a CRM…)
 * With neither configured it answers 503 so the form never pretends to send.
 */

const MAX = { name: 120, email: 200, organization: 200, role: 120, teamSize: 60, problem: 5000, timeline: 60, interest: 20 };
type Field = keyof typeof MAX;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill every field.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(MAX) as Field[]) {
    data[key] = typeof body[key] === "string" ? (body[key] as string).trim().slice(0, MAX[key]) : "";
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const kind = { demo: "AImdoc demo request", project: "Custom project", other: "Message" }[data.interest] ?? "Message";
  const subject = `${kind}: ${data.name}${data.organization ? ` (${data.organization})` : ""}`;
  const text = (Object.keys(MAX) as Field[])
    .filter((k) => data[k])
    .map((k) => `${k}: ${data[k]}`)
    .join("\n");

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "AImbase website <website@aimebase.com>",
          to: [process.env.CONTACT_TO ?? "hello@aimebase.com"],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
      return NextResponse.json({ ok: true });
    }
    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...data, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
