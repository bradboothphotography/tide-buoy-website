import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--outline)] bg-[var(--surface-soft)] py-16">
      <div className="container-shell grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <Logo className="h-12 w-auto" />
          <p className="max-w-xs text-sm leading-7 text-[var(--muted)]">
            Professional-grade marine data with the approachable warmth of coastal life. Built for the coast.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">App</h3>
            <Link href="/app" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">App</Link>
            <Link href="/features" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Features</Link>
            <Link href="/tides" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Tide Guides</Link>
            <Link href="/blog" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Coastal Journal</Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Legal</h3>
            <Link href="/privacy" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Privacy</Link>
            <Link href="/terms" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Terms</Link>
            <Link href="/contact" className="block text-sm text-[var(--muted)] hover:text-[var(--primary)]">Contact</Link>
          </div>
        </div>
        <div className="space-y-4 md:text-right">
          <p className="text-sm leading-7 text-[var(--muted)]">
            Tide Buoy was built for surfers, anglers, boaters, photographers, and anyone who wants the water to be easier to read.
          </p>
          <p className="text-sm text-[var(--muted)]">© 2026 Tide Buoy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
