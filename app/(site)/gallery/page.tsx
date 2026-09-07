"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

interface GalleryItem {
  src: string;
  title: string;
  category: "all" | "residences" | "pool-landscape" | "wellness-dining" | "outdoors";
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/pool.jpg",
    title: "The Heated Infinity Valley Pool",
    category: "pool-landscape",
    caption: "Carved into native granite overlooking the Western Ghats canopy at golden hour.",
  },
  {
    src: "/images/hero/hero.jpg",
    title: "Sanctuary Architecture & Foothills",
    category: "pool-landscape",
    caption: "Low-impact stone cottages and teakwood verandas set into the forested ridgeline.",
  },
  {
    src: "/images/gallery/bed-room.jpg",
    title: "Estate Residence Bedroom",
    category: "residences",
    caption: "Warm hand-planed timber, organic cotton bedding, and morning forest light.",
  },
  {
    src: "/images/gallery/main-room.jpg",
    title: "Royal Suite Living Pavilion",
    category: "residences",
    caption: "Flagship living lounge featuring bespoke leather seating and panoramic valley glazing.",
  },
  {
    src: "/images/gallery/mountain.jpg",
    title: "Misty Western Ghats Ridgelines",
    category: "pool-landscape",
    caption: "Subtropical biodiversity buffer zone with cooler elevated temperatures year-round.",
  },
  {
    src: "/images/gallery/dining.jpg",
    title: "Farm-to-Table Terrace Dining",
    category: "wellness-dining",
    caption: "Seasonal culinary offerings prepared with harvest from on-site organic gardens.",
  },
  {
    src: "/images/gallery/Poolside Lounge.jpg",
    title: "Covered Poolside Daybeds",
    category: "pool-landscape",
    caption: "Shaded afternoon relaxation with views of the mountain ridge and water.",
  },
  {
    src: "/images/gallery/Firepit.jpg",
    title: "Circular Stone Firepit",
    category: "outdoors",
    caption: "Evening gathering space for roasted treats, hot spiced tea, and stargazing.",
  },
  {
    src: "/images/gallery/forest-walk.jpg",
    title: "Shola Canopy Forest Trail",
    category: "outdoors",
    caption: "Marked private walking trail guided by our resident wildlife naturalist.",
  },
  {
    src: "/images/gallery/campfire.jpg",
    title: "Sunset Valley Campfire",
    category: "outdoors",
    caption: "Intimate dusk bonfire as the mountain mist rolls through the treetops.",
  },
  {
    src: "/images/amenities/spa.jpg",
    title: "The Spa Ayurvedic Sanctuary",
    category: "wellness-dining",
    caption: "Restorative treatment suite opening onto private medicinal herb gardens.",
  },
  {
    src: "/images/experiences/yoga.jpg",
    title: "Yoga & Meditation Pavilion",
    category: "wellness-dining",
    caption: "Elevated canopy deck dedicated to morning pranayama and sound therapy.",
  },
];

const categories = [
  { id: "all", label: "All Imagery" },
  { id: "residences", label: "Residences & Suites" },
  { id: "pool-landscape", label: "Pool & Landscapes" },
  { id: "wellness-dining", label: "Wellness & Dining" },
  { id: "outdoors", label: "Trails & Campfire" },
] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <>
      {/* Editorial Title Section */}
      <section className="container-content pt-36 pb-12">
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="A photographic tour of Deccan Resort"
          description="Explore the architecture, shola forest sanctuary, serene residences, and mountain vistas overlooking Coimbatore's Western Ghats."
        />

        {/* Category Filter Tabs with rounded-full pills */}
        <div className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-sand/20 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 text-xs tracking-luxury uppercase font-medium transition-all duration-300 rounded-full ${
                activeCategory === cat.id
                  ? "bg-forest text-cream shadow-sm"
                  : "bg-cream text-charcoal/70 hover:text-forest hover:bg-sand/15 border border-sand/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Gallery Grid with rounded-2xl cards */}
      <section className="container-content pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.src}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer bg-cream border border-sand/25 hover:border-sand/60 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden flex flex-col rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-forest-dark rounded-t-2xl">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-forest-deep/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-2xl">
                  <span className="p-3 rounded-full bg-cream/90 text-forest shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between rounded-b-2xl">
                <h3 className="font-display text-lg text-forest group-hover:text-sand-dark transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-charcoal/60 font-light line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-forest-deep/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-cream z-20">
            <span className="text-xs tracking-luxury uppercase text-sand-light font-medium bg-forest-dark/80 px-4 py-1.5 rounded-full border border-sand/30">
              Photograph {String(lightboxIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
            </span>
            
            <button
              aria-label="Close Lightbox"
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 text-cream/70 hover:text-cream bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center Image Container with rounded-xl */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Prev Button */}
            <button
              aria-label="Previous photograph"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
                );
              }}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-forest-dark/70 hover:bg-forest text-cream border border-sand/30 transition-all hover:scale-110 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-sand/20">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain rounded-2xl"
              />
            </div>

            {/* Next Button */}
            <button
              aria-label="Next photograph"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null ? null : (prev + 1) % filteredItems.length
                );
              }}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-forest-dark/70 hover:bg-forest text-cream border border-sand/30 transition-all hover:scale-110 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="text-center max-w-2xl mx-auto z-20 bg-forest-dark/70 px-6 py-3 rounded-xl border border-sand/20 backdrop-blur-sm">
            <h4 className="font-display text-xl sm:text-2xl text-cream">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-sand-light/90 font-light">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
