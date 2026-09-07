import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/owner/StatusBadge";
import { bookings } from "@/data/bookings";

export function generateStaticParams() {
  return bookings.map((b) => ({ id: b.id }));
}

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = bookings.find((b) => b.id === params.id);
  if (!booking) notFound();

  const nights = Math.max(
    1,
    Math.round(
      (new Date(booking.checkOut).getTime() -
        new Date(booking.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="max-w-3xl">
      <Link
        href="/owner/bookings"
        className="text-xs text-charcoal/50 hover:text-forest"
      >
        ← Back to bookings
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-charcoal/50">{booking.id}</p>
          <h1 className="mt-2 font-display text-3xl text-forest">
            {booking.guestName}
          </h1>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-10 border border-charcoal/10 divide-y divide-charcoal/10">
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Room</span>
          <span className="text-charcoal">{booking.roomName}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Check-in</span>
          <span className="text-charcoal">{booking.checkIn}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Check-out</span>
          <span className="text-charcoal">{booking.checkOut}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Nights</span>
          <span className="text-charcoal">{nights}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Guests</span>
          <span className="text-charcoal">{booking.guests}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Email</span>
          <span className="text-charcoal">{booking.email}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Phone</span>
          <span className="text-charcoal">{booking.phone}</span>
        </div>
        <div className="p-6 flex justify-between text-sm">
          <span className="text-charcoal/60">Booked on</span>
          <span className="text-charcoal">{booking.createdAt}</span>
        </div>
        <div className="p-6 flex justify-between text-base font-display text-forest">
          <span>Amount</span>
          <span>₹{booking.amount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
