import type { Metadata } from "next";
import OwnerSidebar from "@/components/owner/OwnerSidebar";
import OwnerTopbar from "@/components/owner/OwnerTopbar";

export const metadata: Metadata = {
  title: "Owner Portal — Deccan Resort",
  description: "Resort management dashboard for Deccan Resort.",
};

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <OwnerSidebar />
      <div className="flex-1 min-w-0">
        <OwnerTopbar />
        <main className="px-5 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
