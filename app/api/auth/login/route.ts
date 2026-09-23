import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const ADMIN_CRED = { username: "admin", password: "cyber2026" };

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    if (username === ADMIN_CRED.username && password === ADMIN_CRED.password) {
      return NextResponse.json({
        success: true,
        user: { username, role: "admin" },
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { username: user.username, role: user.role },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}