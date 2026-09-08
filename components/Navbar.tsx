"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close if route changes (navigation happened)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
  }

  const isTransparentOverHero = isHomePage && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
        isTransparentOverHero
          ? "bg-gradient-to-b from-forest-deep/85 via-forest-deep/35 to-transparent py-2 sm:py-3"
          : scrolled || open
          ? "bg-cream/96 backdrop-blur-md border-b border-sand/20 shadow-luxury py-0"
          : "bg-cream/96 backdrop-blur-md border-b border-sand/15 py-0"
      }`}
    >
      <div className="container-content flex items-center justify-between h-20">
        {/* Logo */}
        <Logo
          variant="wordmark"
          theme={isTransparentOverHero ? "light" : "dark"}
          priority
        />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main navigation">
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
                    : "text-charcoal/70 hover:text-forest"
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-300 ${
                    isActive
                      ? isTransparentOverHero
                        ? "bg-sand-light opacity-100"
                        : "bg-forest opacity-100"
                      : "bg-sand-dark opacity-0 group-hover:opacity-50"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/book"
            className={`group inline-flex items-center gap-2.5 px-6 py-2.5 text-xs tracking-luxury uppercase font-medium transition-all duration-300 border rounded-lg ${
              isTransparentOverHero
                ? "bg-sand text-forest-deep border-sand hover:bg-sand-light hover:border-sand-light shadow-md"
                : "bg-forest text-cream border-forest hover:bg-forest-dark hover:border-forest-dark shadow-sm hover:shadow-md"
            }`}
          >
            <span>Book Your Stay</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={toggleRef}
          id="mobile-menu-toggle"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu-drawer"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded-lg"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 transition-all duration-200 ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "w-0 opacity-0" : "w-6 opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${
              isTransparentOverHero && !open ? "bg-cream" : "bg-forest"
            } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-20 bg-forest-deep/20 backdrop-blur-sm z-30"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu-drawer"
        ref={menuRef}
        aria-hidden={!open}
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-cream z-40 overflow-y-auto flex flex-col justify-between py-8 px-6 border-t border-sand/20 transition-transform duration-400 ease-elegant ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        <div>
          {/* Drawer Header */}
          <div className="mb-6 pb-4 border-b border-sand/15 flex items-center justify-between">
            <Logo variant="wordmark" theme="dark" />
            <button
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-charcoal/50 hover:text-forest hover:bg-sand/15 transition-colors focus-visible:ring-2 focus-visible:ring-sand outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav aria-label="Mobile navigation" className="flex flex-col">
            <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium mb-3">
              Sanctuary Navigation
            </p>
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-baseline justify-between py-4 border-b border-sand/15 font-display text-lg transition-colors ${
                    isActive ? "text-sand-dark" : "text-forest hover:text-sand-dark"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-body tracking-wider text-sand-dark/70">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="mt-8 pt-6 border-t border-sand/15 flex flex-col gap-4">
          <div className="p-4 bg-sand/8 rounded-lg border border-sand/20">
            <p className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium">
              Sanctuary Location
            </p>
            <p className="text-sm text-charcoal/75 mt-1.5">
              Foothills of the Western Ghats, Coimbatore
            </p>
            <a href="tel:+914224001200" className="text-xs text-charcoal/55 hover:text-forest transition-colors mt-0.5 inline-block">
              +91 422 400 1200
            </a>
          </div>

          <Link
            href="/book"
            onClick={closeMenu}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors shadow-sm rounded-lg"
          >
            <span>Check Availability</span>
            <svg
              className="w-4 h-4 text-sand-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
