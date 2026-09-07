"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "/owner", label: "Dashboard" },
  { href: "/owner/bookings", label: "Bookings" },
  { href: "/owner/guests", label: "Guests" },
  { href: "/owner/rooms", label: "Rooms" },
  { href: "/owner/settings", label: "Settings" },
];

export default function OwnerTopbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-0 z-40 bg-cream border-b border-charcoal/10">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-forest border-b border-forest pb-0.5"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col px-5 pb-5 gap-1">
          {links.map((link) => {
            const active =
              link.href === "/owner"
                ? pathname === "/owner"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 text-sm ${
                  active ? "bg-forest text-cream" : "text-charcoal/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
