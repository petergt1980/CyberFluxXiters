import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products as seedProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  const count = await Product.countDocuments();
  if (count > 0) {
    return NextResponse.json({
      message: "Produk sudah ada, skip seed",
      count,
    });
  }

  const cleanSeed = seedProducts.map(({ id, ...rest }: any) => rest);
  await Product.insertMany(cleanSeed);
  return NextResponse.json({
    message: "Seed berhasil",
    count: cleanSeed.length,
  });
}