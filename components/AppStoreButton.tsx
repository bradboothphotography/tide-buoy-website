import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

type Props = {
  className?: string;
  label?: string;
  variant?: "blue" | "white";
};

export function AppStoreButton({ className = "", label = "App Store", variant = "blue" }: Props) {
  const palette =
    variant === "white"
      ? "button-white hover:brightness-100"
      : "button-blue hover:brightness-110";
  const textColor = variant === "white" ? "var(--primary-deep)" : "#ffffff";

  return (
    <Link
      href={siteConfig.appStoreUrl}
      className={`cta-button inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold ${palette} ${className}`}
      style={{ color: textColor }}
    >
      {label}
    </Link>
  );
}
