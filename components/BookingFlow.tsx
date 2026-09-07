"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { rooms } from "@/data/rooms";
import { Room } from "@/lib/types";

type Step = "dates" | "room" | "details" | "review" | "payment" | "confirmation";

const steps: { id: Step; label: string }[] = [
  { id: "dates", label: "Dates & Guests" },
  { id: "room", label: "Select Residence" },
  { id: "details", label: "Guest Details" },
  { id: "review", label: "Review Stay" },
  { id: "payment", label: "Payment Guarantee" },
];

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = outDate.getTime() - inDate.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function BookingFlow() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("dates");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const [guestsCount, setGuestsCount] = useState(
    searchParams.get("guests") ?? "2"
  );
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(() => {
    const roomId = searchParams.get("room");
    return rooms.find((r) => r.id === roomId) ?? rooms[0];
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [confirmationId, setConfirmationId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights = useMemo(
    () => nightsBetween(checkIn, checkOut),
    [checkIn, checkOut]
  );
  const effectiveNights = Math.max(nights, 1);
  const roomRate = selectedRoom ? selectedRoom.pricePerNight : 0;
  const roomSubtotal = roomRate * effectiveNights;
  const taxesAndFees = Math.round(roomSubtotal * 0.12);
  const total = roomSubtotal + taxesAndFees;

  const currentIndex = steps.findIndex((s) => s.id === step);

  function validateDates() {
    const next: Record<string, string> = {};
    if (!checkIn) next.checkIn = "Select a check-in date.";
    if (!checkOut) next.checkOut = "Select a check-out date.";
    if (checkIn && checkOut && nightsBetween(checkIn, checkOut) <= 0) {
      next.checkOut = "Check-out date must be after check-in.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateDetails() {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Enter the primary guest's full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone)) next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePayment() {
    const next: Record<string, string> = {};
    if (!cardName.trim()) next.cardName = "Enter name on card.";
    if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, "")))
      next.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) next.cardExpiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(cardCvc)) next.cardCvc = "Enter valid CVC.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goTo(next: Step) {
    setErrors({});
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfirmPayment() {
    if (!validatePayment()) return;
    const id = `DR-${Math.floor(10000 + Math.random() * 89999)}`;
    setConfirmationId(id);
    goTo("confirmation");
  }

  return (
    <div className="container-content pt-36 pb-28">
      
      {/* Editorial Step Timeline */}
      {step !== "confirmation" && (
        <div className="mb-14 pb-8 border-b border-sand/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-1">
                Direct Reservation
              </span>
              <h1 className="font-display text-2xl sm:text-3xl text-forest">
                Residency Booking
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-charcoal/60">
              <span className="w-2 h-2 rounded-full bg-sand-dark" />
              <span>Step {currentIndex + 1} of {steps.length}</span>
            </div>
          </div>

          <nav aria-label="Booking steps progress" className="w-full overflow-x-auto pb-2">
            <ol className="flex items-center gap-3 sm:gap-6 min-w-max">
              {steps.map((s, i) => {
                const isPassed = i < currentIndex;
                const isCurrent = i === currentIndex;
                return (
                  <li key={s.id} className="flex items-center gap-3 sm:gap-4">
                    <button
                      disabled={i > currentIndex}
                      onClick={() => goTo(s.id)}
                      className={`flex items-center gap-2.5 text-xs tracking-luxury uppercase font-medium transition-colors ${
                        isCurrent
                          ? "text-forest font-semibold"
                          : isPassed
                          ? "text-sand-dark hover:text-forest cursor-pointer"
                          : "text-charcoal/30 cursor-not-allowed"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-body transition-colors ${
                          isCurrent
                            ? "bg-forest text-cream font-bold"
                            : isPassed
                            ? "bg-sand text-forest-deep"
                            : "bg-sand/20 text-charcoal/40"
                        }`}
                      >
                        {isPassed ? "✓" : i + 1}
                      </span>
                      <span>{s.label}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <span className="w-6 sm:w-10 h-px bg-sand/25" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      )}

      {/* Confirmation Screen */}
      {step === "confirmation" && selectedRoom ? (
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-sand/20 text-sand-dark flex items-center justify-center mx-auto mb-4 border border-sand/40">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs tracking-ultra uppercase text-sand-dark font-medium block mb-2">
              Reservation Confirmed
            </span>
            <h1 className="font-display text-3xl sm:text-5xl text-forest">
              We look forward to welcoming you
            </h1>
            <p className="mt-3 text-charcoal/70 text-base font-light">
              Your stay at Deccan Resort is officially confirmed. A detailed reservation folio has been sent to{" "}
              <span className="font-medium text-forest">{email}</span>.
            </p>
          </div>

          {/* Luxury Folio Voucher Card */}
          <div className="bg-cream border border-sand/30 shadow-luxury-float overflow-hidden">
            <div className="bg-forest-deep text-cream p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-ultra uppercase text-sand-light font-medium">
                  Booking Reference ID
                </p>
                <p className="font-display text-3xl text-sand-light mt-1">
                  {confirmationId}
                </p>
              </div>
              <div className="text-right sm:text-right">
                <p className="text-xs text-cream/70">Guest of Honor</p>
                <p className="font-display text-xl text-cream">{fullName}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-sand/20 text-sm">
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider block">Residence</span>
                  <p className="font-display text-lg text-forest mt-1">{selectedRoom.name}</p>
                  <p className="text-xs text-charcoal/60">{selectedRoom.bedType}</p>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider block">Dates</span>
                  <p className="font-display text-lg text-forest mt-1">
                    {checkIn || "Upcoming"} — {checkOut || "Upcoming"}
                  </p>
                  <p className="text-xs text-charcoal/60">{effectiveNights} Nights</p>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider block">Party</span>
                  <p className="font-display text-lg text-forest mt-1">{guestsCount} Guests</p>
                  <p className="text-xs text-charcoal/60">Adults &amp; Children</p>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-medium text-charcoal/80">Total Guaranteed (inclusive of taxes)</span>
                <span className="font-display text-3xl text-forest">₹{total.toLocaleString("en-IN")}</span>
              </div>

              {/* Inclusions */}
              <div className="bg-mist/30 p-4 border border-sand/20 text-xs text-charcoal/70 space-y-1.5">
                <p className="font-medium text-forest uppercase tracking-wider text-[10px]">
                  Included Privileges:
                </p>
                <p>• Daily farm-to-table organic breakfast on the terrace</p>
                <p>• Welcome Ayurvedic botanical elixir and cool towel greeting</p>
                <p>• Guided morning naturalist walk through the shola buffer</p>
              </div>
            </div>

            <div className="p-6 bg-sand/10 border-t border-sand/20 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-charcoal/60">
                Questions? Call our concierge team at +91 422 400 1200
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-cream border border-sand/40 text-forest hover:bg-sand/20 transition-colors uppercase tracking-luxury font-medium"
                >
                  Print Voucher
                </button>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-forest text-cream hover:bg-forest-dark transition-colors uppercase tracking-luxury font-medium"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Two-Column Form & Summary Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Interactive Form Column */}
          <div className="lg:col-span-8">
            
            {/* Step 1: Dates & Guests */}
            {step === "dates" && (
              <div className="glass-card p-8 sm:p-10 border border-sand/30 shadow-luxury-md animate-fade-in">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 01
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Choose your retreat dates
                </h2>
                <p className="mt-2 text-charcoal/70 text-sm font-light">
                  Select your arrival and departure dates to verify residence availability.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="checkIn" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Check-In Date
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                    />
                    {errors.checkIn && (
                      <p className="text-xs text-red-600 mt-1">{errors.checkIn}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="checkOut" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Check-Out Date
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                    />
                    {errors.checkOut && (
                      <p className="text-xs text-red-600 mt-1">{errors.checkOut}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                  <label htmlFor="guests" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                    Party Size (Guests)
                  </label>
                  <select
                    id="guests"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex justify-end">
                  <button
                    onClick={() => validateDates() && goTo("room")}
                    className="inline-flex items-center gap-3 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl"
                  >
                    <span>View Available Residences</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Room */}
            {step === "room" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                    Step 02
                  </span>
                  <h2 className="font-display text-3xl text-forest tracking-tight">
                    Select your residence
                  </h2>
                  <p className="mt-2 text-charcoal/70 text-sm font-light">
                    Choose the residence best suited for your party and degree of solitude.
                  </p>
                </div>

                <div className="space-y-6">
                  {rooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`group cursor-pointer bg-cream border transition-all duration-300 p-5 sm:p-6 flex flex-col md:flex-row gap-6 ${
                          isSelected
                            ? "border-forest shadow-luxury-lg bg-sand/10 ring-1 ring-forest"
                            : "border-sand/30 hover:border-sand hover:shadow-luxury"
                        }`}
                      >
                        <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden bg-forest-dark border border-sand/20">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            sizes="(min-width: 768px) 256px, 100vw"
                            className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="font-display text-2xl text-forest">
                                {room.name}
                              </h3>
                              <span className="text-xs px-2.5 py-1 bg-cream text-sand-dark font-medium border border-sand/20">
                                {room.status}
                              </span>
                            </div>

                            <p className="text-xs text-charcoal/60 mt-1 font-light">
                              {room.occupancy} Guests • {room.bedType} • {room.size}
                            </p>

                            <p className="mt-3 text-sm text-charcoal/75 leading-relaxed font-light">
                              {room.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {room.amenities.slice(0, 3).map((a) => (
                                <span key={a} className="text-[11px] bg-sand/15 text-forest px-2.5 py-1">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sand/20 flex items-center justify-between">
                            <div>
                              <span className="font-display text-2xl text-forest">
                                ₹{room.pricePerNight.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-charcoal/50 font-body"> / night</span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room);
                                goTo("details");
                              }}
                              className={`px-6 py-2.5 text-xs tracking-luxury uppercase font-medium transition-colors ${
                                isSelected
                                  ? "bg-forest text-cream hover:bg-forest-dark"
                                  : "bg-sand text-forest-deep hover:bg-sand-light"
                              }`}
                            >
                              {isSelected ? "Selected ✓" : "Choose Residence"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => goTo("dates")}
                    className="text-xs tracking-luxury uppercase text-charcoal/60 hover:text-forest transition-colors"
                  >
                    ← Change Dates
                  </button>
                  <button
                    onClick={() => goTo("details")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all"
                  >
                    <span>Proceed to Details</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Guest Details */}
            {step === "details" && selectedRoom && (
              <div className="glass-card p-8 sm:p-10 border border-sand/30 shadow-luxury-md animate-fade-in">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 03
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Guest Information
                </h2>
                <p className="mt-2 text-charcoal/70 text-sm font-light">
                  Please provide the primary contact details for this reservation.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Primary Guest Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                        Mobile Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="requests" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Special Requests &amp; Dietary Preferences (Optional)
                    </label>
                    <textarea
                      id="requests"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      rows={4}
                      placeholder="Please note dietary restrictions, approximate arrival time, or special celebrations..."
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("room")}
                    className="text-xs tracking-luxury uppercase text-charcoal/60 hover:text-forest transition-colors"
                  >
                    ← Back to Residence
                  </button>
                  <button
                    onClick={() => validateDetails() && goTo("review")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all"
                  >
                    <span>Review Reservation</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === "review" && selectedRoom && (
              <div className="glass-card p-8 sm:p-10 border border-sand/30 shadow-luxury-md animate-fade-in">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 04
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Review your booking details
                </h2>
                <p className="mt-2 text-charcoal/70 text-sm font-light">
                  Please confirm all reservation parameters before securing your stay.
                </p>

                <div className="mt-8 border border-sand/25 divide-y divide-sand/20 bg-cream text-sm">
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-charcoal/60">Residence</span>
                    <span className="font-display text-base text-forest font-medium">{selectedRoom.name}</span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-charcoal/60">Dates</span>
                    <span className="text-charcoal font-medium">
                      {checkIn || "To be confirmed"} → {checkOut || "To be confirmed"} ({effectiveNights} nights)
                    </span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-charcoal/60">Guests</span>
                    <span className="text-charcoal font-medium">{guestsCount} Guests</span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-charcoal/60">Guest Name</span>
                    <span className="text-charcoal font-medium">{fullName}</span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-charcoal/60">Contact</span>
                    <span className="text-charcoal text-right font-medium">{email} • {phone}</span>
                  </div>
                  {requests && (
                    <div className="p-5 flex justify-between items-start">
                      <span className="text-charcoal/60">Special Notes</span>
                      <span className="text-charcoal max-w-sm text-right font-light">{requests}</span>
                    </div>
                  )}
                  <div className="p-5 flex justify-between items-baseline bg-sand/10">
                    <span className="font-display text-base text-forest">Total Guaranteed</span>
                    <span className="font-display text-2xl text-forest">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("details")}
                    className="text-xs tracking-luxury uppercase text-charcoal/60 hover:text-forest transition-colors"
                  >
                    ← Edit Information
                  </button>
                  <button
                    onClick={() => goTo("payment")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all"
                  >
                    <span>Proceed to Guarantee</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Payment Guarantee */}
            {step === "payment" && selectedRoom && (
              <div className="glass-card p-8 sm:p-10 border border-sand/30 shadow-luxury-md animate-fade-in">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 05
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Reservation Guarantee
                </h2>
                <p className="mt-2 text-charcoal/70 text-sm font-light">
                  A valid card is required to secure your room. No charges will be processed today.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cardName" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                    />
                    {errors.cardName && (
                      <p className="text-xs text-red-600 mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cardNumber" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cardExpiry" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                        Expiry (MM/YY)
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                      />
                      {errors.cardExpiry && (
                        <p className="text-xs text-red-600 mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cardCvc" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                        Security Code (CVC)
                      </label>
                      <input
                        id="cardCvc"
                        type="text"
                        inputMode="numeric"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="789"
                        className="border border-sand/30 bg-cream/70 px-4 py-3.5 text-sm text-charcoal focus:border-forest outline-none transition-colors"
                      />
                      {errors.cardCvc && (
                        <p className="text-xs text-red-600 mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-mist/30 border border-sand/20 text-xs text-charcoal/65 leading-relaxed">
                  🔒 Encrypted Booking Guarantee. Your payment details are safely tokenized and not billed until check-in. Free cancellation up to 48 hours before arrival.
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("review")}
                    className="text-xs tracking-luxury uppercase text-charcoal/60 hover:text-forest transition-colors"
                  >
                    ← Back to Review
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="inline-flex items-center gap-2 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-md hover:shadow-xl"
                  >
                    <span>Confirm &amp; Secure Reservation</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Luxury Reservation Summary Sidebar */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="glass-card p-6 sm:p-7 border border-sand/30 shadow-luxury-float">
              
              <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-semibold block mb-4">
                Reservation Summary
              </span>

              {/* Room Image Preview */}
              {selectedRoom && (
                <div className="relative aspect-[16/10] overflow-hidden bg-forest-dark border border-sand/20 mb-5">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-cream font-display text-base">
                    {selectedRoom.name}
                  </span>
                </div>
              )}

              {/* Booking Parameters */}
              <div className="py-4 border-y border-sand/20 space-y-2.5 text-xs text-charcoal/75">
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Check-In:</span>
                  <span className="font-medium text-forest">{checkIn || "Select date"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Check-Out:</span>
                  <span className="font-medium text-forest">{checkOut || "Select date"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Duration:</span>
                  <span className="font-medium text-forest">{effectiveNights} {effectiveNights === 1 ? "Night" : "Nights"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Guests:</span>
                  <span className="font-medium text-forest">{guestsCount} Guests</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="py-4 border-b border-sand/20 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal/70">
                  <span>₹{roomRate.toLocaleString("en-IN")} × {effectiveNights} night{effectiveNights > 1 ? "s" : ""}</span>
                  <span>₹{roomSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>State &amp; Luxury GST (12%)</span>
                  <span>₹{taxesAndFees.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 flex justify-between items-baseline font-display text-forest text-lg border-t border-sand/15">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Inclusions Check */}
              <div className="pt-4 space-y-2 text-[11px] text-charcoal/65">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Complimentary farm-to-table breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>Complimentary guided birding walk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-dark" />
                  <span>High-speed property Wi-Fi</span>
                </div>
              </div>

              {/* Concierge Callout */}
              <div className="mt-6 pt-4 border-t border-sand/20 text-center text-xs text-charcoal/60">
                <p>Need assistance with dates or groups?</p>
                <a href="tel:+914224001200" className="font-display text-forest hover:text-sand-dark text-sm mt-0.5 inline-block">
                  +91 422 400 1200
                </a>
              </div>

            </div>
          </aside>

        </div>
      )}

    </div>
  );
}
