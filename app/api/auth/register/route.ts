import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existing) {
      return NextResponse.json(
        { error: "Username atau email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
      role: "user",
    });

    return NextResponse.json({
      success: true,
      user: { id: user._id, username, email },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}