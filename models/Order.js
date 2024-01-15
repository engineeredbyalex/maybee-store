import { model, models, Schema } from "mongoose";

const SelectedValuesSchema = new Schema({
  propertyName: String, // Store the name of the property
  value: String,
});

const LineItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  selectedValues: [SelectedValuesSchema],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
