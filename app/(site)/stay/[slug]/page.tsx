import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug, rooms } from "@/data/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const room = getRoomBySlug(params.slug);
  if (!room) return {};
  return {
    title: `${room.name} — Deccan Resort`,
    description: room.description,
  };
}

export default function RoomDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  return (
    <>
      {/* Cinematic Room Banner */}
      <section className="relative min-h-[520px] h-[65vh] w-full overflow-hidden mt-20 flex flex-col justify-end">
        <Image
          src={room.image}
          alt={room.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/20" />
        
        <div className="relative container-content pb-16 z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-4 bg-forest-deep/70 backdrop-blur-md px-3.5 py-1.5 border border-sand/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-sand" />
            <p className="text-[10px] tracking-ultra uppercase text-sand-light font-medium">
              {room.tagline}
            </p>
          </div>

          <h1 className="font-display text-cream text-4xl sm:text-6xl md:text-7xl max-w-3xl leading-[1.06] text-balance">
            {room.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs tracking-luxury uppercase text-sand-light">
            <span className="flex items-center gap-1.5 bg-forest-deep/60 px-3 py-1 rounded-full border border-sand/25">
              <svg className="w-4 h-4 text-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {room.occupancy} Guests
            </span>
            <span className="bg-forest-deep/60 px-3 py-1 rounded-full border border-sand/25">{room.bedType}</span>
            <span className="bg-forest-deep/60 px-3 py-1 rounded-full border border-sand/25">{room.size}</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Reservation Box */}
      <section className="container-content py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Narrative & Photography */}
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
              The Experience
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-forest tracking-tight">
              Crafted for unhurried living
            </h2>

            <p className="mt-6 text-charcoal/80 leading-relaxed text-lg sm:text-xl font-light">
              {room.longDescription}
            </p>

            {/* Architectural Specifications Row with rounded-2xl */}
            <div className="mt-12 grid grid-cols-3 gap-6 border border-sand/20 py-8 bg-mist/25 px-6 rounded-2xl shadow-sm">
              <div>
                <p className="text-[11px] tracking-wider uppercase text-sand-dark font-medium">Occupancy</p>
                <p className="mt-2 font-display text-xl sm:text-2xl text-forest">
                  {room.occupancy} Guests
                </p>
                <p className="text-xs text-charcoal/50 mt-0.5">Children welcome</p>
              </div>
              <div>
                <p className="text-[11px] tracking-wider uppercase text-sand-dark font-medium">Bed Arrangement</p>
                <p className="mt-2 font-display text-xl sm:text-2xl text-forest">
                  {room.bedType}
                </p>
                <p className="text-xs text-charcoal/50 mt-0.5">Organic cotton linens</p>
              </div>
              <div>
                <p className="text-[11px] tracking-wider uppercase text-sand-dark font-medium">Total Area</p>
                <p className="mt-2 font-display text-xl sm:text-2xl text-forest">
                  {room.size}
                </p>
                <p className="text-xs text-charcoal/50 mt-0.5">Indoor &amp; Veranda</p>
              </div>
            </div>

            {/* In-Room Amenities Checklist */}
            <div className="mt-16">
              <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                Thoughtful Inclusions
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-forest mb-8">
                In-residence appointments
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {room.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="text-sm text-charcoal/80 flex items-center gap-3 py-2 border-b border-sand/15"
                  >
                    <span className="w-5 h-5 rounded-full bg-sand/20 text-sand-dark flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-light">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Room Photography Showcase with rounded-xl */}
            <div className="mt-20">
              <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                Visual Perspectives
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-forest mb-8">
                Residence gallery
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {room.gallery.map((src, index) => (
                  <div
                    key={src}
                    className="group relative aspect-[4/5] overflow-hidden bg-forest-dark border border-sand/20 shadow-luxury rounded-xl"
                  >
                    <Image
                      src={src}
                      alt={`${room.name} perspective ${index + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105 rounded-xl"
                    />
                    <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-colors rounded-xl" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-sand/20 flex items-center justify-between">
              <Link
                href="/stay"
                className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors"
              >
                ← Back to All Residences
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-sand-dark font-semibold hover:underline"
              >
                Check All Dates →
              </Link>
            </div>
          </div>

          {/* Right: Sticky Reservation Box with rounded-2xl */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="glass-card p-8 border border-sand/30 shadow-luxury-float rounded-2xl">
              <div className="flex items-center justify-between pb-5 border-b border-sand/20">
                <div>
                  <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block">
                    Starting Rate
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display text-3xl text-forest">
                      ₹{room.pricePerNight.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-charcoal/50 font-body">/ night</span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-sand/20 text-sand-dark text-xs tracking-wide uppercase font-medium rounded-full">
                  {room.status}
                </span>
              </div>

              {/* Direct Booking Inclusions */}
              <div className="py-5 border-b border-sand/20 space-y-2.5 text-xs text-charcoal/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Complimentary estate breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Welcome botanical tonic upon arrival</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Guided morning shola nature walk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Complimentary high-speed Wi-Fi</span>
                </div>
              </div>

              {/* Action Button with rounded-lg */}
              <div className="pt-6">
                <Link
                  href={`/book?room=${room.id}`}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl group rounded-lg"
                >
                  <span>Reserve This Residence</span>
                  <svg
                    className="w-4 h-4 text-sand-light transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <p className="mt-4 text-center text-[11px] text-charcoal/50">
                  Best Rate Guaranteed • Direct Booking Privileges
                </p>
              </div>

              {/* Concierge Hotline */}
              <div className="mt-6 pt-5 border-t border-sand/20 text-center">
                <p className="text-[11px] text-charcoal/60">Prefer to speak with our reservations team?</p>
                <a
                  href="tel:+914224001200"
                  className="mt-1 font-display text-sm text-forest hover:text-sand-dark transition-colors inline-block"
                >
                  +91 422 400 1200
                </a>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
}
