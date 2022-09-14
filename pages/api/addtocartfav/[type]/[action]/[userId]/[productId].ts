import { Error, isValidObjectId, MongooseError } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../../../lib/dbConnect';
import Users from '../../../../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { type, action, userId, productId } = req.query;

	try {
		await dbConnect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
	//
	//

	if (type === 'favorites') {
		switch (req.method) {
			case 'GET': {
				res.status(200).json(req.query);
			}
			//
			//

			case 'POST': {
				if (action === 'add') {
					try {
						console.log('favorites add reached');
						const user = await Users.findOne({ _id: userId });

						if (user) {
							if (user.favorites.indexOf(productId) === -1) {
								user.favorites.push(productId);
								await user.save();
								const updatedUser = await Users.findOne({
									_id: userId,
								}).populate('favorites');
								res.status(200).json(updatedUser);
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
					console.log(' favorites remove reached');
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
			default: {
				return res.status(400).json({ message: 'invalid request' });
			}
		}
	} else if (type === 'cart') {
		//
		switch (req.method) {
			//
			case 'POST': {
				//
				const user = await Users.findOne({ _id: userId });

				if (user) {
					//
					if (action === 'add') {
						//
						try {
							//                     {id: Schema.Types.ObjectId, quantity: Number}
							if (user.cart.indexOf(productId) === -1) {
								user.cart.push(productId);
								await user.save();
								// const updatedUser = await Users.findOne({
								// 	_id: userId,
								// }).populate('cart');
								// return res.status(200).json(updatedUser);
								return res.status(200).json({ message: 'success' });
							} else {
								// send the new quantity via the req body
								user.cart.find(
									(item: { id: string; quantity: number }) =>
										item.id === productId
								).quantity = parseInt(req.body.quantity);
							}
						} catch (e) {
							if (e instanceof Error) {
								console.log(e.message);
								return res.status(500).json({ message: e.message });
							}
						}
						//
					} else if (action === 'remove') {
						//
						// do something
						//
					} else {
						return res.status(400).json({ message: 'invalid action' });
					}

					//  else to user being found
				} else {
					// use the status code of the reply to behave a certain way on the front end, as we know that 401 is only
					// for when an user is not authorized.
					return res.status(401).json({ message: 'You are not logged in' });
				}

				// we should add to cart.
			}

			default: {
				res.status(400).json({ message: 'invalid action type' });
			}
		}
	}
}
