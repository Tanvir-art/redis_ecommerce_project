import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  total: number;
  status: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, completed, cancelled
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
