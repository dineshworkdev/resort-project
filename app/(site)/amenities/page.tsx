import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Amenities & Grounds — Deccan Resort",
  description:
    "Explore the heated infinity pool, Ayurvedic spa, fine dining terrace, yoga pavilion, and forest trails at Deccan Resort, Coimbatore.",
};

const amenitiesList = [
  {
    category: "Recreation & Solitude",
    items: [
      {
        title: "Heated Infinity Valley Pool",
        subtitle: "Panoramic Mountain Vistas",
        description:
          "Perched at the property's prime vantage point, our heated infinity pool is carved into natural granite and positioned to hold an uninterrupted view down the Western Ghats valley through sunset.",
        hours: "7:00 AM – 8:00 PM Daily",
        privilege: "Poolside towels, botanical tonics, and sunbed service included.",
        image: images.amenities.pool,
      },
      {
        title: "Poolside Lounge & Veranda",
        subtitle: "Shaded Outdoor Relaxation",
        description:
          "Deep teak daybeds, handwoven shade canopies, and stone pool decking provide the perfect retreat for slow afternoons with mountain books and chilled botanical infusions.",
        hours: "All-Day Guest Access",
        privilege: "Complimentary seasonal refreshments served each afternoon.",
        image: images.amenities.poolsideLounge,
      },
    ],
  },
  {
    category: "Wellness & Restoration",
    items: [
      {
        title: "The Spa Sanctuary",
        subtitle: "Ancient Ayurvedic Therapies",
        description:
          "A quiet, low-lit sanctuary with treatment suites opening onto secluded herbal gardens. Therapies use cold-pressed sesame, neem, and mountain botanical oils formulated exclusively for Deccan Resort.",
        hours: "9:00 AM – 7:30 PM (Prior Booking Recommended)",
        privilege: "Priority scheduling reserved for Deccan Royal Suite guests.",
        image: images.amenities.spa,
      },
      {
        title: "Yoga & Meditation Pavilion",
        subtitle: "Canopy-Level Deck",
        description:
          "An elevated teakwood pavilion nestled beneath ancient shola trees, dedicated to morning pranayama, mindful meditation, and sunset singing bowl recovery sessions.",
        hours: "Morning Session: 7:00 AM • Evening Sunset: 5:30 PM",
        privilege: "Organic mats, herbal waters, and private instructors available.",
        image: images.amenities.yoga,
      },
    ],
  },
  {
    category: "Culinary & Evening",
    items: [
      {
        title: "Fine Dining Terrace",
        subtitle: "Farm-to-Table Gastronomy",
        description:
          "A culinary kitchen shaped strictly around produce harvested from our on-site organic gardens and surrounding foothill farms. Served across an open mountain terrace and a fireside private dining room.",
        hours: "Breakfast: 7:30–10:30 AM • Lunch: 12:30–3:00 PM • Dinner: 7:30–10:30 PM",
        privilege: "Bespoke in-villa dining service available for all residences.",
        image: images.amenities.dining,
      },
      {
        title: "Stone Firepit & Night Lounge",
        subtitle: "Stargazing & Storytelling",
        description:
          "As the cool mountain mist descends at dusk, gather around our circular stone firepit for hot spiced mountain tea, roasted treats, and quiet conversations under pristine unpolluted night skies.",
        hours: "Nightly from 6:30 PM until late",
        privilege: "Warm wool shawls and fireside hot beverage service provided.",
        image: images.amenities.firepit,
      },
    ],
  },
  {
    category: "Grounds & Nature",
    items: [
      {
        title: "Organic Kitchen Gardens",
        subtitle: "Heirloom Vegetables & Shola Flora",
        description:
          "Terraced gardens providing herbs, medicinal greens, and seasonal vegetables directly to the resort kitchen. Guests are warmly invited to walk through, harvest with our gardeners, and learn about regional mountain permaculture.",
        hours: "Open at all hours for peaceful walks",
        privilege: "Guided morning garden tours led by our head gardener upon request.",
        image: images.amenities.gardens,
      },
      {
        title: "Protected Shola Forest Trails",
        subtitle: "Private Walking Network",
        description:
          "Marked paths meandering through thirty acres of undisturbed biodiversity. Suitable for gentle independent afternoon strolls or guided morning birdwatching walks with our resident naturalist.",
        hours: "Daylight Hours (6:00 AM – 6:00 PM)",
        privilege: "Walking sticks, binoculars, and field identification guides provided.",
        image: images.amenities.trails,
      },
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Editorial Header Banner */}
      <section className="relative min-h-[480px] h-[58vh] w-full overflow-hidden mt-20 flex flex-col justify-end">
        <Image
          src={images.amenities.pool}
          alt="Infinity pool overlooking the valley at Deccan Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
        
        <div className="relative container-content pb-16 z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 mb-4 bg-forest-deep/70 backdrop-blur-md px-3.5 py-1.5 border border-sand/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-sand" />
            <p className="text-[10px] tracking-ultra uppercase text-sand-light font-medium">
              Property Appointments
            </p>
          </div>

          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.08] text-balance">
            Curated comforts across thirty <span className="italic font-normal text-sand-light">forested acres</span>
          </h1>
          <p className="mt-5 text-cream/85 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Every amenity on the estate is shared exclusively among our three residence categories, ensuring intimacy, quiet spaces, and uncrowded restoration.
          </p>
        </div>
      </section>

      {/* Categorized Amenities Content */}
      <section className="container-content py-24 md:py-32">
        <div className="space-y-28">
          {amenitiesList.map((section) => (
            <div key={section.category}>
              
              {/* Category Subtitle */}
              <div className="flex items-center gap-4 mb-12">
                <span className="w-8 h-px bg-sand-dark" />
                <h2 className="text-xs tracking-ultra uppercase text-sand-dark font-semibold">
                  {section.category}
                </h2>
                <span className="flex-1 h-px bg-sand/20" />
              </div>

              {/* 2-Column Luxury Cards with rounded-2xl */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="group bg-cream border border-sand/25 hover:border-sand/55 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden flex flex-col rounded-2xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-forest-dark rounded-t-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105 rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity rounded-t-2xl" />
                    </div>

                    <div className="p-8 flex flex-col flex-1 justify-between rounded-b-2xl">
                      <div>
                        <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-1">
                          {item.subtitle}
                        </span>
                        <h3 className="font-display text-2xl text-forest group-hover:text-sand-dark transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm text-charcoal/75 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-sand/20 space-y-2 text-xs">
                        <div className="flex items-start gap-2 text-charcoal/70">
                          <span className="font-medium text-forest shrink-0">Hours:</span>
                          <span>{item.hours}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sand-dark">
                          <span className="font-medium shrink-0">Privilege:</span>
                          <span>{item.privilege}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Book Experience CTA with rounded-2xl */}
      <section className="container-content py-16 mb-24">
        <div className="bg-mist/40 p-10 sm:p-14 rounded-2xl border border-sand/30 shadow-luxury-md text-center max-w-3xl mx-auto">
          <SectionHeading
            align="center"
            eyebrow="Direct Reservations"
            title="Experience the full grounds during your stay"
            description="All amenities are included with residence bookings, with priority spa and private dining reservations coordinated prior to check-in."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl rounded-lg"
            >
              <span>Check Availability</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 px-9 py-4 border border-sand/60 text-forest text-xs tracking-luxury uppercase font-medium hover:bg-sand/10 transition-colors rounded-lg"
            >
              <span>View Residences</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
