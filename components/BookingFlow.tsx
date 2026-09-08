"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { rooms } from "@/data/rooms";
import { Room } from "@/lib/types";
import Logo from "./Logo";

type Step = "dates" | "room" | "details" | "review" | "request" | "confirmation";

const steps: { id: Step; label: string }[] = [
  { id: "dates", label: "Dates & Guests" },
  { id: "room", label: "Select Room" },
  { id: "details", label: "Guest Details" },
  { id: "review", label: "Reservation Summary" },
  { id: "request", label: "Reservation Request" },
];

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = outDate.getTime() - inDate.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

async function generateReservationPDF(data: {
  confirmationId: string;
  fullName: string;
  email: string;
  phone: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  roomSubtotal: number;
  taxesAndFees: number;
  total: number;
  requests: string;
}) {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = 210;
  const margin = 18;
  const contentW = pageW - margin * 2;

  // ── Forest green header band ──────────────────────────────────────────────
  doc.setFillColor(27, 59, 43);
  doc.rect(0, 0, pageW, 42, "F");

  // Resort name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(226, 203, 174); // sand-light
  doc.text("DECCAN RESORT", margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 162, 123); // sand
  doc.text("FOOTHILLS OF THE WESTERN GHATS, COIMBATORE", margin, 25);

  // Reference number — right-aligned in header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(226, 203, 174);
  doc.text("BOOKING REFERENCE", pageW - margin, 14, { align: "right" });
  doc.setFontSize(18);
  doc.text(data.confirmationId, pageW - margin, 25, { align: "right" });

  // Status badge
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(173, 133, 96); // sand-dark
  doc.text("RESERVATION REQUEST RECEIVED", pageW - margin, 33, { align: "right" });

  // ── Sub-header: date issued ───────────────────────────────────────────────
  doc.setFillColor(243, 237, 228);
  doc.rect(0, 42, pageW, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(85, 85, 85);
  const issued = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Issued: ${issued}`, margin, 50);
  doc.text("This is a reservation request, not a confirmed booking.", pageW - margin, 50, { align: "right" });

  let y = 62;

  // ── Section helper ────────────────────────────────────────────────────────
  function sectionTitle(label: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(173, 133, 96);
    doc.text(label.toUpperCase(), margin, y);
    y += 1;
    doc.setDrawColor(200, 162, 123);
    doc.setLineWidth(0.3);
    doc.line(margin, y + 1, margin + contentW, y + 1);
    y += 6;
    doc.setTextColor(34, 34, 34);
  }

  function row(label: string, value: string, bold = false) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(label, margin, y);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(9);
    doc.setTextColor(27, 59, 43);
    doc.text(value, margin + contentW, y, { align: "right" });
    y += 7;
  }

  // ── GUEST DETAILS ─────────────────────────────────────────────────────────
  sectionTitle("Guest Details");
  row("Primary Guest", data.fullName, true);
  row("Email", data.email);
  row("Phone", data.phone);
  if (data.requests) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Special Requests", margin, y);
    doc.setTextColor(34, 34, 34);
    const lines = doc.splitTextToSize(data.requests, contentW - 45);
    doc.text(lines, margin + contentW, y, { align: "right" });
    y += lines.length * 5 + 3;
  }
  y += 4;

  // ── STAY DETAILS ──────────────────────────────────────────────────────────
  sectionTitle("Stay Details");
  row("Residence", data.room.name, true);
  row("Room Type", `${data.room.bedType} · ${data.room.size}`);
  row("Check-In", formatDate(data.checkIn), true);
  row("Check-Out", formatDate(data.checkOut), true);
  row("Duration", `${data.nights} Night${data.nights !== 1 ? "s" : ""}`);
  row("Party Size", `${data.guests} Guest${Number(data.guests) !== 1 ? "s" : ""}`);
  y += 4;

  // ── PRICING BREAKDOWN ─────────────────────────────────────────────────────
  sectionTitle("Estimated Pricing");
  row(
    `₹${data.room.pricePerNight.toLocaleString("en-IN")} × ${data.nights} night${data.nights !== 1 ? "s" : ""}`,
    `₹${data.roomSubtotal.toLocaleString("en-IN")}`
  );
  row("State & Luxury GST (12%)", `₹${data.taxesAndFees.toLocaleString("en-IN")}`);

  // Total row with background
  y += 1;
  doc.setFillColor(241, 236, 226);
  doc.roundedRect(margin, y - 4, contentW, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(27, 59, 43);
  doc.text("Estimated Total", margin + 4, y + 4);
  doc.text(`₹${data.total.toLocaleString("en-IN")}`, margin + contentW - 4, y + 4, { align: "right" });
  y += 18;

  // ── INCLUDED PRIVILEGES ───────────────────────────────────────────────────
  sectionTitle("Included Privileges");
  const privileges = [
    "Daily farm-to-table estate breakfast on the dining terrace",
    "Welcome Ayurvedic botanical elixir upon arrival",
    "Guided morning shola nature walk with resident naturalist",
    "High-speed property-wide Wi-Fi and direct host coordination",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(34, 34, 34);
  for (const p of privileges) {
    doc.text(`·  ${p}`, margin + 2, y);
    y += 6;
  }
  y += 4;

  // ── IMPORTANT NOTICE ─────────────────────────────────────────────────────
  doc.setFillColor(253, 251, 247);
  doc.setDrawColor(200, 162, 123);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentW, 20, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(173, 133, 96);
  doc.text("IMPORTANT NOTICE", margin + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(85, 85, 85);
  doc.text(
    "This document confirms your reservation request only. Payment will be arranged",
    margin + 4,
    y + 13
  );
  doc.text("with the resort team directly after availability is confirmed.", margin + 4, y + 18);
  y += 26;

  // ── FOOTER ────────────────────────────────────────────────────────────────
  doc.setFillColor(27, 59, 43);
  doc.rect(0, 277, pageW, 20, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 162, 123);
  doc.text("Concierge: +91 422 400 1200", margin, 288);
  doc.text("Foothills of the Western Ghats, Coimbatore, Tamil Nadu", pageW / 2, 288, { align: "center" });
  doc.text("deccanresort.in", pageW - margin, 288, { align: "right" });

  // Download
  doc.save(`Deccan-Resort-${data.confirmationId}.pdf`);
}

export default function BookingFlow() {
  const searchParams = useSearchParams();

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [step, setStep] = useState<Step>("dates");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const [guestsCount, setGuestsCount] = useState(searchParams.get("guests") ?? "2");

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(() => {
    const roomId = searchParams.get("room");
    return rooms.find((r) => r.id === roomId) ?? rooms[0];
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  const [confirmationId, setConfirmationId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const effectiveNights = Math.max(nights, 1);
  const roomRate = selectedRoom ? selectedRoom.pricePerNight : 0;
  const roomSubtotal = roomRate * effectiveNights;
  const taxesAndFees = Math.round(roomSubtotal * 0.12);
  const total = roomSubtotal + taxesAndFees;

  const currentIndex = steps.findIndex((s) => s.id === step);

  function validateDates() {
    const next: Record<string, string> = {};
    if (!checkIn) next.checkIn = "Select an arrival date.";
    if (!checkOut) next.checkOut = "Select a departure date.";
    if (checkIn && checkOut && nightsBetween(checkIn, checkOut) <= 0) {
      next.checkOut = "Departure date must follow arrival.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateDetails() {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Enter the primary guest's full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone)) next.phone = "Enter a valid mobile contact number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goTo(next: Step) {
    setErrors({});
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleCheckDatesAndProceed() {
    if (!validateDates()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      goTo("room");
    }, 450);
  }

  function handleSubmitReservationRequest() {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const id = `DR-${Math.floor(10000 + Math.random() * 89999)}`;
      setConfirmationId(id);
      goTo("confirmation");
    }, 600);
  }

  const handleDownloadPDF = useCallback(async () => {
    if (!selectedRoom || !confirmationId) return;
    setIsGeneratingPDF(true);
    try {
      await generateReservationPDF({
        confirmationId,
        fullName: fullName || "Primary Guest",
        email,
        phone,
        room: selectedRoom,
        checkIn,
        checkOut,
        nights: effectiveNights,
        guests: guestsCount,
        roomSubtotal,
        taxesAndFees,
        total,
        requests,
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [selectedRoom, confirmationId, fullName, email, phone, checkIn, checkOut, effectiveNights, guestsCount, roomSubtotal, taxesAndFees, total, requests]);

  return (
    <div className="container-content pt-36 pb-28">
      {/* Step Timeline */}
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
            <div className="flex items-center gap-2 text-xs text-charcoal/60 bg-sand/10 px-3 py-1.5 rounded-full border border-sand/20">
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
                            ? "bg-sand text-forest-deep font-bold"
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

      {/* ── Confirmation Screen ───────────────────────────────────────────── */}
      {step === "confirmation" && selectedRoom ? (
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* Status Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-full bg-sand/15 text-sand-dark flex items-center justify-center mx-auto mb-5 border border-sand/35">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
              Reservation Request Received
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-forest leading-tight">
              Thank you, {fullName ? fullName.split(" ")[0] : "valued guest"}
            </h1>
            <p className="mt-3 text-charcoal/65 text-sm font-light max-w-md mx-auto leading-relaxed">
              Your reservation request has been received. The resort team will review availability and be in touch at{" "}
              <span className="font-medium text-forest">{email || "your email"}</span> to confirm your stay and arrange payment.
            </p>
          </div>

          {/* Reservation Folio Card */}
          <div className="bg-cream border border-sand/30 overflow-hidden rounded-xl">
            {/* Card Header */}
            <div className="bg-forest-deep px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div>
                <Logo variant="footer" />
                <p className="text-[10px] tracking-ultra uppercase text-sand/70 font-medium mt-3">
                  Reservation Request
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-[9px] tracking-ultra uppercase text-sand/60 font-medium">
                  Booking Reference
                </p>
                <p className="font-display text-2xl sm:text-3xl text-sand-light mt-1 tracking-widest">
                  {confirmationId}
                </p>
                <p className="text-[10px] text-cream/55 mt-1.5 font-light">
                  {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Main Details Grid */}
            <div className="p-6 sm:p-8 space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 pb-6 border-b border-sand/20">
                <div>
                  <span className="text-[9px] tracking-ultra uppercase text-charcoal/40 block mb-1">Residence</span>
                  <p className="font-display text-lg text-forest leading-snug">{selectedRoom.name}</p>
                  <p className="text-xs text-charcoal/55 mt-0.5">{selectedRoom.bedType}</p>
                </div>
                <div>
                  <span className="text-[9px] tracking-ultra uppercase text-charcoal/40 block mb-1">Dates</span>
                  <p className="font-display text-base text-forest leading-snug">
                    {formatDate(checkIn)}
                  </p>
                  <p className="font-display text-base text-forest">
                    — {formatDate(checkOut)}
                  </p>
                  <p className="text-xs text-charcoal/55 mt-0.5">{effectiveNights} {effectiveNights === 1 ? "Night" : "Nights"}</p>
                </div>
                <div>
                  <span className="text-[9px] tracking-ultra uppercase text-charcoal/40 block mb-1">Party</span>
                  <p className="font-display text-lg text-forest leading-snug">{guestsCount} {Number(guestsCount) === 1 ? "Guest" : "Guests"}</p>
                  <p className="text-xs text-charcoal/55 mt-0.5">{fullName}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-charcoal/60">
                  <span>₹{roomRate.toLocaleString("en-IN")} × {effectiveNights} night{effectiveNights > 1 ? "s" : ""}</span>
                  <span>₹{roomSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>State & Luxury GST (12%)</span>
                  <span>₹{taxesAndFees.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-sand/20">
                  <span className="text-sm text-charcoal/75">Estimated Total</span>
                  <span className="font-display text-2xl text-forest">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="bg-mist/40 border border-sand/20 rounded-lg p-5 space-y-2">
                <p className="text-[9px] tracking-ultra uppercase text-forest font-semibold mb-3">
                  Included Privileges
                </p>
                {[
                  "Daily farm-to-table estate breakfast on the dining terrace",
                  "Welcome Ayurvedic botanical elixir upon arrival",
                  "Guided morning shola nature walk with resident naturalist",
                  "High-speed property-wide Wi-Fi and direct host coordination",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-2.5 text-xs text-charcoal/65">
                    <span className="w-1 h-1 rounded-full bg-sand-dark mt-1.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              {/* Payment Notice */}
              <div className="border border-sand/25 rounded-lg p-4 text-xs text-charcoal/60 leading-relaxed bg-sand/5">
                <span className="font-medium text-charcoal/80 block mb-1">About payment</span>
                Payment details will be arranged with the resort team directly after your availability is confirmed. No payment has been taken at this stage.
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 sm:px-8 py-5 bg-sand/10 border-t border-sand/20 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-charcoal/55">
                Concierge:{" "}
                <a href="tel:+914224001200" className="text-forest hover:text-sand-dark transition-colors underline underline-offset-2">
                  +91 422 400 1200
                </a>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-sand/40 text-forest text-xs tracking-luxury uppercase font-medium hover:bg-sand/15 transition-colors rounded-lg disabled:opacity-60"
                >
                  {isGeneratingPDF ? (
                    <span>Generating…</span>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-colors rounded-lg"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Two-Column Form & Summary Layout ──────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Main Form Column */}
          <div className="lg:col-span-8">

            {/* ── Step 1: Dates & Guests ── */}
            {step === "dates" && (
              <div className="bg-cream border border-sand/25 p-8 sm:p-10 shadow-luxury-md animate-fade-in rounded-xl">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 01
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Choose your retreat dates
                </h2>
                <p className="mt-2 text-charcoal/65 text-sm font-light">
                  Select your arrival and departure dates to verify residence availability.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="checkIn" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Arrival Date
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && e.target.value >= checkOut) {
                          setCheckOut("");
                        }
                      }}
                      className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all cursor-pointer rounded-lg"
                    />
                    {errors.checkIn && (
                      <p className="text-xs text-red-700 mt-0.5">{errors.checkIn}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="checkOut" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Departure Date
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all cursor-pointer rounded-lg"
                    />
                    {errors.checkOut && (
                      <p className="text-xs text-red-700 mt-0.5">{errors.checkOut}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                  <label htmlFor="guests" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                    Party Size
                  </label>
                  <select
                    id="guests"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all cursor-pointer rounded-lg"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {Number(guestsCount) > 4 && (
                    <p className="text-xs text-sand-dark mt-1 font-light">
                      For parties over 4 guests, reserving multiple residences or the Deccan Royal Suite is recommended.
                    </p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex justify-end">
                  <button
                    disabled={isVerifying}
                    onClick={handleCheckDatesAndProceed}
                    className="inline-flex items-center gap-3 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm hover:shadow-md disabled:opacity-60 rounded-lg"
                  >
                    {isVerifying ? (
                      <span>Checking availability…</span>
                    ) : (
                      <>
                        <span>View Available Rooms</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Select Room ── */}
            {step === "room" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                    Step 02
                  </span>
                  <h2 className="font-display text-3xl text-forest tracking-tight">
                    Select your room
                  </h2>
                  <p className="mt-2 text-charcoal/65 text-sm font-light">
                    Choose the room or residence best suited for your party and desired degree of seclusion.
                  </p>
                </div>

                <div className="space-y-5">
                  {rooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`group cursor-pointer bg-cream border transition-all duration-300 p-5 sm:p-6 flex flex-col md:flex-row gap-6 rounded-xl ${
                          isSelected
                            ? "border-forest shadow-luxury-md ring-1 ring-forest/30"
                            : "border-sand/25 hover:border-sand/60 hover:shadow-luxury"
                        }`}
                      >
                        <div className="relative w-full md:w-60 h-44 md:h-auto shrink-0 overflow-hidden bg-forest-dark border border-sand/15 rounded-lg">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            sizes="(min-width: 768px) 240px, 100vw"
                            className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-display text-xl text-forest">
                                {room.name}
                              </h3>
                              <span className={`text-[10px] px-2 py-0.5 border rounded-full shrink-0 font-medium tracking-wider uppercase ${
                                room.status === "Limited"
                                  ? "bg-sand/10 text-sand-dark border-sand/30"
                                  : "bg-mist/50 text-charcoal/55 border-sand/20"
                              }`}>
                                {room.status}
                              </span>
                            </div>

                            <p className="text-xs text-charcoal/55 mt-1 font-light">
                              Up to {room.occupancy} guests · {room.bedType} · {room.size}
                            </p>

                            <p className="mt-3 text-sm text-charcoal/70 leading-relaxed font-light">
                              {room.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {room.amenities.slice(0, 3).map((a) => (
                                <span key={a} className="text-[11px] bg-sand/10 text-forest px-2.5 py-1 rounded-md border border-sand/15">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-sand/15 flex items-center justify-between">
                            <div>
                              <span className="font-display text-xl text-forest">
                                ₹{room.pricePerNight.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-charcoal/45 font-body ml-1">/ night</span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room);
                                goTo("details");
                              }}
                              className={`px-5 py-2 text-xs tracking-luxury uppercase font-medium transition-colors rounded-lg ${
                                isSelected
                                  ? "bg-forest text-cream hover:bg-forest-dark"
                                  : "bg-sand/20 text-forest hover:bg-sand/40"
                              }`}
                            >
                              {isSelected ? "Selected ✓" : "Choose"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => goTo("dates")}
                    className="text-xs tracking-luxury uppercase text-charcoal/55 hover:text-forest transition-colors"
                  >
                    ← Change Dates
                  </button>
                  <button
                    onClick={() => goTo("details")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm rounded-lg"
                  >
                    <span>Proceed with Guest Details</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Guest Details ── */}
            {step === "details" && selectedRoom && (
              <div className="bg-cream border border-sand/25 p-8 sm:p-10 shadow-luxury-md animate-fade-in rounded-xl">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 03
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Guest Information
                </h2>
                <p className="mt-2 text-charcoal/65 text-sm font-light">
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
                      className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all rounded-lg"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-700 mt-0.5">{errors.fullName}</p>
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
                        className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all rounded-lg"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-700 mt-0.5">{errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                        Mobile Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all rounded-lg"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-700 mt-0.5">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="requests" className="text-xs tracking-wider uppercase text-sand-dark font-medium">
                      Special Requests & Dietary Preferences{" "}
                      <span className="text-charcoal/40 normal-case font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="requests"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      rows={4}
                      placeholder="Dietary restrictions, approximate arrival time, special celebrations…"
                      className="border border-sand/30 bg-cream px-4 py-3.5 text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all resize-none rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("room")}
                    className="text-xs tracking-luxury uppercase text-charcoal/55 hover:text-forest transition-colors"
                  >
                    ← Back to Rooms
                  </button>
                  <button
                    onClick={() => validateDetails() && goTo("review")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm rounded-lg"
                  >
                    <span>Proceed to Reservation Summary</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 4: Reservation Summary ── */}
            {step === "review" && selectedRoom && (
              <div className="bg-cream border border-sand/25 p-8 sm:p-10 shadow-luxury-md animate-fade-in rounded-xl">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 04
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Reservation Summary
                </h2>
                <p className="mt-2 text-charcoal/65 text-sm font-light">
                  Please review your stay parameters and guest details before proceeding to submit your reservation request.
                </p>

                <div className="mt-8 border border-sand/20 divide-y divide-sand/15 bg-cream text-sm rounded-lg overflow-hidden">
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Residence</span>
                    <span className="font-display text-base text-forest">{selectedRoom.name}</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Check-In</span>
                    <span className="text-charcoal font-medium">{formatDate(checkIn)}</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Check-Out</span>
                    <span className="text-charcoal font-medium">{formatDate(checkOut)}</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Duration</span>
                    <span className="text-charcoal font-medium">{effectiveNights} Night{effectiveNights !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Party Size</span>
                    <span className="text-charcoal font-medium">{guestsCount} Guests</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Guest Name</span>
                    <span className="text-charcoal font-medium">{fullName}</span>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-charcoal/55">Contact</span>
                    <span className="text-charcoal text-right font-medium">{email} · {phone}</span>
                  </div>
                  {requests && (
                    <div className="px-5 py-4 flex justify-between items-start gap-6">
                      <span className="text-charcoal/55 shrink-0">Special Notes</span>
                      <span className="text-charcoal text-right font-light max-w-xs">{requests}</span>
                    </div>
                  )}
                  <div className="px-5 py-4 flex justify-between items-baseline bg-sand/8">
                    <span className="text-charcoal/70">Estimated Total</span>
                    <span className="font-display text-xl text-forest">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("details")}
                    className="text-xs tracking-luxury uppercase text-charcoal/55 hover:text-forest transition-colors"
                  >
                    ← Edit Information
                  </button>
                  <button
                    onClick={() => goTo("request")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm rounded-lg"
                  >
                    <span>Continue to Reservation Request</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 5: Reservation Request ── */}
            {step === "request" && selectedRoom && (
              <div className="bg-cream border border-sand/25 p-8 sm:p-10 shadow-luxury-md animate-fade-in rounded-xl">
                <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-medium block mb-2">
                  Step 05
                </span>
                <h2 className="font-display text-3xl text-forest tracking-tight">
                  Reservation Request
                </h2>
                <p className="mt-3 text-charcoal/65 text-sm font-light leading-relaxed">
                  Your reservation request will be reviewed by the resort team. No payment is required at this stage.
                </p>

                {/* Summary recap */}
                <div className="mt-8 border border-sand/20 rounded-lg overflow-hidden">
                  <div className="bg-sand/8 px-5 py-3 border-b border-sand/20">
                    <p className="text-[10px] tracking-ultra uppercase text-charcoal/45 font-medium">Reservation Summary</p>
                  </div>
                  <div className="divide-y divide-sand/15 text-sm">
                    <div className="px-5 py-3.5 flex justify-between">
                      <span className="text-charcoal/55">Residence</span>
                      <span className="font-display text-forest">{selectedRoom.name}</span>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between">
                      <span className="text-charcoal/55">Check-In</span>
                      <span className="text-charcoal font-medium">{formatDate(checkIn)}</span>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between">
                      <span className="text-charcoal/55">Check-Out</span>
                      <span className="text-charcoal font-medium">{formatDate(checkOut)}</span>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between">
                      <span className="text-charcoal/55">Guests</span>
                      <span className="text-charcoal font-medium">{guestsCount} {Number(guestsCount) === 1 ? "Guest" : "Guests"} · {effectiveNights} Night{effectiveNights !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between items-baseline bg-sand/5">
                      <span className="text-charcoal/70">Estimated Total</span>
                      <span className="font-display text-xl text-forest">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* Payment notice */}
                <div className="mt-6 p-4 border border-sand/25 rounded-lg bg-mist/30 text-xs text-charcoal/60 leading-relaxed">
                  <span className="font-medium text-charcoal/75 block mb-1">How payment works</span>
                  Payment details will be arranged with the resort team directly after your availability is confirmed. We do not collect payment information through this form.
                </div>

                <div className="mt-10 pt-6 border-t border-sand/20 flex items-center justify-between">
                  <button
                    onClick={() => goTo("review")}
                    className="text-xs tracking-luxury uppercase text-charcoal/55 hover:text-forest transition-colors"
                  >
                    ← Back to Review
                  </button>
                  <button
                    disabled={isVerifying}
                    onClick={handleSubmitReservationRequest}
                    className="inline-flex items-center gap-2 px-9 py-4 bg-forest text-cream text-xs tracking-luxury uppercase font-medium hover:bg-forest-dark transition-all shadow-sm hover:shadow-md disabled:opacity-60 rounded-lg"
                  >
                    {isVerifying ? (
                      <span>Submitting request…</span>
                    ) : (
                      <>
                        <span>Confirm Reservation Request</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ── Sticky Reservation Summary Sidebar ── */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="bg-cream border border-sand/25 p-6 sm:p-7 shadow-luxury-float rounded-xl">

              <span className="text-[10px] tracking-ultra uppercase text-sand-dark font-semibold block mb-4">
                Reservation Summary
              </span>

              {/* Room image preview */}
              {selectedRoom && (
                <div className="relative aspect-[16/10] overflow-hidden bg-forest-dark border border-sand/15 mb-5 rounded-lg">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-cream font-display text-sm">
                    {selectedRoom.name}
                  </span>
                </div>
              )}

              {/* Booking parameters */}
              <div className="py-4 border-y border-sand/15 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Check-In</span>
                  <span className="font-medium text-forest">{checkIn ? formatDate(checkIn) : "Select date"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Check-Out</span>
                  <span className="font-medium text-forest">{checkOut ? formatDate(checkOut) : "Select date"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Duration</span>
                  <span className="font-medium text-forest">{effectiveNights} {effectiveNights === 1 ? "Night" : "Nights"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Party Size</span>
                  <span className="font-medium text-forest">{guestsCount} {Number(guestsCount) === 1 ? "Guest" : "Guests"}</span>
                </div>
              </div>

              {/* Price calculation */}
              <div className="py-4 border-b border-sand/15 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal/60">
                  <span>₹{roomRate.toLocaleString("en-IN")} × {effectiveNights} night{effectiveNights > 1 ? "s" : ""}</span>
                  <span>₹{roomSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>State & Luxury GST (12%)</span>
                  <span>₹{taxesAndFees.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 flex justify-between items-baseline font-display text-forest text-base border-t border-sand/10">
                  <span>Estimated Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="pt-4 space-y-2 text-[11px] text-charcoal/60">
                {[
                  "Complimentary estate breakfast",
                  "Guided morning birding walk",
                  "High-speed property Wi-Fi",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-sand-dark shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Concierge */}
              <div className="mt-6 pt-4 border-t border-sand/15 text-center text-xs text-charcoal/55">
                <p>Need assistance?</p>
                <a href="tel:+914224001200" className="font-display text-forest hover:text-sand-dark text-sm mt-0.5 inline-block transition-colors">
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
