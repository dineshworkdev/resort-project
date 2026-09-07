import GuestsTable from "@/components/owner/GuestsTable";
import { guests } from "@/data/guests";

export default function OwnerGuestsPage() {
  return (
    <div className="max-w-6xl">
      <p className="text-xs text-charcoal/50">Owner portal</p>
      <h1 className="mt-2 font-display text-3xl text-forest">Guests</h1>
      <p className="mt-3 text-sm text-charcoal/60">
        {guests.length} guest records on file.
      </p>

      <div className="mt-10">
        <GuestsTable guests={guests} />
      </div>
    </div>
  );
}
