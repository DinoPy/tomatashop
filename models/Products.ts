import mongoose from 'mongoose';
import { Product } from '../types/interface/productPropsInterface';

const ProductSchema = new mongoose.Schema<Product>(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		category: { type: String, required: true },
		rating: {
			rate: { type: Number, required: true },
			count: { type: Number, required: true },
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Products ||
	mongoose.model<Product>('Products', ProductSchema);
