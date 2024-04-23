import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db/db";
import { CartModel } from "@/app/lib/db/model/cart";
import { createInternalErrorResponse, createMessageResponse } from "@/app/utils/apiUtils";
import { verifyjwt } from "@/app/lib/verifytoken";


export async function PUT(req: NextRequest) {

    const { product } = await req.json();
    try {
        await connectDB();
        const existingItem = await CartModel.findOne({ productId: product.productId });
        console.log("ExistingItem", existingItem);
        if (existingItem) {
            await CartModel.updateOne({ productId: product.productId }, { $set: { quantity: product.quantity } });
            return createMessageResponse('Cart updated');
        } else {
            throw new Error("Product not existing")
        }
    } catch (error: any) {
        return createInternalErrorResponse(error);
    }
}
export async function POST(req: NextRequest) {
    const { product } = await req.json();
    try {
        await connectDB();
        const existingItem = await CartModel.findOne({ productId: product.productId });
        console.log("ExistingItem", existingItem);
        if (existingItem) {
            await CartModel.updateOne({ productId: product.productId }, { $set: { quantity: existingItem.quantity + 1 } });
            return Response.json({
                message: "Cart updated"
            });
        }
        const newCart = new CartModel({ userId: product.userId, productId: product.productId, brandName: product.brandName, productName: product.productName, productPrice: product.productPrice, quantity: 1 });
        await newCart.save();
        return Response.json({
            message: "added to cart"
        });
    } catch (error) {
        return Response.json({
            message: error
        });
    }
}

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const tokenData: any = token && (await verifyjwt(token));
    const userId = tokenData?.payload?.id;
    console.log(userId);
    try {
        await connectDB();
        const carts = await CartModel.find({ userId: userId });
        return Response.json(carts);
    } catch (error) {
        console.error("Error fetching products:", error);
        Response.json({ error: "Internal Server Erro" });
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    const reqBody = await req.json();
    const { productId, userId } = reqBody;
    console.log(reqBody);
    try {
        if (productId && userId) {
            console.log("withid", productId);
            CartModel.deleteOne({ productId: productId, userId: userId }).then(function () {
                console.log("Data deleted"); // Success
            }).catch(function (error) {
                console.log(error); // Failure
            });
            return Response.json({
                message: "deleted"
            });
        } else {
            CartModel.deleteMany({ userId: userId }).then(function () {
                console.log("Data deleted"); // Success
            }).catch(function (error) {
                console.log(error); // Failure
            });
            return Response.json({
                message: "deleted"
            });
        }
    } catch (error) {
        return Response.json({
            message: error
        });
    }

}
