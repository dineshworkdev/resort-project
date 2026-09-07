import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Our Sanctuary — Deccan Resort",
  description:
    "The story, architectural philosophy, and ecological setting of Deccan Resort in the Western Ghats foothills near Coimbatore.",
};

const pillars = [
  {
    number: "01",
    title: "Sanctuary & Uncompromised Privacy",
    description:
      "Villas and residences are widely spaced across forested grounds, buffered by mature trees and natural topography so guests remain sheltered from the view and sound of one another.",
  },
  {
    number: "02",
    title: "Rooted Ayurvedic Restoration",
    description:
      "Our wellness program, seasonal dining, and spa therapies reject superficial wellness trends in favour of authentic Ayurvedic consultation, regional botanicals, and restorative time in nature.",
  },
  {
    number: "03",
    title: "Ecological Stewardship of the Shola",
    description:
      "The resort embraces low-impact ecological stewardship: natural rainwater harvesting, plastic-free hospitality, preservation of wildlife corridors, and organic composting returned to our kitchen herb gardens.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Editorial Header Banner */}
      <section className="relative min-h-[520px] h-[62vh] w-full overflow-hidden mt-20 flex flex-col justify-end">
        <Image
          src={images.about.architecture}
          alt="Deccan Resort stone architecture nestled in the Western Ghats canopy"
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
              Philosophy &amp; Setting
            </p>
          </div>

          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.08] text-balance">
            A sanctuary built around the land, <span className="italic font-normal text-sand-light">not over it</span>
          </h1>
          <p className="mt-5 text-cream/85 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Perched within the forested foothills of the Western Ghats, Deccan Resort was created for travellers seeking restoration, quiet beauty, and space to slow down.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="container-content py-24 md:py-32 border-b border-sand/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
              Our Origins
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-forest tracking-tight leading-tight">
              Quiet foothills above Coimbatore
            </h2>
            
            <p className="mt-6 text-charcoal/80 text-lg font-light leading-relaxed">
              Deccan Resort was founded on an undisturbed parcel in the forested foothills of the Western Ghats, specifically chosen for its natural elevation, clear mountain air, and seclusion from highway noise.
            </p>

            <p className="mt-4 text-charcoal/70 leading-relaxed font-light">
              Rather than clearing slopes for dense multi-story blocks, the property was constructed slowly around existing shola trees and granite boulders. Structures sit low beneath the canopy line, allowing rain, mist, and local wildlife to move freely through the terrain.
            </p>

            <p className="mt-4 text-charcoal/70 leading-relaxed font-light">
              The result is a resort with an intentionally small human footprint: just three residence categories, a shared set of wellness appointments, and no rigid schedule beyond the rhythm you choose for yourself.
            </p>
          </div>

          {/* Side Visual Card with rounded-2xl */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury-lg border border-sand/30 rounded-2xl">
              <Image
                src={images.intro.forestPath}
                alt="Shola forest path at Deccan Resort"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent rounded-2xl" />
            </div>

            <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-8 bg-cream p-6 border border-sand/30 shadow-luxury-float max-w-xs hidden sm:block rounded-xl">
              <p className="font-display text-lg text-forest italic leading-snug">
                “We did not want to impose architecture on this valley. We wanted the valley to welcome the architecture.”
              </p>
              <p className="mt-3 text-xs tracking-wider uppercase text-sand-dark font-medium">
                Deccan Resort Design Ethos
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Three Guiding Pillars with rounded-2xl */}
      <section className="bg-mist/30 py-24 md:py-32 border-b border-sand/20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Principles"
            title="The three foundations of Deccan Resort"
            description="Our decisions — from architectural scale to our estate-to-table culinary philosophy — are guided by three uncompromising standards."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="glass-card p-8 sm:p-10 border border-sand/30 flex flex-col justify-between rounded-2xl shadow-luxury-card"
              >
                <div>
                  <span className="font-display text-4xl text-sand-dark block mb-4">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-2xl text-forest mb-4 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Location & Travel Details with rounded-2xl */}
      <section className="container-content py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Geographic Setting"
              title="Within the Western Ghats foothills"
              description="The Western Ghats is older than the Himalayas and recognized for its extraordinary botanical and birdlife diversity. Deccan Resort rests in an elevated foothill setting, experiencing pleasant, temperate mountain weather throughout the year."
            />

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-sand/20">
              <div className="p-4 bg-sand/10 rounded-xl border border-sand/20">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block">Setting</span>
                <p className="font-display text-2xl text-forest mt-1">Elevated</p>
                <p className="text-xs text-charcoal/55 mt-0.5">Foothill slopes</p>
              </div>
              <div className="p-4 bg-sand/10 rounded-xl border border-sand/20">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block">Transit</span>
                <p className="font-display text-2xl text-forest mt-1">Scenic</p>
                <p className="text-xs text-charcoal/55 mt-0.5">Near Coimbatore (CJB)</p>
              </div>
              <div className="p-4 bg-sand/10 rounded-xl border border-sand/20">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block">Climate</span>
                <p className="font-display text-2xl text-forest mt-1">Temperate</p>
                <p className="text-xs text-charcoal/55 mt-0.5">Year-round breeze</p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 px-8 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl rounded-lg"
              >
                <span>Plan Your Stay</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 px-8 py-4 border border-sand/60 text-forest text-xs tracking-luxury uppercase font-medium hover:bg-sand/10 transition-colors rounded-lg"
              >
                <span>Explore Activities</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-forest-deep text-cream p-8 sm:p-10 border border-sand/30 rounded-2xl shadow-luxury-lg">
            <span className="text-[10px] tracking-ultra uppercase text-sand-light font-medium block mb-2">
              Arrival &amp; Coordination
            </span>
            <h3 className="font-display text-2xl text-cream">
              Private Transfers
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
              Our concierge coordinates seamless private chauffeured transfers directly from Coimbatore International Airport (CJB) or Coimbatore Junction railway station.
            </p>
            <div className="mt-6 pt-5 border-t border-cream/15 text-xs text-sand-light space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sand" />
                Flight tracking and curbside greeting
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sand" />
                Chilled botanical towel service in vehicle
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sand" />
                Scenic foothill route through coconut and shola groves
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
