import BookingsTable from "@/components/owner/BookingsTable";
import { bookings } from "@/data/bookings";

export default function OwnerBookingsPage() {
  return (
    <div className="max-w-6xl">
      <p className="text-xs text-charcoal/50">Owner portal</p>
      <h1 className="mt-2 font-display text-3xl text-forest">Bookings</h1>
      <p className="mt-3 text-sm text-charcoal/60">
        {bookings.length} total bookings across all rooms.
      </p>

      <div className="mt-10">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
