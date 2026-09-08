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
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when mobile menu is open
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

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* ── Single header: always solid cream, no blur, no transparency ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7] border-b border-[#C8A27B]/20 shadow-luxury"
        style={{ height: "80px" }}
      >
        <div className="container-content flex items-center justify-between h-full">

          {/* Logo — rendered once, always */}
          <Logo variant="wordmark" theme="dark" priority />

          {/* Desktop nav links — hidden below lg */}
          <nav
            className="hidden lg:flex items-center gap-8 xl:gap-10"
            aria-label="Main navigation"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-xs tracking-luxury uppercase font-medium py-1.5 transition-colors duration-200 ${
                    isActive
                      ? "text-forest font-semibold"
                      : "text-charcoal/65 hover:text-forest"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-px bg-forest transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA — hidden below lg */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors duration-200 border border-forest hover:border-forest-dark shadow-sm rounded-lg"
            >
              <span>Book Your Stay</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger — hidden at lg and above */}
          <button
            ref={toggleRef}
            id="mobile-menu-toggle"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AD8560] rounded-lg"
          >
            <span
              className={`block h-px w-6 bg-forest transition-all duration-300 origin-center ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px bg-forest transition-all duration-200 origin-center ${
                open ? "w-0 opacity-0" : "w-6 opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-forest transition-all duration-300 origin-center ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>

        </div>
      </header>

      {/*
        ── Mobile overlay + drawer are SIBLINGS of <header>, not children ──
        This removes them from the header stacking context entirely, preventing
        any visual interference with the header itself.
      */}

      {/* Backdrop: CSS-controlled opacity, always mounted, no flicker */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 bg-charcoal/25 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "80px" }}
      />

      {/* Drawer: CSS transform slide, always mounted, never duplicated */}
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className={`lg:hidden fixed inset-x-0 bottom-0 bg-[#FDFBF7] z-50 overflow-y-auto
          flex flex-col border-t border-[#C8A27B]/20
          transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "80px",
          // hide from accessibility tree and prevent tab-focus when off-screen
          visibility: open ? "visible" : "hidden",
        }}
      >
        {/* Drawer header: logo + X button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8A27B]/15">
          <Logo variant="wordmark" theme="dark" />
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-charcoal/50 hover:text-forest hover:bg-mist transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#AD8560] outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 px-6 py-6"
        >
          <p className="text-[10px] tracking-ultra uppercase text-[#AD8560] font-medium mb-4">
            Sanctuary Navigation
          </p>
          <div className="flex flex-col">
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-baseline justify-between py-4 border-b border-[#C8A27B]/15 font-display text-xl transition-colors duration-150 ${
                    isActive
                      ? "text-[#AD8560]"
                      : "text-forest hover:text-[#AD8560]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-body tracking-wider text-[#AD8560]/60">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="px-6 pb-10 pt-4 border-t border-[#C8A27B]/15 flex flex-col gap-4">
          <div className="p-4 bg-mist rounded-lg border border-[#C8A27B]/20">
            <p className="text-[10px] tracking-ultra uppercase text-[#AD8560] font-medium">
              Location
            </p>
            <p className="text-sm text-charcoal/70 mt-1.5 leading-relaxed">
              Foothills of the Western Ghats, Coimbatore
            </p>
            <a
              href="tel:+914224001200"
              className="text-xs text-charcoal/50 hover:text-forest transition-colors duration-150 mt-1 inline-block"
            >
              +91 422 400 1200
            </a>
          </div>

          <Link
            href="/book"
            onClick={closeMenu}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors duration-150 shadow-sm rounded-lg"
          >
            <span>Check Availability</span>
            <svg
              className="w-4 h-4 text-[#E2CBAE]"
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
    </>
  );
}
