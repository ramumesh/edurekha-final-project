import { NextRequest } from "next/server";
import connectDB from "@/app/lib/db/db";
import { OrderModel } from "@/app/lib/db/model/order";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
    const { order, userId } = await req.json();
    try {
        await connectDB();
        const newOrder = new OrderModel({
            orderId: order.orderId, date: order.date, name: order.name, email: order.email,
            address: order.address, total: order.total, products: order.products, userId: userId
        });
        const createdOrder = await newOrder.save();
        return Response.json({
            message: "order created",
            order: createdOrder
        });

    } catch (error) {
        console.log("here2...........", error); // Failure
        return Response.json({
            message: error
        });
    }
}

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    cookieStore.delete("token");
    const userId = req.nextUrl.searchParams.get("userId");
    try {
        await connectDB();
        const orders = await OrderModel.find({ userId });
        return Response.json(orders);
    } catch (error) {
        return Response.json({ error: JSON.stringify(error) });
    }
}
