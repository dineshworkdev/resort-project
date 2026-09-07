"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const links = [
  { href: "/owner", label: "Dashboard" },
  { href: "/owner/bookings", label: "Bookings" },
  { href: "/owner/guests", label: "Guests" },
  { href: "/owner/rooms", label: "Rooms" },
  { href: "/owner/settings", label: "Settings" },
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-charcoal/10 bg-cream min-h-screen sticky top-0">
      <div className="px-8 py-8 border-b border-charcoal/10">
        <Logo />
        <p className="mt-3 text-xs text-charcoal/50">Resort management</p>
      </div>
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {links.map((link) => {
          const active =
            link.href === "/owner"
              ? pathname === "/owner"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2.5 text-sm transition-colors duration-200 ${
                active
                  ? "bg-forest text-cream"
                  : "text-charcoal/70 hover:bg-mist"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-8 py-6 border-t border-charcoal/10">
        <Link href="/" className="text-xs text-charcoal/50 hover:text-charcoal">
          Return to resort website
        </Link>
      </div>
    </aside>
  );
}
