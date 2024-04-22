import { OrderModel } from "@/app/lib/db/model/order";
import connectDB from "@/app/lib/db/db";
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
        return Response.json({ error: "Internal Server Erro" });
    }
}