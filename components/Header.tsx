import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/#features", label: "Information" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/#pricing", label: "Pricing" }
];

export function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-[var(--outline)]">
      <div className="container-shell flex items-center justify-between gap-6 py-4">
        <Logo className="h-12 w-auto sm:h-14" priority />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <AppStoreButton />
      </div>
    </header>
  );
}
