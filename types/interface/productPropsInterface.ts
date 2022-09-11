import { ObjectId, Schema } from 'mongoose';

export interface ProductsProps {
	products: Product[];
}

export interface Product {
	category: string;
	description: string;
	_id: string;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
}
