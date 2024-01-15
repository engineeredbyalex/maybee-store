import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    const { name, email, phone, city, postalCode, streetAddress, country, cartProducts } = req.body;
    const session = await getServerSession(req, res, authOptions);

    try {
        const lineItems = await Promise.all(
            cartProducts.map(async (cartProduct) => {
                const productInfo = await Product.findById(cartProduct.productId);
                if (!productInfo) {
                    throw new Error(`Product not found with id: ${cartProduct.productId}`);
                }

                return {
                    productId: cartProduct.productId,
                    selectedValues: cartProduct.selectedValues || {}, // Handle undefined selectedValues
                    quantity: cartProduct.quantity || 0,
                    title: productInfo.title,
                    price: productInfo.price,
                    category: productInfo.category,
                };
            })
        );

        const orderDoc = await Order.create({
            line_items,
            name,
            email,
            phone,
            city,
            postalCode,
            streetAddress,
            country,
            paid: false,
            userEmail: session?.user?.email,
        });

        res.status(201).json(orderDoc);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "An error occurred while creating the order." });
    }
}
