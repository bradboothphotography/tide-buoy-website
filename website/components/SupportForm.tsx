"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";

type FormState = {
  name: string;
  email: string;
  topic: string;
  appVersion: string;
  device: string;
  location: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  topic: siteConfig.supportTopics[0],
  appVersion: "",
  device: "",
  location: "",
  message: "",
  website: ""
};

export function SupportForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your support request right now.");
      }

      setStatus("success");
      setMessage(data.message || "Support request sent.");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your support request right now.");
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Name</span>
          <input
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Email</span>
          <input
            required
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Topic</span>
          <select
            value={formState.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          >
            {siteConfig.supportTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">App Version</span>
          <input
            value={formState.appVersion}
            onChange={(event) => updateField("appVersion", event.target.value)}
            placeholder="Optional"
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Device</span>
          <input
            value={formState.device}
            onChange={(event) => updateField("device", event.target.value)}
            placeholder="iPhone model or iOS version"
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Location</span>
          <input
            value={formState.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="Beach, inlet, or town"
            className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-[var(--ink)]">What can we help with?</span>
        <textarea
          required
          rows={6}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="w-full rounded-2xl border border-[var(--outline)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--primary)]"
        />
      </label>

      <label className="hidden">
        <span>Website</span>
        <input
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="button-blue inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending..." : "Send Support Request"}
        </button>
        <p className="text-sm text-[var(--muted)]">{siteConfig.supportResponseTime}</p>
      </div>

      {message ? (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-[var(--primary-deep)]"}`}>{message}</p>
      ) : null}
    </form>
  );
}
