interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export default function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="border border-charcoal/10 bg-cream p-6">
      <p className="text-xs text-charcoal/50">{label}</p>
      <p className="mt-3 font-display text-3xl text-forest">{value}</p>
      {helper && <p className="mt-2 text-xs text-charcoal/50">{helper}</p>}
    </div>
  );
}
