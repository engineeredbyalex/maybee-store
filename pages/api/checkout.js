import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name, email, phone, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;
  await mongooseConnect();

  const productsIds = cartProducts.map(item => item.productId);
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

  const lineItemsForStripe = [];
  const lineItemsForOrder = [];

  for (const cartProduct of cartProducts) {
    const productInfo = productsInfos.find(p => p._id.toString() === cartProduct.productId);
    const quantity = cartProduct.quantity || 0; // Use updated quantity from cartProduct
    if (quantity > 0 && productInfo) {
      lineItemsForStripe.push({
        quantity,
        price_data: {
          currency: 'ron',
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
      lineItemsForOrder.push({
        productId: cartProduct.productId,
        selectedScent: cartProduct.selectedScent,
        selectedDecoration: cartProduct.selectedDecoration,
        title: productInfo.title,
        quantity: quantity,
        price: productInfo.price, // Store the price
        // Include any other information you want to store here
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items: lineItemsForOrder,
    name,
    phone, // Include the phone number
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: true,
    userEmail: session?.user?.email,
  });
  const shippingFeeSetting = await Setting.findOne({ name: 'shippingFee' });
  const shippingFeeCents = parseInt(shippingFeeSetting.value || '0') * 100;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItemsForStripe,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
    payment_intent_data: {
      receipt_email: email,
      metadata: {
        coupon_code: 'Maybee10', // Add the coupon code to metadata
      },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'shipping fee',
          type: 'fixed_amount',
          fixed_amount: { amount: shippingFeeCents, currency: 'ron' },
        },
      }
    ],
  });

  res.json({
    url: stripeSession.url,
  })

}