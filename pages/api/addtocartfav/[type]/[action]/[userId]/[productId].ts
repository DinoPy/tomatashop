import { Error, MongooseError } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../../../lib/dbConnect';
import Users from '../../../../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { type, action, userId, productId } = req.query;

	switch (req.method) {
		case 'GET': {
			res.status(200).json(req.query);
		}
		case 'POST': {
			try {
				await dbConnect();
			} catch (error) {
				if (error instanceof Error) {
					return res.status(500).json({ message: error.message });
				}
			}

			if (action === 'add') {
				try {
					const user = await Users.findOne({ _id: userId });

					if (user) {
						if (user.favorites.indexOf(productId) === -1) {
							user.favorites.push(productId);
							const updatedUser = await user.save();
							res.status(200).json({ message: 'success', updatedUser });
							break;
						} else {
							res.status(400).json({ message: 'already in favorites' });
							break;
						}
					}
				} catch (error) {
					if (error instanceof Error)
						res.status(500).json({ message: error.message });
					break;
				}
			}
		}

		case 'PUT': {
			if (action === 'remove') {
				console.log('remove reached');
				try {
					const user = await Users.findOne({ _id: userId });

					if (user) {
						if (user.favorites.indexOf(productId) !== -1) {
							user.favorites.pull(productId);
							const updatedUser = await user.save();
							res.status(200).json({ message: 'success', updatedUser });
							break;
						} else {
							res.status(400).json({ message: 'not in favorites' });
							break;
						}
					}
				} catch (error) {
					if (error instanceof Error)
						res.status(500).json({ message: error.message });
					break;
				}
			}
		}
	}
}