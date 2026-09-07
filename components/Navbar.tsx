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
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Determine if navbar is in transparent mode over hero image (homepage only, top of page, closed menu)
  const isTransparentOverHero = isHomePage && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
        isTransparentOverHero
          ? "bg-gradient-to-b from-forest-deep/85 via-forest-deep/35 to-transparent py-2 sm:py-3"
          : scrolled || open
          ? "bg-cream/95 backdrop-blur-md border-b border-sand/20 shadow-luxury py-0"
          : "bg-cream/95 backdrop-blur-md border-b border-sand/15 py-0"
      }`}
    >
      <div className="container-content flex items-center justify-between h-20">
        {/* Header Wordmark: DR monogram + DECCAN RESORT hotel wordmark */}
        <Logo
          variant="wordmark"
          theme={isTransparentOverHero ? "light" : "dark"}
          priority
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs tracking-luxury uppercase font-medium transition-colors duration-300 py-1.5 ${
                  isTransparentOverHero
                    ? isActive
                      ? "text-sand-light font-semibold"
                      : "text-cream/90 hover:text-sand-light"
                    : isActive
                    ? "text-forest font-semibold"
                    : "text-charcoal/75 hover:text-forest"
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full transition-all duration-300 ${
                    isActive
                      ? isTransparentOverHero
                        ? "bg-sand-light opacity-100"
                        : "bg-forest opacity-100"
                      : "bg-sand-dark opacity-0 group-hover:opacity-60 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button with refined rounded corners */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/book"
            className={`group inline-flex items-center gap-2.5 px-6 py-2.5 text-xs tracking-luxury uppercase font-medium transition-all duration-300 border rounded-lg ${
              isTransparentOverHero
                ? "bg-sand text-forest-deep border-sand hover:bg-sand-light hover:border-sand-light shadow-md hover:shadow-lg"
                : "bg-forest text-cream border-forest hover:bg-forest-dark hover:border-forest-dark shadow-sm hover:shadow-md"
            }`}
          >
            <span>Book Your Stay</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle button with rounded corners */}
        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none rounded-lg"
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
          <div>
            <div className="mb-6 pb-4 border-b border-sand/15">
              <Logo variant="wordmark" theme="dark" />
            </div>

            <nav className="flex flex-col space-y-1">
              <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium mb-2">
                Sanctuary Navigation
              </p>
              {links.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3.5 border-b border-sand/15 text-lg font-display text-forest hover:text-sand-dark transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-body tracking-wider text-sand-dark">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-sand/20 flex flex-col gap-4">
            <div className="p-4 bg-sand/10 rounded-xl border border-sand/20">
              <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium">
                Sanctuary Location
              </p>
              <p className="text-sm text-charcoal/80 mt-1">
                Foothills of the Western Ghats, Coimbatore
              </p>
              <p className="text-xs text-charcoal/60 mt-0.5">+91 422 400 1200</p>
            </div>

            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors shadow-md rounded-lg"
            >
              <span>Check Availability</span>
              <svg
                className="w-4 h-4 text-sand-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
