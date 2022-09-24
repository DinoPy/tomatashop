import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Products from '../../models/Products';
import Users from '../../models/Users';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET': {
			await dbConnect();
			const products = await Products.find({}).select('-__v -id');

			return res.status(200).json({ products });
		}

		case 'PUT': {
			await dbConnect();
			const { productId, column, newValue, userId } = req.body;
			console.log(productId, column, newValue, userId);

			const user = await Users.findById(userId);

			if (user.access !== 'ADMIN')
				return res.status(401).json({ message: 'Unauthorized' });

			const product = await Products.findById(productId);
			product[column] = newValue;
			await product.save();

			console.log(product);

			return res.status(200).json({ message: 'success' });
		}
		default: {
			return res.status(405).json({ message: 'Method not allowed' });
		}
	}
}
