import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    storeName: { type: String, default: "CYBER FLUX STORE" },
    whatsapp: { type: String, default: "" },
    waChannel: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    telegram: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);