import connectDB from "../../../../lib/db/db";
import { ProductModel } from "../../../../lib/db/model/products";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: any) {
  try {
    await connectDB();
    const product = await ProductModel.find({
      productId: params.id,
    });
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    Response.json({ error: "Internal Server Erro" });
  }
}
