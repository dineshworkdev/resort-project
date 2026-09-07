"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-cream border-t border-sand/20">
      {/* Top Newsletter / Invitation Bar */}
      <div className="border-b border-cream/10">
        <div className="container-content py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-md">
            <span className="text-[10px] tracking-ultra uppercase text-sand-light font-medium block mb-2">
              Stay Connected
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-cream">
              Receive private invitations &amp; seasonal dispatches
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Deccan Resort updates.");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md w-full"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="px-4 py-3.5 bg-forest-dark/70 border border-sand/30 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-sand flex-1"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-sand text-forest-deep text-xs tracking-luxury uppercase font-medium hover:bg-sand-light transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-content py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70 font-light">
              A private luxury nature sanctuary perched within the forested foothills of the Western Ghats, 
              crafted around slow living, Ayurvedic restoration, and undisturbed wilderness.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 text-xs text-sand-light/80">
              <span>Coimbatore, Tamil Nadu</span>
              <span>•</span>
              <span>Elev. 1,200m</span>
              <span>•</span>
              <span>Shola Buffer Zone</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-xs tracking-ultra uppercase text-sand-light font-medium mb-5">The Resort</p>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/stay" className="text-cream/75 hover:text-sand-light transition-colors">
                  Rooms &amp; Villas
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-cream/75 hover:text-sand-light transition-colors">
                  Guided Experiences
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="text-cream/75 hover:text-sand-light transition-colors">
                  Property Amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream/75 hover:text-sand-light transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/75 hover:text-sand-light transition-colors">
                  Our Sanctuary Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Room Categories */}
          <div>
            <p className="text-xs tracking-ultra uppercase text-sand-light font-medium mb-5">Villas &amp; Suites</p>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/stay/estate-room" className="text-cream/75 hover:text-sand-light transition-colors">
                  Estate Room
                </Link>
              </li>
              <li>
                <Link href="/stay/premium-wellness-villa" className="text-cream/75 hover:text-sand-light transition-colors">
                  Premium Wellness Villa
                </Link>
              </li>
              <li>
                <Link href="/stay/deccan-royal-suite" className="text-cream/75 hover:text-sand-light transition-colors">
                  Deccan Royal Suite
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sand-light font-medium hover:underline transition-colors mt-2 inline-block">
                  Reserve a Stay →
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Visit */}
          <div>
            <p className="text-xs tracking-ultra uppercase text-sand-light font-medium mb-5">Concierge</p>
            <ul className="space-y-3.5 text-sm text-cream/75 font-light">
              <li className="leading-relaxed">
                Western Ghats Foothills, Coimbatore, Tamil Nadu 641001
              </li>
              <li>
                <a href="tel:+914224001200" className="hover:text-sand-light transition-colors">
                  +91 422 400 1200
                </a>
              </li>
              <li>
                <a href="mailto:reservations@deccanresort.in" className="hover:text-sand-light transition-colors">
                  reservations@deccanresort.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} Deccan Resort. Western Ghats Nature Sanctuary. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/owner"
              className="hover:text-sand-light transition-colors underline underline-offset-4"
            >
              Owner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
