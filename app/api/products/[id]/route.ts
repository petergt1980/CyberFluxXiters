import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(product);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}