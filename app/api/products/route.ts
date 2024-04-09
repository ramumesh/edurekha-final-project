import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db/db";
import { ProductModel } from "../../../lib/db/model/products";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const products = await ProductModel.find();
    console.log(products);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Erro" });
  }
}
