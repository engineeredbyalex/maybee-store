import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    const { name, title, description, stars, product } = req.body;
    res.json(await Review.create({ name, title, description, stars, product }));
  }

  if (req.method === 'GET') {
    // Fetch all reviews without any filter
    res.json(await Review.find());
  }
}
