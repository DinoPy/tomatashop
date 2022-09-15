import { Error } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../../../lib/dbConnect';
import Products from '../../../../../../models/Products';
import Users from '../../../../../../models/Users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { type, action, userId, productId } = req.query;

	try {
		await dbConnect();
		await Products.countDocuments();
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
				const getUser = await Users.findOne({ _id: userId }).populate({
					path: 'favorites',
					model: 'Products',
					select: 'title image ',
				});

				return res.status(200).json(getUser.favorites);
			}
			//
			//

			case 'POST': {
				if (action === 'add') {
					try {
						const user = await Users.findOne({ _id: userId });

						if (user) {
							if (user.favorites.indexOf(productId) === -1) {
								user.favorites.push(productId);
								await user.save();
								const updatedUser = await user.populate({
									path: 'favorites',
									model: 'Products',
									select: 'title image ',
								});
								return res.status(200).json(updatedUser.favorites);
							} else {
								return res
									.status(400)
									.json({ message: 'already in favorites' });
							}
						}
					} catch (error) {
						if (error instanceof Error)
							return res.status(500).json({ message: error.message });
					}
				}
			}

			case 'PUT': {
				if (action === 'remove') {
					try {
						const user = await Users.findOne({ _id: userId });

						if (user) {
							if (user.favorites.indexOf(productId) !== -1) {
								user.favorites.pull(productId);
								await user.save();
								const updatedUser = await user.populate({
									path: 'favorites',
									model: 'Products',
									select: 'title image ',
								});
								// TO DO change to only send the populated fields of the favorites also only those needed
								return res.status(200).json(updatedUser.favorites);
							} else {
								return res.status(400).json({ message: 'not in favorites' });
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
			case 'GET': {
				const cart = await Users.findOne({ _id: userId }).populate({
					path: 'cart._id',
					model: 'Products',
					select: 'title price image ',
				});

				return res.status(200).json(cart.cart);
			}
			//
			case 'POST': {
				//
				const user = await Users.findOne({ _id: userId });

				if (user) {
					//

					if (action === 'add') {
						//
						try {
							//
							let productIndex = 0;
							const userCart = user.cart.find((item: any, index: number) => {
								productIndex = index;
								return item._id.toString() === productId;
							});

							//                     {id: Schema.Types.ObjectId, quantity: Number}
							if (userCart === undefined) {
								user.cart.push({
									_id: productId,
									quantity: parseInt(req.body.quantity),
								});
								await user.save();

								const newUser = await user.populate({
									path: 'cart._id',
									model: 'Products',
									select: 'title price image ',
								});

								return res.status(200).json(newUser.cart);
							} else {
								// send the new quantity via the req body
								user.cart[productIndex].quantity = parseInt(req.body.quantity);
								await user.save();

								const newUser = await user.populate({
									path: 'cart._id',
									model: 'Products',
									select: 'title price image ',
								});

								return res.status(200).json(newUser.cart);
							}
						} catch (e) {
							if (e instanceof Error) {
								return res.status(500).json({ message: e.message });
							}
						}
						//
					} else if (action === 'remove') {
						const toRemove = user.cart.find((item: any, index: number) => {
							return item._id.toString() === productId;
						});

						user.cart.pull(toRemove);
						await user.save();

						const updatedUser = await user.populate({
							path: 'cart._id',
							model: 'Products',
							select: 'title price image ',
						});

						return res.status(200).json(updatedUser.cart);

						// else to the action type
					} else {
						return res.status(400).json({ message: 'invalid action' });
					}

					//  else to user being found
				} else {
					// use the status code of the reply to behave a certain way on the front end, as we know that 401 is only
					// for when an user is not authorized.
					return res.status(401).json({ message: 'You are not logged in' });
				}
			}

			default: {
				res.status(400).json({ message: 'invalid action type' });
			}
		}
	}
}
