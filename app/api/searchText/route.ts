import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db/db";
import { ProductsModel } from "../../../lib/db/model/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const query = req.nextUrl.searchParams.get("query");
    console.log("ksd" + query);
    const products = await ProductsModel.find({
      $or: [
        { brandName: { $regex: query, $options: "i" } }, // Case-insensitive search for brand name
        { productName: { $regex: query, $options: "i" } }, // Case-insensitive search for product name
      ],
    });
    console.log("Hi" + products);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    Response.json({ error: "Internal Server Erro" });
  }
}
