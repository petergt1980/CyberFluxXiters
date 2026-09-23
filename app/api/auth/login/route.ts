import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";   // ← TAMBAH INI

const ADMIN_CRED = { ... };
export async function POST(req: Request) { /* ... */ }