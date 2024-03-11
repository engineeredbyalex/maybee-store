import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Address } from "@/models/Address";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const { user } = await getServerSession(req, res, authOptions);

    if (req.method === 'PUT') {
      const { name, email, city, streetAddress, postalCode, country, phone } = req.body;

      let address = await Address.findOne({ userEmail: user.email });

      if (address) {
        address = await Address.findByIdAndUpdate(address._id, req.body, { new: true });
      } else {
        address = await Address.create({ userEmail: user.email, ...req.body });
      }

      res.status(200).json(address);
    } else if (req.method === 'GET') {
      const address = await Address.findOne({ userEmail: user.email });
      res.status(200).json(address);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in /api/address:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
