// pages/api/orders/[id].js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    try {
        await mongooseConnect();

        const { method } = req;
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userEmail = session.user.email;

        if (method === "GET") {
            const { id } = req.query;
            const order = await Order.findOne({ _id: id, userEmail });

            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }

            res.json(order);
        } else {
            res.status(400).json({ error: 'Invalid method' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
