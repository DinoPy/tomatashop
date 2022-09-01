import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/header/Header';
import IndividualProductPage from '../../components/individualProductPage/IndividualProductPage';
import { Product } from '../../types/interface/productPropsInterface';
import Products from '../../models/Products';
import SearchBox from '../../components/SearchBox/SearchBox';

const ProductPage: NextPage<{ product: Product }> = ({ product }) => {
	// const router = useRouter();
	// const { productId } = router.query;

	return (
		<>
			<Header />
			<SearchBox />
			<IndividualProductPage product={product} />
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
