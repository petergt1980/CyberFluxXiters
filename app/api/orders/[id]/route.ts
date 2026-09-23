import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const { status } = await req.json();
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  return NextResponse.json(order);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}