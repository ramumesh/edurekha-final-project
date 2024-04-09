import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/db/db";
import { ProductModel } from "../../../../lib/db/model/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const query = req.nextUrl.searchParams.get("query");
    console.log("pid" + query);
    const products = await ProductModel.find({
      productId: query,
    });
    console.log("products ",products);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    Response.json({ error: "Internal Server Erro" });
  }
}
