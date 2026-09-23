import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    game: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceLabel: { type: String, required: true },
    features: [String],
    badge: { type: String, default: null },
    status: { type: String, default: "undetected" },
    version: { type: String, default: "v1.0.0" },
    compatibility: { type: String, default: "Android 8+" },
    delivery: { type: String, default: "Instan via WhatsApp" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);