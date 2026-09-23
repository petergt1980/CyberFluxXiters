import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";   // ← TAMBAH INI

export async function GET() {
  // ...
}