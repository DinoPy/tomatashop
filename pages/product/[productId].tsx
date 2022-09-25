import { NextPage } from 'next';
import React from 'react';
import IndividualProductPage from '../../components/individualProductPage/IndividualProductPage';
import { Product } from '../../types/interface/productPropsInterface';
import Products from '../../models/Products';
import Layout from '../../components/layout';
import dbConnect from '../../lib/dbConnect';
import Reviews from '../../models/Reviews';

const ProductPage: NextPage<{ product: Product }> = ({ product }) => {
	return (
		<>
			<Layout>
				<IndividualProductPage product={product} />
			</Layout>
		</>
	);
};

export default ProductPage;

export async function getServerSideProps(context: any) {
	const productId = context.params.productId;

	try {
		await dbConnect();
		await Reviews.estimatedDocumentCount();
		const product = await Products.findById(productId).populate({
			path: 'reviews',
			select: 'title rating comment userId createdAt',
			populate: {
				path: 'userId',
				select: 'name images',
			},
		});

		return {
			props: {
				product: JSON.parse(JSON.stringify(product)),
				key: productId,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				// error: error.message,
				error: 'Product not found',
			},
		};
	}
}
