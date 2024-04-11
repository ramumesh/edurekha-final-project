import { OrderModel } from "@/lib/db/model/order";
import connectDB from "../../../../lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const param = req.nextUrl.searchParams.get("query");
        const order = await OrderModel.find({
            orderId: param,
        });
        return Response.json(order);
    } catch (error) {
        console.error("Error fetching products:", error);
        Response.json({ error: "Internal Server Erro" });
    }
}