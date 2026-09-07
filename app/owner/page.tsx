import Link from "next/link";
import StatCard from "@/components/owner/StatCard";
import StatusBadge from "@/components/owner/StatusBadge";
import { bookings } from "@/data/bookings";
import { guests } from "@/data/guests";
import { rooms } from "@/data/rooms";

export default function OwnerDashboardPage() {
  const upcoming = [...bookings]
    .filter((b) => b.status === "Confirmed" || b.status === "Pending")
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))
    .slice(0, 5);

  const recentGuests = [...guests]
    .sort((a, b) => b.lastStay.localeCompare(a.lastStay))
    .slice(0, 5);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-charcoal/50">Owner portal</p>
          <h1 className="mt-2 font-display text-3xl text-forest">Dashboard</h1>
        </div>
        <Link
          href="/owner/bookings"
          className="text-sm text-forest border-b border-forest pb-0.5 shrink-0"
        >
          View all bookings
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Direct Occupancy Rate"
          value="78%"
          helper="Rooms occupied via direct bookings"
        />
        <StatCard
          label="Gross Monthly Revenue"
          value="₹8,42,000"
          helper="Current calendar month"
        />
        <StatCard
          label="OTA Commissions Saved"
          value="₹1,26,300"
          helper="Vs. third-party booking channels"
        />
        <StatCard label="Bookings" value="24" helper="Active this month" />
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-forest">
              Upcoming bookings
            </h2>
            <Link
              href="/owner/bookings"
              className="text-xs text-charcoal/50 hover:text-forest"
            >
              View all
            </Link>
          </div>

          <div className="border border-charcoal/10 divide-y divide-charcoal/10">
            {upcoming.map((booking) => (
              <div
                key={booking.id}
                className="p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm text-charcoal">{booking.guestName}</p>
                  <p className="mt-1 text-xs text-charcoal/50">
                    {booking.roomName} · {booking.checkIn} to {booking.checkOut}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-forest">
              Recent guests
            </h2>
            <Link
              href="/owner/guests"
              className="text-xs text-charcoal/50 hover:text-forest"
            >
              View all
            </Link>
          </div>

          <div className="border border-charcoal/10 divide-y divide-charcoal/10">
            {recentGuests.map((guest) => (
              <div key={guest.id} className="p-5">
                <p className="text-sm text-charcoal">{guest.name}</p>
                <p className="mt-1 text-xs text-charcoal/50">
                  Last stay {guest.lastStay} · {guest.stays}{" "}
                  {guest.stays === 1 ? "stay" : "stays"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl text-forest mb-5">
          Room availability
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <div key={room.id} className="border border-charcoal/10 p-6">
              <p className="text-sm text-charcoal">{room.name}</p>
              <p className="mt-2 text-xs text-charcoal/50">{room.status}</p>
              <p className="mt-4 font-display text-lg text-forest">
                ₹{room.pricePerNight.toLocaleString("en-IN")}
                <span className="text-xs text-charcoal/50 font-body"> / night</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl text-forest mb-5">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/owner/bookings"
            className="px-6 py-3 border border-charcoal/15 text-sm text-charcoal hover:border-forest hover:text-forest transition-colors duration-200"
          >
            Review pending bookings
          </Link>
          <Link
            href="/owner/rooms"
            className="px-6 py-3 border border-charcoal/15 text-sm text-charcoal hover:border-forest hover:text-forest transition-colors duration-200"
          >
            Update room availability
          </Link>
          <Link
            href="/owner/guests"
            className="px-6 py-3 border border-charcoal/15 text-sm text-charcoal hover:border-forest hover:text-forest transition-colors duration-200"
          >
            Browse guest records
          </Link>
        </div>
      </div>
    </div>
  );
}
