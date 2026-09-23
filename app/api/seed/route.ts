import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products as seedProducts } from "@/lib/data";

export const dynamic = "force-dynamic";   // ← TAMBAH INI

export async function GET() {
  // ... kode kamu
}