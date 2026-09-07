"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Guest } from "@/lib/types";

export default function GuestsTable({ guests }: { guests: Guest[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return guests;
    const q = query.toLowerCase();
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.phone.includes(q)
    );
  }, [guests, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guests by name, email or phone"
        className="w-full sm:max-w-sm border border-charcoal/20 px-4 py-2.5 text-sm focus:border-forest outline-none mb-6"
      />

      {filtered.length === 0 ? (
        <div className="border border-charcoal/10 p-10 text-center">
          <p className="text-sm text-charcoal/60">
            No guests match your search.
          </p>
        </div>
      ) : (
        <div className="border border-charcoal/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="border-b border-charcoal/10 text-left text-xs text-charcoal/50">
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Contact</th>
                <th className="p-4 font-normal">Stays</th>
                <th className="p-4 font-normal">Last stay</th>
                <th className="p-4 font-normal">Total spent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-charcoal/5 last:border-0 hover:bg-mist/50"
                >
                  <td className="p-4">
                    <Link
                      href={`/owner/guests/${guest.id}`}
                      className="text-forest"
                    >
                      {guest.name}
                    </Link>
                  </td>
                  <td className="p-4 text-charcoal/80">
                    {guest.email}
                    <p className="text-xs text-charcoal/40">{guest.phone}</p>
                  </td>
                  <td className="p-4 text-charcoal/80">{guest.stays}</td>
                  <td className="p-4 text-charcoal/80">{guest.lastStay}</td>
                  <td className="p-4 text-charcoal/80">
                    ₹{guest.totalSpent.toLocaleString("en-IN")}
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
