import React from 'react';
import Products from '../../models/Products';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';
import ProductItem from '../../components/productItem/ProductItem';
import Layout from '../../components/layout';
import dbConnect from '../../lib/dbConnect';
import StoreContainer from '../../components/storeContainer/StoreContainer';
import { useRouter } from 'next/router';

const Category: NextPage<{ products: Product[] }> = ({ products }) => {
	const router = useRouter();

	return (
		<>
			<Layout>
				<StoreContainer products={products} pages={0} />
			</Layout>
		</>
	);
};

export default Category;

export async function getServerSideProps(context: any) {
	const category = context.params.category;

	try {
		await dbConnect();
		const products = await Products.find({ category: category });
		return {
			props: {
				products: JSON.parse(JSON.stringify(products)),
				// route: category,
			},
		};
	} catch (error) {
		return {
			props: {
				// error: error.message,
				error: 'Product not found',
			},
		};
	}
}
