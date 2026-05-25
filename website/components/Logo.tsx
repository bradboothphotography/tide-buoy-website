import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-11 w-auto", priority = false }: Props) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Tide Buoy home">
      <Image
        src="/images/brand/tide-buoy-logo-blue.png"
        alt="Tide Buoy"
        width={1024}
        height={512}
        priority={priority}
        className={className}
      />
    </Link>
  );
}
