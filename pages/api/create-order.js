// pages/api/create-order.js

import { Order } from "@/models/Order";
import { getServerSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

    const session = await getServerSession(req, res, authOptions);

    try {
        const orderDoc = await Order.create({
            line_items: cartProducts,
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            paid: false,
            userEmail: session?.user?.email,
        });

        res.status(201).json(orderDoc);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
}
