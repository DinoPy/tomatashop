import { NextPage } from 'next';
import React from 'react';
import Header from '../../components/header/Header';
import IndividualProductPage from '../../components/individualProductPage/IndividualProductPage';
import { Product } from '../../types/interface/productPropsInterface';
import Products from '../../models/Products';
import NavigationSubheader from '../../components/navigationSubheader/NavigationSubheader';
import Layout from '../../components/layout';

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
		const product = await Products.findById(productId);
		return {
			props: {
				product: JSON.parse(JSON.stringify(product)),
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
