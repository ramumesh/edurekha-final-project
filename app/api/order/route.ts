import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db/db";
import { OrderModel } from "@/lib/db/model/order";


export async function PUT(req: NextRequest, res: NextResponse) {

    const { order } = await req.json();
    try {
        await connectDB();
        console.log("before...........");
        const newOrder = new OrderModel({ orderId: order.orderId, date: order.date, name: order.name, email: order.email, 
            address: order.address, total: order.total,products : order.products 
         });
        const cart = await newOrder.save();
    
        
            
            return Response.json({
                message: "order created"
            });
        
    } catch (error) {
        console.log("here2...........",error); // Failure
        return Response.json({
            message: error
        });
    }

}

export async function GET() {

    try {
        await connectDB();
        const carts = await OrderModel.find();
        console.log("order data ",carts);
        return Response.json(carts);
    } catch (error) {
        console.error("Error fetching products:", error);
        Response.json({ error: "Internal Server Erro" });
    }

}


