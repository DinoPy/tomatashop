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
			const { productId, userId, title, comment, rating } = req.body;
			if (!productId || !userId || !title || !comment || !rating) {
				return res.status(400).json({ message: 'Missing fields' });
			}

			try {
				await dbConnect();
				const review = await Reviews.create({
					productId,
					userId,
					title,
					comment,
					rating: parseInt(rating),
				});

				const product = await Products.findOne({ _id: productId });
				product.rating.push(rating);
				product.reviews.push(review._id);
				await product.save();
				//
				const user = await Users.findOne({ _id: userId });
				user.rated.push(productId);
				await user.save();

				const newProduct = await Products.findOne({ _id: productId }).populate({
					path: 'reviews',
					select: 'title rating comment userId createdAt',
					populate: {
						path: 'userId',
						select: 'name images',
					},
				});

				res.status(201).json(newProduct);
			} catch (e) {
				if (e instanceof Error) {
					return res.status(500).json({ message: e.message });
				}
			}
		}
	}
}
