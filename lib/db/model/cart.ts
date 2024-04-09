import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema({
  productId: { type: Number, required: true, unique: true },
  brandName: { type: String },
  productName: { type: String },
  productPrice: { type: Number },
  quantity: { type: Number },
});

const CartModel =
  mongoose.models.Carts || model("Carts", CartSchema, "carts");

export { CartModel, CartSchema };
