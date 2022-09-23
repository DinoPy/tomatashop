import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Products from '../../../models/Products';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	const { productId } = req.query;

	switch (method) {
		case 'GET':
			await dbConnect();
			const product = await Products.find({ _id: productId }).populate(
				'reviews',
				'title comment rating userId createdAt '
			);

			console.log(product);

			return res.status(200).json(product);
	}
}
