import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

// GET — ambil pengaturan (buat kalau belum ada)
export async function GET() {
  await dbConnect();
  let setting = await Setting.findOne({ key: "main" }).lean();

  if (!setting) {
    const created = await Setting.create({ key: "main" });
    setting = created.toObject();
  }

  return NextResponse.json(setting);
}

// PUT — update pengaturan
export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();

  const updated = await Setting.findOneAndUpdate(
    { key: "main" },
    { ...body, key: "main" },
    { new: true, upsert: true }
  );

  return NextResponse.json(updated);
}