export interface Product {
  _id?: string;
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