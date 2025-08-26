import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct {
  name: string;
  description?: string;
  price: string;
  stock: string;
  category: string;
  image?: string;
 
}

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: String, required: true},
    stock: {type: String, required: true},
    category: {type: String},
    image: {type: String},
}, {timestamps: true});
 
export const Product = model<IProduct>('Product', productSchema);


