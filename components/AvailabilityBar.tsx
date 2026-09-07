"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AvailabilityBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState("2");
  const [activeTab, setActiveTab] = useState<"standard" | "villa">("standard");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guestsCount) params.set("guests", guestsCount);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="glass-card shadow-luxury-float p-4 sm:p-6 lg:p-7 border border-sand/30 transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-sand/20">
          
          {/* Check-In */}
          <div className="flex-1 px-3 sm:px-4 py-2 lg:py-0 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label htmlFor="checkIn" className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium cursor-pointer">
                Check-In Date
              </label>
            </div>
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full bg-transparent text-sm md:text-base font-display text-forest font-medium focus:outline-none cursor-pointer"
            />
          </div>

          {/* Check-Out */}
          <div className="flex-1 px-3 sm:px-4 pt-3 lg:pt-0 pb-2 lg:pb-0 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label htmlFor="checkOut" className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium cursor-pointer">
                Check-Out Date
              </label>
            </div>
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full bg-transparent text-sm md:text-base font-display text-forest font-medium focus:outline-none cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="flex-1 px-3 sm:px-4 pt-3 lg:pt-0 pb-2 lg:pb-0 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <svg className="w-4 h-4 text-sand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <label htmlFor="guests" className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium cursor-pointer">
                Guests
              </label>
            </div>
            <select
              id="guests"
              value={guestsCount}
              onChange={(e) => setGuestsCount(e.target.value)}
              className="w-full bg-transparent text-sm md:text-base font-display text-forest font-medium focus:outline-none cursor-pointer pr-2"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-cream text-charcoal">
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <div className="pt-4 lg:pt-0 lg:pl-6 shrink-0 flex items-center">
            <button
              type="submit"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all duration-300 shadow-md hover:shadow-xl group"
            >
              <span>Check Availability</span>
              <svg
                className="w-4 h-4 text-sand-light transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Reassurance Micro-banner */}
        <div className="mt-4 pt-3 border-t border-sand/15 hidden sm:flex items-center justify-between text-[11px] text-charcoal/65">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
              Best Rate Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
              Complimentary Organic Breakfast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
              Complimentary Tea Ritual
            </span>
          </div>
          <span className="text-sand-dark font-medium hidden md:inline">
            Direct Booking Privileges
          </span>
        </div>
      </form>
    </div>
  );
}
