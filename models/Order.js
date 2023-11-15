import { model, models, Schema } from "mongoose";

const LineItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  selectedScent: String,
  selectedDecoration: String,
  title: String,
  quantity: Number,
  price: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const OrderSchema = new Schema({
  userEmail: String,
  line_items: [LineItemSchema],
  name: String,
  email: String,
  phone: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);
