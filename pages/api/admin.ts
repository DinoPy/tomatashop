import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Products from '../../models/Products';
import Reviews from '../../models/Reviews';
import Users from '../../models/Users';
import { s3 } from '../api/upload/index';

//

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

		case 'POST': {
			const { title, price, description, image, category, userId } = req.body;

			const user = await Users.findById(userId);

			if (user.access !== 'ADMIN')
				return res.status(401).json({ message: 'Unauthorized' });

			const errors = [];

			if (title.length < 8) {
				errors.push({
					field: 'title',
					message: 'Name must be at least 8 characters long',
				});
			}
			if (description.length < 8) {
				errors.push({
					field: 'email',
					message: 'Title must be at least 8 characters long',
				});
			}
			if (!isNaN(Number(price)) && price <= 0) {
				errors.push({
					field: 'price',
					message: 'Price must be a number greater than 0',
				});
			}

			if (!image) {
				errors.push({
					field: 'image',
					message: 'Image is required',
				});
			}

			if (
				category !== 'painting' &&
				category !== 'sketch' &&
				category !== 'illustration' &&
				category !== 'calendar' &&
				category !== 'cover' &&
				category !== 'clothing'
			) {
				errors.push({
					field: 'category',
					message:
						'Category must be painting, sketch, illustration, calendar, cover, or clothing',
				});
			}

			if (errors.length > 0) {
				return res.status(400).json({ errors });
			}

			try {
				await dbConnect();

				const product = await Products.create({
					title,
					price,
					category,
					description,
					image: image,
				});

				return res.status(201).json({ product });
			} catch (e) {
				return res.status(500).json({ message: (e as Error).message });
			}
			break;
		}

		case 'PUT': {
			try {
				await dbConnect();
				const { productId, column, newValue, userId } = req.body;

				const user = await Users.findById(userId);

				if (user.access !== 'ADMIN')
					return res.status(401).json({ message: 'Unauthorized' });

				const product = await Products.findById(productId);
				product[column] = newValue;
				await product.save();

				return res.status(200).json({ message: 'success' });
			} catch (e) {
				return res.status(500).json({ message: (e as Error).message });
			}
		}

		case 'DELETE': {
			try {
				await dbConnect();
				const { productId, userId, productKey } = req.body;

				const user = await Users.findById(userId);

				if (user.access !== 'ADMIN')
					return res.status(401).json({ message: 'Unauthorized' });

				await Products.findByIdAndDelete(productId);
				await Reviews.deleteMany({ productId });

				const objDelResponse = await s3.deleteObject(
					{
						Bucket: 'tomatastore',
						Key: productKey,
					},
					(err, data) => {
						if (err) {
							console.error(err);
						} else {
							console.log(data);
						}
					}
				);

				return res.status(200).json({ message: 'success' });
			} catch (e) {
				return res.status(500).json({ message: (e as Error).message });
			}
		}
		default: {
			return res.status(405).json({ message: 'Method not allowed' });
		}
	}
}
