export interface Product {
  // MongoDB style
  _id?: string;
  // Local style (backward compatible)
  id?: number | string;

  title: string;
  game: string;
  category: "free-fire" | "standoff-2" | "cs2" | "roblox" | "other";
  price: number;
  priceLabel: string;
  features: string[];
  badge?: "best" | "new" | null;
  status: string;
  version: string;
  compatibility: string;
  delivery: string;
  description: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Staff {
  name: string;
  role: string;
  initials: string;
  online: boolean;
  wa: string;
  avatar?: string;
}

export interface Testimonial {
  name: string;
  initials: string;
  stars: number;
  text: string;
  image?: string;
}

export interface Order {
  orderId: string;
  product: string;
  paymentStatus: "PENDING" | "PAID" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  deliveryStatus: string;
  purchaseDate: string;
  customer: string;
  whatsapp: string;
  email: string;
  total: string;
}