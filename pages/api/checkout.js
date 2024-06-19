import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Invalid method' });
    return;
  }

  const {
    name, email, phone, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;

  try {
    await mongooseConnect();

    const productsIds = cartProducts.map(item => item.productId);
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    const lineItemsForStripe = [];
    const lineItemsForOrder = [];

    for (const cartProduct of cartProducts) {
      const productInfo = productsInfos.find(p => p._id.toString() === cartProduct.productId);
      const quantity = cartProduct.quantity || 0;

      if (quantity > 0 && productInfo) {
        const selectedValues = cartProduct.selectedValues || [];

        lineItemsForStripe.push({
          quantity,
          price_data: {
            currency: 'ron',
            product_data: { name: productInfo.title },
            unit_amount: productInfo.price * 100,  // Corrected
          },
        });

        const selectedValuesArray = Object.keys(selectedValues).map((key) => ({
          name: key,
          value: selectedValues[key],
        }));

        lineItemsForOrder.push({
          productId: cartProduct.productId,
          selectedValues: selectedValuesArray,
          title: productInfo.title,
          quantity: quantity,
          price: productInfo.price,
          category: productInfo.category
        });
      }
    }

    const session = await getServerSession(req, res, authOptions);

    const shippingFeeSetting = await Setting.findOne({ name: 'shippingFee' });
    const shippingFeeCents = parseInt(shippingFeeSetting.value || '0') * 100;

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: lineItemsForStripe,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart',
      cancel_url: process.env.PUBLIC_URL + '/cart',
      allow_promotion_codes: true,
      payment_intent_data: {
        receipt_email: email,
        metadata: {
          coupon_code: 'Maybee10',
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

    const orderDoc = await Order.create({
      line_items: lineItemsForOrder,
      name,
      phone,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: true,
      userEmail: session?.user?.email,
    });

    // Now that `orderDoc` is defined, you can use it in metadata
    stripeSession.metadata = { orderId: orderDoc._id.toString() };

    res.json({
      url: stripeSession.url,
    });
  } catch (error) {
    console.error("Error in /api/checkout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
