import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await dbConnect();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json(order);
}