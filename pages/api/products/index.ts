import dbConnect from '../../../lib/dbConnect.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../../models/Products';

// TO DO - add pagination
// todo - add search
// todo - add sorting
// todo - add filtering

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	try {
		await dbConnect();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	switch (method) {
		case 'GET': {
			const { query } = req.query;

			try {
				if (query) {
					const results = await Products.aggregate([
						{
							$search: {
								index: 'autocomplete',
								autocomplete: {
									query: query,
									path: 'title',
									tokenOrder: 'sequential',
									fuzzy: {
										maxEdits: 2,
									},
								},
							},
						},
						{ $limit: 6 },
						{ $project: { title: 1 } },
					]);
					if (results) {
						return res.status(200).json({ message: 'success', data: results });
					}
				}
				res.status(200).json({ message: 'success', data: [] });
			} catch (error) {
				res.send([]);
			}
		}

		case 'POST': {
			const { title, price, description, image, category, rating } = req.body;
			if (!title || !price || !description || !image || !category || !rating) {
				res.status(400).json({ message: 'Please provide all fields' });
				break;
			}
			try {
				const product = await Products.create({
					title,
					price,
					description,
					image,
					category,
					rating,
				});

				product.save();
				res.status(201).json({ success: true, data: product });
			} catch (error) {
				if (error instanceof Error) {
					res.status(400).json({ success: false, error: error.message });
				}
			}
			break;
		}

		case 'PUT': {
			const { id } = req.query;
			const { title, price, description, image, category, rating } = req.body;
			if (!id) {
				res.status(400).json({ message: 'Please provide an id' });
			}
			try {
				const product = await Products.findByIdAndUpdate(id, {
					title,
					price,
					description,
					image,
					category,
					rating,
				});
				res.status(200).json({ success: true, data: product });
			} catch (error) {
				if (error instanceof Error) {
					res.status(400).json({ success: false, error: error.message });
				}
			}
			break;
		}

		default:
			res.status(405).json({
				message: 'Method not allowed',
			});
			break;
	}
}
