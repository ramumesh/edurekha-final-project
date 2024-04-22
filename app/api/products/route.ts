import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/app/lib/db/db";
import { ProductModel } from "@/app/lib/db/model/products";
import { createDataResponse, createInternalErrorResponse } from "@/app/utils/apiUtils";

export async function GET(_: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const products = await ProductModel.find();
    return createDataResponse(products);
  } catch (error: any) {
    createInternalErrorResponse(error);
  }
}
