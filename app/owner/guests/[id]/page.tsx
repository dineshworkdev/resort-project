import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/owner/StatusBadge";
import { bookings } from "@/data/bookings";
import { guests } from "@/data/guests";

export function generateStaticParams() {
  return guests.map((g) => ({ id: g.id }));
}

export default function GuestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const guest = guests.find((g) => g.id === params.id);
  if (!guest) notFound();

  const guestBookings = bookings.filter((b) =>
    guest.bookingIds.includes(b.id)
  );

  return (
    <div className="max-w-3xl">
      <Link
        href="/owner/guests"
        className="text-xs text-charcoal/50 hover:text-forest"
      >
        ← Back to guests
      </Link>

      <h1 className="mt-6 font-display text-3xl text-forest">{guest.name}</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        {guest.email} · {guest.phone}
      </p>

      <div className="mt-10 grid grid-cols-3 gap-5">
        <div className="border border-charcoal/10 p-6">
          <p className="text-xs text-charcoal/50">Total stays</p>
          <p className="mt-2 font-display text-2xl text-forest">
            {guest.stays}
          </p>
        </div>
        <div className="border border-charcoal/10 p-6">
          <p className="text-xs text-charcoal/50">Last stay</p>
          <p className="mt-2 font-display text-2xl text-forest">
            {guest.lastStay}
          </p>
        </div>
        <div className="border border-charcoal/10 p-6">
          <p className="text-xs text-charcoal/50">Total spent</p>
          <p className="mt-2 font-display text-2xl text-forest">
            ₹{guest.totalSpent.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl text-forest mb-5">
          Booking history
        </h2>
        <div className="border border-charcoal/10 divide-y divide-charcoal/10">
          {guestBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-charcoal">{booking.roomName}</p>
                <p className="mt-1 text-xs text-charcoal/50">
                  {booking.checkIn} to {booking.checkOut}
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
