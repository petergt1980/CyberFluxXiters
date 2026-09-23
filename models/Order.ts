import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    customer: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    total: { type: String, required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);