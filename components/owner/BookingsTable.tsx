"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Booking, BookingStatus } from "@/lib/types";
import StatusBadge from "./StatusBadge";

const statuses: (BookingStatus | "All")[] = [
  "All",
  "Confirmed",
  "Pending",
  "Checked In",
  "Completed",
  "Cancelled",
];

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = status === "All" || b.status === status;
      const matchesQuery =
        query.trim() === "" ||
        b.guestName.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase()) ||
        b.roomName.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, status]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by guest, booking ID or room"
          className="flex-1 border border-charcoal/20 px-4 py-2.5 text-sm focus:border-forest outline-none"
        />
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as (typeof statuses)[number])
          }
          className="border border-charcoal/20 px-4 py-2.5 text-sm focus:border-forest outline-none"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-charcoal/10 p-10 text-center">
          <p className="text-sm text-charcoal/60">
            No bookings match your search.
          </p>
        </div>
      ) : (
        <div className="border border-charcoal/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-charcoal/10 text-left text-xs text-charcoal/50">
                <th className="p-4 font-normal">Guest</th>
                <th className="p-4 font-normal">Room</th>
                <th className="p-4 font-normal">Check-in</th>
                <th className="p-4 font-normal">Check-out</th>
                <th className="p-4 font-normal">Guests</th>
                <th className="p-4 font-normal">Amount</th>
                <th className="p-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-charcoal/5 last:border-0 hover:bg-mist/50"
                >
                  <td className="p-4">
                    <Link
                      href={`/owner/bookings/${booking.id}`}
                      className="text-forest"
                    >
                      {booking.guestName}
                    </Link>
                    <p className="text-xs text-charcoal/40">{booking.id}</p>
                  </td>
                  <td className="p-4 text-charcoal/80">{booking.roomName}</td>
                  <td className="p-4 text-charcoal/80">{booking.checkIn}</td>
                  <td className="p-4 text-charcoal/80">{booking.checkOut}</td>
                  <td className="p-4 text-charcoal/80">{booking.guests}</td>
                  <td className="p-4 text-charcoal/80">
                    ₹{booking.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
