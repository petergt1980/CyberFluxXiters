import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";   // ← TAMBAH INI

export async function GET() { /* ... */ }