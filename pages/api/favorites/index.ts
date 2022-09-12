import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Products from '../../../models/Products';
import Users from '../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'POST': {
			try {
				await dbConnect();
				await Products.findOne();
				const items = await Users.find({ email: req.body.email }).populate(
					'favorites'
				);
				console.log(items);
				res.status(200).json(items);
			} catch (error) {
				if (error instanceof Error) {
					res.status(500).json({ message: error.message });
				}
			}
		}
	}
}
