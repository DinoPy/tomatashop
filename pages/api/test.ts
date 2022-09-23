import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../models/Products';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return res.status(400).json({ message: 'Testing api is off' });
	const products = await Products.find({});
	products.forEach((product) => {
		product.rating = [];
		product.reviews = [];
		console.log(product);
		product.save();
	});
}
