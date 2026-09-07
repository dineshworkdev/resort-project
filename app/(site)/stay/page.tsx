import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RoomCard from "@/components/RoomCard";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Stay & Residences — Deccan Resort",
  description:
    "Explore luxury rooms and private villas at Deccan Resort, set within the forested foothills of the Western Ghats near Coimbatore.",
};

const comparisonFeatures = [
  { feature: "View Orientation", estate: "Shola Forest & Gardens", villa: "Valley & Private Forest", suite: "Panoramic Valley Ridgeline" },
  { feature: "Floor Plan Size", estate: "420 sq. ft.", villa: "640 sq. ft.", suite: "1,150 sq. ft." },
  { feature: "Maximum Occupancy", estate: "2 Guests", villa: "3 Guests", suite: "4 Guests" },
  { feature: "Bed Configuration", estate: "1 King Bed", estateNote: "", villa: "1 King + Daybed", suite: "1 King + 1 Queen Bed" },
  { feature: "Private Outdoor Space", estate: "Private Sit-Out Veranda", villa: "Expansive Valley Balcony", suite: "Wrap-Around Pavilion Deck" },
  { feature: "Private Plunge Pool", estate: "Shared Infinity Pool", villa: "Shared Infinity Pool", suite: "Exclusive Heated Plunge Pool" },
  { feature: "Butler Service", estate: "On Request", villa: "Dedicated Villa Host", suite: "24/7 Private Butler" },
  { feature: "In-Room Fireplace", estate: "Included", villa: "Included", suite: "Double Fireplace (Living & Bedroom)" },
  { feature: "Complimentary Breakfast", estate: "Included", villa: "Included", suite: "In-Suite Gourmet Breakfast" },
];

export default function StayPage() {
  return (
    <>
      {/* Editorial Header Banner */}
      <section className="relative min-h-[480px] h-[58vh] w-full overflow-hidden mt-20 flex flex-col justify-end">
        <Image
          src={images.rooms.royalSuite}
          alt="Luxury living pavilion at Deccan Resort overlooking the Western Ghats"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
        
        <div className="relative container-content pb-16 z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 mb-4 bg-forest-deep/60 backdrop-blur-md px-3.5 py-1 border border-sand/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sand" />
            <p className="text-[10px] tracking-ultra uppercase text-sand-light font-medium">
              Accommodations &amp; Villas
            </p>
          </div>

          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.08] text-balance">
            Three distinct expressions of <span className="italic font-normal text-sand-light">solitude</span>
          </h1>
          <p className="mt-5 text-cream/85 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Every category is built around a different degree of privacy and scale, from a tranquil garden-facing room to an expansive royal suite with its own private plunge pool and dedicated butler.
          </p>
        </div>
      </section>

      {/* Direct Booking Privileges Bar */}
      <section className="bg-sand/15 border-b border-sand/30 py-5">
        <div className="container-content flex flex-wrap items-center justify-around gap-4 text-xs tracking-luxury uppercase text-forest font-medium">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
            </svg>
            Best Rate Guaranteed
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
            </svg>
            Daily Organic Breakfast Included
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
            </svg>
            Guided Shola Birdlife Walk
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
            </svg>
            Flexible 48-Hour Cancellation
          </span>
        </div>
      </section>

      {/* Main Residences Grid */}
      <section className="container-content py-24 md:py-32">
        <SectionHeading
          eyebrow="Our Residences"
          title="Designed around the landscape"
          description="Crafted with native Western Ghats stone, warm hand-planed timbers, and floor-to-ceiling glass that dissolves the boundary between indoors and the shola canopy."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Residence Comparison Matrix */}
      <section className="bg-mist/30 py-24 md:py-32 border-t border-b border-sand/25">
        <div className="container-content">
          <SectionHeading
            align="center"
            eyebrow="Residence Comparison"
            title="Choose your ideal sanctuary"
            description="Compare dimensions, bespoke inclusions, and features across each residence category."
          />

          <div className="mt-16 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b-2 border-sand/30 bg-cream">
                  <th className="p-4 sm:p-5 font-display text-sm uppercase tracking-wider text-sand-dark font-medium">
                    Features &amp; Inclusions
                  </th>
                  <th className="p-4 sm:p-5 font-display text-base text-forest">Estate Room</th>
                  <th className="p-4 sm:p-5 font-display text-base text-forest">Premium Wellness Villa</th>
                  <th className="p-4 sm:p-5 font-display text-base text-forest bg-sand/10">
                    Deccan Royal Suite
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/15 text-sm bg-cream/70">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? "bg-cream/40" : "bg-cream/80"}>
                    <td className="p-4 sm:p-5 font-medium text-charcoal">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-charcoal/70">{row.estate}</td>
                    <td className="p-4 sm:p-5 text-charcoal/70">{row.villa}</td>
                    <td className="p-4 sm:p-5 font-medium text-forest bg-sand/10">{row.suite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl"
            >
              <span>Reserve Your Residence</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Private Estate Buyout Note */}
      <section className="container-content py-20 text-center">
        <div className="max-w-2xl mx-auto border border-sand/30 p-8 sm:p-12 bg-cream shadow-luxury">
          <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
            Exclusive Gatherings
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-forest">
            Exclusive Full Property Buyout
          </h3>
          <p className="mt-4 text-sm text-charcoal/70 font-light leading-relaxed">
            For multi-generational family retreats, wellness intensives, or private executive gatherings, Deccan Resort offers complete property buyouts with customized culinary programs and dedicated staff.
          </p>
          <a
            href="mailto:reservations@deccanresort.in"
            className="mt-6 inline-block text-xs tracking-luxury uppercase text-sand-dark font-semibold hover:underline"
          >
            Inquire about property buyouts →
          </a>
        </div>
      </section>
    </>
  );
}
