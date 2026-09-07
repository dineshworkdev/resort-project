"use client";

import { useState } from "react";

export default function OwnerSettingsPage() {
  const [resortName, setResortName] = useState("Deccan Resort");
  const [email, setEmail] = useState("reservations@deccanresort.in");
  const [phone, setPhone] = useState("+91 422 400 1200");
  const [address, setAddress] = useState(
    "Foothills of the Western Ghats, Coimbatore, Tamil Nadu"
  );
  const [notifyBookings, setNotifyBookings] = useState(true);
  const [notifyCancellations, setNotifyCancellations] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <p className="text-xs text-charcoal/50">Owner portal</p>
      <h1 className="mt-2 font-display text-3xl text-forest">Settings</h1>
      <p className="mt-3 text-sm text-charcoal/60">
        Manage resort profile details and notification preferences.
      </p>

      <form onSubmit={handleSave} className="mt-10 flex flex-col gap-8">
        <div>
          <h2 className="font-display text-lg text-forest mb-5">
            Resort profile
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="resortName" className="text-sm text-charcoal/70">
                Resort name
              </label>
              <input
                id="resortName"
                type="text"
                value={resortName}
                onChange={(e) => setResortName(e.target.value)}
                className="border border-charcoal/20 px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-charcoal/70">
                Reservations email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-charcoal/20 px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm text-charcoal/70">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-charcoal/20 px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-sm text-charcoal/70">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="border border-charcoal/20 px-4 py-3 text-sm focus:border-forest outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-forest mb-5">
            Notifications
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={notifyBookings}
                onChange={(e) => setNotifyBookings(e.target.checked)}
                className="accent-forest"
              />
              Email me when a new booking is made
            </label>
            <label className="flex items-center gap-3 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={notifyCancellations}
                onChange={(e) => setNotifyCancellations(e.target.checked)}
                className="accent-forest"
              />
              Email me when a booking is cancelled
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-3.5 bg-forest text-cream text-sm hover:bg-forest-dark transition-colors duration-200"
          >
            Save changes
          </button>
          {saved && (
            <p className="text-sm text-forest">Settings saved.</p>
          )}
        </div>
      </form>
    </div>
  );
}
