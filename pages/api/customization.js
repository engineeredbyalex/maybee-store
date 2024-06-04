// Importing mongooseConnect
import { mongooseConnect } from "../../lib/mongoose";
// Importing Customization Schema
import { Customization } from "@/models/Customization";

export default async function handle(req, res) {
    try {
        console.log('Received request:', req.body);
        console.log('Properties:', req.body.properties);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    const { method } = req;

    try {

        await mongooseConnect();
        if (method === "GET") {
            if (req.query?.id) {
                const customization = await Customization.findOne({ _id: req.query.id });
                res.json(customization);
            } else {
                const customization = await Customization.find();
                res.json(customization);
            }
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
