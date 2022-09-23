import { ObjectId, Schema } from 'mongoose';
import { ReviewInterface } from '../../models/Reviews';

export interface ProductsProps {
	products: Product[];
}

export interface Product {
	category: string;
	description: string;
	_id: string;
	image: string;
	price: number;
	rating: number[];
	reviews: ObjectId[] | ReviewInterface[];
	title: string;
}
