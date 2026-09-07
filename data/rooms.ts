import { images } from "@/lib/images";
import { Room } from "@/lib/types";

export const rooms: Room[] = [
  {
    id: "estate-room",
    slug: "estate-room",
    name: "Estate Room",
    tagline: "Garden-facing comfort for two",
    description:
      "Plush comfort overlooking our organic gardens. Perfect for couples.",
    longDescription:
      "The Estate Room sits along the resort's western wing, framed by organic vegetable gardens and a line of native shola trees. Interiors favour warm timber, handwoven textiles and soft, indirect lighting, with a reading nook positioned to catch the early mountain light. It's an ideal base for guests who want quiet comfort within easy reach of the dining terrace and spa.",
    pricePerNight: 8500,
    image: images.rooms.estateRoom,
    gallery: images.rooms.estateRoomGallery,
    occupancy: 2,
    bedType: "1 King Bed",
    size: "420 sq. ft.",
    amenities: [
      "Garden view",
      "Private sit-out",
      "Rainfall shower",
      "Organic cotton linen",
      "In-room fireplace",
      "Complimentary herbal tea service",
    ],
    status: "Available",
  },
  {
    id: "wellness-villa",
    slug: "premium-wellness-villa",
    name: "Premium Wellness Villa",
    tagline: "A private retreat for slow mornings",
    description:
      "Includes a private balcony, open-air shower, and dedicated meditation space.",
    longDescription:
      "Set slightly apart from the main building, the Premium Wellness Villa is built around a private balcony that opens directly onto the valley. An open-air shower and a dedicated meditation deck make it a natural choice for guests visiting for the resort's wellness programme, while the interiors keep the same restrained, materials-led palette found across the property.",
    pricePerNight: 14000,
    image: images.rooms.wellnessVilla,
    gallery: images.rooms.wellnessVillaGallery,
    occupancy: 3,
    bedType: "1 King Bed + Daybed",
    size: "640 sq. ft.",
    amenities: [
      "Valley-facing balcony",
      "Open-air shower",
      "Private meditation deck",
      "In-villa wellness consultation",
      "Soaking tub",
      "Aromatherapy amenities",
    ],
    status: "Limited",
  },
  {
    id: "royal-suite",
    slug: "deccan-royal-suite",
    name: "Deccan Royal Suite",
    tagline: "Our flagship, above the valley",
    description:
      "Our flagship experience. Panoramic valley views, private pool, and 24/7 butler service.",
    longDescription:
      "The Deccan Royal Suite occupies the highest point on the property, with an uninterrupted view across the valley toward the Western Ghats. A private plunge pool, a separate living pavilion and a dedicated butler are reserved exclusively for this suite, making it the resort's most complete expression of privacy and scale.",
    pricePerNight: 25000,
    image: images.rooms.royalSuite,
    gallery: images.rooms.royalSuiteGallery,
    occupancy: 4,
    bedType: "1 King Bed + 1 Queen Bed",
    size: "1,150 sq. ft.",
    amenities: [
      "Panoramic valley views",
      "Private plunge pool",
      "24/7 dedicated butler",
      "Separate living pavilion",
      "In-suite dining",
      "Priority spa scheduling",
    ],
    status: "Available",
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}
