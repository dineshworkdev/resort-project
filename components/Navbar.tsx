"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/stay", label: "Stay" },
  { href: "/experiences", label: "Experiences" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Determine if navbar is in dark mode (light text over hero image) or light mode (solid cream background)
  const isTransparentOverHero = isHomePage && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
        isTransparentOverHero
          ? "bg-gradient-to-b from-forest-deep/80 via-forest-deep/30 to-transparent py-2"
          : scrolled || open
          ? "bg-cream/95 backdrop-blur-md border-b border-sand/20 shadow-luxury py-0"
          : "bg-cream/95 backdrop-blur-md border-b border-sand/15 py-0"
      }`}
    >
      <div className="container-content flex items-center justify-between h-20">
        <Logo variant={isTransparentOverHero ? "light" : "dark"} />

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs tracking-luxury uppercase font-medium transition-colors duration-300 py-1 ${
                  isTransparentOverHero
                    ? isActive
                      ? "text-sand-light"
                      : "text-cream/85 hover:text-sand-light"
                    : isActive
                    ? "text-forest font-semibold"
                    : "text-charcoal/75 hover:text-forest"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full transition-all duration-300 ${
                      isTransparentOverHero ? "bg-sand-light" : "bg-forest"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/book"
            className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-luxury uppercase font-medium transition-all duration-300 ${
              isTransparentOverHero
                ? "bg-sand text-forest-deep hover:bg-sand-light shadow-md hover:shadow-lg"
                : "bg-forest text-cream hover:bg-forest-dark shadow-sm hover:shadow-md"
            }`}
          >
            <span>Book Your Stay</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity duration-200 ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-cream/98 backdrop-blur-xl border-t border-sand/20 z-40 overflow-y-auto flex flex-col justify-between py-8 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-1">
            <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium mb-3">Navigation</p>
            {links.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-3.5 border-b border-sand/15 text-lg font-display text-forest hover:text-sand-dark transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-body tracking-wider text-sand-dark">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-sand/20 flex flex-col gap-4">
            <div>
              <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium">Location</p>
              <p className="text-sm text-charcoal/80 mt-1">Foothills of the Western Ghats, Coimbatore</p>
              <p className="text-xs text-charcoal/60 mt-0.5">+91 422 400 1200</p>
            </div>

            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors mt-2"
            >
              <span>Check Availability</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
