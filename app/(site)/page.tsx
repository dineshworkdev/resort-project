import Image from "next/image";
import Link from "next/link";
import AvailabilityBar from "@/components/AvailabilityBar";
import RoomCard from "@/components/RoomCard";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";
import { rooms } from "@/data/rooms";

const experiences = [
  {
    title: "Guided Forest Trails",
    subtitle: "Shola Canopy Exploration",
    description:
      "Early-morning walks through ancient shola forest with our resident naturalist, timed to the region's rare birdlife and morning mist.",
    duration: "2–3 Hours",
    image: images.experiences.forestTrail,
  },
  {
    title: "Tea Estate Mornings",
    subtitle: "Private Plantation Walk",
    description:
      "A scenic drive into the historic tea estates along the foothills, followed by a private tea tasting back on the resort terrace.",
    duration: "Half Day",
    image: images.experiences.teaEstate,
  },
  {
    title: "Wellness Rituals",
    subtitle: "Ayurvedic Restorative Sessions",
    description:
      "Therapies drawn from regional herbal traditions, held in an open-air teak pavilion overlooking the valley canopy.",
    duration: "90 Minutes",
    image: images.experiences.wellnessRitual,
  },
];

const testimonials = [
  {
    quote:
      "The stillness of the property is what stayed with us longest — mornings on the private balcony, mist settling over the valley, nowhere else to be.",
    name: "Guest, Estate Room",
    location: "Bengaluru",
  },
  {
    quote:
      "Every detail, from the shola naturalist walks to the garden-to-table dining, felt considered rather than performed for guests.",
    name: "Guest, Premium Wellness Villa",
    location: "Mumbai",
  },
  {
    quote:
      "The Royal Suite's pool looks straight down the valley ridgeline. We barely left the terrace for three days. Pure restoration.",
    name: "Guest, Deccan Royal Suite",
    location: "Chennai",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[720px] h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Resort Photograph */}
        <Image
          src={images.hero.main}
          alt="Deccan Resort property and pool in the Western Ghats"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-100 transition-transform duration-[12000ms] ease-out hover:scale-105"
        />

        {/* Multi-layered cinematic gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-forest-deep/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-forest-deep/20 to-forest-deep/60 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative flex-1 container-content flex flex-col justify-center pt-24 pb-20 z-10">
          <div className="max-w-4xl">
            
            {/* Editorial Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6 bg-forest-deep/60 backdrop-blur-md px-4 py-1.5 border border-sand/30">
              <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
              <p className="text-[11px] tracking-ultra uppercase text-sand-light font-medium">
                Coimbatore, Tamil Nadu • Western Ghats Foothills
              </p>
            </div>

            {/* Headline with High-End Serif Styling */}
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-forest-deep text-xs tracking-luxury uppercase font-medium hover:bg-sand-light transition-all duration-300 shadow-luxury hover:shadow-xl group"
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
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury-lg border border-sand/25">
              <Image
                src={images.intro.mistMountains}
                alt="Misty mountains of the Western Ghats near Deccan Resort"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
            </div>

            {/* Floating Editorial Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-8 bg-forest text-cream p-5 sm:p-6 shadow-luxury-float max-w-[220px] border border-sand/30 hidden sm:block">
              <span className="text-[10px] tracking-ultra uppercase text-sand-light font-medium block">
                Sanctuary Height
              </span>
              <p className="font-display text-2xl text-cream mt-1">1,200 Meters</p>
              <p className="text-xs text-cream/70 mt-1 font-light">Elevated Western Ghats subtropical microclimate</p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionHeading
              eyebrow="The Sanctuary"
              title="A tranquil property set into the hills above Coimbatore"
              description="Deccan Resort sits within the forested foothills of the Western Ghats, a short drive from Coimbatore. The property was designed around the landscape rather than over it — low structures, native granite, reclaimed timber, and wide verandas that keep the surrounding valley in constant view."
            />

            <p className="mt-5 text-charcoal/70 leading-relaxed font-light">
              Every stay is built around three pillars: privacy, restorative wellness, and intimate proximity to the shola forest itself. There is no rigid itinerary here — only an environment tailored to slow down and reconnect.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-3 gap-6 py-6 border-y border-sand/20">
              <div>
                <span className="font-display text-3xl sm:text-4xl text-forest">3</span>
                <p className="text-xs text-charcoal/60 mt-1 tracking-wide">Villa Categories</p>
              </div>
              <div>
                <span className="font-display text-3xl sm:text-4xl text-forest">100%</span>
                <p className="text-xs text-charcoal/60 mt-1 tracking-wide">Organic Dining</p>
              </div>
              <div>
                <span className="font-display text-3xl sm:text-4xl text-forest">18°C</span>
                <p className="text-xs text-charcoal/60 mt-1 tracking-wide">Average Temp</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors group"
              >
                <span>Read Our Sanctuary Story</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Western Ghats Biodiversity Banner */}
      <section className="relative py-36 md:py-44 overflow-hidden">
        <Image
          src={images.hero.poolValley}
          alt="Infinity pool overlooking the Western Ghats valley"
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
            title="Set within one of the world's eight biodiversity hotspots"
            description="The resort directly borders a protected forest belt in the Western Ghats — an ancient UNESCO World Heritage landscape known for its density of endemic orchids, misty ridgelines, and cool elevated climate year-round."
          />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs tracking-luxury uppercase text-sand-light font-medium">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Pure Mountain Solitude
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Pure Mountain Flora
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Year-Round Valley Breeze
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
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="group bg-cream border border-sand/20 hover:border-sand/50 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden flex flex-col"
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
                
                <span className="absolute top-4 right-4 bg-forest-deep/80 backdrop-blur-md text-sand-light text-[11px] font-medium px-3 py-1 border border-sand/30 tracking-wider">
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
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Gallery Preview */}
      <section className="container-content py-24 md:py-32 border-b border-sand/20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Visual Portfolio"
            title="A sense of the property"
            description="Explore the interplay of stone architecture, native forest canopies, and morning valley light."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-forest font-semibold hover:text-sand-dark transition-colors shrink-0 group"
          >
            <span>View Complete Gallery</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Guest Testimonials Section */}
      <section className="bg-forest-deep py-28 md:py-36 text-cream border-b border-sand/20">
        <div className="container-content">
          <SectionHeading
            light
            align="center"
            eyebrow="Guest Impressions"
            title="Reflections from our sanctuary"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="glass-forest p-8 sm:p-10 border border-sand/25 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-4xl text-sand-light block mb-4">“</span>
                  <p className="font-display text-lg text-cream/90 leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-cream/15">
                  <p className="font-display text-base text-sand-light">{t.name}</p>
                  <p className="text-xs text-cream/50 mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Editorial Invitation */}
      <section className="container-content py-28 md:py-36 text-center">
        <div className="max-w-3xl mx-auto bg-mist/50 p-10 sm:p-16 border border-sand/30 shadow-luxury-md">
          <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-3">
            Reservations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-forest tracking-tight">
            Reserve your retreat above the valley
          </h2>
          <p className="mt-5 text-charcoal/70 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
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
              className="inline-flex items-center gap-2 px-9 py-4 border border-sand text-forest text-xs tracking-luxury uppercase font-medium hover:bg-sand/10 transition-colors"
            >
              <span>Compare Suites</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
