import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";

export const runtime = "nodejs";

type SupportPayload = {
  name?: string;
  email?: string;
  topic?: string;
  appVersion?: string;
  device?: string;
  location?: string;
  message?: string;
  website?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json()) as SupportPayload;

  if (body.website) {
    return NextResponse.json({ message: "Thanks." });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const topic = body.topic?.trim() || siteConfig.supportTopics[0];
  const appVersion = body.appVersion?.trim() || "";
  const device = body.device?.trim() || "";
  const location = body.location?.trim() || "";
  const message = body.message?.trim() || "";

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Please complete the required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please use a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        message: "Support form is not configured yet. Add GOOGLE_APPS_SCRIPT_WEBHOOK_URL on the server to enable submissions."
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        site: siteConfig.name,
        name,
        email,
        topic,
        appVersion,
        device,
        location,
        message
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Support service is temporarily unavailable." }, { status: 502 });
    }

    return NextResponse.json({
      message: "Your support request has been sent. We will get back to you soon."
    });
  } catch {
    return NextResponse.json({ message: "Unable to reach the support service right now." }, { status: 502 });
  }
}
