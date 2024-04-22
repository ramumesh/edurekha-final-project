import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_on: { type: Date, default: new Date() },
  is_admin: { type: Boolean, default: false },
});

const UserModel = mongoose.models.Users || model("Users", UserSchema, "users");

export { UserModel, UserSchema };
