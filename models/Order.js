import mongoose,{Schema} from "mongoose"

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        prodcutId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const order = mongoose.model("Order", orderSchema);
