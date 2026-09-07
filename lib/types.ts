export type RoomId = "estate-room" | "wellness-villa" | "royal-suite";

export interface Room {
  id: RoomId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  image: string;
  gallery: string[];
  occupancy: number;
  bedType: string;
  size: string;
  amenities: string[];
  status: "Available" | "Limited" | "Fully Booked";
}

export type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Checked In"
  | "Completed"
  | "Cancelled";

export interface Booking {
  id: string;
  guestName: string;
  roomId: RoomId;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: BookingStatus;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  stays: number;
  lastStay: string;
  totalSpent: number;
  bookingIds: string[];
}
