import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Products from '../../../models/Products';
import Reviews from '../../../models/Reviews';
import Users from '../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	switch (method) {
		//

		case 'POST': {
			const { productId } = req.body;

			try {
				await dbConnect();
				const reviews = await Products.findOne({ _id: productId }).populate(
					'reviews',
					'title comment'
				);

				console.log(reviews.reviews);
				// res.status(201).json(reviews.);
			} catch (e) {
				return res.status(500).json({ message: 'Server error' });
			}
		}
	}
}
