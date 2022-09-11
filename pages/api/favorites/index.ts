import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../../models/Products';
import Users from '../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'POST': {
			const items = await Users.find({ email: req.body.email }).populate(
				'favorites'
			);
			console.log(items);
			res.status(200).json(items);
		}
	}
}
