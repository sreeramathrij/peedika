import { Schema, model, Document } from "mongoose";
import { IProduct } from "../types/Product";

export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema<IProductModel>({
  name: String,
  brand: String,
  category: String,
  price: Number,
  description: String,

  materials: [String],
  packaging: String,
  shipping_type: String,

  eco_tags: [String],
  eco_score: Number,

  image: String,
});

export default model<IProductModel>("Product", ProductSchema);
