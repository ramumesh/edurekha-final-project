import { NextApiRequest, NextApiResponse } from "next";
import { ProductModel } from "@/app/lib/db/model/products";
import connectDB from "@/app/lib/db/db";


export async function GET(_: NextApiRequest, { params }: any, res: NextApiResponse) {
  try {
    await connectDB();
    const product = await ProductModel.find({
      productId: params.id,
    });
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
