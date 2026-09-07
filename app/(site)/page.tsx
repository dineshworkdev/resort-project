import Image from "next/image";
import Link from "next/link";
import AvailabilityBar from "@/components/AvailabilityBar";
import RoomCard from "@/components/RoomCard";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";
import { rooms } from "@/data/rooms";

const experiences = [
  {
    title: "Guided Shola Forest Trails",
    subtitle: "Canopy & Birdlife Exploration",
    description:
      "Quiet walks through the ancient shola buffer bordering the property, timed to catch early mountain mist and resident hornbill and thrush calls.",
    duration: "2–3 Hours",
    timing: "Early Morning & Late Afternoon",
    image: images.experiences.forestTrail,
  },
  {
    title: "Tea Estate Mornings",
    subtitle: "Plantation Heritage",
    description:
      "A scenic drive into historic tea estates along the foothills, followed by a single-origin tea tasting served back on the resort terrace.",
    duration: "Half Day",
    timing: "Morning Sessions",
    image: images.experiences.teaEstate,
  },
  {
    title: "Ayurvedic Restorations",
    subtitle: "Holistic Herbal Therapies",
    description:
      "Therapies drawn from regional herbal traditions, held in an open-air teak pavilion overlooking the valley canopy with personalized botanical oils.",
    duration: "90 Minutes",
    timing: "Daily by Reservation",
    image: images.experiences.wellnessRitual,
  },
];

