// pages/api/orders.js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const { method } = req;

    if (method === "GET") {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userEmail = session.user.email;

      if (req.query?.id) {
        const data = await Order.findOne({ _id: req.query.id, userEmail });
        res.json(data);
      } else {
        const data = await Order.find({ userEmail });
        res.json(data);
      }
    } else {
      res.status(400).json({ error: 'Invalid method' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
