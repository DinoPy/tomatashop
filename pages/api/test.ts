import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../models/Products';
import Users from '../../models/Users';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// return res.status(400).json({ message: 'Testing api is off' });

	const users = await Products.find({ category: 'jewelery' });
	users.forEach(async (prod) => {
		prod.category = 'cover';
		await prod.save();
	});

	return res.status(200).json({ message: 'success' });
}
