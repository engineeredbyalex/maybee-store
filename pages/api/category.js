import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    try {
        await mongooseConnect();
        console.log("Received request:", req.body);

        const { method } = req;

        if (method === "GET") {
            if (req.query?.id) {
                const data = await Category.findOne({ _id: req.query.id });
                if (!data) {
                    return res.status(404).json({ error: "Category not found" });
                }
                res.json(data);
            } else {
                const data = await Category.find();
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
