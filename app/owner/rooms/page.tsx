import Image from "next/image";
import { rooms } from "@/data/rooms";

export default function OwnerRoomsPage() {
  return (
    <div className="max-w-6xl">
      <p className="text-xs text-charcoal/50">Owner portal</p>
      <h1 className="mt-2 font-display text-3xl text-forest">Rooms</h1>
      <p className="mt-3 text-sm text-charcoal/60">
        {rooms.length} room categories configured.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border border-charcoal/10 flex flex-col md:flex-row"
          >
            <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(min-width: 768px) 256px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-1">
                <h2 className="font-display text-lg text-forest">
                  {room.name}
                </h2>
                <p className="mt-1 text-xs text-charcoal/50">
                  {room.occupancy} guests · {room.bedType}
                </p>
                <p className="mt-3 text-xs px-3 py-1 bg-mist inline-block text-charcoal/70">
                  {room.status}
                </p>
              </div>

              <div className="sm:col-span-1">
                <p className="text-xs text-charcoal/50">Rate</p>
                <p className="mt-1 font-display text-lg text-forest">
                  ₹{room.pricePerNight.toLocaleString("en-IN")}
                  <span className="text-xs text-charcoal/50 font-body">
                    {" "}
                    / night
                  </span>
                </p>
                <p className="mt-3 text-xs text-charcoal/50">Size</p>
                <p className="mt-1 text-sm text-charcoal/80">{room.size}</p>
              </div>

              <div className="sm:col-span-1 flex flex-col gap-3">
                <button className="px-5 py-2.5 border border-charcoal/15 text-sm text-charcoal hover:border-forest hover:text-forest transition-colors duration-200">
                  Edit room details
                </button>
                <button className="px-5 py-2.5 border border-charcoal/15 text-sm text-charcoal hover:border-forest hover:text-forest transition-colors duration-200">
                  Update availability
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
