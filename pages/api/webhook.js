import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Method Not Allowed');
    return;
  }

  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send('Internal Server Error');
    return;
  }

  res.status(200).send('ok');
}

export const config = {
  api: { bodyParser: false }
};
