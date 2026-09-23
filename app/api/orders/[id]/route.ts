import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { status } = await req.json();
  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );
  return NextResponse.json(order);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}