const sanctuaryRhythms = [
  {
    period: "01 • Morning",
    title: "Mist & Valley Birdsong",
    description:
      "Dawn arrives with drifting shola mist through the canopy. Enjoy freshly brewed estate tea on your private veranda as the valley awakens with the calls of native whistling thrushes and hornbills.",
  },
  {
    period: "02 • Afternoon",
    title: "Canopy Stillness & Rest",
    description:
      "Midday invites quiet restoration. Retreat to shaded teak daybeds by the infinity pool, take a slow botanical walk through the herb gardens, or surrender to customized Ayurvedic therapies.",
  },
  {
    period: "03 • Evening",
    title: "Fireside & Mountain Stars",
    description:
      "As dusk cools the mountain air, gather around the circular stone firepit. Enjoy locally inspired dining on the terrace edge under a brilliant canopy of undisturbed night stars.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[740px] h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Resort Photograph */}
        <Image
          src={images.hero.main}
          alt="Deccan Resort secluded stone villas and infinity pool in the Western Ghats"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-100 transition-transform duration-[14000ms] ease-out hover:scale-105"
        />

        {/* Cinematic Multi-layered Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-forest-deep/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-forest-deep/20 to-forest-deep/60 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative flex-1 container-content flex flex-col justify-center pt-24 pb-20 z-10">
          <div className="max-w-4xl">
            {/* Editorial Eyebrow Badge */}
            <div className="inline-flex items-center gap-3 mb-6 bg-forest-deep/70 backdrop-blur-md px-4 py-2 border border-sand/35 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
              <p className="text-[11px] tracking-ultra uppercase text-sand-light font-medium">
                Western Ghats Foothills • Coimbatore, Tamil Nadu
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.04] tracking-tight text-balance">
              Escape to the Foothills of{" "}
              <span className="italic font-normal text-sand-light">Western Ghats</span>
            </h1>

            <p className="mt-6 text-cream/90 text-lg sm:text-xl max-w-2xl font-light leading-relaxed text-balance">
              Experience discreet luxury, Ayurvedic wellness, and uncompromised privacy in a secluded sanctuary built into the forest canopy.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-sand text-forest-deep text-xs tracking-luxury uppercase font-medium hover:bg-sand-light transition-all duration-300 shadow-luxury hover:shadow-xl"
              >
                <span>Check Availability</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/stay"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cream/10 hover:bg-cream/20 backdrop-blur-sm border border-cream/40 text-cream text-xs tracking-luxury uppercase font-medium transition-all duration-300"
              >
                <span>Explore Residences</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Availability Bar (Desktop) */}
        <div className="relative container-content z-20 pb-8 hidden md:block -mb-10">
          <AvailabilityBar />
        </div>
      </section>

      {/* Mobile Availability Bar */}
      <section className="md:hidden container-content -mt-6 relative z-30 mb-12">
        <AvailabilityBar />
      </section>

      {/* Sanctuary Overview Section */}
      <section className="container-content pt-28 md:pt-36 pb-24 border-b border-sand/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Image Showcase with Gold Framing */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury-lg border border-sand/30">
              <Image
                src={images.intro.mistMountains}
                alt="Misty forested ridgelines of the Western Ghats near Deccan Resort"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent" />
            </div>

            {/* Floating Editorial Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-8 bg-forest text-cream p-5 sm:p-6 shadow-luxury-float max-w-[240px] border border-sand/30 hidden sm:block">
              <span className="text-[10px] tracking-ultra uppercase text-sand-light font-medium block">
                Sanctuary Setting
              </span>
              <p className="font-display text-xl text-cream mt-1">Forested Foothills</p>
              <p className="text-xs text-cream/70 mt-1 font-light">
                Sheltered within the lush Western Ghats mountain buffer
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionHeading
              eyebrow="The Sanctuary"
              title="A tranquil property set into the hills above Coimbatore"
              description="Deccan Resort sits within the forested foothills of the Western Ghats, a scenic drive from Coimbatore. The property was designed around the landscape rather than over it — low structures, native granite, reclaimed timber, and wide verandas that keep the surrounding valley in constant view."
            />

            <p className="mt-5 text-charcoal/75 leading-relaxed font-light">
              Every stay is built around three pillars: seclusion, restorative wellness, and intimate proximity to the shola forest itself. There is no rigid itinerary here — only an environment tailored to slow down and reconnect.
            </p>

            {/* Qualitative Pillars Bar */}
            <div className="mt-10 grid grid-cols-3 gap-6 py-6 border-y border-sand/20">
              <div>
                <span className="font-display text-2xl sm:text-3xl text-forest block">3</span>
                <p className="text-xs text-charcoal/65 mt-1 tracking-wide">Private Residences</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl text-forest block">Shola</span>
                <p className="text-xs text-charcoal/65 mt-1 tracking-wide">Foothills Buffer</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl text-forest block">Ayurvedic</span>
                <p className="text-xs text-charcoal/65 mt-1 tracking-wide">Restorative Living</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors group"
              >
                <span>Read Our Sanctuary Story</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </section>

      {/* Featured Rooms & Villas Section */}
      <section className="bg-mist/40 py-24 md:py-32 border-b border-sand/20">
        <div className="container-content">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <SectionHeading
              eyebrow="Accommodations"
              title="Residences crafted for solitude"
              description="Three ways to stay, each oriented around a different degree of privacy, panoramic views, and refined comfort."
            />
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors shrink-0 group"
            >
              <span>View All 3 Residences</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Western Ghats Biodiversity Atmospheric Banner */}
      <section className="relative py-36 md:py-44 overflow-hidden">
        <Image
          src={images.hero.poolValley}
          alt="Infinity pool overlooking the forested valley ridgeline"
          fill
          sizes="100vw"
          className="object-cover scale-100 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/75 to-forest-deep/60" />

        <div className="relative container-content text-center max-w-4xl mx-auto z-10">
          <SectionHeading
            light
            align="center"
            eyebrow="The Western Ghats"
            title="Bordering an ancient mountain forest belt"
            description="The resort borders an undisturbed forest belt in the Western Ghats — an ancient landscape characterized by rolling morning mist, endemic flora, and gentle valley breezes that sweep through the canopy at dawn."
          />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-luxury uppercase text-sand-light font-medium">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Mountain Solitude
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Native Canopy Flora
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Valley Light &amp; Mist
            </span>
          </div>
        </div>
      </section>

      {/* Curated Experiences Showcase */}
      <section className="container-content py-24 md:py-32 border-b border-sand/20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="Curated Experiences"
            title="Time, unhurried and well spent"
            description="Guided rituals and quiet explorations shaped directly around the surrounding forest, seasons, and mountain light."
          />
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors shrink-0 group"
          >
            <span>See All Experiences</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="group bg-cream border border-sand/25 hover:border-sand/60 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-forest-dark">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                <span className="absolute top-4 right-4 bg-forest-deep/85 backdrop-blur-md text-sand-light text-[11px] font-medium px-3 py-1 border border-sand/30 tracking-wider">
                  {exp.duration}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-1">
                    {exp.subtitle}
                  </span>
                  <h3 className="font-display text-2xl text-forest group-hover:text-sand-dark transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="mt-3 text-sm text-charcoal/70 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-sand/20">
                  <Link
                    href="/experiences"
                    className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-medium group-hover:text-sand-dark transition-colors"
                  >
                    <span>Reserve Activity</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
          ))}
        </div>
      </section>

      {/* Editorial Chapter: The Rhythm of Sanctuary (Replacing Fake Testimonials) */}
      <section className="bg-forest-deep py-28 md:py-36 text-cream border-b border-sand/20">
        <div className="container-content">
          <SectionHeading
            light
            align="center"
            eyebrow="Sanctuary Living"
            title="The rhythm of a mountain day"
            description="Days at Deccan Resort move to the natural cadence of the forest, shifting mist, and tranquil mountain light."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {sanctuaryRhythms.map((r) => (
              <div
                key={r.period}
                className="glass-forest p-8 sm:p-10 border border-sand/25 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs tracking-ultra uppercase text-sand-light font-medium block mb-3">
                    {r.period}
                  </span>
                  <h3 className="font-display text-2xl text-cream mb-4">
                    {r.title}
                  </h3>
                  <p className="text-sm text-cream/80 leading-relaxed font-light">
                    {r.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-cream/15 flex items-center gap-2 text-xs text-sand-light font-medium tracking-wider uppercase">
                  <span>Slow Living Ethos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Preview */}
      <section className="container-content py-24 md:py-32 border-b border-sand/20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Visual Portfolio"
            title="A sense of the property"
            description="Explore the interplay of native stone architecture, forest canopies, and morning valley light."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors shrink-0 group"
          >
            <span>View Complete Gallery</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {images.gallery.slice(0, 8).map((src, i) => (
            <Link
              key={src}
              href="/gallery"
              className={`group relative overflow-hidden bg-forest-dark border border-sand/20 ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt="Deccan Resort property visual"
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-forest-deep/0 transition-colors duration-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* Final Editorial Invitation */}
      <section className="container-content py-28 md:py-36 text-center">
        <div className="max-w-3xl mx-auto bg-mist/50 p-10 sm:p-16 border border-sand/35 shadow-luxury-md">
          <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-3">
            Reservations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-forest tracking-tight">
            Reserve your retreat above the valley
          </h2>
          <p className="mt-5 text-charcoal/75 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            Experience complete seclusion, bespoke dining, and uninterrupted views across the Western Ghats.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span>Check Availability</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 px-9 py-4 border border-sand/60 text-forest text-xs tracking-luxury uppercase font-medium hover:bg-sand/15 transition-colors"
            >
              <span>Compare Suites</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
