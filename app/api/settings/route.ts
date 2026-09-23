import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export const dynamic = "force-dynamic";   // ← TAMBAH INI

export async function GET() {
  // ...
}

export async function PUT(req: Request) {
  // ...
}