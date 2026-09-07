import { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  Confirmed: "bg-forest/10 text-forest",
  Pending: "bg-sand/20 text-sand-dark",
  "Checked In": "bg-forest text-cream",
  Completed: "bg-charcoal/10 text-charcoal/70",
  Cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}
