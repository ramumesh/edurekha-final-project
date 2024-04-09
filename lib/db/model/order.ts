import mongoose, { Schema, model } from "mongoose";


const orderproductSchema = new Schema({
    productName:  { type: String },
    quantity:  { type: Number },
    price: { type: Number },
  });

const OrderSchema = new Schema({
  orderId: { type: Number, required: true, unique: true },
  name: { type: String },
  date: { type: String},
  email: { type: String },
  address: { type: String },
  total: { type: Number },
  products: [orderproductSchema],    
});

const OrderModel =
  mongoose.models.Orders || model("Orders", OrderSchema, "orders");

export { OrderModel, OrderSchema };
