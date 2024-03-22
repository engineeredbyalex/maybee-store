import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    console.log('Received request:', req.body);

    const { method } = req;

    if (method === "GET") {
      if (req.query?.id) {
        const data = await Order.findOne({ _id: req.query.id, userEmail: req.headers['user-email'] });
        res.json(data);
      } else {
        const data = await Order.find({ userEmail: req.headers['user-email'] });
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
