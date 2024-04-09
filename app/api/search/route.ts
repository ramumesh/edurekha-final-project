import connectDB from "../../../lib/db/db";
import { ProductsModel } from "../../../lib/db/model/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {}) {
  await connectDB();
  const query = request.nextUrl.searchParams.get("query");
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  const limit = 50;

  const skip = (page - 1) * limit;

  let searchQuery = {};

  if (query) {
    searchQuery = { $text: { $search: query } };
  }

  console.log(searchQuery);
  const total = await ProductsModel.countDocuments(searchQuery);
  const docs = await ProductsModel.find(searchQuery).skip(skip).limit(limit);

  console.log(total);
  return Response.json({ total: total, products: docs });
}
