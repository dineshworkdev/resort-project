import { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Stay — Deccan Resort",
  description: "Reserve a room or villa at Deccan Resort, Coimbatore.",
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="container-content pt-40 pb-24">Loading…</div>}>
      <BookingFlow />
    </Suspense>
  );
}
