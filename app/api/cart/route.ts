import { NextRequest } from "next/server";
import connectDB from "../../../lib/db/db";
import { CartModel } from "@/lib/db/model/cart";


export async function PUT(req: NextRequest) {

    const { product } = await req.json();
    try {
        await connectDB();
        const newCart = new CartModel({ productId: product.productId, brandName: product.brandName, productName: product.productName, productPrice: product.productPrice, quantity: 1 });
        const cart = await newCart.save();
        return Response.json({
            message: "added to cart"
        });
    } catch (error) {
        return Response.json({
            message: error
        });
    }

}

export async function GET() {

    try {
        await connectDB();
        const carts = await CartModel.find();
        return Response.json(carts);
    } catch (error) {
        console.error("Error fetching products:", error);
        Response.json({ error: "Internal Server Erro" });
    }

}


export async function DELETE(req: NextRequest) {
    await connectDB();
    const  productId  = await req.json();
    try {
        console.log("delete",  productId )

        
        if (productId > 0) {
            var productno = 0
            productno = productId.productId
            console.log("withid",  productno );
            CartModel.deleteOne({ productId: { $gte: productno } }).then(function(){
                console.log("Data deleted"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });

            return Response.json({
                message: "deleted"
            });
        }else{
            console.log("without",  productId )
            CartModel.collection.drop()
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
