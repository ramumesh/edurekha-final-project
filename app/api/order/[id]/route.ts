import { OrderModel } from "@/lib/db/model/order";
import connectDB from "../../../../lib/db/db";
import { NextRequest } from "next/server";

export async function GET(__: NextRequest, { params }: any) {
    try {
        await connectDB();
        const order = await OrderModel.find({
            orderId: params.id,
        });
        return Response.json(order);
    } catch (error) {
        console.error("Error fetching products:", error);
        Response.json({ error: "Internal Server Erro" });
    }
}