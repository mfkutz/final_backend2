import { Schema, model } from "mongoose";
import { cartRepository } from "../repository/index.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartRepository.create({});
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

export const userModel = model("user", userSchema);
