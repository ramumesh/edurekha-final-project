import mongoose, { Schema, model } from "mongoose";

const ProductsSchema = new Schema({
  productId: { type: Number, required: true, unique: true },
  brandName: { type: String },
  productName: { type: String },
  productDescription: { type: String },
  productPrice: { type: Number },
});

ProductsSchema.index({ productName: "text" });

const ProductModel =
  mongoose.models.Products || model("Products", ProductsSchema, "products");

export { ProductModel, ProductsSchema };
