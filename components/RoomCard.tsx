import Image from "next/image";
import Link from "next/link";
import { Room } from "@/lib/types";

export default function RoomCard({ room }: { room: Room }) {
  const isFlagship = room.id === "royal-suite";
  const isLimited = room.status === "Limited";

  return (
    <div className="group relative bg-cream border border-sand/25 hover:border-sand/60 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden flex flex-col h-full rounded-2xl">
      {/* Image Showcase with top rounded corners */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-forest-dark rounded-t-2xl">
        <Image
          src={room.image}
          alt={`${room.name} at Deccan Resort`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/15 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Top Status & Category Badges with rounded pills */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
          {isFlagship && (
            <span className="inline-flex items-center gap-1.5 bg-sand text-forest-deep text-[10px] tracking-luxury uppercase font-semibold px-3 py-1 shadow-sm border border-sand-light/50 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-deep" />
              Flagship Residence
            </span>
          )}
          {isLimited && (
            <span className="inline-flex items-center gap-1.5 bg-cream/95 backdrop-blur-md text-forest text-[10px] tracking-luxury uppercase font-semibold px-3 py-1 shadow-sm border border-sand/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sand-dark animate-pulse" />
              Limited Availability
            </span>
          )}
          {!isFlagship && !isLimited && (
            <span className="inline-flex items-center bg-forest-deep/80 backdrop-blur-md text-sand-light text-[10px] tracking-luxury uppercase font-medium px-3 py-1 border border-sand/30 rounded-full">
              Available
            </span>
          )}
        </div>

        {/* Floating Room Size Tag with rounded corners */}
        <div className="absolute bottom-3 right-3 bg-forest-deep/85 backdrop-blur-md text-cream text-[11px] font-medium px-3 py-1 tracking-wider border border-sand/25 z-10 rounded-md">
          {room.size}
        </div>
      </div>

      {/* Card Content with bottom rounded corners */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-cream rounded-b-2xl">
        <div>
          {/* Key Specs Pills */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-charcoal/65 mb-3">
            <span className="inline-flex items-center gap-1.5 font-medium bg-sand/10 px-2.5 py-0.5 rounded-full border border-sand/20">
              <svg className="w-3.5 h-3.5 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {room.occupancy} Guests
            </span>
            <span className="text-sand/40">•</span>
            <span className="font-light">{room.bedType}</span>
          </div>

          <h3 className="font-display text-2xl text-forest group-hover:text-sand-dark transition-colors duration-300">
            <Link href={`/stay/${room.slug}`} className="focus:outline-none">
              {room.name}
            </Link>
          </h3>
          <p className="mt-2.5 text-sm text-charcoal/70 leading-relaxed font-light line-clamp-2">
            {room.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-6 pt-5 border-t border-sand/20 flex items-end justify-between">
          <div>
            <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block">
              Starting from
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-display text-2xl sm:text-3xl text-forest font-semibold">
                ₹{room.pricePerNight.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-charcoal/55 font-body">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/stay/${room.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-forest/20 text-xs tracking-luxury uppercase text-forest font-medium hover:bg-forest hover:text-cream transition-all duration-300 group/btn rounded-lg shadow-sm"
              aria-label={`View details for ${room.name}`}
            >
              <span>Explore</span>
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
