import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
    pricePaid: number;
    eco_score: number;
  }[];

  totalAmount: number;
  avgEcoScore: number;

  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        pricePaid: Number,
        eco_score: Number
      }
    ],

    totalAmount: Number,
    avgEcoScore: Number
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
