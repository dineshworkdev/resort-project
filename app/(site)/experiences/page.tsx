import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Experiences & Wellness — Deccan Resort",
  description:
    "Guided shola forest trails, private tea estate mornings, Ayurvedic rituals, and sunset valley dining at Deccan Resort, Coimbatore.",
};

const experiences = [
  {
    title: "Guided Shola Forest Trails",
    subtitle: "Biodiversity & Naturalist Walks",
    description:
      "A resident naturalist leads small private groups through the ancient shola forest bordering the property, timed around the region's resident hornbills, Malabar whistling thrushes, and morning mist. Trails are graded by distance and elevation, and can be tailored for gentle botanical walks or challenging ridgeline hikes.",
    duration: "2–3 Hours",
    timing: "Early Morning (6:30 AM) or Late Afternoon (4:00 PM)",
    highlights: ["Resident wildlife naturalist", "Botanical identification", "Endemic birdwatching", "Light morning refreshments"],
    image: images.experiences.forestTrail,
  },
  {
    title: "Tea Estate Mornings",
    subtitle: "Historic Plantation Heritage",
    description:
      "A scenic private drive takes guests into the working heritage tea estates nestled along the Western Ghats foothills. The visit includes an intimate walk through emerald plantation terraces, conversations with master estate pickers, and a curated flight of single-origin estate teas served back on the resort terrace.",
    duration: "Half Day (4 Hours)",
    timing: "Morning (8:30 AM – 12:30 PM)",
    highlights: ["Scenic 4x4 private transport", "Plantation walk & history", "Single-origin tea tasting", "Terrace refreshments"],
    image: images.experiences.teaEstate,
  },
  {
    title: "Ayurvedic & Sound Rituals",
    subtitle: "Restoration & Mindful Recovery",
    description:
      "Therapies drawn from ancient regional Ayurvedic traditions are performed in an open-air teakwood pavilion overlooking the forest valley. Treatments are custom-formulated using botanicals grown in the resort's gardens and chosen in consultation with our resident Ayurvedic practitioner.",
    duration: "60–90 Minutes",
    timing: "Available Daily by Prior Reservation",
    highlights: ["Individual Ayurvedic consultation", "Cold-pressed regional oils", "Open-air forest view pavilion", "Post-treatment herbal infusion"],
    image: images.experiences.wellnessRitual,
  },
  {
    title: "Valley Dining & Sunset Campfire",
    subtitle: "Gastronomy & Evening Gathering",
    description:
      "As dusk descends over the Western Ghats ridgeline, enjoy an intimate private dinner on our stone terrace edge, followed by storytelling and hot spiced tea around the open stone campfire under a canopy of unpolluted mountain stars.",
    duration: "Evening (3 Hours)",
    timing: "Evenings from 6:30 PM",
    highlights: ["Organic estate produce menu", "Private terrace table setting", "Artisanal firepit seating", "Stargazing in clear mountain air"],
    image: images.experiences.valleyDining,
  },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* Editorial Header Banner */}
      <section className="relative min-h-[480px] h-[58vh] w-full overflow-hidden mt-20 flex flex-col justify-end">
        <Image
          src={images.experiences.forestTrail}
          alt="Ancient forest canopy trail near Deccan Resort"
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
              Curated Immersion
            </p>
          </div>

          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.08] text-balance">
            Shaped by the seasons and <span className="italic font-normal text-sand-light">the land</span>
          </h1>
          <p className="mt-5 text-cream/85 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Each experience is arranged exclusively for our guests and shaped around the mountain weather, resident wildlife, and personal rhythm.
          </p>
        </div>
      </section>

      {/* Main Experiences List */}
      <section className="container-content py-24 md:py-32">
        <SectionHeading
          eyebrow="Our Curated Journeys"
          title="Authentic encounters with the Western Ghats"
          description="We avoid scripted tourist routines in favour of genuine natural encounters, deep physical restoration, and culinary intimacy."
        />

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Photography Showcase with rounded-2xl */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden shadow-luxury-lg border border-sand/30 rounded-2xl">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-elegant hover:scale-105 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent rounded-2xl" />
                </div>

                <div className="absolute top-4 left-4 bg-forest-deep/85 backdrop-blur-md text-sand-light text-[11px] font-medium px-3.5 py-1.5 border border-sand/30 tracking-wider rounded-full">
                  {exp.duration}
                </div>
              </div>

              {/* Editorial Description */}
              <div className="lg:col-span-6">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  {exp.subtitle}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-forest tracking-tight">
                  {exp.title}
                </h2>
                <p className="mt-4 text-xs text-charcoal/60 font-medium">
                  Timing: {exp.timing}
                </p>

                <p className="mt-5 text-charcoal/80 leading-relaxed text-base sm:text-lg font-light">
                  {exp.description}
                </p>

                {/* Inclusions Highlights */}
                <div className="mt-8 pt-6 border-t border-sand/20">
                  <p className="text-[11px] tracking-wider uppercase text-sand-dark font-medium mb-3">
                    Experience Highlights
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-charcoal/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-sand-dark shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm hover:shadow-md rounded-lg"
                  >
                    <span>Reserve With Your Stay</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bespoke Private Concierge Banner with rounded-2xl */}
      <section className="container-content py-16 mb-24">
        <div className="bg-forest-deep text-cream py-16 px-8 sm:px-14 rounded-2xl border border-sand/30 text-center max-w-4xl mx-auto shadow-luxury-lg">
          <span className="text-[10px] tracking-ultra uppercase text-sand-light font-medium block mb-3">
            Bespoke Planning
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream tracking-tight">
            Design a custom itinerary with our naturalist
          </h2>
          <p className="mt-5 text-cream/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Whether you are planning birding photography, meditation retreats, or celebratory anniversary dinners overlooking the Western Ghats, our concierge team will shape every detail prior to your arrival.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:concierge@deccanresort.in"
              className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-forest-deep text-xs tracking-luxury uppercase font-medium hover:bg-sand-light transition-colors rounded-lg shadow-sm"
            >
              <span>Contact Resident Concierge</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream text-xs tracking-luxury uppercase font-medium hover:bg-cream/10 transition-colors rounded-lg"
            >
              <span>View Residences</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
